import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const PostCategory = () => {
  return (
    <div className="mb-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>Max</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>BLOG</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Next.js</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>33</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PostCategory;
