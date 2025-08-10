import Link from "next/link";
import React from "react";
import MusicComp from "../3D/MusicComp";

const FooterComponent = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-800 text-white h-20 p-3 items-center z-20">
      <h3 className="italic text-xs md:text-sm mb-3">
        Developed by 허현빈 / Max
      </h3>
      <ul className="flex justify-center gap-8 w-full text-xs md:text-sm font-medium ">
        <li className="hover:text-gray-400 cursor-pointer">
          <MusicComp />
        </li>
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
const Footer = React.memo(FooterComponent);
export default Footer;
