import React, { Suspense } from "react";
import PostList from "@/components/post/PostList";
import PostSkeleton from "@/components/post/PostSkeleton";
interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  return (
    <Suspense
      fallback={new Array(7).fill(0).map((e) => (
        <PostSkeleton />
      ))}
    >
      <PostList
        path="article"
        from={"category"}
        category_id={params.id as string}
      />
    </Suspense>
  );
};

export default page;
