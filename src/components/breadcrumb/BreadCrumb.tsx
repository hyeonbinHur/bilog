import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Link } from "@/src/i18n/routing";

interface Props {
  type: string;
  from: string;
  info: string;
}

const BreadCrumb = async ({ type, from, info }: Props) => {
  let fitstaPath = type.toLocaleLowerCase();
  let secondPath;
  let secondLabel;
  if (from === "search") {
    secondPath = `search?q=${info}`;
    secondLabel = info;
  } else if (from === "category") {
    secondPath = `category/${info}`;
    const categoryResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category/${info}`
    );
    if (!categoryResponse.ok) {
      throw new Error("Category is not exists");
    }
    const data = await categoryResponse.json();
    secondLabel = data[0].category_name;
  }
  return (
    <div className="w-80">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Max</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="border-b pb-0.5 hover:border-black">
            <Link href={`/${fitstaPath}`} className="hover:text-black">
              {type.toLowerCase()}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="border-b pb-0.5">
            {secondLabel}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrumb;
