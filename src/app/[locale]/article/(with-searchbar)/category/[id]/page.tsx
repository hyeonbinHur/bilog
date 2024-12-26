import React, { Suspense } from "react";
import PostList from "@/src/components/post/PostList";
import PostSkeleton from "@/src/components/post/PostSkeleton";
import BreadCrumbSkeleton from "@/src/components/breadcrumb/BreadCrumbSkeleton";
import BreadCrumb from "@/src/components/breadcrumb/BreadCrumb";

interface PageParams {
  params: { id: string };
  searchParams: { page: string };
}

const page = async ({ params, searchParams }: PageParams) => {
  const page = parseInt(searchParams.page) || 1;

  return (
    <>
      <Suspense fallback={<BreadCrumbSkeleton />}>
        <BreadCrumb type="ARTICLE" from="category" info={params.id} />
      </Suspense>
      <Suspense
        fallback={new Array(7).fill(0).map((e, i) => (
          <PostSkeleton key={`article-category-post-skeletone-${i}`} />
        ))}
      >
        <PostList
          path="article"
          from={"category"}
          category_id={params.id}
          page={page}
        />
      </Suspense>
    </>
  );
};

export default page;
