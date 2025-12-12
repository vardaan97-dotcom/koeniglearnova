'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import {
  BookOpen,
  Calendar,
  ChevronDown,
  PlayCircle,
  User,
  LogOut,
  Settings,
  Bell,
  Menu,
  X,
  HelpCircle,
} from 'lucide-react';
import { currentUser } from '@/data/mockData';
import { useTour } from './OnboardingTour';

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { startTour } = useTour();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Link
              href="/courses"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-full hover:bg-cyan-700 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Explore All Courses
            </Link>
            <Link
              href="/schedule"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-full hover:bg-cyan-700 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Upcoming Webinars
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 border border-cyan-600 rounded-full hover:bg-cyan-50 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              How LET Works
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="hidden md:flex p-2 text-gray-500 hover:text-cyan-600 hover:bg-gray-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs text-gray-500">Welcome</span>
                  <span className="text-sm font-medium text-gray-800">
                    {currentUser.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    (Your Learner ID is {currentUser.learnerId})
                  </span>
                </div>
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center border-2 border-cyan-200">
                  <User className="w-5 h-5 text-cyan-600" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-500">{currentUser.role}</p>
                  </div>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      startTour();
                      setIsProfileOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-cyan-600 hover:bg-cyan-50 w-full"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Take Dashboard Tour
                  </button>
                  <hr className="my-2" />
                  <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-cyan-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2">
              <Link
                href="/courses"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <BookOpen className="w-4 h-4" />
                Explore All Courses
              </Link>
              <Link
                href="/schedule"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <Calendar className="w-4 h-4" />
                Upcoming Webinars
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                <PlayCircle className="w-4 h-4" />
                How LET Works
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
