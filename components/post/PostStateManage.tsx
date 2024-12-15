"use client";
import React, { useCallback, useMemo, useState } from "react";
import PostView from "./PostView";
import PostForm from "./PostForm";
import { IPost } from "@/type";

const PostStateManage = ({ post }: { post: IPost }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const onChangeEditState = useCallback((editState: boolean) => {
    setIsEdit(editState);
  }, []);
  console.log("post state manage render");
  return (
    <div>
      {isEdit ? (
        <PostForm post={post} onChangeEditState={onChangeEditState} />
      ) : (
        <PostView post={post} onChangeEditState={onChangeEditState} />
      )}
    </div>
  );
};

export default PostStateManage;
