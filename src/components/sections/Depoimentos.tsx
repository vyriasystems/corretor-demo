import { testimonials } from "@/lib/content";
import { SectionLayer } from "@/components/ui/SectionLayer";

export function Depoimentos() {
  return (
    <SectionLayer id="depoimentos">
      <div>
        <p className="section-kicker">Quem já decidiu com o Rafael</p>
        <h2 className="display-title max-w-2xl">Prova social que o WhatsApp na bio não entrega</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={item.name} className="glass-panel flex flex-col justify-between rounded-2xl p-6">
              <p className="font-display text-xl italic leading-snug text-bone/90">“{item.quote}”</p>
              <footer className="mt-6 border-t border-white/10 pt-4 text-xs uppercase tracking-[0.16em] text-gold">
                {item.name} — {item.place}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </SectionLayer>
  );
}
