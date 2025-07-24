"use client";

import MAX from "@/public/IMG_3350.jpg";
import { Separator } from "@/src/components/ui/separator";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect } from "react";
import style from "./page.module.css";

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
    <div className="mx-auto min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="font-semibold text-4xl text-gray-900 dark:text-white mb-2">
            {"<Bilog />"}
          </h1>
        </header>

        {/* Hero Section */}
        <section className="mb-12">
          <div
            className={`${style.background_image} relative rounded-lg overflow-hidden shadow-md`}
            style={{ backgroundImage: `url(${MAX.src})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="relative z-10 p-8">
              <h2 className="text-center text-white text-xl font-medium mb-6">
                {t("intro")}
              </h2>
              <div className="flex justify-center gap-4">
                <Link
                  href="https://github.com/hyeonbinHur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white bg-opacity-90 rounded text-gray-800 font-medium hover:bg-opacity-100 transition-all duration-200"
                >
                  {t("github_profile")}
                </Link>
                <Link
                  href="https://github.com/hyeonbinHur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white bg-opacity-90 rounded text-gray-800 font-medium hover:bg-opacity-100 transition-all duration-200"
                >
                  {t("github_repository")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Separator className="mb-8" />

        {/* Main Content */}
        <section className="mb-12">
          <div className="space-y-6 mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {t("intro1")}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {t("intro2")}
            </p>
          </div>

          <div className="space-y-6">
            {[
              { key: "necessity", number: "1" },
              { key: "ownership", number: "2" },
              { key: "experience", number: "3" },
            ].map(({ key, number }) => (
              <div key={key}>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                  <span className="text-blue-600 dark:text-blue-400">
                    {number}.
                  </span>
                  {t(key)}
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border-l-2 border-blue-500">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {t(`${key}_body`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-8" />

        {/* Tech Stack */}
        <section>
          <h3 className="text-2xl font-medium text-center mb-6 text-gray-900 dark:text-white">
            {t("environment")}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "Next.js 14 app router",
              "React 18",
              "TypeScript",
              "AWS-RDS",
              "AWS-S3",
              "MySql",
              "Tailwind CSS",
            ].map((tech) => (
              <div
                key={tech}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center border hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
              >
                <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer spacing */}
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default Page;
