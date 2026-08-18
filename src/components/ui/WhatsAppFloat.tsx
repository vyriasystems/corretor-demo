import { generalWhatsApp } from "@/lib/content";

export function WhatsAppFloat() {
  return (
    <a
      href={generalWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com Rafael no WhatsApp"
      className="group fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full border border-gold/50 bg-petrol px-4 py-3 text-bone transition hover:border-gold sm:bottom-7 sm:right-7 sm:px-5"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_18px_rgba(37,211,102,0.45)]">
        <WhatsAppIcon />
      </span>
      <span className="pr-1">
        <span className="block text-[10px] uppercase tracking-[0.22em] text-gold">WhatsApp</span>
        <span className="block text-sm font-medium tracking-wide">Falar com o Rafael</span>
      </span>
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.4-1.41a10.1 10.1 0 0 0 4.64 1.18h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.76 14.08c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.12.1-1.81-.11-.42-.13-.95-.31-1.64-.6-2.89-1.25-4.77-4.16-4.92-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.24-.27.64-.4 1.02-.4.12 0 .23 0 .33.01.29.01.44.03.63.49.24.55.81 2 .88 2.14.07.14.12.3.02.49-.09.2-.14.31-.28.48-.14.16-.29.36-.41.49-.14.14-.28.3-.12.58.16.27.7 1.16 1.5 1.88 1.04.93 1.91 1.22 2.2 1.36.28.13.45.11.62-.07.16-.18.7-.81.89-1.09.19-.27.37-.23.63-.14.25.09 1.6.75 1.87.89.27.14.45.2.52.32.07.11.07.65-.17 1.33Z" />
    </svg>
  );
}
