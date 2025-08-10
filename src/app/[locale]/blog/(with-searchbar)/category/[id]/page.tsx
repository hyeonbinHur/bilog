import BreadCrumb from "@/src/components/breadcrumb/BreadCrumb";
import BreadCrumbSkeleton from "@/src/components/breadcrumb/BreadCrumbSkeleton";
import PostList from "@/src/components/post/list/PostList";
import { AppSidebar } from "@/src/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import {
  getCategories,
  getCategoryById,
  getPosts,
} from "@/src/helper/fetcherUtils";
import { Metadata } from "next";
import { Suspense } from "react";

interface PageParams {
  params: { id: string };
  searchParams: { page: string };
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const category = await getCategoryById(params.id);
  return {
    title: `H-Bilog : ${category.category_name}`,
    description: `Discover insightful results for "${category.category_name}" on H-Bilog. Explore content tailored to your search query and find exactly what you're looking for.`,
    openGraph: {
      title: `H-Bilog : ${category.category_name}`,
      description: `Discover insightful results for "${category.category_name}" on H-Bilog. Explore content tailored to your search query and find exactly what you're looking for.`,
      images: ["https://bilog-phi.vercel.app/logo.png"],
    },
  };
}

const Page = async ({ params, searchParams }: PageParams) => {
  const page = parseInt(searchParams.page) || 1;
  const path = "blog";
  const from = "category";

  const categories = await getCategories("BLOG");
  const postsData = await getPosts(from, path, page, {
    category_id: params.id,
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
              <BreadCrumb type="BLOG" from="category" info={params.id} />
            </Suspense>
            <div className="w-full">
              <div className="mb-24">
                <PostList
                  path="blog"
                  posts={postsData.posts}
                  totalCount={postsData.totalCount}
                  //category_id
                />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Page;
