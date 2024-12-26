import React, { Suspense } from "react";
import CommentList from "@/src/components/comment/CommentList";
import PostPageComponent from "@/src/components/post/PostPage";
import PostPageSkeleton from "@/src/components/post/PostPageSkeleton";
import CommentSkeleton from "@/src/components/comment/CommentSkeleton";
import PostNextSkeleton from "@/src/components/post/PostNextSkeleton";
import PostNextContainer from "@/src/components/post/PostNextContainer";
import { getLocale } from "next-intl/server";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const locale = await getLocale();

  return (
    <>
      <div className="relative flex gap-8">
        <Suspense fallback={<PostPageSkeleton />}>
          <PostPageComponent id={params.id} locale={locale} />
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
