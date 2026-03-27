import React from 'react';
import { MakeASiteLogoIcon } from '../Logo/MakeASiteLogo';

/**
 * Professional MakeASite Animated Loader
 * Features:
 * - Animated logo with rotating gradient
 * - Loading pulse animation
 * - Optional progress indicator
 * - Dark mode support
 */

export const MakeASiteLoader = ({ 
  fullScreen = true, 
  showText = true,
  message = 'Building your experience...',
  progress = null,
  size = 'lg',
  className = ''
}) => {
  const loaderContent = (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      {/* Animated Logo Container */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 animate-spin opacity-20" style={{ width: '120px', height: '120px' }} />
        
        {/* Middle pulsing ring */}
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-400 animate-spin" style={{ width: '112px', height: '112px', animationDuration: '2s', animationDirection: 'reverse' }} />
        
        {/* Logo */}
        <div className="relative flex items-center justify-center" style={{ width: '96px', height: '96px' }}>
          <MakeASiteLogoIcon size="2xl" />
        </div>
      </div>

      {/* Loading Text */}
      {showText && (
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide">
            {message}
          </p>
          
          {/* Animated Dots */}
          <div className="flex justify-center gap-1 mt-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {progress !== null && (
        <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 top-0 left-0 w-full h-screen bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm flex items-center justify-center z-50">
        {loaderContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {loaderContent}
    </div>
  );
};

/**
 * Lightweight inline loader (for smaller containers)
 */
export const MakeASiteLoaderInline = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: '32px',
    md: '48px',
    lg: '64px'
  };

  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: sizeMap[size], height: sizeMap[size] }}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 animate-spin opacity-20" />
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2/3 h-2/3">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="23" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
              <path 
                d="M 12 28 Q 10 28 10 26 Q 10 22 14 20 Q 16 14 22 14 Q 28 14 30 20 Q 34 22 34 26 Q 34 28 32 28 Z" 
                fill="#3b82f6"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton Loader (for content placeholders)
 */
export const MakeASiteSkeleton = ({ count = 3, type = 'card', className = '' }) => {
  if (type === 'card') {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg h-32 animate-pulse" />
        ))}
      </div>
    );
  }

  // Default list skeleton
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse mb-2" />
            <div className="h-3 bg-gray-100 dark:bg-gray-600 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MakeASiteLoader;
