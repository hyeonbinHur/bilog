import React from "react";
import { Heart } from "lucide-react";
import { HeartCrack } from "lucide-react";
import { MessageCircle } from "lucide-react";
const PostLDC = async ({
  like,
  dislike,
  post_id,
}: //   comment,
{
  like: String;
  dislike: String;
  post_id: String;
  //   comment: number;
}) => {
  const commentListResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/comment?post_id=${post_id}`,
    { next: { tags: [`comment-${post_id}`] } }
  );

  const comments: Comment[] = await commentListResponse.json();

  return (
    <section>
      <div className="flex justify-between w-32 text-sm text-stone-500">
        <span className="flex items-center gap-1">
          <Heart className="size-4 " /> {like}
        </span>
        <span className="flex items-center gap-1">
          <HeartCrack className="size-4 " /> {dislike}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="size-5 " />
          {comments.length}
        </span>
      </div>
    </section>
  );
};

export default PostLDC;
