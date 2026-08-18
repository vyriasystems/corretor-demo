import { steps } from "@/lib/content";
import { SectionLayer } from "@/components/ui/SectionLayer";

export function Processo() {
  return (
    <SectionLayer id="processo">
      <div>
        <p className="section-kicker">Como funciona</p>
        <h2 className="display-title max-w-2xl">Consultoria, não vitrine de link</h2>
        <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-bone/70">
          O processo existe para você decidir com clareza — sem pressa e sem pressão.
        </p>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {steps.map((step) => (
            <li key={step.number} className="glass-panel rounded-2xl p-5 sm:p-6">
              <span className="font-display text-3xl italic text-gold/80">{step.number}</span>
              <h3 className="mt-3 font-display text-2xl leading-tight text-bone">{step.title}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-bone/65">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </SectionLayer>
  );
}
