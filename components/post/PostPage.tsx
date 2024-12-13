import React from "react";
import { IPost } from "@/type";
import PostStateManage from "./PostStateManage";

const PostPageComponent = async ({ params }: { params: string }) => {
  // const [isEdit, setIsEdit] = useState(false);
  const postResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${params}`,
    { next: { tags: [`post-${params}`] } }
  );
  if (!postResponse.ok) {
    return <div>error</div>;
  }

  const posts = await postResponse.json();
  const post: IPost = posts[0];

  // const onClickEditChange = (editStatus: boolean) => {
  //   // change edit status, if edit is true start to edit the post otherwise.
  //   setIsEdit(editStatus);
  // };

  return (
    <div className="pt-10 ">
      {postResponse.ok && <PostStateManage post={post} />}
    </div>
  );
};

export default PostPageComponent;
