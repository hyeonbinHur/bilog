import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar variant="floating" className="sticky top-0 z-0">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>For Max</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Button className="h-7 w-40 bg-white border-2 border-primary text-primary text-xs hover:text-white active:translate-y-0.5">
                <Link href="/blog/create">Create new blog</Link>
              </Button>

              <Button className="h-7 w-40 bg-white border-2 border-primary text-primary text-xs hover:text-white active:translate-y-0.5">
                Create new Category
              </Button>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Category</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="cursor-pointer">
                  <div>HTML</div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span> JS</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span> React</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <span> NEXT</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
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
