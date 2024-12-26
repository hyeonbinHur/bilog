"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import PostView from "./PostView";
import PostForm from "./PostForm";
import { IPost, ServerActionResponse } from "@/type";
import { Button } from "../ui/button";
import { deletePostAction } from "@/src/app/action/postAction";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useError } from "@/src/context/ErrorContext";

const PostStateManage = ({
  post,
  locale,
  onChaneLocale,
}: {
  post: IPost;
  locale: string;
  onChaneLocale: (a: string) => void;
}) => {
  //Variable Declaration
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const lang = locale === "ko" ? "Korean" : "English";
  const { data: session } = useSession();
  const t = useTranslations("Post");
  const { setError } = useError();

  //Client Component Event Handler && Trigger Server action
  const onChangeEditState = useCallback((editState: boolean) => {
    setIsEdit(editState);
  }, []);
  const onClickDeletePost = async () => {
    if (post) {
      const serverResponse: ServerActionResponse = await deletePostAction(
        post?.post_id
      );
      if (serverResponse.state.status === false) {
        setError(new Error(serverResponse.state.error));
      }
    }
  };

  return (
    <div>
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
        {(String(session?.user.id) === process.env.NEXT_PUBLIC_MAX_ID ||
          (post.isKOR === 1 && post.isENG) === 1) && (
          <Select onValueChange={(e) => onChaneLocale(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t(`${lang}`)} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{t("Language Select")}</SelectLabel>
                <SelectItem value="ko">{t("Korean")}</SelectItem>
                <SelectItem value="en">{t("English")}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
      {/* 언어를 선택 할 수 있음*/}
      {/* 해당 언어를 post view에 보내 */}
      {isEdit ? <PostForm post={post} lang={lang} /> : <PostView post={post} />}
    </div>
  );
};

export default PostStateManage;
