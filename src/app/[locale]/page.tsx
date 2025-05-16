// app/[locale]/page.tsx
import { getTranslations } from "next-intl/server";
import { Separator } from "@/src/components/ui/separator";
import dynamic from "next/dynamic";

// 클라이언트에서만 렌더할 컴포넌트 (Scene)
const Scene = dynamic(() => import("@/src/components/3D/Scene"), {
  ssr: false,
  loading: () => <div className="text-sm text-center">3D 로딩 중...</div>,
});

export default async function Home() {
  const t = await getTranslations("HomePage"); // ✅ 서버에서 i18n 처리

  return (
    <main className="flex flex-col gap-5">
      <div>
        <h2 className="text-center my-20 text-2xl">{t("intro")}</h2>
        <p className="text-center text-lg leading-relaxed">{t("intro2")}</p>
      </div>
      <Separator className="my-5" />
      <div className="h-96 mt-10">
        <Scene />
      </div>
    </main>
  );
}
