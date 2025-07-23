/**
 * getUserByEmail()
 * createUser()
 */

import type { IUser } from "@/type";
import { supabase } from "../supabase/supabaseClient";

export const userService = {
  async getAllUser() {
    const { data, error } = await supabase.from("user").select("*");

    if (error) {
      throw new Error(`사용자 목록 조회 실패: ${error.message}`);
    }

    return {
      success: true,
      message: "사용자 목록을 성공적으로 조회했습니다.",
      data: data,
    };
  },

  async getUserByEmail(
    email: string
  ): Promise<{ success: boolean; message: string; data: boolean }> {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email);
    /**
     * TODO: Create Error Handler that returns Error Object
     *  {
     *      customCode: based on Real Error Code,
     *      reason: Error reason
     *  }
     */
    if (error) {
      throw new Error("이메일 검증 중 에러 발생");
    }

    return {
      success: true,
      message: "로그인에 성공하였습니다.",
      data: data[0],
    };
  },
  async checkUserByEmail(
    email: string
  ): Promise<{ success: boolean; message: string; data: boolean }> {
    const { data, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email);
    /**
     * TODO: Create Error Handler that returns Error Object
     *  {
     *      customCode: based on Real Error Code,
     *      reason: Error reason
     *  }
     */
    if (error) {
      throw new Error("이메일 검증 중 에러 발생");
    }

    const isAvailable = data.length === 0;
    return {
      success: true,
      message: isAvailable
        ? "사용 가능한 이메일입니다."
        : "이미 사용 중인 이메일입니다.",
      data: isAvailable,
    };
  },

  async createUser(userData: IUser) {
    const emailCheckResult = await this.checkUserByEmail(userData.email);
    if (emailCheckResult.data) {
      const { data, error } = await supabase
        .from("user")
        .insert(userData)
        .select()
        .single();

      if (error) {
        throw new Error(`사용자 생성 실패: ${error.message}`);
      }

      return {
        success: true,
        message: "사용자가 성공적으로 생성되었습니다.",
        data: data,
      };
    } else {
      throw new Error("이미 존재하는 사용자입니다.");
    }
  },
};
