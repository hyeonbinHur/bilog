"use client";
import React, { useCallback, useEffect, useState } from "react";
import PostStateManage from "./PostStateManage";
import PostPageSkeleton from "./PostPageSkeleton";
import { useError } from "@/src/context/ErrorContext";
import { useRouter } from "next/navigation";
import { delay } from "@/src/lib/utils";
import { useSession } from "next-auth/react";

const PostPageComponent = ({ id, locale }: { id: string; locale: string }) => {
  //Variable Declaration
  const [curLocale, setCurLocale] = useState(locale);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setError } = useError();
  const router = useRouter();
  const { data: session } = useSession();

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
        if (
          data.isCreated === 1 ||
          String(session?.user.id) === process.env.NEXT_PUBLIC_MAX_ID
        ) {
          setPost(data);
        } else {
          setError(
            new Error(
              `해당 포스트는 ${
                locale === "ko" ? "Korean" : "English"
              } 버전을 지원하지 않습니다`
            )
          );
          router.back();
          await delay(3000);
        }
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
