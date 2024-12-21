import React from "react";
import { IPost } from "@/type";
import PostStateManage from "./PostStateManage";

const PostPageComponent = async ({ params }: { params: string }) => {
  // const [isEdit, setIsEdit] = useState(false);
  // const postResponse = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/post/${params}`,
  //   { cache: "no-store" }
  // );
  // const korPostResponse = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/post-kor/${params}`,
  //   { cache: "no-store" }
  // );
  // const engPostResponse = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/post-eng/${params}`,
  //   { cache: "no-store" }
  // );

  // if (!postResponse.ok) {
  //   return <div>error</div>;
  // }
  // const posts = await postResponse.json();
  // const post: IPost = posts[0];

  const [postResponse, korPostResponse, engPostResponse] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/${params}`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post-kor/${params}`, {
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post-eng/${params}`, {
      cache: "no-store",
    }),
  ]);

  if (!postResponse.ok || !korPostResponse.ok || !engPostResponse.ok) {
    return <div>error</div>;
  }

  const posts = await postResponse.json();
  const korPosts = await korPostResponse.json();
  const engPosts = await engPostResponse.json();

  const post: IPost = posts[0];
  const korPost = korPosts[0];
  const engPost = engPosts[0];

  return (
    <div className="pt-10 w-full">
      {postResponse.ok && (
        <PostStateManage post={post} korPost={korPost} engPost={engPost} />
      )}
    </div>
  );
};

export default PostPageComponent;
