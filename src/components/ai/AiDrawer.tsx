'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Trash2,
  Sparkles,
  Bot,
  Compass,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useAiAssistantStore } from '@/store/useAiAssistantStore';
import { queryRagKnowledgeEngine, QUICK_PROMPTS } from '@/lib/ragKnowledgeEngine';
import { AiMessageItem } from './AiMessageItem';

export const AiDrawer: React.FC = () => {
  const isOpen = useAiAssistantStore((s) => s.isOpen);
  const setOpen = useAiAssistantStore((s) => s.setOpen);
  const messages = useAiAssistantStore((s) => s.messages);
  const addMessage = useAiAssistantStore((s) => s.addMessage);
  const clearMessages = useAiAssistantStore((s) => s.clearMessages);
  const activeContextStudyId = useAiAssistantStore((s) => s.activeContextStudyId);
  const setActiveContextStudyId = useAiAssistantStore((s) => s.setActiveContextStudyId);
  const isStreaming = useAiAssistantStore((s) => s.isStreaming);
  const setIsStreaming = useAiAssistantStore((s) => s.setIsStreaming);

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isStreaming]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend ?? input).trim();
    if (!query) return;

    // 1. Add User message
    addMessage({
      role: 'user',
      content: query,
    });

    setInput('');
    setIsStreaming(true);

    // 2. Deterministic RAG retrieval with brief simulated thinking cadence
    setTimeout(() => {
      const result = queryRagKnowledgeEngine(query, activeContextStudyId);
      addMessage({
        role: 'assistant',
        content: result.answer,
        citations: result.citations,
        evidenceGapWarning: result.evidenceGapWarning,
      });
      setIsStreaming(false);
    }, 280);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="FlameGuard Grounded AI Assistant"
    >
      {/* Backdrop overlay with blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-[#080C18] border-l border-[#1E293B] shadow-2xl flex flex-col justify-between text-[#F8F9FA] relative">
          {/* Header */}
          <div className="p-4 border-b border-[#1E293B] bg-[#0B1528]/80 backdrop-blur-md flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#D4FC02]/10 border border-[#D4FC02]/30 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-[#D4FC02]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-semibold text-white tracking-wide truncate">
                    FlameGuard Grounded AI
                  </h2>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D4FC02]/20 text-[#D4FC02] border border-[#D4FC02]/40">
                    RAG
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-mono truncate">
                  NASA Physical Sciences Informatics • Zero Hallucination
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clearMessages}
                  className="p-1.5 rounded-md text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                  title="Clear conversation history"
                  aria-label="Clear chat messages"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close assistant drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Context Study Banner */}
          {activeContextStudyId && (
            <div className="px-4 py-2 bg-[#00F0FF]/10 border-b border-[#00F0FF]/20 flex items-center justify-between text-xs font-mono text-[#00F0FF]">
              <div className="flex items-center gap-1.5 truncate">
                <Compass className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Active Study Context: {activeContextStudyId.toUpperCase()}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveContextStudyId(null)}
                className="hover:underline text-[11px] text-gray-300 ml-2 shrink-0"
              >
                Clear Context
              </button>
            </div>
          )}

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.length === 0 ? (
              <div className="space-y-4 py-3">
                <div className="p-4 rounded-xl bg-[#0B1528] border border-[#1E293B] space-y-2.5">
                  <div className="flex items-center gap-2 text-[#D4FC02]">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="font-semibold text-xs tracking-wider uppercase font-mono">
                      Offline-First Grounded Architecture
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Query verified microgravity combustion findings directly derived from 20 NASA PSI flight investigations and 45+ peer-reviewed claims. Every claim carries an exact study provenance badge and DOI citation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-mono font-medium text-gray-400 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4FC02]" />
                    <span>Quick Scientific Prompts</span>
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt.id}
                        type="button"
                        onClick={() => handleSend(prompt.query)}
                        className="w-full text-left p-2.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] border border-[#1E293B] hover:border-[#D4FC02]/40 text-xs text-gray-200 transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="line-clamp-1">{prompt.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#D4FC02] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <AiMessageItem key={message.id} message={message} />
              ))
            )}

            {/* Streaming Typing Indicator */}
            {isStreaming && (
              <div className="flex items-center gap-2.5 text-xs text-gray-400 font-mono py-1">
                <div className="w-7 h-7 rounded-md bg-[#D4FC02]/10 border border-[#D4FC02]/30 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#D4FC02] animate-pulse" />
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0B1528] border border-[#1E293B]">
                  <span>Grounding against NASA PSI claims</span>
                  <span className="inline-flex gap-1 ml-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4FC02] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4FC02] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4FC02] animate-bounce [animation-delay:0.4s]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="p-3 border-t border-[#1E293B] bg-[#0B1528]/90 backdrop-blur-md space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about microgravity combustion, Lunar 0.16g, cool flames..."
                className="flex-1 bg-[#080C18] border border-[#1E293B] focus:border-[#D4FC02] focus:ring-1 focus:ring-[#D4FC02] rounded-lg px-3.5 py-2 text-xs text-white placeholder-gray-500 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isStreaming}
                aria-label="Send message"
                className="w-9 h-9 rounded-lg bg-[#D4FC02] hover:bg-[#bce002] active:scale-95 disabled:opacity-40 disabled:pointer-events-none text-[#080C18] flex items-center justify-center font-bold transition-all cursor-pointer shrink-0 shadow-[0_0_15px_rgba(212,252,2,0.2)]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <p className="text-[10px] text-gray-500 text-center font-mono tracking-tight">
              Offline Grounded RAG • Zero API Keys • Traceable NASA PSI Citations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
