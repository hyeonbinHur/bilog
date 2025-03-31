"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import PostView from "./PostView";
import PostForm from "./PostForm";
import { IPost, ServerActionResponse } from "@/type";
import { Button } from "../ui/button";
import { deletePostAction } from "@/src/app/action/postAction";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useError } from "@/src/context/ErrorContext";
import { useRouter } from "next/navigation";
import PostLanguageSwitcher from "./PostLanguageSwitcher";

const PostStateManage = ({
  korPost,
  engPost,
  locale,
}: // onChangeLocale,
{
  korPost: IPost;
  engPost: IPost;
  locale: string;
  // onChangeLocale: (a: string) => void;
}) => {
  //Variable Declaration
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [lang, setLang] = useState<string>(locale);
  const { data: session } = useSession();
  const t = useTranslations("Post");
  const { setError } = useError();
  const router = useRouter();
  const [post, setPost] = useState<IPost>(locale === "ko" ? korPost : engPost);

  useEffect(() => {
    if (lang === "ko") {
      setPost(korPost);
    } else {
      setPost(engPost);
    }
  }, [lang]);

  //Client Component Event Handler && Trigger Server action
  const onChangeEditState = useCallback((editState: boolean) => {
    setIsEdit(editState);
  }, []);

  const onChangeLocale = (newLocale: "Korean" | "English") => {
    if (newLocale === "Korean") {
      setLang("ko");
    } else {
      setLang("en");
    }
  };

  const onClickDeletePost = async () => {
    const serverResponse: ServerActionResponse = await deletePostAction(
      korPost?.post_id
    );
    if (serverResponse.state.status === false) {
      setError(new Error(serverResponse.state.error));
    }
    router.back();
  };

  return (
    <div className="pt-10 w-full">
      <div>
        {String(session?.user.id) === process.env.NEXT_PUBLIC_MAX_ID && (
          <div className="w-full flex justify-end gap-2 mb-5">
            {isEdit ? (
              <>
                <Button
                  onClick={() => onChangeEditState(false)}
                  className="w-16 h-8 text-stone-500 border-2 border-stone-500 bg-white rounded-sm hover:bg-stone-100 hover:text-stone-700 active:translate-y-0.5 "
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => onClickDeletePost()}
                  className="w-16 h-8 text-red-500 border-2 border-red-500 bg-white rounded-sm hover:bg-red-100 hover:text-red-500 active:translate-y-0.5 "
                >
                  Delete
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-1 text-stone-500 text-sm">
                {/* isEdit === false => start edit button */}
                <Button
                  onClick={() => onChangeEditState(true)}
                  className="w-16 h-8 text-stone-500 border-2 border-stone-500 bg-white rounded-sm hover:bg-stone-400 hover:text-stone-700 active:translate-y-0.5 "
                >
                  Edit
                </Button>
              </div>
            )}
          </div>
        )}
        <PostLanguageSwitcher
          onChangeLocale={onChangeLocale}
          korStatus={korPost.status}
          engStatus={engPost.status}
          currentLocale={lang}
        />
        {/* {(String(session?.user.id) === process.env.NEXT_PUBLIC_MAX_ID ||
          (post.is_kor === "PUBLIC" && post.is_eng === "PUBLIC")) && (
          <Select onValueChange={(e) => onChangeLocale(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t(`${lang}`)} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("Language Select")}</SelectLabel>
                <SelectItem
                  value="ko"
                  disabled={
                    post.is_kor !== "PUBLIC" &&
                    String(session?.user.id) !== process.env.NEXT_PUBLIC_MAX_ID
                  }
                >
                  {t("Korean")}
                </SelectItem>
                <SelectItem
                  disabled={
                    post.is_eng !== "PUBLIC" &&
                    String(session?.user.id) !== process.env.NEXT_PUBLIC_MAX_ID
                  }
                  value="en"
                >
                  {t("English")}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )} */}
      </div>
      {/* 언어를 선택 할 수 있음*/}
      {/* 해당 언어를 post view에 보내 */}
      {isEdit ? <PostForm post={post} lang={lang} /> : <PostView post={post} />}
    </div>
  );
};

export default PostStateManage;
