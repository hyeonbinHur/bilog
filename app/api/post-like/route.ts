import { executeQuery } from "@/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";
import handleError from "@/helper/apiUtils";

export async function GET(req: NextRequest) {
  try {
    const post_id = req.nextUrl.searchParams.get("post_id");
    if (!post_id) {
      throw new Error("post id is required");
    }
    const sql = "SELECT * FROM PostLike WHERE post_id = ?";
    const values = [post_id];
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
