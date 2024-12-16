import React from "react";
import PostList from "@/components/post/PostList";
import PostSkeleton from "@/components/post/PostSkeleton";
import { Suspense } from "react";

const Page = () => {
  return (
    <div>
      <Suspense
        fallback={new Array(7).fill(0).map((e) => (
          <PostSkeleton />
        ))}
      >
        <PostList from={"main"} />
      </Suspense>
    </div>
  );
};

export default Page;
