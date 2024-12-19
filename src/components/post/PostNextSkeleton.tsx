import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeletonItem = () => (
  <div className="border rounded-md shadow-lg w-full h-32 p-2 flex flex-col justify-around">
    <Skeleton width="40%" height="90%" />
    <div className="text-sm font-bold">
      <Skeleton width="100%" height="100%" />
    </div>
    <div className="text-xs">
      <Skeleton width="70%" height="100%" />
    </div>
  </div>
);

const PostNextSkeleton = () => (
  <div className="sticky top-[40%] mb-52 w-1/4 h-56">
    <div className="text-md font-bold mb-5">Read Next</div>
    <div className="flex flex-col gap-5">
      {/* 반복되는 항목을 PostSkeletonItem으로 대체 */}
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <PostSkeletonItem key={index} />
        ))}
    </div>
  </div>
);

export default PostNextSkeleton;
