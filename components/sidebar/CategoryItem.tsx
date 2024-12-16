"use client";

import React, { useState } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Category } from "@/type";
import { Ellipsis } from "lucide-react";
import { Loader } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteCategoryAction } from "@/app/action/categoryAction";
import Link from "next/link";
const CategoryItem = ({ category }: { category: Category }) => {
  const [isPending, setIsPending] = useState(false);
  const onClickDelete = async () => {
    setIsPending(true);
    await deleteCategoryAction(category);
    setIsPending(false);
  };
  return (
    <div>
      <SidebarMenuItem className="cursor-pointer">
        <SidebarMenuButton asChild>
          <div className="flex justify-between">
            <Link
              href={`/blog/category/${category.category_id}`}
              className="w-full"
            >
              {category.category_name}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger>
                {isPending ? (
                  <Loader className="size-5" />
                ) : (
                  <Ellipsis className="size-5 hover:bg-slate-300 rounded-sm" />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    onClickDelete();
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </div>
  );
};

export default CategoryItem;
