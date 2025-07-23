import { createResponse, handleError } from "@/src/helper/apiUtils";
import type { CommentUpdate } from "@/type";
import { NextRequest } from "next/server";
import { commentService } from "../../services/commentService";

interface Props {
  id: string;
}

export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  try {
    const commentId: string | undefined = params.id;
    const updateData: CommentUpdate = await req.json();

    if (!commentId) {
      throw new Error("댓글 ID가 필요합니다.");
    }
    if (!updateData.content || updateData.content.length === 0) {
      throw new Error("댓글 내용이 필요합니다.");
    }
    const result = await commentService.updateComment(commentId, updateData);
    return createResponse(req, result);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Props }) {
  try {
    const commnetId = params.id;
    if (!params.id) {
      throw new Error("some error");
    }
    const result = await commentService.deleteComment(commnetId);
    return createResponse(req, result);
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
}
