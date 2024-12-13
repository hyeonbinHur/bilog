import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/mysqlClient";
import handleError from "@/helper/apiUtils";

interface Props {
  id: string;
}

export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  try {
    const { content, user_id, like, dislike } = await req.json(); // 요청 본문에서 content 가져오기
    if (!params.id) {
      throw new Error("comment id is required");
    }
    const sql = "UPDATE Comment SET content = ? WHERE comment_id = ?";
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Props }) {
  try {
    const sql = "DELETE FROM Comment WHERE comment_id = ?";
    const result = await executeQuery(sql, [params.id]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unknown error" });
  }
}
