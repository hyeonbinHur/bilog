import { handleError, createResponse } from "@/src/helper/apiUtils";
import { executeQuery } from "@/src/lib/mysqlClient";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const sql = "INSERT INTO User (username, email, avatar) VALUES (?,?,?)";
    const { name, email, image } = await req.json();
    const values = [name, email, image];
    const result = await executeQuery(sql, values);
    return createResponse(
      req,
      { message: "User successfully signed up", result },
      200
    );
  } catch (err) {
    return handleError(err);
  }
}
