import { describe, it, expect, beforeEach, vi } from 'vitest';
import { toast, toastStore, sileo } from '../src/components/toast/toast-store';

describe('Liquid Glass Dynamic Island Toast Store', () => {
  beforeEach(() => {
    toastStore.clear();
    vi.clearAllMocks();
  });

  it('adds toasts with correct defaults and properties', () => {
    const id = toast.success('Telemetry Synchronized', 'All NASA PSI streams active');
    const toasts = toastStore.getToasts();

    expect(toasts.length).toBe(1);
    expect(toasts[0].id).toBe(id);
    expect(toasts[0].type).toBe('success');
    expect(toasts[0].title).toBe('Telemetry Synchronized');
    expect(toasts[0].description).toBe('All NASA PSI streams active');
  });

  it('supports error, warning, info, loading, and default types', () => {
    toast.error('Combustion Alert', 'Extinction threshold reached');
    toast.warning('Oxygen Warning', 'O2 concentration elevated');
    toast.info('Model Note', 'Diffusion-dominated regime');
    toast.loading('Simulating', 'Running microgravity solver');
    toast.default('Status Update', 'ISS MSG facility ready');

    const toasts = toastStore.getToasts();
    expect(toasts.length).toBeLessThanOrEqual(3);
    expect(toasts.some((t) => t.type === 'default')).toBe(true);
  });

  it('splits title with colon into title and description when no description is given', () => {
    toast.success('Simulation: Navier-Stokes solved in 12ms');
    const toasts = toastStore.getToasts();
    expect(toasts[0].title).toBe('Simulation');
    expect(toasts[0].description).toBe('Navier-Stokes solved in 12ms');
  });

  it('allows dismissing a specific toast by id', () => {
    const id1 = toast.info('First Toast');
    const id2 = toast.info('Second Toast');

    expect(toastStore.getToasts().length).toBe(2);

    toast.dismiss(id1);
    const remaining = toastStore.getToasts();
    expect(remaining.length).toBe(1);
    expect(remaining[0].id).toBe(id2);
  });

  it('clears all toasts with toast.clear()', () => {
    toast.info('Toast A');
    toast.info('Toast B');
    expect(toastStore.getToasts().length).toBe(2);

    toast.clear();
    expect(toastStore.getToasts().length).toBe(0);
  });

  it('subscribes to toast changes and notifies listeners', () => {
    const listener = vi.fn();
    const unsubscribe = toastStore.subscribe(listener);

    expect(listener).toHaveBeenCalledTimes(1);

    toast.success('Test notification');
    expect(listener).toHaveBeenCalledTimes(2);

    unsubscribe();
    toast.info('Another notification');
    expect(listener).toHaveBeenCalledTimes(2);
  });

  it('handles promise resolution and rejection correctly', async () => {
    const successfulPromise = new Promise<string>((resolve) =>
      setTimeout(() => resolve('Simulated Result'), 10)
    );

    const promiseCall = toast.promise(successfulPromise, {
      loading: 'Calculating flame spread...',
      success: (data) => `Completed: ${data}`,
      error: 'Calculation failed',
    });

    expect(toastStore.getToasts().some((t) => t.type === 'loading')).toBe(true);

    const result = await promiseCall;
    expect(result).toBe('Simulated Result');

    const updated = toastStore.getToasts();
    expect(updated[0].type).toBe('success');
    expect(updated[0].title).toBe('Completed');
    expect(updated[0].description).toBe('Simulated Result');
  });

  it('handles promise rejection correctly', async () => {
    const failingPromise = new Promise<string>((_, reject) =>
      setTimeout(() => reject(new Error('Sensor Timeout')), 10)
    );

    await expect(
      toast.promise(failingPromise, {
        loading: 'Reading radiometer...',
        success: 'Radiometer ready',
        error: (err: unknown) => `Error: ${err instanceof Error ? err.message : String(err)}`,
      })
    ).rejects.toThrow('Sensor Timeout');

    const updated = toastStore.getToasts();
    expect(updated[0].type).toBe('error');
    expect(updated[0].title).toBe('Error');
    expect(updated[0].description).toBe('Sensor Timeout');
  });

  it('provides backward-compatible sileo methods', () => {
    sileo.success({ title: 'Sileo Success', description: 'Compatible call' });
    const toasts = toastStore.getToasts();
    expect(toasts[0].title).toBe('Sileo Success');
    expect(toasts[0].description).toBe('Compatible call');
  });
});
