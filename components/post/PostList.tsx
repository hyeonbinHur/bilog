import { IPost } from "@/type";
import React from "react";
import Link from "next/link";
import PostCard from "./PostCard";
import { Separator } from "../ui/separator";
// 'from'과 'params'는 서버 컴포넌트에서 props로 전달받을 수 있습니다.
export default async function PostList({
  from,
  params,
}: {
  from: string;
  params: string;
}) {
  let posts: IPost[] = [];
  let loading = false;

  // 조건에 따라 fetch 호출
  if (from === "main") {
    const postResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
      {
        next: { revalidate: 3 },
      }
    );
    if (!postResponse.ok) {
      return <div>error</div>;
    }
    posts = await postResponse.json();
    loading = true;
  } else if (from === "search") {
    const response = await fetch(
      `http://localhost:3000/api/blog/search?q=${params}`
    );
    if (!response.ok) {
      return <>error..</>;
    }
    posts = await response.json();
    loading = true;
  }

  return (
    <div>
      {loading && posts.length > 0 ? (
        posts.map((e: IPost, i: number) => (
          <div key={e.post_id}>
            <Link href={`/blog/${e.post_id}`}>
              <PostCard {...e} />
              {i !== posts.length - 1 && <Separator className="mb-5" />}
            </Link>
          </div>
        ))
      ) : (
        <div>No posts found</div>
      )}
    </div>
  );
}
