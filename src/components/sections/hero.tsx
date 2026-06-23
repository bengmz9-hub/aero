"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Shield, Info } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ConnectionsGlobe } from "@/components/sections/connections-globe";

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -5, y: x * 5 });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden pt-24 pb-8"
      onMouseLeave={handleMouseLeave}
    >
      {/* Sky gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.02_260)] via-[oklch(0.14_0.05_255)] to-[oklch(0.10_0.015_255)] dark:from-[oklch(0.06_0.02_260)] dark:via-[oklch(0.10_0.04_255)] dark:to-[oklch(0.08_0.015_255)]" />
        {/* Aurora blobs */}
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: "oklch(0.68 0.20 220)", transform: `translate(${tilt.y * 25}px, ${tilt.x * 25}px)`, transition: "transform 0.4s ease-out" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "oklch(0.78 0.18 58)", transform: `translate(${tilt.y * -15}px, ${tilt.x * -15}px)`, transition: "transform 0.4s ease-out" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full opacity-[0.04] blur-3xl"
          style={{ background: "oklch(0.68 0.18 185)", transform: `translate(${tilt.y * 10}px, ${tilt.x * 10}px)`, transition: "transform 0.4s ease-out" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-16 pb-8 md:pt-20 md:pb-10">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-md text-primary text-[10px] font-bold tracking-widest uppercase w-fit border border-white/10">
            <MapPin className="size-3.5" />
            {t.hero.tagLocation}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-zinc-100">
            {t.hero.title}{" "}
            <span className="runway-shimmer-text">{t.hero.titleHighlight}</span>
            <span className="text-zinc-100">{t.hero.titlePunctuation}</span>
          </h1>

          <p className="text-lg text-zinc-300 leading-relaxed max-w-xl">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Button
              size="lg"
              className="font-semibold text-base px-7"
              onClick={() => document.querySelector("#transporte")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.btnPrimary}
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-semibold text-base px-7 border-white/20 text-zinc-100 hover:bg-white/10 hover:text-zinc-100"
              onClick={() => document.querySelector("#seguridad")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Shield className="size-4 mr-1.5" />
              {t.hero.btnSecondary}
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <Info className="size-4 text-primary" />
              <span><strong className="text-zinc-200">{t.hero.stats.terminals}</strong> {t.hero.stats.terminalsDesc}</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="size-4 text-primary" />
              <span><strong className="text-zinc-200">{t.hero.stats.pax}</strong> {t.hero.stats.paxDesc}</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="size-4 text-primary" />
              <span><strong className="text-zinc-200">{t.hero.stats.open}</strong> {t.hero.stats.openDesc}</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Terminal Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative block w-full lg:max-w-[540px] justify-self-end mt-10 lg:mt-0"
        >
          <div
            className="relative z-10"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.2s ease-out" }}
          >
            <ConnectionsGlobe />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
