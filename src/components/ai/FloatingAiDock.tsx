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
        className="group relative bg-[#0B2374] text-[#D4FC02] hover:bg-[#152E85] shadow-[0_10px_30px_rgba(11,35,116,0.30)] rounded-full p-4 flex items-center gap-2 border-2 border-lime-300 font-extrabold cursor-pointer active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4FC02]"
      >
        {/* Pulsing Space Apps Lime Ambient Glow Aura */}
        <span
          className="absolute inset-0 rounded-full bg-lime-400/20 animate-ping opacity-30 pointer-events-none"
          aria-hidden="true"
        />

        {/* Outer Ring Glow */}
        <span
          className="absolute -inset-1 rounded-full bg-gradient-to-tr from-lime-300/30 via-transparent to-sky-300/30 blur-sm opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        />

        {/* Icon & Label */}
        <div className="relative z-10 flex items-center gap-2">
          {isOpen ? (
            <X className="w-5 h-5 text-[#D4FC02] transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <div className="relative flex items-center">
              <Bot className="w-5 h-5 text-[#D4FC02] group-hover:scale-110 transition-transform duration-200" />
              <Sparkles className="w-3.5 h-3.5 text-[#D4FC02] absolute -top-1.5 -right-2 animate-pulse" />
            </div>
          )}
          <span className="text-xs font-extrabold tracking-wide text-[#D4FC02]">
            {isOpen ? 'Close' : 'FlameGuard AI'}
          </span>
        </div>

        {/* Unread / Active Assistant Message Count Badge */}
        {!isOpen && assistantMessageCount > 0 && (
          <span
            className="absolute -top-1 -right-1 z-20 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-[#D4FC02] text-[#0B2374] text-[10px] font-mono font-bold shadow-md animate-in zoom-in-75 border border-[#0B2374]"
            aria-label={`${assistantMessageCount} assistant messages`}
          >
            {assistantMessageCount}
          </span>
        )}

        {/* Pinned Context Dot Indicator */}
        {activeContextStudyId && (
          <span
            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 z-20 w-2.5 h-2.5 rounded-full bg-[#D4FC02] ring-2 ring-[#0B2374]"
            title={`Active Context: ${activeContextStudyId.toUpperCase()}`}
          />
        )}
      </button>
    </div>
  );
};
