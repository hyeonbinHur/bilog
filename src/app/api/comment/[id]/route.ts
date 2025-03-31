import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/src/lib/mysqlClient";
import { handleError, createResponse } from "@/src/helper/apiUtils";

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
    const updated_at = data.updated_at;
    if (!content || content.length === 0) {
      throw new Error("comment must includes content");
    }
    const sql =
      "UPDATE Comment SET content = ?, updated_at = ?,  WHERE comment_id = ?";
    const values = [content, updated_at, params.id];
    const result = await executeQuery(sql, values);
    return createResponse(req, result, 200);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Props }) {
  try {
    const sql = "DELETE FROM Comment WHERE comment_id = ?";
    const result = await executeQuery(sql, [params.id]);
    return createResponse(req, result, 200);

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
}
