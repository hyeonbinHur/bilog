import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CommentCard from "./CommentCard";
import { Comment } from "@/type";
import { Separator } from "../ui/separator";

interface Props {
  comments: Comment[]; // 댓글은 Comment 객체 배열
}

const CommentList = ({ comments }: Props) => {
  return (
    <ScrollArea className="w-full rounded-md border">
      {comments.map((comment, i) => {
        return (
          <div key={comment.comment_id}>
            <CommentCard {...comment} />
            {i !== comments.length - 1 && <Separator />}
          </div>
        );
      })}
    </ScrollArea>
  );
};

export default CommentList;
