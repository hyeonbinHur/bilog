import { NextResponse, NextRequest } from "next/server";
import { executeQuery } from "@/lib/mysqlClient";
import handleError from "@/helper/apiUtils";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  try {
    const sql = "SELECT * FROM User WHERE email = ?";
    const result = await executeQuery(sql, [email]);
    // `result`가 배열인지 확인 후 접근
    if (!Array.isArray(result) || result.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    return NextResponse.json(result[0]); // 특정 유저 정보 반환
  } catch (err) {
    return handleError(err);
  }
}
