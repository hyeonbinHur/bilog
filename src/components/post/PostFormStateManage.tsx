"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "..//ui/select";
import PostForm from "./PostForm";
const PostFormStateManage = () => {
  const [lang, setLang] = useState("Korean");
  const onChangeLang = (e: string) => {
    console.log(e);
    setLang(e);
  };

  return (
    <div>
      <Select onValueChange={(e) => onChangeLang(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="언어 버전 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>언어 버전 선택</SelectLabel>
            <SelectItem value="Korean">한국어</SelectItem>
            <SelectItem value="English">English</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <PostForm lang={lang} />
    </div>
  );
};

export default PostFormStateManage;
