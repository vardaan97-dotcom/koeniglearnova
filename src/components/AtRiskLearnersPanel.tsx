'use client';

import React from 'react';
import { AlertTriangle, TrendingDown, Clock, Mail, Phone, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Learner, RiskLevel } from '@/types';
import CircularProgress from './CircularProgress';

interface AtRiskLearnersPanelProps {
  learners: Learner[];
  className?: string;
  maxVisible?: number;
}

export default function AtRiskLearnersPanel({
  learners,
  className = '',
  maxVisible = 5,
}: AtRiskLearnersPanelProps) {
  const atRiskLearners = learners
    .filter((l) => l.riskLevel === 'high' || l.riskLevel === 'critical')
    .sort((a, b) => {
      const riskOrder: Record<RiskLevel, number> = { critical: 0, high: 1, medium: 2, low: 3 };
      return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
    })
    .slice(0, maxVisible);

  const getRiskStyles = (risk: RiskLevel) => {
    switch (risk) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          badge: 'bg-red-100 text-red-700',
          icon: 'text-red-500',
        };
      case 'high':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          badge: 'bg-orange-100 text-orange-700',
          icon: 'text-orange-500',
        };
      default:
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          badge: 'bg-yellow-100 text-yellow-700',
          icon: 'text-yellow-500',
        };
    }
  };

  const getDaysSinceActive = (lastActiveDate: string) => {
    const days = Math.ceil(
      (new Date().getTime() - new Date(lastActiveDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  if (atRiskLearners.length === 0) {
    return (
      <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-semibold text-gray-900">At-Risk Learners</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-green-300" />
          <p className="text-green-600 font-medium">No at-risk learners</p>
          <p className="text-sm">All learners are on track!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-lg relative">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {atRiskLearners.length}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">At-Risk Learners</h3>
            <p className="text-xs text-gray-500">Requires immediate attention</p>
          </div>
        </div>
        <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {atRiskLearners.map((learner) => {
          const styles = getRiskStyles(learner.riskLevel);
          const daysSinceActive = getDaysSinceActive(learner.lastActiveDate);

          return (
            <div
              key={learner.id}
              className={cn(
                'p-4 rounded-lg border transition-all hover:shadow-sm',
                styles.bg,
                styles.border
              )}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="text-sm font-bold text-gray-600">
                    {learner.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{learner.name}</h4>
                      <p className="text-xs text-gray-500">{learner.email}</p>
                    </div>
                    <span
                      className={cn(
                        'text-xs font-medium px-2 py-0.5 rounded-full capitalize',
                        styles.badge
                      )}
                    >
                      {learner.riskLevel}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      {learner.progress}% progress
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {daysSinceActive}d inactive
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <button className="flex items-center gap-1 px-2 py-1 bg-white rounded text-xs font-medium text-cyan-600 hover:bg-cyan-50 transition-colors border border-cyan-200">
                      <Mail className="w-3 h-3" />
                      Email
                    </button>
                    {learner.phone && (
                      <button className="flex items-center gap-1 px-2 py-1 bg-white rounded text-xs font-medium text-green-600 hover:bg-green-50 transition-colors border border-green-200">
                        <Phone className="w-3 h-3" />
                        Call
                      </button>
                    )}
                    <button className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                      Details
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
