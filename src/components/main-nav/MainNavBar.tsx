"use client";
import React, { useEffect, useState } from "react";
import MainNavLink from "./MainNavLink";
import { ILink } from "@/type";
import AuthDropDown from "../AuthDropDown";
import LocaleSwitcher from "./LocaleSwitcher";
import { Menu, X } from "lucide-react";

const LINKS: ILink[] = [
  { label: "Blog", href: "/blog" },
  { label: "Article", href: "/article" },
  { label: "About", href: "/about" },
];

const MainNavBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    if (isOpen) {
      const menu = document.getElementById("menu");
      menu?.classList.add(`sm:top-[-100%]`);
    } else {
      const menu = document.getElementById("menu");
      menu?.classList.toggle(`sm:top-[-100%]`);
    }
  }, [isOpen]);
  return (
    <nav className=" flex h-10 justify-between z-20 ">
      <div className="italic text-2xl ">
        <MainNavLink link={{ label: "< Bilog/>", href: "/" }} key={"Home"} />
      </div>
      {isOpen ? (
        <Menu className="lg:hidden z-20 mt-2" onClick={onToggleMenu} />
      ) : (
        <X className="lg:hidden z-20 mt-2" onClick={onToggleMenu} />
      )}
      <ul
        id="menu"
        className="lg:relative duration-75 z-10 absolute right-0 lg:top-[0%] sm:top-[5%] text-lg w-[100vw] flex-1 gap-10 flex flex-col items-center justify-center bg-white pb-5 lg:flex lg:flex-row lg:pb-0 lg:justify-end"
      >
        {LINKS.map((e) => {
          return (
            <li key={e.label}>
              <MainNavLink link={e} />
            </li>
          );
        })}
        <li>
          <AuthDropDown />
        </li>
        <li>
          <LocaleSwitcher />
        </li>
      </ul>
    </nav>
  );
};

export default MainNavBar;
