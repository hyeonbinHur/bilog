"use client";
import React, { useState } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Category, ServerActionResponse } from "@/type";
import { Ellipsis } from "lucide-react";
import { Loader } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deleteCategoryAction } from "@/src/app/action/categoryAction";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useError } from "@/src/context/ErrorContext";

const CategoryItem = ({ category }: { category: Category }) => {
  //Variable Declaration
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession();
  const { setError } = useError();

  //Client Component Event Handler && Trigger Server action
  const onClickDelete = async () => {
    setIsPending(true);
    if (String(session?.user.id) === process.env.NEXT_PUBLIC_MAX_ID) {
      const response: ServerActionResponse = await deleteCategoryAction(
        category
      );
      if (!response.state.status) {
        setError(new Error("Error test"));
      }
    }
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
            {String(session?.user.id) === process.env.NEXT_PUBLIC_MAX_ID && (
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
            )}
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </div>
  );
};

export default CategoryItem;
