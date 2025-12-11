export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type EngagementLevel = 'highly_engaged' | 'engaged' | 'moderate' | 'low' | 'inactive';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';
export type CertificationStatus = 'not_started' | 'scheduled' | 'passed' | 'failed' | 'expired';

export interface Learner {
  id: string;
  name: string;
  email: string;
  phone?: string;
  progress: number;
  voucherRedeemed: 'Yes' | 'No' | 'NA';
  isCompleted: boolean;
  enrolledDate: string;
  details: LearnerDetails;
  // New fields for enhanced tracking
  lastActiveDate: string;
  engagementScore: number;
  riskLevel: RiskLevel;
  batchId?: string;
  courseId: string;
  attendance: AttendanceRecord[];
  certificationStatus: CertificationStatus;
  examDate?: string;
  voucherCode?: string;
  voucherExpiry?: string;
  notes?: string[];
  tags?: string[];
}

export interface LearnerDetails {
  modulesCompleted: number;
  totalModules: number;
  videosWatched: number;
  totalVideos: number;
  timeWatched: string;
  totalTime: string;
  averageScore: number;
  questionsAttempted: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  lastModuleCompleted?: string;
  currentModule?: string;
  streakDays?: number;
  totalLogins?: number;
  avgSessionDuration?: string;
}

export interface AttendanceRecord {
  sessionId: string;
  date: string;
  status: AttendanceStatus;
  joinTime?: string;
  leaveTime?: string;
  duration?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  provider: string;
  category: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'completed';
  learnersCount: number;
  completionRate: number;
  // New fields
  maxCapacity?: number;
  waitlistCount?: number;
  trainerId?: string;
  prerequisites?: string[];
  modules?: CourseModule[];
  price?: number;
  certificationIncluded?: boolean;
  description?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  order: number;
  isCompleted?: boolean;
}

export interface Batch {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  courseCode?: string;
  startDate: string;
  endDate: string;
  trainerId: string;
  trainerName: string;
  learnersCount: number;
  maxCapacity: number;
  status: 'upcoming' | 'active' | 'completed';
  schedule: BatchSchedule[];
  averageProgress: number;
}

export interface BatchSchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specialization: string[];
  rating: number;
  coursesDelivered: number;
  avatar?: string;
  bio?: string;
  availability?: TrainerAvailability[];
  certifications?: string[];
}

export interface TrainerAvailability {
  date: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface CustomerSuccessManager {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
}

export interface SupportDesk {
  email: string;
  name: string;
}

export interface ScheduleEvent {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  batchId?: string;
  date: string;
  startTime: string;
  endTime: string;
  trainer: string;
  type: 'class' | 'webinar' | 'exam' | 'one-on-one';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  // New fields
  meetingLink?: string;
  recordingLink?: string;
  attendees?: string[];
  description?: string;
}

export interface DashboardStats {
  totalLearners: number;
  activeCourses: number;
  averageCompletion: number;
  vouchersRedeemed: number;
  upcomingClasses: number;
  completedThisMonth: number;
}

export interface Webinar {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  instructor: string;
  registrationLink: string;
  // New fields
  registeredCount?: number;
  maxCapacity?: number;
  description?: string;
  topics?: string[];
}

// New interfaces for enhanced functionality

export interface Alert {
  id: string;
  type: 'risk' | 'deadline' | 'attendance' | 'voucher' | 'certification' | 'engagement';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  learnerId?: string;
  learnerName?: string;
  courseId?: string;
  courseName?: string;
  actionRequired: boolean;
  actionLabel?: string;
  actionLink?: string;
  createdAt: string;
  isRead: boolean;
  isDismissed: boolean;
}


export interface Communication {
  id: string;
  type: 'email' | 'sms' | 'notification';
  subject: string;
  message: string;
  recipients: string[];
  sentAt: string;
  sentBy: string;
  status: 'sent' | 'failed' | 'pending';
  templateId?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  category: 'reminder' | 'welcome' | 'progress' | 'certificate' | 'exam' | 'general';
  variables: string[];
}

export interface Voucher {
  id: string;
  code: string;
  learnerId: string;
  learnerName: string;
  courseId: string;
  courseName: string;
  examCode: string;
  issuedDate: string;
  expiryDate: string;
  status: 'active' | 'redeemed' | 'expired';
  redeemedDate?: string;
}

export interface Enrollment {
  id: string;
  learnerId: string;
  learnerName: string;
  learnerEmail: string;
  courseId: string;
  courseName: string;
  batchId?: string;
  batchName?: string;
  enrolledDate: string;
  enrolledBy: string;
  status: 'active' | 'completed' | 'dropped' | 'waitlisted';
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  badge?: number;
  color: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  userId: string;
  userName: string;
  targetType: 'learner' | 'course' | 'batch' | 'exam' | 'voucher';
  targetId: string;
  targetName: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ReportFilter {
  dateRange: { start: string; end: string };
  courseIds: string[];
  batchIds: string[];
  status: string[];
}

export interface LearnerInsight {
  id: string;
  type: 'improvement' | 'decline' | 'risk' | 'achievement' | 'recommendation';
  title: string;
  description: string;
  learnerId?: string;
  learnerName?: string;
  actionLabel?: string;
  actionLink?: string;
  metric?: {
    value: number;
    unit: string;
    change?: number;
  };
  createdAt?: string;
}

export interface ScheduleSession {
  id: string;
  title: string;
  courseId?: string;
  courseName?: string;
  batchId?: string;
  date: string;
  startTime: string;
  endTime: string;
  trainer?: string;
  type: 'class' | 'webinar' | 'exam' | 'one-on-one' | 'meeting';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  location?: string;
  isOnline: boolean;
  joinUrl?: string;
  attendees: number;
  description?: string;
}

export interface Deadline {
  id: string;
  type: 'course_end' | 'exam' | 'voucher_expiry' | 'enrollment' | 'assignment';
  title: string;
  date: string;
  daysRemaining?: number;
  relatedId?: string;
  relatedName?: string;
  learnerName?: string;
  affectedLearners?: number;
  isCompleted?: boolean;
}
