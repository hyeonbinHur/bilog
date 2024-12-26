import React from "react";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import CommentCard from "./CommentCard";
import { Comment } from "@/type";
import { Separator } from "../ui/separator";
import CommentAccordion from "./CommentAccordion";

const CommentList = async ({ params }: { params: string }) => {
  //Server Component Fetch data
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
        <CommentAccordion comments={comments.length} />
      </section>
      {comments.length > 0 && (
        <ScrollArea className="w-full rounded-md border">
          {comments.map((comment, i) => {
            return (
              <div key={comment.comment_id}>
                <CommentCard comment={comment} comments={comments.length} />
                {i !== comments.length - 1 && <Separator />}
              </div>
            );
          })}
        </ScrollArea>
      )}
    </div>
  );
};

export default CommentList;
