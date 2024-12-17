"use client";
import React, { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Input } from "./ui/input";
const SearchBar = () => {
  const path = usePathname();
  const type = path.includes("blog") ? "blog" : "article";
  const [search, setSearch] = useState("");
  const router = useRouter();

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
    }
  };

  return (
    <div className="my-5">
      <Input
        type="text"
        placeholder="Find article"
        onKeyDown={onKeyDown}
        value={search}
        onChange={onChangeSearch}
      />
    </div>
  );
};

export default SearchBar;
