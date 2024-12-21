import { type Locale, locales } from "@/src/lib/locales";
import createMiddleware from "next-intl/middleware";
import { NextResponse, NextRequest } from "next/server";

export default function middleware(req: NextRequest): NextResponse {
  const acceptLanguage = req.headers.get("accept-language");

  // 로케일 감지 (최초 진입 시)
  const userLocale = acceptLanguage?.split(",")[0].split("-")[0]; // 'ko-KR' → 'ko'

  // 사용자의 언어가 지원되는 언어인지 확인
  const finalLocale = locales.includes(userLocale as Locale)
    ? (userLocale as Locale)
    : "en"; // 지원하지 않으면 'en'로 설정

  // 동적으로 createMiddleware에 로케일 전달
  const nextIntlMiddleware = createMiddleware({
    locales,
    defaultLocale: finalLocale,
    localePrefix: "never",
  });

  return nextIntlMiddleware(req);
}

export const config = {
  // match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
