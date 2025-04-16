import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/nav/navbar';
import { BoardTabs } from '@/components/board/board-tabs';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: '마포동네',
  description: '우리 동네의 이야기를, 우리끼리 나누는 곳',
  icons: {
    icon: '/moa_logo.svg',
    apple: '/moa_logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSansKr.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <BoardTabs />
        <main className="flex-1">{children}</main>
        <footer className="mt-auto py-6 text-center text-gray-500 text-sm border-t">
          <div className="container mx-auto px-4">
            <p>© 2024 마포동네 커뮤니티</p>
            <p className="mt-2">
              <a href="#" className="text-green-600 hover:underline">
                💻 지역 확장을 위한 서버비 후원하기
              </a>
            </p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
