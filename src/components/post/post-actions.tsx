'use client';

import { Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface PostActionsProps {
  initialLikes: number;
  commentsCount: number;
}

export function PostActions({ initialLikes, commentsCount }: PostActionsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="flex items-center gap-4 py-4">
      <button
        onClick={handleLike}
        className="flex items-center text-gray-700 hover:text-red-500 transition-colors"
      >
        <Heart
          className={`w-6 h-6 mr-1.5 ${
            isLiked || initialLikes > 0 ? 'fill-red-500 text-red-500' : ''
          }`}
        />
        <span className="font-medium">{likes}</span>
      </button>

      <button className="flex items-center text-gray-700 hover:text-blue-500 transition-colors">
        <MessageCircle className="w-6 h-6 mr-1.5" />
        <span className="font-medium">{commentsCount}</span>
      </button>
    </div>
  );
}
