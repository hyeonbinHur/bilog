import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategorySkeleton = () => {
  return (
    <div className="px-4 py-2 space-y-2 w-60 flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={`category-skeleton-${i}`} className="h-6">
          <Skeleton height="100%" borderRadius={4} />
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
