"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Brain, Zap } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

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
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl"
          style={{
            background: "oklch(0.42 0.1 175)",
            transform: `translate(${tilt.y * 20}px, ${tilt.x * 20}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background: "oklch(0.78 0.15 85)",
            transform: `translate(${tilt.y * -15}px, ${tilt.x * -15}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-24">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase w-fit">
            <Zap className="size-3.5" />
            Corporate Team-Building Reimagined
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-foreground">
            Unlock Your Team&apos;s Potential Through{" "}
            <span className="text-primary">Immersive Play</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Murder-mystery investigations and escape-room challenges crafted for
            corporate teams of 10 to 100+. Strengthen collaboration, leadership,
            and creativity — one clue at a time.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Button
              size="lg"
              className="font-semibold text-base px-7"
              onClick={() => {
                document.querySelector("#experiences")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Experiences
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-semibold text-base px-7"
              onClick={() => {
                document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              View Pricing
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="size-4 text-primary" />
              <span><strong className="text-foreground">2,400+</strong> teams served</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="size-4 text-primary" />
              <span><strong className="text-foreground">98%</strong> satisfaction rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-primary" />
              <span><strong className="text-foreground">50+</strong> scenarios</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Hero visual with perspective */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative hero-perspective hidden lg:block"
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/5 dark:shadow-primary/10 border border-border/50 dark:border-border/30 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/[0.03] dark:to-accent/[0.03]"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* Illustrated hero scene: team around a board */}
            <div className="aspect-[4/3] relative flex items-center justify-center p-8">
              {/* Board / table visual */}
              <div className="absolute inset-6 rounded-xl bg-muted/40 dark:bg-muted/20 border border-border/40 dark:border-border/20" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <svg
                  viewBox="0 0 480 360"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Table */}
                  <ellipse cx="240" cy="210" rx="180" ry="100" fill="var(--svg-table)" stroke="var(--svg-table-stroke)" strokeWidth="3" />
                  {/* Clue cards on table */}
                  <rect x="160" y="165" width="55" height="70" rx="4" fill="var(--svg-primary)" opacity="0.8" />
                  <rect x="225" y="155" width="55" height="70" rx="4" fill="var(--svg-accent)" opacity="0.7" transform="rotate(6 252 190)" />
                  <rect x="290" y="168" width="55" height="70" rx="4" fill="var(--svg-violet)" opacity="0.6" transform="rotate(-4 317 203)" />
                  <rect x="200" y="235" width="55" height="70" rx="4" fill="var(--svg-red)" opacity="0.5" transform="rotate(3 227 270)" />
                  {/* People silhouettes */}
                  <circle cx="105" cy="140" r="18" fill="var(--svg-primary)" />
                  <path d="M105 158 L105 200 Q105 215 120 220" stroke="var(--svg-primary)" strokeWidth="6" strokeLinecap="round" fill="none" />
                  <circle cx="105" cy="140" r="18" fill="var(--svg-primary)" />
                  <path d="M87 200 Q105 210 123 200" stroke="var(--svg-primary)" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <circle cx="200" cy="115" r="17" fill="var(--svg-violet)" />
                  <path d="M200 132 L200 170 Q200 185 215 190" stroke="var(--svg-violet)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                  <circle cx="275" cy="120" r="17" fill="var(--svg-red)" />
                  <path d="M275 137 L275 175 Q275 190 260 195" stroke="var(--svg-red)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                  <circle cx="350" cy="130" r="17" fill="var(--svg-accent)" />
                  <path d="M350 147 L350 185 Q350 200 365 205" stroke="var(--svg-accent)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                  <circle cx="395" cy="175" r="16" fill="var(--svg-primary)" />
                  <path d="M395 191 L395 225 Q395 240 380 245" stroke="var(--svg-primary)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                  {/* Speech bubbles */}
                  <rect x="310" y="80" width="80" height="32" rx="10" fill="var(--svg-primary)" opacity="0.15" />
                  <text x="350" y="101" textAnchor="middle" fill="var(--svg-primary)" fontSize="11" fontWeight="600" fontFamily="sans-serif">Got it!</text>
                  <rect x="90" y="90" width="90" height="32" rx="10" fill="var(--svg-accent)" opacity="0.15" />
                  <text x="135" y="111" textAnchor="middle" fill="var(--svg-accent)" fontSize="11" fontWeight="600" fontFamily="sans-serif">A clue!</text>
                  {/* Magnifying glass */}
                  <circle cx="230" cy="265" r="12" stroke="var(--svg-primary)" strokeWidth="3" fill="none" opacity="0.4" />
                  <line x1="239" y1="274" x2="250" y2="285" stroke="var(--svg-primary)" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  {/* Question marks */}
                  <text x="170" y="95" fill="var(--svg-primary)" fontSize="20" opacity="0.3" fontWeight="bold">?</text>
                  <text x="340" y="108" fill="var(--svg-red)" fontSize="16" opacity="0.25" fontWeight="bold">?</text>
                </svg>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm border border-border/60 text-xs font-semibold text-primary shadow-sm">
              Live Investigation Mode
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}