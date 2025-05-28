import SearchBar from "@/src/components/SearchBar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <SearchBar />
      {children}

      {/* <SidebarProvider>
        <div className="relative flex w-full">
          <AppSidebar from="BLOG" />
          <SidebarInset>
            <div className="w-full">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider> */}
      {/* <div className="w-full">{children}</div> */}
    </div>
  );
};

export default Layout;
