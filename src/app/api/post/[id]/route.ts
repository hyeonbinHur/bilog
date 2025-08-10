import { createResponse, handleError } from "@/src/helper/apiUtils";
import type { IPostUpdate } from "@/type";
import { NextRequest } from "next/server";
import { postService } from "../../services/postService";

interface Props {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Props }) {
  try {
    const postId: string | null = params.id;
    if (!postId) {
      throw new Error("포스트 아이디가 비어있습니다.");
    }
    const result = await postService.getPostById(postId);
    return createResponse(req, {
      kor_post: result.data.kor_post,
      eng_post: result.data.eng_post,
    });
  } catch (err) {
    return handleError(err);
  } finally {
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Props }) {
  try {
    const postId: string | null = params.id;
    if (!postId) {
      throw new Error("포스트 아이디가 비어있습니다.");
    }
    const result = await postService.deletePost(postId);
    return createResponse(req, result);
  } catch (err) {
    return handleError(err);
  } finally {
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Props }) {
  try {
    const body = await req.json();
    const action = body.action;
    const postId: string | null = params.id;
    /** */
    if (!postId) {
      throw new Error("포스트 아이디가 선택되지 않았습니다.");
    }
    if (!action) {
      throw new Error("액션이 선택되지 않았습니다. ");
    }

    /** */
    if (action === "increment_comment") {
      const commentCount = body.comments;
      const result = await postService.updatePostComments(postId, commentCount);
      return createResponse(req, result);
    } else if (action === "update_post") {
      /** */
      const langParam = req.nextUrl.searchParams.get("lang");
      console.log(langParam);

      if (!langParam || (langParam !== "ko" && langParam !== "eng")) {
        throw new Error("유효하지 않은 언어 설정입니다.");
      }

      if (langParam === "ko") {
        const updateDate: IPostUpdate = {
          thumbnail: body.thumbnail,
          thumbnail_alt: body.thumbnail_alt,
          category_id: body.category_id,
          category_name: body.category_name,
          updated_at: new Date(),
          title: body.title,
          subtitle: body.subtitle,
          content: body.content,
          is_kor: body.status,
        };

        const result = await postService.updatePostContent(
          postId,
          updateDate,
          langParam
        );

        return createResponse(req, result);
      } else {
        const updateDate: IPostUpdate = {
          thumbnail: body.thumbnail,
          thumbnail_alt: body.thumbnail_alt,
          category_id: body.category_id,
          category_name: body.category_name,
          updated_at: new Date(),
          title: body.title,
          subtitle: body.subtitle,
          content: body.content,
          is_eng: body.status,
        };
        const result = await postService.updatePostContent(
          postId,
          updateDate,
          langParam
        );
        return createResponse(req, result);
      }
    } else {
      throw new Error("지원하지 않는 액션입니다.");
    }
  } catch (err) {
    return handleError(err);
  }
}
