//서버컴포넌트
import { Category } from "@/type";
import { SidebarMenu } from "../ui/sidebar";
import CategoryItem from "./CategoryItem";


const CategoryList = async ({ categories }: { categories: Category[] }) => {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/category?type=${from}`,
  //   {
  //     next: { tags: [`category-${from}`] },
  //   }
  // );
  // if (!response.ok) {
  //   throw new Error("Error");
  // }
  // const result = await response.json();

  return (
    <SidebarMenu>
      {categories.map((e: Category) => (
        <CategoryItem category={e} key={e.Category_id} />
      ))}
    </SidebarMenu>
  );
};

export default CategoryList;
