import { useTranslations } from "next-intl";
import { Separator } from "@/src/components/ui/separator";
import { Suspense } from "react";
import PostSkeleton from "@/src/components/post/PostSkeleton";
// import HomePostList from "@/src/components/post/HomePostList";
import dynamic from "next/dynamic";
import Scene from "@/src/components/3D/Scene";

const HomePostList = dynamic(
  () => import("@/src/components/post/HomePostList")
);

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="flex flex-col gap-5">
      <div>
        <h2 className="text-center my-20 text-2xl">{t("intro")}</h2>
        <p className="text-center text-lg leading-relaxed">{t("intro2")}</p>
      </div>

      <Separator className="my-5" />
      <div className="h-96">
        <Scene />
      </div>
      {/* <Suspense
        fallback={new Array(7).fill(0).map((e, i) => (
          <PostSkeleton key={`blog-post-skeleton-${i}`} />
        ))}
      >
        <HomePostList />
      </Suspense> */}
    </main>
  );
}
