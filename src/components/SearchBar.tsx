"use client";
import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "@/src/i18n/routing";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl";

const SearchBar = () => {
  //Variable Declaration
  const path = usePathname();
  const type = path.includes("blog") ? "blog" : "article";
  const router = useRouter();
  const t = useTranslations("SearchBar");

  const inputRef = useRef<HTMLInputElement | null>(null);

  //Client Component Event Handler
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (!inputRef.current) return;
    if (inputRef.current.value !== "") {
      router.push(`/${type}/search?q=${inputRef.current.value}`);
    } else {
      router.push(`/${type}`);
    }
  };

  return (
    <div className="my-5">
      <Input
        type="text"
        placeholder={t("Search")}
        ref={inputRef}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default SearchBar;
