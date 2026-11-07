import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import fs from 'fs';
import path from 'path';
import { AppShell } from '@/components/layout/AppShell';

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Design Tokens & AppShell', () => {
  it('defines StructPaper light theme CSS variables in globals.css', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../src/app/globals.css'), 'utf-8');
    expect(css).toContain('--bg-primary: #F8F9FA');
    expect(css).toContain('--bg-card: #FFFFFF');
    expect(css).toContain('--text-main: #1A1A1A');
    expect(css).toContain('--text-muted: #64748B');
    expect(css).toContain('--border-color: #EAECEF');
    expect(css).toContain('--brand-lime: #D4FC02');
    expect(css).toContain('--brand-navy: #0B2374');
  });

  it('renders AppShell with StructPaper light background #F8F9FA', () => {
    const { container } = render(
      <AppShell>
        <div data-testid="content">Dashboard Content</div>
      </AppShell>
    );
    const shellRoot = container.firstElementChild;
    expect(shellRoot?.className).toContain('bg-[#F8F9FA]');
    expect(shellRoot?.className).toContain('text-[#1A1A1A]');
  });
});
