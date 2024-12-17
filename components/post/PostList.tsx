import { IPost } from "@/type";
import React from "react";
import Link from "next/link";
import PostCard from "./PostCard";
import { Separator } from "../ui/separator";
// 'from'과 'params'는 서버 컴포넌트에서 props로 전달받을 수 있습니다.
export default async function PostList({
  from,
  params,
  category_id,
  path,
}: {
  from: string;
  params?: string;
  category_id?: string;
  path: string;
}) {
  let posts: IPost[] = [];
  let loading = true;

  // 조건에 따라 fetch 호출
  if (from === "main") {
    const postResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post?type=${path}`,
      {
        cache: "no-cache",
      }
    );
    if (!postResponse.ok) {
      return <div>error</div>;
    }
    posts = await postResponse.json();
    loading = false;
  } else if (from === "search") {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/search?q=${params}&type=${path}`,
      {
        cache: "no-cache",
      }
    );
    if (!response.ok) {
      return <>error..</>;
    }
    posts = await response.json();
    loading = false;
  } else if (from === "category") {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/category/${category_id}?type=${path}`,
      {
        cache: "no-cache",
      }
    );
    if (!response.ok) {
      return <>error..</>;
    }
    posts = await response.json();
    loading = false;
  }

  return (
    <div>
      {!loading ? (
        posts.map((e: IPost, i: number) => (
          <div key={e.post_id}>
            <Link href={`/${path}/${e.post_id}`}>
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
