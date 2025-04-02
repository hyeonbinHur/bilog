// "use client";
// import React, { useCallback, useEffect, useState } from "react";
// import PostStateManage from "./PostStateManage";
// import PostPageSkeleton from "./PostPageSkeleton";
// import { useError } from "@/src/context/ErrorContext";
// import { useRouter } from "next/navigation";
// import { delay } from "@/src/lib/utils"
// import { useSession } from "next-auth/react";

// const PostPageComponent = ({ id, locale }: { id: string; locale: string }) => {
//   //Variable Declaration
//   const [curLocale, setCurLocale] = useState(locale);
//   const [post, setPost] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { setError } = useError();
//   const router = useRouter();
//   const { data: session } = useSession();
//   const headers: Record<string, string> = {};
//   //client 컴포넌트에서는 session 정보를 받아오는걸 기다리지 않아.
//   if (session?.user?.id) {
//     headers["User-Id"] = session.user.id;
//   }
//   //문제는 여기서 초기화 될때 session도 초기화 되고
//   //유저 재 로그인 해서 세션 다시 채우는걸 기다리지 않고
//   //헤더가 무조건 null이라는 거임
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         setIsLoading(true);
//         const postResponse = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/post/${id}?locale=${curLocale}`,
//           {
//             headers: headers,
//             next: { tags: [`post-${id}`] },
//           }
//         );
//         if (!postResponse.ok) {
//           if (postResponse.status === 401) {
//             setError(
//               new Error(
//                 `해당 포스트는 ${
//                   locale === "ko" ? "Korean" : "English"
//                 } 버전을 지원하지 않습니다`
//               )
//             );
//             router.back();
//           } else {
//             const errorMesage = await postResponse.text();
//             throw new Error(errorMesage);
//           }
//         }
//         const data = await postResponse.json();
//         setPost(data);
//       } catch (err) {
//         setError(new Error("error"));
//         router.back();
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchPost();
//   }, [curLocale]);

//   const onChangeLocale = useCallback((e: string) => {
//     setCurLocale(e);
//   }, []);

//   if (isLoading) {
//     return <PostPageSkeleton />; // Suspense 대체용 스켈레톤
//   }

//   return (
//     <div className="pt-10 w-full">
//       {post && (
//         <PostStateManage
//           korPost={post.korPost}
//           engPost={post.engPost}
//           onChangeLocale={onChangeLocale}
//           locale={curLocale}
//         />
//       )}
//     </div>
//   );
// };

// export default PostPageComponent;
