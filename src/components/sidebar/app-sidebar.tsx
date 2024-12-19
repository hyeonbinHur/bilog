import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import { Button } from "../ui/button";
import { Link } from "@/src/i18n/routing";
import CategoryList from "./CategoryList";
import CategorySkeleton from "./CategorySkeleton";
import { Suspense } from "react";
import ForMax from "./ForMax";

export function AppSidebar({ from }: { from: string }) {
  return (
    <Sidebar variant="floating" className="sticky top-0 z-0">
      <SidebarContent className="bg-white">
        <ForMax from={from} />
        <SidebarGroup>
          <SidebarGroupLabel>Category</SidebarGroupLabel>
          <SidebarGroupContent>
            <Suspense
              fallback={Array(5)
                .fill(0)
                .map((_) => (
                  <CategorySkeleton />
                ))}
            >
              <CategoryList from={from} />
            </Suspense>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Popular</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu></SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
