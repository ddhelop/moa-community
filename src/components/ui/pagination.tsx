import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  basePath: string;
}

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  basePath,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 페이지 URL 생성 함수
  const createPageUrl = (page: number) => {
    return `${basePath}?page=${page}`;
  };

  // 보여줄 페이지 버튼의 범위 계산 (항상 5개 고정)
  const MAX_VISIBLE = 5;

  // 현재 페이지가 속한 그룹 계산
  const currentGroup = Math.ceil(currentPage / MAX_VISIBLE);

  // 시작 페이지와 끝 페이지 계산
  const startPage = (currentGroup - 1) * MAX_VISIBLE + 1;
  const endPage = Math.min(currentGroup * MAX_VISIBLE, totalPages);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center mt-6 gap-2">
      {/* 이전 버튼 (이전 그룹으로 이동) */}
      {startPage > 1 ? (
        <Link
          href={createPageUrl(startPage - 1)}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-600"
          aria-label="이전 페이지 그룹"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <div className="w-9 h-9 flex items-center justify-center text-gray-300">
          <ChevronLeft className="h-4 w-4" />
        </div>
      )}

      {/* 페이지 번호 버튼들 */}
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={`w-9 h-9 flex items-center justify-center rounded-md ${
            page === currentPage
              ? 'bg-blue-600 text-white font-medium'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          aria-label={`${page} 페이지`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      {/* 다음 버튼 (다음 그룹으로 이동) */}
      {endPage < totalPages ? (
        <Link
          href={createPageUrl(endPage + 1)}
          className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-600"
          aria-label="다음 페이지 그룹"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div className="w-9 h-9 flex items-center justify-center text-gray-300">
          <ChevronRight className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
