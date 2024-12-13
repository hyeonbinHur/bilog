import handleError from "@/helper/apiUtils";
import { executeQuery } from "@/lib/mysqlClient";
import { IPost } from "@/type";
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
    return NextResponse.json({ message: "Unknown error" });
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
      "thumbnail",
      "thumbnail_alt",
      "content",
      "status",
      "like",
      "dislike",
    ];
    let clauses = "";
    const values = [];
    for (const field of updatableFields) {
      if (body[field] !== undefined) {
        clauses += ` ${field} = ?`;
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
    let sql = "UPDATE Post SET";
    sql += clauses;
    sql += " WHERE post_id = ?";
    const result = await executeQuery(sql, values);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
