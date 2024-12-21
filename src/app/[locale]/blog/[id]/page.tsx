import React, { Suspense } from "react";
import CommentList from "@/src/components/comment/CommentList";
import PostPageComponent from "@/src/components/post/PostPage";
import PostPageSkeleton from "@/src/components/post/PostPageSkeleton";
import CommentSkeleton from "@/src/components/comment/CommentSkeleton";
import PostNextContainer from "@/src/components/post/PostNextContainer";
import PostNextSkeleton from "@/src/components/post/PostNextSkeleton";

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
        <CommentList params={params.id} />
      </Suspense>
    </>
  );
};

export default page;
