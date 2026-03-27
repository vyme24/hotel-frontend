import React from 'react';

/**
 * MakeASite Logo Component
 * Professional tech-focused logo with cloud/website theme
 * Supports multiple variants and sizes
 */

export const MakeASiteLogoSVG = ({ 
  size = 'md', 
  showText = true, 
  variant = 'default',
  className = '' 
}) => {
  const sizeMap = {
    xs: '24',
    sm: '32',
    md: '48',
    lg: '64',
    xl: '96',
    '2xl': '128'
  };

  const dim = sizeMap[size] || '48';

  // Icon-only logo (can be used in navbar)
  const iconOnly = (
    <svg 
      viewBox="0 0 48 48" 
      width={dim} 
      height={dim} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle background */}
      <circle cx="24" cy="24" r="23" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5"/>
      
      {/* Cloud base shape */}
      <path 
        d="M 12 28 Q 10 28 10 26 Q 10 22 14 20 Q 16 14 22 14 Q 28 14 30 20 Q 34 22 34 26 Q 34 28 32 28 Z" 
        fill="#3b82f6"
      />
      
      {/* Website code brackets */}
      <g stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round">
        {/* Opening bracket */}
        <path d="M 16 20 L 14 24 L 16 28" />
        {/* Closing bracket */}
        <path d="M 32 20 L 34 24 L 32 28" />
        {/* Center dot */}
        <circle cx="24" cy="24" r="2" fill="#ffffff" />
      </g>
    </svg>
  );

  // Full logo with text
  const withText = (
    <div className={`flex items-center gap-2 ${className}`}>
      {iconOnly}
      <div className="flex flex-col leading-tight">
        <span className="font-black text-lg tracking-tighter text-gray-900 dark:text-white">
          MAKE<span className="font-light">ASITE</span>
        </span>
        <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400 uppercase tracking-widest">
          Builder
        </span>
      </div>
    </div>
  );

  return showText ? withText : iconOnly;
};

// Standalone versions for different contexts
export const MakeASiteLogoIcon = (props) => (
  <MakeASiteLogoSVG {...props} showText={false} />
);

export const MakeASiteLogoBrand = (props) => (
  <MakeASiteLogoSVG {...props} showText={true} />
);

// Email-safe version (returns pure SVG string for embedding)
export const MakeASiteLogoEmailHTML = (config = {}) => {
  const { bgColor = '#3b82f6', textColor = '#ffffff', size = '96' } = config;
  return `
    <svg viewBox="0 0 48 48" width="${size}" height="${size}" style="display: inline-block; margin: 0 auto;" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="23" fill="#eff6ff" stroke="${bgColor}" stroke-width="1.5"/>
      <path 
        d="M 12 28 Q 10 28 10 26 Q 10 22 14 20 Q 16 14 22 14 Q 28 14 30 20 Q 34 22 34 26 Q 34 28 32 28 Z" 
        fill="${bgColor}"
      />
      <g stroke="${textColor}" stroke-width="2" fill="none" stroke-linecap="round">
        <path d="M 16 20 L 14 24 L 16 28" />
        <path d="M 32 20 L 34 24 L 32 28" />
        <circle cx="24" cy="24" r="2" fill="${textColor}" />
      </g>
    </svg>
  `;
};

export default MakeASiteLogoSVG;
