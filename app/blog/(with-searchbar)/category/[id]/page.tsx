import React, { Suspense } from "react";
import PostList from "@/components/post/PostList";
import PostSkeleton from "@/components/post/PostSkeleton";

// Props 타입 정의 (params와 searchParams를 하나로 합침)
interface PageParams {
  params: { id: string }; // category ID
  searchParams: { page: string }; // page 쿼리 파라미터
}

// 페이지 컴포넌트의 타입을 정의합니다.
const Page = async ({ params, searchParams }: PageParams) => {
  // page 파라미터가 없으면 기본값 1로 설정
  const page = parseInt(searchParams.page) || 1;

  return (
    <Suspense
      fallback={new Array(7).fill(0).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    >
      <PostList
        path="blog"
        from="category"
        category_id={params.id} // category_id는 params에서 받음
        page={page} // page는 searchParams에서 받음
      />
    </Suspense>
  );
};

export default Page;
