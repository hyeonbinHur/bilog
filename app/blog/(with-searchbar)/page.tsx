import PostCard from "@/components/post/PostCard";
import Link from "next/link";
import React from "react";
import { getAllPosts } from "@/lib/axios/post";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { IPost } from "@/type";
import PostList from "@/components/post/PostList";

const page = async () => {
  const postResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`);
  if (!postResponse.ok) {
    return <div>error</div>;
  }
  const posts = await postResponse.json();
  // const { data: posts, isLoading } = useQuery<IPost[]>({
  //   queryKey: ["getPosts"],
  //   queryFn: () => getAllPosts(),
  // });

  return (
    <div>
      <Button>
        <Link href="/blog/create"> Create new blog</Link>
      </Button>

      {posts && <PostList posts={posts} />}
    </div>
  );
};

export default page;
