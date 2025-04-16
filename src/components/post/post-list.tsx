import { PostCard } from './post-card';
import { AdPostCard } from './ad-post-card';
import { Pagination } from '@/components/ui/pagination';

// 목업 데이터
export const MOCK_POSTS = [
  {
    id: '1',
    title: '마포구 맛집 추천해주세요',
    content: '최근에 마포구로 이사와서 맛집을 찾고 있어요. 추천 부탁드립니다!',
    authorNickname: '새이웃',
    isAnonymous: false,
    likesCount: 5,
    commentsCount: 12,
    createdAt: new Date('2024-04-14T10:30:00'),
    boardSlug: 'free',
    boardName: '자유게시판',
    imageUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop',
  },
  {
    id: '2',
    title: '홍대입구역 근처 헬스장 정보',
    content: '헬스장을 알아보고 있는데 가격 정보나 추천 헬스장 있을까요?',
    authorNickname: '헬린이',
    isAnonymous: false,
    likesCount: 0,
    commentsCount: 5,
    createdAt: new Date('2024-04-14T09:15:00'),
    boardSlug: 'free',
    boardName: '자유게시판',
  },
  {
    id: '3',
    title: '마포구청 민원 처리 경험',
    content: '마포구청에서 민원 처리가 빨라졌네요. 다들 경험 어떠세요?',
    authorNickname: '구민A',
    isAnonymous: true,
    likesCount: 10,
    commentsCount: 0,
    createdAt: new Date('2024-04-13T16:45:00'),
    boardSlug: 'local',
    boardName: '지역소식',
    imageUrl:
      'https://images.unsplash.com/photo-1577415124269-fc1140a69e91?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: '4',
    title: '합정동 카페 알바 구합니다',
    content: '주말 오전 파트타임 알바생 구합니다. 시급 11000원, 경력자 우대',
    authorNickname: '카페사장',
    isAnonymous: false,
    likesCount: 1,
    commentsCount: 3,
    createdAt: new Date('2024-04-13T14:30:00'),
    boardSlug: 'promo',
    boardName: '홍보게시판',
    imageUrl:
      'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2671&auto=format&fit=crop',
  },
  {
    id: '5',
    title: '망원시장 청년몰 이벤트 안내',
    content: '이번 주말 망원시장 청년몰에서 할인 이벤트가 열립니다.',
    authorNickname: '시장지기',
    isAnonymous: false,
    likesCount: 0,
    commentsCount: 0,
    createdAt: new Date('2024-04-13T11:20:00'),
    boardSlug: 'promo',
    boardName: '홍보게시판',
  },
  {
    id: '8',
    title: '마포구 자전거 도로 확장 계획에 대한 의견',
    content:
      '마포구에서 자전거 도로 확장 계획을 발표했는데, 이에 대한 주민들의 의견이 궁금합니다. 특히 출퇴근 시간에 자전거를 이용하시는 분들의 생각이 궁금해요. 자전거 도로가 확장되면 교통 체증이 줄어들까요, 아니면 오히려 차로가 줄어들어 더 복잡해질까요?',
    authorNickname: '자전거맨',
    isAnonymous: false,
    likesCount: 7,
    commentsCount: 15,
    createdAt: new Date('2024-04-15T15:20:00'),
    boardSlug: 'free',
    boardName: '자유게시판',
  },
];

// 추가 목업 데이터 생성 함수
function generateMoreMockPosts() {
  const boardTypes = ['free', 'local', 'promo'];
  const boardNames: Record<string, string> = {
    free: '자유게시판',
    local: '지역소식',
    promo: '홍보게시판',
  };

  const topics = [
    '마포구',
    '홍대',
    '합정',
    '망원',
    '상암',
    '연남동',
    '성산동',
    '서교동',
    '공덕',
    '도화동',
    '아현동',
    '대흥동',
    '용강동',
  ];

  const actions = [
    '맛집',
    '카페',
    '헬스장',
    '미용실',
    '마트',
    '공원',
    '지하철역',
    '버스정류장',
    '자전거도로',
    '학원',
    '책방',
    '전시',
    '주차장',
    '주택',
    '아파트',
    '원룸',
    '교통',
    '택배',
    '마을회관',
    '도서관',
  ];

  const authors = [
    '동네주민',
    '마포사람',
    '홍대인',
    '망원동주민',
    '공덕주민',
    '연트럴파크',
    '걷고싶은거리',
    '카페지기',
    '동네고양이',
    '상암MBC',
    '망원시장',
    '한강뷰',
    '공원산책러',
    '자전거족',
    '버스승객',
    '지하철통학',
    '도서관벌레',
    '테니스인',
    '축구매니아',
    '농구왕',
    '헬스인',
    '산책러',
    '카페투어',
    '책읽는사람',
  ];

  const contents = [
    '정보 공유합니다',
    '추천해주세요',
    '어떻게 생각하시나요?',
    '경험 있으신 분?',
    '후기 남깁니다',
    '공지사항입니다',
    '궁금한 점이 있어요',
    '도움이 필요해요',
    '의견을 구합니다',
    '모집합니다',
    '같이 하실 분?',
    '이벤트 안내',
    '불편사항 접수',
    '개선 요청드립니다',
    '감사합니다',
    '질문있어요',
    '추천받고 싶어요',
    '정보 부탁드려요',
    '경험담 나눠요',
    '관심 있으신 분?',
  ];

  const additionalPosts = [];

  // 약 150개의 게시물 생성 (기존 + 추가 = 10페이지 이상)
  for (let i = 30; i < 180; i++) {
    const boardIdx = i % 3;
    const boardSlug = boardTypes[boardIdx];
    const topicIdx = i % topics.length;
    const actionIdx = (i * 3) % actions.length;
    const authorIdx = (i * 7) % authors.length;
    const contentIdx = (i * 5) % contents.length;

    // 좋아요와 댓글 수는 0~50 사이의 랜덤값
    const likesCount = Math.floor(Math.random() * 51);
    const commentsCount = Math.floor(Math.random() * 51);

    // 날짜는 최근 30일 내의 랜덤 날짜
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    // 이미지 있을 확률 30%
    const hasImage = Math.random() < 0.3;
    const imageNumber = Math.floor(Math.random() * 10) + 1;

    additionalPosts.push({
      id: `${i}`,
      title: `${topics[topicIdx]} ${actions[actionIdx]} ${contents[contentIdx]}`,
      content: `${topics[topicIdx]}에서 ${actions[actionIdx]}에 관한 정보입니다. ${contents[contentIdx]} 많은 의견 부탁드립니다.`,
      authorNickname: authors[authorIdx],
      isAnonymous: Math.random() < 0.2, // 20% 확률로 익명
      likesCount,
      commentsCount,
      createdAt: date,
      boardSlug,
      boardName: boardNames[boardSlug],
      ...(hasImage && {
        imageUrl: `https://source.unsplash.com/random/300x200?sig=${imageNumber}`,
      }),
    });
  }

  return additionalPosts;
}

// 맛집 게시판에 추가 목업 데이터 생성
function generateMoreFoodPosts() {
  const foodTypes = [
    '한식',
    '일식',
    '중식',
    '양식',
    '분식',
    '패스트푸드',
    '베이커리',
    '디저트',
    '칵테일',
    '맥주',
    '와인',
    '커피',
    '브런치',
    '비건',
    '채식',
    '육류',
    '해산물',
  ];

  const locations = [
    '홍대입구',
    '합정역',
    '망원동',
    '상수동',
    '연남동',
    '서교동',
    '성산동',
    '공덕역',
    '마포구청',
    '대흥동',
    '신촌',
    '이대',
    '아현동',
    '용강동',
  ];

  const additionalFoodPosts = [];

  // 50개의 맛집 게시물 생성
  for (let i = 30; i < 80; i++) {
    const foodIdx = i % foodTypes.length;
    const locationIdx = (i * 3) % locations.length;

    // 좋아요와 댓글 수는 0~50 사이의 랜덤값
    const likesCount = Math.floor(Math.random() * 51);
    const commentsCount = Math.floor(Math.random() * 51);

    // 날짜는 최근 30일 내의 랜덤 날짜
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    // 이미지 있을 확률 60% (맛집은 이미지가 더 많음)
    const hasImage = Math.random() < 0.6;
    const imageNumber = Math.floor(Math.random() * 20) + 100;

    additionalFoodPosts.push({
      id: `food-${i}`,
      title: `${locations[locationIdx]} ${foodTypes[foodIdx]} 맛집 추천`,
      content: `${locations[locationIdx]}에 새로 생긴 ${foodTypes[foodIdx]} 맛집을 다녀왔어요. 가격도 합리적이고 맛도 좋았습니다.`,
      authorNickname: `맛집탐험가${i % 10}`,
      isAnonymous: false,
      likesCount,
      commentsCount,
      createdAt: date,
      boardSlug: 'food',
      boardName: '맛집게시판',
      ...(hasImage && {
        imageUrl: `https://source.unsplash.com/random/300x200?food&sig=${imageNumber}`,
      }),
    });
  }

  return additionalFoodPosts;
}

// 핫게시판에 추가 목업 데이터 생성
function generateMoreHotPosts() {
  const hotTopics = [
    '문화',
    '축제',
    '교통',
    '부동산',
    '교육',
    '안전',
    '환경',
    '복지',
    '정치',
    '경제',
    '스포츠',
    '취업',
    '창업',
    '예술',
    '공연',
    '도서관',
  ];

  const additionalHotPosts = [];

  // 30개의 핫게시판 게시물 생성
  for (let i = 30; i < 60; i++) {
    const topicIdx = i % hotTopics.length;

    // 핫게시판은 좋아요와 댓글 수가 많음 (20~100)
    const likesCount = Math.floor(Math.random() * 81) + 20;
    const commentsCount = Math.floor(Math.random() * 81) + 20;

    // 날짜는 최근 14일 내의 랜덤 날짜 (최신 내용이 더 많음)
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 14));

    // 핫게시판은 이미지 있을 확률 60%로 높임
    const hasImage = Math.random() < 0.6;
    const imageNumber = Math.floor(Math.random() * 30) + 200;

    additionalHotPosts.push({
      id: `hot-${i}`,
      title: `마포구 ${hotTopics[topicIdx]} 관련 중요 소식`,
      content: `마포구에서 ${hotTopics[topicIdx]}와 관련된 중요한 변화가 있어 공유드립니다. 많은 관심 부탁드립니다.`,
      authorNickname: `마포주민${i % 15}`,
      isAnonymous: false,
      likesCount,
      commentsCount,
      createdAt: date,
      boardSlug: 'hot',
      boardName: '핫게시판',
      ...(hasImage && {
        imageUrl: `https://source.unsplash.com/random/300x200?city&sig=${imageNumber}`,
      }),
    });
  }

  return additionalHotPosts;
}

// 맛집 게시판 목업 데이터 추가
const FOOD_POSTS = [
  {
    id: '10',
    title: '망원동 스시 맛집 발견!',
    content:
      '망원동에서 합리적인 가격에 퀄리티 좋은 스시를 먹을 수 있는 곳을 발견했어요.',
    authorNickname: '맛집헌터',
    isAnonymous: false,
    likesCount: 23,
    commentsCount: 8,
    createdAt: new Date('2024-04-16T18:30:00'),
    boardSlug: 'food',
    boardName: '맛집게시판',
    imageUrl:
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: '11',
    title: '합정 쌀국수 맛집 추천',
    content: '합정에 새로 생긴 쌀국수 가게인데 국물이 진하고 고기도 푸짐해요.',
    authorNickname: '푸드러버',
    isAnonymous: false,
    likesCount: 15,
    commentsCount: 12,
    createdAt: new Date('2024-04-15T12:40:00'),
    boardSlug: 'food',
    boardName: '맛집게시판',
    imageUrl:
      'https://images.unsplash.com/photo-1576577445504-6af96477db52?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: '12',
    title: '연남동 숨은 디저트 카페',
    content:
      '연남동 골목에 있는 작은 디저트 카페인데 티라미수가 정말 맛있어요!',
    authorNickname: '디저트킹',
    isAnonymous: false,
    likesCount: 8,
    commentsCount: 3,
    createdAt: new Date('2024-04-14T15:20:00'),
    boardSlug: 'food',
    boardName: '맛집게시판',
  },
];

// hot 게시판을 위한 모의 데이터 추가
MOCK_POSTS.push(
  {
    id: '6',
    title: '마포구 청년 문화 축제 안내',
    content:
      '이번 주말에 마포구 청년 문화 축제가 열립니다. 많은 참여 바랍니다!',
    authorNickname: '문화지기',
    isAnonymous: false,
    likesCount: 25,
    commentsCount: 18,
    createdAt: new Date('2024-04-15T09:00:00'),
    boardSlug: 'hot',
    boardName: '핫게시판',
    imageUrl:
      'https://images.unsplash.com/photo-1472653816316-3ad6f10a6592?q=80&w=2669&auto=format&fit=crop',
  },
  {
    id: '7',
    title: '마포구 버스 노선 개편 예정',
    content:
      '다음 달부터 마포구 버스 노선이 개편될 예정입니다. 자세한 내용 확인하세요.',
    authorNickname: '교통알리미',
    isAnonymous: false,
    likesCount: 30,
    commentsCount: 22,
    createdAt: new Date('2024-04-14T14:00:00'),
    boardSlug: 'hot',
    boardName: '핫게시판',
    imageUrl:
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: '9',
    title: '상암동 디지털미디어시티 개발 현황 보고',
    content:
      '상암동 디지털미디어시티(DMC) 지역의 최근 개발 현황과 앞으로의 계획에 대해 정리한 보고서입니다. 최근 몇 년간 IT 기업들의 입주가 늘어나면서 지역 경제 활성화에 크게 기여하고 있으며, 향후 추가적인 인프라 구축과 생활 편의시설 확충이 계획되어 있습니다. 주민 의견 수렴을 통해 더 나은 발전 방향을 모색하고 있습니다.',
    authorNickname: '마포구청',
    isAnonymous: false,
    likesCount: 42,
    commentsCount: 27,
    createdAt: new Date('2024-04-16T11:30:00'),
    boardSlug: 'hot',
    boardName: '핫게시판',
    imageUrl:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2670&auto=format&fit=crop',
  }
);

// 맛집 게시판 데이터 추가
MOCK_POSTS.push(...FOOD_POSTS);

// 추가 목업 데이터 생성 및 추가
const ADDITIONAL_POSTS = generateMoreMockPosts();
const ADDITIONAL_FOOD_POSTS = generateMoreFoodPosts();
const ADDITIONAL_HOT_POSTS = generateMoreHotPosts();

// 모든 추가 데이터를 MOCK_POSTS에 추가
MOCK_POSTS.push(
  ...ADDITIONAL_POSTS,
  ...ADDITIONAL_FOOD_POSTS,
  ...ADDITIONAL_HOT_POSTS
);

// 광고 목업 데이터
const AD_POSTS = [
  {
    id: 'ad1',
    title: '마포구 배달앱 출시 기념 이벤트',
    content:
      '마포구 로컬 배달앱 "마포잇" 출시 기념 첫 주문 50% 할인 쿠폰 제공!',
    imageUrl:
      'https://images.unsplash.com/photo-1626447852944-4909a1f996d4?q=80&w=2670&auto=format&fit=crop',
    linkUrl: '/posts/ad1',
    sponsor: '마포잇',
    likesCount: 32,
    commentsCount: 14,
  },
  {
    id: 'ad2',
    title: '합정 신상 카페 오픈 이벤트',
    content: '합정역 3번 출구 "커피월드" 오픈! 첫 방문 아메리카노 1+1',
    imageUrl:
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=2670&auto=format&fit=crop',
    linkUrl: '/posts/ad2',
    sponsor: '커피월드',
    likesCount: 24,
    commentsCount: 7,
  },
];

interface PostListProps {
  boardSlug?: string;
  showBoardName?: boolean;
  currentPage?: number;
}

export function PostList({
  boardSlug,
  showBoardName = false,
  currentPage = 1,
}: PostListProps) {
  // 페이지당 게시물 수
  const ITEMS_PER_PAGE = 15;

  // 해당 게시판의 게시물 필터링
  const filteredPosts = boardSlug
    ? MOCK_POSTS.filter((post) => post.boardSlug === boardSlug)
    : MOCK_POSTS;

  // 전체 게시물 수
  const totalItems = filteredPosts.length;

  // 현재 페이지에 표시할 게시물
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // 광고 선택 (게시판 별로 다른 광고 표시)
  const adIndex = boardSlug === 'food' ? 1 : 0;
  const adPost = AD_POSTS[adIndex];

  // 페이지네이션 기본 경로 설정
  const basePath = boardSlug ? `/board/${boardSlug}` : '/posts';

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">게시글이 없습니다.</div>
    );
  }

  return (
    <div>
      <div className="divide-y divide-gray-100">
        {/* 첫 번째 위치에 광고 카드 표시 */}
        <div>
          <AdPostCard {...adPost} />
        </div>

        {/* 일반 게시글 표시 */}
        {currentPosts.map((post) => (
          <div key={post.id}>
            <PostCard
              {...post}
              boardName={showBoardName ? post.boardName : undefined}
            />
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalItems > ITEMS_PER_PAGE && (
        <div className="mt-8 mb-12">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            basePath={basePath}
          />
        </div>
      )}
    </div>
  );
}
