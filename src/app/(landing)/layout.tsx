import React from 'react';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] flex flex-col selection:bg-[#D4FC02] selection:text-zinc-950 font-sans antialiased">
      {children}
    </div>
  );
}