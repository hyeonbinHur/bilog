import React from "react";
import MainNavLink from "./MainNavLink";
import { ILink } from "@/type";

const LINKS: ILink[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Article", href: "/article" },
  { label: "Chat", href: "/chat" },
  { label: "About", href: "/about" },
];

const MainNavBar = () => {
  return (
    <nav className="flex justify-between">
      {LINKS.map((e) => {
        return <MainNavLink link={e} key={e.label} />;
      })}
    </nav>
  );
};

export default MainNavBar;
