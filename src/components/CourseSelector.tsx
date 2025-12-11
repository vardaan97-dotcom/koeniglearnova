'use client';

import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Course } from '@/types';
import MicrosoftBadge from './MicrosoftBadge';

interface CourseSelectorProps {
  courses: Course[];
  selectedCourse: Course | null;
  onSelect: (course: Course) => void;
  className?: string;
}

export default function CourseSelector({
  courses,
  selectedCourse,
  onSelect,
  className = '',
}: CourseSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn('flex flex-col sm:flex-row items-start sm:items-center gap-6', className)}>
      <MicrosoftBadge className="flex-shrink-0" />

      <div className="flex-1">
        <p className="text-sm font-medium text-cyan-600 mb-2">Course Topic:</p>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full max-w-lg flex items-center justify-between gap-4 px-6 py-3 bg-white border-2 border-cyan-200 rounded-full text-left hover:border-cyan-400 transition-colors"
          >
            <span className="text-base font-medium text-gray-800 truncate">
              {selectedCourse
                ? `${selectedCourse.code}: ${selectedCourse.name}`
                : 'Select a course'}
            </span>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-cyan-600 transition-transform flex-shrink-0',
                isOpen && 'rotate-180'
              )}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 max-w-lg mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
              {courses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => {
                    onSelect(course);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0',
                    selectedCourse?.id === course.id && 'bg-cyan-50'
                  )}
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {course.code}: {course.name}
                    </p>
                    <p className="text-sm text-gray-500">{course.category}</p>
                  </div>
                  {selectedCourse?.id === course.id && (
                    <Check className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
