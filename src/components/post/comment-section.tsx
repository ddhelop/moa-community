'use client';

import { Heart, Reply } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import { ProfileImage } from '@/components/ui/profile-image';
import { useState } from 'react';

interface CommentReply {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: Date;
  likes: number;
  replies: CommentReply[];
}

interface CommentSectionProps {
  comments: Comment[];
}

// 내부 프로필 이미지 URL 생성 함수
const getProfileImage = (name: string) => {
  // 이름을 기반으로 일관된 프로필 이미지 생성
  const index = name.charCodeAt(0) % 10;
  return `/images/profiles/avatar${index}.jpg`;
};

export function CommentSection({ comments }: CommentSectionProps) {
  const [commentText, setCommentText] = useState('');
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );
  const [likedReplies, setLikedReplies] = useState<Record<string, boolean>>({});
  const [showReplyInputFor, setShowReplyInputFor] = useState<string | null>(
    null
  );
  const [replyText, setReplyText] = useState('');

  const handleLikeComment = (commentId: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleLikeReply = (replyId: string) => {
    setLikedReplies((prev) => ({
      ...prev,
      [replyId]: !prev[replyId],
    }));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // In a real app, this would send the comment to an API
      alert('댓글이 등록되었습니다: ' + commentText);
      setCommentText('');
    }
  };

  const handleReplySubmit = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (replyText.trim()) {
      // In a real app, this would send the reply to an API
      alert(`댓글 ${commentId}에 답글이 등록되었습니다: ${replyText}`);
      setReplyText('');
      setShowReplyInputFor(null);
    }
  };

  // 공통 액션 버튼 스타일 - 좋아요 버튼용
  const getLikeButtonClasses = (isLiked: boolean) =>
    `flex items-center rounded-md px-2 py-1 ${
      isLiked
        ? 'text-red-500 bg-red-50 font-medium'
        : 'text-gray-500 hover:text-red-500 hover:bg-gray-50'
    }`;

  // 공통 액션 버튼 스타일 - 답글 버튼용
  const getReplyButtonClasses = (isActive: boolean) =>
    `flex items-center rounded-md px-2 py-1 ${
      isActive
        ? 'text-blue-500 bg-blue-50 font-medium'
        : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50'
    }`;

  return (
    <div>
      {/* 댓글 입력 */}
      <div className="mb-6">
        <form onSubmit={handleCommentSubmit}>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="댓글을 입력하세요..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              댓글 작성
            </button>
          </div>
        </form>
      </div>

      {/* 댓글 목록 */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              {/* 댓글 헤더 */}
              <div className="flex items-start mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-100 flex-shrink-0">
                  <ProfileImage
                    src={getProfileImage(comment.author)}
                    alt={comment.author}
                    size={32}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-800 text-sm mt-1">
                    {comment.content}
                  </p>

                  {/* 댓글 액션 - 좋아요 먼저, 그 다음 답글 */}
                  <div className="flex items-center mt-2 space-x-2 text-xs">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className={getLikeButtonClasses(
                        likedComments[comment.id]
                      )}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 mr-1.5 ${
                          likedComments[comment.id] ? 'fill-red-500' : ''
                        }`}
                      />
                      <span>
                        {likedComments[comment.id]
                          ? comment.likes + 1
                          : comment.likes}
                      </span>
                    </button>

                    <button
                      onClick={() =>
                        setShowReplyInputFor((prevId) =>
                          prevId === comment.id ? null : comment.id
                        )
                      }
                      className={getReplyButtonClasses(
                        showReplyInputFor === comment.id
                      )}
                    >
                      <Reply className="h-3.5 w-3.5 mr-1.5" />
                      답글
                    </button>
                  </div>

                  {/* 답글 입력 폼 */}
                  {showReplyInputFor === comment.id && (
                    <div className="mt-3">
                      <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                        <textarea
                          className="w-full border border-gray-200 rounded-md p-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={2}
                          placeholder="답글을 입력하세요..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end mt-1 space-x-2">
                          <button
                            type="button"
                            className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                            onClick={() => setShowReplyInputFor(null)}
                          >
                            취소
                          </button>
                          <button
                            type="submit"
                            className="px-3 py-1 text-xs text-white bg-blue-600 rounded-md hover:bg-blue-700"
                          >
                            등록
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>

              {/* 대댓글 섹션 */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="pl-10 mt-3 space-y-3">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="pt-3 border-t border-gray-100"
                    >
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-gray-100 flex-shrink-0">
                          <ProfileImage
                            src={getProfileImage(reply.author)}
                            alt={reply.author}
                            size={24}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700 text-xs">
                              {reply.author}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(reply.createdAt)}
                            </span>
                          </div>
                          <p className="text-gray-800 text-xs mt-1">
                            {reply.content}
                          </p>

                          {/* 대댓글 액션 - 좋아요 버튼만 (동일한 스타일로) */}
                          <div className="flex items-center mt-1.5 space-x-2 text-xs">
                            <button
                              onClick={() => handleLikeReply(reply.id)}
                              className={getLikeButtonClasses(
                                likedReplies[reply.id]
                              )}
                            >
                              <Heart
                                className={`h-3.5 w-3.5 mr-1.5 ${
                                  likedReplies[reply.id] ? 'fill-red-500' : ''
                                }`}
                              />
                              <span>
                                {likedReplies[reply.id]
                                  ? reply.likes + 1
                                  : reply.likes}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 border rounded-md">
          첫 번째 댓글을 남겨보세요!
        </div>
      )}
    </div>
  );
}
