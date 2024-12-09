"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOnePost } from "@/lib/axios/post";
import dynamic from "next/dynamic";
// 동적 import로 SyntaxHighlighter를 클라이언트 사이드에서만 로드
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Light),
  { ssr: false }
);
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./blog.module.css"; // CSS 모듈 import

interface Props {
  params: { id: string };
}
const page = ({ params }: Props) => {
  const { data: post } = useQuery({
    queryKey: [`get one Post ${params.id}`],
    queryFn: () => getOnePost(params.id),
  });

  return (
    <div>
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

          <section>
            <label>Response</label>
            <textarea></textarea>
          </section>
        </div>
      )}
    </div>
  );
};

export default page;
