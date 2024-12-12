import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CommentCard from "./CommentCard";
import { Comment } from "@/type";
import { Separator } from "../ui/separator";
import CommentAccordion from "./CommentAccordion";

const CommentList = async ({ params }: { params: string }) => {
  const commentListResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/comment?post_id=${params}`,
    { next: { tags: [`comment-${params}`] } }
  );

  if (!commentListResponse.ok) {
    return <div>{params}Error</div>;
  }
  const comments: Comment[] = await commentListResponse.json();

  return (
    <div className="mb-96">
      <section className="mb-10">
        <CommentAccordion />
      </section>
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
    </div>
  );
};

export default CommentList;
