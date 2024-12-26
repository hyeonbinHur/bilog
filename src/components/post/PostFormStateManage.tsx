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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const PostFormStateManage = () => {
  const [lang, setLang] = useState("Korean");
  const onChangeLang = (e: string) => {
    setLang(e);
  };
  const { data: session } = useSession();
  const router = useRouter();
  if (String(session?.user.id) !== process.env.NEXT_PUBLIC_MAX_ID) {
    router.back();
  }

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
