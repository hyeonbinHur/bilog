import React from "react";
import Link from "next/link";
import { IPost } from "@/type";
import PostCard from "@/components/post/PostCard";
import PostList from "@/components/post/PostList";
const page = async ({ searchParams }: { searchParams: { q?: string } }) => {
  const response = await fetch(
    `http://localhost:3000/api/blog/search?q=${searchParams.q}`
  );
  if (!response.ok) {
    return <>error..</>;
  }
  const blogs: IPost[] = await response.json();

  return <div>{blogs && <PostList posts={blogs} />}</div>;
};

export default page;
