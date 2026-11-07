'use client';

import React from 'react';
import { Sparkles, Bot, X } from 'lucide-react';
import { useAiAssistantStore } from '@/store/useAiAssistantStore';

export interface FloatingAiDockProps {
  className?: string;
}

export const FloatingAiDock: React.FC<FloatingAiDockProps> = ({ className = '' }) => {
  const isOpen = useAiAssistantStore((s) => s.isOpen);
  const toggleOpen = useAiAssistantStore((s) => s.toggleOpen);
  const messages = useAiAssistantStore((s) => s.messages);
  const activeContextStudyId = useAiAssistantStore((s) => s.activeContextStudyId);

  const assistantMessageCount = messages.filter((m) => m.role === 'assistant').length;

  return (
    <div
      className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 ${className}`}
      data-testid="floating-ai-dock"
    >
      <button
        type="button"
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open FlameGuard AI Assistant (Open Grounded AI Assistant)'}
        aria-expanded={isOpen}
        className="group relative bg-white/95 backdrop-blur-xl hover:bg-white text-slate-900 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.16)] rounded-full py-2.5 px-4 flex items-center gap-2.5 border-2 border-white hover:border-zinc-200/80 font-black cursor-pointer active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4FC02]"
      >
        {/* Outer Ring Glow */}
        <span
          className="absolute -inset-0.5 rounded-full bg-[#D4FC02]/20 blur-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        />

        {/* Icon & Label */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#D4FC02] text-zinc-950 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
            {isOpen ? (
              <X className="w-4 h-4 text-zinc-950 transition-transform duration-200 group-hover:rotate-90" />
            ) : (
              <div className="relative flex items-center justify-center">
                <Bot className="w-4 h-4 text-zinc-950" />
                <Sparkles className="w-2.5 h-2.5 text-zinc-950 absolute -top-1 -right-1.5 animate-pulse" />
              </div>
            )}
          </div>
          <span className="text-xs font-black tracking-tight text-slate-900">
            {isOpen ? 'Close' : 'FlameGuard AI'}
          </span>
        </div>

        {/* Unread / Active Assistant Message Count Badge */}
        {!isOpen && assistantMessageCount > 0 && (
          <span
            className="absolute -top-1 -right-1 z-20 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-[#D4FC02] text-zinc-950 text-[10px] font-bold shadow-md border-2 border-white"
            aria-label={`${assistantMessageCount} assistant messages`}
          >
            {assistantMessageCount}
          </span>
        )}

        {/* Pinned Context Dot Indicator */}
        {activeContextStudyId && (
          <span
            className="w-2 h-2 rounded-full bg-[#0B2374] ring-2 ring-white shrink-0"
            title={`Active Context: ${activeContextStudyId.toUpperCase()}`}
          />
        )}
      </button>
    </div>
  );
};
