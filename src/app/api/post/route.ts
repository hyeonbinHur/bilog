import { createConnection, executeQuery } from "@/src/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";
import { ResultSetHeader } from "mysql2";

export async function GET(req: NextRequest) {
  try {
    const typeParam = req.nextUrl.searchParams.get("type");
    const pathType = typeParam === "blog" ? "BLOG" : "ARTICLE";
    const limit = 7;
    const pageParam = req.nextUrl.searchParams.get("page");
    const page = pageParam ? parseInt(pageParam) : 1; // page 파라미터가 없으면 1로 설정
    const offset = (page - 1) * limit;

    const lngParam = req.nextUrl.searchParams.get("lng");
    const lngType = lngParam === "ko" ? "isKOR" : "isENG";

    // 첫 번째 쿼리: 게시물 목록 가져오기
    const postsQuery =
      "SELECT * FROM Post WHERE type = ? ORDER BY post_id DESC LIMIT ? OFFSET ?";
    const posts = await executeQuery(postsQuery, [pathType, limit, offset]); // limit과 offset을 숫자로 전달

    // 두 번째 쿼리: 총 게시물 수 가져오기
    const countQuery = "SELECT COUNT(*) AS totalCount FROM Post WHERE type = ?";
    const totalCount = await executeQuery(countQuery, [pathType]);

    return NextResponse.json(
      {
        posts: posts,
        totalCount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "unknown error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
    const body = await req.json();

    const {
      title,
      subtitle,
      thumbnail,
      thumbnail_alt,
      content,
      status,
      createdAt,
      category_id,
      category_name,
      type,
      isKOR,
      isENG,
    } = body;

    const values = [
      title,
      subtitle,
      thumbnail,
      thumbnail_alt,
      content,
      status,
      0,
      createdAt,
      category_id,
      category_name,
      type,
      false,
      isKOR,
      isENG,
    ];

    const sql =
      "INSERT INTO Post (title,subtitle, thumbnail, thumbnail_alt, content, status, comments, createdAt, category_id, category_name, type, isUpdated, isKOR, isENG) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const result = await connection.query(sql, values);
    const insertedId = (result[0] as ResultSetHeader).insertId;

    let korSql = "";
    let engSql = "";

    const korValues = [insertedId];
    const engValues = [insertedId];

    if (isKOR === true) {
      korSql =
        "INSERT INTO Post_KOR (post_id, title, subtitle, content) VALUES (?,?,?,?)";
      engSql = "INSERT INTO Post_ENG (post_id) VALUES (?)";
      korValues.push(title, subtitle, content);
    } else {
      korSql = "INSERT INTO Post_KOR (post_id) VALUES (?)";
      engSql =
        "INSERT INTO Post_ENG (post_id, title, subtitle, content) VALUES (?,?,?,?)";
      engValues.push(title, subtitle, content);
    }

    await Promise.all([
      connection.query(korSql, korValues),
      connection.query(engSql, engValues),
    ]);

    await connection.commit();

    return NextResponse.json({ insertedId }, { status: 200 });
  } catch (err) {
    await connection.rollback();
    return NextResponse.json({ error: "unknown error" }, { status: 500 });
  } finally {
    await connection.end();
  }
}
