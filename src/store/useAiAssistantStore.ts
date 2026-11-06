import { create } from 'zustand';
import type { ChatMessage } from '../types';

export interface AiAssistantStoreState {
  isOpen: boolean;
  activeContextStudyId: string | null;
  messages: ChatMessage[];
  isStreaming: boolean;

  setOpen: (open: boolean) => void;
  toggleOpen: () => void;
  setActiveContextStudyId: (id: string | null) => void;
  addMessage: (
    message: Omit<ChatMessage, 'id' | 'timestamp'> & {
      id?: string;
      timestamp?: number;
    }
  ) => void;
  clearMessages: () => void;
  setIsStreaming: (isStreaming: boolean) => void;
}

export const useAiAssistantStore = create<AiAssistantStoreState>((set) => ({
  isOpen: false,
  activeContextStudyId: null,
  messages: [],
  isStreaming: false,

  setOpen: (open: boolean) =>
    set({
      isOpen: open,
    }),

  toggleOpen: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),

  setActiveContextStudyId: (id: string | null) =>
    set({
      activeContextStudyId: id,
    }),

  addMessage: (message) =>
    set((state) => {
      const fullMessage: ChatMessage = {
        ...message,
        id: message.id || `msg-${Date.now()}-${state.messages.length + 1}`,
        timestamp: message.timestamp ?? Date.now(),
      };
      return {
        messages: [...state.messages, fullMessage],
      };
    }),

  clearMessages: () =>
    set({
      messages: [],
    }),

  setIsStreaming: (isStreaming: boolean) =>
    set({
      isStreaming,
    }),
}));
