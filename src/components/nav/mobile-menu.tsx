'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Board {
  name: string;
  slug: string;
}

interface MobileMenuProps {
  boards: Board[];
}

export default function MobileMenu({ boards }: MobileMenuProps) {
  return (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">메뉴 열기</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {boards.map((board) => (
            <DropdownMenuItem key={board.slug} asChild>
              <Link href={board.slug} className="w-full cursor-pointer">
                {board.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
