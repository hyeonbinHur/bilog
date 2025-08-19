import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const usePagination = (totalCount: number) => {
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

  return {
    isPrevDisabled,
    createPageLink,
    currentPage,
    counts,
    isNextDisabled,
  };
};
