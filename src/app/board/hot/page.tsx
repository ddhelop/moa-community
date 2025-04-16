import { PostList } from '@/components/post/post-list';

export const metadata = {
  title: '핫게시판 - 마포동네',
  description: '마포구에서 가장 인기 있는 게시글을 모아봤어요',
};

interface PageProps {
  searchParams: { page?: string };
}

export default function HotBoardPage({ searchParams }: PageProps) {
  // 현재 페이지 번호 계산
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="container mx-auto px-4 max-w-5xl py-6">
      <div className="mt-5 mb-8">
        <h1 className="text-3xl font-bold mb-2">핫게시판</h1>
        <p className="text-gray-600 text-sm">
          마포구에서 가장 인기 있는 게시글을 모아봤어요
        </p>
      </div>

      <PostList boardSlug="hot" currentPage={currentPage} />
    </div>
  );
}
