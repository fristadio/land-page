import logoWhite from '@/assets/brand/logo_fristad_white.png';
import React, { useEffect, useState } from 'react';

interface FristadLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'full' | 'symbol';
  className?: string;
}

export function FristadLogo({ 
  size = 'md', 
  variant = 'full',
  className = '' 
}: FristadLogoProps) {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    '2xl': 96
  } as const;

  const logoSize = sizeMap[size];
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = logoWhite;
    img.onload = () => {
      if (img.naturalHeight > 0) {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      }
    };
  }, []);

  if (variant === 'symbol') {
    return (
      <div className={`flex items-center ${className}`} style={{ lineHeight: 0 }}>
        {/* Light: usa mask com a cor do texto */}
        <div
          className="block dark:hidden"
          style={{
            height: logoSize,
            width: aspectRatio ? logoSize * aspectRatio : logoSize * 3,
            backgroundColor: 'var(--foreground)',
            WebkitMaskImage: `url(${logoWhite})`,
            maskImage: `url(${logoWhite})`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskPosition: 'left center',
            maskPosition: 'left center',
          } as React.CSSProperties}
        />
        {/* Dark: usa o arquivo branco original */}
        <img
          src={logoWhite}
          alt="Fristad"
          width={aspectRatio ? logoSize * aspectRatio : undefined}
          height={logoSize}
          className="hidden dark:block"
          style={{ filter: 'none' }}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center ${className}`} style={{ lineHeight: 0 }}>
      {/* Light: logo na cor do texto via mask */}
      <div
        className="block dark:hidden"
        style={{
          height: logoSize,
          width: aspectRatio ? logoSize * aspectRatio : logoSize * 3,
          backgroundColor: 'var(--foreground)',
          WebkitMaskImage: `url(${logoWhite})`,
          maskImage: `url(${logoWhite})`,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskPosition: 'left center',
          maskPosition: 'left center',
        } as React.CSSProperties}
      />
      {/* Dark: logo branco original */}
      <img
        src={logoWhite}
        alt="Fristad"
        width={aspectRatio ? logoSize * aspectRatio : undefined}
        height={logoSize}
        className="hidden dark:block"
        style={{ filter: 'none' }}
      />
    </div>
  );
}