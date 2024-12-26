import { useTranslations } from "next-intl";
import ErrorButton from "./ErrorButton";
import { Separator } from "@/src/components/ui/separator";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main>
      <div>인삿말</div>
      <Separator />
      <div>블로그</div>
      <Separator />
      <div>아티클</div>
    </main>
  );
}
