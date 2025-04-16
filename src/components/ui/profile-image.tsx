'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProfileImageProps {
  src: string;
  alt: string;
  size: number;
  className?: string;
}

export function ProfileImage({
  src,
  alt,
  size,
  className = '',
}: ProfileImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={size}
      height={size}
      className={`object-cover ${className}`}
      onError={() => setImgSrc(`https://via.placeholder.com/${size}`)}
    />
  );
}
