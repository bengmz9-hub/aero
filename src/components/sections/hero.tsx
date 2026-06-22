"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Shield, Info } from "lucide-react";

export function Hero() {
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
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
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

      <div className="mx-auto max-w-7xl px-5 md:px-8 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-24">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-semibold tracking-wide uppercase w-fit border border-primary/20">
            <MapPin className="size-3.5" />
            Aeropuerto de Barcelona · IATA: BCN
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-white">
            Tu vuelo,{" "}
            <span className="runway-shimmer-text">sin estrés</span>
            <span className="text-white">.</span>
          </h1>

          <p className="text-lg text-white/60 leading-relaxed max-w-xl">
            Todo lo que necesitas saber antes de llegar al Aeropuerto El Prat:
            transporte, control de seguridad, equipaje de mano y cómo moverte
            por dentro sin complicaciones.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Button
              size="lg"
              className="font-semibold text-base px-7"
              onClick={() => document.querySelector("#transporte")?.scrollIntoView({ behavior: "smooth" })}
            >
              Cómo llegar
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-semibold text-base px-7 border-white/20 text-white hover:bg-white/10 hover:text-white"
              onClick={() => document.querySelector("#seguridad")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Shield className="size-4 mr-1.5" />
              Guía de seguridad
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <Info className="size-4 text-primary" />
              <span><strong className="text-white/80">2 Terminales</strong> — T1 y T2</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="size-4 text-primary" />
              <span><strong className="text-white/80">50M+</strong> pasajeros/año</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="size-4 text-primary" />
              <span><strong className="text-white/80">Abierto</strong> 24h/365 días</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Airport illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/10 bg-gradient-to-br from-primary/10 via-transparent to-accent/5"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.2s ease-out" }}
          >
            <div className="aspect-[4/3] relative flex items-center justify-center p-6">
              {/* SVG Airport Scene */}
              <svg viewBox="0 0 520 390" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Sky background gradient */}
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.15 0.04 255)" stopOpacity="1" />
                      <stop offset="100%" stopColor="oklch(0.10 0.02 255)" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="runwayGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="oklch(0.20 0.01 255)" stopOpacity="0" />
                      <stop offset="50%" stopColor="oklch(0.25 0.02 255)" stopOpacity="1" />
                      <stop offset="100%" stopColor="oklch(0.20 0.01 255)" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="planeGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="oklch(0.80 0.12 220)" />
                      <stop offset="100%" stopColor="oklch(0.95 0.03 220)" />
                    </linearGradient>
                  </defs>

                  <rect width="520" height="390" fill="url(#skyGrad)" rx="16" />

                  {/* Stars */}
                  {[[40,30],[90,55],[150,20],[220,45],[290,25],[360,60],[420,35],[480,50],[500,20],[55,80],[130,70],[200,15]].map(([cx, cy], i) => (
                    <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 1.5 : 1} fill="white" opacity={i % 2 === 0 ? 0.6 : 0.3} />
                  ))}

                  {/* Moon */}
                  <circle cx="460" cy="45" r="22" fill="oklch(0.88 0.06 70)" opacity="0.9" />
                  <circle cx="472" cy="38" r="18" fill="oklch(0.12 0.03 255)" />

                  {/* Clouds */}
                  <g className="cloud-drift-1">
                    <ellipse cx="100" cy="95" rx="45" ry="18" fill="white" opacity="0.06" />
                    <ellipse cx="125" cy="85" rx="30" ry="14" fill="white" opacity="0.07" />
                    <ellipse cx="80" cy="90" rx="28" ry="12" fill="white" opacity="0.05" />
                  </g>
                  <g className="cloud-drift-2">
                    <ellipse cx="370" cy="80" rx="40" ry="16" fill="white" opacity="0.05" />
                    <ellipse cx="395" cy="70" rx="25" ry="12" fill="white" opacity="0.06" />
                  </g>

                  {/* Terminal building */}
                  <rect x="60" y="190" width="260" height="120" rx="4" fill="oklch(0.22 0.02 255)" stroke="oklch(0.35 0.05 240)" strokeWidth="1" />
                  {/* Terminal windows */}
                  {[80,110,140,170,200,230,260,290].map((x, i) => (
                    <rect key={i} x={x} y="205" width="18" height="26" rx="2" fill={i % 3 === 0 ? "oklch(0.78 0.18 58)" : "oklch(0.68 0.20 220)"} opacity={i % 2 === 0 ? 0.8 : 0.4} />
                  ))}
                  {/* Terminal roof detail */}
                  <rect x="55" y="183" width="270" height="12" rx="3" fill="oklch(0.28 0.03 250)" />
                  <text x="190" y="260" textAnchor="middle" fill="oklch(0.65 0.15 220)" fontSize="11" fontWeight="700" fontFamily="sans-serif" letterSpacing="2">TERMINAL 1</text>

                  {/* Control tower */}
                  <rect x="340" y="170" width="28" height="140" rx="4" fill="oklch(0.25 0.03 250)" stroke="oklch(0.35 0.05 240)" strokeWidth="1" />
                  <rect x="330" y="158" width="48" height="22" rx="6" fill="oklch(0.30 0.04 245)" stroke="oklch(0.68 0.20 220)" strokeWidth="1.5" />
                  <ellipse cx="354" cy="158" rx="24" ry="8" fill="oklch(0.68 0.20 220)" opacity="0.3" />
                  {/* Tower windows */}
                  <rect x="338" y="163" width="10" height="10" rx="2" fill="oklch(0.68 0.20 220)" opacity="0.7" />
                  <rect x="360" y="163" width="10" height="10" rx="2" fill="oklch(0.78 0.18 58)" opacity="0.7" />
                  {/* Blinking light */}
                  <circle cx="354" cy="152" r="4" fill="oklch(0.78 0.20 25)" className="status-pulse" />

                  {/* Runway */}
                  <rect x="30" y="315" width="460" height="55" rx="4" fill="url(#runwayGrad)" />
                  {/* Runway center line dashes */}
                  {[50,110,170,230,290,350,410].map((x, i) => (
                    <rect key={i} x={x} y="337" width="40" height="6" rx="3" fill="oklch(0.78 0.18 58)" opacity="0.7" />
                  ))}
                  {/* Runway edge lights */}
                  {[40,90,140,190,240,290,340,390,440,480].map((x, i) => (
                    <circle key={i} cx={x} cy="316" r="3" fill="oklch(0.78 0.18 58)" opacity="0.9" className="status-pulse" />
                  ))}
                  {[40,90,140,190,240,290,340,390,440,480].map((x, i) => (
                    <circle key={`b${i}`} cx={x} cy="369" r="3" fill="oklch(0.78 0.18 58)" opacity="0.7" />
                  ))}

                  {/* Airplane — main */}
                  <g className="plane-fly-in" style={{ transformOrigin: "260px 165px" }}>
                    <g transform="translate(180, 130) rotate(-8)">
                      {/* Fuselage */}
                      <ellipse cx="80" cy="22" rx="75" ry="13" fill="url(#planeGrad)" />
                      {/* Nose */}
                      <ellipse cx="152" cy="22" rx="10" ry="8" fill="oklch(0.92 0.05 220)" />
                      {/* Cockpit windows */}
                      <ellipse cx="148" cy="18" rx="6" ry="4" fill="oklch(0.30 0.08 240)" opacity="0.8" />
                      {/* Main wing */}
                      <path d="M60 22 L110 22 L90 55 L30 52 Z" fill="oklch(0.75 0.10 220)" opacity="0.9" />
                      <path d="M60 22 L110 22 L90 -10 L30 -8 Z" fill="oklch(0.75 0.10 220)" opacity="0.9" />
                      {/* Wing engine */}
                      <ellipse cx="65" cy="50" rx="15" ry="6" fill="oklch(0.55 0.08 240)" />
                      <ellipse cx="65" cy="-6" rx="15" ry="6" fill="oklch(0.55 0.08 240)" />
                      {/* Tail */}
                      <path d="M8 22 L0 22 L-5 5 L20 10 Z" fill="oklch(0.70 0.12 220)" />
                      <path d="M8 22 L0 22 L-5 38 L20 33 Z" fill="oklch(0.70 0.12 220)" />
                      {/* Vertical stabilizer */}
                      <path d="M5 15 L-8 -5 L15 15 Z" fill="oklch(0.68 0.20 220)" opacity="0.8" />
                      {/* Windows strip */}
                      {[100,115,128,140].map((x, i) => (
                        <ellipse key={i} cx={x} cy="17" rx="5" ry="4" fill="oklch(0.78 0.18 58)" opacity="0.6" />
                      ))}
                      {/* Engine glow */}
                      <ellipse cx="155" cy="22" rx="4" ry="4" fill="oklch(0.78 0.18 58)" opacity="0.5" className="status-pulse" />
                    </g>
                  </g>

                  {/* Ground vehicles */}
                  <rect x="150" y="300" width="40" height="16" rx="3" fill="oklch(0.55 0.18 145)" opacity="0.8" />
                  <rect x="155" y="295" width="30" height="8" rx="2" fill="oklch(0.60 0.18 145)" opacity="0.6" />
                  <rect x="240" y="302" width="30" height="12" rx="2" fill="oklch(0.65 0.18 55)" opacity="0.7" />

                  {/* Ambient glow under terminal */}
                  <ellipse cx="190" cy="310" rx="130" ry="15" fill="oklch(0.68 0.20 220)" opacity="0.07" />
                </svg>
            </div>

            {/* Live badge */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 text-xs font-semibold text-foreground shadow-sm">
              <span className="size-2 rounded-full bg-green-400 status-pulse" />
              Operativo 24h
            </div>
            {/* IATA code badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-xs font-bold text-primary tracking-widest">
              BCN
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 text-xs"
      >
        <span>Desplázate para explorar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
