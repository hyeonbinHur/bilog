"use client";
import React, { useEffect, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
    <div className="my-5 w-full flex justify-center">
      {totalCount > 0 && (
        <div className="flex items-center">
          <Button
            asChild
            disabled={isPrevDisabled}
            variant="outline"
            className="rounded-full w-10 h-10"
          >
            <Link
              href={createPageLink(currentPage - 1)}
              aria-disabled={isPrevDisabled}
              prefetch={true}
            >
              <ChevronLeft />
            </Link>
          </Button>

          <div className="flex text-slate-500 mx-2">
            {counts.map((pageNum) => (
              <button
                key={pageNum}
                className={`w-10 h-10 flex items-center justify-center hover:text-black ${
                  currentPage === pageNum ? "text-black font-bold" : ""
                }`}
              >
                <Link
                  href={createPageLink(pageNum)}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                  prefetch={true}
                >
                  {pageNum}
                </Link>
              </button>
            ))}
          </div>

          <Button
            asChild
            disabled={isNextDisabled}
            variant="outline"
            className="rounded-full w-10 h-10"
          >
            <Link
              href={createPageLink(currentPage + 1)}
              aria-disabled={isNextDisabled}
              prefetch={true}
            >
              <ChevronRight />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaginationComp;
