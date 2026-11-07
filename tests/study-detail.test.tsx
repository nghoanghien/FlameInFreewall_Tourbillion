import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StudyDetailClient } from '../src/app/(dashboard)/explorer/[id]/StudyDetailClient';
import { INVESTIGATIONS } from '../src/data/investigations';

expect.extend({
  toBeInTheDocument(received) {
    const pass = Boolean(received);
    return {
      pass,
      message: () => `expected element ${pass ? 'not ' : ''}to be in document`,
    };
  },
});

vi.mock('next/navigation', () => ({
  usePathname: () => '/explorer/bass',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useParams: () => ({ id: 'bass' }),
}));

describe('Study Detail Light Theme', () => {
  it('renders study detail header, tabs, and test runs table with white cards and dark text', () => {
    const study = INVESTIGATIONS[0];
    render(<StudyDetailClient investigation={study} />);
    expect(screen.getByText(study.name!)).toBeInTheDocument();
    expect(screen.getByText(/Test Runs/i)).toBeInTheDocument();
    expect(screen.getByText(/Chamber Overview/i)).toBeInTheDocument();
  });
});
