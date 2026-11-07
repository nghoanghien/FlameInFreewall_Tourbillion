'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Rocket, Orbit, Moon, Globe, ArrowRight, Zap } from 'lucide-react';
import { SCENARIO_PRESETS } from '@/data/presets';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { toast } from '@/components/toast/toast-store';

export interface QuickScenarioConfig {
  presetId: string;
  name: string;
  label: string;
  gravityDisplay: string;
  gravityValue: number;
  atmosphereDisplay: string;
  riskSummary: string;
  badge: 'Measured' | 'Illustrative';
  cardBorder: string;
  hoverBorder: string;
  iconBg: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const QUICK_SCENARIOS: QuickScenarioConfig[] = [
  {
    presetId: 'iss-baseline',
    name: 'ISS Microgravity Baseline',
    label: 'Orbital Freefall (0.00g)',
    gravityDisplay: '0.00g',
    gravityValue: 0.0,
    atmosphereDisplay: '21% O₂ · 14.7 psia · 5 cm/s flow',
    riskSummary: 'Absence of buoyant convection; spherical diffusion flame sustained by HVAC forced air ventilation.',
    badge: 'Measured',
    cardBorder: 'border-lime-200',
    hoverBorder: 'hover:border-lime-300',
    iconBg: 'bg-lime-50 text-lime-900 border border-lime-200',
    icon: Orbit,
  },
  {
    presetId: 'artemis-lunar-base',
    name: 'Artemis Moon Base / Rover',
    label: 'Lunar Surface Habitat (0.16g)',
    gravityDisplay: '0.16g',
    gravityValue: 0.16,
    atmosphereDisplay: '30% O₂ · 10.2 psia · 8 cm/s flow',
    riskSummary: 'High-O₂ exploration atmosphere removes N₂ dilution, drastically accelerating polymer flame spread.',
    badge: 'Illustrative',
    cardBorder: 'border-amber-200',
    hoverBorder: 'hover:border-amber-300',
    iconBg: 'bg-amber-50 text-amber-700 border border-amber-200',
    icon: Moon,
  },
  {
    presetId: 'mars-surface-habitat',
    name: 'Mars Surface Colony Habitat',
    label: 'Martian Gravity (0.38g)',
    gravityDisplay: '0.38g',
    gravityValue: 0.38,
    atmosphereDisplay: '28% O₂ · 8.2 psia · 10 cm/s flow',
    riskSummary: 'Intermediate buoyancy and low total pressure produce mixed-convection boundary layer; zero empirical PSI data.',
    badge: 'Illustrative',
    cardBorder: 'border-red-200',
    hoverBorder: 'hover:border-red-300',
    iconBg: 'bg-red-50 text-red-700 border border-red-200',
    icon: Globe,
  },
];

export const QuickScenarioTrigger: React.FC = () => {
  const router = useRouter();
  const setActiveScenario = useWorkspaceStore((state) => state.setActiveScenario);

  const handleLaunchScenario = (config: QuickScenarioConfig) => {
    const matchedPreset = SCENARIO_PRESETS.find((p) => p.id === config.presetId);

    if (matchedPreset) {
      setActiveScenario(matchedPreset);
    } else {
      setActiveScenario({
        id: config.presetId,
        name: config.name,
        environment: config.presetId.includes('lunar')
          ? 'lunar'
          : config.presetId.includes('mars')
          ? 'mars'
          : 'iss',
        gravity: config.gravityValue,
        oxygenPct: config.presetId.includes('lunar') ? 30.0 : config.presetId.includes('mars') ? 28.0 : 21.0,
        pressurePsi: config.presetId.includes('lunar') ? 10.2 : config.presetId.includes('mars') ? 8.2 : 14.7,
        material: config.presetId.includes('mars') ? 'Nomex' : 'PMMA',
        airflowVelocity: config.presetId.includes('lunar') ? 8.0 : config.presetId.includes('mars') ? 10.0 : 5.0,
        description: config.riskSummary,
      });
    }

    toast.success(
      `Scenario Configured: ${config.name}`,
      `Atmospheric conditions loaded (${config.gravityDisplay}, ${config.atmosphereDisplay}). Navigating to Mission Simulation...`
    );

    router.push('/mission');
  };

  return (
    <section aria-label="Quick Scenario Triggers" className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#1A1A1A] flex items-center gap-2.5">
            <Rocket className="w-5 h-5 text-[#0B2374]" />
            Quick Scenario Launchpads
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            One-click ignition into orbital, lunar, and Martian fire physics environments in the Mission Simulator.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-[11px] font-mono text-[#64748B] shadow-sm">
          <Zap className="w-3.5 h-3.5 text-[#0B2374]" />
          Direct Parameter Injection
        </div>
      </div>

      <div
        data-testid="quick-scenario-trigger"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
      >
        {QUICK_SCENARIOS.map((scenario) => {
          const ScenarioIcon = scenario.icon;

          return (
            <motion.div
              key={scenario.presetId}
              data-testid={`scenario-card-${scenario.presetId}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`p-5 rounded-3xl bg-white border ${scenario.cardBorder} ${scenario.hoverBorder} shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between group cursor-pointer`}
            >
              <div>
                {/* Header: Icon, Gravity Level Badge & Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center ${scenario.iconBg}`}
                    >
                      <ScenarioIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-[#1A1A1A] tracking-tight group-hover:text-[#0B2374] transition-colors">
                        {scenario.label}
                      </div>
                      <div className="text-[10px] font-mono text-[#64748B]">
                        g = {scenario.gravityDisplay}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow-2xs border ${
                      scenario.badge === 'Measured'
                        ? 'bg-lime-50 text-lime-900 border-lime-300'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {scenario.badge}
                  </span>
                </div>

                {/* Subtitle / Name */}
                <h3 className="text-xs font-bold text-[#1A1A1A] mb-2">
                  {scenario.name}
                </h3>

                {/* Atmosphere Tag */}
                <div className="px-2.5 py-1.5 rounded-xl bg-gray-50 border border-gray-200 mb-3 font-mono text-[11px] text-[#1A1A1A] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B2374]" />
                  <span>{scenario.atmosphereDisplay}</span>
                </div>

                {/* Risk / Physics Summary */}
                <p className="text-[11px] text-[#64748B] leading-relaxed line-clamp-3 mb-4">
                  {scenario.riskSummary}
                </p>
              </div>

              {/* Action Trigger Button: Electric Lime */}
              <button
                type="button"
                data-testid={`launch-btn-${scenario.presetId}`}
                onClick={() => handleLaunchScenario(scenario)}
                className="w-full py-2.5 px-4 bg-[#D4FC02] text-zinc-950 hover:bg-[#c3e802] font-extrabold rounded-2xl shadow-md text-xs transition-all flex items-center justify-center gap-2 border border-[#c5eb02] cursor-pointer"
              >
                <span>Launch in Mission Simulator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
