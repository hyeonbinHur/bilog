import React, { Suspense } from "react";
import CommentList from "@/src/components/comment/CommentList";
// import PostPageComponent from "@/src/components/post/PostPage";
import PostPageSkeleton from "@/src/components/post/PostPageSkeleton";
import CommentSkeleton from "@/src/components/comment/CommentSkeleton";
import PostNextSkeleton from "@/src/components/post/PostNextSkeleton";
import PostNextContainer from "@/src/components/post/PostNextContainer";
import { getLocale } from "next-intl/server";
import { Metadata } from "next";
interface Props {
  params: { id: string };
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale();

  const postResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/${params.id}?locale=${locale}`,
    {
      next: { tags: [`post-${params.id}`] },
    }
  );
  if (!postResponse.ok) {
    throw new Error("Failed to fetch post data");
  }
  const data = await postResponse.json();
  return {
    title: `Article | ${data.title}`,
    description: `Explore detailed insights and valuable information about "${data.title}" on Article regarding ${data.category_name}. Dive into curated content tailored to your interests. ${data.subtitle}`,
    openGraph: {
      title: `Article | ${data.title}`,
      description: `Explore detailed insights and valuable information about "${data.title}" on Article regarding ${data.category_name}. Dive into curated content tailored to your interests.${data.subtitle}`,
      images: [`${data.thumbnail}`],
    },
    metadataBase: new URL("https://bilog-phi.vercel.app/"),
  };
}

const page = async ({ params }: Props) => {
  const locale = await getLocale();

  return (
    <>
      <div className="relative flex gap-8">
        <Suspense fallback={<PostPageSkeleton />}>
          {/* <PostPageComponent id={params.id} locale={locale} /> */}
        </Suspense>

        <Suspense fallback={<PostNextSkeleton />}>
          <PostNextContainer post_id={params.id} />
        </Suspense>
      </div>
      <Suspense
        fallback={new Array(5).fill(0).map((e, i) => (
          <CommentSkeleton key={`article-${params.id}-skeleton-${i}`} />
        ))}
      >
        <CommentList params={params.id as string} />
      </Suspense>
    </>
  );
};

export default page;
