import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const flag = false;
const CommentSkeleton = () => {
  return (
    <div className="px-5  py-2 flex flex-col gap-5">
      <div className="flex  justify-between w-full text-md">
        <span className="flex items-center gap-3">
          <div className="w-16 h-16">
            <Skeleton circle width="100%" height="100%" />
          </div>
          <div className="w-40 h-8">
            <Skeleton width="100%" height="100%" />
          </div>
        </span>

        <span>
          <div className="w-20 h-8">
            <Skeleton width="100%" height="100%" />
          </div>
        </span>
      </div>

      <div className="w-full h-20">
        <Skeleton width="100%" height="100%" />
      </div>
      <div className=" w-full flex justify-between">
        <div className="w-56 h-10">
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
