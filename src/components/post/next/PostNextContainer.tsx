import { RelatedPost } from "@/type";
import React from "react";
import PostNextItem from "./PostNextItem";
const PostNextContainer = async ({ post_id }: { post_id: string }) => {
  //Server component fetch data
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/related?post_id=${post_id}`
  );
  if (!response.ok) {
    return <div>error..</div>;
  }
  const relateds: RelatedPost[] = await response.json();

  return (
    <div className="sticky top-[40%] mb-52 w-1/4 h-56  ">
      <div className="text-md font-bold mb-5">Read Next</div>
      {relateds.map((e: RelatedPost) => (
        <PostNextItem {...e} key={e.post_id} />
      ))}
    </div>
  );
};

export default PostNextContainer;

// 같은 카테고리의 다음글? id를 기준으로?
