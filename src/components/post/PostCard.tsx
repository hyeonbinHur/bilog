import timeAgo from "@/src/helper/dateHelper";
import { IPost } from "@/type";
import { Circle } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const PostCard = (post: IPost) => {
  //Variable Declaration
  // const { value, unit } = post.is_updated
  //   ? timeAgo(post.updated_at ?? post.created_at) // updatcreaed_at이 undefined일 경우 created_at 사용
  //   : timeAgo(post.created_at);

  const { value, unit } = timeAgo(post.created_at);
  const t = useTranslations("Post");
  return (
    <div className="pb-10 px-5 py-4 shadow-md hover:shadow-lg w-full">
      <div className="w-full h-40 flex">
        <div className=" flex-[2] flex flex-col justify-between gap-2">
          <h1 className="text-lg sm:text-2xl font-bold">{post.title}</h1>
          <h2 className="text-sm sm:text-lg text-stone-400">{post.subtitle}</h2>
          <div className="flex justify-between  text-sm text-stone-400">
            <div className="flex gap-5">
              <span className="flex items-center gap-1 text-xs md:text-base">
                {post.status === "PUBLIC" ? (
                  post.is_kor === "PUBLIC" && post.is_eng === "PUBLIC" ? (
                    <Circle className={`size-4 stroke-none fill-green-400`} />
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
              </span>

              <span className="flex items-center gap-1 text-xs md:text-base">
                {t("Response")} &nbsp;{post.comments}
              </span>
              <span className="text-xs md:text-base">
                {post.category_name}{" "}
              </span>
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
              // blurDataURL={post.thumbnail}
              className="blur-sm brightness-50"
              sizes="(max-width: 640px) 100vw, 232px"
              priority
              fetchPriority="high"
            />
            <div className="absolute w-full h-[8rem]">
              <Image
                src={post.thumbnail}
                alt={post.thumbnail_alt}
                fill
                className="object-contain" // 또는 object-cover
                placeholder="blur"
                blurDataURL="..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
