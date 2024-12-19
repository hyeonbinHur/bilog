import handleError from "@/src/helper/apiUtils";
import { executeQuery } from "@/src/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  id: string;
}
export async function GET(req: NextRequest, { params }: { params: Props }) {
  try {
    const sql = "SELECT * FROM Post WHERE post_id = ?";
    const result = await executeQuery(sql, [params.id]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
export async function PUT(req: NextRequest, { params }: { params: Props }) {
  try {
    const { title, content } = await req.json();
    const sql = "UPDATE Post SET title = ?, content = ? WHERE post_id = ?";
    const result = await executeQuery(sql, [title, content, params.id]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest, { params }: { params: Props }) {
  try {
    const sql = "DELETE FROM Post WHERE post_id = ?";
    const result = await executeQuery(sql, [params.id]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
}
export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  try {
    if (!params.id) {
      throw new Error("post id is required");
    }
    const body = await req.json();

    const updatableFields = [
      "title",
      "subtitle",
      "thumbnail",
      "thumbnail_alt",
      "content",
      "status",
      "comments",
      "category_id",
      "updatedAt",
      "isUpdated",
    ];

    // 업데이트 플래그랑, 업데이트 날짜 변경

    let clauses = [];
    const values = [];
    for (const field of updatableFields) {
      if (body[field] !== undefined) {
        clauses.push(`${field} = ?`);
        values.push(body[field]);
      }
    }
    if (values.length === 0) {
      return NextResponse.json(
        { message: "Post nothing changed" },
        { status: 204 }
      );
    }
    values.push(params.id);
    const sql = `UPDATE Post SET ${clauses.join(", ")} WHERE post_id = ?`;
    const result = await executeQuery(sql, values);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
