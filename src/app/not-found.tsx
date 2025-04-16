'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

// 404 페이지 내용을 보여주는 컴포넌트
function NotFoundContent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-9xl font-bold text-[#419F5A]">404</h1>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        요청하신 페이지({pathname})를 찾을 수 없습니다. 주소가 올바른지 확인해
        주세요.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#419F5A] text-white rounded-md hover:bg-[#357b47] transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}

// Suspense로 감싸는 메인 컴포넌트
export default function NotFound() {
  return (
    <Suspense fallback={<NotFoundSkeleton />}>
      <NotFoundContent />
    </Suspense>
  );
}

// 로딩 중 표시할 스켈레톤 UI
function NotFoundSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="w-32 h-32 bg-gray-200 rounded-md animate-pulse"></div>
      <div className="w-64 h-8 bg-gray-200 rounded-md animate-pulse mt-6 mb-4"></div>
      <div className="w-80 h-16 bg-gray-200 rounded-md animate-pulse mb-8"></div>
      <div className="w-40 h-12 bg-gray-200 rounded-md animate-pulse"></div>
    </div>
  );
}
