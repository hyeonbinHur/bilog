import { executeQuery } from "@/src/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";
import handleError from "@/src/helper/apiUtils";

export async function GET(req: NextRequest) {
  try {
    const comment_id = req.nextUrl.searchParams.get("comment_id");
    if (!comment_id) {
      throw new Error("comment id is required");
    }
    const sql = "SELECT * FROM CommentLike WHERE comment_id = ?";
    const values = [comment_id];
    const result = await executeQuery(sql, values);
    return NextResponse.json(
      { message: "Read certain comment's like", result },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    //comment_id, user_id
    const { comment_id, user_id, is_like } = body;
    if (!comment_id || !user_id || !is_like) {
      throw new Error("Mandatory filed is empty");
    }
    const values = [comment_id, user_id, is_like];
    const sql =
      "INSERT INTO CommentLike (comment_id, user_id, is_like) VALUES (?, ?, ?)";
    const result = await executeQuery(sql, values);
    return NextResponse.json(
      { message: "create like successfully", result },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
}
