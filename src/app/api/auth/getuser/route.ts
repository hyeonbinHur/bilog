import { createResponse, handleError } from "@/src/helper/apiUtils";
import { NextRequest } from "next/server";
import { userService } from "../../services/userService";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    throw new Error("Email is required");
  }
  try {
    const user = await userService.getUserByEmail(email);

    return createResponse(req, user);
    // return user;
  } catch (err) {
    return handleError(err);
  }
}
