"use server";

import { IPost, IPostForm, ServerActionResponse } from "@/type";
import { revalidateTag } from "next/cache";

export const createPostAction = async (
  post: IPostForm,
  lang: string
): Promise<ServerActionResponse> => {
  try {
    if (!post.title) {
      throw new Error("post tile is required");
    }
    if (!post.thumbnail) {
      throw new Error("post thumbnail is required");
    }
    if (!post.thumbnail_alt) {
      throw new Error("post thumbnail_alt is required");
    }
    if (!post.content) {
      throw new Error("post content is required");
    }
    if (!post.status) {
      throw new Error("post status is required");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post?lang=${lang}`,
      {
        method: "POST",
        body: JSON.stringify(post),
      }
    );
    if (!response.ok) {
      throw new Error("Unknown Error occured");
    }
    revalidateTag(`post-list`);
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
        error: `Error while creating post : ${err}`,
      },
    };
  }
};

export const deletePostAction = async (
  post_id: string
): Promise<ServerActionResponse> => {
  try {
    if (!post_id) {
      throw new Error("Post id is required");
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post_id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("unknown error occured");
    }
    revalidateTag(`post-list`);
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
        error: `Error white delete post : ${err}`,
      },
    };
  }
};

export const updatePostAction = async (
  post: Partial<IPost>,
  lang: string
): Promise<ServerActionResponse> => {
  try {
    if (!post.post_id) {
      throw new Error("post is is required");
    }

    const updatedPost = {
      ...post,
      updatedAt: new Date(),
      isUpdated: true,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post.post_id}?lang=${lang}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          ...updatedPost, // 기존의 updatedPost 내용
          action: "update_post", // action 추가
        }),
      }
    );
    if (!response.ok) {
      throw new Error("unknown error is occurud");
    }
    revalidateTag(`post-${post.post_id}`);
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
        error: `Error whlie update post : ${err}`,
      },
    };
  }
};
