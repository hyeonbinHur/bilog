import React, { Suspense } from "react";
import dynamic from "next/dynamic";
// 동적 import로 SyntaxHighlighter를 클라이언트 사이드에서만 로드
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Light),
  { ssr: false }
);
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CommentList from "@/components/comment/CommentList";
import PostPageComponent from "@/components/post/PostPageComponent";
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
