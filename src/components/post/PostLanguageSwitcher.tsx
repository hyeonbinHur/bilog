import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

import { Ban } from "lucide-react";

import { TooltipProvider } from "@/src/components/ui/tooltip";
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
  return (
    <>
      <TooltipProvider>
        <Tabs
          defaultValue={currentLocale}
          className="mb-5"
          aria-label="언어 선택"
        >
          <TabsList
            className="grid w-full grid-cols-2"
            role="tablist"
            aria-label="게시물 언어 선택"
          >
            {String(session?.user.id) !== process.env.NEXT_PUBLIC_MAX_ID &&
            korStatus !== "PUBLIC" ? (
              <TabsTrigger
                value="ko"
                className="w-full opacity-50 cursor-not-allowed"
                disabled
                title="This post is not available in Korean"
                aria-label="한국어 (사용 불가)"
                role="tab"
                tabIndex={-1}
              >
                <span className="flex items-center gap-2">
                  <Ban size={15} aria-hidden="true" />
                  Korean
                </span>
              </TabsTrigger>
            ) : (
              <TabsTrigger
                value="ko"
                className="w-full"
                onClick={() => {
                  onChangeLocale("Korean");
                }}
                aria-label="한국어로 보기"
                role="tab"
              >
                Korean
              </TabsTrigger>
            )}
            {String(session?.user.id) !== process.env.NEXT_PUBLIC_MAX_ID &&
            engStatus !== "PUBLIC" ? (
              <TabsTrigger
                value="en"
                className="w-full opacity-50 cursor-not-allowed"
                disabled
                title="This post is not available in English"
                aria-label="영어 (사용 불가)"
                role="tab"
                tabIndex={-1}
              >
                <span className="flex items-center gap-2">
                  <Ban size={15} aria-hidden="true" />
                  English
                </span>
              </TabsTrigger>
            ) : (
              <TabsTrigger
                value="en"
                className="w-full"
                onClick={() => {
                  onChangeLocale("English");
                }}
                aria-label="영어로 보기"
                role="tab"
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
