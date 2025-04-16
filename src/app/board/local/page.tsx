import { PostList } from '@/components/post/post-list';

export const metadata = {
  title: '지역소식 - 마포동네',
  description: '마포구 내 지역 소식과 행사 정보를 알려드립니다',
};

interface PageProps {
  searchParams: { page?: string };
}

export default function LocalBoardPage({ searchParams }: PageProps) {
  // 현재 페이지 번호 계산
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="container mx-auto px-4 max-w-5xl py-6">
      <div className="mt-5 mb-8">
        <h1 className="text-3xl font-bold mb-2">지역소식</h1>
        <p className="text-gray-600 text-sm">
          마포구 내 지역 소식과 행사 정보를 알려드립니다
        </p>
      </div>

      <PostList boardSlug="local" currentPage={currentPage} />
    </div>
  );
}
