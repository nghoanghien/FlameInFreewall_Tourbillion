'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CustomSelectOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
  disabled?: boolean;
}

export interface CustomSelectProps<T extends string = string> {
  options: CustomSelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  testId?: string;
  ariaLabel?: string;
  className?: string;
  dropdownClassName?: string;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
}

export function CustomSelect<T extends string = string>({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  testId,
  ariaLabel,
  className = '',
  dropdownClassName = '',
  disabled = false,
  leadingIcon,
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSelect = useCallback(
    (optValue: T) => {
      onChange(optValue);
      setIsOpen(false);
      triggerRef.current?.focus();
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIdx = options.findIndex((opt) => opt.value === value);
        const nextIdx =
          e.key === 'ArrowDown'
            ? (currentIdx + 1) % options.length
            : (currentIdx - 1 + options.length) % options.length;
        handleSelect(options[nextIdx].value);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block w-full text-left ${isOpen ? 'z-50' : 'z-10'}`}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden native select for automated tests & screen readers */}
      <select
        data-testid={testId}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        aria-label={ariaLabel || placeholder}
        className="sr-only"
        tabIndex={-1}
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel || placeholder}
        style={{ boxShadow: 'inset 0 0 16px rgba(0, 0, 0, 0.05)' }}
        className={`group relative flex items-center justify-between gap-2 w-full px-3 py-2 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 text-xs font-semibold text-zinc-800 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0B2374]/20 ${
          disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
        } ${className}`}
      >
        <div className="flex items-center gap-1.5 min-w-0 flex-1 truncate">
          {leadingIcon && <span className="shrink-0 text-zinc-400">{leadingIcon}</span>}
          {selectedOption?.icon && (
            <span className="shrink-0 text-zinc-400">{selectedOption.icon}</span>
          )}
          <span className="truncate text-zinc-900 font-semibold">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.badge && (
            <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-700">
              {selectedOption.badge}
            </span>
          )}
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="shrink-0 flex items-center justify-center text-zinc-400 group-hover:text-zinc-700"
        >
          <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
        </motion.span>
      </button>

      {/* Animated Dropdown List */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={`absolute left-0 mt-1.5 w-full min-w-[200px] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.12)] rounded-2xl p-1.5 z-50 origin-top overflow-hidden ${dropdownClassName}`}
          >
            <ul
              role="listbox"
              tabIndex={-1}
              aria-label={ariaLabel || placeholder}
              className="max-h-60 overflow-y-auto space-y-0.5 focus:outline-none"
            >
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={opt.disabled}
                    onClick={() => !opt.disabled && handleSelect(opt.value)}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      opt.disabled
                        ? 'opacity-40 cursor-not-allowed bg-gray-50'
                        : isSelected
                        ? 'bg-[#1A1A1A] text-white shadow-xs'
                        : 'text-zinc-700 hover:bg-zinc-100/80 hover:text-zinc-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1 truncate">
                      {opt.icon && (
                        <span className={`shrink-0 ${isSelected ? 'text-white' : 'text-zinc-400'}`}>
                          {opt.icon}
                        </span>
                      )}
                      <span className="truncate">{opt.label}</span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CustomSelect;
