import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeleton = () => {
  return (
    <div className="mb-10 pb-10 px-5 py-4 shadow-sm hover:shadow-lg">
      <div className="w-full h-52 flex">
        <div className=" flex-[2] flex flex-col justify-between gap-2">
          <h1 className="text-3xl h-16 font-bold">
            <Skeleton height="100%" />
          </h1>

          <h2 className="text-lg text-stone-400">
            <Skeleton height="100%" />
          </h2>

          <div className="w-60 h-8">
            <Skeleton height="100%" />
          </div>
        </div>

        <div className=" px-3 flex-1">
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
