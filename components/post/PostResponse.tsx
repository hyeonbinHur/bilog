import React from "react";
const PostResponse = async ({
  comments,
}: //   comment,
{
  comments: number;
  //   comment: number;
}) => {
  return (
    <section>
      <div className="flex justify-between w-32 text-sm text-stone-500">
        <span className="flex items-center gap-1">
          Responses &nbsp;
          {comments}
        </span>
      </div>
    </section>
  );
};

export default PostResponse;
