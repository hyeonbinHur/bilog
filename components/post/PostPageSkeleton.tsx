import React from "react";
import PostCategory from "@/components/post/PostCategory";
import { Separator } from "../ui/separator";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostPageSkeleton = () => {
  return (
    <div className="w-full">
      <div className="mb-96 py-10 ">
        <div className="flex flex-col gap-5">
          <div className="mb-5">
            <Skeleton width="100%" />
          </div>
          <h2 className="text-3xl font-extrabold">
            <Skeleton />
          </h2>

          <section>
            <div className="flex  justify-between w-full text-md">
              <span className="flex items-center gap-3">
                <div className="w-16 h-16">
                  <Skeleton circle width="100%" height="100%" />
                </div>
                <div className="w-40 h-8">
                  <Skeleton width="100%" height="100%" />
                </div>
              </span>
            </div>
          </section>
          <Separator />

          <section>
            <div className=" w-72 h-10">
              <Skeleton width="100%" height="100%" />
            </div>
          </section>
          <Separator />

          <section className="h-80">
            <Skeleton width="100%" height="100%" />
          </section>

          <section>
            <Skeleton count={5} height={30} />
          </section>
          <Separator />
        </div>
      </div>
    </div>
  );
};

export default PostPageSkeleton;
