import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/src/components/ui/sidebar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostSkeleton from "../post/PostSkeleton";

export const CategoryListSkeleton = () => {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, i) => (
        <SidebarMenuItem key={`category-skeleton-${i}`}>
          <SidebarMenuButton>
            <div className="flex items-center space-x-2 w-full">
              {/* 카테고리 아이콘 스켈레톤 */}
              <Skeleton width={16} height={16} />
              {/* 카테고리 이름 스켈레톤 */}
              <Skeleton height={16} width={`${50 + Math.random() * 40}%`} />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export const BlogPageSkeleton = () => {
  return (
    <div className="relative">
      <div className="mb-24">
        <SidebarProvider>
          <div className="relative w-full flex">
            {/* Sidebar */}
            <Sidebar variant="floating" className="sticky top-0 z-0">
              <SidebarContent className="bg-white">
                <SidebarGroup>
                  <SidebarGroupLabel>Category</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <CategoryListSkeleton />
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu></SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>

            <SidebarInset>
              <div className="w-full">
                <div className="mb-24">
                  {/* PostSkeleton 5개 */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <PostSkeleton key={`blog-post-skeleton-${i}`} />
                  ))}
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
};
