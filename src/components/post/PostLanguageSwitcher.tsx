import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

import { useState } from "react";

import { Ban } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { useSession } from "next-auth/react";

const PostLanguageSwitcher = ({
  korStatus,
  engStatus,
  onChangeLocale,
  currentLocale,
}: {
  korStatus: "PUBLIC" | "PRIVATE";
  engStatus: "PUBLIC" | "PRIVATE";
  onChangeLocale: (newLocale: "Korean" | "English") => void;
  currentLocale: string;
}) => {
  const { data: session } = useSession();
  console.log("kor : ", korStatus);
  console.log("eng : ", engStatus);
  return (
    <>
      <TooltipProvider>
        <Tabs defaultValue={currentLocale} className="mb-5">
          <TabsList className="grid w-full grid-cols-2">
            {String(session?.user.id) !== process.env.NEXT_PUBLIC_MAX_ID &&
            korStatus !== "PUBLIC" ? (
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="ko"
                    className="w-full disabled"
                    disabled
                    onClick={() => {
                      onChangeLocale("Korean");
                    }}
                  >
                    Korean
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-red-500 flex gap-3 items-center text-xs">
                    <Ban size={15} />
                    This post is not available in Korean.
                  </p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <TabsTrigger
                value="ko"
                className="w-full"
                onClick={() => {
                  onChangeLocale("Korean");
                }}
              >
                Korean
              </TabsTrigger>
            )}

            {String(session?.user.id) !== process.env.NEXT_PUBLIC_MAX_ID &&
            engStatus !== "PUBLIC" ? (
              <Tooltip>
                <TooltipTrigger>
                  <TabsTrigger
                    value="en"
                    className="w-full disabled"
                    disabled
                    onClick={() => {
                      onChangeLocale("English");
                    }}
                  >
                    English
                  </TabsTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-red-500 flex gap-3 items-center text-xs">
                    <Ban size={15} />
                    This post is not available in English.
                  </p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <TabsTrigger
                value="en"
                className="w-full"
                onClick={() => {
                  onChangeLocale("English");
                }}
              >
                English
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </TooltipProvider>

      {/* <Tabs defaultValue={currentLocale} className="mb-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="ko"
            className="w-full "
            onClick={() => {
              onChangeLocale("Korean");
            }}
          >
            Korean
          </TabsTrigger>

          <TabsTrigger
            value="en"
            className="w-full "
            onClick={() => {
              onChangeLocale("English");
            }}
          >
            English
          </TabsTrigger>
        </TabsList>
      </Tabs> */}
    </>
  );
};

export default PostLanguageSwitcher;
