import handleError from "@/src/helper/apiUtils";
import { executeQuery } from "@/src/lib/mysqlClient";
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
    const postSql = `SELECT * FROM Post_ENG WHERE category_id = ? ORDER BY post_id DESC LIMIT ? OFFSET ?`;
    const posts = await executeQuery(postSql, [params.id, limit, offset]);

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
