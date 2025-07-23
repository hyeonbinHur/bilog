"use client";

import { Category } from "@/type";
import { SidebarMenu } from "../ui/sidebar";
import CategoryItem from "./CategoryItem";

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <SidebarMenu>
      {categories.map((e: Category) => (
        <CategoryItem category={e} key={e.category_id} />
      ))}
    </SidebarMenu>
  );
}
// export default CategoryList;
