import { executeQuery } from "@/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  post_id: string;
}

export async function GET({ params }: { params: Props }) {
  try {
    const sql = "SELECT * FROM Post WHERE post_id = ?";
    const result = await executeQuery(sql, [params.post_id]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "unknown error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_id, post_id, content } = body;
    const values = [user_id, post_id, content];
    const sql =
      "INSERT INTO Comment (user_id, post_id, content) VALUES (?,?,?)";
    const result = await executeQuery(sql, values);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "unknown error" }, { status: 500 });
  }
}
