"use client";

import React, { useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import CategoryForm from "./CategoryForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ForMax = ({ from }: { from: string }) => {
  const type = from === "BLOG" ? "blog" : "article";
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const { data: session } = useSession();

  const router = useRouter();
  const onChangeCreateStatus = (state: boolean) => {
    setIsCreate(state);
  };
  const secret = process.env.NEXTAUTH_SECRET;

  return String(session?.user.id) === String(process.env.NEXT_PUBLIC_MAX_ID) ? (
    <SidebarGroup>
      <SidebarGroupLabel>For Max</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Button
            onClick={() => router.push(`/${type}/create`)}
            className="h-7 w-40 bg-white border-2 border-primary text-primary text-xs hover:text-white active:translate-y-0.5"
          >
            Create new {type}
          </Button>
          <Button
            onClick={() => onChangeCreateStatus(true)}
            className="h-7 w-40 bg-white border-2 border-primary text-primary text-xs hover:text-white active:translate-y-0.5"
          >
            Create new Category
          </Button>
        </SidebarMenu>
      </SidebarGroupContent>
      {isCreate && (
        <CategoryForm onChangeCreateStatus={onChangeCreateStatus} from={from} />
      )}
    </SidebarGroup>
  ) : (
    <></>
  );
};

export default ForMax;
