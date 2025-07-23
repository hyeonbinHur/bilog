import type { CategoryBase } from "@/type";
import { supabase } from "../supabase/supabaseClient";

export const categoryService = {
  async getAllCategories() {
    const { data, error } = await supabase.from("categories").select("*");
    
    if (error) {
      throw new Error(`카테고리 목록 조회 실패: ${error.message}`);
    }

    return {
      success: true,
      message: "카테고리 목록을 성공적으로 조회했습니다.",
      data: data
    };
  },

  async createCategory(category: CategoryBase) {
    const { data, error } = await supabase
      .from("categories")
      .insert({
        category_name: category.category_name,
        category_type: category.category_type,
      })
      .select()
      .single();
    
    if (error) {
      throw new Error(`카테고리 생성 실패: ${error.message}`);
    }

    return {
      success: true,
      message: "카테고리가 성공적으로 생성되었습니다.",
      data: data
    };
  },
  async getCategoryById(categoryId: string) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("category_id", categoryId)
      .single();

    if (error) {
      throw new Error(`카테고리 조회 실패: ${error.message}`);
    }

    return {
      success: true,
      message: "카테고리를 성공적으로 조회했습니다.",
      data: data
    };
  },

  async updateCategory(newCategoryName: string, categoryId: string) {
    const { data, error } = await supabase
      .from("categories")
      .update({ category_name: newCategoryName })
      .eq("category_id", categoryId)
      .select()
      .single();
    
    if (error) {
      throw new Error(`카테고리 업데이트 실패: ${error.message}`);
    }

    return {
      success: true,
      message: "카테고리가 성공적으로 업데이트되었습니다.",
      data: data
    };
  },

  async deleteCategory(categoryId: string) {
    const { data, error } = await supabase
      .from("categories")
      .delete()
      .eq("category_id", categoryId)
      .select()
      .single();

    if (error) {
      throw new Error(`카테고리 삭제 실패: ${error.message}`);
    }

    return {
      success: true,
      message: "카테고리가 성공적으로 삭제되었습니다.",
      data: data
    };
  },
};
