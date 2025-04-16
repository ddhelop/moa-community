'use client';

import { toast as sonnerToast } from 'sonner';

type ToastProps = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
};

export const toast = ({
  title,
  description,
  variant = 'default',
  duration = 3000,
}: ToastProps) => {
  return sonnerToast(title || description, {
    description: title ? description : undefined,
    duration,
    className:
      variant === 'destructive'
        ? 'bg-red-50 border-red-200 text-red-600'
        : undefined,
  });
};
