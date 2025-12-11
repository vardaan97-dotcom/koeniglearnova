'use client';

import React from 'react';
import { Search, Filter, Download, Users, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExport: () => void;
  className?: string;
}

export default function SearchFilter({
  searchQuery,
  onSearchChange,
  onExport,
  className = '',
}: SearchFilterProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row items-stretch sm:items-center gap-4', className)}>
      {/* Learner Name Button */}
      <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cyan-200 rounded-full text-cyan-600 font-medium hover:bg-cyan-50 transition-colors">
        <Users className="w-4 h-4" />
        Learner Name
      </button>

      {/* Search Input */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      {/* Overall Progress Button */}
      <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-cyan-200 rounded-full text-cyan-600 font-medium hover:bg-cyan-50 transition-colors">
        <TrendingUp className="w-4 h-4" />
        Overall Progress
      </button>

      {/* Export Button */}
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-full font-medium hover:bg-cyan-700 transition-colors shadow-sm"
      >
        <Download className="w-4 h-4" />
        Download Excel
      </button>
    </div>
  );
}
