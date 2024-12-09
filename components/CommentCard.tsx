import React from "react";
import { Heart } from "lucide-react";
import { HeartCrack } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

const testAvatar = "http://k.kakaocdn.net/dn/bw7lpf/btsyGpMhljh/6";
const flag = false;
const CommentCard = () => {
  const date = new Date();
  return (
    <div className="px-5 py-2 flex flex-col gap-5">
      <div className="flex w-full gap-5 justify-between items-center">
        <Avatar className="flex items-center">
          <AvatarImage src={testAvatar} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <span className="font-semibold">hur hyeon bin</span>
        <span className="ml-auto">{date.toISOString().split("T")[0]}</span>
      </div>

      <div>comment content</div>

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
            <Heart className=" hover:fill-red-500 hover:stroke-none size-5" /> 2
          </span>
          <span className="flex items-center gap-1 text-s text-slate-600 ">
            <HeartCrack className=" hover:fill-stone-400 size-5" />2
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
