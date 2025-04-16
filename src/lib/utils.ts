import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 날짜를 상대적 시간 포맷으로 변환 (예: "10분 전", "1시간 전", "어제", "2일 전")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSec = Math.floor(diffInMs / 1000);
  const diffInMin = Math.floor(diffInSec / 60);
  const diffInHour = Math.floor(diffInMin / 60);
  const diffInDay = Math.floor(diffInHour / 24);

  if (diffInSec < 60) {
    return '방금 전';
  } else if (diffInMin < 60) {
    return `${diffInMin}분 전`;
  } else if (diffInHour < 24) {
    return `${diffInHour}시간 전`;
  } else if (diffInDay === 1) {
    return '어제';
  } else if (diffInDay < 7) {
    return `${diffInDay}일 전`;
  } else if (diffInDay < 30) {
    const weeks = Math.floor(diffInDay / 7);
    return `${weeks}주 전`;
  } else if (diffInDay < 365) {
    const months = Math.floor(diffInDay / 30);
    return `${months}개월 전`;
  } else {
    const years = Math.floor(diffInDay / 365);
    return `${years}년 전`;
  }
}
