import { createConnection } from "@/src/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

// GET 메서드 처리
export async function GET() {
  try {
    const db = await createConnection();
    const sql = "SELECT * FROM test";
    const [result] = await db.query(sql);
    // NextResponse를 사용해 JSON 응답 반환
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content } = body;
    console.log(title, content);
    const db = await createConnection();
    const sql = "INSERT INTO test (title, body) VALUES (?, ?)";
    const [result] = await db.query(sql, [title, content]);
    console.log(result);
    return NextResponse.json(
      {
        message: `Data inserted successfully ${result}`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Unknown Error" }, { status: 500 });
  }
}
