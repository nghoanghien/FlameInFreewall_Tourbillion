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
  containerBg: string;
  containerBorder: string;
  innerShadow: string;
  badgeBg: string;
  badgeText: string;
  icon: React.ReactNode;
}

const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

// Deep cosmic outer shadow with subtle colored ambient lighting
const COMMON_OUTER_SHADOW =
  '0 16px 36px rgba(0, 0, 0, 0.45), 0 4px 12px rgba(11, 35, 116, 0.25)';

const THEME_CONFIGS: Record<string, ThemeConfig> = {
  success: {
    accent: '#D4FC02',
    containerBg: 'bg-[#0B2374]/90',
    containerBorder: 'border-b-2 border-x-2 border-[#D4FC02]/50',
    innerShadow: 'inset 0 0 20px rgba(212, 252, 2, 0.22)',
    badgeBg: 'bg-[#D4FC02]',
    badgeText: 'text-[#0B2374]',
    icon: <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.8] block shrink-0 text-[#0B2374]" />,
  },
  error: {
    accent: '#EF4444',
    containerBg: 'bg-[#18080C]/90',
    containerBorder: 'border-b-2 border-x-2 border-red-500/50',
    innerShadow: 'inset 0 0 20px rgba(239, 68, 68, 0.28)',
    badgeBg: 'bg-[#EF4444]',
    badgeText: 'text-white',
    icon: <AlertCircle className="w-3.5 h-3.5 stroke-[2.8] block shrink-0 text-white" />,
  },
  warning: {
    accent: '#F59E0B',
    containerBg: 'bg-[#1D1204]/90',
    containerBorder: 'border-b-2 border-x-2 border-amber-500/50',
    innerShadow: 'inset 0 0 20px rgba(245, 158, 11, 0.28)',
    badgeBg: 'bg-[#F59E0B]',
    badgeText: 'text-zinc-950',
    icon: <AlertTriangle className="w-3.5 h-3.5 stroke-[2.8] block shrink-0 text-zinc-950" />,
  },
  loading: {
    accent: '#4CC9F0',
    containerBg: 'bg-[#06152F]/90',
    containerBorder: 'border-b-2 border-x-2 border-[#4CC9F0]/50',
    innerShadow: 'inset 0 0 20px rgba(76, 201, 240, 0.28)',
    badgeBg: 'bg-[#4CC9F0]',
    badgeText: 'text-[#06152F]',
    icon: <Loader2 className="w-3.5 h-3.5 animate-spin block shrink-0 text-[#06152F]" />,
  },
  info: {
    accent: '#4CC9F0',
    containerBg: 'bg-[#071542]/90',
    containerBorder: 'border-b-2 border-x-2 border-[#4CC9F0]/40',
    innerShadow: 'inset 0 0 20px rgba(76, 201, 240, 0.22)',
    badgeBg: 'bg-[#4CC9F0]',
    badgeText: 'text-[#071542]',
    icon: <Sparkles className="w-3.5 h-3.5 stroke-[2.6] block shrink-0 text-[#071542]" />,
  },
  default: {
    accent: '#D4FC02',
    containerBg: 'bg-[#111827]/90',
    containerBorder: 'border-b-2 border-x-2 border-white/20',
    innerShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
    badgeBg: 'bg-[#D4FC02]',
    badgeText: 'text-[#0B2374]',
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
    const isSingleLine = !isTwoLine;
    const cleanTitle = title.endsWith(':') ? title.slice(0, -1).trim() : title;
    const theme = getThemeConfig(type);

    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const remainingTimeRef = useRef<number>(duration);
    const startTimeRef = useRef<number>(Date.now());
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Stacking offset physics
    const isStacked = !isExpanded && index > 0;
    const targetY = isStacked ? (collapsedY ?? (index === 1 ? -40 : -80)) : 0;
    const targetOpacity = isStacked ? (index === 1 ? 0.94 : index === 2 ? 0.8 : 0) : 1;
    const toastZIndex = isStacked ? (index === 1 ? 40 : index === 2 ? 30 : 20) : 50 - index;

    const descRef = useRef<HTMLSpanElement | null>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
      if (!isInline) return;

      if (isTest) {
        setIsOverflowing((cleanTitle.length + (description?.length || 0)) > 60);
        return;
      }

      const checkOverflow = () => {
        if (descRef.current && !isHovered) {
          const hasOverflow = descRef.current.scrollWidth > descRef.current.clientWidth + 1;
          setIsOverflowing(hasOverflow);
        }
      };

      const raf = requestAnimationFrame(checkOverflow);
      window.addEventListener('resize', checkOverflow);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', checkOverflow);
      };
    }, [isInline, isHovered, cleanTitle, description]);

    const shouldWrapInline = isInline && isHovered && isOverflowing;

    const springConfig = isTest
      ? { duration: 0 }
      : {
          type: 'spring' as const,
          stiffness: 150,
          damping: 18,
          mass: 0.7,
        };

    useEffect(() => {
      if (containerRef.current) {
        const h = containerRef.current.offsetHeight;
        if (h > 0) onHeightChange?.(id, h);
      }
    }, [id, onHeightChange, isSingleLine, shouldWrapInline, title, description]);

    useEffect(() => {
      remainingTimeRef.current = duration;
      startTimeRef.current = Date.now();
    }, [resetKey, duration]);

    useEffect(() => {
      if (duration === Infinity) return;

      const shouldPause = isPaused || isHovered;

      if (!shouldPause) {
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => {
          onDismiss(id);
        }, remainingTimeRef.current);
      } else {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
          const elapsed = Date.now() - startTimeRef.current;
          remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
        }
      }

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      };
    }, [id, duration, isPaused, isHovered, resetKey, onDismiss]);

    const combinedBoxShadow = `${theme.innerShadow}, ${COMMON_OUTER_SHADOW}`;
    const roundedClasses = isTop
      ? 'rounded-b-2xl sm:rounded-b-[26px] rounded-t-none'
      : 'rounded-2xl sm:rounded-[26px]';
    const borderClasses = isTop
      ? theme.containerBorder
      : theme.containerBorder.replace('border-b-2 border-x-2', 'border-2');
    const maxWClasses = isHovered
      ? 'max-w-[94vw] sm:max-w-xl md:max-w-2xl'
      : 'max-w-[92vw] sm:max-w-lg';
    const containerPadding = isSingleLine
      ? shouldWrapInline
        ? 'min-h-[42px] sm:min-h-[46px] py-2 sm:py-2.5'
        : 'h-10 sm:h-11'
      : 'py-2.5 sm:py-3';

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
        animate={
          isTest
            ? undefined
            : {
                y: targetY,
                opacity: targetOpacity,
              }
        }
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
          boxShadow: combinedBoxShadow,
          zIndex: toastZIndex,
          pointerEvents: isStacked && index >= 3 ? 'none' : 'auto',
        }}
        className={`relative select-none overflow-hidden backdrop-blur-md ${theme.containerBg} ${borderClasses} ${roundedClasses} transition-[background-color,border-color,border-radius] duration-300 w-auto min-w-[280px] ${maxWClasses}`}
      >
        {/* Main Toast Content Container */}
        <div
          className={`flex items-center justify-between gap-3 px-3.5 ${containerPadding}`}
        >
          {/* Left: Themed Icon Badge */}
          <div
            className={`flex gap-2.5 min-w-0 flex-1 ${
              isHovered && isTwoLine ? 'items-start pt-0.5' : 'items-center'
            }`}
          >
            <motion.div
              layout="position"
              className={`w-6 h-6 rounded-full grid place-items-center shrink-0 shadow-sm leading-none p-0 m-0 ${theme.badgeBg} ${theme.badgeText}`}
            >
              {theme.icon}
            </motion.div>

            {/* Text Area */}
            <motion.div
              layout="position"
              className="flex flex-col justify-center min-w-0 flex-1 text-left"
            >
              {isInline ? (
                <motion.div
                  layout
                  transition={springConfig}
                  className={`min-w-0 ${
                    shouldWrapInline
                      ? 'flex flex-col gap-0.5'
                      : 'flex items-center gap-1.5 truncate'
                  }`}
                >
                  <motion.span
                    layout="position"
                    layoutId={`toast-inline-title-${id}`}
                    transition={springConfig}
                    className="font-bold text-xs sm:text-[13px] text-white shrink-0 inline-block leading-tight tracking-tight"
                  >
                    {cleanTitle}:
                  </motion.span>
                  <motion.span
                    ref={descRef}
                    layout="position"
                    layoutId={`toast-inline-desc-${id}`}
                    transition={springConfig}
                    className={`text-[11px] sm:text-xs text-zinc-300 font-medium leading-snug ${
                      shouldWrapInline
                        ? 'whitespace-normal break-words block'
                        : 'truncate inline-block'
                    }`}
                  >
                    {description}
                  </motion.span>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <motion.span
                      layout="position"
                      layoutId={`toast-title-${id}`}
                      transition={springConfig}
                      className={`font-bold text-xs sm:text-[13px] text-white tracking-tight leading-tight ${
                        isHovered ? 'whitespace-normal break-words' : 'truncate'
                      }`}
                    >
                      {title}
                    </motion.span>
                  </div>

                  {isTwoLine && (
                    <motion.p
                      layout="position"
                      layoutId={`toast-desc-${id}`}
                      transition={springConfig}
                      className={`text-[11px] sm:text-xs text-zinc-300 leading-snug mt-0.5 font-normal ${
                        isHovered
                          ? 'line-clamp-none whitespace-normal break-words'
                          : 'line-clamp-2'
                      }`}
                    >
                      {description}
                    </motion.p>
                  )}
                </>
              )}
            </motion.div>
          </div>

          {/* Right side: Action Button & Dismiss Button */}
          <motion.div
            layout="position"
            className={`flex items-center gap-1.5 shrink-0 ml-1 ${
              isHovered && isTwoLine ? 'self-start pt-0.5' : ''
            }`}
          >
            {action && (
              <button
                type="button"
                onClick={() => {
                  action.onClick();
                  onDismiss(id);
                }}
                className="px-2.5 py-1 rounded-xl text-[11px] font-extrabold bg-[#D4FC02] text-[#0B2374] hover:bg-[#E2FF3B] transition-colors cursor-pointer shadow-sm"
              >
                {action.label}
              </button>
            )}

            {dismissible && (
              <button
                type="button"
                data-testid="toast-dismiss-button"
                onClick={() => onDismiss(id)}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
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
