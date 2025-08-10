"use client";

import { IPost } from "@/type";
import dynamic from "next/dynamic";
import { Separator } from "../ui/separator";

// 동적 import로 컴포넌트들 로드
const PostHeader = dynamic(() => import("./view/PostHeader"));
const PostMetadata = dynamic(() => import("./view/PostMetadata"));
const PostThumbnail = dynamic(() => import("./view/PostThumbnail"));
const PostContent = dynamic(() => import("./view/PostContent"));
const PostAuthor = dynamic(() => import("./view/PostAuthor"));
const PostComments = dynamic(() => import("./view/PostComments"));

const PostView = ({ post }: { post: IPost }) => {
  return (
    <div className="flex w-full flex-col gap-5">
      {/* PostHeader - 포스트 제목, 카테고리, 작성자 정보 */}
      <PostHeader post={post} />
      <Separator />

      {/* PostMetadata - 댓글 수, 작성시간, 언어 상태 등 메타데이터 */}
      <PostMetadata post={post} />
      <Separator />

      {/* PostThumbnail - 포스트 썸네일 이미지 */}
      <PostThumbnail post={post} />
      <Separator />

      {/* PostContent - 포스트 내용 */}
      <PostContent htmlContent={post.content} />
      <Separator />

      {/* PostAuthor - 포스트 하단 작성자 정보 */}
      <PostAuthor />
      {/* PostComments - 댓글 정보 */}
      <PostComments post={post} />
    </div>
  );
};

export default PostView;
