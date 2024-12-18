"use client";

import React, { useCallback, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comment } from "@/type";
import timeAgo from "@/helper/dateHelper";
import CommentDeleteBtn from "./CommentDeleteBtn";
import CommentArea from "./CommentArea";
import { Button } from "../ui/button";

const CommentCard = ({
  comment,
  comments,
}: {
  comment: Comment;
  comments: number;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const formRef = useRef<{
    submit: () => void;
    pending: boolean;
    state: any;
  }>(null);

  const onChangeEditState = useCallback((editState: boolean) => {
    setIsEdit(editState);
  }, []);

  const onSubmitComment = async () => {
    formRef.current?.submit();
  };

  const recordedTime = comment.isUpdated
    ? timeAgo(comment.updatedAt ?? comment.date) // updatedAt이 undefined일 경우 createdAt 사용
    : timeAgo(comment.date);

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
          {comment.isUpdated && (
            <span className="text-sm text-stone-500">(updated) &nbsp;</span>
          )}
          {recordedTime}
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
          {isEdit ? (
            <div>
              <Button
                className="w-20 text-xs h-7 bg-green-500"
                onClick={() => onChangeEditState(false)}
              >
                cancel
              </Button>
              <Button
                onClick={() => onSubmitComment()}
                disabled={formRef.current?.pending}
                className="w-20 text-xs h-7 bg-green-500"
              >
                Save
              </Button>
            </div>
          ) : (
            <CommentDeleteBtn
              onChangeEditState={onChangeEditState}
              comment_id={comment.comment_id}
              post_id={comment.post_id}
              comments={comments}
            />
          )}
        </div>
        <div className="w-32 flex justify-around"></div>
      </div>
    </div>
  );
};

export default CommentCard;
