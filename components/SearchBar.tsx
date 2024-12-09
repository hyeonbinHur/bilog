"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "./ui/input";
const SearchBar = () => {
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
      console.log("navigating");
      router.push(`/blog/search?q=${search}`);
    }
  };

  return (
    <div>
      <div>
        <Input
          type="text"
          placeholder="Find article"
          onKeyDown={onKeyDown}
          className="mt-10"
          value={search}
          onChange={onChangeSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
