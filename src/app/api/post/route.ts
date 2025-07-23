import {
  createResponse,
  getCommonParams,
  handleError,
} from "@/src/helper/apiUtils";
import type { IPostBase } from "@/type";
import { NextRequest } from "next/server";
import { postService } from "../services/postService";

export async function GET(req: NextRequest) {
  try {
    const isAll = req.nextUrl.searchParams.get("all");
    if (isAll) {
      //모든 포스트 다 확인 => 테스트 완료
      const posts = await postService.getAllPosts();
      return createResponse(req, posts);
    } else {
      //유저가 어드민이라면 모든 포스트, 아니라면 public만
      const { limit, offset, locale } = getCommonParams(req);
      const user_id: string | null = req.headers.get("user-id");
      if (!limit || offset === null) {
        throw new Error("페이지네이션 정보가 전달되지 않았습니다.");
      }
      if (!locale || (locale !== "ko" && locale !== "eng")) {
        throw new Error("유효하지 않은 언어 설정입니다.");
      }
      const result = await postService.getSpecificPosts(
        limit,
        offset,
        locale,
        user_id
      );
      return createResponse(req, {
        posts: result.data.posts,
        totalCount: result.data.totalCount,
      });
    }
  } catch (err) {
    return handleError(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lang = req.nextUrl.searchParams.get("lang");
    if (!lang) {
      throw new Error("언어가 선택되지 않았습니다.");
    }
    const postData: IPostBase = {
      title: body.title,
      subtitle: body.subtitle,
      thumbnail: body.thumbnail,
      thumbnail_alt: body.thumbnail_alt,
      content: body.content,
      category_id: body.category_id,
      category_name: body.category_name,
      type: body.type,
      status: body.status,
      comments: 0,
      created_at: new Date(),
      updated_at: null,
      is_kor: body.is_kor,
      is_eng: body.is_eng,
    };
    const postId = await postService.createPost(postData, lang);
    return createResponse(req, postId);
  } catch (err) {
    return handleError(err);
  }
}
