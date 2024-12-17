import React, { Suspense } from "react";
import { IPost } from "@/type";
import PostList from "@/components/post/PostList";
import PostSkeleton from "@/components/post/PostSkeleton";

const page = async ({ searchParams }: { searchParams: { q?: string } }) => {
  return (
    <div>
      <Suspense
        key={searchParams.q}
        fallback={new Array(3).fill(0).map((e) => (
          <PostSkeleton />
        ))}
      >
        <PostList
          path="article"
          from={"search"}
          params={searchParams.q as string}
        />
      </Suspense>
    </div>
  );
};

export default page;
