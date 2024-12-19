import React, { Suspense } from "react";
import PostList from "@/src/components/post/PostList";
import PostSkeleton from "@/src/components/post/PostSkeleton";
interface PageParams {
  params: { id: string }; // category ID
  searchParams: { page: string }; // page 쿼리 파라미터
}

const page = async ({ params, searchParams }: PageParams) => {
  const page = parseInt(searchParams.page) || 1;

  return (
    <Suspense
      fallback={new Array(7).fill(0).map((e) => (
        <PostSkeleton />
      ))}
    >
      <PostList
        path="article"
        from={"category"}
        category_id={params.id}
        page={page} // page는 searchParams에서 받음
      />
    </Suspense>
  );
};

export default page;
