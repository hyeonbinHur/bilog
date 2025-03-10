import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = [
  "https://bilog-git-main-hyeonbins-projects-02940193.vercel.app",
  "http://localhost:3000",
];

function handleError(err: unknown, code?: number) {
  if (err instanceof Error) {
    return NextResponse.json(
      { message: `Unknown error: ${err.message}` },
      { status: code ? code : 500 }
    );
  } else {
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}

function getCommonParams(req: NextRequest) {
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
const createResponse = (
  req: NextRequest,
  data: any,
  status: number = 200,
  extraHeaders?: Record<string, string>
) => {
  const origin: string | null = req.headers.get("Origin");
  const isOriginAllowed = origin ? allowedOrigins.includes(origin) : false; // origin이 null이 아닐 때만 확인

  return NextResponse.json(data, {
    status,
    headers: {
      "Access-Control-Allow-Origin": isOriginAllowed ? origin || "" : "",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      ...(extraHeaders ?? {}), // ✅ extraHeaders가 없으면 빈 객체로 대체
    },
  });
};
export { handleError, getCommonParams, createResponse };
