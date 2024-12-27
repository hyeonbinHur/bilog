import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white h-20 p-3 items-center">
      <h3 className="italic text-sm">Developed by 허현빈 / max</h3>
      <ul className="flex justify-center gap-8 w-full text-sm font-medium ">
        <li className="hover:text-gray-400 cursor-pointer">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="hover:text-gray-400 cursor-pointer">
          <Link href={"/blog"}>Blog</Link>
        </li>
        <li className="hover:text-gray-400 cursor-pointer">
          <Link href={"/article"}>Article</Link>
        </li>
        <li className="hover:text-gray-400 cursor-pointer">
          <Link href={"/about"}>About</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
