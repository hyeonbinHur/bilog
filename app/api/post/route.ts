import { executeQuery } from "@/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const sql = "SELECT * FROM Post";
    const result = await executeQuery(sql);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "unknown error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content } = body;
    const values = [title, content];
    const sql = "INSERT INTO Post (title, content) VALUES (?,?)";
    const result = await executeQuery(sql, values);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "unknown error" }, { status: 500 });
  }
}
