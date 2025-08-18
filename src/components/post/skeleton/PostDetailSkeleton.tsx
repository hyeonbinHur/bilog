import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Separator } from "../../ui/separator";

const PostDetailSkeleton = () => {
  return (
    <div className="pt-10 w-full">
      {/* Language Switcher */}
      <div className="mb-5">
        <Skeleton width={200} height={40} />
      </div>

      <div className="flex w-full flex-col gap-5">
        {/* PostHeader Skeleton */}
        <section>
          {/* Category */}
          <div className="mb-3">
            <Skeleton width={120} height={24} />
          </div>

          {/* Title */}
          <h2 className="mb-5">
            <Skeleton width="80%" height={36} />
          </h2>

          {/* Author Info */}
          <div className="flex justify-between w-full">
            <span className="flex items-center gap-3">
              <Skeleton circle width={56} height={56} />
              <Skeleton width={180} height={20} />
            </span>
          </div>
        </section>

        <Separator />

        {/* PostMetadata Skeleton */}
        <section>
          <div className="flex justify-between w-full text-sm">
            <span className="flex items-center gap-1">
              <Skeleton width={80} height={16} />
            </span>
            <span className="flex items-center gap-2">
              <Skeleton circle width={16} height={16} />
              <Skeleton width={100} height={16} />
              <Skeleton width={120} height={12} />
            </span>
          </div>
        </section>

        <Separator />

        {/* PostThumbnail Skeleton */}
        <section>
          <Skeleton width="100%" height={400} />
        </section>

        <Separator />

        {/* PostContent Skeleton */}
        <section>
          <div className="space-y-4">
            <Skeleton width="100%" height={20} />
            <Skeleton width="95%" height={20} />
            <Skeleton width="90%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="85%" height={20} />

            <Skeleton width="100%" height={20} />
            <Skeleton width="88%" height={20} />
            <Skeleton width="92%" height={20} />
            <Skeleton width="100%" height={20} />
            <Skeleton width="90%" height={20} />
          </div>
        </section>

        <Separator />

        {/* PostComments Skeleton */}
        <section>
          <div className="mt-8">
            <Skeleton width={150} height={24} className="mb-4" />
            <div className="space-y-4">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Skeleton circle width={40} height={40} />
                      <div>
                        <Skeleton width={120} height={16} />
                        <Skeleton width={80} height={12} />
                      </div>
                    </div>
                    <Skeleton width="100%" height={16} />
                    <Skeleton width="85%" height={16} />
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
