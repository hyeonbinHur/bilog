"use client";

import React, { useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";
import CategoryForm from "./CategoryForm";
const ForMax = ({ from }: { from: string }) => {
  // 여기서 생성중인지 아닌지를 확인하고, 카테고리를 생성?
  // isCreate, isPending,

  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const onChangeCreateStatus = (state: boolean) => {
    setIsCreate(state);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>For Max</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Button className="h-7 w-40 bg-white border-2 border-primary text-primary text-xs hover:text-white active:translate-y-0.5">
            <Link href="/blog/create">Create new blog</Link>
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
  );
};

export default ForMax;
