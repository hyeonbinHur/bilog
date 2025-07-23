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
  // const [categories] = await Promise.all([getCategories("BLOG")]);
  // 병렬로 fetch 시작 및 await
  const [categories, postsData] = await Promise.all([
    getCategories("BLOG"),
    getPosts(from, path, page),
  ]);
  // const categories = await getCategories("BLOG");
  // const postsData = await getPosts(from, path, page);
  const categoryData = categories.data;

  if (!categories) throw new Error("error");
  if (!postsData) throw new Error("error");

  return (
    <div className="mb-24">
      <SidebarProvider>
        <div className="relative w-full flex">
          {/* Sidebar */}
          <AppSidebar categories={categoryData} />

          <SidebarInset>
            <div className="w-full">
              <div className="mb-24">
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
