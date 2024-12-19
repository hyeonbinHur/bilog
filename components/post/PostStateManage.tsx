"use client";
import React, { useCallback, useMemo, useState } from "react";
import PostView from "./PostView";
import PostForm from "./PostForm";
import { IPost } from "@/type";
import { useTranslation } from "react-i18next";
// import "@/lib/i18n";

const PostStateManage = ({ post }: { post: IPost }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const onChangeEditState = useCallback((editState: boolean) => {
    setIsEdit(editState);
  }, []);
  const { t } = useTranslation();
  return (
    <div>
      <div>{t("welcome")}</div>
      <div>{t("welcome")}</div>
      <div>{t("welcome")}</div>
      {isEdit ? (
        <PostForm post={post} onChangeEditState={onChangeEditState} />
      ) : (
        <PostView post={post} onChangeEditState={onChangeEditState} />
      )}
    </div>
  );
};

export default PostStateManage;
