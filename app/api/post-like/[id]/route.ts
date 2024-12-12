import handleError from "@/helper/apiUtils";
import { executeQuery } from "@/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  id: string;
}

export async function DELETE({ params }: { params: Props }) {
  try {
    const comment_like_id = params.id;
    if (!comment_like_id) {
      throw new Error("comment like id is requird");
    }
    const sql = "DELETE FROM CommentLike WHERE comment_like_id = ?";
    const value = [comment_like_id];
    const result = await executeQuery(sql, value);

    return NextResponse.json(
      { message: "delete comment like successfully", result },
      { status: 200 }
    );
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  try {
    const comment_like_id = params.id;
    if (!comment_like_id) {
      throw new Error("comment like id is required");
    }
    const { is_like } = await req.json();

    if (!is_like) {
      throw new Error("like purpose is required");
    }

    const sql = "UPDATE CommentLike SET is_like = ? WHERE comment_like_id = ?";
    const values = [comment_like_id, is_like];
    const result = await executeQuery(sql, values);

    return NextResponse.json(
      { message: "comment like updated successfully", result },
      { status: 200 }
    );
  } catch (err) {
    return handleError(err);
  }
}
