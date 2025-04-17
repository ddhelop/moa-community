import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MOCK_POSTS } from '@/components/post/post-list';
import { formatRelativeTime } from '@/lib/utils';
import { ProfileImage } from '@/components/ui/profile-image';
import { CommentSection } from '@/components/post/comment-section';
import { PostActions } from '@/components/post/post-actions';

// Post 인터페이스 정의
interface Post {
  id: string;
  title: string;
  content: string;
  authorNickname: string;
  isAnonymous: boolean;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  boardSlug: string;
  boardName: string;
  imageUrl?: string;
}

// 목업 프로필 이미지 URL 생성 함수
const getProfileImage = (name: string) => {
  // 이름을 기반으로 일관된 프로필 이미지 생성
  const index = name.charCodeAt(0) % 10;
  return `/images/profiles/avatar${index}.jpg`;
};

// 목업 댓글 데이터
const MOCK_COMMENTS = [
  {
    id: '1',
    author: '이웃주민',
    content: '좋은 정보 감사합니다!',
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5분 전
    likes: 7,
    replies: [],
  },
  {
    id: '2',
    author: '망원동주민',
    content: '저도 궁금했던 내용이에요. 정말 유익한 글이네요.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
    likes: 3,
    replies: [
      {
        id: '2-1',
        author: '동네고양이',
        content: '추가 정보가 있으시면 공유해주세요!',
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30분 전
        likes: 5,
      },
      {
        id: '2-2',
        author: '망원동주민',
        content: '네! 조만간 추가 내용으로 새 글을 작성할 예정입니다 :)',
        createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15분 전
        likes: 2,
      },
    ],
  },
  {
    id: '3',
    author: '마포구민',
    content:
      '다른 의견이 있을 수 있을 것 같아요. 저는 조금 다르게 생각하는데요...',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5시간 전
    likes: 0,
    replies: [],
  },
  {
    id: '4',
    author: '커피러버',
    content: '이런 글 자주 올려주세요! 정말 도움이 많이 됩니다.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1일 전
    likes: 12,
    replies: [],
  },
];

// Next.js 15에서 요구하는 타입
interface PostPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PostDetailPage(props: PostPageProps) {
  const params = await props.params;
  const { id } = params;

  const post = MOCK_POSTS.find((post) => post.id === id) as Post | undefined;

  if (!post) {
    notFound();
  }

  // 댓글 개수에 따라 목업 댓글 생성
  const comments =
    post.commentsCount > 0
      ? MOCK_COMMENTS.slice(
          0,
          Math.min(post.commentsCount, MOCK_COMMENTS.length)
        )
      : [];

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* 뒤로가기 링크 */}
      <Link
        href={`/posts?board=${post.boardSlug}`}
        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        {post.boardName}으로 돌아가기
      </Link>

      {/* 게시글 헤더 */}
      <div className="pb-4 mb-6">
        <span className="inline-block px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 mb-3">
          {post.boardName}
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h1>
        <div className="flex items-center text-sm text-gray-500">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-100">
              <ProfileImage
                src={getProfileImage(post.authorNickname)}
                alt={post.authorNickname}
                size={32}
              />
            </div>
            <div>
              <span className="font-medium text-gray-700 block">
                {post.isAnonymous ? '익명' : post.authorNickname}
              </span>
              <span className="text-xs">
                {formatRelativeTime(post.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 게시글 본문 */}
      <div className="prose max-w-none mb-8">
        <p className="text-gray-800 whitespace-pre-line mb-6">{post.content}</p>

        {post.imageUrl && (
          <div className="my-6">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={800}
              height={500}
              className="rounded-lg w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}
      </div>

      {/* 좋아요, 댓글 아이콘 */}
      <PostActions
        initialLikes={post.likesCount}
        commentsCount={post.commentsCount}
      />

      {/* 댓글 영역 */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">댓글 {post.commentsCount}개</h3>

        <CommentSection comments={comments} />
      </div>
    </div>
  );
}
