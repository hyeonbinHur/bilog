"use client";

import { usePostState } from "@/src/hooks/usePostState";
import { IPost } from "@/type";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { Button } from "../../ui/button";

const PostLanguageSwitcher = dynamic(() => import("../form/PostLanguageSwitcher"));
const PostForm = dynamic(() => import("../form/PostForm"));
const PostView = dynamic(() => import("../PostView"));

const PostStateManage = ({
  korPost,
  engPost,
  locale,
}: {
  korPost: IPost;
  engPost: IPost;
  locale: string;
}) => {
  const {
    isEdit,
    onChangeEditState,
    onClickDeletePost,
    onChangeLocale,
    lang,
    post,
  } = usePostState(locale, korPost, engPost); //현재 edit 중인지, 선택된 언어는 무엇인지 핸들러와 state 관리

  const { data: session } = useSession();
  const isAuthor = String(session?.user.id) === process.env.NEXT_PUBLIC_MAX_ID;

  return (
    <div className="pt-10 w-full">
      <div>
        {isAuthor && (
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
      </div>
      {isEdit ? <PostForm post={post} lang={lang} /> : <PostView post={post} />}
    </div>
  );
};

export default PostStateManage;
