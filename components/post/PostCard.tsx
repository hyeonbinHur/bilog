import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { IPost } from "@/type";

import { Heart } from "lucide-react";
import { HeartCrack } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Circle } from "lucide-react";
import PostCategory from "./PostCategory";

const PostCard = (prop: IPost) => {
  return (
    <div className="pb-10 px-5 py-4 shadow-sm hover:shadow-lg">
      <PostCategory />
      <div className="w-full h-52 flex">
        <div className=" flex-[2] flex flex-col justify-between gap-2">
          <h1 className="text-3xl font-bold">{prop.title}</h1>

          <h2 className="text-lg text-stone-400">Sub Title</h2>

          <div className="flex justify-between  w-60 text-sm">
            <span className="flex items-center gap-1">
              <Circle className="size-4 stroke-none fill-blue-500" />1 mins
            </span>
            <span className="flex items-center gap-1">
              <Heart className="size-4 stroke-none fill-red-400" />2
            </span>
            <span className="flex items-center gap-1">
              <HeartCrack className="size-4 fill-stone-400" />3
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="size-5 fill-stone-600 stroke-none" />3
            </span>
          </div>
        </div>

        <div className="p-1 flex-1">
          <img
            src={prop.thumbnail}
            alt={prop.thumbnail_alt}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
