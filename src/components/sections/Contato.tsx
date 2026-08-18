import { broker, contactWhatsApp } from "@/lib/content";
import { GlowButton } from "@/components/ui/GlowButton";
import { SectionLayer } from "@/components/ui/SectionLayer";

export function Contato() {
  return (
    <SectionLayer id="contato">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-kicker">Vamos conversar</p>
        <h2 className="display-title">Vamos conversar sobre o seu próximo imóvel</h2>
        <p className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-bone/75">
          Um site seu continua no ar mesmo se o Instagram sair do ar amanhã. O próximo passo é uma conversa — não um formulário.
        </p>
        <div className="mt-10">
          <GlowButton href={contactWhatsApp} external size="lg">
            Chamar no WhatsApp
          </GlowButton>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-bone/45">
          <a href={broker.phoneHref} className="transition hover:text-gold">
            {broker.phoneDisplay}
          </a>
          <a
            href={broker.instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-gold"
          >
            {broker.instagram}
          </a>
          <span>{broker.creci}</span>
        </div>
      </div>
    </SectionLayer>
  );
}
