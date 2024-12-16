import SearchBar from "@/components/SearchBar";
import React, { ReactNode } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <SearchBar />
      <SidebarProvider>
        <div className="relative flex w-full">
          <AppSidebar from="BLOG" />
          <SidebarInset>
            <div className="w-full">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
