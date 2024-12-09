"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOnePost } from "@/lib/axios/post";
interface Props {
  params: { id: string };
}
const page = ({ params }: Props) => {
  const { data: post } = useQuery({
    queryKey: [],
    queryFn: () => getOnePost(params.id),
  });
  return (
    <div>
      {params.id}
      {post && <div>{post.title}</div>}
      <button onClick={() => console.log(post)}>show</button>
    </div>
  );
};

export default page;
