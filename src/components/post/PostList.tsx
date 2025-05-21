import { IPost } from "@/type";
import React from "react";
import { Link } from "@/src/i18n/routing";
import PostCard from "./PostCard";
import { Separator } from "../ui/separator";
import PaginationComp from "../pagination/PaginationComp";
import { getLocale } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/authOption";

/**
 * Todo
 *
 * update getServerSesssion, temporarly use it instead of jwt
 */

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
  let mainSql = "";
  const session = await getServerSession(authOptions);
  const headers: Record<string, string> = {};
  if (session?.user?.id) {
    headers["User-Id"] = session.user.id;
  }
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
    next: { tags: [`post-all`] },
    headers: headers,
  });

  if (!mainResponse.ok) {
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
      {!loading &&
        (posts.length > 0 ? (
          <div>
            {posts.map((e: IPost, i: number) => (
              <div key={e.post_id}>
                <Link href={`/${path}/${e.post_id}`}>
                  <PostCard {...e} />
                </Link>
                {i !== posts.length - 1 && <Separator className="mb-5" />}
              </div>
            ))}
            <PaginationComp totalCount={totalCount} />
          </div>
        ) : (
          // 포스트가 없을 경우
          <div className="flex flex-col items-center justify-center border rounded-md shadow-md p-6 h-48 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Posts Found
            </h2>
            <p className="text-gray-600 mb-4">
              It looks like there are no posts available at the moment.
            </p>
          </div>
        ))}
    </div>
  );
}
