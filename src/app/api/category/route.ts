import { createResponse, handleError } from "@/src/helper/apiUtils";
import { executeQueries, executeQuery } from "@/src/lib/mysqlClient.server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("executeQuery called");
    const type: string | null = req.nextUrl.searchParams.get("type");
    const sql =
      "SELECT * FROM Category where category_type = ? ORDER BY category_id ASC";
    const testSql = [{ sql: sql, values: [type] }];
    if (!type) {
      throw new Error("category type is required");
    }
    const result = await executeQueries(testSql);
    return createResponse(req, result, 200);
  } catch (err) {
    console.error("--------------------------------------------------");
    console.error("error from api");
    console.error("--------------------------------------------------");
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
    return createResponse(req, result, 200);
  } catch (err) {
    return handleError(err);
  }
}
