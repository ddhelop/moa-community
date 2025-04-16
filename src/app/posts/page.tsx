// src/app/posts/page.tsx

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
  local: {
    title: '지역소식',
    description: '마포구의 소식과 정보를 공유하는 공간입니다.',
  },
  promo: {
    title: '홍보게시판',
    description: '마포구 내 상점, 서비스, 이벤트 등을 홍보하는 공간입니다.',
  },
  request: {
    title: '도움 요청',
    description: '주변 이웃에게 도움을 요청하는 공간입니다.',
  },
  jobs: {
    title: '채용',
    description: '마포구 내 채용 정보를 공유하는 공간입니다.',
  },
};

// 메타데이터 생성
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ board?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const boardSlug = resolvedParams.board;

  if (boardSlug && BOARD_INFO[boardSlug]) {
    const boardInfo = BOARD_INFO[boardSlug];
    return {
      title: `${boardInfo.title} | 마포동네`,
      description: boardInfo.description,
    };
  }

  return {
    title: '전체 게시글 - 마포동네',
    description: '마포동네 커뮤니티의 모든 게시글을 확인하세요',
  };
}

// 페이지 props 타입
interface PageProps {
  params: Promise<Record<string, never>>;
  searchParams: Promise<{ page?: string; board?: string }>;
}

// 게시글 페이지
export default async function PostsPage(props: PageProps) {
  // Promise 해결
  const searchParams = await props.searchParams;

  // 페이지 번호 및 게시판 정보 가져오기
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const boardSlug = searchParams.board;

  const boardInfo =
    boardSlug && BOARD_INFO[boardSlug]
      ? BOARD_INFO[boardSlug]
      : {
          title: '전체 피드',
          description: '마포동네 커뮤니티의 모든 게시글을 확인할 수 있습니다',
        };

  return (
    <div className="container mx-auto px-4 max-w-5xl py-6">
      <div className="mt-5 mb-8">
        <h1 className="text-3xl font-bold mb-2">{boardInfo.title}</h1>
        <p className="text-gray-600 text-sm">{boardInfo.description}</p>
      </div>

      <PostList
        boardSlug={boardSlug}
        showBoardName={!boardSlug}
        currentPage={currentPage}
      />
    </div>
  );
}
