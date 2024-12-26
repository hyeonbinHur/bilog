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
import Kakao_icon from "@/public/kakao_icon.png";

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
    <div className="flex items-center justify-center">
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <DropdownMenu>
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
              <DropdownMenuTrigger> {t("SignIn")}</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleSignIn("google")}>
                  <Image
                    alt="google logo for sign"
                    src={Google_icon.src}
                    className="w-10 h-8"
                    width={30}
                    height={30}
                  />
                  Continue with Google
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSignIn("github")}>
                  <Image
                    alt="github logo for sign in"
                    src={Github_icon.src}
                    className="w-10 h-10"
                    width={30}
                    height={30}
                  />
                  Continue with GitHub
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleSignIn("kakao")}>
                  <Image
                    alt="Kakao logo for sign in"
                    src={Kakao_icon.src}
                    className="w-10 h-10"
                    width={30}
                    height={30}
                  />
                  Continue with Kakao
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
