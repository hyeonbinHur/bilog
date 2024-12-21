"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import PostView from "./PostView";
import PostForm from "./PostForm";
import { IPost } from "@/type";
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
// import "@/lib/i18n";

const PostStateManage = ({
  post,
  korPost,
  engPost,
}: {
  post: IPost;
  korPost: any;
  engPost: any;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [lang, setLang] = useState("Korean");
  const [assemblePost, setAssemblePost] = useState<any>(null);

  const onChangeEditState = useCallback((editState: boolean) => {
    setIsEdit(editState);
  }, []);

  const onClickDeletePost = async () => {
    if (post) {
      await deletePostAction(post?.post_id);
    }
  };

  const onChangeLang = (e: string) => {
    setLang(e);
  };

  useEffect(() => {
    if (lang === "Korean") {
      const newPost = {
        title: korPost.title,
        content: korPost.content,
        type: post.type,
        category_name: post.category_name,
        category_id: post.category_id,
        comments: post.comments,
        isUpdated: post.isUpdated,
        updatedAt: post.updatedAt,
        createdAt: post.createdAt,
        thumbnail: post.thumbnail,
        thumbnail_alt: post.thumbnail_alt,
      };
      setAssemblePost(newPost);
      console.log(newPost);
    } else if (lang === "English") {
      const newPost = {
        title: engPost.title,
        content: engPost.content,
        type: post.type,
        category_name: post.category_name,
        category_id: post.category_id,
        comments: post.comments,
        isUpdated: post.isUpdated,
        updatedAt: post.updatedAt,
        createdAt: post.createdAt,
        thumbnail: post.thumbnail,
        thumbnail_alt: post.thumbnail_alt,
      };
      setAssemblePost(newPost);
      console.log(newPost);
    }
  }, [lang, korPost, engPost, post]);

  return (
    <div>
      <div className="border border-red-500">
        <div>For max</div>
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

        {/* 이것도 나만 확인 가능 */}

        <Select onValueChange={(e) => onChangeLang(e)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="언어 버전 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>언어 버전 선택</SelectLabel>
              <SelectItem value="Korean">한국어</SelectItem>
              <SelectItem value="English">English</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* 언어를 선택 할 수 있음*/}
      {/* 해당 언어를 post view에 보내 */}

      {isEdit ? <PostForm post={post} lang={lang} /> : <PostView post={post} />}
    </div>
  );
};

export default PostStateManage;
