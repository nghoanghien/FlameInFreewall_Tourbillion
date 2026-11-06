'use client';

import React from 'react';
import { Bot, User, AlertTriangle } from 'lucide-react';
import { CitationBadge } from './CitationBadge';
import type { ChatMessage } from '@/types';

export interface AiMessageItemProps {
  message: ChatMessage;
}

export const AiMessageItem: React.FC<AiMessageItemProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      {isAssistant && (
        <div className="w-7 h-7 rounded-md bg-[#D4FC02]/10 border border-[#D4FC02]/30 flex items-center justify-center shrink-0 mt-0.5">
          <Bot className="w-4 h-4 text-[#D4FC02]" />
        </div>
      )}

      <div
        className={`max-w-[85%] rounded-xl p-3.5 text-xs leading-relaxed space-y-2.5 ${
          isAssistant
            ? 'bg-[#0B1528] text-gray-200 border border-[#1E293B]'
            : 'bg-[#1E293B] text-white border border-[#334155]'
        }`}
      >
        {/* Message Text */}
        <div className="whitespace-pre-wrap space-y-1.5">{message.content}</div>

        {/* Evidence Gap Warning Banner */}
        {message.evidenceGapWarning && (
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <span>{message.evidenceGapWarning}</span>
          </div>
        )}

        {/* Grounding Citations List */}
        {message.citations && message.citations.length > 0 && (
          <div className="pt-2 border-t border-[#1E293B] space-y-1.5">
            <span className="text-[10px] font-mono font-medium text-gray-400 block tracking-wider uppercase">
              Grounding Citations ({message.citations.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {message.citations.map((citation, idx) => (
                <CitationBadge
                  key={`${citation.investigationId}-${citation.claimId || idx}`}
                  citation={citation}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {!isAssistant && (
        <div className="w-7 h-7 rounded-md bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center shrink-0 mt-0.5">
          <User className="w-4 h-4 text-[#00F0FF]" />
        </div>
      )}
    </div>
  );
};
