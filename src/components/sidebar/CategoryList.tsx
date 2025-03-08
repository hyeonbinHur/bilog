//서버컴포넌트
import React from "react";
import { SidebarMenu } from "../ui/sidebar";
import { Category } from "@/type";
import CategoryItem from "./CategoryItem";

const CategoryList = async ({ from }: { from: string }) => {
  //Server component fetch data
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/category?type=${from}`,
    {
      next: { tags: [`category-${from}`] },
    }
  );
  const result = await response.json();
  return (
    <SidebarMenu>
      {result.map((e: Category) => (
        <CategoryItem category={e} key={e.Category_id} />
      ))}
    </SidebarMenu>
  );
};

export default CategoryList;
