import React, { Suspense } from "react";
import CommentList from "@/src/components/comment/CommentList";
import PostPageSkeleton from "@/src/components/post/PostPageSkeleton";
import CommentSkeleton from "@/src/components/comment/CommentSkeleton";
import PostNextSkeleton from "@/src/components/post/PostNextSkeleton";
import { getLocale } from "next-intl/server";
import { Metadata } from "next";
import { authOptions } from "@/src/lib/authOption";
import { getServerSession } from "next-auth";
import PostStateManage from "@/src/components/post/PostStateManage";

interface Props {
  params: { id: string };
}

async function fetchPost(postId: string) {
  const session = await getServerSession(authOptions);
  const locale = await getLocale();
  const headers: Record<string, string> = {};

  if (session?.user?.id) {
    headers["User-Id"] = session.user.id;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}?locale=${locale}`,
    { next: { tags: [`post-${postId}`] }, headers }
  );

  if (!response.ok) {
    if (response.status === 401) return null;
    throw new Error(await response.text());
  }

  return response.json();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await fetchPost(params.id);
  if (!data)
    return { title: "Blog | Not Found", description: "Post not found." };

  const { engPost, post } = data.post;

  return {
    title: `Blog | ${engPost.title}`,
    description: `Explore insights about "${engPost.title}" on Bilog regarding ${engPost.category_name}. ${engPost.subtitle}`,
    openGraph: {
      title: `Blog | ${engPost.title}`,
      description: `Explore insights about "${engPost.title}" on Bilog regarding ${engPost.category_name}. ${engPost.subtitle}`,
      images: [engPost.thumbnail],
    },
  };
}

const Page = async ({ params }: Props) => {
  const data = await fetchPost(params.id);
  if (!data) return <div>Post not found.</div>;

  const { korPost, engPost } = data.post;
  const locale = await getLocale();

  return (
    <>
      <div className="relative flex gap-8">
        <Suspense fallback={<PostNextSkeleton />}>
          <PostStateManage
            korPost={korPost}
            engPost={engPost}
            locale={locale}
          />
        </Suspense>
      </div>
      <Suspense
        fallback={new Array(5).fill(0).map((_, i) => (
          <CommentSkeleton key={`blog-${params.id}-skeleton-${i}`} />
        ))}
      >
        <CommentList params={params.id} />
      </Suspense>
    </>
  );
};

export default Page;
