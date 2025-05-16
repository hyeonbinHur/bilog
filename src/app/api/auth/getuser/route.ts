import { NextResponse, NextRequest } from "next/server";
import { executeQuery } from "@/src/lib/mysqlClient.server";
import { handleError, createResponse } from "@/src/helper/apiUtils";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  try {
    const sql = "SELECT * FROM User WHERE email = ?";
    const result = await executeQuery(sql, [email]);
    if (!Array.isArray(result) || result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    return createResponse(req, result[0]);
  } catch (err) {
    return handleError(err);
  }
}
