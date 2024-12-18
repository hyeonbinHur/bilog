import handleError from "@/helper/apiUtils";
import { executeQuery } from "@/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Props }) {
  try {
    const limit = 7;
    const pageParam = req.nextUrl.searchParams.get("page");
    const page = pageParam ? parseInt(pageParam) : 1;
    const offset = (page - 1) * limit;
    const postSql = `SELECT * FROM Post WHERE category_id = ? ORDER BY post_id DESC LIMIT ? OFFSET ?`;
    const posts = await executeQuery(postSql, [params.id, limit, offset]);
    const countQuery =
      "SELECT COUNT(*) AS totalCount FROM Post WHERE category_id = ?";
    const totalCount = await executeQuery(countQuery, [params.id]);
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
