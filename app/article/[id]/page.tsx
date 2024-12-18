import React, { Suspense } from "react";
import CommentList from "@/components/comment/CommentList";
import PostPageComponent from "@/components/post/PostPage";
import PostPageSkeleton from "@/components/post/PostPageSkeleton";
import CommentSkeleton from "@/components/comment/CommentSkeleton";
import PostNextSkeleton from "@/components/post/PostNextSkeleton";
import PostNextContainer from "@/components/post/PostNextContainer";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  return (
    <>
      <div className="relative flex gap-8">
        <Suspense fallback={<PostPageSkeleton />}>
          <PostPageComponent params={params.id} />
        </Suspense>

        <Suspense fallback={<PostNextSkeleton />}>
          <PostNextContainer post_id={params.id} />
        </Suspense>
      </div>
      <Suspense
        fallback={new Array(5).fill(0).map((e) => (
          <CommentSkeleton />
        ))}
      >
        <CommentList params={params.id as string} />
      </Suspense>
    </>
  );
};

export default page;
