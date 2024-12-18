"use client";

import React, { Suspense } from "react";
import PostCategory from "./PostCategory";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Circle } from "lucide-react";
import styles from "./blog.module.css"; // CSS 모듈 import
import { Button } from "../ui/button";
import { IPost } from "@/type";
import timeAgo from "@/helper/dateHelper";
import { Separator } from "../ui/separator";
import PostNextContainer from "./PostNextContainer";
import PostContent from "./PostContent";

const PostView = ({
  post,
  onChangeEditState,
}: {
  post: IPost;
  onChangeEditState: (a: boolean) => void;
}) => {
  const recordedTime = timeAgo(post.createdAt);

  return (
    <div className="flex w-full flex-col gap-5">
      <PostCategory
        type={post.type}
        category_name={post.category_name}
        title={post.title}
        category_id={post.category_id}
      />
      <h2 className="text-3xl font-extrabold">{post.title}</h2>
      {/* ⬇️ post author & time & edit button */}
      <section>
        <div className="flex  justify-between w-full text-md">
          <span className="flex items-center gap-3">
            <Avatar className="flex items-center">
              <AvatarImage
                src="https://lh3.googleusercontent.com/a/ACg8ocKXrhh7dYMkeFCgm13lH1W5YmZJ1GaPFMFMTKROb_gdHP_PWsE0=s96-c"
                alt="user_username avatar"
                className="rounded-full w-14"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-stone-500">Hur HyeonBin (Max)</span>
          </span>
          {/* ⬇️ time && edit */}
          <span className="flex items-center gap-1 text-stone-500 text-sm">
            {/* isEdit === false => start edit button */}
            <Button
              onClick={() => onChangeEditState(true)}
              className="w-16 h-8 text-stone-500 border-2 border-stone-500 bg-white rounded-sm hover:bg-stone-400 hover:text-stone-700 active:translate-y-0.5 "
            >
              Edit
            </Button>
          </span>
        </div>
      </section>

      {/* ⬇️ post reponse number */}
      <Separator />
      <section>
        <div className="flex justify-between w-full text-sm text-stone-500">
          <span className="flex items-center gap-1">
            Responses &nbsp;
            {post.comments}
          </span>
          <span className="flex items-center gap-2">
            <Circle className="size-4 stroke-none fill-blue-400" />
            {recordedTime}
          </span>
        </div>
      </section>

      <Separator />
      {/* ⬇️ post contents */}
      <section>
        <div
          className={`${styles.thumbnail} w-full h-[30rem]`}
          style={{
            backgroundImage: `url("${post.thumbnail}")`,
            overflow: "hidden",
          }}
          role="img"
          aria-label={post.thumbnail_alt}
        >
          <img src={post.thumbnail} alt={post.thumbnail_alt} />
        </div>
      </section>
      <section>
        {/* <div
          className={styles.content} // styles.content 클래스를 사용
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
            
        /> */}
        <PostContent htmlContent={post.content} />
      </section>

      <Separator />
      <section className="flex flex-col gap-5">
        <div className="flex  justify-between w-full text-md">
          <span className="flex items-center gap-3">
            <Avatar className="flex items-center">
              <AvatarImage
                src="https://lh3.googleusercontent.com/a/ACg8ocKXrhh7dYMkeFCgm13lH1W5YmZJ1GaPFMFMTKROb_gdHP_PWsE0=s96-c"
                alt="user_username avatar"
                className="rounded-full w-14"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-stone-500">Hur HyeonBin (Max)</span>
          </span>
        </div>
        <section>
          <div className="flex justify-between w-32 text-sm text-stone-500">
            <span className="flex items-center gap-1">
              Responses &nbsp;
              {post.comments}
            </span>
          </div>
        </section>
      </section>
    </div>
  );
};

export default PostView;
