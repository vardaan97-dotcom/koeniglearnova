'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  UserCheck,
  HeadphonesIcon,
  BarChart3,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Learners', href: '/learners', icon: Users },
  { name: 'Courses', href: '/courses', icon: BookOpen },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Trainers', href: '/trainers', icon: UserCheck },
  { name: 'Support', href: '/support', icon: HeadphonesIcon },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 bg-white border-r border-gray-200">
      <div className="flex flex-col flex-1 overflow-y-auto pt-6 pb-4">
        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-cyan-50 text-cyan-700 border-l-4 border-cyan-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn('w-5 h-5', isActive ? 'text-cyan-600' : 'text-gray-400')}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 mt-auto">
          <div className="border-t border-gray-200 pt-4">
            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-cyan-50 text-cyan-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon
                    className={cn('w-5 h-5', isActive ? 'text-cyan-600' : 'text-gray-400')}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
}
