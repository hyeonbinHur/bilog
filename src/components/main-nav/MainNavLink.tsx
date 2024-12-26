"use client";

import React from "react";
import { ILink } from "@/type";
import { Link } from "@/src/i18n/routing";
import { usePathname } from "next/navigation";

interface Props {
  link: ILink;
}
const MainNavLink = (props: Props) => {
  const pathName = usePathname();
  return (
    <Link
      className={`${
        pathName === props.link.href
          ? "cursor-default text-primary/90 hover:text-primary/30"
          : "hover:text-primary/60"
      }`}
      href={props.link.href}
    >
      {props.link.label}
    </Link>
  );
};

export default MainNavLink;
