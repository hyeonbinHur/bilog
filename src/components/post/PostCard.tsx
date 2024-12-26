import React from "react";
import { IPost } from "@/type";
import { Circle } from "lucide-react";
import timeAgo from "@/src/helper/dateHelper";
import { useTranslations } from "next-intl";
import Image from "next/legacy/image";

const PostCard = (post: IPost) => {
  //Variable Declaration
  const { value, unit } = post.isUpdated
    ? timeAgo(post.updatedAt ?? post.createdAt) // updatedAt이 undefined일 경우 createdAt 사용
    : timeAgo(post.createdAt);
  const t = useTranslations("Post");
  return (
    <div className="pb-10 px-5 py-4 shadow-md hover:shadow-lg w-full">
      <div className="w-full h-40 flex">
        <div className=" flex-[2] flex flex-col justify-between gap-2">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <h2 className="text-lg text-stone-400">{post.subtitle}</h2>
          <div className="flex justify-between  text-sm text-stone-400">
            <div className="flex gap-5">
              <span className="flex items-center gap-1">
                {post.isKOR === 1 && post.isENG === 1 ? (
                  <Circle className={`size-4 stroke-none fill-green-400`} />
                ) : post.isKOR === 1 ? (
                  <Circle className={`size-4 stroke-none fill-blue-400`} />
                ) : (
                  <Circle className={`size-4 stroke-none fill-yellow-400`} />
                )}
                {value}
                {t(`${unit}`)}
              </span>
              <span className="flex items-center gap-1">
                {t("Response")} &nbsp;{post.comments}
              </span>
              <span> {post.category_name} </span>
            </div>
          </div>
        </div>
        <div className="p-1 flex-1">
          <div
            className="relative w-full h-[10rem] overflow-hidden flex items-center justify-center"
            role="img"
            aria-label={post.thumbnail_alt}
          >
            <Image
              src={post.thumbnail}
              alt={post.thumbnail_alt}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={post.thumbnail}
              className="blur-sm brightness-50"
            />
            <div className="absolute w-full h-[8rem]">
              <Image
                layout="fill"
                objectFit="contain"
                src={post.thumbnail}
                alt={post.thumbnail_alt}
                placeholder="blur"
                blurDataURL={post.thumbnail}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
