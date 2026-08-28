export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="font-display text-2xl font-medium tracking-[0.04em] text-bone sm:text-[1.7rem]">
        Rafael Couto
      </span>
      <span className="mt-0.5 text-[10px] uppercase tracking-[0.28em] text-gold/80">
        Imóveis · Caldas Novas
      </span>
    </div>
  );
}
