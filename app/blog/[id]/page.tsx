import React from "react";
import dynamic from "next/dynamic";
import { Comment } from "@/type";
import { IPost } from "@/type";

// 동적 import로 SyntaxHighlighter를 클라이언트 사이드에서만 로드
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Light),
  { ssr: false }
);

import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./blog.module.css"; // CSS 모듈 import
import CommentArea from "@/components/comment/CommentArea";
import CommentList from "@/components/comment/CommentList";

interface Props {
  params: { id: string };
}

const page = async ({ params }: Props) => {
  const commentListResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/comment?post_id=${params.id}`,
    { cache: "no-store" }
  );

  if (!commentListResponse.ok) {
    return <div>{params.id}Error</div>;
  }
  const comments: Comment[] = await commentListResponse.json();

  const postResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params.id}`,
    { cache: "no-store" }
  );
  if (!postResponse.ok) {
    return <div>error</div>;
  }
  const post = await postResponse.json();

  return (
    <div className="mb-96">
      {postResponse.ok && (
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
