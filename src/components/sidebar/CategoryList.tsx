//서버컴포넌트
import type { Category } from "@/type";
import { SidebarMenu } from "../ui/sidebar";
import CategoryItem from "./CategoryItem";

const CategoryList = async ({ from }: { from: string }) => {
  //Server component fetch data
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/category?type=${from}`;
  const response = await fetch(url, {
    next: { tags: [`category-${from}`] },
    headers: {
      "X-Request-Name": "getCategories",
      "X-Request-Type": from,
    },
    cache: "no-store",
  });
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
