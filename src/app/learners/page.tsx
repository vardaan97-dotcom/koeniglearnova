'use client';

import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  SortAsc,
  SortDesc,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import LearnerCard from '@/components/LearnerCard';
import { learners, courses } from '@/data/mockData';
import { exportToCSV, cn } from '@/lib/utils';

type SortField = 'name' | 'progress' | 'enrolledDate';
type SortOrder = 'asc' | 'desc';

export default function LearnersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [progressFilter, setProgressFilter] = useState<string>('all');
  const [voucherFilter, setVoucherFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredLearners = useMemo(() => {
    let result = [...learners];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (learner) =>
          learner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          learner.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Progress filter
    if (progressFilter !== 'all') {
      switch (progressFilter) {
        case 'completed':
          result = result.filter((l) => l.progress >= 100);
          break;
        case 'inProgress':
          result = result.filter((l) => l.progress > 0 && l.progress < 100);
          break;
        case 'notStarted':
          result = result.filter((l) => l.progress === 0);
          break;
      }
    }

    // Voucher filter
    if (voucherFilter !== 'all') {
      result = result.filter((l) => l.voucherRedeemed === voucherFilter);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'progress':
          comparison = a.progress - b.progress;
          break;
        case 'enrolledDate':
          comparison = new Date(a.enrolledDate).getTime() - new Date(b.enrolledDate).getTime();
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, progressFilter, voucherFilter, sortField, sortOrder]);

  const paginatedLearners = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLearners.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLearners, currentPage]);

  const totalPages = Math.ceil(filteredLearners.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleExport = () => {
    const exportData = filteredLearners.map((learner) => ({
      Name: learner.name,
      Email: learner.email,
      Progress: `${learner.progress}%`,
      'Voucher Redeemed': learner.voucherRedeemed,
      'Enrolled Date': learner.enrolledDate,
      'Modules Completed': `${learner.details.modulesCompleted}/${learner.details.totalModules}`,
      'Videos Watched': `${learner.details.videosWatched}/${learner.details.totalVideos}`,
      'Time Watched': learner.details.timeWatched,
      'Average Score': `${learner.details.averageScore}%`,
    }));
    exportToCSV(exportData, 'learners-export');
  };

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className={cn(
        'flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors',
        sortField === field
          ? 'bg-cyan-100 text-cyan-700'
          : 'hover:bg-gray-100 text-gray-600'
      )}
    >
      {label}
      {sortField === field &&
        (sortOrder === 'asc' ? (
          <SortAsc className="w-3 h-3" />
        ) : (
          <SortDesc className="w-3 h-3" />
        ))}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-7 h-7 text-cyan-600" />
            All Learners
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track all enrolled learners
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-2.5 bg-cyan-600 text-white rounded-full font-medium hover:bg-cyan-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export All
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Course Filter */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Courses</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code}
              </option>
            ))}
          </select>

          {/* Progress Filter */}
          <select
            value={progressFilter}
            onChange={(e) => setProgressFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Progress</option>
            <option value="completed">Completed</option>
            <option value="inProgress">In Progress</option>
            <option value="notStarted">Not Started</option>
          </select>

          {/* Voucher Filter */}
          <select
            value={voucherFilter}
            onChange={(e) => setVoucherFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="all">All Vouchers</option>
            <option value="Yes">Redeemed</option>
            <option value="No">Not Redeemed</option>
            <option value="NA">N/A</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500 mr-2">Sort by:</span>
          <SortButton field="name" label="Name" />
          <SortButton field="progress" label="Progress" />
          <SortButton field="enrolledDate" label="Enrolled Date" />
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {paginatedLearners.length} of {filteredLearners.length} learners
        </p>
      </div>

      {/* Learners List */}
      <div className="space-y-3">
        {paginatedLearners.map((learner) => (
          <LearnerCard key={learner.id} learner={learner} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                'w-10 h-10 rounded-lg font-medium transition-colors',
                currentPage === page
                  ? 'bg-cyan-600 text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              )}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
