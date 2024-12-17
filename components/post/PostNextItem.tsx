import timeAgo from "@/helper/dateHelper";
import { RelatedPost } from "@/type";
import Link from "next/link";
import React from "react";

const PostNextItem = (relatedPost: RelatedPost) => {
  const time = timeAgo(relatedPost.createdAt);
  return (
    <Link href={`/${relatedPost.type.toLowerCase()}/${relatedPost.post_id}`}>
      <div className="flex flex-col gap-5 z-0 cursor-pointer hover:shadow-xl duration-100  ">
        <div className="border rounded-md shadow-lg w-full h-32 p-2 flex flex-col justify-around">
          <div className="text-xs">{time}</div>
          <div className="text-sm font-bold">{relatedPost.title}</div>
          <div className="text-xs">Response {relatedPost.comments}</div>
        </div>
      </div>
    </Link>
  );
};

export default PostNextItem;
