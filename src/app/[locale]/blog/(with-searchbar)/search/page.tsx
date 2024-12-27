import React, { Suspense } from "react";
import PostList from "@/src/components/post/PostList";
import PostSkeleton from "@/src/components/post/PostSkeleton";
import BreadCrumbSkeleton from "@/src/components/breadcrumb/BreadCrumbSkeleton";
import BreadCrumb from "@/src/components/breadcrumb/BreadCrumb";
import { Metadata } from "next";
export interface SearchParams {
  q?: string;
  page: string;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `<Bilog/> : ${q}`,
    description: `Discover insightful results for "${q}" on Bilog. Explore content tailored to your search query and find exactly what you're looking for.`,
    openGraph: {
      title: `<Bilog/> : ${q}`,
      description: `Discover insightful results for "${q}" on Bilog. Explore content tailored to your search query and find exactly what you're looking for.`,
      images: ["/logo.png"],
    },
  };
}

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  return (
    <>
      <Suspense fallback={<BreadCrumbSkeleton />}>
        <BreadCrumb type="BLOG" from="search" info={searchParams.q as string} />
      </Suspense>
      <Suspense
        key={searchParams.q}
        fallback={new Array(3).fill(0).map((e, i) => (
          <PostSkeleton key={`blog-search-skeleton-${i}`} />
        ))}
      >
        <PostList
          path="blog"
          from={"search"}
          params={searchParams.q as string}
          page={page}
        />
      </Suspense>
    </>
  );
};

export default page;
