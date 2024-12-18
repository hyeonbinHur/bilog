import React from "react";
import PostList from "@/components/post/PostList";
import PostSkeleton from "@/components/post/PostSkeleton";
import { Suspense } from "react";

export interface SearchParams {
  page: string;
}

const Page = ({ searchParams }: { searchParams: SearchParams }) => {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div>
      <Suspense
        fallback={new Array(7).fill(0).map((e) => (
          <PostSkeleton />
        ))}
      >
        <PostList path={"article"} from={"main"} page={page} />
      </Suspense>
    </div>
  );
};

export default Page;
