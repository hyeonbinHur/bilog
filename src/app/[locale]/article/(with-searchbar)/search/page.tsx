import BreadCrumb from "@/src/components/breadcrumb/BreadCrumb";
import BreadCrumbSkeleton from "@/src/components/breadcrumb/BreadCrumbSkeleton";
import PostSkeleton from "@/src/components/post/PostSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";
export interface SearchParams {
  q?: string;
  page: string;
}
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `<Bilog/> : ${q}`,
    description: `Discover insightful results for "${q}" on Bilog. Explore content tailored to your search query and find exactly what you're looking for.`,
    openGraph: {
      title: `<Bilog/> : ${q}`,
      description: `Discover insightful results for "${q}" on Bilog. Explore content tailored to your search query and find exactly what you're looking for.`,
      images: ["https://bilog-phi.vercel.app/logo.png"],
    },
    metadataBase: new URL("https://bilog-phi.vercel.app/"),
  };
}
const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const page = parseInt(searchParams.page) || 1;

  return (
    <>
      <Suspense fallback={<BreadCrumbSkeleton />}>
        <BreadCrumb
          type="ARTICLE"
          from="search"
          info={searchParams.q as string}
        />
      </Suspense>
      <Suspense
        key={searchParams.q}
        fallback={new Array(3).fill(0).map((e, i) => (
          <PostSkeleton key={`article-search-skeleton-${i}`} />
        ))}
      >
        {/* <PostList
          path="article"
          from={"search"}
          params={searchParams.q}
          page={page}
        /> */}
      </Suspense>
    </>
  );
};

export default page;
