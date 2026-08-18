export function ScrollHint() {
  return (
    <div className="scroll-hint flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-bone/55">
      <span>Role</span>
      <svg width="18" height="28" viewBox="0 0 18 28" fill="none" aria-hidden>
        <path d="M9 4v16M3 14l6 8 6-8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </div>
  );
}
