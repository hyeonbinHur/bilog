import handleError from "@/src/helper/apiUtils";
import { executeQuery } from "@/src/lib/mysqlClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const sql = "INSERT INTO User (username, email, avatar) VALUES (?,?,?)";
    const { name, email, image } = await request.json();
    const values = [name, email, image];
    const result = await executeQuery(sql, values);
    return NextResponse.json(
      { message: "User successfully signed up", result },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
}
