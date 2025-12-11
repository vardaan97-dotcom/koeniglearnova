export interface Learner {
  id: string;
  name: string;
  email: string;
  progress: number;
  voucherRedeemed: 'Yes' | 'No' | 'NA';
  isCompleted: boolean;
  enrolledDate: string;
  details: LearnerDetails;
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
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  specialization: string[];
  rating: number;
  coursesDelivered: number;
  avatar?: string;
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
  date: string;
  startTime: string;
  endTime: string;
  trainer: string;
  type: 'class' | 'webinar' | 'exam';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
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
}
