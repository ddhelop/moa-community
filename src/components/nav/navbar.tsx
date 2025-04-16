'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MobileMenu from './mobile-menu';
import { useEffect, useState } from 'react';

export const BOARDS = [
  { name: '전체글', slug: '/posts' },
  { name: '핫게시판', slug: '/board/hot' },
  { name: '자유게시판', slug: '/board/free' },
  { name: '맛집게시판', slug: '/board/food' },
  { name: '홍보게시판', slug: '/board/promo' },
  { name: '지역소식', slug: '/board/local' },
];

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHasScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full sticky top-0 bg-white z-50 transition-all duration-200 ${
        hasScrolled ? 'border-b border-gray-200' : ''
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">마포동네</h1>
        </Link>

        <div className="flex items-center gap-4">
          <MobileMenu boards={BOARDS} />

          <Link href="/write">
            <Button variant="outline" size="sm">
              글쓰기
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
