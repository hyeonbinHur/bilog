"use client";

import { Link } from "@/src/i18n/routing";
import { ILink } from "@/type";
import { usePathname } from "next/navigation";

interface Props {
  link: ILink;
}
const MainNavLink = (props: Props) => {
  const pathName = usePathname();
  const isActive = pathName === props.link.href;
  return (
    <Link
      className={`${
        pathName === props.link.href
          ? "cursor-default text-primary/90 hover:text-primary/30"
          : "hover:text-primary/60"
      }`}
      aria-current={isActive ? "page" : undefined}
      aria-label={
        isActive
          ? `${props.link.label} (현재 페이지)`
          : `${props.link.label} 페이지로 이동`
      }
      href={props.link.href}
    >
      {props.link.label}
    </Link>
  );
};

export default MainNavLink;
