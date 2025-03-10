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
} from "@/src/lib/mysqlClient";
import { IMainPostCard, ISubPostCard } from "@/type";
import { NextRequest, NextResponse } from "next/server";

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
    let queries: QueryConfig[];
    if (!params.id) {
      return handleError(new Error("parameter id is required field"), 400);
    }
    const values = [params.id, limit, offset];
    const countValues = [params.id];
    if (locale === "ko") {
      queries = [
        {
          sql: `SELECT * FROM Post WHERE category_id = ? AND is_kor = 1 ORDER BY post_id DESC LIMIT ? OFFSET ?`,
          values: values,
        },
        {
          sql: `SELECT * FROM Post_Kor WHERE category_id = ? AND is_created = 1 ORDER BY post_id DESC LIMIT ? OFFSET ?`,
          values: values,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post WHERE category_id = ? AND is_kor = 1",
          values: countValues,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post_Kor WHERE category_id = ? AND is_created = 1",
          values: countValues,
        },
      ];
    } else {
      queries = [
        {
          sql: `SELECT * FROM Post WHERE category_id = ? AND is_eng = 1 ORDER BY post_id DESC LIMIT ? OFFSET ?`,
          values: values,
        },
        {
          sql: `SELECT * FROM Post_Eng WHERE category_id = ? AND is_created = 1 ORDER BY post_id DESC LIMIT ? OFFSET ?`,
          values: values,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post WHERE category_id = ? AND is_eng = 1",
          values: countValues,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post_Eng WHERE category_id = ? AND is_created = 1",
          values: countValues,
        },
      ];
    }

    /**
     * ⭐️ step 3: execute queries ⭐️
     */
    const [mainResult, subResult, mainCountResult, subCountResult] =
      await executeQueries<CustomRowDataPacket>(connection, queries);

    if (
      mainCountResult[0][0]?.totalCount !== subCountResult[0][0]?.totalCount
    ) {
      throw new Error("unknown error occurred on post category");
    }

    /**
     * ⭐️ step 4: process data ⭐️
     */
    const mainPosts: IMainPostCard[] = (mainResult as any[])[0];
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
