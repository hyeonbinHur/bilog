//서버컴포넌트
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Category } from "@/type";
import CategoryItem from "./CategoryItem";

const CategoryList = async ({ from }: { from: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/category?type=${from}`,
    {
      next: { tags: [`category-${from}`] },
    }
  );
  if (!response.ok) {
    return <div>error</div>;
  }
  const result = await response.json();

  return (
    <SidebarMenu>
      {result.map((e: Category) => (
        <CategoryItem category={e} key={e.category_id} />
      ))}
    </SidebarMenu>
  );
};

export default CategoryList;
