// "use client";
// import React, { useEffect, useState } from "react";
// import { HeartCrack } from "lucide-react";
// import { useSession } from "next-auth/react";
// import { useParams } from "next/navigation";

// const PostDisLike = ({ post_id }: { post_id: String }) => {
//   const { data: session } = useSession();
//   const [isLike, setIsLike] = useState(false);

//   useEffect(() => {
//     console.log("session changed", session);
//     if (session) {
//       const readPostLike = async () => {
//         try {
//           const response = await fetch(
//             `${process.env.NEXT_PUBLIC_BASE_URL}/post-like?post_id=${post_id}&user_id=${session.user.id}`
//           );
//           if (!response.ok) {
//             throw new Error("Unknown erro occured");
//           }
//           const data = await response.json();
//         } catch (err) {
//           console.error(err);
//         }
//       };
//       readPostLike();
//     }
//   }, [session, post_id]);
//   //현재 유저가 있는지 // useSession()
//   //현재 유저가 있다면, 현재 유저가 해당 아이템의 Like 혹은 dislike가 존재 하는지 // post like table 조회
//   //⬇️ dislike를 누른 이후의 상황
//   //like 혹은 dislike가 존재
//   //like가 존재한다면 like를 dislike로 변환
//   //dislike가 존재한다면 테이블에서 삭제
//   //like 혹은 dislike가 존재하지 않음
//   //dislike를 눌렀다면, like테이블에 dislike로 생성
//   return <HeartCrack className="size-6 " />;
// };

// export default PostDisLike;
