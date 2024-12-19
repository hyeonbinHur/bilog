import { createConnection, executeQuery } from "@/src/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

// GET 핸들러
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sql = "SELECT * FROM test WHERE idtest = ?";
    const result = await executeQuery(sql, [params.id]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}

// PUT 핸들러
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, body } = await request.json();
    const sql = "UPDATE test SET title = ?, body = ? WHERE idtest = ?";
    const values = [title, body, params.id];
    await executeQuery(sql, values);
    return NextResponse.json(
      { message: "Successfully updated" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}

// DELETE 핸들러
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sql = "DELETE FROM test WHERE idtest = ?";
    await executeQuery(sql, [params.id]);
    return NextResponse.json(
      { message: "Successfully deleted" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
