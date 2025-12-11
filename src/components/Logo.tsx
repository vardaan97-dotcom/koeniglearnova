'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export default function Logo({ className = '', showTagline = true }: LogoProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <svg
        width="120"
        height="32"
        viewBox="0 0 120 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-auto"
      >
        {/* KOENIG text */}
        <text
          x="0"
          y="24"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="#0891b2"
          letterSpacing="2"
        >
          KOENIG
        </text>
      </svg>
      {showTagline && (
        <span className="text-[10px] text-cyan-600 tracking-wider mt-0.5">
          step forward
        </span>
      )}
    </div>
  );
}
