import React from "react";
import PostCategory from "./PostCategory";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Circle } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import PostLDC from "./PostLDC";
import { IPost } from "@/type";
import styles from "./blog.module.css"; // CSS 모듈 import

const PostView = ({ post }: { post: IPost }) => {
  return (
    <div className="flex flex-col gap-5">
      <PostCategory />
      <h2 className="text-3xl font-extrabold">{post.title}</h2>
      {/* ⬇️ post author & time & edit button */}
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

          {/* ⬇️ time && edit */}
          <span className="flex items-center gap-1 text-stone-500 text-sm">
            {/* isEdit === false => start edit button */}
            {/* <Button className="w-16 h-8 text-stone-500 border-2 border-stone-500 bg-white rounded-sm hover:bg-stone-400 hover:text-stone-700 active:translate-y-0.5 ">
                  Edit
                </Button> */}
            <Circle className="size-4 stroke-none fill-blue-400" />1 mins
          </span>
        </div>
      </section>

      {/* ⬇️ post reponse number */}
      <Separator />
      <PostLDC like={post.like} dislike={post.dislike} post_id={post.post_id} />
      <Separator />

      {/* ⬇️ post contents */}
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
        <PostLDC
          like={post.like}
          dislike={post.dislike}
          post_id={post.post_id}
        />
      </section>
    </div>
  );
};

export default PostView;