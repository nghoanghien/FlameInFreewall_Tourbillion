'use client';

import React from 'react';
import { Sparkles, Bot, X, MessageSquare } from 'lucide-react';
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
        aria-label={isOpen ? 'Close AI Assistant' : 'Open Grounded AI Assistant'}
        aria-expanded={isOpen}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0B1528] border border-[#D4FC02]/50 text-[#F8F9FA] shadow-[0_0_25px_rgba(212,252,2,0.25)] hover:shadow-[0_0_35px_rgba(212,252,2,0.45)] hover:border-[#D4FC02] active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4FC02] cursor-pointer`}
      >
        {/* Pulsing Space Apps Lime Ambient Glow Aura */}
        <span
          className="absolute inset-0 rounded-full bg-[#D4FC02]/20 animate-ping opacity-30 pointer-events-none"
          aria-hidden="true"
        />

        {/* Outer Ring Glow */}
        <span
          className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#D4FC02]/30 via-transparent to-[#00F0FF]/30 blur-sm opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none"
          aria-hidden="true"
        />

        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center">
          {isOpen ? (
            <X className="w-6 h-6 text-[#D4FC02] transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <div className="relative">
              <Bot className="w-6 h-6 text-[#D4FC02] group-hover:scale-110 transition-transform duration-200" />
              <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] absolute -top-1.5 -right-2 animate-pulse" />
            </div>
          )}
        </div>

        {/* Unread / Active Assistant Message Count Badge */}
        {!isOpen && assistantMessageCount > 0 && (
          <span
            className="absolute -top-1 -right-1 z-20 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-[#D4FC02] text-[#080C18] text-[10px] font-mono font-bold shadow-md animate-in zoom-in-75"
            aria-label={`${assistantMessageCount} assistant messages`}
          >
            {assistantMessageCount}
          </span>
        )}

        {/* Pinned Context Dot Indicator */}
        {activeContextStudyId && (
          <span
            className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 z-20 w-2 h-2 rounded-full bg-[#00F0FF] ring-2 ring-[#0B1528]"
            title={`Active Context: ${activeContextStudyId.toUpperCase()}`}
          />
        )}
      </button>
    </div>
  );
};
