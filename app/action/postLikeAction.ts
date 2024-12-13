"use server";

import { revalidateTag } from "next/cache";

export interface IPostLikeForm {
  post_id: string;
  user_id: string;
  is_like: Boolean;
}
export const createPostLikeAction = async ({
  post_id,
  user_id,
  is_like,
}: IPostLikeForm) => {
  try {
    if (!post_id || !user_id || is_like === undefined) {
      throw new Error("required field is empty");
    }
    const newPostLike: IPostLikeForm = { user_id, post_id, is_like };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post_like`,
      {
        method: "POST",
        body: JSON.stringify(newPostLike),
      }
    );
    if (!response.ok) {
      throw new Error("Unknown error is occured");
    }
    revalidateTag(`post-like-${post_id}`);
    return {
      state: {
        statuse: true,
        error: "",
      },
    };
  } catch (err) {
    return {
      state: {
        statuse: false,
        error: `Error while create post like : ${err}`,
      },
    };
  }
};

export const updatePostLikeAction = () => {};

export const deletePostLikeAction = async ({
  post_like_id,
  post_id,
}: {
  post_like_id: string;
  post_id: string;
}) => {
  try {
    if (!post_like_id) {
      return {
        state: {
          status: false,
          error: "post like id is empty",
        },
      };
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post-like/post_like_id`
    );

    if (!response.ok) {
      return {
        state: {
          status: false,
          error: "Unknown error is occured",
        },
      };
    }
    revalidateTag(`post-like-${post_id}`);
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
        error: `Unknown error is occured :  ${err}`,
      },
    };
  }
};
