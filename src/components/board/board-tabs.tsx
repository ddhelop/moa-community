'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BOARDS } from '@/components/nav/navbar';

export function BoardTabs() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="border-b" data-component="board-tabs">
      <nav className="container mx-auto px-4 flex space-x-2 overflow-x-auto py-2 sm:py-3 no-scrollbar">
        {BOARDS.map((board) => (
          <Link
            key={board.slug}
            href={board.slug}
            className={`px-4 py-3 font-medium text-sm inline-flex items-center whitespace-nowrap transition-colors border-b-2 ${
              isActive(board.slug)
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            {board.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
