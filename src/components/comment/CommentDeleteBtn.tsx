"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { deleteCommentAction } from "@/src/app/action/commentAction";
import { useTranslations } from "next-intl";
const CommentDeleteBtn = ({
  comment_id,
  post_id,
  comments,
  onChangeEditState,
}: {
  comment_id: string;
  post_id: string;
  comments: number;
  onChangeEditState: (a: boolean) => void;
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async () => {
    await deleteCommentAction(comment_id, post_id, comments);
  };
  const t = useTranslations("Comment");
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onChangeEditState(true)}
        className="w-20 text-xs h-7 bg-green-500"
      >
        {t("Update")}
      </Button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          className="w-20 text-xs h-7 bg-slate-400 hover:bg-slate-700"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "..." : t("Delete")}
        </Button>
      </form>
    </div>
  );
};

export default CommentDeleteBtn;
