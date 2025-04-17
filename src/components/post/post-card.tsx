'use client';

import { MessageCircle, ThumbsUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface PostCardProps {
  id: string;
  title: string;
  content: string;
  authorNickname: string;
  isAnonymous: boolean;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  boardSlug: string;
  boardName?: string;
  imageUrl?: string;
}

export function PostCard({
  id,
  title,
  content,
  authorNickname,
  isAnonymous,
  likesCount,
  commentsCount,
  createdAt,
  boardName,
  imageUrl,
}: PostCardProps) {
  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffMin = Math.floor(diff / (1000 * 60));
    const diffHour = Math.floor(diff / (1000 * 60 * 60));
    const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffMin < 60) {
      return `${diffMin}분 전`;
    } else if (diffHour < 24) {
      return `${diffHour}시간 전`;
    } else if (diffDay < 7) {
      return `${diffDay}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };

  // 컨텐츠 요약
  const summarizeContent = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Link
      href={`/post/${id}`}
      className="block py-5 px-2 hover:bg-gray-50 transition-colors rounded-md"
    >
      <div className="flex gap-4 relative">
        <div className={`flex-1 ${imageUrl ? 'pr-24' : ''}`}>
          <div className="flex items-start mb-2">
            {boardName && (
              <span className="inline-block px-0.5 py-0 text-[10px] rounded-sm bg-gray-100 text-gray-700 border border-gray-200 mt-1.5 mr-1.5 whitespace-nowrap">
                {boardName}
              </span>
            )}
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {title}
            </h3>

            {imageUrl && (
              <div className="w-20 h-20 flex-shrink-0 ml-2 absolute right-0 top-0">
                <Image
                  src={imageUrl}
                  alt={title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {summarizeContent(content)}
          </p>
          <div className="flex items-center text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
            {/* 좋아요, 댓글 아이콘 (작성자 왼쪽에 배치) */}
            <div className="flex items-center mr-3 flex-shrink-0">
              {likesCount > 0 && (
                <span className="flex items-center mr-2">
                  <ThumbsUp className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span className="text-gray-600 font-medium">
                    {likesCount}
                  </span>
                </span>
              )}

              {commentsCount > 0 && (
                <span className="flex items-center">
                  <MessageCircle className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span className="text-gray-600 font-medium">
                    {commentsCount}
                  </span>
                </span>
              )}
            </div>

            <span className="font-medium text-gray-700 truncate">
              {isAnonymous ? '익명' : authorNickname}
            </span>
            <span className="mx-1.5 flex-shrink-0">·</span>
            <span className="truncate">{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
