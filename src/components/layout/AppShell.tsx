'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { Toaster } from '@/components/DynamicIslandToast';
import { FloatingAiDock } from '@/components/ai/FloatingAiDock';
import { AiDrawer } from '@/components/ai/AiDrawer';

export interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-[#F8F9FA] text-[#1A1A1A] relative selection:bg-[#D4FC02]/30 selection:text-[#0B2374]">
      {/* Background Subtle Gradient Grid Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0B2374]/5 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Global Dynamic Island Toaster */}
      <Toaster />

      {/* Persistent StructPaper DockPill Sidebar (Desktop & Tablet) */}
      <Sidebar />

      {/* Main Application Flow Area */}
      <div className="w-full flex-1 flex flex-col min-w-0 min-h-screen relative z-10">
        {/* Top Space Apps Header */}
        <Header />

        {/* Dashboard Content Container */}
        <main
          className="w-full flex-1 px-3 sm:px-6 lg:px-8 py-5 pb-24 sm:pb-8 flex flex-col min-w-0 min-h-0"
          id="main-content"
          role="main"
        >
          {children}
        </main>
      </div>

      {/* Floating Grounded AI Assistant Dock & Slide-Over Drawer */}
      <FloatingAiDock />
      <AiDrawer />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
};
