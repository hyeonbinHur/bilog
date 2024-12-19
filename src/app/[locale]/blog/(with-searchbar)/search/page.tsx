import React, { Suspense } from "react";
import { IPost } from "@/type";
import PostList from "@/src/components/post/PostList";
import PostSkeleton from "@/src/components/post/PostSkeleton";

const page = async ({
  searchParams,
}: {
  searchParams: { q?: string; page: string };
}) => {
  const page = parseInt(searchParams.page) || 1;
  return (
    <div>
      <Suspense
        key={searchParams.q}
        fallback={new Array(3).fill(0).map((e) => (
          <PostSkeleton />
        ))}
      >
        <PostList
          path="blog"
          from={"search"}
          params={searchParams.q as string}
          page={page}
        />
      </Suspense>
    </div>
  );
};

export default page;
