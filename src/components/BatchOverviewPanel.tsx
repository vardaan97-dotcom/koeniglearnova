'use client';

import React from 'react';
import { Users, Calendar, Clock, TrendingUp, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Batch } from '@/types';
import ProgressBar from './ProgressBar';

interface BatchOverviewPanelProps {
  batches: Batch[];
  className?: string;
  maxVisible?: number;
}

export default function BatchOverviewPanel({
  batches,
  className = '',
  maxVisible = 4,
}: BatchOverviewPanelProps) {
  const activeBatches = batches
    .filter((b) => b.status === 'active' || b.status === 'upcoming')
    .slice(0, maxVisible);

  const getStatusStyles = (status: Batch['status']) => {
    switch (status) {
      case 'active':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
        };
      case 'upcoming':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
        };
      case 'completed':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-600',
        };
    }
  };

  if (activeBatches.length === 0) {
    return (
      <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Active Batches</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No active batches</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Active Batches</h3>
            <p className="text-xs text-gray-500">{activeBatches.length} batches running</p>
          </div>
        </div>
        <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activeBatches.map((batch) => {
          const statusStyles = getStatusStyles(batch.status);

          return (
            <div
              key={batch.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {batch.name}
                    </h4>
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded-full capitalize',
                        statusStyles.bg,
                        statusStyles.text
                      )}
                    >
                      {batch.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <BookOpen className="w-3 h-3" />
                    {batch.courseCode}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>

              <div className="grid grid-cols-3 gap-4 text-xs mb-3">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  <span>{batch.learnersCount} learners</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(batch.startDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {Math.ceil(
                      (new Date(batch.endDate).getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}
                    d left
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Average Progress</span>
                  <span className="font-medium text-gray-700">{batch.averageProgress}%</span>
                </div>
                <ProgressBar progress={batch.averageProgress} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
