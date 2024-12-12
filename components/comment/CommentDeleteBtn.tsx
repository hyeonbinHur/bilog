"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { deleteCommentAction } from "@/action/commentAction";

const CommentDeleteBtn = ({
  comment_id,
  post_id,
}: {
  comment_id: string;
  post_id: string;
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    await deleteCommentAction(comment_id, post_id);
  };

  return (
    <div className="flex gap-2">
      <Button className="w-20 text-xs h-7 bg-green-500"> Edit </Button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          className="w-20 text-xs h-7 bg-slate-400 hover:bg-slate-700"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "..." : "Delete"}
        </Button>
      </form>
    </div>
  );
};

export default CommentDeleteBtn;
