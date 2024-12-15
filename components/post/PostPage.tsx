import React from "react";
import { IPost } from "@/type";
import PostStateManage from "./PostStateManage";

const PostPageComponent = async ({ params }: { params: string }) => {
  // const [isEdit, setIsEdit] = useState(false);
  const postResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params}`,
    { cache: "no-store" }
  );
  if (!postResponse.ok) {
    return <div>error</div>;
  }
  const posts = await postResponse.json();
  const post: IPost = posts[0];
  return (
    <div className="pt-10 ">
      {postResponse.ok && <PostStateManage post={post} />}
    </div>
  );
};

export default PostPageComponent;
