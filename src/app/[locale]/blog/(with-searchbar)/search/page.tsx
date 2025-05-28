import BreadCrumb from "@/src/components/breadcrumb/BreadCrumb";
import BreadCrumbSkeleton from "@/src/components/breadcrumb/BreadCrumbSkeleton";
import PostList from "@/src/components/post/PostList";
import { AppSidebar } from "@/src/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { getCategories, getPosts } from "@/src/helper/fetcherUtils";
import { Metadata } from "next";
import { Suspense } from "react";
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
  const categories = await getCategories("BLOG");
  const postsData = await getPosts(from, path, page, {
    searchParams: searchParams.q,
  });
  if (!categories) throw new Error("error");
  if (!postsData) throw new Error("error");
  return (
    <>
      <SidebarProvider>
        <div className="relative w-full flex">
          {/* Sidebar */}
          <AppSidebar categories={categories} />

          <SidebarInset>
            <Suspense fallback={<BreadCrumbSkeleton />}>
              <BreadCrumb
                type="BLOG"
                from="search"
                info={searchParams.q as string}
              />
            </Suspense>
            <div className="w-full">
              <div className="mb-24">
                <PostList
                  path="blog"
                  posts={postsData.posts}
                  totalCount={postsData.totalCount}
                  //params
                />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default page;
