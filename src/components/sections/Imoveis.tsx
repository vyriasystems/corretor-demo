"use client";

import { properties, waLink } from "@/lib/content";
import { SectionLayer } from "@/components/ui/SectionLayer";

export function Imoveis() {
  return (
    <SectionLayer id="imoveis">
      <div>
        <p className="section-kicker mb-3">Imóveis em destaque</p>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <h2 className="font-display text-3xl font-medium leading-tight tracking-tight text-bone sm:text-4xl">
            Uma curadoria, não uma lista infinita
          </h2>
          <p className="max-w-sm text-sm font-light leading-relaxed text-bone/65">
            Cada card abre o WhatsApp com o imóvel já mencionado.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-white/10 bg-petrol-mist"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-petrol">
                <img
                  src={item.image}
                  alt={item.name}
                  width={960}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-3 top-3 rounded-full bg-petrol/80 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-gold">
                  {item.price}
                </span>
              </div>
              <div className="p-3.5">
                <h3 className="font-display text-lg leading-tight text-bone">{item.name}</h3>
                <p className="mt-1 text-xs tracking-wide text-bone/55">{item.location}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-bone/70">
                  {item.area} · {item.beds}
                </p>
                <a
                  href={waLink(item.interestMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-gold/40 bg-gold/10 py-2 text-[11px] uppercase tracking-[0.18em] text-gold transition hover:border-gold hover:bg-gold/20 hover:text-bone"
                >
                  Tenho interesse
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionLayer>
  );
}
