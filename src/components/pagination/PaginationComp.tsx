"use client";

import { usePagination } from "@/src/hooks/usePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const PaginationComp = ({ totalCount }: { totalCount: number }) => {
  const {
    isPrevDisabled,
    currentPage,
    counts,
    isNextDisabled,
    createPageLink,
  } = usePagination(totalCount);

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
