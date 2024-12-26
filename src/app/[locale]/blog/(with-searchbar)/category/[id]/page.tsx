import React, { Suspense } from "react";
import PostList from "@/src/components/post/PostList";
import PostSkeleton from "@/src/components/post/PostSkeleton";
import BreadCrumb from "@/src/components/breadcrumb/BreadCrumb";
import BreadCrumbSkeleton from "@/src/components/breadcrumb/BreadCrumbSkeleton";

interface PageParams {
  params: { id: string };
  searchParams: { page: string };
}

const Page = async ({ params, searchParams }: PageParams) => {
  const page = parseInt(searchParams.page) || 1;

  return (
    <>
      <Suspense fallback={<BreadCrumbSkeleton />}>
        <BreadCrumb type="BLOG" from="category" info={params.id} />
      </Suspense>

      <Suspense
        fallback={new Array(7).fill(0).map((_, i) => (
          <PostSkeleton key={`blog-category-skeleton-${i}`} />
        ))}
      >
        <PostList
          path="blog"
          from="category"
          category_id={params.id}
          page={page}
        />
      </Suspense>
    </>
  );
};

export default Page;
