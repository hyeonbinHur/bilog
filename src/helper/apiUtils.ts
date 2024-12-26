import { NextRequest, NextResponse } from "next/server";

export default function handleError(err: unknown, code?: number) {
  if (err instanceof Error) {
    return NextResponse.json(
      { message: `Unknown error: ${err.message}` },
      { status: code ? code : 500 }
    );
  } else {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
export function getCommonParams(req: NextRequest) {
  const pageParam = req.nextUrl.searchParams.get("page");
  const typeParam = req.nextUrl.searchParams.get("type");
  const locale = req.nextUrl.searchParams.get("locale");

  // 페이지 파라미터 처리
  const page = pageParam ? parseInt(pageParam) : 1;
  if (isNaN(page) || page < 1) {
    throw new Error("Invalid 'page' parameter. It must be a positive integer.");
  }

  const limit = 7; // 기본 limit값 7
  const offset = (page - 1) * limit;

  // 타입 처리: blog이면 BLOG, 아니면 ARTICLE
  const pathType = typeParam
    ? typeParam === "blog"
      ? "BLOG"
      : "ARTICLE"
    : undefined;

  return { limit, offset, locale, pathType };
}
