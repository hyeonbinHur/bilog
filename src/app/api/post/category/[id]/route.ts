import {
  createResponse,
  getCommonParams,
  handleError,
} from "@/src/helper/apiUtils";
import { NextRequest } from "next/server";
import { postService } from "../../../services/postService";
interface Props {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Props }) {
  try {
    const { limit, offset, locale } = getCommonParams(req);
    const categoryId = params.id;
    const userId: string | null = req.headers.get("user-id");

    if (!categoryId) {
      throw new Error("카테고리 아이디가 선택되지 않았습니다.");
    }

    if (!limit || offset === null || !locale) {
      throw new Error("페이지네이션으로부터 정보를 받아오지 못하였습니다.");
    }
    if (!locale || (locale !== "ko" && locale !== "en")) {
      throw new Error("유효하지 않은 언어 설정입니다.");
    }
    const result = await postService.getPostsByCategory(
      limit,
      offset,
      locale,
      categoryId,
      userId
    );
    //Todo Response formmat must be createResponse(req, result)
    //But if I change it now, it takes too long time it's 4am
    //Change it tmr
    return createResponse(req, {
      posts: result.data.posts,
      totalCount: result.data.totalCount,
    });
  } catch (err) {
    return handleError(err);
  } finally {
  }
}
