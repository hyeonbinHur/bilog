import { createResponse, handleError } from "@/src/helper/apiUtils";
import type { CategoryBase } from "@/type";
import { NextRequest } from "next/server";
import { categoryService } from "../services/categoryService";

export async function GET(req: NextRequest) {
  try {
    const result = await categoryService.getAllCategories();
    return createResponse(req, result);
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { category_name, category_type } = await req.json();
    const newCategory: CategoryBase = {
      category_name,
      category_type,
    };
    const result = await categoryService.createCategory(newCategory);
    return createResponse(req, result);
  } catch (err) {
    console.log(err);
    return handleError(err);
  }
}
