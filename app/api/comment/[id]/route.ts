import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/mysqlClient";

interface Props {
  id: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Props }) {
  try {
    const sql = "DELETE FROM Comment WHERE comment_id = ?";
    const result = await executeQuery(sql, [params.id]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unknown error" });
  }
}
