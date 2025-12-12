'use client';

/**
 * Onboarding Tour Component for Training Coordinator Dashboard
 * =============================================================
 *
 * Interactive guided tour for new coordinators featuring "Koey" the Koenig mascot.
 * Highlights key features and explains how to use the coordinator dashboard.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';

// ============================================================================
// KOENIG MASCOT COMPONENT - "Koey"
// ============================================================================

interface MascotProps {
  mood: 'wave' | 'point' | 'celebrate' | 'think' | 'happy';
  size?: 'small' | 'medium' | 'large';
}

function KoenigMascot({ mood, size = 'medium' }: MascotProps) {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-28 h-28',
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Body */}
        <ellipse cx="50" cy="60" rx="35" ry="30" fill="url(#bodyGradient)" />
        {/* Head */}
        <circle cx="50" cy="35" r="28" fill="url(#headGradient)" />
        {/* Ears/Tufts */}
        <path d="M25 20 L30 35 L20 30 Z" fill="#06b6d4" />
        <path d="M75 20 L70 35 L80 30 Z" fill="#06b6d4" />
        {/* Eyes */}
        <ellipse cx="38" cy="35" rx="10" ry="11" fill="white" />
        <ellipse cx="62" cy="35" rx="10" ry="11" fill="white" />
        {/* Pupils */}
        <circle cx={mood === 'point' ? '40' : '38'} cy="36" r="5" fill="#1e3a5f" />
        <circle cx={mood === 'point' ? '64' : '62'} cy="36" r="5" fill="#1e3a5f" />
        {/* Eye shine */}
        <circle cx="40" cy="34" r="2" fill="white" opacity="0.8" />
        <circle cx="64" cy="34" r="2" fill="white" opacity="0.8" />
        {/* Beak */}
        <path d="M45 45 L50 55 L55 45 Z" fill="#f59e0b" />
        {/* Belly patch */}
        <ellipse cx="50" cy="65" rx="20" ry="18" fill="#e0f2fe" />
        {/* Wings */}
        {mood === 'wave' ? (
          <>
            <path d="M15 55 Q5 45 15 35 Q20 45 20 55 Z" fill="#0891b2" className="animate-bounce" />
            <path d="M85 50 Q95 50 85 65 Q80 55 80 50 Z" fill="#0891b2" />
          </>
        ) : mood === 'celebrate' ? (
          <>
            <path d="M12 40 Q2 35 15 25 Q20 40 20 50 Z" fill="#0891b2" className="animate-bounce" />
            <path d="M88 40 Q98 35 85 25 Q80 40 80 50 Z" fill="#0891b2" className="animate-bounce" />
          </>
        ) : (
          <>
            <path d="M15 55 Q5 55 15 70 Q20 60 20 55 Z" fill="#0891b2" />
            <path d="M85 55 Q95 55 85 70 Q80 60 80 55 Z" fill="#0891b2" />
          </>
        )}
        {/* Feet */}
        <ellipse cx="40" cy="88" rx="8" ry="4" fill="#f59e0b" />
        <ellipse cx="60" cy="88" rx="8" ry="4" fill="#f59e0b" />
        {/* Graduation cap */}
        <path d="M25 18 L50 8 L75 18 L50 28 Z" fill="#1e3a5f" />
        <rect x="48" y="8" width="4" height="15" fill="#1e3a5f" />
        <circle cx="50" cy="8" r="3" fill="#f59e0b" />
        <path d="M50 8 Q60 5 65 10" stroke="#f59e0b" strokeWidth="2" fill="none" />
        <circle cx="65" cy="10" r="2" fill="#f59e0b" />
        {/* Gradients */}
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      {/* Sparkles for celebrate mood */}
      {mood === 'celebrate' && (
        <>
          <span className="absolute -top-2 -left-2 text-yellow-400 animate-ping">✨</span>
          <span className="absolute -top-2 -right-2 text-yellow-400 animate-ping" style={{ animationDelay: '0.2s' }}>✨</span>
          <span className="absolute top-0 left-1/2 text-yellow-400 animate-ping" style={{ animationDelay: '0.4s' }}>⭐</span>
        </>
      )}
    </div>
  );
}

// ============================================================================
// TYPES
// ============================================================================

export interface TourStep {
  id: string;
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  spotlightPadding?: number;
  mascotMood?: 'wave' | 'point' | 'celebrate' | 'think' | 'happy';
  category?: string;
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  demoMode?: boolean;
}

// ============================================================================
// TOUR STEPS FOR TRAINING COORDINATOR DASHBOARD
// ============================================================================

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    target: 'body',
    title: 'Welcome to Training Coordinator Dashboard! 🎓',
    content: "Hi! I'm Koey, your training assistant! I'll show you how to manage learners, track progress, and ensure everyone succeeds in their certification journey. Let's get started!",
    position: 'center',
    mascotMood: 'wave',
    category: 'intro',
  },
  {
    id: 'quick-actions',
    target: '[data-tour="quick-actions"]',
    title: 'Quick Actions Panel',
    content: "These are your most-used actions! Send bulk messages, schedule sessions, view reports, or export data. Everything you need is just one click away.",
    position: 'bottom',
    spotlightPadding: 15,
    mascotMood: 'point',
    category: 'actions',
  },
  {
    id: 'stats-overview',
    target: '[data-tour="stats-overview"]',
    title: 'Dashboard Statistics',
    content: "Here's your training overview at a glance! Track total learners, active courses, completion rates, voucher redemptions, and more. Green arrows show positive trends!",
    position: 'bottom',
    spotlightPadding: 10,
    mascotMood: 'happy',
    category: 'analytics',
  },
  {
    id: 'alerts-panel',
    target: '[data-tour="alerts-panel"]',
    title: 'Alerts & Notifications',
    content: "Critical alerts appear here! Never miss important updates about learners falling behind, upcoming deadlines, or support tickets that need attention.",
    position: 'right',
    spotlightPadding: 15,
    mascotMood: 'think',
    category: 'monitoring',
  },
  {
    id: 'at-risk-learners',
    target: '[data-tour="at-risk-learners"]',
    title: 'At-Risk Learners',
    content: "This panel highlights learners who may need extra support. Click on any learner to see their full profile and send personalized encouragement!",
    position: 'right',
    spotlightPadding: 15,
    mascotMood: 'think',
    category: 'monitoring',
  },
  {
    id: 'deadlines-widget',
    target: '[data-tour="deadlines-widget"]',
    title: 'Upcoming Deadlines',
    content: "Keep track of certification deadlines, exam dates, and important milestones. Red badges indicate urgent items that need immediate attention!",
    position: 'left',
    spotlightPadding: 15,
    mascotMood: 'point',
    category: 'scheduling',
  },
  {
    id: 'schedule-widget',
    target: '[data-tour="schedule-widget"]',
    title: "Today's Schedule",
    content: "View your daily training sessions, webinars, and meetings. Stay organized and never miss a session with your learners!",
    position: 'right',
    spotlightPadding: 15,
    mascotMood: 'happy',
    category: 'scheduling',
  },
  {
    id: 'batch-overview',
    target: '[data-tour="batch-overview"]',
    title: 'Batch Overview',
    content: "Monitor progress across different training batches. See completion rates, engagement levels, and identify which batches need more attention.",
    position: 'left',
    spotlightPadding: 15,
    mascotMood: 'point',
    category: 'analytics',
  },
  {
    id: 'ai-insights',
    target: '[data-tour="ai-insights"]',
    title: 'AI-Powered Insights',
    content: "Our AI analyzes learner behavior and provides actionable recommendations. Get suggestions on who to contact, which modules need review, and optimization tips!",
    position: 'bottom',
    spotlightPadding: 15,
    mascotMood: 'celebrate',
    category: 'analytics',
  },
  {
    id: 'learner-list',
    target: '[data-tour="learner-list"]',
    title: 'Learner Management',
    content: "View and manage all your learners here. Click on any learner card to see detailed progress, send messages, or schedule 1-on-1 sessions.",
    position: 'top',
    spotlightPadding: 15,
    mascotMood: 'point',
    category: 'management',
  },
  {
    id: 'support-section',
    target: '[data-tour="support-section"]',
    title: 'Support & Resources',
    content: "Need help? Access our customer success manager, support desk, and training resources. Your dedicated support team is always ready to assist!",
    position: 'top',
    spotlightPadding: 15,
    mascotMood: 'happy',
    category: 'support',
  },
  {
    id: 'tour-complete',
    target: 'body',
    title: "You're Ready to Go! 🎉",
    content: "Excellent! You now know your way around the Training Coordinator Dashboard. Start by checking your alerts and at-risk learners. Together, we'll help every learner succeed!",
    position: 'center',
    mascotMood: 'celebrate',
    category: 'outro',
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export default function OnboardingTour({
  isOpen,
  onClose,
  onComplete,
  demoMode = false,
}: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = TOUR_STEPS[currentStep];
  const progress = ((currentStep + 1) / TOUR_STEPS.length) * 100;

  const updateSpotlight = useCallback(() => {
    if (!step || step.position === 'center') {
      setSpotlightRect(null);
      setTooltipPosition({
        top: window.innerHeight / 2 - 180,
        left: window.innerWidth / 2 - 220,
      });
      return;
    }

    const element = document.querySelector(step.target);
    if (!element) {
      handleNext();
      return;
    }

    const rect = element.getBoundingClientRect();
    const padding = step.spotlightPadding || 8;

    setSpotlightRect(new DOMRect(
      rect.x - padding,
      rect.y - padding,
      rect.width + padding * 2,
      rect.height + padding * 2
    ));

    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const tooltipWidth = 440;
    const tooltipHeight = 280;
    const margin = 24;

    let top = 0;
    let left = 0;

    switch (step.position) {
      case 'top':
        top = rect.top - tooltipHeight - margin;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'bottom':
        top = rect.bottom + margin;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
        break;
      case 'left':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - margin;
        break;
      case 'right':
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + margin;
        break;
    }

    top = Math.max(margin, Math.min(top, window.innerHeight - tooltipHeight - margin));
    left = Math.max(margin, Math.min(left, window.innerWidth - tooltipWidth - margin));

    setTooltipPosition({ top, left });
  }, [step]);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        updateSpotlight();
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentStep, updateSpotlight]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
        case 'Enter':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleResize = () => updateSpotlight();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, updateSpotlight]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen || !step) return null;

  return (
    <div className="fixed inset-0 z-[10000]" role="dialog" aria-modal="true">
      {/* Overlay */}
      <div className="absolute inset-0 transition-all duration-500">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <mask id="spotlight-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              {spotlightRect && (
                <rect
                  x={spotlightRect.x}
                  y={spotlightRect.y}
                  width={spotlightRect.width}
                  height={spotlightRect.height}
                  rx="12"
                  fill="black"
                  className="transition-all duration-500"
                />
              )}
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.8)"
            mask="url(#spotlight-mask)"
          />
        </svg>

        {spotlightRect && (
          <div
            className="absolute border-2 border-cyan-400 rounded-xl transition-all duration-500"
            style={{
              top: spotlightRect.y,
              left: spotlightRect.x,
              width: spotlightRect.width,
              height: spotlightRect.height,
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.3)',
            }}
          />
        )}
      </div>

      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`absolute bg-white rounded-2xl shadow-2xl w-[440px] transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        {/* Progress bar */}
        <div className="h-1.5 bg-gray-100 rounded-t-2xl overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Mascot */}
        <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
          <KoenigMascot mood={step.mascotMood || 'happy'} size="large" />
        </div>

        {/* Content */}
        <div className="p-6 pl-8">
          {step.category && (
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 text-xs font-semibold uppercase tracking-wide rounded-full border border-cyan-200">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                {step.category}
              </span>
            </div>
          )}

          <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>

          <div className="relative bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
            <p className="text-gray-600 leading-relaxed">{step.content}</p>
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-50"></div>
          </div>

          {/* Step dots */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {TOUR_STEPS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-6 bg-gradient-to-r from-cyan-500 to-blue-500'
                    : idx < currentStep
                      ? 'bg-cyan-300'
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 font-medium">
                {currentStep + 1} of {TOUR_STEPS.length}
              </span>
              <button
                onClick={onClose}
                className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
              >
                Skip tour
              </button>
            </div>

            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-200"
              >
                {currentStep === TOUR_STEPS.length - 1 ? (
                  <>
                    Let's Go!
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                ) : (
                  <>
                    Next
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="px-6 pb-4">
          <p className="text-xs text-gray-400 text-center bg-gray-50 py-2 rounded-lg">
            Use <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600">←</kbd> <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600">→</kbd> to navigate • <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600">Esc</kbd> to close
          </p>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Bottom mascot */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
          <KoenigMascot mood="happy" size="small" />
          <p className="text-white/80 text-sm">
            {demoMode ? 'Demo Mode - Showing TC features' : "Hi! I'm Koey, your training guide!"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TOUR CONTEXT
// ============================================================================

interface TourContextValue {
  startTour: (demoMode?: boolean) => void;
  isActive: boolean;
  hasCompletedTour: boolean;
  isFirstVisit: boolean;
  isInitialized: boolean;
  resetTour: () => void;
}

const TourContext = React.createContext<TourContextValue | null>(null);

const STORAGE_KEYS = {
  TOUR_COMPLETED: 'learnova_tc_tour_completed',
  FIRST_VISIT: 'learnova_tc_first_visit',
};

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [hasCompletedTour, setHasCompletedTour] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [shouldAutoStart, setShouldAutoStart] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const tourCompleted = localStorage.getItem(STORAGE_KEYS.TOUR_COMPLETED);
    const visitedBefore = localStorage.getItem(STORAGE_KEYS.FIRST_VISIT);

    console.log('[TC Tour] Init check - completed:', tourCompleted, 'visited:', visitedBefore);

    if (visitedBefore === null) {
      console.log('[TC Tour] First time visitor detected!');
      localStorage.setItem(STORAGE_KEYS.FIRST_VISIT, new Date().toISOString());
      setIsFirstVisit(true);
      setHasCompletedTour(false);
      setShouldAutoStart(true);
    } else {
      setIsFirstVisit(false);
      setHasCompletedTour(tourCompleted === 'true');
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized && shouldAutoStart && !isActive) {
      console.log('[TC Tour] Auto-starting tour');
      const timer = setTimeout(() => {
        setIsActive(true);
        setShouldAutoStart(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isInitialized, shouldAutoStart, isActive]);

  const startTour = useCallback((demo = false) => {
    setDemoMode(demo);
    setIsActive(true);
  }, []);

  const resetTour = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOUR_COMPLETED);
    localStorage.removeItem(STORAGE_KEYS.FIRST_VISIT);
    setHasCompletedTour(false);
    setIsFirstVisit(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsActive(false);
    setHasCompletedTour(true);
    localStorage.setItem(STORAGE_KEYS.TOUR_COMPLETED, 'true');
  }, []);

  const handleClose = useCallback(() => {
    setIsActive(false);
    setHasCompletedTour(true);
    localStorage.setItem(STORAGE_KEYS.TOUR_COMPLETED, 'true');
  }, []);

  const contextValue = React.useMemo(() => ({
    startTour,
    isActive,
    hasCompletedTour,
    isFirstVisit,
    isInitialized,
    resetTour,
  }), [startTour, isActive, hasCompletedTour, isFirstVisit, isInitialized, resetTour]);

  return (
    <TourContext.Provider value={contextValue}>
      {children}
      <OnboardingTour
        isOpen={isActive}
        onClose={handleClose}
        onComplete={handleComplete}
        demoMode={demoMode}
      />
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = React.useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}

export { STORAGE_KEYS };
