// PostComments.tsx - 포스트의 댓글 정보를 표시하는 컴포넌트

import { IPost } from "@/type";
import { useTranslations } from "next-intl";

interface PostCommentsProps {
  post: IPost;
}

export default function PostComments({ post }: PostCommentsProps) {
  const t = useTranslations("Post");
  
  return (
    <section>
      <div className="flex justify-between w-32 text-sm text-stone-500">
        <span className="flex items-center gap-1">
          {t("Response")} &nbsp;
          {post.comments}
        </span>
      </div>
    </section>
  );
}