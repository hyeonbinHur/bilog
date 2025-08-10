import type { IPost, ServerActionResponse } from "@/type";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { deletePostAction } from "../app/action/postAction";
import { useError } from "../context/ErrorContext";

export const usePostState = (
  locale: string,
  korPost: IPost,
  engPost: IPost
) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [lang, setLang] = useState<string>(locale);
  const { setError } = useError();
  const router = useRouter();

  // useEffect 대신 useMemo 사용
  const post = useMemo(() => {
    return lang === "ko" ? korPost : engPost;
  }, [lang, korPost, engPost]);

  // useEffect 제거

  const onChangeEditState = useCallback((editState: boolean) => {
    setIsEdit(editState);
  }, []);

  const onChangeLocale = (newLocale: "Korean" | "English") => {
    setLang(newLocale === "Korean" ? "ko" : "eng");
  };

  const onClickDeletePost = async () => {
    const serverResponse: ServerActionResponse = await deletePostAction(
      korPost?.post_id
    );
    if (serverResponse.state.status === true) {
      router.back();
    } else {
      setError(new Error(serverResponse.state.error));
    }
  };

  return {
    isEdit,
    lang,
    post,
    onChangeEditState,
    onClickDeletePost,
    onChangeLocale,
  };
};
