import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import PostList from "@/components/post/PostList";
import PostSkeleton from "@/components/post/PostSkeleton";
import { Suspense } from "react";

const Page = () => {
  // const { data: posts, isLoading } = useQuery<IPost[]>({
  //   queryKey: ["getPosts"],
  //   queryFn: () => getAllPosts(),
  // });

  return (
    <div>
      <Button>
        <Link href="/blog/create"> Create new blog</Link>
      </Button>

      <Suspense
        fallback={new Array(7).fill(0).map((e) => (
          <PostSkeleton />
        ))}
      >
        <PostList from={"main"} params={""} />
      </Suspense>
    </div>
  );
};

export default Page;
