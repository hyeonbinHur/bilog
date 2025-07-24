"use server";

import { authOptions } from "@/src/lib/authOption";
import { IPost, IPostForm, ServerActionResponse } from "@/type";
import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
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
    revalidateTag(`post-all`);
    return {
      state: {
        status: true,
        error: "",
      },
    };
  } catch (err) {
    console.log(err);
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
    revalidateTag(`post-all`);
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
      updated_at: new Date(),
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

export async function getAllPosts(locale: string) {
  const mainSql = `${process.env.NEXT_PUBLIC_BASE_URL}/post?&locale=${locale}&all=true`;
  const mainResponse = await fetch(mainSql, {
    next: { tags: [`post-all`] },
  });
  if (!mainResponse.ok) {
    throw new Error(mainResponse.statusText);
  }
  const posts = await mainResponse.json();
  return posts.data;
}

export async function getPostById(postId: string) {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();
  const headers: Record<string, string> = {};
  if (session?.user?.id) {
    headers["User-Id"] = session.user.id;
  }

  //${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}?locale=${locale}

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}?locale=${locale}`,
    { next: { tags: [`post-${postId}`] }, headers }
  );
  if (!response.ok) {
    if (response.status === 401) return null;
    throw new Error(await response.text());
  }
  const data = await response.json();
  return data;
}
