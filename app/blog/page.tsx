"use client";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import React from "react";
import { getAllPosts } from "@/lib/axios/post";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IPost } from "@/type";

const page = () => {
  const [crated, setCreated] = useState<string>("");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["getPosts"],
    queryFn: () => getAllPosts(),
  });

  // const onClickGetAllPosts = async () => {
  //   const data = await getAllPosts();
  //   console.log(data);
  // };

  // const onClickGetPost = async () => {
  //   const data = await getOnePost("1");
  //   console.log(data);
  // };

  // const onClickUpdatePost = async () => {
  //   const data = await updatePost(
  //     {
  //       title: "update title",
  //       content: "update content",
  //     },
  //     "1"
  //   );
  //   console.log(data);
  // };

  // const onClickCreatePost = async () => {
  //   const data = await createPost({
  //     title: "new post",
  //     content: "new content",
  //   });
  //   setCreated(data.insertId);
  //   console.log(data);
  // };
  // const onClickDeletePost = async () => {
  //   const data = await deletePost(crated);
  //   console.log(data);
  // };

  return (
    <div>
      <Button>
        <Link href="blog/create"> Create new blog</Link>
      </Button>
      {/* <Button onClick={onClickGetAllPosts}>Get all post</Button>
      <Button onClick={onClickGetPost}> Get one Post</Button>
      <Button onClick={onClickUpdatePost}> update post</Button>
      <Button onClick={onClickCreatePost}> Create post </Button>
      <Button onClick={onClickDeletePost}> Delete Post</Button> */}
      {posts &&
        posts.map((e: IPost, idx: number) => {
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
