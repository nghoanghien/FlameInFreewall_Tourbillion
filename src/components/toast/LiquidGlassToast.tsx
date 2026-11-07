'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Loader2,
  X,
  Sparkles,
} from 'lucide-react';
import type { ToastItem, ToastType } from './toast-store';

export interface LiquidGlassToastProps {
  toast: ToastItem;
  index?: number;
  isTop?: boolean;
  isExpanded?: boolean;
  collapsedY?: number;
  isPaused?: boolean;
  resetKey?: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onHeightChange?: (id: string, height: number) => void;
  onDismiss: (id: string) => void;
}

interface ThemeConfig {
  accent: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ReactNode;
}

const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

const THEME_CONFIGS: Record<string, ThemeConfig> = {
  success: {
    accent: '#0B2374',
    badgeBg: 'bg-lime-300',
    badgeText: 'text-[#0B2374]',
    icon: <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.8] block shrink-0 text-[#0B2374]" />,
  },
  error: {
    accent: '#DC2626',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
    icon: <AlertCircle className="w-3.5 h-3.5 stroke-[2.8] block shrink-0 text-red-600" />,
  },
  warning: {
    accent: '#D97706',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    icon: <AlertTriangle className="w-3.5 h-3.5 stroke-[2.8] block shrink-0 text-amber-700" />,
  },
  loading: {
    accent: '#0284C7',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-700',
    icon: <Loader2 className="w-3.5 h-3.5 animate-spin block shrink-0 text-sky-600" />,
  },
  info: {
    accent: '#0B2374',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-[#0B2374]',
    icon: <Sparkles className="w-3.5 h-3.5 stroke-[2.6] block shrink-0 text-[#0B2374]" />,
  },
  default: {
    accent: '#0B2374',
    badgeBg: 'bg-gray-100',
    badgeText: 'text-zinc-800',
    icon: <Sparkles className="w-3.5 h-3.5 stroke-[2.4] block shrink-0 text-[#0B2374]" />,
  },
};

function getThemeConfig(type: ToastType): ThemeConfig {
  return THEME_CONFIGS[type] || THEME_CONFIGS.default;
}

export const LiquidGlassToast = React.forwardRef<HTMLDivElement, LiquidGlassToastProps>(
  (
    {
      toast,
      index = 0,
      isTop = true,
      isExpanded = false,
      collapsedY,
      isPaused = false,
      resetKey = 0,
      onHoverStart,
      onHoverEnd,
      onHeightChange,
      onDismiss,
    },
    ref
  ) => {
    const { id, type, title, description, duration = 3500, action, dismissible = true } = toast;
    const isInline = Boolean(toast.inline && description && description.trim().length > 0);
    const isTwoLine = Boolean(!isInline && description && description.trim().length > 0);
    const cleanTitle = title.endsWith(':') ? title.slice(0, -1).trim() : title;
    const theme = getThemeConfig(type);

    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const remainingTimeRef = useRef<number>(duration);
    const startTimeRef = useRef<number>(Date.now());
    const containerRef = useRef<HTMLDivElement | null>(null);

    const isStacked = !isExpanded && index > 0;
    const targetY = isStacked ? (collapsedY ?? (index === 1 ? -40 : -80)) : 0;
    const targetOpacity = isStacked ? (index === 1 ? 0.94 : index === 2 ? 0.8 : 0) : 1;
    const toastZIndex = isStacked ? (index === 1 ? 40 : index === 2 ? 30 : 20) : 50 - index;

    const springConfig = isTest
      ? { duration: 0 }
      : { type: 'spring' as const, stiffness: 150, damping: 18, mass: 0.7 };

    useEffect(() => {
      if (containerRef.current) {
        const h = containerRef.current.offsetHeight;
        if (h > 0) onHeightChange?.(id, h);
      }
    }, [id, onHeightChange, title, description]);

    useEffect(() => {
      remainingTimeRef.current = duration;
      startTimeRef.current = Date.now();
    }, [resetKey, duration]);

    useEffect(() => {
      if (duration === Infinity) return;
      const shouldPause = isPaused || isHovered;

      if (!shouldPause) {
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => onDismiss(id), remainingTimeRef.current);
      } else if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        const elapsed = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      }

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }, [id, duration, isPaused, isHovered, resetKey, onDismiss]);

    return (
      <motion.div
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          containerRef.current = node;
        }}
        layout
        data-liquid-toast
        data-toast-id={id}
        data-toast-type={type}
        data-toast-hovered={isHovered ? 'true' : undefined}
        data-toast-stacked={isStacked ? 'true' : undefined}
        initial={isTest ? false : { y: -64, opacity: 0 }}
        animate={isTest ? undefined : { y: targetY, opacity: targetOpacity }}
        exit={isTest ? undefined : { y: -64, opacity: 0 }}
        transition={springConfig}
        onMouseEnter={() => {
          setIsHovered(true);
          onHoverStart?.();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          onHoverEnd?.();
        }}
        style={{
          zIndex: toastZIndex,
          pointerEvents: isStacked && index >= 3 ? 'none' : 'auto',
        }}
        className="relative select-none overflow-hidden bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.12)] text-zinc-900 rounded-3xl p-4 transition-all duration-300 w-auto min-w-[280px] max-w-[92vw] sm:max-w-lg"
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left: Themed Icon Badge & Content */}
          <div className="flex gap-2.5 min-w-0 flex-1 items-center">
            <motion.div
              layout="position"
              className={`w-6 h-6 rounded-full grid place-items-center shrink-0 shadow-xs leading-none ${theme.badgeBg} ${theme.badgeText}`}
            >
              {theme.icon}
            </motion.div>

            {/* Text Area */}
            <motion.div
              layout="position"
              className="flex flex-col justify-center min-w-0 flex-1 text-left"
            >
              {isInline ? (
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-bold text-xs sm:text-[13px] text-zinc-900 shrink-0 inline-block leading-tight tracking-tight">
                    {cleanTitle}:
                  </span>
                  <span className="text-[11px] sm:text-xs text-zinc-600 font-medium leading-snug truncate">
                    {description}
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-bold text-xs sm:text-[13px] text-zinc-900 tracking-tight leading-tight truncate">
                      {title}
                    </span>
                  </div>
                  {isTwoLine && (
                    <p className="text-[11px] sm:text-xs text-zinc-600 leading-snug mt-0.5 font-medium line-clamp-2">
                      {description}
                    </p>
                  )}
                </>
              )}
            </motion.div>
          </div>

          {/* Right side: Action Button & Dismiss Button */}
          <motion.div layout="position" className="flex items-center gap-1.5 shrink-0 ml-1">
            {action && (
              <button
                type="button"
                onClick={() => {
                  action.onClick();
                  onDismiss(id);
                }}
                className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-[#0B2374] text-[#D4FC02] hover:bg-[#152E85] transition-colors cursor-pointer shadow-xs"
              >
                {action.label}
              </button>
            )}

            {dismissible && (
              <button
                type="button"
                data-testid="toast-dismiss-button"
                onClick={() => onDismiss(id)}
                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-all cursor-pointer"
                title="Dismiss notification"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5 stroke-[2.4]" />
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

LiquidGlassToast.displayName = 'LiquidGlassToast';
