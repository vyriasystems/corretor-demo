import { neighborhoods } from "@/lib/content";
import { SectionLayer } from "@/components/ui/SectionLayer";

export function Localizacao() {
  return (
    <SectionLayer id="localizacao">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="section-kicker">Localização de atuação</p>
          <h2 className="display-title">Senador Canedo e o entorno que eu realmente atendo</h2>
          <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-bone/70">
            Não é mapa genérico de imobiliária. São os bairros onde eu visito, negoceio e conheço rua por rua.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {neighborhoods.map((item) => (
            <li key={item.name} className="glass-panel rounded-xl px-4 py-4">
              <p className="font-display text-lg text-bone">{item.name}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-gold/75">{item.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionLayer>
  );
}
