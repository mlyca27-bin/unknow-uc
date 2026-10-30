import React from 'react';

interface UCLogoProps {
  className?: string;
  size?: number;
}

export const UCLogo: React.FC<UCLogoProps> = ({ className = 'w-10 h-10', size = 42 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`rounded-full shrink-0 select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="goldPlate" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FFF2A3" />
          <stop offset="25%" stopColor="#FFCC00" />
          <stop offset="65%" stopColor="#D98A00" />
          <stop offset="100%" stopColor="#7E4700" />
        </radialGradient>
        <radialGradient id="innerPlate" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="50%" stopColor="#F5B300" />
          <stop offset="100%" stopColor="#A86200" />
        </radialGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.6" />
        </filter>
        <linearGradient id="textGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#FFE57F" />
          <stop offset="100%" stopColor="#B36B00" />
        </linearGradient>
      </defs>

      {/* Outer Coin Edge with Bevel */}
      <circle cx="50" cy="50" r="47" fill="url(#goldPlate)" stroke="#FFE880" strokeWidth="2.5" />
      
      {/* Outer Rim Pattern Ring */}
      <circle cx="50" cy="50" r="41" stroke="#9A5600" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />
      
      {/* Inner Depressed Face */}
      <circle cx="50" cy="50" r="36" fill="url(#innerPlate)" stroke="#FFE27A" strokeWidth="1.8" filter="url(#shadow)" />
      
      {/* Subtle Inner Ring */}
      <circle cx="50" cy="50" r="32" stroke="#874700" strokeWidth="1" strokeDasharray="2 1.5" opacity="0.6" />

      {/* UC Center Lettering */}
      <text
        x="50"
        y="58"
        textAnchor="middle"
        fontFamily="'Arial Black', 'Impact', sans-serif"
        fontWeight="900"
        fontSize="30"
        letterSpacing="-0.5"
        fill="url(#textGrad)"
        stroke="#472600"
        strokeWidth="2.2"
        strokeLinejoin="round"
        filter="url(#shadow)"
      >
        UC
      </text>

      {/* Top Specular Highlight */}
      <path
        d="M 28 22 A 32 32 0 0 1 72 22 A 36 36 0 0 0 28 22 Z"
        fill="#FFFFFF"
        opacity="0.45"
      />
    </svg>
  );
};
