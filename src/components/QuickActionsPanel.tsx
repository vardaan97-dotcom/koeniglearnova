'use client';

import React from 'react';
import {
  UserPlus,
  Mail,
  Calendar,
  FileText,
  Download,
  MessageSquare,
  BookOpen,
  Award,
  Users,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  onClick?: () => void;
}

interface QuickActionsPanelProps {
  className?: string;
}

export default function QuickActionsPanel({ className = '' }: QuickActionsPanelProps) {
  const quickActions: QuickAction[] = [
    {
      id: 'add-learner',
      label: 'Add Learner',
      icon: UserPlus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
    },
    {
      id: 'send-email',
      label: 'Send Email',
      icon: Mail,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50 hover:bg-cyan-100',
    },
    {
      id: 'schedule-session',
      label: 'Schedule Session',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
    },
    {
      id: 'export-data',
      label: 'Export Data',
      icon: Download,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
    },
    {
      id: 'bulk-message',
      label: 'Bulk Message',
      icon: MessageSquare,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 hover:bg-pink-100',
    },
    {
      id: 'create-batch',
      label: 'Create Batch',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 hover:bg-indigo-100',
    },
    {
      id: 'schedule-exam',
      label: 'Schedule Exam',
      icon: Award,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 hover:bg-amber-100',
    },
  ];

  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-cyan-100 rounded-lg">
          <Clock className="w-5 h-5 text-cyan-600" />
        </div>
        <h3 className="font-semibold text-gray-900">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={cn(
              'flex flex-col items-center justify-center gap-2 p-4 rounded-lg transition-all',
              action.bgColor
            )}
          >
            <action.icon className={cn('w-6 h-6', action.color)} />
            <span className="text-xs font-medium text-gray-700 text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
