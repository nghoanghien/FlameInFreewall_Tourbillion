import React from 'react';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#080C18] text-[#F8F9FA] flex flex-col selection:bg-[#D4FC02]/30 selection:text-[#D4FC02]">
      {children}
    </div>
  );
}
