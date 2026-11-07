import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface EndOfListIndicatorProps {
  text?: string;
  className?: string;
}

export const EndOfListIndicator: React.FC<EndOfListIndicatorProps> = ({
  text = 'Bạn đã xem hết danh sách nghiên cứu PSI',
  className = '',
}) => {
  return (
    <div
      data-testid="end-of-list-indicator"
      className={`py-10 flex items-center justify-center gap-4 opacity-50 select-none ${className}`}
    >
      <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent w-24" />
      <div className="flex flex-col items-center gap-1.5">
        <CheckCircle2 className="w-4 h-4 text-zinc-500" />
        <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-wider">
          {text}
        </span>
      </div>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-zinc-300 to-transparent w-24" />
    </div>
  );
};
