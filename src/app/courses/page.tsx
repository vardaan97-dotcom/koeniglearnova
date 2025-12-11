'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  Clock,
  Calendar,
  TrendingUp,
  Plus,
  Search,
  Filter,
  ExternalLink,
} from 'lucide-react';
import { courses } from '@/data/mockData';
import { cn, formatDate, getStatusBadge } from '@/lib/utils';
import ProgressBar from '@/components/ProgressBar';
import type { Course } from '@/types';

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const CourseCard = ({ course }: { course: Course }) => {
    const statusBadge = getStatusBadge(course.status);

    return (
      <div
        className={cn(
          'bg-white rounded-xl border border-gray-200 p-6 card-hover cursor-pointer',
          selectedCourse?.id === course.id && 'ring-2 ring-cyan-500'
        )}
        onClick={() => setSelectedCourse(course)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Microsoft Logo */}
            <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
                <div className="bg-[#f25022] w-full h-full"></div>
                <div className="bg-[#7fba00] w-full h-full"></div>
                <div className="bg-[#00a4ef] w-full h-full"></div>
                <div className="bg-[#ffb900] w-full h-full"></div>
              </div>
            </div>
            <div>
              <span className="text-xs font-medium text-cyan-600">{course.code}</span>
              <h3 className="font-semibold text-gray-900 line-clamp-1">{course.name}</h3>
            </div>
          </div>
          <span
            className={cn(
              'px-3 py-1 text-xs font-medium rounded-full capitalize',
              statusBadge.bg,
              statusBadge.text
            )}
          >
            {course.status}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{course.category}</span>
            <span className="text-gray-500">{course.provider}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4 text-cyan-500" />
              <span>{course.learnersCount} Learners</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-cyan-500" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-cyan-500" />
            <span>
              {formatDate(course.startDate)} - {formatDate(course.endDate)}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Completion Rate</span>
              <span className="text-sm font-medium text-gray-700">
                {course.completionRate}%
              </span>
            </div>
            <ProgressBar progress={course.completionRate} showLabel={false} size="sm" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-cyan-600" />
            Courses
          </h1>
          <p className="text-gray-500 mt-1">
            Browse and manage all training courses
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-full font-medium hover:bg-cyan-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add New Course
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              <p className="text-sm text-gray-500">Total Courses</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {courses.filter((c) => c.status === 'active').length}
              </p>
              <p className="text-sm text-gray-500">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {courses.filter((c) => c.status === 'upcoming').length}
              </p>
              <p className="text-sm text-gray-500">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Users className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {courses.reduce((sum, c) => sum + c.learnersCount, 0)}
              </p>
              <p className="text-sm text-gray-500">Total Enrollments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Course Details Modal/Sidebar */}
      {selectedCourse && (
        <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl border-l border-gray-200 z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Course Details</h2>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <span className="sr-only">Close</span>
                &times;
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-sm text-cyan-600 font-medium">
                  {selectedCourse.code}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  {selectedCourse.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Provider</p>
                  <p className="font-medium text-gray-900">{selectedCourse.provider}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium text-gray-900">{selectedCourse.category}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900">{selectedCourse.duration}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Learners</p>
                  <p className="font-medium text-gray-900">
                    {selectedCourse.learnersCount}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Schedule</p>
                <p className="font-medium text-gray-900">
                  {formatDate(selectedCourse.startDate)} -{' '}
                  {formatDate(selectedCourse.endDate)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Completion Rate</p>
                <ProgressBar progress={selectedCourse.completionRate} />
              </div>

              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors">
                  <Users className="w-4 h-4" />
                  View Learners
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
