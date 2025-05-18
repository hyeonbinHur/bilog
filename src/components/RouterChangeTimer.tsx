"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function RouteChangeTimer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (startTimeRef.current) {
      const duration = performance.now() - startTimeRef.current;
      console.log(`🚀 페이지 전환 완료: ${duration.toFixed(2)}ms`);
      startTimeRef.current = null;
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a")) {
        startTimeRef.current = performance.now();
      }
    };

    // 버튼 등 커스텀 이벤트로 시작 신호 받는 핸들러
    const handleCustomStart = () => {
      startTimeRef.current = performance.now();
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("routeChangeStartCustom", handleCustomStart);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("routeChangeStartCustom", handleCustomStart);
    };
  }, []);

  return null;
}
