import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BreadCrumbSkeleton = () => {
  return (
    <div className="w-80">
      <Skeleton width="100%" height="100%" />
    </div>
  );
};

export default BreadCrumbSkeleton;
