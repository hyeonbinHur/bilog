import { useTranslations } from "next-intl";
import ErrorButton from "./ErrorButton";
const genRandInt = (count: number) => {
  return Math.floor(Math.random() * count);
};

export default function Home() {
  const t = useTranslations("HomePage");
  const rand = genRandInt(2);
  if (rand === 1) {
    throw new Error("Error loading");
  }
  return (
    <main>
      <h1>{t("title")}</h1>
      <div className="border">Hello</div>
      <ErrorButton />
    </main>
  );
}
