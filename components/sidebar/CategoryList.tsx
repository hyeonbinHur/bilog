//서버컴포넌트
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

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
      {result.map((e: any) => (
        <SidebarMenuItem key={e.category_id} className="cursor-pointer">
          <SidebarMenuButton asChild>
            <span> {e.category_name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default CategoryList;
