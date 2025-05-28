import {
  createResponse,
  getCommonParams,
  handleError,
} from "@/src/helper/apiUtils";
import { postCardFormatting } from "@/src/helper/postHelper";
import {
  CustomRowDataPacket,
  executeQueries,
  executeQuery,
  QueryConfig,
} from "@/src/lib/mysqlClient.server";
import { IMainPostCard, ISubPostCard } from "@/type";
import { ResultSetHeader } from "mysql2";
import { NextRequest } from "next/server";

const getSpecificPosts = async (req: NextRequest) => {
  try {
    const startTime = Date.now();
    // ⭐️ step 1: get common params ⭐️
    const { limit, offset, locale } = getCommonParams(req);
    const values = [limit, offset];
    // const countValues = [pathType]; // Since I am managing BLOG only, the pathType is not required
    // ⭐️ step 2: contruct queries and values ⭐️
    let queries: QueryConfig[];
    if (locale === "ko") {
      queries = [
        {
          sql: "SELECT * FROM Post_Kor ORDER BY post_id DESC LIMIT ? OFFSET ?",
          values: values,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post_Kor",
          values: [],
        },
      ];
    } else {
      queries = [
        {
          sql: "SELECT * FROM Post_Eng ORDER BY post_id DESC LIMIT ? OFFSET ?",
          values: values,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post_Eng",
          values: [],
        },
      ];
    }
    const user_id: string | null = req.headers.get("user-id");
    if (user_id !== "1") {
      queries[0].sql = queries[0].sql.replace(
        /ORDER BY/i,
        "WHERE status = 'PUBLIC' ORDER BY"
      );
      queries[1].sql = queries[1].sql + " WHERE status = 'PUBLIC'";
    }
    // ⭐️ step 3: execute queries ⭐️
    const [subResult, subCountResult] =
      await executeQueries<CustomRowDataPacket>(queries);
    const totalCount = subCountResult[0][0]?.totalCount;
    const subPosts: ISubPostCard[] = (subResult as any[])[0];
    const ids: string[] = subPosts.map((e) => e.post_id);
    if (ids.length === 0) {
      return createResponse(req, { posts: [], totalCount: 0 });
    }
    const placeholders = ids.map(() => "?").join(", ");
    const sql = `SELECT * FROM Post WHERE post_id IN (${placeholders})`;
    queries = [
      {
        sql,
        values: ids,
      },
    ];
    const [mainResult] = await executeQueries<CustomRowDataPacket>(queries);
    const mainPosts: IMainPostCard[] = (mainResult as any[])[0].sort(
      (a: IMainPostCard, b: IMainPostCard) =>
        parseInt(b.post_id) - parseInt(a.post_id)
    );
    // ⭐️ step 4: process data ⭐️
    const posts = postCardFormatting(mainPosts, subPosts);
    const totalTime = Date.now() - startTime; // 총 시간 계산
    console.log(`🎯 전체 실행 시간: ${totalTime}ms`);

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
  }
};

const getAllPosts = async (req: NextRequest) => {
  try {
    const queries = `SELECT * FROM Post`;
    const posts = await executeQuery(queries);
    return createResponse(
      req,
      {
        posts: posts,
      },
      200
    );
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
};

export async function GET(req: NextRequest) {
  try {
    const isAll = req.nextUrl.searchParams.get("all");
    if (isAll) {
      return await getAllPosts(req);
    } else {
      return await getSpecificPosts(req);
    }
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lang = req.nextUrl.searchParams.get("lang");

    const values = [
      body.thumbnail,
      body.thumbnail_alt,
      body.category_id,
      body.category_name,
      body.type,
      0, // comments
      new Date(), //created_at
      "PRIVATE",
      "PRIVATE",
    ];

    const sql =
      "INSERT INTO Post (thumbnail, thumbnail_alt, category_id, category_name, type, comments, created_at, is_kor, is_eng) VALUES (?,?,?,?,?,?,?,?,?)";

    const result = await executeQuery(sql, values);
    const insertedId = (result as ResultSetHeader).insertId;
    let queries: QueryConfig[];
    const postValues = [
      insertedId,
      body.title,
      body.subtitle,
      body.content,
      body.type,
      body.category_id,
    ];

    if (lang === "Korean") {
      queries = [
        {
          sql: "INSERT INTO Post_Kor (post_id, title, subtitle, content, status) VALUES (?,?,?,?,?)",
          values: postValues,
        },
        {
          sql: "INSERT INTO Post_Eng (post_id , title, subtitle, content, status) VALUES (?,?,?,?,'PRIVATE')",
          values: postValues,
        },
        /**
         * 여기서 PATCH로 POST is_kor을 바꿔줘야함 Post_Kor의 Status에 따라
         */
      ];
    } else {
      queries = [
        {
          sql: "INSERT INTO Post_Eng (post_id, title, subtitle, content, status) VALUES (?,?,?,?,?)",
          values: postValues,
        },
        {
          sql: "INSERT INTO Post_Kor (post_id, title, subtitle, content, status) VALUES (?,?,?,?,'PRIVATE')",
          values: postValues,
        },
        /**
         * 여기서 PATCH로 POST is_kor을 바꿔줘야함 Post_Kor의 Status에 따라
         */
      ];
    }

    await executeQueries<CustomRowDataPacket>(queries);
    return createResponse(req, insertedId, 200);
  } catch (err) {
    return handleError(err);
  }
}
