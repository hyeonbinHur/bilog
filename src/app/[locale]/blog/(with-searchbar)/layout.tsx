import { BlogPageSkeleton } from "@/src/components/Common/BlogPageSkeleton";
import SearchBar from "@/src/components/SearchBar";
import { ReactNode, Suspense } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <SearchBar />
      <Suspense fallback={<BlogPageSkeleton />}>{children}</Suspense>
    </div>
  );
};

export default Layout;
