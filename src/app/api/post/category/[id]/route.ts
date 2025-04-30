import {
  handleError,
  getCommonParams,
  createResponse,
} from "@/src/helper/apiUtils";
import { postCardFormatting } from "@/src/helper/postHelper";
import {
  createConnection,
  QueryConfig,
  executeQueries,
  CustomRowDataPacket,
} from "@/src/lib/mysqlClient.server";
import { IMainPostCard, ISubPostCard } from "@/type";
import { NextRequest } from "next/server";

interface Props {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Props }) {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
    /**
     * ⭐️ step 1: get common params ⭐️
     */
    const { limit, offset, locale } = getCommonParams(req);
    /**
     * ⭐️ step 2: construct queries and values ⭐️
     */
    if (!params.id) {
      return handleError(new Error("parameter id is required field"), 400);
    }
    let queries: QueryConfig[];
    const values = [params.id, limit, offset];
    const countValues = [params.id];
    if (locale === "ko") {
      queries = [
        {
          sql: `SELECT * FROM Post WHERE category_id = ? ORDER BY post_id DESC LIMIT ? OFFSET ?`,
          values: values,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post WHERE category_id = ?",
          values: countValues,
        },
      ];
    } else {
      queries = [
        {
          sql: `SELECT * FROM Post WHERE category_id = ? ORDER BY post_id DESC LIMIT ? OFFSET ?`,
          values: values,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post WHERE category_id = ?",
          values: countValues,
        },
      ];
    }
    const user_id: string | null = req.headers.get("user-id");
    if (user_id !== "1") {
      if (locale === "ko") {
        queries[0].sql = queries[0].sql.replace(
          /ORDER BY/i,
          "AND is_kor = 'PUBLIC' ORDER BY"
        );
        queries[1].sql = queries[1].sql + " AND is_kor = 'PUBLIC'";
      } else {
        queries[0].sql = queries[0].sql.replace(
          /ORDER BY/i,
          "AND is_eng = 'PUBLIC' ORDER BY"
        );
        queries[1].sql = queries[1].sql + " AND is_eng = 'PUBLIC'";
      }
    }
    /**
     * ⭐️ step 3: execute queries ⭐️
     */
    const [mainResult, mainCountResult] =
      await executeQueries<CustomRowDataPacket>(connection, queries);
    const mainPosts: IMainPostCard[] = (mainResult as any[])[0];
    const ids: string[] = mainPosts.map((e) => e.post_id);
    if (ids.length === 0) {
      return createResponse(req, { posts: [], totalCount: 0 });
    }
    const placeholders = ids.map(() => "?").join(", ");
    let sql = "";
    if (locale === "ko") {
      sql = `SELECT * FROM Post_Kor WHERE post_id IN (${placeholders})`;
    } else {
      sql = `SELECT * FROM Post_Eng WHERE post_id IN (${placeholders})`;
    }
    queries = [
      {
        sql,
        values: ids,
      },
    ];
    const [subResult] = await executeQueries<CustomRowDataPacket>(
      connection,
      queries
    );
    /**
     * ⭐️ step 4: process data ⭐️
     */
    const subPosts: ISubPostCard[] = (subResult as any[])[0];
    const posts = postCardFormatting(mainPosts, subPosts);
    const totalCount = mainCountResult[0][0]?.totalCount;
    return createResponse(
      req,
      {
        posts: posts,
        totalCount,
      },
      200
    );
  } catch (err) {
    console.log(err);
    return handleError(err);
  } finally {
    await connection.end();
  }
}
