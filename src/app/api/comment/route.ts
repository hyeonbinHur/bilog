import { handleError, createResponse } from "@/src/helper/apiUtils";
import { executeQuery } from "@/src/lib/mysqlClient.server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const post_id: string | null = req.nextUrl.searchParams.get("post_id");
    const sql =
      "SELECT * FROM Comment WHERE post_id = ? ORDER BY comment_id DESC";
    if (!post_id) {
      throw new Error("post_id is required");
    }
    const result = await executeQuery(sql, [post_id]);
    return createResponse(req, result, 200);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      User_id,
      post_id,
      content,
      like,
      dislike,
      user_avatar,
      user_username,
    } = body;

    const values = [
      User_id,
      post_id,
      content,
      like,
      dislike,
      user_avatar,
      user_username,
      new Date(),
    ];

    const sql =
      "INSERT INTO Comment (User_id, post_id, content, `like`, `dislike`, user_avatar, user_username, date) VALUES (?,?,?,?,?,?,?,?)";
    const result = await executeQuery(sql, values);
    return createResponse(req, result, 200);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
