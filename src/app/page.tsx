'use client';

import React, { useState, useMemo } from 'react';
import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import CourseSelector from '@/components/CourseSelector';
import SearchFilter from '@/components/SearchFilter';
import LearnerCard from '@/components/LearnerCard';
import SupportSection from '@/components/SupportSection';
import AlertsPanel from '@/components/AlertsPanel';
import DeadlinesWidget from '@/components/DeadlinesWidget';
import AtRiskLearnersPanel from '@/components/AtRiskLearnersPanel';
import QuickActionsPanel from '@/components/QuickActionsPanel';
import TodayScheduleWidget from '@/components/TodayScheduleWidget';
import InsightsPanel from '@/components/InsightsPanel';
import BatchOverviewPanel from '@/components/BatchOverviewPanel';
import {
  dashboardStats,
  learners,
  courses,
  trainers,
  customerSuccessManager,
  supportDesk,
  webinars,
  alerts,
  deadlines,
  batches,
  learnerInsights,
  scheduleSessions,
} from '@/data/mockData';
import { exportToCSV } from '@/lib/utils';
import Link from 'next/link';

export default function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllLearners, setShowAllLearners] = useState(false);

  const filteredLearners = useMemo(() => {
    return learners.filter((learner) =>
      learner.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const displayedLearners = showAllLearners
    ? filteredLearners
    : filteredLearners.slice(0, 5);

  // Calculate enhanced stats
  const atRiskCount = learners.filter(
    (l) => l.riskLevel === 'high' || l.riskLevel === 'critical'
  ).length;
  const activeAlertsCount = alerts.filter((a) => !a.isDismissed).length;
  const avgEngagement = Math.round(
    learners.reduce((sum, l) => sum + l.engagementScore, 0) / learners.length
  );

  const handleExport = () => {
    const exportData = filteredLearners.map((learner) => ({
      Name: learner.name,
      Email: learner.email,
      Progress: `${learner.progress}%`,
      'Risk Level': learner.riskLevel,
      'Engagement Score': learner.engagementScore,
      'Voucher Redeemed': learner.voucherRedeemed,
      'Modules Completed': `${learner.details.modulesCompleted}/${learner.details.totalModules}`,
      'Videos Watched': `${learner.details.videosWatched}/${learner.details.totalVideos}`,
      'Time Watched': learner.details.timeWatched,
      'Average Score': `${learner.details.averageScore}%`,
      'Questions Attempted': `${learner.details.questionsAttempted}/${learner.details.totalQuestions}`,
      'Correct Answers': learner.details.correctAnswers,
      'Incorrect Answers': learner.details.incorrectAnswers,
      'Last Active': learner.lastActiveDate,
      'Certification Status': learner.certificationStatus,
    }));
    exportToCSV(exportData, `learners-${selectedCourse?.code || 'all'}`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Training Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Monitor learner progress and manage training activities
          </p>
        </div>
        <Link
          href="/reports"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 hover:text-cyan-700"
        >
          View Full Reports
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Quick Actions */}
      <QuickActionsPanel />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        <StatCard
          title="Total Learners"
          value={dashboardStats.totalLearners}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Active Courses"
          value={dashboardStats.activeCourses}
          icon={BookOpen}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
        <StatCard
          title="Avg Completion"
          value={`${dashboardStats.averageCompletion}%`}
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Vouchers Redeemed"
          value={dashboardStats.vouchersRedeemed}
          icon={Award}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Upcoming Classes"
          value={dashboardStats.upcomingClasses}
          icon={Calendar}
          iconBg="bg-cyan-100"
          iconColor="text-cyan-600"
        />
        <StatCard
          title="At-Risk Learners"
          value={atRiskCount}
          icon={AlertTriangle}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
        <StatCard
          title="Active Alerts"
          value={activeAlertsCount}
          icon={Clock}
          iconBg="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Avg Engagement"
          value={`${avgEngagement}%`}
          icon={CheckCircle2}
          trend={{ value: 8, isPositive: true }}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Critical Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AlertsPanel alerts={alerts} maxVisible={4} />
        <AtRiskLearnersPanel learners={learners} maxVisible={3} />
        <DeadlinesWidget deadlines={deadlines} maxVisible={4} />
      </div>

      {/* Schedule and Batches Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TodayScheduleWidget sessions={scheduleSessions} />
        <BatchOverviewPanel batches={batches} maxVisible={3} />
      </div>

      {/* AI Insights */}
      <InsightsPanel insights={learnerInsights} maxVisible={4} />

      {/* Course Selector & Export */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <CourseSelector
            courses={courses}
            selectedCourse={selectedCourse}
            onSelect={setSelectedCourse}
          />
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-700">Export Learner Data</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onExport={handleExport}
      />

      {/* Learners List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Learners ({filteredLearners.length})
          </h2>
          <div className="hidden sm:flex items-center gap-8 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-600" />
              Learner Name
            </span>
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              Overall Progress
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-600" />
              Voucher Redeemed
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {displayedLearners.map((learner) => (
            <LearnerCard key={learner.id} learner={learner} />
          ))}
        </div>

        {filteredLearners.length > 5 && (
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setShowAllLearners(!showAllLearners)}
              className="flex items-center gap-2 px-6 py-2.5 text-cyan-600 font-medium hover:bg-cyan-50 rounded-full transition-colors"
            >
              {showAllLearners
                ? 'Show Less'
                : `View ${filteredLearners.length - 5} more learners`}
              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  showAllLearners ? 'rotate-90' : ''
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Support Section */}
      <SupportSection
        trainer={trainers[0]}
        csm={customerSuccessManager}
        supportDesk={supportDesk}
        webinars={webinars}
      />
    </div>
  );
}
