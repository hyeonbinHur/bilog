import { createResponse, handleError } from "@/src/helper/apiUtils";
import { NextRequest } from "next/server";
import { categoryService } from "../../services/categoryService";
interface Props {
  id: string;
}
export async function DELETE(req: NextRequest, { params }: { params: Props }) {
  try {
    const categoryId = params.id;
    if (!categoryId) {
      throw new Error("category id is required");
    }
    const result = await categoryService.deleteCategory(categoryId);
    return createResponse(req, result);
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  try {
    const { category_name } = await req.json();
    const categoryId = params.id;

    if (!categoryId) {
      throw new Error("category id is required");
    }

    if (!category_name) {
      throw new Error("category name is required");
    }

    const result = await categoryService.updateCategory(
      category_name,
      categoryId
    );

    return createResponse(req, result);
  } catch (err) {
    return handleError(err);
  }
}

export async function GET(req: NextRequest, { params }: { params: Props }) {
  try {
    const categoryId = params.id;
    if (!params.id) {
      throw new Error("category id is required");
    }
    const result = await categoryService.getCategoryById(categoryId);
    return createResponse(req, result);
  } catch (err) {
    return handleError(err);
  }
}
