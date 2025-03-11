"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
// import { Loader } from "lucide-react";
const Loader = dynamic(() => import("lucide-react").then((mod) => mod.Loader));
import Image from "next/image";
import GoogleButton from "react-google-button";
import GithubButton from "react-github-login-button";
import Kakao_icon from "@/public/kakao_login_large_narrow.png";
const AuthDropDown = () => {
  //Variable Declaration
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const t = useTranslations("Navigation");
  const handleSignIn = async (provider: string) => {
    await signIn(provider);
  };
  return (
    <div className="flex">
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <DropdownMenu modal={false}>
          {status === "authenticated" && session ? (
            <>
              <DropdownMenuTrigger>{session.user?.name}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Chat</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  {t("SignOut")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </>
          ) : (
            <>
              <DropdownMenuTrigger className="flex items-center justify-center lg:min-w-20 sm:min-w-48">
                {t("SignIn")}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleSignIn("kakao")}>
                  <Image
                    src={Kakao_icon.src}
                    alt="Kakao login"
                    width={240}
                    height={46}
                    priority={false}
                    loading="lazy"
                  />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSignIn("google")}>
                  <GoogleButton
                    onClick={() => {
                      console.log("Google button clicked");
                    }}
                  />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSignIn("github")}>
                  <GithubButton
                    onClick={() => {
                      console.log("Github button clicked");
                    }}
                  />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </>
          )}
        </DropdownMenu>
      )}
    </div>
  );
};

export default AuthDropDown;
