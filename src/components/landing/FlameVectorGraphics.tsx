'use client';

import React from 'react';

export const EarthFlameSvg: React.FC = () => (
  <svg viewBox="0 0 300 240" className="w-full h-full max-w-[280px]" aria-label="Earth Flame Diagram">
    <defs>
      <radialGradient id="earth-glow" cx="50%" cy="60%" r="50%">
        <stop offset="0%" stopColor="#FDE047" stopOpacity="0.9" />
        <stop offset="45%" stopColor="#F97316" stopOpacity="0.8" />
        <stop offset="85%" stopColor="#DC2626" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#080C18" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="soot-stream" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
        <stop offset="70%" stopColor="#475569" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#1E293B" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Air Inflow */}
    <g className="text-[#38BDF8] opacity-70">
      <path d="M 40 180 Q 80 180 110 170" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 2" />
      <polygon points="112,170 102,165 104,175" fill="#38BDF8" />
      <path d="M 260 180 Q 220 180 190 170" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 2" />
      <polygon points="188,170 196,165 198,175" fill="#38BDF8" />
      <text x="50" y="200" fill="#94A3B8" fontSize="9" fontFamily="monospace">Air Inflow (30–60 cm/s)</text>
    </g>
    {/* Buoyancy Draft */}
    <g opacity="0.85">
      <line x1="150" y1="50" x2="150" y2="15" stroke="#F97316" strokeWidth="2.5" strokeDasharray="3 3" />
      <polygon points="150,10 145,20 155,20" fill="#F97316" />
      <text x="160" y="25" fill="#F97316" fontSize="10" fontWeight="bold" fontFamily="monospace">Buoyancy Draft ↑</text>
    </g>
    {/* Rising Soot Plume */}
    <path d="M 146 80 Q 140 50 148 20 Q 152 50 154 80 Z" fill="url(#soot-stream)" />
    {/* Teardrop Flame Body */}
    <path
      d="M 150 55 C 130 95, 115 130, 120 160 C 125 185, 175 185, 180 160 C 185 130, 170 95, 150 55 Z"
      fill="url(#earth-glow)"
      className="drop-shadow-[0_0_16px_rgba(249,115,22,0.6)]"
    />
    <ellipse cx="150" cy="168" rx="16" ry="10" fill="#38BDF8" opacity="0.8" />
    <path d="M 150 90 C 140 115, 136 135, 140 155 C 143 170, 157 170, 160 155 C 164 135, 160 115, 150 90 Z" fill="#FFFFFF" opacity="0.9" />
    <rect x="146" y="176" width="8" height="28" rx="2" fill="#78350F" />
  </svg>
);

export const IssFlameSvg: React.FC = () => (
  <svg viewBox="0 0 300 240" className="w-full h-full max-w-[280px]" aria-label="ISS Microgravity Flame Diagram">
    <defs>
      <radialGradient id="iss-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
        <stop offset="35%" stopColor="#4CC9F0" stopOpacity="0.85" />
        <stop offset="70%" stopColor="#06B6D4" stopOpacity="0.6" />
        <stop offset="92%" stopColor="#3B82F6" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#080C18" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="cool-halo" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0" />
        <stop offset="85%" stopColor="#8B5CF6" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#080C18" stopOpacity="0" />
      </radialGradient>
    </defs>
    {/* Isotropic Diffusion Arrows */}
    <g stroke="#4CC9F0" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.65">
      <line x1="150" y1="120" x2="150" y2="35" />
      <polygon points="150,30 146,40 154,40" fill="#4CC9F0" />
      <line x1="150" y1="120" x2="150" y2="205" />
      <polygon points="150,210 146,200 154,200" fill="#4CC9F0" />
      <line x1="150" y1="120" x2="65" y2="120" />
      <polygon points="60,120 70,116 70,124" fill="#4CC9F0" />
      <line x1="150" y1="120" x2="235" y2="120" />
      <polygon points="240,120 230,116 230,124" fill="#4CC9F0" />
    </g>
    <circle cx="150" cy="120" r="78" fill="url(#cool-halo)" />
    <circle cx="150" cy="120" r="52" fill="url(#iss-glow)" className="drop-shadow-[0_0_24px_rgba(6,182,212,0.7)]" />
    <circle cx="150" cy="120" r="6" fill="#071542" stroke="#4CC9F0" strokeWidth="1.5" />
    <text x="165" y="124" fill="#94A3B8" fontSize="8" fontFamily="monospace">Droplet / Wick</text>
    <text x="150" y="228" fill="#4CC9F0" fontSize="9" textAnchor="middle" fontFamily="monospace">
      Radial O₂ Diffusion (Zero Convection)
    </text>
  </svg>
);

export const MorphFlameSvg: React.FC<{ gravity: number }> = ({ gravity }) => {
  const gClamped = Math.min(Math.max(gravity, 0), 1);
  const teardropStretch = 1 - gClamped;

  return (
    <svg viewBox="0 0 360 260" className="w-full h-full max-w-[340px]" aria-label="Morphing Flame Vector">
      <defs>
        <radialGradient id="morph-glow" cx="50%" cy={`${60 - gClamped * 20}%`} r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="40%" stopColor={gClamped > 0.4 ? '#FDE047' : '#4CC9F0'} stopOpacity="0.85" />
          <stop offset="75%" stopColor={gClamped > 0.4 ? '#F97316' : '#06B6D4'} stopOpacity="0.65" />
          <stop offset="100%" stopColor={gClamped > 0.4 ? '#DC2626' : '#3B82F6'} stopOpacity="0" />
        </radialGradient>
      </defs>
      {gClamped > 0.05 && (
        <g opacity={gClamped} stroke="#F97316" strokeWidth="2">
          <line x1="180" y1="50" x2="180" y2={50 - gClamped * 30} strokeDasharray="3 3" />
          <polygon
            points={`180,${50 - gClamped * 30 - 6} 176,${50 - gClamped * 30 + 4} 184,${50 - gClamped * 30 + 4}`}
            fill="#F97316"
          />
          <text x="195" y="40" fill="#F97316" fontSize="9" fontFamily="monospace">
            +{(gClamped * 45).toFixed(0)} cm/s Buoyancy
          </text>
        </g>
      )}
      {teardropStretch > 0.1 && (
        <g opacity={teardropStretch * 0.7} stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="3 3">
          <line x1="100" y1="130" x2="60" y2="130" />
          <line x1="260" y1="130" x2="300" y2="130" />
          <line x1="180" y1="200" x2="180" y2="235" />
        </g>
      )}
      <ellipse
        cx="180"
        cy={130 - gClamped * 20}
        rx={50 - gClamped * 18}
        ry={50 + gClamped * 35}
        fill="url(#morph-glow)"
        className="transition-all duration-150"
        style={{
          filter: `drop-shadow(0px 0px ${16 + gClamped * 8}px ${
            gClamped > 0.4 ? '#F97316' : '#06B6D4'
          })`,
        }}
      />
      <rect x="176" y="180" width="8" height="30" rx="2" fill="#78350F" />
    </svg>
  );
};
