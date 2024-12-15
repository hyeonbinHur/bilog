import React, { Suspense } from "react";
import CommentList from "@/components/comment/CommentList";
import PostPageComponent from "@/components/post/PostPage";
import PostPageSkeleton from "@/components/post/PostPageSkeleton";
import CommentSkeleton from "@/components/comment/CommentSkeleton";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  return (
    <>
      <Suspense fallback={<PostPageSkeleton />}>
        <PostPageComponent params={params.id as string} />
      </Suspense>

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
