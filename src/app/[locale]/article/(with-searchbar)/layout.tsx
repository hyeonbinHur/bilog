import SearchBar from "@/src/components/SearchBar";
import React, { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/components/sidebar/app-sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <SearchBar />
      <SidebarProvider>
        <div className="relative flex w-full">
          <AppSidebar from="ARTICLE" />
          <SidebarInset>
            <div className="w-full">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
