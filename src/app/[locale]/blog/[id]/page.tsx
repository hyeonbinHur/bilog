import CommentList from "@/src/components/comment/CommentList";
import CommentSkeleton from "@/src/components/comment/CommentSkeleton";
import PostStateManage from "@/src/components/post/management/PostStateManage";
import PostDetailSkeleton from "@/src/components/post/skeleton/PostDetailSkeleton";
import { getPostById } from "@/src/helper/fetcherUtils";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Suspense } from "react";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getPostById(params.id);

  if (!data)
    return { title: "H-Bilog | Not Found", description: "Post not found." };

  const { eng_post, kor_post } = data;

  return {
    title: `H-Bilog | ${eng_post.title}`,
    description: `Explore insights about "${eng_post.title}" on Bilog regarding ${eng_post.category_name}. ${eng_post.subtitle}`,
    openGraph: {
      title: `H-Bilog | ${eng_post.title}`,
      description: `Explore insights about "${eng_post.title}" on Bilog regarding ${eng_post.category_name}. ${eng_post.subtitle}`,
      images: [eng_post.thumbnail],
    },
  };
}

const Page = async ({ params }: Props) => {
  const data = await getPostById(params.id);
  if (!data) return <div>Post not found.</div>;
  const { kor_post, eng_post } = data;
  const locale = await getLocale();

  return (
    <>
      <div className="relative flex gap-8">
        <Suspense fallback={<PostDetailSkeleton />}>
          <PostStateManage
            korPost={kor_post}
            engPost={eng_post}
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
