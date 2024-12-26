import React from "react";
import MainNavLink from "./MainNavLink";
import { ILink } from "@/type";
import AuthDropDown from "../AuthDropDown";
import LocaleSwitcher from "./LocaleSwitcher";

const LINKS: ILink[] = [
  { label: "Blog", href: "/blog" },
  { label: "Article", href: "/article" },
  { label: "About", href: "/about" },
];

const MainNavBar = () => {
  return (
    <nav className="flex h-10">
      <div className="italic text-2xl w-36">
        <MainNavLink link={{ label: "< Bilog/>", href: "/" }} key={"Home"} />
      </div>

      <div className="mx-10 flex flex-col justify-center">
        <div className="border-stone-700 rounded-md border-r-2 h-7"></div>
      </div>

      <div className="flex text-lg justify-between w-full pr-2">
        <div className="flex gap-10">
          {LINKS.map((e) => {
            return <MainNavLink link={e} key={e.label} />;
          })}
        </div>
        <div className="flex h-10 justify-center items-center gap-3">
          <LocaleSwitcher />
          <AuthDropDown />
        </div>
      </div>
    </nav>
  );
};

export default MainNavBar;
