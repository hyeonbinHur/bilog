import {
  createResponse,
  getCommonParams,
  handleError,
} from "@/src/helper/apiUtils";
import { postCardFormatting } from "@/src/helper/postHelper";
import {
  createConnection,
  CustomRowDataPacket,
  executeQueries,
  QueryConfig,
} from "@/src/lib/mysqlClient";
import { IMainPostCard, ISubPostCard } from "@/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
    /**
     * ⭐️ step 1: get common params ⭐️
     */
    const query = req.nextUrl.searchParams.get("q");
    const { limit, offset, locale, pathType } = getCommonParams(req);

    /**
     * ⭐️ step 2: construct queries and values ⭐️
     */
    let queries: QueryConfig[];
    const values = [`%${query}%`, pathType, limit, offset];
    if (locale === "ko") {
      queries = [
        {
          sql: "SELECT * FROM Post_Kor WHERE title LIKE ? AND type = ? AND is_created = 1 ORDER BY post_id DESC LIMIT ? OFFSET ?",
          values: values,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post_Kor WHERE title LIKE ? AND type = ?",
          values: values,
        },
      ];
    } else {
      queries = [
        {
          sql: "SELECT * FROM Post_Eng WHERE title LIKE ? AND type = ? AND is_created = 1 ORDER BY post_id DESC LIMIT ? OFFSET ?",
          values: values,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post_Eng WHERE title LIKE ? AND type = ?",
          values: values,
        },
      ];
    }

    /**
     * ⭐️ step 3: execute queries to get subPostCard Data based on searched title⭐️
     */
    const [subResult, subCountResult] =
      await executeQueries<CustomRowDataPacket>(connection, queries);
    const totalCount = subCountResult[0][0]?.totalCount;

    /**
     * ⭐️ step 4: process subPostCard Data ⭐️
     */
    const subPosts: ISubPostCard[] = (subResult as any[])[0];
    const ids: string[] = subPosts.map((e) => e.post_id);
    if (ids.length === 0) {
      return createResponse(
        req,
        {
          posts: [],
          totalCount: totalCount,
        },
        200
      );
      return NextResponse.json(
        {
          posts: [],
          totalCount: totalCount,
        },
        { status: 200 }
      );
    }

    /**
     * ⭐️ step 5: construct queries to get main post card ⭐️
     */
    const placeholders = ids.map(() => "?").join(", ");
    const sql = `SELECT * FROM Post WHERE post_id IN (${placeholders})`;
    queries = [
      {
        sql,
        values: ids,
      },
    ];

    /**
     * ⭐️ step 6: construct queries to get main post card based on result of the subPostCard ⭐️
     */
    const [mainResult] = await executeQueries<CustomRowDataPacket>(
      connection,
      queries
    );
    const mainPosts: IMainPostCard[] = (mainResult as any[])[0].sort(
      (a: IMainPostCard, b: IMainPostCard) =>
        parseInt(b.post_id) - parseInt(a.post_id)
    );

    /**
     * ⭐️ step 7: process data⭐️
     */
    const posts = postCardFormatting(mainPosts, subPosts);
    return createResponse(
      req,
      {
        posts: posts,
        totalCount,
      },
      200
    );
    return NextResponse.json(
      {
        posts: posts,
        totalCount,
      },
      { status: 200 }
    );
  } catch (err) {
    return handleError(err);
  } finally {
    await connection.end();
  }
}
