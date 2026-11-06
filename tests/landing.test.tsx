import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LandingHero } from '../src/components/landing/LandingHero';
import { KurzgesagtFlameScene } from '../src/components/landing/KurzgesagtFlameScene';
import { AtmosphericPhysics } from '../src/components/landing/AtmosphericPhysics';
import { MissionControlCTA } from '../src/components/landing/MissionControlCTA';
import { LandingFooter } from '../src/components/landing/LandingFooter';
import LandingPage from '../src/app/(landing)/page';

// Mock next/navigation if needed
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

describe('Kurzgesagt Art Style Landing Page (/)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('LandingHero Component', () => {
    it('renders the top Space Apps announcement banner in Electric Lime', () => {
      render(<LandingHero />);
      const banner = screen.getByTestId('announcement-banner');
      expect(banner).toBeDefined();
      expect(banner.className).toContain('bg-[#D4FC02]');
      expect(screen.getByText(/Space Apps Connect is now open!/i)).toBeDefined();
    });

    it('renders the Royal Navy space navigation bar with brand logo and links', () => {
      render(<LandingHero />);
      const navbar = screen.getByTestId('landing-navbar');
      expect(navbar).toBeDefined();
      expect(navbar.className).toContain('bg-[#0B2374]/80');
      expect(screen.getByText('FlameGuard')).toBeDefined();
      expect(screen.getByText('Flame Physics (0g vs 1g)')).toBeDefined();
      expect(screen.getByText('Lunar Flammability Paradox')).toBeDefined();
    });

    it('renders all 3 primary workspace action buttons with correct href targets', () => {
      render(<LandingHero />);
      const workspaceLink = screen.getByRole('link', { name: /Enter Research Workspace/i });
      expect(workspaceLink.getAttribute('href')).toBe('/dashboard');

      const explorerLink = screen.getByRole('link', { name: /Explore 20 PSI Studies/i });
      expect(explorerLink.getAttribute('href')).toBe('/explorer');

      const scenarioLink = screen.getByRole('link', { name: /Run Scenario Simulation/i });
      expect(scenarioLink.getAttribute('href')).toBe('/mission');
    });

    it('displays the 4 key telemetry overview badges', () => {
      render(<LandingHero />);
      expect(screen.getByText('20 Studies')).toBeDefined();
      expect(screen.getByText('148+ Runs')).toBeDefined();
      expect(screen.getByText('0g vs 1g')).toBeDefined();
      expect(screen.getByText('0 < g < 1')).toBeDefined();
    });
  });

  describe('KurzgesagtFlameScene Component', () => {
    it('renders side-by-side Earth 1g vs ISS 0g comparison chambers by default', () => {
      render(<KurzgesagtFlameScene />);
      expect(screen.getByTestId('side-by-side-grid')).toBeDefined();
      expect(screen.getByText(/Earth 1.00g Terrestrial Flame/i)).toBeDefined();
      expect(screen.getByText(/ISS 0.00g Microgravity Flame/i)).toBeDefined();
      expect(screen.getByText(/Spherical Diffusion/i)).toBeDefined();
      expect(screen.getByText(/Buoyant Plume/i)).toBeDefined();
    });

    it('allows switching between gravity presets and updates telemetry HUD', () => {
      render(<KurzgesagtFlameScene />);
      const hud = screen.getByTestId('live-telemetry-hud');
      expect(hud).toBeDefined();

      // Initial 0g microgravity telemetry: sphericity should be high (98%)
      expect(screen.getByText('98%')).toBeDefined();

      // Click Earth preset button (1.00g)
      const earthBtn = screen.getByTestId('preset-btn-earth');
      fireEvent.click(earthBtn);

      // Now sphericity should drop into terrestrial teardrop regime (<= 25%)
      expect(screen.getByText(/2[45]%/)).toBeDefined();
    });

    it('toggles into interactive morph mode with continuous gravity slider', () => {
      render(<KurzgesagtFlameScene />);
      const morphBtn = screen.getByTestId('mode-morph');
      fireEvent.click(morphBtn);

      expect(screen.getByTestId('morph-chamber')).toBeDefined();
      const slider = screen.getByTestId('gravity-slider') as HTMLInputElement;
      expect(slider).toBeDefined();

      // Change slider value to 0.5g
      fireEvent.change(slider, { target: { value: '0.5' } });
      expect(slider.value).toBe('0.5');

      // Telemetry HUD updates
      expect(screen.getByText(/Partial-Gravity Mixed Convection/i)).toBeDefined();
    });

    it('renders the NASA PSI physics discovery takeaway callout card', () => {
      render(<KurzgesagtFlameScene />);
      expect(
        screen.getByText(/Why ISS Flames Burn Longer & Cooler/i)
      ).toBeDefined();
    });
  });

  describe('AtmosphericPhysics Component', () => {
    it('renders the Lunar Flammability Paradox section', () => {
      render(<AtmosphericPhysics />);
      expect(screen.getByTestId('atmospheric-physics')).toBeDefined();
      expect(screen.getByRole('heading', { name: /The Moon Base Trap/i })).toBeDefined();
      expect(screen.getByText(/Equal ppO₂ ≠ Equal Fire Safety/i)).toBeDefined();
    });

    it('calculates equal breathing partial pressure (3.06 psia) for Artemis Moon Base by default', () => {
      render(<AtmosphericPhysics />);
      expect(screen.getByText('3.06 psia')).toBeDefined();
      expect(screen.getByText('7.14 psia')).toBeDefined();
      expect(screen.getByText('Extreme Flammability Risk')).toBeDefined();
      expect(screen.getByText(/2.3x Spread Rate/i)).toBeDefined();
    });

    it('switches atmospheric presets to Earth Sea-Level baseline', () => {
      render(<AtmosphericPhysics />);
      const earthTab = screen.getByTestId('atmo-tab-earth');
      fireEvent.click(earthTab);

      // Earth has 3.09 psia ppO2, 1.0x spread multiplier, Nominal risk
      expect(screen.getByText('3.09 psia')).toBeDefined();
      expect(screen.getByText('11.61 psia')).toBeDefined();
      expect(screen.getByText('Nominal')).toBeDefined();
      expect(screen.getByText(/1.0x Spread Rate/i)).toBeDefined();
    });

    it('switches to EVA Spacesuit garment condition with extreme flammability', () => {
      render(<AtmosphericPhysics />);
      const evaTab = screen.getByTestId('atmo-tab-eva');
      fireEvent.click(evaTab);

      expect(screen.getByText('2.45 psia')).toBeDefined();
      expect(screen.getByText(/2.8x Spread Rate/i)).toBeDefined();
    });
  });

  describe('MissionControlCTA Component', () => {
    it('renders all three mission pillar cards linking to workspace routes', () => {
      render(<MissionControlCTA />);
      expect(screen.getByTestId('card-dashboard')).toBeDefined();
      expect(screen.getByTestId('card-explorer')).toBeDefined();
      expect(screen.getByTestId('card-mission')).toBeDefined();

      const dashboardBtn = screen.getByTestId('cta-btn-dashboard');
      expect(dashboardBtn.getAttribute('href')).toBe('/dashboard');

      const explorerBtn = screen.getByTestId('cta-btn-explorer');
      expect(explorerBtn.getAttribute('href')).toBe('/explorer');

      const missionBtn = screen.getByTestId('cta-btn-mission');
      expect(missionBtn.getAttribute('href')).toBe('/mission');
    });
  });

  describe('LandingFooter Component', () => {
    it('renders NASA Space Apps 2026 credits and official PSI links', () => {
      render(<LandingFooter />);
      expect(screen.getByTestId('landing-footer')).toBeDefined();
      expect(
        screen.getByText(/NASA Space Apps Challenge 2026: Flame in Freefall/i)
      ).toBeDefined();
      expect(screen.getByText('NASA PSI Repository')).toBeDefined();
      expect(screen.getByText('Space Apps Challenge 2026')).toBeDefined();
    });

    it('displays the mandatory NASA Fire Safety protocol disclaimer', () => {
      render(<LandingFooter />);
      const disclaimer = screen.getByTestId('safety-disclaimer');
      expect(disclaimer).toBeDefined();
      expect(
        screen.getByText(/NASA Physical Sciences Fire Safety Protocol & Disclaimer/i)
      ).toBeDefined();
      expect(
        screen.getByText(/NASA-STD-6001 standards/i)
      ).toBeDefined();
    });
  });

  describe('Full Landing Page Integration', () => {
    it('assembles all sections smoothly within the main landing route', () => {
      render(<LandingPage />);
      expect(screen.getByTestId('landing-hero')).toBeDefined();
      expect(screen.getByTestId('kurzgesagt-flame-scene')).toBeDefined();
      expect(screen.getByTestId('atmospheric-physics')).toBeDefined();
      expect(screen.getByTestId('mission-control-cta')).toBeDefined();
      expect(screen.getByTestId('landing-footer')).toBeDefined();
    });
  });
});
