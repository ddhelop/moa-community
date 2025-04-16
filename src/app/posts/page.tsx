import { PostList } from '@/components/post/post-list';

export const metadata = {
  title: '전체 게시글 - 마포동네',
  description: '마포동네 커뮤니티의 모든 게시글을 확인하세요',
};

interface PageProps {
  searchParams: { page?: string };
}

export default function PostsPage({ searchParams }: PageProps) {
  // 현재 페이지 번호 계산
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="container mx-auto px-4 max-w-5xl py-6">
      <div className="mt-5 mb-8">
        <h1 className="text-3xl font-bold mb-2">전체 피드</h1>
        <p className="text-gray-600 text-sm">
          마포동네 커뮤니티의 모든 게시글을 확인할 수 있습니다
        </p>
      </div>

      <PostList showBoardName={true} currentPage={currentPage} />
    </div>
  );
}
