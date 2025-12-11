# Koenig LMS - Learning Management System

A modern, responsive Learning Management System dashboard for Koenig Solutions, built with Next.js 16, React 19, and TailwindCSS 4.

## Features

- **Dashboard Overview**: Real-time statistics and KPIs for training coordinators
- **Learner Management**: Track individual learner progress with expandable detail cards
- **Course Management**: Browse and manage Microsoft certified training courses
- **Schedule Management**: View and manage training sessions, webinars, and exams
- **Trainer Directory**: Access trainer profiles and contact information
- **Support Center**: Quick access to customer success managers and support resources
- **Reports & Analytics**: Comprehensive reporting on learner progress and course performance
- **Export Functionality**: Download learner data as CSV/Excel

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: TailwindCSS 4
- **Icons**: Lucide React
- **Components**: Radix UI primitives
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd koenig-lms

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
koenig-lms/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── courses/        # Course management
│   │   ├── learners/       # Learner management
│   │   ├── reports/        # Analytics & reports
│   │   ├── schedule/       # Schedule management
│   │   ├── settings/       # User settings
│   │   ├── support/        # Support center
│   │   ├── trainers/       # Trainer directory
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Dashboard home
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable UI components
│   ├── data/               # Mock data
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── package.json
└── README.md
```

## Key Components

- **Header**: Navigation with user profile and mobile menu
- **Sidebar**: Main navigation with active state indicators
- **LearnerCard**: Expandable learner progress cards
- **CourseSelector**: Course dropdown with Microsoft badge
- **ProgressBar**: Animated linear progress indicator
- **CircularProgress**: SVG circular progress charts
- **StatCard**: Dashboard statistics cards
- **SupportSection**: Trainer and CSM contact info

## Deployment

### Deploy to Vercel

The easiest way to deploy this application:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your repository
4. Deploy with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Other Platforms

The application can be deployed to any platform that supports Node.js:

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Color Palette

The design follows Koenig Solutions' brand guidelines:

- **Primary**: `#0891b2` (Cyan 600)
- **Primary Dark**: `#0e7490` (Cyan 700)
- **Accent**: `#10b981` (Emerald 500)
- **Background**: `#f0f9ff` (Sky 50)
- **Card Background**: `#ffffff`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright 2025 Koenig Solutions. All rights reserved.
