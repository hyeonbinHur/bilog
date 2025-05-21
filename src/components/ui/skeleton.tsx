// src/components/ui/skeleton.tsx
import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** default: false — true로 설정해야 pulse 애니메이션이 들어갑니다 */
  animated?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, animated = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-md bg-muted", // 기본 플레이스홀더 스타일
        animated && "animate-pulse", // animated=true일 때만 pulse
        className
      )}
      {...props}
    />
  )
);

Skeleton.displayName = "Skeleton";
