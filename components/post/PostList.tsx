import { IPost } from "@/type";
import React from "react";
import Link from "next/link";
import PostCard from "./PostCard";
import { Separator } from "../ui/separator";

const PostList = ({ posts }: { posts: IPost[] }) => {
  return (
    <div>
      {posts.map((e: IPost, i) => (
        <div key={e.post_id}>
          <Link href={`/blog/${e.post_id}`}>
            <PostCard {...e} />
            {i !== posts.length - 1 && <Separator className="mb-5" />}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
