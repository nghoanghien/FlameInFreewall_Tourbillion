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
    expect(css).toContain('--status-measured: #84CC16');
  });

  it('strictly enforces zero emerald in src/ in favor of lime', () => {
    function walkDir(dir: string, fileList: string[] = []): string[] {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          walkDir(filePath, fileList);
        } else if (/\.(tsx?|css)$/.test(file)) {
          fileList.push(filePath);
        }
      }
      return fileList;
    }

    const srcFiles = walkDir(path.resolve(__dirname, '../src'));
    const filesWithEmerald: string[] = [];

    for (const file of srcFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      if (/emerald/i.test(content)) {
        filesWithEmerald.push(path.relative(path.resolve(__dirname, '..'), file));
      }
    }

    expect(filesWithEmerald).toEqual([]);
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
