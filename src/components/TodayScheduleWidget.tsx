'use client';

import React from 'react';
import { Clock, Video, Users, MapPin, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ScheduleSession } from '@/types';

interface TodayScheduleWidgetProps {
  sessions: ScheduleSession[];
  className?: string;
}

export default function TodayScheduleWidget({ sessions, className = '' }: TodayScheduleWidgetProps) {
  // Filter for today's sessions
  const today = new Date().toISOString().split('T')[0];
  const todaySessions = sessions
    .filter((s) => s.date === today)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const getStatusStyles = (status: ScheduleSession['status']) => {
    switch (status) {
      case 'ongoing':
        return {
          bg: 'bg-green-50 border-green-200',
          badge: 'bg-green-100 text-green-700',
          dot: 'bg-green-500',
        };
      case 'upcoming':
        return {
          bg: 'bg-blue-50 border-blue-200',
          badge: 'bg-blue-100 text-blue-700',
          dot: 'bg-blue-500',
        };
      case 'completed':
        return {
          bg: 'bg-gray-50 border-gray-200',
          badge: 'bg-gray-100 text-gray-600',
          dot: 'bg-gray-400',
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          badge: 'bg-gray-100 text-gray-600',
          dot: 'bg-gray-400',
        };
    }
  };

  if (todaySessions.length === 0) {
    return (
      <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Today&apos;s Schedule</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No sessions scheduled for today</p>
          <button className="mt-3 text-sm text-cyan-600 hover:text-cyan-700 font-medium">
            View Full Schedule
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Today&apos;s Schedule</h3>
            <p className="text-xs text-gray-500">{todaySessions.length} sessions</p>
          </div>
        </div>
        <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {todaySessions.map((session) => {
          const styles = getStatusStyles(session.status);

          return (
            <div
              key={session.id}
              className={cn(
                'p-4 rounded-lg border transition-all hover:shadow-sm cursor-pointer',
                styles.bg
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full', styles.dot)} />
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {session.title}
                    </h4>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.startTime} - {session.endTime}
                    </span>
                    {session.isOnline ? (
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        Online
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {session.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {session.attendees} attendees
                    </span>
                  </div>
                </div>

                <span
                  className={cn(
                    'text-xs font-medium px-2 py-1 rounded-full capitalize whitespace-nowrap',
                    styles.badge
                  )}
                >
                  {session.status}
                </span>
              </div>

              {session.status === 'ongoing' && session.joinUrl && (
                <button className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                  <Video className="w-4 h-4" />
                  Join Session
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
