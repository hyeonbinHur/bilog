import handleError from "@/helper/apiUtils";
import { executeQuery } from "@/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");
    const sql = `SELECT * FROM Post WHERE title LIKE ?`;
    const result = await executeQuery(sql, [`%${query}%`]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
