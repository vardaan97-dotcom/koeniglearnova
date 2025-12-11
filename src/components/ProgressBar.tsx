'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

export default function ProgressBar({
  progress,
  showLabel = true,
  size = 'md',
  className = '',
  animated = true,
}: ProgressBarProps) {
  const getProgressColor = () => {
    if (progress >= 100) return 'bg-emerald-500';
    if (progress >= 75) return 'bg-cyan-500';
    if (progress >= 50) return 'bg-cyan-600';
    return 'bg-amber-500';
  };

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('flex items-center gap-3 w-full', className)}>
      <div className={cn('flex-1 bg-sky-100 rounded-full overflow-hidden', sizeStyles[size])}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            getProgressColor(),
            animated && 'animate-progress'
          )}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {showLabel && (
        <span
          className={cn(
            'text-sm font-medium text-gray-700 min-w-[3rem] text-right',
            progress >= 100 && 'text-emerald-600'
          )}
        >
          {progress}%
        </span>
      )}
    </div>
  );
}
