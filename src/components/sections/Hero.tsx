"use client";

import { broker, generalWhatsApp } from "@/lib/content";
import { GlowButton } from "@/components/ui/GlowButton";
import { ScrollHint } from "@/components/ui/ScrollHint";
import { SectionLayer } from "@/components/ui/SectionLayer";

export function Hero({ showPortrait }: { showPortrait: boolean }) {
  return (
    <SectionLayer id="hero">
      <div className="relative grid min-h-[72vh] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className={showPortrait ? "text-left" : "mx-auto max-w-3xl text-center lg:col-span-2"}>
          <p className="section-kicker">Rafael Couto · CRECI ativo</p>
          <h1 className="display-title text-balance">{broker.headline}</h1>
          <p
            className={`mt-6 max-w-xl text-base font-light leading-relaxed text-bone/75 sm:text-lg ${
              showPortrait ? "" : "mx-auto"
            }`}
          >
            {broker.tagline}
          </p>
          <div className={`mt-10 ${showPortrait ? "" : "flex justify-center"}`}>
            <GlowButton href={generalWhatsApp} external>
              Conversar no WhatsApp
            </GlowButton>
          </div>
          <div className={`mt-16 ${showPortrait ? "" : "flex justify-center"}`}>
            <ScrollHint />
          </div>
        </div>

        {showPortrait ? (
          <div className="relative mx-auto hidden w-full max-w-sm lg:block">
            <div className="absolute -inset-6 rounded-[2rem] bg-gold/10 blur-2xl" />
            <img
              src={broker.portrait}
              alt="Rafael Couto, corretor de imóveis em Senador Canedo"
              className="relative aspect-[3/4] w-full rounded-[1.6rem] object-cover object-top opacity-90 shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-gold/25"
            />
            <p className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-gold/80">
              {broker.role} · {broker.city}
            </p>
          </div>
        ) : null}
      </div>
    </SectionLayer>
  );
}
