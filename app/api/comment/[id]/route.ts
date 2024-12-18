import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/mysqlClient";
import handleError from "@/helper/apiUtils";
interface Props {
  id: string;
}
export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  try {
    if (!params.id) {
      throw new Error("comment id is required");
    }

    const data = await req.json();
    const content = data.content;
    const updatedAt = data.updatedAt;
    const isUpdated = data.isUpdated;
    if (!content || content.length === 0) {
      throw new Error("comment must includes content");
    }
    const sql =
      "UPDATE Comment SET content = ?, updatedAt = ?, isUpdated = ? WHERE comment_id = ?";
    const values = [content, updatedAt, isUpdated, params.id];
    const result = await executeQuery(sql, values);
    return NextResponse.json(result, { status: 200 });
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
    return handleError(err);
  }
}
