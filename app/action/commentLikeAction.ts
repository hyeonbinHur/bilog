"user server";
import { revalidateTag } from "next/cache";
export interface ICommentLikeForm {
  comment_id: string;
  user_id: string;
  is_like: Boolean;
}
export const createCommentLikeAction = async ({
  comment_id,
  user_id,
  is_like,
}: ICommentLikeForm) => {
  try {
    if (!comment_id || !user_id || is_like === undefined) {
      throw new Error("required field is empty");
    }
    const newCommnetLike: ICommentLikeForm = { comment_id, user_id, is_like };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post_like`,
      {
        method: "POST",
        body: JSON.stringify(newCommnetLike),
      }
    );
    if (!response.ok) {
      throw new Error("Unknow error is occured");
    }
    revalidateTag(`comment-${comment_id}`);
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
        error: `Error while create comment like : ${err}`,
      },
    };
  }
};
export const updateCommentLikeAction = async ({
  comment_like_id,
  comment_id,
  is_like,
}: {
  comment_like_id: string;
  comment_id: string;
  is_like: boolean;
}) => {
  try {
    if (!comment_like_id || !comment_id || is_like === undefined) {
      throw new Error("requied field is empty");
    }
    const updatedCommentLike = { is_like };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${comment_like_id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedCommentLike),
      }
    );
    if (!response.ok) {
      throw new Error("Unknown error occured");
    }
    revalidateTag(`comment-${comment_id}`);
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
        error: `Error while update commnet like ${err}`,
      },
    };
  }
};
export const deleteCommentLikeAction = async ({
  comment_like_id,
  comment_id,
}: {
  comment_like_id: string;
  comment_id: string;
}) => {
  try {
    if (!comment_like_id || !comment_id) {
      return {
        state: {
          status: false,
          error: "Required field is empty",
        },
      };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/comment-like/${comment_like_id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Unknown Error occured");
    }
    revalidateTag(`comment-${comment_id}`);
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
        error: `Error while deleting comment like ${err}`,
      },
    };
  }
};
