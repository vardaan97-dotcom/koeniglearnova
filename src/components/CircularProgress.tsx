'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  showValue?: boolean;
  valueFormat?: 'percentage' | 'fraction';
  colorClass?: string;
  bgColorClass?: string;
  className?: string;
}

export default function CircularProgress({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  label,
  sublabel,
  showValue = true,
  valueFormat = 'percentage',
  colorClass,
  bgColorClass = 'stroke-sky-100',
  className = '',
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const offset = circumference - (percentage / 100) * circumference;

  const getColorClass = () => {
    if (colorClass) return colorClass;
    if (percentage >= 100) return 'stroke-emerald-500';
    if (percentage >= 75) return 'stroke-cyan-500';
    if (percentage >= 50) return 'stroke-cyan-600';
    return 'stroke-amber-500';
  };

  const displayValue = () => {
    if (valueFormat === 'fraction') {
      return `${value}/${max}`;
    }
    return `${Math.round(percentage)}%`;
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="circular-progress"
          width={size}
          height={size}
        >
          {/* Background circle */}
          <circle
            className={bgColorClass}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            className={cn('circular-progress-bar', getColorClass())}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-700">
              {displayValue()}
            </span>
          </div>
        )}
      </div>
      {label && (
        <span className="mt-2 text-xs font-medium text-gray-600 text-center">
          {label}
        </span>
      )}
      {sublabel && (
        <span className="text-[10px] text-gray-400 text-center">
          {sublabel}
        </span>
      )}
    </div>
  );
}
