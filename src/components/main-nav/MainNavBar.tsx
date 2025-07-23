"use client";
import { ILink } from "@/type";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const MainNavLink = dynamic(() => import("./MainNavLink"));
const AuthDropDown = dynamic(() => import("../AuthDropDown"));
const LocaleSwitcher = dynamic(() => import("./LocaleSwitcher"));

const LINKS: ILink[] = [
  { label: "Blog", href: "/blog" },
  // { label: "Article", href: "/article" },
  { label: "About", href: "/about" },
];
const MainNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const onToggleMenu = (val: boolean) => {
    setIsOpen(val);
  };

  useEffect(() => {
    if (!isOpen) {
      const menu = document.getElementById("menu");
      menu?.classList.remove(`sm:top-[10%]`);
      menu?.classList.add(`sm:top-[-100%]`);
      menu?.classList.remove(`top-[10%]`);
      menu?.classList.add(`top-[-100%]`);
    } else {
      const menu = document.getElementById("menu");
      menu?.classList.remove(`sm:top-[-100%]`);
      menu?.classList.add(`sm:top-[10%]`);
      menu?.classList.remove(`top-[-100%]`);
      menu?.classList.add(`top-[10%]`);
    }
  }, [isOpen]);

  return (
    <nav
      className="flex h-10 justify-between z-20 "
      role="navigation"
      aria-label="메인 네비게이션"
    >
      <div className="italic text-2xl ">
        <MainNavLink link={{ label: "< Bilog/>", href: "/" }} key={"Home"} />
      </div>
      {isOpen ? (
        <X
          className="lg:hidden z-20 mt-2"
          onClick={() => onToggleMenu(false)}
        />
      ) : (
        <Menu
          className="lg:hidden z-20 mt-2"
          onClick={() => onToggleMenu(true)}
        />
      )}
      <ul
        id="menu"
        className={`lg:relative duration-75 z-10 absolute right-0 lg:top-[0%] text-lg w-[100vw] flex-1 gap-10 flex flex-col items-center justify-center pb-5 lg:flex lg:flex-row lg:pb-0 lg:justify-end ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        {LINKS.map((e) => {
          return (
            <li key={e.label} onClick={() => onToggleMenu(false)}>
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
