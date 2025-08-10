"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import PostForm from "./PostForm";
const PostFormStateManage = () => {
  //Variable Declaration
  const [lang, setLang] = useState("Korean");
  const { data: session } = useSession();
  const router = useRouter();

  const onChangeLang = (e: string) => {
    setLang(e);
  };

  if (String(session?.user.id) !== process.env.NEXT_PUBLIC_MAX_ID) {
    router.back();
  }

  return (
    <div className="pt-2">
      <Select onValueChange={(e) => onChangeLang(e)}>
        <SelectTrigger className="w-[180px] mb-4">
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
