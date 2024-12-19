import { IPost } from "@/type";
import React from "react";
import { Link } from "@/src/i18n/routing";
import PostCard from "./PostCard";
import { Separator } from "../ui/separator";
import Pagination from "../pagination/pagination";
// 'from'과 'params'는 서버 컴포넌트에서 props로 전달받을 수 있습니다.
export default async function PostList({
  from,
  params,
  category_id,
  path,
  page,
}: {
  from: string;
  params?: string;
  category_id?: string;
  path: string;
  page: number;
}) {
  let posts: IPost[] = [];
  let totalCount: number = 0;
  let loading = true;

  // 조건에 따라 fetch 호출
  if (from === "main") {
    const postResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post?type=${path}&page=${page}`,
      {
        cache: "no-cache",
      }
    );
    if (!postResponse.ok) {
      return <div>error</div>;
    }
    const data = await postResponse.json();
    posts = data.posts;
    totalCount = data.totalCount[0].totalCount;
    loading = false;
  } else if (from === "search") {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/search?q=${params}&type=${path}&page=${page}`,
      {
        cache: "no-cache",
      }
    );
    if (!response.ok) {
      return <>error..</>;
    }
    const data = await response.json();
    posts = data.posts;
    totalCount = data.totalCount[0].totalCount;
    loading = false;
  } else if (from === "category") {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/category/${category_id}?type=${path}&page=${page}`,
      {
        cache: "no-cache",
      }
    );
    if (!response.ok) {
      return <>error..</>;
    }
    const data = await response.json();
    posts = data.posts;
    totalCount = data.totalCount[0].totalCount;
    loading = false;
  }

  return (
    <div>
      {!loading ? (
        <div>
          {posts.map((e: IPost, i: number) => (
            <div key={e.post_id}>
              <Link href={`/${path}/${e.post_id}`}>
                <PostCard {...e} />
                {i !== posts.length - 1 && <Separator className="mb-5" />}
              </Link>
            </div>
          ))}
          <Pagination totalCount={totalCount} />
        </div>
      ) : (
        <div>No posts found</div>
      )}
    </div>
  );
}
