"use client";
import React, { useState } from "react";
import PostView from "./PostView";
import PostForm from "./PostForm";
import { IPost } from "@/type";

const PostStateManage = ({ post }: { post: IPost }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const onClickEditChange = (editState: boolean) => {
    setIsEdit(editState);
  };
  return (
    <div>
      <PostView post={post} />
      <PostForm post={post} />
    </div>
  );
};

export default PostStateManage;
