'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  PenSquare,
  Home,
  BookOpen,
  Flame,
  UtensilsCrossed,
  Megaphone,
  Newspaper,
  Briefcase,
} from 'lucide-react';
import { Suspense } from 'react';

// 게시판 목록
const BOARD_ITEMS = [
  { label: '전체 피드', href: '/posts', icon: Home },
  { label: '자유게시판', href: '/posts?board=free', icon: BookOpen },
  { label: '핫게시판', href: '/posts?board=hot', icon: Flame },
  { label: '맛집게시판', href: '/posts?board=food', icon: UtensilsCrossed },
  { label: '홍보게시판', href: '/posts?board=promo', icon: Megaphone },
  { label: '지역소식', href: '/posts?board=local', icon: Newspaper },
  { label: '채용', href: '/posts?board=jobs', icon: Briefcase },
];

// useSearchParams를 사용하는 내부 컴포넌트
function SideNavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 활성 메뉴 확인
  const isActive = (path: string) => {
    if (!pathname) return false;

    // 전체 피드('/posts')는 board 쿼리 없을 때만 활성화
    if (path === '/posts') {
      return pathname === '/posts' && !searchParams.has('board');
    }

    // 쿼리 파라미터가 있는 경우 처리
    if (path.includes('?')) {
      const [, query] = path.split('?');
      const [paramName, paramValue] = query.split('=');

      // /posts 페이지이고 board 쿼리가 일치하는지 확인
      if (pathname === '/posts' && paramName === 'board') {
        return searchParams.get('board') === paramValue;
      }
    }

    return pathname === path || pathname?.startsWith(`${path}/`);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* 로고 영역 - 1번 호버 영역 */}
      <div
        className="py-6 group hover:w-48 transition-all duration-300 overflow-visible relative"
        style={{ width: 'inherit' }}
      >
        <div className="px-4 w-16 absolute left-0 top-0 flex justify-center items-center h-[72px]">
          <Link href="/" className="flex items-center justify-center">
            <div className="w-8 h-8 flex-shrink-0">
              <Image
                src="/moa_logo.svg"
                alt="마포동네 로고"
                width={32}
                height={32}
                className="w-full h-full"
                priority
              />
            </div>
          </Link>
        </div>
      </div>

      {/* 게시판 메뉴 영역 - 2번 호버 영역 */}
      <nav
        className="flex-1 flex items-center group hover:w-48 transition-all duration-300 overflow-hidden"
        style={{ width: 'inherit' }}
      >
        <ul className="space-y-2 w-full">
          {BOARD_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2.5 text-[13px] transition-colors group/item ${
                  isActive(item.href)
                    ? 'text-[#2A7940] font-semibold'
                    : 'text-gray-400 hover:text-[#419F5A]'
                }`}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 transition-colors ${
                    isActive(item.href)
                      ? 'text-[#2A7940] stroke-[2px]'
                      : 'text-gray-300 group-hover/item:text-[#419F5A]'
                  }`}
                />
                <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            </li>
          ))}

          {/* 글쓰기 메뉴 항목 */}
          <li>
            <Link
              href="/write"
              className="flex items-center px-4 py-2.5 text-[13px] transition-colors group/item text-gray-400 hover:text-[#419F5A]"
            >
              <PenSquare className="w-5 h-5 flex-shrink-0 transition-colors text-gray-300 group-hover/item:text-[#419F5A]" />
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                글쓰기
              </span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* 프로필 영역 - 3번 호버 영역 */}
      <div
        className="py-6 px-4 group hover:w-48 transition-all duration-300 overflow-hidden"
        style={{ width: 'inherit' }}
      >
        <Link
          href="/profile"
          className="flex items-center text-[13px] transition-colors hover:text-[#419F5A] group/item"
        >
          <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
            <Image
              src="/images/profiles/avatar0.jpg"
              alt="사용자 프로필"
              width={20}
              height={20}
              className="object-cover"
            />
          </div>
          <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium text-gray-400">
            프로필
          </span>
        </Link>
      </div>
    </div>
  );
}

// Suspense로 감싼 메인 컴포넌트
export function SideNav() {
  return (
    <Suspense fallback={<SideNavSkeleton />}>
      <SideNavContent />
    </Suspense>
  );
}

// 로딩 중 표시할 스켈레톤 UI
function SideNavSkeleton() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div
        className="py-6 group overflow-visible relative"
        style={{ width: 'inherit' }}
      >
        <div className="px-4 w-16 absolute left-0 top-0 flex justify-center items-center h-[72px]">
          <div className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>

      <nav className="flex-1 flex items-center" style={{ width: 'inherit' }}>
        <ul className="space-y-2 w-full">
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <li key={i} className="px-4 py-2.5">
                <div className="w-5 h-5 bg-gray-200 rounded-md animate-pulse"></div>
              </li>
            ))}
        </ul>
      </nav>

      <div className="py-6 px-4" style={{ width: 'inherit' }}>
        <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse"></div>
      </div>
    </div>
  );
}
