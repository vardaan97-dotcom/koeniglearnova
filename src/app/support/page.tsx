'use client';

import React from 'react';
import {
  HeadphonesIcon,
  Phone,
  Mail,
  MessageCircle,
  FileText,
  Video,
  HelpCircle,
  ExternalLink,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { customerSuccessManager, supportDesk, webinars, trainers } from '@/data/mockData';

export default function SupportPage() {
  const faqs = [
    {
      question: 'How do I reset my course progress?',
      answer:
        'Contact your Customer Success Manager or the After Course Support Desk to request a progress reset.',
    },
    {
      question: 'How can I redeem my exam voucher?',
      answer:
        'Exam vouchers can be redeemed through the Microsoft Certification portal. Contact support for the voucher code.',
    },
    {
      question: 'Can I access course materials after completion?',
      answer:
        'Yes, you have access to course materials for 6 months after course completion.',
    },
    {
      question: 'How do I schedule a one-on-one session with a trainer?',
      answer:
        'Use the trainer schedule feature or contact your CSM to book a personalized session.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <HeadphonesIcon className="w-7 h-7 text-cyan-600" />
          Support Center
        </h1>
        <p className="text-gray-500 mt-1">
          Get help and connect with our support team
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Customer Success Manager */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-cyan-600">
                  {customerSuccessManager.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {customerSuccessManager.name}
                </h3>
                <p className="text-sm text-gray-500">Customer Success Manager</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={`tel:${customerSuccessManager.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-5 h-5 text-cyan-600" />
              <span className="text-sm text-gray-700">{customerSuccessManager.phone}</span>
            </a>
            <a
              href={`https://wa.me/${customerSuccessManager.whatsapp.replace(/[+\s]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-700">WhatsApp</span>
            </a>
            <a
              href={`mailto:${customerSuccessManager.email}`}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-700">Send Email</span>
            </a>
          </div>
        </div>

        {/* After Course Support */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <HeadphonesIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">After Course Support</h3>
              <p className="text-sm text-gray-500">Technical & Course Help</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-cyan-600 font-medium">{supportDesk.email}</p>
            </div>
            <a
              href={`mailto:${supportDesk.email}`}
              className="flex items-center justify-center gap-2 w-full p-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </a>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Response time: Within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Trainer Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-orange-600">
                {trainers[0].name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{trainers[0].name}</h3>
              <p className="text-sm text-gray-500">Course Trainer</p>
            </div>
          </div>

          <div className="space-y-2">
            <button className="flex items-center gap-3 w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">View Schedule</span>
            </button>
            <a
              href={`mailto:${trainers[0].email}`}
              className="flex items-center gap-3 w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">Send Email</span>
            </a>
            <button className="flex items-center gap-3 w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">Download Resume</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-cyan-600" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Webinars & Resources */}
        <div className="space-y-6">
          {/* Webinars */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-cyan-600" />
              Upcoming Webinars
            </h3>

            <div className="space-y-3">
              {webinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-1">
                      {webinar.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {webinar.date} at {webinar.time}
                    </p>
                  </div>
                  <button className="text-cyan-600 hover:text-cyan-700">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2.5 border border-cyan-200 rounded-lg text-cyan-600 font-medium hover:bg-cyan-50 transition-colors">
              View All Webinars
            </button>
          </div>

          {/* Quick Resources */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Resources</h3>

            <div className="space-y-2">
              {[
                { icon: FileText, label: 'Course Materials', color: 'text-blue-600' },
                { icon: Video, label: 'Video Tutorials', color: 'text-purple-600' },
                { icon: HelpCircle, label: 'Knowledge Base', color: 'text-green-600' },
                { icon: CheckCircle2, label: 'Certification Guide', color: 'text-orange-600' },
              ].map((resource, index) => (
                <button
                  key={index}
                  className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <resource.icon className={`w-5 h-5 ${resource.color}`} />
                  <span className="text-sm text-gray-700">{resource.label}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
