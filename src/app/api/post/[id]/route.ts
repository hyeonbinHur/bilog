import handleError from "@/src/helper/apiUtils";
import { postFormatting } from "@/src/helper/postHelper";
import {
  executeQuery,
  createConnection,
  QueryConfig,
  CustomRowDataPacket,
  executeQueries,
} from "@/src/lib/mysqlClient";
import { IMainPost, IPost, ISubPost } from "@/type";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Props }) {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
    const localeParam = req.nextUrl.searchParams.get("locale");
    let queries: QueryConfig[];
    if (localeParam === "ko") {
      queries = [
        {
          sql: "SELECT * FROM Post WHERE post_id = ?",
          values: [params.id],
        },
        {
          sql: "SELECT * FROM Post_KOR WHERE post_id = ?",
          values: [params.id],
        },
      ];
    } else {
      queries = [
        {
          sql: "SELECT * FROM Post WHERE post_id = ?",
          values: [params.id],
        },
        {
          sql: "SELECT * FROM Post_ENG WHERE post_id = ?",
          values: [params.id],
        },
      ];
    }
    const [mainResult, subResult] = await executeQueries<CustomRowDataPacket>(
      connection,
      queries
    );
    const mainPost: IMainPost = (mainResult as any[])[0][0];
    const subPost: ISubPost = (subResult as any[])[0][0];
    const post: IPost = postFormatting(mainPost, subPost);
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    await connection.rollback();
    return handleError(err);
  } finally {
    await connection.end();
  }
}
export async function DELETE(req: NextRequest, { params }: { params: Props }) {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
    const sql = "DELETE FROM Post WHERE post_id = ?";
    const korSql = "DELETE FROM Post_KOR WHERE post_id = ?";
    const engSql = "DELETE FROM Post_ENG WHERE post_id = ?";
    await Promise.all([
      connection.query(korSql, [params.id]),
      connection.query(engSql, [params.id]),
    ]);
    await connection.query(sql, [params.id]);
    await connection.commit();
    const result = await executeQuery(sql, [params.id]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    await connection.rollback();
    return handleError(err);
  } finally {
    await connection.end();
  }
}

const postPatchContent = async (
  req: NextRequest,
  body: any,
  { params }: { params: Props }
) => {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
    const langParam = req.nextUrl.searchParams.get("lang");
    if (!params.id) {
      throw new Error("post id is required");
    }
    if (!langParam) {
      throw new Error("language type is required to update post");
    }
    let queries: QueryConfig[];
    const values = [
      body.thumbnail,
      body.thumbnail_alt,
      body.status,
      body.category_id,
      body.category_name,
      body.updatedAt,
      body.isUpdated,
      params.id,
    ];
    const subVal1 = [
      body.title,
      body.subtitle,
      body.content,
      body.category_id,
      params.id,
    ];
    const subVal2 = [body.category_id, params.id];
    if (langParam === "Korean") {
      queries = [
        {
          sql: `UPDATE Post SET thumbnail = ?, thumbnail_alt = ?, status = ?, category_id = ?, category_name = ?, updatedAt = ?, isUpdated = ?, isKOR = 1 WHERE post_id = ?`,
          values: values,
        },
        {
          sql: "UPDATE Post_KOR SET title = ? , subtitle = ? , content = ? , category_id = ?, isCreated = 1 WHERE post_id = ?",
          values: subVal1,
        },
        {
          sql: "UPDATE Post_ENG SET category_id = ? WHERE post_id = ?",
          values: subVal2,
        },
      ];
    } else {
      queries = [
        {
          sql: `UPDATE Post SET thumbnail = ?, thumbnail_alt = ?, status = ?, category_id = ?, category_name = ?, updatedAt = ? , isUpdated = ?, isENG = 1 WHERE post_id = ?`,
          values: values,
        },
        {
          sql: "UPDATE Post_KOR SET category_id = ? WHERE post_id = ?",
          values: subVal2,
        },
        {
          sql: "UPDATE Post_ENG SET title = ? , subtitle = ? , content = ? , category_id = ?, isCreated = 1 WHERE post_id = ?",
          values: subVal1,
        },
      ];
    }
    await executeQueries<CustomRowDataPacket>(connection, queries);
    await connection.commit();
    return NextResponse.json(
      { message: "Successfully updated" },
      { status: 200 }
    );
  } catch (err) {
    await connection.rollback();
    return handleError(err);
  } finally {
    await connection.end();
  }
};

const postPatchComment = async (body: any, { params }: { params: Props }) => {
  try {
    if (!params.id) {
      throw new Error("Post ID is required");
    }
    const sql = "UPDATE Post SET comments = ? WHERE post_id = ?";
    const values = [body.comments, params.id];
    const result = await executeQuery(sql, values);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
};

export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  const body = await req.json();
  const action = body.action;
  if (!action) {
    return NextResponse.json(
      { message: "Action is required" },
      { status: 400 }
    );
  }
  try {
    if (action === "increment_comment") {
      return await postPatchComment(body, { params });
    } else if (action === "update_post") {
      return await postPatchContent(req, body, { params });
    } else {
      return NextResponse.json(
        { message: "Invalid action type" },
        { status: 400 }
      );
    }
  } catch (err) {
    return handleError(err);
  }
}
