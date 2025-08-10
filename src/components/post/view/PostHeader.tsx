// PostHeader.tsx - 포스트 제목, 카테고리, 작성자 정보를 표시하는 헤더 컴포넌트

import { IPost } from "@/type";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import dynamic from "next/dynamic";

const PostCategory = dynamic(() => import("../shared/PostCategory"));

interface PostHeaderProps {
  post: IPost;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <section>
      <PostCategory
        type={post.type}
        category_name={post.category_name}
        title={post.title}
        category_id={post.category_id}
      />

      <h2 className="text-3xl font-extrabold mb-5">{post.title}</h2>
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
  );
}
