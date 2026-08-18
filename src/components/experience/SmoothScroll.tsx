"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScroll({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let removeScroll: (() => void) | undefined;

    const instance = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1,
      wheelMultiplier: 1.15,
      autoRaf: true,
      overscroll: true,
      allowNestedScroll: true,
      respectReducedMotion: false,
    });

    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled) return;
      removeScroll = instance.on("scroll", ScrollTrigger.update);
      ScrollTrigger.refresh();
    });

    setLenis(instance);

    return () => {
      cancelled = true;
      removeScroll?.();
      instance.destroy();
      setLenis(null);
    };
  }, [enabled]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
