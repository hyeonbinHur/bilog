import { handleError, createResponse } from "@/src/helper/apiUtils";
import { executeQuery } from "@/src/lib/mysqlClient.server";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  id: string;
}
export async function DELETE(req: NextRequest, { params }: { params: Props }) {
  try {
    const sql = "DELETE FROM Category WHERE Category_id = ?";
    if (!params.id) {
      throw new Error("category id is required");
    }
    const result = await executeQuery(sql, [params.id]);
    return createResponse(req, result, 200);
    // return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  try {
    const sql = "UPDATE Category SET category_name = ? WHERE Category_id = ?";
    const { category_name } = await req.json();
    if (!params.id) {
      throw new Error("category id is required");
    }
    if (!category_name) {
      throw new Error("category name is required");
    }
    const result = await executeQuery(sql, [category_name, params.id]);
    return createResponse(req, result, 200);
    // return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
export async function GET(req: NextRequest, { params }: { params: Props }) {
  try {
    const sql = "SELECT * FROM Category WHERE Category_id = ?";
    if (!params.id) {
      throw new Error("category id is required");
    }
    const values = [params.id];
    const result = await executeQuery(sql, values);
    return createResponse(req, result, 200);
    // return NextResponse.json(result, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
