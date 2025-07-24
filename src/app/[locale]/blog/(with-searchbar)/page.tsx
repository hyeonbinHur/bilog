import PostList from "@/src/components/post/PostList";
import { AppSidebar } from "@/src/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { getCategories, getPosts } from "@/src/helper/fetcherUtils";
export interface SearchParams {
  page: string;
}

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const path = "blog";
  const from = "main";

  const [categories, postsData] = await Promise.all([
    getCategories("BLOG"),
    getPosts(from, path, page),
  ]);

  if (!categories) throw new Error("error");
  if (!postsData) throw new Error("error");

  return (
    <div className="">
      <SidebarProvider>
        <div className="w-full flex relative mb-0">
          {/* Sidebar */}
          <AppSidebar categories={categories} />
          <SidebarInset>
            <div className="w-full">
              <div className="">
                <PostList
                  path="blog"
                  posts={postsData.posts}
                  totalCount={postsData.totalCount}
                />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Page;
