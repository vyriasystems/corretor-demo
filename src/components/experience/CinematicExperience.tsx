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

type FrameManifest = { files: string[] };

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CinematicExperience() {
  const [reduced, setReduced] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    setBooted(true);
  }, []);

  if (!booted) return <Loader visible />;

  return (
    <SmoothScroll enabled={!reduced}>
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
  const lastIndexRef = useRef(-1);
  const [mode, setMode] = useState<"video" | "canvas">("video");
  const [ready, setReady] = useState(false);
  const [showPortrait, setShowPortrait] = useState(false);
  const [activeId, setActiveId] = useState<(typeof sections)[number]["id"]>("hero");

  useEffect(() => {
    if (lenis) ScrollTrigger.refresh();
  }, [lenis]);

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;

    const video = stage.querySelector<HTMLVideoElement>("[data-scrub-video]");
    const canvas = stage.querySelector<HTMLCanvasElement>("[data-scrub-canvas]");
    if (!video || !canvas) return;

    let cancelled = false;
    let trigger: ScrollTrigger | undefined;
    let raf = 0;
    let usingCanvas = false;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });

    function drawFrame(image: HTMLImageElement) {
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
      ctx.drawImage(image, dx, dy, dw, dh);
    }

    function paint() {
      if (cancelled) return;
      raf = requestAnimationFrame(paint);
      if (!usingCanvas) return;
      const frames = framesRef.current;
      const last = frames.length - 1;
      if (last < 0) return;
      const index = Math.max(0, Math.min(last, Math.round(progressRef.current * last)));
      if (index === lastIndexRef.current) return;
      const image = frames[index] ?? frames.find(Boolean);
      if (!image) return;
      lastIndexRef.current = index;
      drawFrame(image);
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lastIndexRef.current = -1;
    }

    video.pause();
    video.muted = true;
    video.playsInline = true;
    video.addEventListener("play", () => video.pause());
    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();
    setReady(true);
    raf = requestAnimationFrame(paint);

    trigger = ScrollTrigger.create({
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
        await Promise.all(manifest.files.slice(0, 16).map((src, index) => loadOne(src, index)));
        if (cancelled) return;
        usingCanvas = true;
        setMode("canvas");
        lastIndexRef.current = -1;
        for (let i = 16; i < manifest.files.length; i += 16) {
          if (cancelled) return;
          await Promise.all(manifest.files.slice(i, i + 16).map((src, offset) => loadOne(src, i + offset)));
          await new Promise((resolve) => window.setTimeout(resolve, 0));
        }
      } catch {
        /* keep first video frame */
      }
    })();

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelled = true;
      window.removeEventListener("resize", resizeCanvas);
      trigger?.kill();
      observers.forEach((observer) => observer?.disconnect());
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Loader visible={!ready} />
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
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-petrol-deep transition-opacity duration-700 ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <Logo />
    </div>
  );
}
