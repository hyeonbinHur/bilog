import { supabase } from "../supabase/supabaseClient";

export const testService = {
  async getAllTest() {
    let { data, error } = await supabase.from("test").select("*");
    if (error) {
      console.error("Error Details:", error);
      throw new Error("Error from get test");
    }
    return data;
  },

  async getOneTest(id: number) {
    const { data, error } = await supabase
      .from("test")
      .select("*")
      .eq("id", id) // 👈 순서 수정: ("컬럼명", 값)
      .single();
    if (error) {
      throw new Error("error from getOneTest");
    }
    return data;
  },

  async createOneTest(name: string) {
    const { data, error } = await supabase
      .from("test")
      .insert({ name })
      .select()
      .single();
    console.log(error);
    if (error) {
      throw new Error("Error from create One Test");
    }
    return data;
  },

  async deleteOneTest(id: number) {
    const { data, error } = await supabase
      .from("test")
      .delete()
      .eq("id", id)
      .select(); // 삭제된 데이터 반환하려면 select() 추가
    if (error) {
      throw new Error("Error from delete one test");
    }
    return data;
  },

  async updateOneTest(id: number, name: string) {
    const { data, error } = await supabase
      .from("test")
      .update({ name })
      .eq("id", id)
      .select()
      .single();
    if (error) {
      throw new Error("Error from update one test");
    }
    return data;
  },
};
