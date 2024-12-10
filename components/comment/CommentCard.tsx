import React from "react";

import { Heart } from "lucide-react";
import { HeartCrack } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { Comment } from "@/type";
import timeAgo from "@/helper/dateHelper";

const flag = false;
const CommentCard = ({
  user_avatar,
  user_username,
  post_id,
  content,
  like,
  dislike,
  date,
}: Comment) => {
  const recordedTime = timeAgo(date);

  return (
    <div className="px-5 py-2 flex flex-col gap-5">
      <div className="flex  w-full gap-5 justify-between items-center">
        <Avatar className="flex items-center">
          <AvatarImage src={user_avatar} alt="user_username avatar" />
          <img src={user_avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold">{user_username}</span>
        <span>{recordedTime}</span>
      </div>

      <div>{content}</div>
      <div className=" w-full flex justify-between">
        <div className="w-40">
          {!flag && (
            <div className="flex gap-2">
              <Button className="w-20 text-xs h-7 bg-slate-400 hover:bg-slate-700">
                Delete
              </Button>
              <Button className="w-20 text-xs h-7 bg-green-500">Edit</Button>
            </div>
          )}
        </div>
        <div className="w-32 flex justify-around">
          <span className="flex items-center gap-1 text-s text-slate-600 ">
            <Heart className=" hover:fill-red-500 hover:stroke-none size-5" />
            {like}
          </span>
          <span className="flex items-center gap-1 text-s text-slate-600 ">
            <HeartCrack className=" hover:fill-stone-400 size-5" /> {dislike}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
