'use client';

import React from 'react';
import { Calendar, Clock, AlertTriangle, ChevronRight, Award, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Deadline } from '@/types';

interface DeadlinesWidgetProps {
  deadlines: Deadline[];
  className?: string;
  maxVisible?: number;
}

export default function DeadlinesWidget({ deadlines, className = '', maxVisible = 5 }: DeadlinesWidgetProps) {
  const sortedDeadlines = [...deadlines]
    .filter((d) => !d.isCompleted)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, maxVisible);

  const getDeadlineIcon = (type: Deadline['type']) => {
    switch (type) {
      case 'exam':
        return Award;
      case 'course_end':
        return BookOpen;
      case 'voucher_expiry':
        return Clock;
      case 'assignment':
        return Calendar;
      default:
        return Calendar;
    }
  };

  const getUrgencyStyles = (date: string) => {
    const daysUntil = Math.ceil(
      (new Date(date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntil < 0) {
      return {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-700',
        badge: 'bg-red-100 text-red-700',
        label: 'Overdue',
      };
    } else if (daysUntil <= 3) {
      return {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-700',
        badge: 'bg-red-100 text-red-700',
        label: `${daysUntil}d left`,
      };
    } else if (daysUntil <= 7) {
      return {
        bg: 'bg-amber-50 border-amber-200',
        text: 'text-amber-700',
        badge: 'bg-amber-100 text-amber-700',
        label: `${daysUntil}d left`,
      };
    } else {
      return {
        bg: 'bg-gray-50 border-gray-200',
        text: 'text-gray-700',
        badge: 'bg-gray-100 text-gray-600',
        label: `${daysUntil}d left`,
      };
    }
  };

  if (sortedDeadlines.length === 0) {
    return (
      <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Upcoming Deadlines</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No upcoming deadlines</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Upcoming Deadlines</h3>
        </div>
        <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {sortedDeadlines.map((deadline) => {
          const Icon = getDeadlineIcon(deadline.type);
          const urgency = getUrgencyStyles(deadline.date);

          return (
            <div
              key={deadline.id}
              className={cn(
                'p-3 rounded-lg border transition-all hover:shadow-sm cursor-pointer',
                urgency.bg
              )}
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                  <Icon className={cn('w-4 h-4', urgency.text)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className={cn('font-medium text-sm', urgency.text)}>
                        {deadline.title}
                      </h4>
                      {deadline.learnerName && (
                        <p className="text-xs text-gray-500 mt-0.5">
                          {deadline.learnerName}
                        </p>
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap',
                        urgency.badge
                      )}
                    >
                      {urgency.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(deadline.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
