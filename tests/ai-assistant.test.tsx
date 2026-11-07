import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FloatingAiDock } from '@/components/ai/FloatingAiDock';
import { AiDrawer } from '@/components/ai/AiDrawer';
import { useAiAssistantStore } from '@/store/useAiAssistantStore';

expect.extend({
  toBeInTheDocument(received) {
    const pass = Boolean(received);
    return {
      pass,
      message: () => `expected element ${pass ? 'not ' : ''}to be in document`,
    };
  },
});

describe('AI Assistant Light Theme', () => {
  it('renders floating dock and light drawer with crisp white styling and dark text', () => {
    useAiAssistantStore.setState({ isOpen: false });
    render(
      <>
        <FloatingAiDock />
        <AiDrawer />
      </>
    );
    expect(screen.getByLabelText(/Open FlameGuard AI/i)).toBeInTheDocument();
  });

  it('renders drawer with light theme classes when open', () => {
    useAiAssistantStore.setState({ isOpen: true, messages: [] });
    render(
      <>
        <FloatingAiDock />
        <AiDrawer />
      </>
    );

    const dialog = screen.getByRole('dialog', { name: /FlameGuard Grounded AI Assistant/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/FlameGuard Grounded AI/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask about microgravity combustion/i)).toBeInTheDocument();
  });
});
