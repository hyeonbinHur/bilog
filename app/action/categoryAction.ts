"use server";

import { Category, CategoryForm } from "@/type";
import { revalidateTag } from "next/cache";

//CategoryForm
export const createCategoryAction = async (categoryForm: CategoryForm) => {
  try {
    const { category_name, category_type } = categoryForm;
    if (!category_name) {
    }
    if (!category_type) {
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`,
      {
        method: "POST",
        body: JSON.stringify(categoryForm),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidateTag(`category-${category_type}`);
    return {
      state: {
        status: false,
        error: "",
      },
    };
  } catch (err) {
    return {
      state: {
        status: false,
        error: `Error while creating category : ${err}`,
      },
    };
  }
};

//Category
export const deleteCategoryAction = async (category_id: number) => {
  try {
    if (!category_id) {
      throw new Error("category id is required");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category/${category_id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // revalidateTag()
    return {
      state: {
        status: false,
        error: "",
      },
    };
  } catch (err) {
    return {
      state: {
        status: false,
        error: `Error while creating category : ${err}`,
      },
    };
  }
};

//Category
export const updateCategoryAction = async (category: Category) => {
  try {
    const { category_name, category_id } = category;
    if (!category_id) {
      throw new Error("category id is required");
    }
    if (!category_name) {
      throw new Error("category name is required");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category/${category_id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ category_name: category_name }),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // revalidateTag();
    return {
      state: {
        status: true,
        error: "",
      },
    };
  } catch (err) {
    return {
      state: {
        status: false,
        error: `Error while creating category : ${err}`,
      },
    };
  }
};
