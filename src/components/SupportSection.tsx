'use client';

import React from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  Calendar,
  FileText,
  Headphones,
  Video,
  ExternalLink,
} from 'lucide-react';
import type { Trainer, CustomerSuccessManager, SupportDesk, Webinar } from '@/types';

interface SupportSectionProps {
  trainer: Trainer;
  csm: CustomerSuccessManager;
  supportDesk: SupportDesk;
  webinars: Webinar[];
}

export default function SupportSection({
  trainer,
  csm,
  supportDesk,
  webinars,
}: SupportSectionProps) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Headphones className="w-5 h-5 text-cyan-600" />
          Other Information
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trainer Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              Trainer Information
            </span>
            <FileText className="w-5 h-5 text-cyan-600" />
          </div>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-cyan-600">
                {trainer.name.charAt(0)}
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-800">{trainer.name}</h4>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-cyan-200 rounded-full text-sm text-cyan-600 hover:bg-cyan-50 transition-colors">
              <Calendar className="w-4 h-4" />
              Trainer Schedule
            </button>
            <a
              href={`mailto:${trainer.email}`}
              className="flex items-center gap-2 px-4 py-2 border border-cyan-200 rounded-full text-sm text-cyan-600 hover:bg-cyan-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
            <button className="flex items-center gap-2 px-4 py-2 border border-cyan-200 rounded-full text-sm text-cyan-600 hover:bg-cyan-50 transition-colors">
              <FileText className="w-4 h-4" />
              Download Resume
            </button>
          </div>
        </div>

        {/* Customer Success Manager */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-cyan-600">
                  {csm.name.charAt(0)}
                </span>
              </div>
              <span className="font-semibold text-gray-800">{csm.name}</span>
            </div>
            <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
              <Headphones className="w-4 h-4 text-cyan-600" />
            </div>
          </div>

          <p className="text-sm text-gray-600 text-center mb-6">
            Your Customer Success Manager
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${csm.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 px-4 py-2 border border-cyan-200 rounded-full text-sm text-cyan-600 hover:bg-cyan-50 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {csm.phone}
            </a>
            <a
              href={`https://wa.me/${csm.whatsapp.replace(/[+\s]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-cyan-200 rounded-full text-sm text-cyan-600 hover:bg-cyan-50 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={`mailto:${csm.email}`}
              className="flex items-center gap-2 px-4 py-2 border border-cyan-200 rounded-full text-sm text-cyan-600 hover:bg-cyan-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>

        {/* After Course Support Desk */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              After Course Support Desk
            </span>
            <MessageCircle className="w-5 h-5 text-cyan-600" />
          </div>

          <p className="text-sm text-cyan-600 mb-4 text-center">{supportDesk.email}</p>

          <div className="flex justify-center">
            <a
              href={`mailto:${supportDesk.email}`}
              className="flex items-center gap-2 px-6 py-2 border border-cyan-200 rounded-full text-sm text-cyan-600 hover:bg-cyan-50 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>

        {/* Upcoming Webinars */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="px-4 py-1.5 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              Upcoming Webinars
            </span>
            <Video className="w-5 h-5 text-cyan-600" />
          </div>

          <div className="space-y-3 max-h-32 overflow-y-auto mb-4">
            {webinars.slice(0, 2).map((webinar) => (
              <div key={webinar.id} className="text-sm">
                <p className="font-medium text-gray-800 truncate">{webinar.title}</p>
                <p className="text-gray-500 text-xs">
                  {webinar.date} at {webinar.time}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="/schedule"
              className="flex items-center gap-2 px-6 py-2 border border-cyan-200 rounded-full text-sm text-cyan-600 hover:bg-cyan-50 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Koenig Webinars
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
