import React, { Suspense } from "react";
import PostList from "@/src/components/post/PostList";
import PostSkeleton from "@/src/components/post/PostSkeleton";
import BreadCrumb from "@/src/components/breadcrumb/BreadCrumb";
import BreadCrumbSkeleton from "@/src/components/breadcrumb/BreadCrumbSkeleton";
import { Metadata } from "next";

interface PageParams {
  params: { id: string };
  searchParams: { page: string };
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const mainSql = `${process.env.NEXT_PUBLIC_BASE_URL}/category/${params.id}`;
  const mainResponse = await fetch(mainSql, {
    next: { tags: [`post-all`] },
  });
  if (!mainResponse.ok) {
    throw new Error("Error while reading category data");
  }
  const cateory = await mainResponse.json();
  return {
    title: `<Bilog/> : ${cateory[0].category_name}`,
    description: `Discover insightful results for "${cateory[0].category_name}" on Bilog. Explore content tailored to your search query and find exactly what you're looking for.`,
    openGraph: {
      title: `<Bilog/> : ${cateory[0].category_name}`,
      description: `Discover insightful results for "${cateory[0].category_name}" on Bilog. Explore content tailored to your search query and find exactly what you're looking for.`,
      images: ["/logo.png"],
    },
  };
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
