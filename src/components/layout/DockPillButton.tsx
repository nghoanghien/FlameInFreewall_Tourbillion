'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export interface DockPillButtonProps {
  id?: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  isExpanded: boolean;
  tooltipText?: string;
  className?: string;
}

export const DockPillButton: React.FC<DockPillButtonProps> = ({
  id,
  icon,
  label,
  description,
  onClick,
  href,
  active = false,
  disabled = false,
  isExpanded,
  tooltipText,
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (isExpanded) return;
    hoverTimerRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setShowTooltip(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const buttonInner = (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center ${className}`}
    >
      <button
        id={id}
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center transition-[width,height,background-color,box-shadow,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer relative overflow-hidden group 
          ${
            isExpanded
              ? 'pl-2.5 rounded-[30px] w-[280px] h-[70px] justify-start'
              : 'rounded-full w-[58px] h-[58px] justify-center p-0'
          } ${
            active
              ? 'bg-[#D4FC02] border-2 border-[#E2FF3B] text-[#080C18] shadow-[0_0_18px_rgba(212,252,2,0.40)] scale-[1.01]'
              : 'bg-[#0B2374]/60 hover:bg-[#102B82]/80 backdrop-blur-md border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98]'
          } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
        aria-label={label}
        data-testid={id ?? `dock-pill-${label.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {/* Fixed Icon Slot: fills button in collapsed mode (centered 100%), fixed width 52px when expanded */}
        <div
          className={`flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isExpanded ? 'w-[52px] h-full' : 'w-full h-full'
          }`}
        >
          {icon}
        </div>

        {/* Animated Text Slot: 0 width and 0 padding when collapsed to never shift icon */}
        <div
          className={`flex flex-col justify-center text-left whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded
              ? 'flex-1 min-w-0 pr-4 pl-1 opacity-100 max-w-[210px]'
              : 'w-0 max-w-0 p-0 m-0 opacity-0 overflow-hidden pointer-events-none'
          }`}
        >
          <span
            className={`font-extrabold text-[13px] leading-tight block truncate ${
              active ? 'text-[#080C18]' : 'text-zinc-100 group-hover:text-white'
            }`}
          >
            {label}
          </span>
          {description && (
            <span
              className={`text-[11px] font-semibold leading-tight block truncate mt-0.5 ${
                active ? 'text-[#080C18]/80' : 'text-zinc-400 group-hover:text-zinc-300'
              }`}
            >
              {description}
            </span>
          )}
        </div>
      </button>

      {/* Liquid Glass Tooltip on Hover in Collapsed State */}
      <AnimatePresence>
        {showTooltip && !isExpanded && !active && tooltipText && (
          <div className="absolute left-[68px] top-1/2 -translate-y-1/2 z-50 pointer-events-none whitespace-nowrap">
            <motion.div
              initial={{ opacity: 0, x: -8, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -8, scale: 0.95 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="h-10 px-3.5 rounded-2xl flex items-center bg-[#0B2374]/90 backdrop-blur-md border border-[#D4FC02]/30 shadow-[0_4px_24px_rgba(0,0,0,0.5)] text-white font-extrabold text-xs tracking-tight drop-shadow-xl whitespace-nowrap"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4FC02] mr-2 shadow-[0_0_8px_#D4FC02]" />
              {tooltipText}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="outline-none block" tabIndex={-1}>
        {buttonInner}
      </Link>
    );
  }

  return buttonInner;
};
