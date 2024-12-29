"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";
import MAX from "@/public/IMG_3350.jpg";
import style from "./page.module.css";
import { useTranslations } from "next-intl";
export const dynamic = "force-static";
const Page = () => {
  const { setTheme } = useTheme();
  const t = useTranslations("About");

  useEffect(() => {
    setTheme("dark");
    return () => {
      setTheme("light");
    };
  }, []);

  return (
    <div className="mx-auto h-auto my-16 max-w-[70rem] px-5 text-xl flex flex-col gap-2">
      <header className="w-auto mx-auto mb-5">
        <h1 className="font-semibold italic text-4xl inline-block">
          {"<Bilog />"}
        </h1>
      </header>
      <section>
        <div
          className={`${style.background_image}`}
          style={{ backgroundImage: `url(${MAX.src})` }}
        >
          <h2 className="text-center">{t("intro")}</h2>
          <div className="flex justify-between">
            <Link
              href="https://github.com/hyeonbinHur"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b-2 p-2 text-base italic hover:border-b-green-700 cursor-pointer duration-75"
            >
              {t("github_profile")}
            </Link>
            <Link
              href="https://github.com/hyeonbinHur"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b-2 p-2 text-base italic hover:border-b-green-700 cursor-pointer duration-75"
            >
              {t("github_repository")}
            </Link>
          </div>
        </div>
      </section>
      <Separator className="my-3" />
      <section className="flex flex-col gap-5">
        <p className="text-left float-left">{t("intro1")}</p>
        <p>{t("intro2")}</p>

        <ol className="flex flex-col gap-3">
          <li>
            1. {t("necessity")}
            <p className="border rounded-md bg-slate-700 text-gray-100 text-lg h-auto p-5 my-3 ">
              {t("necessity_body")}
            </p>
          </li>
          <li>
            2. {t("ownership")}
            <p className="border rounded-md bg-slate-700 text-gray-100 text-lg h-auto p-5 my-3">
              {t("ownership_body")}
            </p>
          </li>
          <li className="h-auto">
            3. {t("experience")}
            <p className="border h-auto rounded-md bg-slate-700 text-gray-100 text-lg p-5 my-3">
              {t("experience_body")}
            </p>
          </li>
        </ol>
      </section>
      <Separator className="my-3" />
      <section className="flex flex-col gap-5">
        <h3>{t("environment")}</h3>
        <ul className="grid grid-cols-2 gap-4 text-center">
          <li className="p-2 rounded-md shadow-md">Next.js 14 app router</li>
          <li className="p-2 rounded-md shadow-md">React 18</li>
          <li className="p-2 rounded-md shadow-md">TypeScript</li>
          <li className="p-2 rounded-md shadow-md">AWS-RDS</li>
          <li className="p-2 rounded-md shadow-md">AWS-S3</li>
          <li className="p-2 rounded-md shadow-md">MySql</li>
          <li className="p-2 rounded-md shadow-md">Tailwind CSS</li>
        </ul>
      </section>
      <Separator className="my-3" />

      <p>{t("environment")}</p>
    </div>
  );
};

export default Page;
