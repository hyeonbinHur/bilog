import React from "react";
import PostList from "@/src/components/post/PostList";
import PostSkeleton from "@/src/components/post/PostSkeleton";
import { Suspense } from "react";
export interface SearchParams {
  page: string;
}

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  return (
    <div className="mb-24">
      <Suspense
        fallback={new Array(7).fill(0).map((e, i) => (
          <PostSkeleton key={`blog-post-skeleton-${i}`} />
        ))}
      >
        <PostList path="blog" from={"main"} page={page} />
      </Suspense>
    </div>
  );
};

export default Page;
