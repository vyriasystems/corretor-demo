import { broker, stats } from "@/lib/content";
import { SectionLayer } from "@/components/ui/SectionLayer";

export function Sobre() {
  return (
    <SectionLayer id="sobre">
      <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative mx-auto w-full max-w-xs">
          <img
            src={broker.portrait}
            alt="Retrato profissional de Rafael Couto"
            className="aspect-[3/4] w-full rounded-[1.4rem] object-cover object-top ring-1 ring-gold/20"
          />
          <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-gold/75">{broker.creci}</p>
        </div>
        <div>
          <p className="section-kicker">Sobre o Rafael</p>
          <h2 className="display-title">Quem te acompanha na decisão</h2>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-bone/75">{broker.bio}</p>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {stats.map((item) => (
              <div key={item.label}>
                <dt className="font-display text-2xl text-gold sm:text-3xl">{item.value}</dt>
                <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-bone/55">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SectionLayer>
  );
}
