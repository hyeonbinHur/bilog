import {
  createConnection,
  CustomRowDataPacket,
  executeQueries,
  executeQuery,
  QueryConfig,
} from "@/src/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2";
import { IMainPostCard, ISubPostCard } from "@/type";
import { postCardFormatting } from "@/src/helper/postHelper";
import {
  createResponse,
  getCommonParams,
  handleError,
} from "@/src/helper/apiUtils";

const getSpecificPosts = async (req: NextRequest) => {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
    // ⭐️ step 1: get common params ⭐️
    const { limit, offset, locale, pathType } = getCommonParams(req);
    const values = [pathType, limit, offset];
    const countValues = [pathType];

    // ⭐️ step 2: contruct queries and values ⭐️
    let queries: QueryConfig[];
    if (locale === "ko") {
      queries = [
        {
          sql: "SELECT * FROM Post WHERE type = ? AND is_kor = 1 ORDER BY post_id DESC LIMIT ? OFFSET ?",
          values: values,
        },
        {
          sql: "SELECT * FROM Post_Kor WHERE type = ? AND is_created = 1 ORDER BY post_id DESC LIMIT ? OFFSET ?",
          values: values,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post WHERE type = ? AND is_kor = 1",
          values: countValues,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post_Kor WHERE type = ? AND is_created = 1",
          values: countValues,
        },
      ];
    } else {
      queries = [
        {
          sql: "SELECT * FROM Post WHERE type = ? AND is_eng = 1 ORDER BY post_id DESC LIMIT ? OFFSET ?",
          values: values,
        },
        {
          sql: "SELECT * FROM Post_Eng WHERE type = ? AND is_created = 1 ORDER BY post_id DESC LIMIT ? OFFSET ?",
          values: values,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post WHERE type = ? AND is_eng = 1",
          values: countValues,
        },
        {
          sql: "SELECT COUNT(*) AS totalCount FROM Post_Eng WHERE type = ? AND is_created = 1",
          values: countValues,
        },
      ];
    }
    // ⭐️ step 3: execute queries ⭐️
    const [mainResult, subResult, mainCountResult, subCountResult] =
      await executeQueries<CustomRowDataPacket>(connection, queries);
    if (
      mainCountResult[0][0]?.totalCount !== subCountResult[0][0]?.totalCount
    ) {
      throw new Error("unknown error occurred on post category");
    }

    // ⭐️ step 4: process data ⭐️
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
    console.error(err);
    await connection.rollback();
    return handleError(err);
  } finally {
    await connection.end();
  }
};

const getAllPosts = async (req: NextRequest) => {
  try {
    const locale = req.nextUrl.searchParams.get("locale");
    let sql: string;
    if (locale === "ko") {
      sql = "SELECT * FROM Post WHERE is_kor = 1 ORDER BY post_id DESC";
    } else {
      sql = "SELECT * FROM Post WHERE is_eng = 1 ORDER BY post_id DESC";
    }
    const result = await executeQuery(sql);
    return createResponse(req, result, 200);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
};

export async function GET(req: NextRequest) {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
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
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
    const body = await req.json();
    const lang = req.nextUrl.searchParams.get("lang");

    const values = [
      body.title,
      body.subtitle,
      body.thumbnail,
      body.thumbnail_alt,
      body.content,
      body.status,
      body.category_id,
      body.category_name,
      body.type,
      0, // comments
      new Date(), //created_at
      false, // is_updated
    ];

    if (lang === "Korean") {
      values.push(true, false);
    } else {
      values.push(false, true);
    }

    const sql =
      "INSERT INTO Post (title, subtitle, thumbnail, thumbnail_alt, content, status, category_id, category_name, type, comments, created_at, is_updated, is_kor, is_eng) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    const result = await connection.query(sql, values);

    const insertedId = (result[0] as ResultSetHeader).insertId;

    let queries: QueryConfig[];
    const mainVal = [
      insertedId,
      body.title,
      body.subtitle,
      body.content,
      body.type,
      body.category_id,
    ];
    const subVal = [insertedId, body.type, body.category_id];

    if (lang === "Korean") {
      queries = [
        {
          sql: "INSERT INTO Post_Kor (post_id, title, subtitle, content, type, category_id, is_created) VALUES (?,?,?,?,?,?,1)",
          values: mainVal,
        },
        {
          sql: "INSERT INTO Post_Eng (post_id , type, category_id, is_created) VALUES (?, ?, ?, 0)",
          values: subVal,
        },
      ];
    } else {
      queries = [
        {
          sql: "INSERT INTO Post_Eng (post_id, title, subtitle, content, type, category_id, is_created) VALUES (?,?,?,?,?,?,1)",
          values: mainVal,
        },
        {
          sql: "INSERT INTO Post_Kor (post_id, type, category_id, is_created) VALUES (?, ? ,?, 0)",
          values: subVal,
        },
      ];
    }

    const [mainResult, subResult] = await executeQueries<CustomRowDataPacket>(
      connection,
      queries
    );

    await connection.commit();
    return createResponse(req, insertedId, 200);
    return NextResponse.json({ insertedId }, { status: 200 });
  } catch (err) {
    console.log(err);
    await connection.rollback();
    return handleError(err);
  } finally {
    await connection.end();
  }
}
