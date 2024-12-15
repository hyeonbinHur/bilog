"use client";

import { IPost } from "@/type";
import React from "react";
import { Button } from "../ui/button";
const PostForm = ({
  post,
  onChangeEditState,
}: {
  post?: IPost;
  onChangeEditState: (a: boolean) => void;
}) => {
  return (
    <div>
      <Button
        onClick={() => onChangeEditState(false)}
        className="w-16 h-8 text-stone-500 border-2 border-stone-500 bg-white rounded-sm hover:bg-stone-400 hover:text-stone-700 active:translate-y-0.5 "
      >
        Edit
      </Button>
    </div>
  );
};

export default PostForm;
