import { createResponse, handleError } from "@/src/helper/apiUtils";
import type { CommentBase } from "@/type";
import { NextRequest } from "next/server";
import { commentService } from "../services/commentService";

export async function GET(req: NextRequest) {
  try {
    const post_id: string | null = req.nextUrl.searchParams.get("post_id");
    if (!post_id) {
      throw new Error("no post id found");
    }
    const result = await commentService.getPostComments(post_id);
    return createResponse(req, result);
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, post_id, user_image, user_username, content } = body;

    const newComment: CommentBase = {
      user_id,
      user_image,
      user_username,

      post_id,
      content,

      like: 0,
      dislike: 0,
      created_at: new Date(),
    };

    const result = await commentService.createComment(newComment);
    return createResponse(req, result);
  } catch (err) {
    return handleError(err);
  }
}
