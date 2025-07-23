import {
  createResponse,
  getCommonParams,
  handleError,
} from "@/src/helper/apiUtils";
import { NextRequest } from "next/server";
import { postService } from "../../services/postService";

export async function GET(req: NextRequest) {
  try {
    const searchParam: string | null = req.nextUrl.searchParams.get("q");
    const userId = req.headers.get("user-id");
    const {
      limit,
      offset,
      locale,
    }: { limit: number; offset: number; locale: string | null } =
      getCommonParams(req);

    if (!limit || offset === null) {
      throw new Error("페이지네이션 정보가 전달되지 않았습니다.");
    }
    if (!searchParam) {
      throw new Error("검색 파라미터가 존재하지 않음");
    }
    if (!locale || (locale !== "ko" && locale !== "eng")) {
      throw new Error("유효하지 않은 언어 설정입니다.");
    }

    const result = await postService.getPostsByTitle(
      searchParam,
      limit,
      offset,
      locale,
      userId
    );

    return createResponse(req, {
      posts: result.data.posts,
      totalCount: result.data.totalCount,
    });
  } catch (err) {
    return handleError(err);
  } finally {
  }
}
