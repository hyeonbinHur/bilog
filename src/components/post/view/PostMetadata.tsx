// PostMetadata.tsx - 포스트의 댓글 수, 작성시간, 언어 상태 등 메타데이터를 표시하는 컴포넌트

import timeAgo from "@/src/helper/dateHelper";
import { IPost } from "@/type";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const Circle = dynamic(
  () => import("lucide-react").then((mod) => ({ default: mod.Circle })),
  { ssr: false }
);

interface PostMetadataProps {
  post: IPost;
}

export default function PostMetadata({ post }: PostMetadataProps) {
  const { value, unit } = timeAgo(post.created_at);
  const t = useTranslations("Post");
  const lang =
    post.is_kor === "PUBLIC" && post.is_eng === "PUBLIC"
      ? "Both"
      : post.is_kor === "PUBLIC"
      ? "Korean Version"
      : "English Version";

  return (
    <section>
      <div className="flex justify-between w-full text-sm text-stone-500">
        <span className="flex items-center gap-1">
          {t("Response")} &nbsp;
          {post.comments}
        </span>
        <span className="flex items-center gap-2">
          {post.is_kor === "PUBLIC" && post.is_eng === "PUBLIC" ? (
            <Circle className={`size-4 stroke-none fill-green-500`} />
          ) : post.is_kor === "PUBLIC" && post.is_eng === "PRIVATE" ? (
            <Circle className={`size-4 stroke-none fill-blue-400`} />
          ) : post.is_kor === "PRIVATE" && post.is_eng === "PUBLIC" ? (
            <Circle className={`size-4 stroke-none fill-yellow-400`} />
          ) : (
            <Circle className={`size-4 stroke-none fill-red-500`} />
          )}
          {value}
          {t(`${unit}`)}
          <span className="text-xs">( {t(lang)} )</span>
        </span>
      </div>
    </section>
  );
}
