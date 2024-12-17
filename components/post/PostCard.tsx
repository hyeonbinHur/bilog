import React from "react";
import { IPost } from "@/type";
import { Circle } from "lucide-react";
import timeAgo from "@/helper/dateHelper";

const PostCard = (post: IPost) => {
  const recordedTime = timeAgo(post.createdAt);

  return (
    <div className="pb-10 px-5 py-4 shadow-md hover:shadow-lg w-full">
      <div className="w-full h-40 flex">
        <div className=" flex-[2] flex flex-col justify-between gap-2">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <h2 className="text-lg text-stone-400">{post.subtitle}</h2>
          <div className="flex justify-between  text-sm text-stone-400">
            <div className="flex gap-5">
              <span className="flex items-center gap-1">
                <Circle className="size-3 stroke-none fill-blue-400" />
                {recordedTime}
              </span>
              <span className="flex items-center gap-1">
                Responses &nbsp;{post.comments}
              </span>
              <span> {post.category_name} </span>
            </div>
          </div>
        </div>
        <div className="p-1 flex-1">
          <img
            src={post.thumbnail}
            alt={post.thumbnail_alt}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
