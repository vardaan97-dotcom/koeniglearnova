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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Learner } from '@/types';
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

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200',
        isExpanded && 'shadow-md',
        learner.isCompleted && 'bg-emerald-50/50 border-emerald-200',
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

        {/* Learner Name */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {learner.name}
          </h3>
          <p className="text-xs text-gray-500 truncate">{learner.email}</p>
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
        </div>
      )}
    </div>
  );
}
