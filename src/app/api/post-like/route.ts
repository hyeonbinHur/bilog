import { executeQuery } from "@/src/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";
import handleError from "@/src/helper/apiUtils";

export async function GET(req: NextRequest) {
  try {
    const post_id = req.nextUrl.searchParams.get("post_id")?.toString();
    const user_id = req.nextUrl.searchParams.get("user_id")?.toString();
    if (!post_id) {
      throw new Error("post id is required");
    }
    let sql = "SELECT * FROM PostLike WHERE post_id = ?";
    const values: string[] = [post_id];
    if (user_id) {
      sql += " AND user_id = ?";
      values.push(user_id);
    }
    const result = await executeQuery(sql, values);
    return NextResponse.json(
      { message: "Read certain post's like and dislike", result },
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
    const { post_id, user_id, is_like } = body;
    if (!post_id || !user_id || !is_like) {
      throw new Error("Mandatory filed is empty");
    }
    const values = [post_id, user_id, is_like];
    const sql =
      "INSERT INTO PostLike (post_id, user_id, is_like) VALUES (?, ?, ?)";
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
