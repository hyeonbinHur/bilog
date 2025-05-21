import React, { Suspense } from "react";
import PostList from "@/src/components/post/PostList";
import PostSkeleton from "@/src/components/post/PostSkeleton";
import BreadCrumbSkeleton from "@/src/components/breadcrumb/BreadCrumbSkeleton";
import BreadCrumb from "@/src/components/breadcrumb/BreadCrumb";
import { Metadata } from "next";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/sidebar/app-sidebar";

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
    title: `H-Bilog : ${q}`,
    description: `Discover insightful results for "${q}" on H-Bilog. Explore content tailored to your search query and find exactly what you're looking for.`,
    openGraph: {
      title: `H-Bilog : ${q}`,
      description: `Discover insightful results for "${q}" on H-Bilog. Explore content tailored to your search query and find exactly what you're looking for.`,
      images: ["https://bilog-phi.vercel.app/logo.png"],
    },
  };
}

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const path = "blog";
  const from = "search";
  const params = "searchParams.q";

  return (
    <SidebarProvider>
      <div className="relative flex w-full">
        {/* <Suspense fallback={<div className="w-64">Loading sidebar...</div>}>
          <AppSidebar from="BLOG" />
        </Suspense> */}
        <SidebarInset>
          <div className="w-full">
            <Suspense fallback={<BreadCrumbSkeleton />}>
              <BreadCrumb
                type="BLOG"
                from="search"
                info={searchParams.q as string}
              />
            </Suspense>
            {/* <Suspense
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
            </Suspense> */}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default page;
