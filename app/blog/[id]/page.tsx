"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOnePost } from "@/lib/axios/post";
import dynamic from "next/dynamic";
import { Comment } from "@/type";

// 동적 import로 SyntaxHighlighter를 클라이언트 사이드에서만 로드
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Light),
  { ssr: false }
);

import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./blog.module.css"; // CSS 모듈 import
import CommentArea from "@/components/CommentArea";
import CommentCard from "@/components/CommentCard";
import CommentList from "@/components/CommentList";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const commentListResponse = await fetch(
    `http://localhost:3000/api/comment?post_id=${params.id}`
  );
  if (!commentListResponse.ok) {
    return <div>{params.id}Error</div>;
  }
  const comments: Comment[] = await commentListResponse.json();
  const { data: post } = useQuery({
    queryKey: [`get one Post ${params.id}`],
    queryFn: () => getOnePost(params.id),
  });
  return (
    <div className="mb-96">
      {post && (
        <div>
          <h2>{post.title}</h2>
          <section>
            <div>
              <span>Max</span>
              <span>Date</span>
              <span>Like</span>
            </div>
          </section>

          <section>
            <img src={post.thumbnail} alt="" />
            Hello world
          </section>

          <section>
            <div
              className={styles.content} // styles.content 클래스를 사용
              dangerouslySetInnerHTML={{
                __html: post.content,
              }}
            />
          </section>

          <section>
            <span>Max</span>
            <span>Like</span>
          </section>

          <section className="mb-10">
            <CommentArea />
          </section>

          <CommentList comments={comments} />
        </div>
      )}
    </div>
  );
};

export default page;
