import React, { Suspense } from "react";
import CommentList from "@/src/components/comment/CommentList";
import PostPageComponent from "@/src/components/post/PostPage";
import PostPageSkeleton from "@/src/components/post/PostPageSkeleton";
import CommentSkeleton from "@/src/components/comment/CommentSkeleton";
import PostNextContainer from "@/src/components/post/PostNextContainer";
import PostNextSkeleton from "@/src/components/post/PostNextSkeleton";
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
      method: "GET", // Add method explicitly (GET is default, but it's good practice to specify)
      headers: {
        "Content-Type": "application/json",
        // You can add any other headers you might need, e.g. Authorization or custom headers:
        // "Authorization": `Bearer ${token}`,
      },
      next: { tags: [`post-${params.id}`] },
    }
  );
  if (!postResponse.ok) {
    throw new Error("Failed to fetch post data");
  }
  const data = await postResponse.json();
  return {
    title: `Blog | ${data.title}`,
    description: `Explore detailed insights and valuable information about "${data.title}" on Bilog regarding ${data.category_name}. Dive into curated content tailored to your interests. ${data.subtitle}`,
    openGraph: {
      title: `Blog | ${data.title}`,
      description: `Explore detailed insights and valuable information about "${data.title}" on Bilog regarding ${data.category_name}. Dive into curated content tailored to your interests. ${data.subtitle}`,
      images: [`${data.thumbnail}`],
    },
  };
}

const page = async ({ params }: Props) => {
  //
  const locale = await getLocale();

  return (
    <>
      <div className="relative flex gap-8 ">
        <PostPageComponent id={params.id} locale={locale} />
        <Suspense fallback={<PostNextSkeleton />}>
          {/* <PostNextContainer post_id={params.id} /> */}
        </Suspense>
      </div>
      <Suspense
        fallback={new Array(5).fill(0).map((e, i) => (
          <CommentSkeleton key={`blog-${params.id}-skeleton-${i}`} />
        ))}
      >
        <CommentList params={params.id} />
      </Suspense>
    </>
  );
};

export default page;
