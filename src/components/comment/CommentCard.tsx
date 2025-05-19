"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Comment } from "@/type";
import timeAgo from "@/src/helper/dateHelper";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const CommentDeleteBtn = dynamic(() => import("./CommentDeleteBtn"));
const CommentArea = dynamic(() => import("./CommentArea"));
// import CommentDeleteBtn from "./CommentDeleteBtn";
// import CommentArea from "./CommentArea";

const CommentCard = ({
  comment,
  comments,
}: {
  comment: Comment;
  comments: number;
}) => {
  //Variable Declaration
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const formRef = useRef<{
    submit: () => void;
    pending: boolean;
    state: any;
  }>(null);
  const { value, unit } = comment.is_updated
    ? timeAgo(comment.updated_at ?? comment.date) // updated_at이 undefined일 경우 created_at 사용
    : timeAgo(comment.date);
  const t = useTranslations("Comment");
  const { data: session } = useSession();

  //Client Component Event Handler
  const onChangeEditState = useCallback((editState: boolean) => {
    setIsEdit(editState);
  }, []);
  const onSubmitComment = async () => {
    formRef.current?.submit();
  };

  return (
    <div className="px-5 py-2 pt-3 flex flex-col gap-5">
      <div className="flex  w-full gap-5 justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar className="flex items-center">
            <AvatarImage src={comment.user_avatar} alt="user_username avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{comment.user_username}</span>
        </div>
        <span>
          {comment.is_updated && (
            <span className="text-sm text-stone-500">
              ({t("updated")}) &nbsp;
            </span>
          )}
          {value}
          {t(`${unit}`)}
        </span>
      </div>
      {isEdit ? (
        <CommentArea
          ref={formRef}
          comment={comment}
          onChangeEditState={onChangeEditState}
        />
      ) : (
        <div>{comment.content}</div>
      )}

      <div className=" w-full flex justify-between">
        <div className="w-40">
          {String(session?.user.id) === String(comment.User_id) &&
            (isEdit ? (
              <div>
                <Button
                  className="w-20 text-xs h-7 bg-green-500"
                  onClick={() => onChangeEditState(false)}
                >
                  {t("Cancel")}
                </Button>
                <Button
                  onClick={() => onSubmitComment()}
                  disabled={formRef.current?.pending}
                  className="w-20 text-xs h-7 bg-green-500"
                >
                  {t("Update")}
                </Button>
              </div>
            ) : (
              <CommentDeleteBtn
                onChangeEditState={onChangeEditState}
                comment_id={comment.comment_id}
                post_id={comment.post_id}
                comments={comments}
                user_id={comment.User_id}
              />
            ))}
        </div>
        <div className="w-32 flex justify-around"></div>
      </div>
    </div>
  );
};

export default CommentCard;
