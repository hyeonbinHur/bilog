import { createResponse, handleError } from "@/src/helper/apiUtils";
import { executeQuery } from "@/src/lib/mysqlClient.server";
import { RelatedPost } from "@/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const post_id = req.nextUrl.searchParams.get("post_id")?.toString();
    if (!post_id) {
      throw new Error("required filed empty");
    }
    const sql =
      "SELECT post_id, title, created_at, comments, type FROM Post WHERE category_id = (SELECT category_id FROM Post WHERE post_id = ?) AND post_id > ? ORDER BY post_id ASC LIMIT 3";
    const result = await executeQuery(sql, [post_id, post_id]);
    if (Array.isArray(result) && result.length === 0) {
      const sql =
        "SELECT post_id, title, created_at, comments, type FROM Post WHERE category_id = (SELECT category_id FROM Post WHERE post_id = ?) AND post_id < ? ORDER BY post_id ASC LIMIT 3";
      const result = await executeQuery(sql, [post_id, post_id]);
      return createResponse(req, result, 200);
      return NextResponse.json(result, { status: 200 });
    } else {
      return createResponse(req, result, 200);

      return NextResponse.json(result, { status: 200 });
    }
  } catch (err) {
    return handleError(err);
  }
}
