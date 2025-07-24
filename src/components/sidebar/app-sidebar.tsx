import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/src/components/ui/sidebar";
import type { Category } from "@/type";
import CategoryList from "./CategoryList";
import ForMax from "./ForMax";

export function AppSidebar({ categories }: { categories: Category[] }) {
  return (
    <Sidebar variant="floating" className="flex sticky top-0 z-10 ">
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
