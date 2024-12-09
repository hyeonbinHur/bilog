import React from "react";
import Link from "next/link";
import { IPost } from "@/type";
import PostCard from "@/components/PostCard";
const page = async ({ searchParams }: { searchParams: { q?: string } }) => {
  const response = await fetch(
    `http://localhost:3000/api/blog/search?q=${searchParams.q}`
  );
  if (!response.ok) {
    return <>error..</>;
  }
  const blogs: IPost[] = await response.json();

  return (
    <div>
      {blogs &&
        blogs.map((e: IPost) => {
          return (
            <Link key={e.post_id} href={`blog/${e.post_id}`}>
              <PostCard {...e} />
            </Link>
          );
        })}
    </div>
  );
};

export default page;
