"use client";
import React, { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "@/src/i18n/routing";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl";
import { useError } from "../context/ErrorContext";

const SearchBar = () => {
  const path = usePathname();
  const type = path.includes("blog") ? "blog" : "article";
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { setError } = useError();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [search]
  );

  const onSubmit = () => {
    if (search !== "") {
      router.push(`/${type}/search?q=${search}`);
    } else {
      router.push(`/${type}`);
      setError(new Error("At least one letter is required to find post"));
    }
  };

  const t = useTranslations("SearchBar");
  return (
    <div className="my-5">
      <Input
        type="text"
        placeholder={t("Search")}
        onKeyDown={onKeyDown}
        value={search}
        onChange={onChangeSearch}
      />
    </div>
  );
};

export default SearchBar;
