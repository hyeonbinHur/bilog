import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Link } from "@/src/i18n/routing";

const PostCategory = ({
  type,
  category_name,
  title,
  category_id,
}: {
  type: string;
  category_name: string;
  category_id: string;
  title: string;
}) => {
  return (
    <div className="mb-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>bilog</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="border-b pb-0.5 hover:border-black">
            <Link href={`/${type.toLowerCase()}`} className="hover:text-black">
              {type.toLowerCase()}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="border-b pb-0.5 hover:border-black">
            <Link
              href={`/${type.toLowerCase()}/category/${category_id}`}
              className="hover:text-black"
            >
              {category_name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PostCategory;
