'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  Star,
  BookOpen,
  Mail,
  Calendar,
  FileText,
  Search,
  Award,
} from 'lucide-react';
import { trainers } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function TrainersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);

  const filteredTrainers = trainers.filter(
    (trainer) =>
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.specialization.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <UserCheck className="w-7 h-7 text-cyan-600" />
            Trainers
          </h1>
          <p className="text-gray-500 mt-1">
            View and connect with certified trainers
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <UserCheck className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{trainers.length}</p>
              <p className="text-sm text-gray-500">Total Trainers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {(
                  trainers.reduce((sum, t) => sum + t.rating, 0) / trainers.length
                ).toFixed(1)}
              </p>
              <p className="text-sm text-gray-500">Average Rating</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {trainers.reduce((sum, t) => sum + t.coursesDelivered, 0)}
              </p>
              <p className="text-sm text-gray-500">Courses Delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search trainers by name or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <div
            key={trainer.id}
            className={cn(
              'bg-white rounded-xl border border-gray-200 overflow-hidden card-hover',
              selectedTrainer === trainer.id && 'ring-2 ring-cyan-500'
            )}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <span className="text-3xl font-bold text-cyan-600">
                  {trainer.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white">{trainer.name}</h3>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="text-white font-medium">{trainer.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Specializations */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {trainer.specialization.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between py-3 border-y border-gray-100">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {trainer.coursesDelivered}
                  </p>
                  <p className="text-xs text-gray-500">Courses</p>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-2xl font-bold text-gray-900">
                      {trainer.rating}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Award className="w-6 h-6 text-cyan-500" />
                  </div>
                  <p className="text-xs text-gray-500">Certified</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <a
                  href={`mailto:${trainer.email}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-cyan-200 rounded-lg text-cyan-600 text-sm font-medium hover:bg-cyan-50 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-cyan-200 rounded-lg text-cyan-600 text-sm font-medium hover:bg-cyan-50 transition-colors">
                  <Calendar className="w-4 h-4" />
                  Schedule
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-cyan-200 rounded-lg text-cyan-600 text-sm font-medium hover:bg-cyan-50 transition-colors">
                  <FileText className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
