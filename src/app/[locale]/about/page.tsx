"use client";

import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";
import MAX from "@/public/IMG_3350.jpg";
import style from "./page.module.css";
export const dynamic = "force-static";

const Page = () => {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("dark");
    return () => {
      setTheme("light");
    };
  }, []);
  return (
    <div className="mx-auto h-auto my-16 w-[70rem] text-xl flex flex-col gap-2">
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
          <h2 className="text-center">
            안녕하세요. <span className="italic">{"<Bilog />"}</span> 개발자
            허현빈입니다
          </h2>
          <div className="flex justify-between">
            <Link
              href="https://github.com/hyeonbinHur"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b-2 p-2 text-base italic hover:border-b-green-700 cursor-pointer duration-75"
            >
              개발자 깃헙 프로필
            </Link>
            <Link
              href="https://github.com/hyeonbinHur"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b-2 p-2 text-base italic hover:border-b-green-700 cursor-pointer duration-75"
            >
              bilog github repository
            </Link>
          </div>
        </div>
      </section>
      <Separator className="my-3" />
      <section className="flex flex-col gap-5">
        <p>
          많은 개발자들이 다양한 이유로 자신만의 블로그를 운영하거나 개발하고
          있습니다. 일부는 블로그를 개발하는 것이 흔하고 뻔한 작업이라고 생각할
          수 있습니다. 그럼에도 불구하고, 'Bilog'를 만든 가장 큰 이유는 기존의
          블로그 플랫폼에서 제가 원하는 기능을 찾을 수 없었기 때문입니다.
        </p>
        <p>
          한국어로 한국인들과 의견을 나누는 것은 전 세계적으로 한국어를 사용할
          수 있는 개발자가 극히 일부에 불과하며, 영어를 사용하는 한국 개발자들
          또한 그 수가 매우 적습니다. 한국인과 외국인 모두와 동시에 의견을
          공유하고 싶었기에, 두 언어를 모두 포용할 수 있는 글로벌 블로그
          플랫폼이 필요했고, 그 결과로 'Bilog'를 직접 개발하게 되었습니다.
        </p>

        <ol className="flex flex-col gap-3">
          <li>
            1. 필요성
            <p className="border rounded-md bg-slate-700 text-gray-100 text-lg h-20 my-3 flex items-center p-5">
              저는 원하는 기능을 직접 구현하고 싶었습니다. 한국어와 영어, 두
              언어 모두로 다양한 개발자들과 의견을 나누고 싶었고, 제가 겪은
              문제와 해결 경험을 '나만의 문제'로서 공유하며 더 깊은 소통을
              원했습니다.
            </p>
          </li>
          <li>
            2. 오너십
            <p className="border rounded-md bg-slate-700 text-gray-100 text-lg h-20 my-3 flex items-center p-5">
              다른 사람의, 회사의 프로젝트가 아닌 '나'의 프로젝트를 원했습니다.
              개발자들이 매일 공부하는 다양한 원동력 중 하나는 자신의
              프로젝트에서 온다고 생각합니다. '나'의 프로젝트를 만들고, 발전시켜
              나가며 매일 더 나은 원동력으로 몰입할 수 있게 되었습니다.
            </p>
          </li>
          <li>
            3. 경험
            <p className="border rounded-md bg-slate-700 text-gray-100 text-lg h-20 my-3 flex items-center p-5">
              CRUD API, i18n, search, pagination... 쉽고 흔한 문제라도 머리로
              해결하는 것이 아닌 코드로 해결해 보고 싶었습니다. 생각도 못 해 본,
              생각만 해 본, 해결해 본 문제는 그 문제를 나중에 만났을 때 나의
              태도를 변화시킨다고 생각합니다. 흔한 문제라도 직접 해결함으로써
              스스로를 발전시키고 싶었습니다.
            </p>
          </li>
        </ol>
      </section>
      <Separator className="my-3" />
      <section className="flex flex-col gap-5">
        <h3>개발 환경</h3>
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

      <p>Developed by : 허현빈</p>
    </div>
  );
};

export default Page;
