// PostThumbnail.tsx - 포스트의 썸네일 이미지를 표시하는 컴포넌트

import { IPost } from "@/type";
import Image from "next/image";

interface PostThumbnailProps {
  post: IPost;
}

export default function PostThumbnail({ post }: PostThumbnailProps) {
  return (
    <section>
      <div
        className="relative w-full h-[30rem] overflow-hidden flex items-center justify-center"
        role="img"
        aria-label={post.thumbnail_alt}
      >
        <Image
          src={post.thumbnail}
          alt={post.thumbnail_alt}
          placeholder="blur"
          fill
          blurDataURL={post.thumbnail}
          className="blur-sm opacity-80 brightness-50 object-cover"
        />

        <div className="absolute w-full h-[25rem]">
          <Image
            src={post.thumbnail}
            alt={post.thumbnail_alt}
            placeholder="blur"
            fill
            blurDataURL={post.thumbnail}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
