'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  TrendingUp,
  Users,
  BookOpen,
  Award,
  Calendar,
  Filter,
} from 'lucide-react';
import { dashboardStats, courses, learners } from '@/data/mockData';
import { cn } from '@/lib/utils';
import ProgressBar from '@/components/ProgressBar';
import CircularProgress from '@/components/CircularProgress';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('month');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Calculate stats
  const completedLearners = learners.filter((l) => l.progress >= 100).length;
  const inProgressLearners = learners.filter((l) => l.progress > 0 && l.progress < 100).length;
  const avgProgress = Math.round(
    learners.reduce((sum, l) => sum + l.progress, 0) / learners.length
  );
  const avgScore = Math.round(
    learners.reduce((sum, l) => sum + l.details.averageScore, 0) / learners.length
  );

  const progressDistribution = [
    { label: '0-25%', count: learners.filter((l) => l.progress <= 25).length, color: 'bg-red-500' },
    { label: '26-50%', count: learners.filter((l) => l.progress > 25 && l.progress <= 50).length, color: 'bg-yellow-500' },
    { label: '51-75%', count: learners.filter((l) => l.progress > 50 && l.progress <= 75).length, color: 'bg-cyan-500' },
    { label: '76-100%', count: learners.filter((l) => l.progress > 75).length, color: 'bg-green-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-cyan-600" />
            Reports & Analytics
          </h1>
          <p className="text-gray-500 mt-1">
            Training performance metrics and insights
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-full font-medium hover:bg-cyan-700 transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-500">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-full capitalize transition-colors',
                  dateRange === range
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                This {range}
              </button>
            ))}
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-gray-500">Total Learners</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalLearners}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-gray-500">Active Courses</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeCourses}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-500">Avg Progress</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{avgProgress}%</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-xs text-gray-500">Avg Score</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{avgScore}%</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-emerald-500" />
            <span className="text-xs text-gray-500">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{completedLearners}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-cyan-500" />
            <span className="text-xs text-gray-500">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{inProgressLearners}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Progress Distribution
          </h3>
          <div className="space-y-4">
            {progressDistribution.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {item.count} learners
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full', item.color)}
                    style={{
                      width: `${(item.count / learners.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Course Performance
          </h3>
          <div className="space-y-4">
            {courses.slice(0, 4).map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {course.code}
                  </p>
                  <p className="text-xs text-gray-500">{course.learnersCount} learners</p>
                </div>
                <div className="flex items-center gap-4">
                  <ProgressBar
                    progress={course.completionRate}
                    className="w-24"
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learner Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Top Performers
          </h3>
          <div className="space-y-3">
            {learners
              .sort((a, b) => b.details.averageScore - a.details.averageScore)
              .slice(0, 5)
              .map((learner, index) => (
                <div
                  key={learner.id}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm',
                      index === 0 && 'bg-yellow-100 text-yellow-700',
                      index === 1 && 'bg-gray-200 text-gray-700',
                      index === 2 && 'bg-orange-100 text-orange-700',
                      index > 2 && 'bg-gray-100 text-gray-600'
                    )}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {learner.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Progress: {learner.progress}%
                    </p>
                  </div>
                  <CircularProgress
                    value={learner.details.averageScore}
                    size={48}
                    strokeWidth={4}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Voucher Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Voucher Redemption Status
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-3xl font-bold text-green-600">
                {learners.filter((l) => l.voucherRedeemed === 'Yes').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Redeemed</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <p className="text-3xl font-bold text-red-600">
                {learners.filter((l) => l.voucherRedeemed === 'No').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Not Redeemed</p>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-xl">
              <p className="text-3xl font-bold text-gray-600">
                {learners.filter((l) => l.voucherRedeemed === 'NA').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">N/A</p>
            </div>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-green-500"
              style={{
                width: `${
                  (learners.filter((l) => l.voucherRedeemed === 'Yes').length /
                    learners.length) *
                  100
                }%`,
              }}
            />
            <div
              className="h-full bg-red-500"
              style={{
                width: `${
                  (learners.filter((l) => l.voucherRedeemed === 'No').length /
                    learners.length) *
                  100
                }%`,
              }}
            />
            <div
              className="h-full bg-gray-400"
              style={{
                width: `${
                  (learners.filter((l) => l.voucherRedeemed === 'NA').length /
                    learners.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
