import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/mysqlClient";

interface Props {
  id: string;
}

export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  try {
    const { action, content, user_id, like, dislike } = await req.json(); // 요청 본문에서 content 가져오기

    const numLike = isNaN(parseInt(like)) ? 0 : parseInt(like);
    const numDisLike = isNaN(parseInt(dislike)) ? 0 : parseInt(dislike);

    if (action === "update content") {
      if (!content) {
        return NextResponse.json(
          { message: "Content is required" },
          { status: 400 }
        );
      }
      const sql = "UPDATE Comment SET content = ? WHERE comment_id = ?";
      const result = await executeQuery(sql, [content, params.id]);
      return NextResponse.json(
        { message: "Comment updated successfully", result },
        { status: 200 }
      );
    } else {
      if (!user_id) {
        return NextResponse.json(
          { message: "user id is required" },
          { status: 400 }
        );
      }
      if (action === "like") {
        const sql = "UPDATE Comment SET `like` = ? WHERE comment_id = ?";
        const result = await executeQuery(sql, [
          (numLike + 1).toString(),
          params.id,
        ]);
        return NextResponse.json(
          { message: "Add like successfully", result },
          { status: 200 }
        );
      } else if (action === "remove like") {
        const sql = "UPDATE Comment SET `like` = ? WHERE comment_id = ?";
        const result = await executeQuery(sql, [
          (numLike - 1).toString(),
          params.id,
        ]);
        return NextResponse.json(
          { message: "Remove like successfully", result },
          { status: 200 }
        );
      } else if (action === "dislike") {
        const sql = "UPDATE Comment SET `dislike` = ? WHERE comment_id = ?";
        const result = await executeQuery(sql, [
          (numDisLike + 1).toString(),
          params.id,
        ]);
        return NextResponse.json(
          { message: "Add dislike successfully", result },
          { status: 200 }
        );
      } else if (action === "remove dislike") {
        const sql = "UPDATE Comment SET `dislike` = ? WHERE comment_id = ?";
        const result = await executeQuery(sql, [
          (numLike - 1).toString(),
          params.id,
        ]);
        return NextResponse.json(
          { message: "Remove dislike successfully", result },
          { status: 200 }
        );
      }
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
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
