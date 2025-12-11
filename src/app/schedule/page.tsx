'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Video,
  FileText,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { scheduleEvents, webinars } from '@/data/mockData';
import { cn, formatDate, formatTime, getStatusBadge } from '@/lib/utils';

type ViewMode = 'week' | 'month' | 'list';

export default function SchedulePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredEvents = scheduleEvents.filter((event) =>
    typeFilter === 'all' ? true : event.type === typeFilter
  );

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <Video className="w-4 h-4" />;
      case 'webinar':
        return <Video className="w-4 h-4" />;
      case 'exam':
        return <FileText className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'class':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'webinar':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'exam':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="w-7 h-7 text-cyan-600" />
            Schedule
          </h1>
          <p className="text-gray-500 mt-1">
            Manage training sessions, webinars, and exams
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-full font-medium hover:bg-cyan-700 transition-colors">
          <Plus className="w-4 h-4" />
          Schedule Event
        </button>
      </div>

      {/* View Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Date Navigation */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedDate.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </h2>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-3 py-1.5 text-sm text-cyan-600 hover:bg-cyan-50 rounded-lg">
              Today
            </button>
          </div>

          {/* View Mode & Filter */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="all">All Types</option>
                <option value="class">Classes</option>
                <option value="webinar">Webinars</option>
                <option value="exam">Exams</option>
              </select>
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['list', 'week', 'month'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-colors',
                    viewMode === mode
                      ? 'bg-white text-cyan-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-semibold text-gray-900">Upcoming Events</h3>

          <div className="space-y-3">
            {filteredEvents.map((event) => {
              const statusBadge = getStatusBadge(event.status);

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Event Type Badge */}
                    <div
                      className={cn(
                        'p-3 rounded-xl border',
                        getEventColor(event.type)
                      )}
                    >
                      {getEventIcon(event.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 line-clamp-1">
                            {event.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-0.5">
                            {event.courseName}
                          </p>
                        </div>
                        <span
                          className={cn(
                            'px-2 py-1 text-xs font-medium rounded-full capitalize flex-shrink-0',
                            statusBadge.bg,
                            statusBadge.text
                          )}
                        >
                          {event.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-gray-600">
                          <User className="w-4 h-4 text-gray-400" />
                          {event.trainer}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Webinars Sidebar */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Upcoming Webinars</h3>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {webinars.map((webinar, index) => (
              <div
                key={webinar.id}
                className={cn(
                  'p-4',
                  index !== webinars.length - 1 && 'border-b border-gray-100'
                )}
              >
                <h4 className="font-medium text-gray-900 line-clamp-2">
                  {webinar.title}
                </h4>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(webinar.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {webinar.time}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="text-gray-400">Instructor:</span>{' '}
                  {webinar.instructor}
                </p>
                <button className="mt-3 w-full py-2 text-sm font-medium text-cyan-600 border border-cyan-200 rounded-lg hover:bg-cyan-50 transition-colors">
                  Register Now
                </button>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Video className="w-4 h-4 text-cyan-500" />
                Schedule a Class
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <FileText className="w-4 h-4 text-orange-500" />
                Schedule an Exam
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                <Calendar className="w-4 h-4 text-purple-500" />
                Book Training Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
