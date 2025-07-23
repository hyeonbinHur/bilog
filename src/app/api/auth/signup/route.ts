import { createResponse, handleError } from "@/src/helper/apiUtils";
import { NextRequest } from "next/server";
import { userService } from "../../services/userService";

export async function POST(req: NextRequest) {
  try {
    const { name, email, image } = await req.json();
    if (!name || !email || !image) {
      throw new Error("회원가입에 필요한 정보가 부족합니다.");
    }
    const userData = {
      name,
      email,
      image,
    };
    const result = await userService.createUser(userData);
    return createResponse(req, { result });
    return result;
  } catch (err) {
    return handleError(err);
  }
}
