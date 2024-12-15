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
    <SidebarProvider>
      {/* border-red-500 div 내부로 AppSidebar를 이동 */}
      <div className="relative flex">
        <AppSidebar />
        <SidebarInset>
          <SearchBar />
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
