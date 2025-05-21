// src/components/skeleton/BlogPageSkeleton.tsx
import React from "react";
import { Skeleton } from "./ui/skeleton";

const BlogPageSkeleton = () => {
  return (
    <div className="relative w-full flex z-0">
      {/* Category Sidebar Skeleton */}
      <div className="hidden md:block w-64 min-w-64 h-screen border-r border-border">
        <div className="p-4 space-y-4">
          {/* Category Title */}
          <Skeleton className="h-8 w-32" />

          {/* Category List */}
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 p-4 md:p-6">
        <div className="space-y-6">
          {/* Post List Skeleton */}
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="pb-10 px-3 md:px-5 py-4 shadow-md hover:shadow-lg w-full"
            >
              <div className="w-full h-32 md:h-40 flex flex-col md:flex-row">
                {/* Post Content */}
                <div className="flex-[2] flex flex-col justify-between gap-2">
                  {/* Title */}
                  <Skeleton className="h-6 md:h-8 w-3/4" />

                  {/* Subtitle */}
                  <Skeleton className="h-4 md:h-6 w-1/2" />

                  {/* Meta Info */}
                  <div className="flex justify-between text-sm">
                    <div className="flex gap-3 md:gap-5">
                      <Skeleton className="h-3 md:h-4 w-16 md:w-20" />{" "}
                      {/* Date */}
                      <Skeleton className="h-3 md:h-4 w-12 md:w-16" />{" "}
                      {/* Comments */}
                      <Skeleton className="h-3 md:h-4 w-20 md:w-24" />{" "}
                      {/* Category */}
                    </div>
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="p-1 flex-1 mt-2 md:mt-0">
                  <Skeleton className="w-full h-[8rem] md:h-[10rem]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPageSkeleton;
