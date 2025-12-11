'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Circle,
  Video,
  Clock,
  Target,
  HelpCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Learner, RiskLevel } from '@/types';
import ProgressBar from './ProgressBar';
import CircularProgress from './CircularProgress';

interface LearnerCardProps {
  learner: Learner;
  className?: string;
}

export default function LearnerCard({ learner, className = '' }: LearnerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getVoucherBadge = () => {
    switch (learner.voucherRedeemed) {
      case 'Yes':
        return (
          <span className="px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
            Yes
          </span>
        );
      case 'No':
        return (
          <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
            No
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
            NA
          </span>
        );
    }
  };

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'critical':
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Critical
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            High
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
            Medium
          </span>
        );
      default:
        return null;
    }
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-cyan-600 bg-cyan-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCertificationBadge = () => {
    switch (learner.certificationStatus) {
      case 'passed':
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full flex items-center gap-1">
            <Award className="w-3 h-3" />
            Certified
          </span>
        );
      case 'scheduled':
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Exam Scheduled
          </span>
        );
      case 'failed':
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const getDaysSinceActive = () => {
    const days = Math.ceil(
      (new Date().getTime() - new Date(learner.lastActiveDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const isAtRisk = learner.riskLevel === 'high' || learner.riskLevel === 'critical';

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200',
        isExpanded && 'shadow-md',
        learner.isCompleted && 'bg-emerald-50/50 border-emerald-200',
        isAtRisk && !learner.isCompleted && 'border-l-4 border-l-red-400',
        className
      )}
    >
      {/* Header Row */}
      <div
        className={cn(
          'flex items-center gap-4 px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors',
          learner.isCompleted && 'hover:bg-emerald-50'
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Expand/Collapse Icon */}
        <button className="text-gray-400 hover:text-cyan-600 transition-colors">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {/* Completion Status */}
        {learner.isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
        ) : (
          <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
        )}

        {/* Learner Name & Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {learner.name}
            </h3>
            {getRiskBadge(learner.riskLevel)}
            {getCertificationBadge()}
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <p className="text-xs text-gray-500 truncate">{learner.email}</p>
            {learner.tags && learner.tags.length > 0 && (
              <div className="hidden lg:flex items-center gap-1">
                {learner.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Engagement Score */}
        <div className="hidden lg:flex items-center gap-2">
          <div
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
              getEngagementColor(learner.engagementScore)
            )}
          >
            <TrendingUp className="w-3 h-3" />
            {learner.engagementScore}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="hidden sm:flex flex-1 max-w-xs">
          <ProgressBar progress={learner.progress} />
        </div>

        {/* Voucher Status */}
        <div className="hidden md:flex items-center justify-center w-24">
          {getVoucherBadge()}
        </div>
      </div>

      {/* Mobile Progress */}
      <div className="sm:hidden px-4 pb-4">
        <ProgressBar progress={learner.progress} />
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-6 pt-2 border-t border-gray-100 bg-gradient-to-b from-gray-50 to-white">
          {/* Quick Stats Row */}
          <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Enrolled: {new Date(learner.enrolledDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>Last active: {getDaysSinceActive()} days ago</span>
            </div>
            <div
              className={cn(
                'flex items-center gap-2 text-sm px-2 py-0.5 rounded',
                getEngagementColor(learner.engagementScore)
              )}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Engagement: {learner.engagementScore}%</span>
            </div>
            {learner.phone && (
              <a
                href={`tel:${learner.phone}`}
                className="flex items-center gap-1.5 text-sm text-cyan-600 hover:text-cyan-700"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
            )}
            <a
              href={`mailto:${learner.email}`}
              className="flex items-center gap-1.5 text-sm text-cyan-600 hover:text-cyan-700"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>

          {/* Notes */}
          {learner.notes && learner.notes.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="text-xs font-medium text-yellow-800 mb-1">Notes:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {learner.notes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-yellow-500 mt-1">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {/* Modules Completed */}
            <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <CircularProgress
                value={learner.details.modulesCompleted}
                max={learner.details.totalModules}
                size={60}
                strokeWidth={6}
                valueFormat="fraction"
                colorClass="stroke-cyan-500"
              />
              <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                <Video className="w-3.5 h-3.5" />
                <span>Modules</span>
              </div>
            </div>

            {/* Videos Watched */}
            <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <CircularProgress
                value={learner.details.videosWatched}
                max={learner.details.totalVideos}
                size={60}
                strokeWidth={6}
                valueFormat="fraction"
                colorClass="stroke-cyan-500"
              />
              <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                <Video className="w-3.5 h-3.5" />
                <span>Videos</span>
              </div>
            </div>

            {/* Time Watched */}
            <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex flex-col items-center justify-center h-[60px]">
                <Clock className="w-6 h-6 text-cyan-500 mb-1" />
                <span className="text-sm font-semibold text-gray-700">
                  {learner.details.timeWatched}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                of {learner.details.totalTime}
              </div>
            </div>

            {/* Average Score */}
            <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <CircularProgress
                value={learner.details.averageScore}
                max={100}
                size={60}
                strokeWidth={6}
                valueFormat="percentage"
              />
              <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                <Target className="w-3.5 h-3.5" />
                <span>Avg Score</span>
              </div>
            </div>

            {/* Questions Attempted */}
            <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <CircularProgress
                value={learner.details.questionsAttempted}
                max={learner.details.totalQuestions}
                size={60}
                strokeWidth={6}
                valueFormat="fraction"
                colorClass="stroke-blue-500"
              />
              <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Questions</span>
              </div>
            </div>

            {/* Correct Answers */}
            <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex flex-col items-center justify-center h-[60px]">
                <CheckCircle className="w-6 h-6 text-emerald-500 mb-1" />
                <span className="text-xl font-bold text-emerald-600">
                  {learner.details.correctAnswers}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">Correct</div>
            </div>

            {/* Incorrect Answers */}
            <div className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="flex flex-col items-center justify-center h-[60px]">
                <XCircle className="w-6 h-6 text-red-400 mb-1" />
                <span className="text-xl font-bold text-red-500">
                  {learner.details.incorrectAnswers}
                </span>
              </div>
              <div className="mt-2 text-xs text-gray-500">Incorrect</div>
            </div>
          </div>

          {/* Streak and Login Stats */}
          {(learner.details.streakDays !== undefined || learner.details.totalLogins !== undefined) && (
            <div className="mt-4 flex flex-wrap gap-4">
              {learner.details.streakDays !== undefined && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-orange-500">🔥</span>
                  <span>{learner.details.streakDays} day streak</span>
                </div>
              )}
              {learner.details.totalLogins !== undefined && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📊</span>
                  <span>{learner.details.totalLogins} total logins</span>
                </div>
              )}
              {learner.details.avgSessionDuration && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Avg session: {learner.details.avgSessionDuration}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
