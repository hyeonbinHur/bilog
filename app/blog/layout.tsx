import SearchBar from "@/components/SearchBar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  );
};

export default Layout;
