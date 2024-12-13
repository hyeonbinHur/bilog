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
    revalidateTag(`comment-like-${comment_id}`);
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
export const updateCommentLikeAction = () => {};
export const deleteCommentLikeAction = () => {};
