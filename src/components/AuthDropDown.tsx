"use client";

import React, { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import Github_icon from "@/public/github_icon.png";
import Google_icon from "@/public/google_icon.png";
import GithubButton from "react-github-login-button";
import Kakao_icon from "@/public/kakao_login_large_narrow.png";
import GoogleButton from "react-google-button";

import { useTranslations } from "next-intl";
import { Loader } from "lucide-react";
import Image from "next/legacy/image";

const AuthDropDown = () => {
  //Variable Declaration
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Navigation");

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
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
                    alt="Kakao logo for sign in"
                    src={Kakao_icon.src}
                    width={240}
                    height={53}
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
