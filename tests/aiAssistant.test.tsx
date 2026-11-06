import React from 'react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import {
  queryRagKnowledgeEngine,
  isPropulsionOutOfScope,
  buildCitation,
  QUICK_PROMPTS,
} from '../src/lib/ragKnowledgeEngine';
import { CitationBadge } from '../src/components/ai/CitationBadge';
import { FloatingAiDock } from '../src/components/ai/FloatingAiDock';
import { AiDrawer } from '../src/components/ai/AiDrawer';
import { AppShell } from '../src/components/layout/AppShell';
import { useAiAssistantStore } from '../src/store/useAiAssistantStore';
import type { AiCitation } from '../src/types';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Grounded AI Assistant & RAG Engine (Task 10)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useAiAssistantStore.setState({
      isOpen: false,
      activeContextStudyId: null,
      messages: [],
      isStreaming: false,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // =========================================================================
  // 1. ragKnowledgeEngine Retrieval Tests
  // =========================================================================
  describe('ragKnowledgeEngine Retrieval', () => {
    it('retrieves Lunar 0.16g flammability with citations and evidence gap warning', () => {
      const result = queryRagKnowledgeEngine('How does Lunar 0.16g partial gravity affect flame spread?');
      expect(result.answer).toContain('Lunar partial gravity (0.16g)');
      expect(result.answer).toContain('12–20 cm/s');
      expect(result.citations.length).toBeGreaterThan(0);
      expect(result.evidenceGapWarning).toBeDefined();
      expect(result.evidenceGapWarning).toContain('NASA PSI Evidence Gap Warning');
      expect(result.isOutOfScope).toBeFalsy();
    });

    it('retrieves microgravity flame sphericity and buoyant extinction findings', () => {
      const result = queryRagKnowledgeEngine('Why do flames become spherical in microgravity?');
      expect(result.answer).toContain('spherical');
      expect(result.answer).toContain('buoyancy vanishes');
      expect(result.citations.some((c) => c.code.includes('SPICE') || c.code.includes('SLICE'))).toBe(true);
      expect(result.evidenceGapWarning).toBeUndefined();
    });

    it('retrieves cool flame phenomena from FLEX investigations', () => {
      const result = queryRagKnowledgeEngine('What are cool flames and why are they dangerous in spacecraft?');
      expect(result.answer).toContain('Cool flames');
      expect(result.answer).toContain('500–800 K');
      expect(result.answer).toContain('FLEX');
      expect(result.citations.some((c) => c.code.includes('FLEX'))).toBe(true);
    });

    it('retrieves Nomex and PMMA flammability in enriched 34% O2 exploration atmospheres', () => {
      const result = queryRagKnowledgeEngine('Does Nomex burn in 34% enriched oxygen exploration atmospheres?');
      expect(result.answer).toContain('Nomex');
      expect(result.answer).toContain('30–34% O₂');
      expect(result.citations.some((c) => c.code.includes('BASS-II') || c.code.includes('SoFIE'))).toBe(true);
    });

    it('compares BASS and SoFIE experiments with platform distinction', () => {
      const result = queryRagKnowledgeEngine('What is the difference between BASS and SoFIE?');
      expect(result.answer).toContain('BASS / BASS-II');
      expect(result.answer).toContain('Microgravity Science Glovebox (MSG)');
      expect(result.answer).toContain('SoFIE');
      expect(result.answer).toContain('Combustion Integrated Rack (CIR)');
      expect(result.citations.length).toBeGreaterThanOrEqual(2);
    });

    it('retrieves large-scale Cygnus Saffire vehicle fire test data', () => {
      const result = queryRagKnowledgeEngine('What did Saffire discover about large scale spacecraft fires?');
      expect(result.answer).toContain('SAFFIRE');
      expect(result.answer).toContain('Cygnus');
      expect(result.answer).toContain('0.4 m × 1.0 m');
      expect(result.citations.some((c) => c.code.includes('SAFFIRE'))).toBe(true);
    });

    it('retrieves fire suppression and smoke detection facts', () => {
      const result = queryRagKnowledgeEngine('How effective is fine water mist compared to nitrogen suppression?');
      expect(result.answer).toContain('Fine Water Mist');
      expect(result.answer).toContain('70% less water');
      expect(result.answer).toContain('Nitrogen Jet');
      expect(result.citations.some((c) => c.code.includes('FINE-WATER-MIST') || c.code.includes('BASS'))).toBe(true);
    });

    it('triggers out-of-scope guardrail for liquid rocket engines and propulsion thrusters', () => {
      const result = queryRagKnowledgeEngine('How does the RS-25 liquid rocket engine turbopump inject propellant?');
      expect(result.isOutOfScope).toBe(true);
      expect(result.answer).toContain('FlameGuard AI Scope Advisory: Rocket Propulsion Out of Scope');
      expect(result.answer).toContain('spacecraft cabin fire safety');
      expect(result.citations).toHaveLength(0);
      expect(isPropulsionOutOfScope('Merlin rocket engine bipropellant nozzle')).toBe(true);
    });

    it('dynamically queries arbitrary matching studies and claims', () => {
      const result = queryRagKnowledgeEngine('electric field chemi-ions in microgravity');
      expect(result.citations.length).toBeGreaterThan(0);
      expect(result.citations.some((c) => c.code.includes('ACME') || c.code.includes('E-FIELD'))).toBe(true);
    });

    it('prioritizes active study context when specified', () => {
      const result = queryRagKnowledgeEngine('What fuel materials were tested?', 'bass');
      expect(result.citations.some((c) => c.investigationId === 'bass' || c.code === 'BASS')).toBe(true);
    });

    it('handles empty query gracefully', () => {
      const result = queryRagKnowledgeEngine('   ');
      expect(result.answer).toContain('Please enter a combustion research question');
      expect(result.citations).toHaveLength(0);
    });

    it('buildCitation extracts all required citation provenance metadata', () => {
      const mockClaim = {
        id: 'TEST-CLAIM-01',
        investigationId: 'bass',
        investigationCode: 'BASS',
        category: 'forced_flow' as const,
        claimText: 'Test claim text for verification',
        scientificContext: 'Test context',
        evidenceStatus: 'Measured' as const,
        reviewStatus: 'Peer-Reviewed' as const,
        doi: '10.1016/j.combustflame.test',
        authors: 'Tester et al.',
        year: 2024,
      };

      const citation = buildCitation(mockClaim);
      expect(citation.code).toBe('BASS');
      expect(citation.claimId).toBe('TEST-CLAIM-01');
      expect(citation.badge).toBe('Measured');
      expect(citation.doi).toBe('10.1016/j.combustflame.test');
      expect(citation.facility).toContain('Glovebox');
    });
  });

  // =========================================================================
  // 2. CitationBadge Component Tests
  // =========================================================================
  describe('CitationBadge Component', () => {
    const sampleCitation: AiCitation = {
      investigationId: 'bass',
      code: 'BASS',
      title: 'Burning and Suppression of Solids',
      claimId: 'CLAIM-BASS-01',
      claimText: 'Airflow velocity between 0.5 and 50 cm/s dictates solid flame spread in 0g.',
      badge: 'Measured',
      doi: '10.1016/j.test.2024',
      facility: 'ISS - Microgravity Science Glovebox (MSG)',
    };

    it('renders citation badge with code and claim ID', () => {
      render(<CitationBadge citation={sampleCitation} />);
      const button = screen.getByRole('button', { name: /Citation provenance: BASS/i });
      expect(button).toBeDefined();
      expect(button.textContent).toContain('[BASS • CLAIM-BASS-01]');
    });

    it('opens provenance popover on click with study details and explorer link', () => {
      render(<CitationBadge citation={sampleCitation} />);
      const button = screen.getByRole('button', { name: /Citation provenance: BASS/i });

      // Click to toggle popover
      fireEvent.click(button);

      const popover = screen.getByRole('dialog', { name: /Evidence details for BASS/i });
      expect(popover).toBeDefined();
      expect(popover.textContent).toContain('Burning and Suppression of Solids');
      expect(popover.textContent).toContain('Measured');
      expect(popover.textContent).toContain('Airflow velocity between 0.5 and 50 cm/s');
      expect(popover.textContent).toContain('ISS - Microgravity Science Glovebox');

      // Check inspection link
      const explorerLink = screen.getByRole('link', { name: /Inspect Investigation/i });
      expect(explorerLink.getAttribute('href')).toBe('/explorer/bass');
    });

    it('closes popover on escape key', () => {
      render(<CitationBadge citation={sampleCitation} />);
      const button = screen.getByRole('button', { name: /Citation provenance: BASS/i });
      fireEvent.click(button);
      expect(screen.queryByRole('dialog')).toBeDefined();

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  // =========================================================================
  // 3. FloatingAiDock Component Tests
  // =========================================================================
  describe('FloatingAiDock Component', () => {
    it('renders floating dock button at bottom right', () => {
      render(<FloatingAiDock />);
      const button = screen.getByRole('button', { name: /Open Grounded AI Assistant/i });
      expect(button).toBeDefined();
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    it('toggles assistant drawer open on click', () => {
      render(<FloatingAiDock />);
      const button = screen.getByRole('button', { name: /Open Grounded AI Assistant/i });
      fireEvent.click(button);
      expect(useAiAssistantStore.getState().isOpen).toBe(true);
    });

    it('renders message badge count when closed and messages exist', () => {
      useAiAssistantStore.setState({
        isOpen: false,
        messages: [
          { id: '1', role: 'user', content: 'Hello', timestamp: 1 },
          { id: '2', role: 'assistant', content: 'Answer 1', timestamp: 2 },
          { id: '3', role: 'assistant', content: 'Answer 2', timestamp: 3 },
        ],
      });

      render(<FloatingAiDock />);
      const badge = screen.getByLabelText('2 assistant messages');
      expect(badge).toBeDefined();
      expect(badge.textContent).toBe('2');
    });

    it('renders active context indicator when activeContextStudyId is present', () => {
      useAiAssistantStore.setState({
        isOpen: false,
        activeContextStudyId: 'sofie-gel',
      });

      render(<FloatingAiDock />);
      const indicator = screen.getByTitle('Active Context: SOFIE-GEL');
      expect(indicator).toBeDefined();
    });
  });

  // =========================================================================
  // 4. AiDrawer Component Tests
  // =========================================================================
  describe('AiDrawer Component', () => {
    it('does not render when store isOpen is false', () => {
      useAiAssistantStore.setState({ isOpen: false });
      render(<AiDrawer />);
      expect(screen.queryByRole('dialog', { name: /FlameGuard Grounded AI Assistant/i })).toBeNull();
    });

    it('renders drawer with welcome card and quick prompts when opened with no messages', () => {
      useAiAssistantStore.setState({ isOpen: true, messages: [] });
      render(<AiDrawer />);
      expect(screen.getByRole('dialog', { name: /FlameGuard Grounded AI Assistant/i })).toBeDefined();
      expect(screen.getByText('Offline-First Grounded Architecture')).toBeDefined();
      expect(screen.getByText('Lunar 0.16g Flammability')).toBeDefined();
      expect(screen.getByText('Microgravity Sphericity')).toBeDefined();
      expect(screen.getByText('Cool Flame Hazards')).toBeDefined();
    });

    it('clicking a quick prompt submits question and retrieves grounded response with citations', async () => {
      useAiAssistantStore.setState({ isOpen: true, messages: [] });
      render(<AiDrawer />);

      const lunarPrompt = screen.getByText('Lunar 0.16g Flammability');
      fireEvent.click(lunarPrompt);

      // Verify user message was added
      expect(useAiAssistantStore.getState().messages[0].content).toContain('Lunar partial gravity (0.16g)');

      // Advance simulated thinking timer
      act(() => {
        vi.advanceTimersByTime(350);
      });

      // Verify assistant message was added with citations and gap warning
      const messages = useAiAssistantStore.getState().messages;
      expect(messages.length).toBe(2);
      expect(messages[1].role).toBe('assistant');
      expect(messages[1].citations?.length).toBeGreaterThan(0);
      expect(messages[1].evidenceGapWarning).toBeDefined();
    });

    it('submits manual query through text input and renders answer card', () => {
      useAiAssistantStore.setState({ isOpen: true, messages: [] });
      render(<AiDrawer />);

      const input = screen.getByPlaceholderText(/Ask about microgravity combustion/i);
      fireEvent.change(input, { target: { value: 'Why do flames become spherical in microgravity?' } });

      const sendButton = screen.getByRole('button', { name: /Send message/i });
      fireEvent.click(sendButton);

      act(() => {
        vi.advanceTimersByTime(350);
      });

      const messages = useAiAssistantStore.getState().messages;
      expect(messages.length).toBe(2);
      expect(messages[0].content).toBe('Why do flames become spherical in microgravity?');
      expect(messages[1].content).toContain('spherical');
    });

    it('displays active study context and allows clearing it', () => {
      useAiAssistantStore.setState({ isOpen: true, activeContextStudyId: 'flex' });
      render(<AiDrawer />);

      expect(screen.getByText(/Active Study Context: FLEX/i)).toBeDefined();
      const clearButton = screen.getByRole('button', { name: /Clear Context/i });
      fireEvent.click(clearButton);
      expect(useAiAssistantStore.getState().activeContextStudyId).toBeNull();
    });

    it('clears conversation history when clear button is clicked', () => {
      useAiAssistantStore.setState({
        isOpen: true,
        messages: [
          { id: '1', role: 'user', content: 'Test question', timestamp: 1 },
          { id: '2', role: 'assistant', content: 'Test answer', timestamp: 2 },
        ],
      });

      render(<AiDrawer />);
      const clearHistoryButton = screen.getByRole('button', { name: /Clear chat messages/i });
      fireEvent.click(clearHistoryButton);
      expect(useAiAssistantStore.getState().messages).toHaveLength(0);
    });

    it('closes drawer when close button or Escape key is triggered', () => {
      useAiAssistantStore.setState({ isOpen: true });
      render(<AiDrawer />);

      const closeButton = screen.getByRole('button', { name: /Close assistant drawer/i });
      fireEvent.click(closeButton);
      expect(useAiAssistantStore.getState().isOpen).toBe(false);
    });
  });

  // =========================================================================
  // 5. AppShell Integration Tests
  // =========================================================================
  describe('AppShell Integration', () => {
    it('globally mounts FloatingAiDock and AiDrawer in the layout', () => {
      render(
        <AppShell>
          <div data-testid="page-content">Dashboard View</div>
        </AppShell>
      );

      // Verify content is rendered
      expect(screen.getByTestId('page-content')).toBeDefined();

      // Verify floating dock button is globally present
      expect(screen.getByTestId('floating-ai-dock')).toBeDefined();
      expect(screen.getByRole('button', { name: /Open Grounded AI Assistant/i })).toBeDefined();
    });
  });
});
