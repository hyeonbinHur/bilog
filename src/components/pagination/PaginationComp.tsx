"use client";
import { useEffect, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";


const PaginationComp = ({ totalCount }: { totalCount: number }) => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const currentPage = parseInt(page);
  const lastPage = Math.ceil(totalCount / 7);

  const [counts, setCounts] = useState<number[]>([]);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);

  useEffect(() => {
    if (lastPage > 5) {
      if (lastPage - currentPage >= 4) {
        const results = Array.from({ length: 5 }, (_, i) => currentPage + i);
        setCounts(results);
      } else {
        const results = Array.from({ length: 5 }, (_, i) => lastPage - 4 + i);
        setCounts(results);
      }
    } else {
      const results = Array.from({ length: lastPage }, (_, i) => i + 1);
      setCounts(results);
    }
    setIsNextDisabled(currentPage === lastPage);
    setIsPrevDisabled(currentPage === 1);
  }, [currentPage, lastPage]);

  // 현재 페이지를 제외한 모든 페이지에 page 쿼리 붙이기 함수
  const createPageLink = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNum.toString());
    return `?${params.toString()}`;
  };

  return (
    <nav
      aria-label="페이지 네비게이션"
      className="my-5 w-full flex justify-center"
    >
      {totalCount > 0 && (

        <div
          className="flex items-center"
          role="group"
          aria-label="페이지 목록"
        >

          <Button
            asChild
            disabled={isPrevDisabled}
            variant="outline"
            className="rounded-full w-10 h-10"
          >
            <Link
              href={createPageLink(currentPage - 1)}
              aria-disabled={isPrevDisabled}

              aria-label={`이전 페이지 (${currentPage - 1}페이지로 이동)`}
              prefetch={true}
              tabIndex={isPrevDisabled ? -1 : 0}
            >
              <ChevronLeft aria-hidden="true" />
            </Link>
          </Button>

          <ol className="flex text-slate-500 mx-2" role="list">
            {counts.map((pageNum) => (
              <li key={pageNum} role="listitem">
                <Link
                  href={createPageLink(pageNum)}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                  aria-label={
                    currentPage === pageNum
                      ? `현재 페이지, ${pageNum}페이지`
                      : `${pageNum}페이지로 이동`
                  }
                  className={`w-10 h-10 flex items-center justify-center hover:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ${
                    currentPage === pageNum
                      ? "text-black font-bold bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}

                  prefetch={true}
                >
                  {pageNum}
                </Link>

              </li>

            ))}
          </ol>

          <Button
            asChild
            disabled={isNextDisabled}
            variant="outline"
            className="rounded-full w-10 h-10"
          >
            <Link
              href={createPageLink(currentPage + 1)}
              aria-disabled={isNextDisabled}

              aria-label={`다음 페이지 (${currentPage + 1}페이지로 이동)`}
              prefetch={true}
              tabIndex={isNextDisabled ? -1 : 0}
            >
              <ChevronRight aria-hidden="true" />

            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default PaginationComp;
