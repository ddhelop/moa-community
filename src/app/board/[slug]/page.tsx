import { PostList } from '@/components/post/post-list';
import { Metadata } from 'next';

// 게시판 정보
const BOARD_INFO: Record<string, { title: string; description: string }> = {
  free: {
    title: '자유게시판',
    description: '마포구 주민들의 자유로운 소통 공간입니다.',
  },
  market: {
    title: '중고거래',
    description: '마포구 주민들의 중고 물품 거래 장터입니다.',
  },
  hot: {
    title: '핫게시판',
    description: '마포구에서 가장 인기 있는 게시글을 모아봤어요.',
  },
  food: {
    title: '맛집게시판',
    description: '마포구의 맛집 정보를 공유하는 공간입니다.',
  },
  news: {
    title: '동네소식',
    description: '마포구 내 지역 소식과 행사 정보를 알려드립니다.',
  },
  request: {
    title: '발은 요청',
    description: '주변 이웃에게 도움을 요청하는 공간입니다.',
  },
  jobs: {
    title: '채용',
    description: '마포구 내 채용 정보를 공유하는 공간입니다.',
  },
  makers: {
    title: '메이커 찾기',
    description: '다양한 분야의 메이커를 찾고 협업할 수 있습니다.',
  },
  clubs: {
    title: '클럽',
    description: '관심사가 비슷한 이웃들과 함께하는 모임입니다.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const boardInfo = BOARD_INFO[params.slug] || {
    title: '게시판',
    description: '마포구 커뮤니티 게시판입니다.',
  };

  return {
    title: `${boardInfo.title} | 마포동네`,
    description: boardInfo.description,
  };
}

export default function BoardPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const { slug } = params;
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

  const boardInfo = BOARD_INFO[slug] || {
    title: '게시판',
    description: '마포구 커뮤니티 게시판입니다.',
  };

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6">
      <div className="mt-5">
        <h1 className="text-3xl font-bold mb-2">{boardInfo.title}</h1>
        <p className="text-gray-600 mb-6">{boardInfo.description}</p>

        <PostList boardSlug={slug} currentPage={currentPage} />
      </div>
    </div>
  );
}
