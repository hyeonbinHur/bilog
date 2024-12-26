"use client";
import React, { useCallback, useEffect, useState } from "react";
import PostStateManage from "./PostStateManage";
import PostPageSkeleton from "./PostPageSkeleton";
import { useError } from "@/src/context/ErrorContext";
import { useRouter } from "next/navigation";
import { delay } from "@/src/lib/utils";

const PostPageComponent = ({ id, locale }: { id: string; locale: string }) => {
  const [curLocale, setCurLocale] = useState(locale);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setError } = useError();
  const router = useRouter();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const postResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/post/${id}?locale=${curLocale}`,
          {
            cache: "no-store",
          }
        );
        if (!postResponse.ok) {
          throw new Error("Failed to fetch post data");
        }
        const data = await postResponse.json();
        setPost(data);
      } catch (err) {
        setError(new Error("error"));
        await delay(3000);
        router.back();
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [curLocale]);

  const onChaneLocale = useCallback((e: string) => {
    setCurLocale(e);
  }, []);

  if (isLoading) {
    return <PostPageSkeleton />; // Suspense 대체용 스켈레톤
  }

  return (
    <div className="pt-10 w-full">
      {post && (
        <PostStateManage
          post={post}
          onChaneLocale={onChaneLocale}
          locale={curLocale}
        />
      )}
    </div>
  );
};

export default PostPageComponent;
