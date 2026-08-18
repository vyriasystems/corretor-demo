"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sections } from "@/lib/content";
import { Contato } from "@/components/sections/Contato";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { Hero } from "@/components/sections/Hero";
import { Imoveis } from "@/components/sections/Imoveis";
import { Localizacao } from "@/components/sections/Localizacao";
import { Processo } from "@/components/sections/Processo";
import { Sobre } from "@/components/sections/Sobre";
import { Logo } from "@/components/ui/Logo";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { SmoothScroll, useLenis } from "@/components/experience/SmoothScroll";
import { VideoStage } from "@/components/experience/VideoStage";

gsap.registerPlugin(ScrollTrigger);

type FrameManifest = { files: string[]; fps?: number };

const VIDEO_SPEED = 1.2;

export function CinematicExperience() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    setBooted(true);
  }, []);

  if (!booted) return <Loader visible />;

  return (
    <SmoothScroll enabled={false}>
      <ExperienceBody />
    </SmoothScroll>
  );
}

function ExperienceBody() {
  const lenis = useLenis();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const progressRef = useRef(0);
  const lastDrawnRef = useRef(-1);
  const [mode, setMode] = useState<"video" | "canvas">("video");
  const [showPortrait, setShowPortrait] = useState(false);
  const [activeId, setActiveId] = useState<(typeof sections)[number]["id"]>("hero");

  useEffect(() => {
    if (lenis) ScrollTrigger.refresh();
  }, [lenis]);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const canvasNode = stage.querySelector<HTMLCanvasElement>("[data-scrub-canvas]");
    if (!canvasNode) return;
    const canvas: HTMLCanvasElement = canvasNode;

    let cancelled = false;
    let raf = 0;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    }

    function drawFrame(image: HTMLImageElement, alpha = 1) {
      if (!ctx) return;
      const width = canvas.width;
      const height = canvas.height;
      const imageRatio = image.width / image.height;
      const canvasRatio = width / height;
      let dw = width;
      let dh = height;
      let dx = 0;
      let dy = 0;
      if (imageRatio > canvasRatio) {
        dw = height * imageRatio;
        dx = (width - dw) / 2;
      } else {
        dh = width / imageRatio;
        dy = (height - dh) / 2;
      }
      ctx.globalAlpha = alpha;
      ctx.drawImage(image, dx, dy, dw, dh);
      ctx.globalAlpha = 1;
    }

    function paint() {
      if (cancelled) return;
      raf = requestAnimationFrame(paint);
      const frames = framesRef.current;
      const last = frames.length - 1;
      if (last < 0) return;
      const exact = Math.min(1, progressRef.current * VIDEO_SPEED) * last;
      if (Math.abs(exact - lastDrawnRef.current) < 0.01) return;
      lastDrawnRef.current = exact;
      const i0 = Math.max(0, Math.min(last, Math.floor(exact)));
      const i1 = Math.min(last, i0 + 1);
      const mix = exact - i0;
      const first = frames[i0] ?? frames.find(Boolean);
      if (!first) return;
      drawFrame(first, 1);
      const next = frames[i1];
      if (next && i1 !== i0 && mix > 0.03) drawFrame(next, mix);
    }

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.round(window.innerHeight * dpr));
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
      lastDrawnRef.current = -1;
    }

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();
    raf = requestAnimationFrame(paint);

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        progressRef.current = self.progress;
        if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
      },
    });

    const observers = sections.map((section) => {
      const el = document.getElementById(section.id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(section.id);
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0.01 },
      );
      observer.observe(el);
      return observer;
    });

    void (async () => {
      try {
        const response = await fetch("/frames/manifest.json", { cache: "force-cache" });
        if (!response.ok || cancelled) return;
        const manifest = (await response.json()) as FrameManifest;
        if (!manifest.files?.length) return;
        const images: (HTMLImageElement | undefined)[] = new Array(manifest.files.length);
        framesRef.current = images;
        const loadOne = (src: string, index: number) =>
          new Promise<void>((resolve) => {
            const image = new Image();
            image.decoding = "async";
            image.onload = () => {
              images[index] = image;
              resolve();
            };
            image.onerror = () => resolve();
            image.src = src;
          });
        await Promise.all(manifest.files.slice(0, 12).map((src, index) => loadOne(src, index)));
        if (cancelled) return;
        setMode("canvas");
        lastDrawnRef.current = -1;
        for (let i = 12; i < manifest.files.length; i += 12) {
          if (cancelled) return;
          await Promise.all(manifest.files.slice(i, i + 12).map((src, offset) => loadOne(src, i + offset)));
          await new Promise((resolve) => window.setTimeout(resolve, 0));
        }
      } catch {
        /* keep the first painted frame */
      }
    })();

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resizeCanvas);
      trigger.kill();
      observers.forEach((observer) => observer?.disconnect());
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 0.8 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <VideoStage ref={stageRef} mode={mode} />
      <div ref={barRef} className="fixed left-0 top-0 z-40 h-[2px] w-full origin-left bg-gold" style={{ transform: "scaleX(0)" }} />
      <header className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-5 sm:px-8">
        <div className="pointer-events-auto">
          <Logo />
        </div>
        <div className="pointer-events-auto hidden rounded-full border border-white/15 bg-petrol/60 p-1 text-[10px] uppercase tracking-[0.16em] text-bone/70 md:flex">
          <button type="button" onClick={() => setShowPortrait(false)} className={`rounded-full px-3 py-1.5 transition ${!showPortrait ? "bg-gold/20 text-gold" : "hover:text-bone"}`}>
            Só texto
          </button>
          <button type="button" onClick={() => setShowPortrait(true)} className={`rounded-full px-3 py-1.5 transition ${showPortrait ? "bg-gold/20 text-gold" : "hover:text-bone"}`}>
            Com retrato
          </button>
        </div>
      </header>
      <nav aria-label="Seções" className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 lg:flex">
        <ul className="pointer-events-auto flex flex-col gap-3">
          {sections.map((section) => (
            <li key={section.id}>
              <button type="button" onClick={() => scrollToId(section.id)} className="group flex items-center justify-end gap-3" aria-current={activeId === section.id ? "true" : undefined}>
                <span className={`text-[10px] uppercase tracking-[0.22em] transition-opacity ${activeId === section.id ? "text-gold opacity-100" : "text-white/40 opacity-0 group-hover:opacity-100"}`}>
                  {section.label}
                </span>
                <span className={`block h-2 w-2 rounded-full border transition-all ${activeId === section.id ? "border-gold bg-gold shadow-[0_0_10px_#C6A15B]" : "border-white/35 bg-transparent"}`} />
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div ref={trackRef} className="relative z-10">
        <Hero showPortrait={showPortrait} />
        <Sobre />
        <Imoveis />
        <Processo />
        <Depoimentos />
        <Localizacao />
        <Contato />
      </div>
      <WhatsAppFloat />
    </>
  );
}

function Loader({ visible }: { visible: boolean }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-petrol-deep transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Logo />
    </div>
  );
}
