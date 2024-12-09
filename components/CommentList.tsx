import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CommentCard from "./CommentCard";
import { Comment } from "@/type";
interface Props {
  comments: Comment[]; // 댓글은 Comment 객체 배열
}

const CommentList = ({ comments }: Props) => {
  return (
    <ScrollArea className="h-98 w-full rounded-md border">
      {comments.map((comment) => {
        return <CommentCard {...comment} key={comment.comment_id} />;
      })}
    </ScrollArea>
  );
};

export default CommentList;
