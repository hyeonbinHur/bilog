import handleError from "@/src/helper/apiUtils";
import { executeQuery } from "@/src/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  id: string;
}
export async function GET(req: NextRequest, { params }: { params: Props }) {
  try {
    if (!params?.id) {
      throw new Error("post id is required");
    }
    const sql = "SELECT * FROM Post_ENG WHERE post_id = ?";
    const result = await executeQuery(sql, [params.id]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  try {
    if (!params?.id) {
      throw new Error("post id is required");
    }
    const body = await req.json();
    const updatableFields = ["title", "subtitle", "content"];
    const clauses = [];
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
    const sql = `UPDATE Post_ENG SET ${clauses.join(", ")} WHERE post_id = ?`;
    const result = await executeQuery(sql, values);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
export async function DELETE(req: NextRequest, { params }: { params: Props }) {
  try {
    if (!params?.id) {
      throw new Error("post id is required");
    }
    const sql = "DELETE FROM Post_ENG WHERE post_id = ?";
    const result = await executeQuery(sql, [params.id]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
