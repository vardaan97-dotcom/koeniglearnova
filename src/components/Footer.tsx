'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/koenigsolutions', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/koenigsolutions', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/koenig-solutions', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/koenigsolutions', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/koenigsolutions', label: 'YouTube' },
  ];

  return (
    <footer className="bg-slate-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            Copyright &copy; {new Date().getFullYear()} All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
