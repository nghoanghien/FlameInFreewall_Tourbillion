export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-lime)]/30 bg-[var(--brand-navy)]/40 px-3 py-1 text-xs font-semibold text-[var(--brand-lime)] mb-6">
          <span>NASA Space Apps Challenge 2026</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-lime)]" />
          <span>Flame in Freefall</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl font-heading mb-4 text-[#F8F9FA]">
          FlameGuard <span className="text-[var(--brand-lime)]">AI</span>
        </h1>
        <p className="text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Microgravity Combustion & Spacecraft Fire Safety Intelligence Platform powered by NASA Physical Sciences Informatics (PSI).
        </p>
      </div>
    </main>
  );
}
