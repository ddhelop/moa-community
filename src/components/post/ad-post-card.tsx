'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, ThumbsUp } from 'lucide-react';

interface AdPostCardProps {
  title: string;
  content: string;
  imageUrl: string;
  linkUrl: string;
  sponsor: string;
  likesCount?: number;
  commentsCount?: number;
}

export function AdPostCard({
  title,
  content,
  imageUrl,
  linkUrl,
  sponsor,
  likesCount = 15,
  commentsCount = 8,
}: AdPostCardProps) {
  return (
    <Link href={linkUrl}>
      <div className="p-4 hover:bg-gray-50 transition-colors rounded-md relative">
        <div className="flex justify-between">
          <div className="flex-1 pr-20 w-full">
            <div className="flex items-center mb-1.5">
              <span className="text-xs font-medium px-2 py-0.5 bg-gray-800 text-white rounded-full mr-2">
                AD
              </span>
              <h3 className="text-lg font-medium truncate flex-1">{title}</h3>
            </div>

            <div className="flex items-center text-xs text-gray-500 mb-2">
              <span>{sponsor}</span>
            </div>

            <div className="w-full mb-2">
              <p className="text-gray-700 text-sm truncate max-w-full">
                {content}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-500">
              {likesCount > 0 && (
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  {likesCount}
                </span>
              )}
              {commentsCount > 0 && (
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {commentsCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {imageUrl && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="h-16 w-16 relative rounded-md overflow-hidden">
              <Image src={imageUrl} alt={title} fill className="object-cover" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
