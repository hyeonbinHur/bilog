import PostCard from "@/components/PostCard";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <Link href="blog/create"> Create new blog</Link>
      <PostCard />
    </div>
  );
};

export default page;
