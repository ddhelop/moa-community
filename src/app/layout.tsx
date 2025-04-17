import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { SideNav } from '../components/nav/side-nav';
import { MobileNav } from '../components/nav/mobile-nav';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: '마포동네',
  description: '우리 동네의 이야기를, 우리끼리 나누는 곳',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${notoSansKr.variable} font-sans antialiased min-h-screen flex flex-col md:flex-row`}
      >
        {/* 모바일 네비게이션 - 모바일에서만 보임 */}
        <div className="md:hidden sticky top-0 z-50">
          <MobileNav />
        </div>

        {/* 사이드 네비게이션 - 모바일에서는 숨김 */}
        <div className="hidden md:block fixed h-screen w-16 hover:w-48 transition-all duration-300 z-50 bg-transparent">
          <SideNav />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 md:ml-16">
          <main className="flex-1">{children}</main>
          <footer className="mt-auto py-6 text-center text-gray-500 text-sm border-t">
            <div className="container mx-auto px-4">
              <p>© 2024 마포동네 커뮤니티</p>
              <p className="mt-2">
                <a href="#" className="text-gray-600 hover:underline">
                  💻 지역 확장을 위한 서버비 후원하기
                </a>
              </p>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
