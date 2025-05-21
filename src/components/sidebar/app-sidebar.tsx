import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/src/components/ui/sidebar";
import CategoryList from "./CategoryList";
import CategorySkeleton from "./CategorySkeleton";
import { Suspense } from "react";
import ForMax from "./ForMax";
import type { Category } from "@/type";

export function AppSidebar({ categories }: { categories: Category[] }) {
  return (
    <Sidebar variant="floating" className="sticky top-0 z-0">
      <SidebarContent className="bg-white">
        <ForMax from={"BLOG"} />
        <SidebarGroup>
          <SidebarGroupLabel>Category</SidebarGroupLabel>
          <SidebarGroupContent>
            <CategoryList categories={categories} />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Popular</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu></SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
