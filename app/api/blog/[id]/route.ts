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
    const posts = result as IPost[];
    if (posts.length === 0) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(posts[0], { status: 200 });
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
