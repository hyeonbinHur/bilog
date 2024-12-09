import PostCard from "@/components/PostCard";
import Link from "next/link";
import React from "react";
import { getAllPosts } from "@/lib/axios/post";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { IPost } from "@/type";

const page = () => {
  const { data: posts, isLoading } = useQuery<IPost[]>({
    queryKey: ["getPosts"],
    queryFn: () => getAllPosts(),
  });

  return (
    <div>
      <Button>
        <Link href="blog/create"> Create new blog</Link>
      </Button>

      {posts &&
        posts.map((e: IPost) => {
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
