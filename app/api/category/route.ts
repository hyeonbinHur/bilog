import handleError from "@/helper/apiUtils";
import { executeQuery } from "@/lib/mysqlClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const type: string | null = req.nextUrl.searchParams.get("type");
    const sql =
      "SELECT * FROM Category where category_type = ? ORDER BY category_id ASC";
    if (!type) {
      throw new Error("category type is required");
    }
    const result = await executeQuery(sql, [type]);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
export async function POST(req: NextRequest) {
  try {
    const { category_name, category_type } = await req.json();
    const values = [category_name, category_type];
    const sql =
      "INSERT INTO Category (category_name, category_type) VALUES (?,?)";
    const result = await executeQuery(sql, values);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
