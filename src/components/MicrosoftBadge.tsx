'use client';

import React from 'react';

interface MicrosoftBadgeProps {
  className?: string;
}

export default function MicrosoftBadge({ className = '' }: MicrosoftBadgeProps) {
  return (
    <div className={`flex flex-col items-start bg-white rounded-lg border border-gray-200 p-3 ${className}`}>
      {/* Microsoft Logo */}
      <div className="flex items-center gap-2 mb-2">
        <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
          <div className="bg-[#f25022] w-full h-full"></div>
          <div className="bg-[#7fba00] w-full h-full"></div>
          <div className="bg-[#00a4ef] w-full h-full"></div>
          <div className="bg-[#ffb900] w-full h-full"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-gray-800">Microsoft</span>
          <span className="text-[8px] text-gray-500">Solutions Partner</span>
        </div>
      </div>
      <span className="text-[8px] text-gray-500 mb-2">Microsoft Cloud</span>

      {/* Training Services Badge */}
      <div className="bg-gray-700 text-white text-[8px] px-2 py-1 rounded mb-1">
        Training Services
      </div>
      <span className="text-xs font-semibold text-gray-800">Microsoft</span>
    </div>
  );
}
