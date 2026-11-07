import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, fireEvent, cleanup } from '@testing-library/react';
import { LiquidGlassToast } from '@/components/toast/LiquidGlassToast';
import { Toaster } from '@/components/toast/Toaster';
import { toast, toastStore } from '@/components/toast/toast-store';

describe('LiquidGlass Dynamic Island Toast System', () => {
  beforeEach(() => {
    toastStore.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    toastStore.clear();
    vi.useRealTimers();
  });

  it('renders toast with StructPaper LiquidGlass styling and Space Apps lime theme', () => {
    const dummyToast = {
      id: 'test-toast-1',
      type: 'success' as const,
      title: 'Telemetry Synced',
      description: 'Microgravity sensor calibrated',
      duration: 3500,
      dismissible: true,
      createdAt: Date.now(),
    };

    render(<LiquidGlassToast toast={dummyToast} onDismiss={vi.fn()} isTop={true} />);

    const toastElement = screen.getByText('Telemetry Synced').closest('[data-liquid-toast]');
    expect(toastElement).toBeDefined();
    expect(toastElement?.className).toContain('bg-[#ECFCCB]/70');
    expect(toastElement?.className).toContain('rounded-b-');
    expect(toastElement?.className).toContain('rounded-t-none');
    expect(screen.getByText('Telemetry Synced')).toBeDefined();
    expect(screen.getByText('Microgravity sensor calibrated')).toBeDefined();
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

    render(<LiquidGlassToast toast={dummyToast} onDismiss={onDismiss} />);

    const dismissBtn = screen.getByTestId('toast-dismiss-button');
    expect(dismissBtn).toBeDefined();
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

    render(<LiquidGlassToast toast={dummyToast} onDismiss={vi.fn()} />);

    const actionBtn = screen.getByRole('button', { name: 'Acknowledge' });
    expect(actionBtn).toBeDefined();
    fireEvent.click(actionBtn);
    expect(onAction).toHaveBeenCalled();
  });

  it('styles top toast with bottom rounded only and lower toasts with full rounded', () => {
    const { container } = render(<Toaster />);

    act(() => {
      toast.info('Top Toast', 'At top position');
      toast.success('Lower Toast', 'Stacked below');
    });

    const toastEls = container.querySelectorAll('[data-liquid-toast]');
    expect(toastEls.length).toBe(2);

    expect(toastEls[0].className).toContain('rounded-b-');
    expect(toastEls[0].className).toContain('rounded-t-none');

    expect(toastEls[1].className).toContain('rounded-2xl');
    expect(toastEls[1].className).not.toContain('rounded-t-none');
  });

  it('renders Toaster container fixed at top center with correct styling', () => {
    const { container } = render(<Toaster />);

    const toasterWrapper = container.firstChild as HTMLElement;
    expect(toasterWrapper.className).toContain('fixed');
    expect(toasterWrapper.className).toContain('top-0');
    expect(toasterWrapper.className).toContain('left-1/2');
    expect(toasterWrapper.className).toContain('-translate-x-1/2');
    expect(toasterWrapper.className).toContain('z-[99999]');
  });

  it('supports single-line inline mode with colon separator', () => {
    const { container } = render(<Toaster />);

    act(() => {
      toast.success('Synced', 'All telemetry valid', { inline: true });
    });

    expect(screen.getByText('Synced:')).toBeDefined();
    expect(screen.getByText('All telemetry valid')).toBeDefined();
    const toastEl = container.querySelector('[data-liquid-toast]');
    expect(toastEl).toBeDefined();
  });

  it('renders loading toast with sky blue container background', () => {
    const { container } = render(<Toaster />);

    act(() => {
      toast.loading('Simulating flame propagation...');
    });

    const toastEl = container.querySelector('[data-liquid-toast]');
    expect(toastEl?.className).toContain('bg-[#E0F2FE]/70');
  });

  it('expands text on hover and restores on mouse leave', () => {
    const { container } = render(<Toaster />);

    act(() => {
      toast.warning(
        'Warning threshold',
        'Long description text with rich details about fuel extinction limit in microgravity.'
      );
    });

    const toastEl = container.querySelector('[data-liquid-toast]') as HTMLElement;
    expect(toastEl).toBeDefined();
    expect(toastEl.className).toContain('sm:max-w-lg');

    const descEl = screen.getByText(/Long description text/);
    expect(descEl.className).toContain('line-clamp-2');

    act(() => {
      fireEvent.mouseEnter(toastEl);
    });

    expect(toastEl.getAttribute('data-toast-hovered')).toBe('true');
    expect(toastEl.className).toContain('sm:max-w-xl');
    expect(descEl.className).toContain('line-clamp-none');

    act(() => {
      fireEvent.mouseLeave(toastEl);
    });

    expect(toastEl.getAttribute('data-toast-hovered')).toBeNull();
    expect(toastEl.className).toContain('sm:max-w-lg');
    expect(descEl.className).toContain('line-clamp-2');
  });

  it('pauses and resets countdown timer when hovered', async () => {
    const { container } = render(<Toaster />);

    act(() => {
      toast.info('Sensor Check', 'Calibrating radiometer', { duration: 3000 });
    });

    let toastEls = container.querySelectorAll('[data-liquid-toast]');
    expect(toastEls.length).toBe(1);

    await act(async () => {
      vi.advanceTimersByTime(2500);
    });

    await act(async () => {
      fireEvent.mouseEnter(toastEls[0]);
    });

    await act(async () => {
      vi.advanceTimersByTime(4000);
    });
    expect(toastStore.getToasts().length).toBe(1);

    await act(async () => {
      fireEvent.mouseLeave(toastEls[0]);
      vi.advanceTimersByTime(150);
    });

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });
    expect(toastStore.getToasts().length).toBe(1);

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(toastStore.getToasts().length).toBe(0);
  });
});
