import handleError from "@/helper/apiUtils";
import { executeQuery } from "@/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Props }) {
  try {
    const post_like_id = params.id;
    if (!post_like_id) {
      throw new Error("post like id is requird");
    }
    const sql = "DELETE FROM PostLike WHERE post_like_id = ?";
    const value = [post_like_id];
    const result = await executeQuery(sql, value);

    return NextResponse.json(
      { message: "delete post like successfully", result },
      { status: 200 }
    );
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  try {
    const post_like_id = params.id;
    if (!post_like_id) {
      throw new Error("post like id is required");
    }
    const { is_like } = await req.json();

    if (is_like === undefined) {
      throw new Error("like purpose is required");
    }
    const sql = "UPDATE PostLike SET is_like = ? WHERE post_like_id = ?";
    const values = [is_like, post_like_id];
    const result = await executeQuery(sql, values);

    return NextResponse.json(
      { message: "comment like updated successfully", result },
      { status: 200 }
    );
  } catch (err) {
    return handleError(err);
  }
}
