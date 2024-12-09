"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOnePost } from "@/lib/axios/post";
import dynamic from "next/dynamic";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// 동적 import로 SyntaxHighlighter를 클라이언트 사이드에서만 로드

const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Light),
  { ssr: false }
);

import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styles from "./blog.module.css"; // CSS 모듈 import
import CommentArea from "@/components/CommentArea";
import CommentCard from "@/components/CommentCard";

interface Props {
  params: { id: string };
}

const page = ({ params }: Props) => {
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

          <ScrollArea className="h-98 w-full rounded-md border">
            <CommentCard />
            <Separator className="my-2" />
            <CommentCard />
            <Separator className="my-2" />
            <CommentCard />
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default page;
