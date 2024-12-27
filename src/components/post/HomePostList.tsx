import React from "react";
import { getLocale } from "next-intl/server";
import { IPost } from "@/type";
import Link from "next/link";
import PostCard from "./PostCard";
import { Separator } from "../ui/separator";

const HomePostList = async () => {
  const locale = await getLocale();
  const mainSql = `${process.env.NEXT_PUBLIC_BASE_URL}/post?&locale=${locale}&all=true`;
  const mainResponse = await fetch(mainSql, {
    next: { tags: [`post-all`] },
  });
  if (!mainResponse.ok) {
    throw new Error("Failed to read posts");
  }
  const posts = await mainResponse.json();
  return (
    <div>
      {posts.map((e: IPost, i: number) => (
        <div key={e.post_id}>
          <Link href={`/${e.type.toLocaleLowerCase()}/${e.post_id}`}>
            <PostCard {...e} />
            {i !== posts.length - 1 && <Separator className="mb-5" />}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePostList;
