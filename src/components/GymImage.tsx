import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';

interface GymImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  className?: string;
  aspectClass?: string;
}

export const GymImage: React.FC<GymImageProps> = ({
  src,
  alt = 'Gym fitness photo',
  fallbackTitle = 'Apex Iron Gym',
  className = '',
  aspectClass = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-zinc-900 ${aspectClass} ${className}`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          {...props}
        />
      ) : null}

      {/* Styled Zero-Broken-Image Fallback */}
      {(hasError || !src || !isLoaded) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-neutral-900 ${
            isLoaded && !hasError ? 'pointer-events-none opacity-0' : 'opacity-100'
          }`}
        >
          {/* Subtle geometric grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-2">
              <Dumbbell className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-xs font-semibold tracking-wider text-zinc-300 uppercase font-display">
              {fallbackTitle}
            </p>
            <span className="text-[10px] text-zinc-500 mt-1">Apex High-Performance Facility</span>
          </div>
        </div>
      )}
    </div>
  );
};
