import BlogPageSkeleton from "@/src/components/BlogPageSkeleton";
import SearchBar from "@/src/components/SearchBar";
import React, { ReactNode, Suspense } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative">
      <SearchBar />
      <Suspense fallback={<BlogPageSkeleton />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
