import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { TourProvider } from "@/components/OnboardingTour";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Koenig LMS - Training Coordinator Dashboard",
  description: "Koenig Solutions Training Coordinator Portal - Manage learners, track progress, and oversee training activities",
  keywords: ["LMS", "Training Coordinator", "Koenig Solutions", "Microsoft Training", "IT Training"],
  authors: [{ name: "Koenig Solutions" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-[#f0f9ff] min-h-screen flex flex-col`}>
        <TourProvider>
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 lg:ml-64">
              <div className="p-4 sm:p-6 lg:p-8">
                {children}
              </div>
            </main>
          </div>
          <Footer />
        </TourProvider>
      </body>
    </html>
  );
}
