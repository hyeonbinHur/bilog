import handleError from "@/src/helper/apiUtils";
import { executeQuery } from "@/src/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const typeParam = req.nextUrl.searchParams.get("type");
    const pathType = typeParam === "blog" ? "BLOG" : "ARTICLE";
    const limit = 7;
    const pageParam = req.nextUrl.searchParams.get("page");
    const page = pageParam ? parseInt(pageParam) : 1; // page 파라미터가 없으면 1로 설정
    const offset = (page - 1) * limit;

    // 첫 번째 쿼리: 게시물 목록 가져오기
    const postsQuery =
      "SELECT * FROM Post_ENG WHERE type = ? ORDER BY post_id DESC LIMIT ? OFFSET ?";
    const posts = await executeQuery(postsQuery, [pathType, limit, offset]); // limit과 offset을 숫자로 전달

    // 두 번째 쿼리: 총 게시물 수 가져오기
    const countQuery =
      "SELECT COUNT(*) AS totalCount FROM Post_ENG WHERE type = ?";
    const totalCount = await executeQuery(countQuery, [pathType]);
    return NextResponse.json(
      {
        posts: posts,
        totalCount,
      },
      { status: 200 }
    );
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { post_id, title, subtitle, content } = body;
    const values = [post_id, title, subtitle, content];
    const sql =
      "INSERT INTO Post_ENG (post_id, title, subtitle, content) VALUES (?,?,?,?)";
    const result = await executeQuery(sql, values);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
