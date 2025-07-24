"use client";

import timeAgo from "@/src/helper/dateHelper";
import { IPost } from "@/type";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Separator } from "../ui/separator";

const Circle = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.Circle })),
  { ssr: false }
);

const PostContent = dynamic(() => import("./PostContent"));
const PostCategory = dynamic(() => import("./PostCategory"));

const PostView = ({ post }: { post: IPost }) => {
  const { value, unit } = timeAgo(post.created_at);
  const t = useTranslations("Post");
  const lang =
    post.is_kor === "PUBLIC" && post.is_eng === "PUBLIC"
      ? "Both"
      : post.is_kor === "PUBLIC"
      ? "Korean Version"
      : "English Version";

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
        </div>
      </section>
      {/* ⬇️ post reponse number */}
      <Separator />
      <section>
        <div className="flex justify-between w-full text-sm text-stone-500">
          <span className="flex items-center gap-1">
            {t("Response")} &nbsp;
            {post.comments}
          </span>
          <span className="flex items-center gap-2">
            {post.status === "PUBLIC" ? (
              post.is_kor === "PUBLIC" && post.is_eng === "PUBLIC" ? (
                <Circle className={`size-4 stroke-none fill-green-500`} />
              ) : post.is_kor === "PUBLIC" ? (
                <Circle className={`size-4 stroke-none fill-blue-400`} />
              ) : (
                <Circle className={`size-4 stroke-none fill-yellow-400`} />
              )
            ) : (
              <Circle className={`size-4 stroke-none fill-red-500`} />
            )}
            {value}
            {t(`${unit}`)}
            {/* <span className="text-xs">
              {post.is_updated ? " 수정" : " 생성"}
            </span> */}
            <span className="text-xs">( {t(lang)} )</span>
          </span>
        </div>
      </section>
      <Separator />
      {/* ⬇️ post contents */}
      <section>
        <div
          className="relative w-full h-[30rem] overflow-hidden flex items-center justify-center"
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
            className="blur-sm opacity-80 brightness-50"
          />
          <div className="absolute w-full h-[25rem]">
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
      </section>
      <section>
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
              {t("Response")} &nbsp;
              {post.comments}
            </span>
          </div>
        </section>
      </section>
    </div>
  );
};
export default PostView;
