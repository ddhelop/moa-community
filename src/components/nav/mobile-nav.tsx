'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  PenSquare,
  Home,
  BookOpen,
  Flame,
  UtensilsCrossed,
  Megaphone,
  Newspaper,
  Briefcase,
} from 'lucide-react';
import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '../ui/sheet';
import { Suspense } from 'react';

// 게시판 목록 (사이드바와 동일한 항목 사용)
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
function MobileNavContent() {
  const [open, setOpen] = useState(false);
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
    <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
      {/* 로고 */}
      <Link href="/" className="flex items-center">
        <div className="w-17 h-17 flex-shrink-0">
          <Image
            src="/logo_text.svg"
            alt="마포동네 로고"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>
      </Link>

      <div className="flex items-center gap-3">
        {/* 모바일 메뉴 드로어 */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">메뉴 열기</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 sm:w-80">
            <div className="flex flex-col h-full py-6">
              {/* 모바일 메뉴 항목 */}
              <nav className="flex-1">
                <h3 className="mb-4 font-medium text-gray-400 text-[13px] px-4">
                  게시판
                </h3>
                <ul className="space-y-2">
                  {BOARD_ITEMS.map((item) => (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className={`flex items-center px-4 py-2.5 text-[13px] transition-colors rounded-md group/item ${
                            isActive(item.href)
                              ? 'text-gray-900 font-semibold'
                              : 'text-gray-400 hover:text-gray-700'
                          }`}
                        >
                          <item.icon
                            className={`w-5 h-5 mr-4 transition-colors ${
                              isActive(item.href)
                                ? 'text-gray-900 stroke-[2px]'
                                : 'text-gray-300 group-hover/item:text-gray-700'
                            }`}
                          />
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}

                  {/* 글쓰기 메뉴 항목 */}
                  <li>
                    <SheetClose asChild>
                      <Link
                        href="/write"
                        className="flex items-center px-4 py-2.5 text-[13px] transition-colors rounded-md group/item text-gray-400 hover:text-gray-700"
                      >
                        <PenSquare className="w-5 h-5 mr-4 transition-colors text-gray-300 group-hover/item:text-gray-700" />
                        글쓰기
                      </Link>
                    </SheetClose>
                  </li>
                </ul>
              </nav>

              {/* 프로필 영역 */}
              <div className="mt-6">
                <h3 className="mb-4 font-medium text-gray-400 text-[13px] px-4">
                  계정
                </h3>
                <SheetClose asChild>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2.5 text-[13px] hover:text-gray-700 transition-colors rounded-md group/item text-gray-400"
                  >
                    <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden mr-4">
                      <Image
                        src="/images/profiles/avatar0.jpg"
                        alt="사용자 프로필"
                        width={20}
                        height={20}
                        className="object-cover"
                      />
                    </div>
                    <span>프로필</span>
                  </Link>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

// Suspense로 감싼 메인 컴포넌트
export function MobileNav() {
  return (
    <Suspense fallback={<MobileNavSkeleton />}>
      <MobileNavContent />
    </Suspense>
  );
}

// 로딩 중 표시할 스켈레톤 UI
function MobileNavSkeleton() {
  return (
    <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
      <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse"></div>
      <div className="w-8 h-8 bg-gray-200 rounded-md animate-pulse"></div>
    </div>
  );
}
