import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LiquidGlassToast } from '@/components/toast/LiquidGlassToast';

expect.extend({
  toBeInTheDocument(received) {
    const pass = Boolean(received);
    return {
      pass,
      message: () => `expected element ${pass ? 'not ' : ''}to be in document`,
    };
  },
});

describe('Liquid Glass Toast Light Theme', () => {
  it('renders toast with StructPaper light aesthetic classes and dark text', () => {
    const dummyToast = {
      id: 'test-toast-1',
      type: 'success' as const,
      title: 'Telemetry Synced',
      description: 'Microgravity sensor calibrated',
      duration: 3500,
      dismissible: true,
      createdAt: Date.now(),
    };

    render(
      <LiquidGlassToast
        toast={dummyToast}
        onDismiss={vi.fn()}
      />
    );

    const toastElement = screen.getByText('Telemetry Synced').closest('[data-liquid-toast]');
    expect(toastElement).toBeInTheDocument();
    expect(toastElement?.className).toContain('bg-white/95');
    expect(toastElement?.className).toContain('text-zinc-900');
    expect(screen.getByText('Telemetry Synced')).toBeInTheDocument();
    expect(screen.getByText('Microgravity sensor calibrated')).toBeInTheDocument();
  });

  it('renders dismiss button and calls onDismiss when clicked', () => {
    const onDismiss = vi.fn();
    const dummyToast = {
      id: 'test-toast-2',
      type: 'info' as const,
      title: 'Study Queued',
      description: 'FLEX added to workspace',
      duration: 3500,
      dismissible: true,
      createdAt: Date.now(),
    };

    render(
      <LiquidGlassToast
        toast={dummyToast}
        onDismiss={onDismiss}
      />
    );

    const dismissBtn = screen.getByTestId('toast-dismiss-button');
    expect(dismissBtn).toBeInTheDocument();
    fireEvent.click(dismissBtn);
    expect(onDismiss).toHaveBeenCalledWith('test-toast-2');
  });

  it('renders action button and triggers onClick when present', () => {
    const onAction = vi.fn();
    const dummyToast = {
      id: 'test-toast-3',
      type: 'warning' as const,
      title: 'Oxygen Limit',
      description: '34% O2 enriched atmosphere',
      duration: 3500,
      createdAt: Date.now(),
      action: {
        label: 'Acknowledge',
        onClick: onAction,
      },
    };

    render(
      <LiquidGlassToast
        toast={dummyToast}
        onDismiss={vi.fn()}
      />
    );

    const actionBtn = screen.getByRole('button', { name: 'Acknowledge' });
    expect(actionBtn).toBeInTheDocument();
    fireEvent.click(actionBtn);
    expect(onAction).toHaveBeenCalled();
  });
});
