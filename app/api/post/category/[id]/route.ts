import handleError from "@/helper/apiUtils";
import { executeQuery } from "@/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Props }) {
  try {
    const sql = `SELECT * FROM Post WHERE category_id = ?`;
    const result = await executeQuery(sql, [params.id]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
