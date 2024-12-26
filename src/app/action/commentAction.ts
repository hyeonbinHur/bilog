"use server";

import { CommentForm, Comment } from "@/type";
import { revalidateTag } from "next/cache";

export const createCommentAction = async (formData: FormData) => {
  const user_id = formData.get("user_id")?.toString();
  const user_name = formData.get("user_name")?.toString();
  const user_avatar = formData.get("user_avatar")?.toString();
  const content = formData.get("content")?.toString();
  const post_id = formData.get("post_id")?.toString();
  const comments = formData.get("comments");
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
  if (!comments) {
    return {
      state: {
        status: false,
        error: "Unknown error occured form reading comments ",
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
        body: JSON.stringify(newComment),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const updateCommentsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post_id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          comments: (+comments + 1).toString(),
          action: "increment_comment",
        }),
      }
    );
    if (!updateCommentsResponse.ok) {
      throw new Error(updateCommentsResponse.statusText);
    }
    revalidateTag(`comment-${post_id}`);
    revalidateTag(`post-${post_id}`);
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
  post_id: string,
  comments: number
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
    const updateCommentsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/${post_id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ comments: (+comments - 1).toString() }),
      }
    );
    if (!updateCommentsResponse.ok) {
      throw new Error(updateCommentsResponse.statusText);
    }
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

export const updateCommentAction = async (comment: Comment) => {
  try {
    if (!comment.comment_id) {
      throw new Error("comment id is required");
    }
    const updatedComment = {
      ...comment,
      updatedAt: new Date(),
      isUpdated: true,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/comment/${comment.comment_id}`,
      { method: "PATCH", body: JSON.stringify(updatedComment) }
    );
    if (!response.ok) {
      throw new Error("unkonwn error is occured");
    }
    revalidateTag(`comment-${comment.post_id}`);
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
        error: "Error while updating comment",
      },
    };
  }
};
