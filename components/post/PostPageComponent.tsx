import React from "react";
import PostCategory from "./PostCategory";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Circle } from "lucide-react";
import { Separator } from "../ui/separator";
import styles from "./blog.module.css"; // CSS 모듈 import
import PostLDC from "./PostLDC";

const PostPageComponent = async ({ params }: { params: string }) => {
  const postResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params}`,
    { cache: "no-store" }
  );

  if (!postResponse.ok) {
    return <div>error</div>;
  }

  const post = await postResponse.json();

  return (
    <div className="py-10 ">
      {postResponse.ok && (
        <div className="flex flex-col gap-5">
          <PostCategory />
          <h2 className="text-3xl font-extrabold">{post.title}</h2>

          <section>
            <div className="flex  justify-between w-full text-md">
              <span className="flex items-center gap-3">
                <Avatar className="flex items-center">
                  <AvatarImage
                    src="https://lh3.googleusercontent.com/a/ACg8ocKXrhh7dYMkeFCgm13lH1W5YmZJ1GaPFMFMTKROb_gdHP_PWsE0=s96-c"
                    alt="user_username avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-stone-500">Hur HyeonBin (Max)</span>
              </span>
              <span className="flex items-center gap-1 text-stone-500 text-sm">
                <Circle className="size-4 stroke-none fill-yellow-200" />1 mins
              </span>
            </div>
          </section>
          <Separator />

          <PostLDC like={post.like} dislike={post.dislike} post_id={params} />

          <Separator />

          <section>
            <img src={post.thumbnail} alt={post.thumbnail_alt} />
          </section>

          <section>
            <div
              className={styles.content} // styles.content 클래스를 사용
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </section>
          <Separator />

          <section className="flex flex-col gap-5">
            <div className="flex  justify-between w-full text-md">
              <span className="flex items-center gap-3">
                <Avatar className="flex items-center">
                  <AvatarImage
                    src="https://lh3.googleusercontent.com/a/ACg8ocKXrhh7dYMkeFCgm13lH1W5YmZJ1GaPFMFMTKROb_gdHP_PWsE0=s96-c"
                    alt="user_username avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-stone-500">Hur HyeonBin (Max)</span>
              </span>
            </div>

            <PostLDC like={post.like} dislike={post.dislike} post_id={params} />
          </section>
        </div>
      )}
    </div>
  );
};

export default PostPageComponent;
