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
}
