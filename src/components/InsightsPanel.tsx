'use client';

import React from 'react';
import {
  Lightbulb,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LearnerInsight } from '@/types';

interface InsightsPanelProps {
  insights: LearnerInsight[];
  className?: string;
  maxVisible?: number;
}

export default function InsightsPanel({
  insights,
  className = '',
  maxVisible = 4,
}: InsightsPanelProps) {
  const visibleInsights = insights.slice(0, maxVisible);

  const getInsightIcon = (type: LearnerInsight['type']) => {
    switch (type) {
      case 'improvement':
        return TrendingUp;
      case 'decline':
        return TrendingDown;
      case 'risk':
        return AlertTriangle;
      case 'achievement':
        return CheckCircle2;
      case 'recommendation':
        return Lightbulb;
      default:
        return BarChart3;
    }
  };

  const getInsightStyles = (type: LearnerInsight['type']) => {
    switch (type) {
      case 'improvement':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: 'bg-green-100 text-green-600',
          text: 'text-green-700',
        };
      case 'decline':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'bg-red-100 text-red-600',
          text: 'text-red-700',
        };
      case 'risk':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: 'bg-amber-100 text-amber-600',
          text: 'text-amber-700',
        };
      case 'achievement':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'bg-blue-100 text-blue-600',
          text: 'text-blue-700',
        };
      case 'recommendation':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          icon: 'bg-purple-100 text-purple-600',
          text: 'text-purple-700',
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          icon: 'bg-gray-100 text-gray-600',
          text: 'text-gray-700',
        };
    }
  };

  if (visibleInsights.length === 0) {
    return (
      <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="font-semibold text-gray-900">AI Insights</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No insights available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Insights</h3>
            <p className="text-xs text-gray-500">Actionable recommendations</p>
          </div>
        </div>
        <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {visibleInsights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          const styles = getInsightStyles(insight.type);

          return (
            <div
              key={insight.id}
              className={cn(
                'p-4 rounded-lg border transition-all hover:shadow-sm',
                styles.bg,
                styles.border
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn('p-2 rounded-lg flex-shrink-0', styles.icon)}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className={cn('font-medium text-sm', styles.text)}>
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>

                  {insight.actionLabel && (
                    <button className="mt-2 flex items-center gap-1 text-sm font-medium text-cyan-600 hover:text-cyan-700">
                      {insight.actionLabel}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {insight.metric && (
                  <div className="text-right flex-shrink-0">
                    <p className={cn('text-lg font-bold', styles.text)}>
                      {insight.metric.value}
                      {insight.metric.unit}
                    </p>
                    {insight.metric.change && (
                      <p
                        className={cn(
                          'text-xs',
                          insight.metric.change > 0 ? 'text-green-600' : 'text-red-600'
                        )}
                      >
                        {insight.metric.change > 0 ? '+' : ''}
                        {insight.metric.change}%
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
