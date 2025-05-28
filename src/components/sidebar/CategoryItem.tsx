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
import { useSession } from "next-auth/react";
import { useError } from "@/src/context/ErrorContext";
import { useRouter } from "next/navigation";
import Link from "next/link";


const CategoryItem = ({ category }: { category: Category }) => {
  //Variable Declaration
  const [isPending, setIsPending] = useState(false);
  const { data: session } = useSession();
  const { setError } = useError();
  const router = useRouter();

  //Client Component Event Handler && Trigger Server action
  const onClickDelete = async () => {
    setIsPending(true);
    try {
      if (String(session?.user.id) === process.env.NEXT_PUBLIC_MAX_ID) {
        const response: ServerActionResponse = await deleteCategoryAction(
          category
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(new Error(err.message));
      } else {
        setError(new Error("An unknown error occurred"));
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <SidebarMenuItem className="cursor-pointer">
        <SidebarMenuButton asChild>
          <div className="flex justify-between">
            <Link
              href={`/blog/category/${category.Category_id}`}
              className="w-[92%] "
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
