"use server";

import { CommentForm } from "@/type";
import { revalidateTag } from "next/cache";

export const createCommentAction = async (formData: FormData) => {
  const user_id = formData.get("user_id")?.toString();
  const user_name = formData.get("user_name")?.toString();
  const user_avatar = formData.get("user_avatar")?.toString();
  const content = formData.get("content")?.toString();
  const post_id = formData.get("post_id")?.toString();
  if (!user_id) {
    return {
      state: {
        status: false,
        error: "User must be signed in",
      },
    };
  }
  if (!content) {
    return {
      state: {
        status: false,
        error: "Content must be included",
      },
    };
  }
  if (!post_id) {
    return {
      state: {
        status: false,
        error: "Unknown error occured form reading post id",
      },
    };
  }
  try {
    const newComment: CommentForm = {
      user_id: user_id,
      user_avatar: user_avatar as string,
      user_username: user_name as string,
      post_id: post_id,
      content: content,
      like: 0,
      dislike: 0,
      date: new Date(),
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidateTag(`comment-${post_id}`);
    return {
      state: {
        status: true,
        error: " ",
      },
    };
  } catch (err) {
    return {
      state: {
        status: false,
        error: `Error while upload comment : ${err}`,
      },
    };
  }
};

export const deleteCommentAction = async (
  comment_id: string,
  post_id: string
) => {
  if (!comment_id) {
    return {
      state: {
        status: false,
        error: "comment_id is required",
      },
    };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/comment/${comment_id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("unkonwn error is occured");
    }
    revalidateTag(`comment-${post_id}`);
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
        error: "unkonwn error is occred",
      },
    };
  }
};

export const updateCommentAction = () => {};
