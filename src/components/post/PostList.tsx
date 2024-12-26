import { IPost } from "@/type";
import React from "react";
import { Link } from "@/src/i18n/routing";
import PostCard from "./PostCard";
import { Separator } from "../ui/separator";
import PaginationComp from "../pagination/PaginationComp";
// 'from'과 'params'는 서버 컴포넌트에서 props로 전달받을 수 있습니다.
import { getLocale } from "next-intl/server";

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
  //Variable Declaration
  let posts: IPost[] = [];
  let totalCount: number = 0;
  let loading = true;
  let cache: RequestCache = "no-cache";
  let mainSql = "";
  const locale = await getLocale();

  //Server component fetch data
  if (from === "main") {
    mainSql = `${process.env.NEXT_PUBLIC_BASE_URL}/post?type=${path}&page=${page}&locale=${locale}`;
  } else if (from === "search") {
    mainSql = `${process.env.NEXT_PUBLIC_BASE_URL}/post/search?q=${params}&type=${path}&page=${page}&locale=${locale}`;
  } else if (from === "category") {
    mainSql = `${process.env.NEXT_PUBLIC_BASE_URL}/post/category/${category_id}?type=${path}&page=${page}&locale=${locale}`;
  }
  const mainResponse = await fetch(mainSql, {
    cache: cache,
  });

  if (!mainResponse.ok) {
    console.log(mainResponse);
    throw new Error("Failed to read posts");
  }
  const data = await mainResponse.json();
  posts = data.posts;
  totalCount = data.totalCount;
  loading = false;

  // Guard: Validate fetched data
  if (totalCount !== 0 && page > Math.ceil(totalCount / 7)) {
    throw new Error("Invalid page");
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
          <PaginationComp totalCount={totalCount} />
        </div>
      ) : (
        <div>No posts found</div>
      )}
    </div>
  );
}
