import handleError from "@/src/helper/apiUtils";
import { executeQuery } from "@/src/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");
    const path = req.nextUrl.searchParams.get("type");
    const type = path === "blog" ? "BLOG" : "ARTICLE";
    const limit = 7;
    const pageParam = req.nextUrl.searchParams.get("page");
    const page = pageParam ? parseInt(pageParam) : 1; // page 파라미터가 없으면 1로 설정
    const offset = (page - 1) * limit;

    const postSql = `SELECT * FROM Post_KOR WHERE title LIKE ? AND type = ? ORDER BY post_id DESC LIMIT ? OFFSET ?`;

    const posts = await executeQuery(postSql, [
      `%${query}%`,
      type,
      limit,
      offset,
    ]);

    return NextResponse.json(
      {
        posts: posts,
      },
      { status: 200 }
    );
  } catch (err) {
    return handleError(err);
  }
}
