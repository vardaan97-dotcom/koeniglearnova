'use client';

import React, { useState } from 'react';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  X,
  ChevronRight,
  Bell,
  UserX,
  Calendar,
  Award,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Alert } from '@/types';

interface AlertsPanelProps {
  alerts: Alert[];
  className?: string;
  maxVisible?: number;
}

export default function AlertsPanel({ alerts, className = '', maxVisible = 5 }: AlertsPanelProps) {
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());

  const visibleAlerts = alerts
    .filter((alert) => !dismissedAlerts.has(alert.id) && !alert.isDismissed)
    .slice(0, maxVisible);

  const unreadCount = visibleAlerts.filter((a) => !a.isRead).length;

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'risk':
        return UserX;
      case 'deadline':
        return Calendar;
      case 'attendance':
        return Clock;
      case 'voucher':
        return Award;
      case 'certification':
        return Award;
      case 'engagement':
        return AlertTriangle;
      default:
        return Info;
    }
  };

  const getSeverityStyles = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50 border-red-200',
          icon: 'bg-red-100 text-red-600',
          text: 'text-red-800',
          badge: 'bg-red-500',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200',
          icon: 'bg-amber-100 text-amber-600',
          text: 'text-amber-800',
          badge: 'bg-amber-500',
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: 'bg-blue-100 text-blue-600',
          text: 'text-blue-800',
          badge: 'bg-blue-500',
        };
    }
  };

  const handleDismiss = (alertId: string) => {
    setDismissedAlerts((prev) => new Set([...prev, alertId]));
  };

  if (visibleAlerts.length === 0) {
    return (
      <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-cyan-100 rounded-lg">
            <Bell className="w-5 h-5 text-cyan-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Alerts & Notifications</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No active alerts</p>
          <p className="text-sm">All caught up!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-100 rounded-lg relative">
            <Bell className="w-5 h-5 text-cyan-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900">Alerts & Notifications</h3>
        </div>
        <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {visibleAlerts.map((alert) => {
          const Icon = getAlertIcon(alert.type);
          const styles = getSeverityStyles(alert.severity);

          return (
            <div
              key={alert.id}
              className={cn(
                'relative p-4 rounded-lg border transition-all',
                styles.bg,
                !alert.isRead && 'ring-1 ring-offset-1',
                alert.severity === 'critical' && !alert.isRead && 'ring-red-300',
                alert.severity === 'warning' && !alert.isRead && 'ring-amber-300'
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn('p-2 rounded-lg flex-shrink-0', styles.icon)}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={cn('font-medium text-sm', styles.text)}>
                      {alert.title}
                    </h4>
                    <button
                      onClick={() => handleDismiss(alert.id)}
                      className="p-1 hover:bg-white/50 rounded-full transition-colors flex-shrink-0"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {alert.message}
                  </p>

                  {alert.actionRequired && alert.actionLabel && (
                    <button className="mt-2 flex items-center gap-1 text-sm font-medium text-cyan-600 hover:text-cyan-700">
                      {alert.actionLabel}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {!alert.isRead && (
                <span
                  className={cn(
                    'absolute top-2 right-2 w-2 h-2 rounded-full',
                    styles.badge
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
