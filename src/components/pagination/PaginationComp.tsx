"use client";
import React, { useEffect, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const PaginationComp = ({ totalCount }: { totalCount: number }) => {
  // limit = 7
  // 현재 페이지 기준 뒤로 몇개의 아이템이 남았는지 계산
  // 뒤에 몇개의 페이지가 더 존재할 수 있는지 확인?
  /**
   * 번호는 5개씩
   * features, prev, <counts>, next
   *  - prev allows move to prev page (current page - 1)
   *  - counts allows navigate to 'count' page
   *  - next allows naviage to next page (current page + 1)
   *
   * case 1. 7 is the last page number(count) <1, 2, 3, 4, 5, 6, 7>
   * - when current page is 1
   *   shows 1, 2, 3, 4, 5
   *   prev is not allowed
   *   next is allowed
   *
   * - when current page is 4
   *   shows 3, 4 ,5 ,6, 7
   *   prev is allowed
   *   next is allowed
   *
   * - when current page is 7
   *   shows 3,4,5,6,7
   *   prev is allowed
   *   next is not allowed
   *
   * caee 2. 3 is the last page number(count)
   * - when current page is 1
   *   shows 1, 2, 3
   *   prev is not allowed
   *   next is allowed
   *
   * - when current page is 2
   *   shows 1, 2, 3
   *   prev is allowed
   *   next is allowed
   *
   * - when current page is 3
   *   shows 1, 2, 3
   *   prev is allowed
   *   next is not allowed
   *
   * case 3. 1 is the last page number(count)
   * - when current page is 1
   *   - shows 1
   *   - prev is not allowed
   *   - next is not allowed
   */

  //Variable Declaration
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || 1;
  const currentPage = page ? parseInt(page as string) : 1;
  const lastPage = Math.ceil(totalCount / 7);

  const [counts, setCounts] = useState<number[]>([]);
  const [isNext, setIsNext] = useState<boolean>(true);
  const [isPrev, setIsPrev] = useState<boolean>(true);

  useEffect(() => {
    if (lastPage > 5) {
      if (lastPage - currentPage >= 4) {
        const results = Array.from(
          { length: 5 },
          (_, i) => i + currentPage + 1
        );
        setCounts(results);
      } else {
        const results = Array.from({ length: 5 }, (_, i) => lastPage - i);
        setCounts(results.reverse());
      }
    } else {
      const results = Array.from({ length: lastPage }, (_, i) => i + 1);
      setCounts(results);
    }
    if (currentPage !== lastPage) {
      setIsNext(false);
    }
    if (currentPage !== 1) {
      setIsPrev(false);
    }
  }, [page]);

  //Client Component Event Handler
  const onClickMovePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="my-5 w-full flex justify-center">
      {totalCount > 0 && (
        <div className="flex">
          <Button
            disabled={isPrev}
            variant="outline"
            className="rounded-full w-10 h-10"
            onClick={() => onClickMovePage(currentPage - 1)}
          >
            <ChevronLeft />
          </Button>
          <div className="flex text-slate-500">
            {counts.map((e, i) => (
              <button
                key={i}
                onClick={() => onClickMovePage(e as number)}
                className={`w-10 h-10 flex items-center justify-center hover:text-black ${
                  currentPage === e ? `text-black font-bold` : ``
                }`}
              >
                {e}
              </button>
            ))}
          </div>

          <Button
            disabled={isNext}
            variant="outline"
            className="rounded-full w-10 h-10"
            onClick={() => onClickMovePage(currentPage + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PaginationComp;
