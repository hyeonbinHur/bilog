import handleError from "@/helper/apiUtils";
import { executeQuery } from "@/lib/mysqlClient";
import { RelatedPost } from "@/type";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const post_id = req.nextUrl.searchParams.get("post_id")?.toString();
    if (!post_id) {
      throw new Error("required filed empty");
    }
    const sql =
      "SELECT post_id, title, createdAt, comments, type FROM Post WHERE category_id = (SELECT category_id FROM Post WHERE post_id = ?) AND post_id > ? ORDER BY post_id ASC LIMIT 3";
    const result = await executeQuery(sql, [post_id, post_id]);
    if (Array.isArray(result) && result.length === 0) {
      const sql =
        "SELECT post_id, title, createdAt, comments, type FROM Post WHERE category_id = (SELECT category_id FROM Post WHERE post_id = ?) AND post_id < ? ORDER BY post_id ASC LIMIT 3";
      const result = await executeQuery(sql, [post_id, post_id]);
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 200 });
    }
  } catch (err) {
    return handleError(err);
  }
}