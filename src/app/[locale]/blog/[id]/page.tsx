import { Suspense } from "react";
// import PostPageSkeleton from "@/src/components/post/PostPageSkeleton";

import { authOptions } from "@/src/lib/authOption";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";

import PostNextSkeleton from "@/src/components/post/PostNextSkeleton";
import PostStateManage from "@/src/components/post/PostStateManage";
// import CommentList from "@/src/components/comment/CommentList";
// import CommentSkeleton from "@/src/components/comment/CommentSkeleton";

import CommentList from "@/src/components/comment/CommentList";
import CommentSkeleton from "@/src/components/comment/CommentSkeleton";

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

  //${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}?locale=${locale}

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/${postId}?locale=${locale}`,
    { next: { tags: [`post-${postId}`] }, headers }
  );
  if (!response.ok) {
    if (response.status === 401) return null;
    throw new Error(await response.text());
  }
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await fetchPost(params.id);
  if (!data)
    return { title: "H-Bilog | Not Found", description: "Post not found." };

  const { engPost, post } = data.post;

  return {
    title: `H-Bilog | ${engPost.title}`,
    description: `Explore insights about "${engPost.title}" on Bilog regarding ${engPost.category_name}. ${engPost.subtitle}`,
    openGraph: {
      title: `H-Bilog | ${engPost.title}`,
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
