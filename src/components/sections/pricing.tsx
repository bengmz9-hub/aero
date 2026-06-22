"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Users,
  Check,
  ArrowRight,
  Sparkles,
  Crown,
  Rocket,
} from "lucide-react";

const TIERS = [
  {
    name: "Starter",
    size: "10–24 people",
    basePrice: 45,
    icon: <Rocket className="size-5" />,
    features: [
      "1 experience of your choice",
      "Dedicated game host",
      "Digital clue kits included",
      "Post-game debrief summary",
      "Basic team analytics report",
    ],
  },
  {
    name: "Professional",
    size: "25–49 people",
    basePrice: 38,
    icon: <Sparkles className="size-5" />,
    popular: true,
    features: [
      "2 experiences or 1 custom scenario",
      "Senior game host + assistant",
      "Premium physical props shipped",
      "Detailed team-performance report",
      "Priority scheduling",
      "Follow-up workshop recommendation",
    ],
  },
  {
    name: "Enterprise",
    size: "50–100+ people",
    basePrice: 30,
    icon: <Crown className="size-5" />,
    features: [
      "Unlimited experiences, full day",
      "Multiple concurrent game hosts",
      "Full branded experience package",
      "Executive summary + HR insights",
      "Dedicated event coordinator",
      "Annual partnership discount",
      "Custom scenario development",
    ],
  },
];

export function Pricing() {
  const [teamSize, setTeamSize] = useState(25);
  const [displayPrice, setDisplayPrice] = useState(0);
  const animRef = useRef<number | null>(null);
  const prevPrice = useRef(0);

  const getTierForSize = useCallback((size: number) => {
    if (size <= 24) return TIERS[0];
    if (size <= 49) return TIERS[1];
    return TIERS[2];
  }, []);

  const calculatePrice = useCallback(
    (size: number) => {
      const tier = getTierForSize(size);
      return tier.basePrice * size;
    },
    [getTierForSize]
  );

  // Animate price counter smoothly
  useEffect(() => {
    const targetPrice = calculatePrice(teamSize);
    const startPrice = prevPrice.current;
    const diff = targetPrice - startPrice;
    const duration = 400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayPrice(Math.round(startPrice + diff * eased));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        prevPrice.current = targetPrice;
      }
    };

    if (animRef.current) cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [teamSize, calculatePrice]);

  const currentTier = getTierForSize(teamSize);

  // Tick marks for the slider
  const ticks = [10, 25, 50, 75, 100];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4">
            <Building2 className="size-3.5" />
            For Companies
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Transparent Pricing, Real ROI
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Per-person pricing that scales down as your team grows. Every package
            includes a dedicated host, materials, and post-event analytics.
          </p>
        </motion.div>

        {/* Interactive price calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Team Size
              </span>
              <span className="text-sm font-semibold text-foreground">
                {teamSize} {teamSize === 1 ? "person" : "people"}
              </span>
            </div>

            {/* Slider */}
            <div className="relative pt-2 pb-6">
              <Slider
                value={[teamSize]}
                onValueChange={(v) => setTeamSize(v[0])}
                min={10}
                max={100}
                step={1}
                className="w-full"
              />
              {/* Tick marks */}
              <div className="flex justify-between mt-2 px-0.5">
                {ticks.map((tick) => (
                  <button
                    key={tick}
                    onClick={() => setTeamSize(tick)}
                    className={`text-xs font-medium transition-colors cursor-pointer ${
                      teamSize === tick
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tick}+
                  </button>
                ))}
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Price display */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Estimated total for{" "}
                  <span className="text-foreground font-medium">
                    {currentTier.name}
                  </span>{" "}
                  package
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="price-display text-4xl font-bold text-foreground">
                    ${displayPrice.toLocaleString()}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    ({currentTier.basePrice}/person)
                  </span>
                </div>
              </div>
              <Button
                size="lg"
                className="font-semibold"
                onClick={() => {
                  document
                    .querySelector("#cta")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Quote
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((tier, i) => {
            const isActive =
              (i === 0 && teamSize <= 24) ||
              (i === 1 && teamSize >= 25 && teamSize <= 49) ||
              (i === 2 && teamSize >= 50);
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative rounded-xl border p-6 transition-all duration-300 ${
                  tier.popular
                    ? "border-primary shadow-md shadow-primary/10"
                    : "border-border bg-card"
                } ${isActive ? "ring-2 ring-primary/30" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary">
                    {tier.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{tier.size}</p>
                  </div>
                </div>

                <div className="mb-5">
                  <span className="text-3xl font-bold text-foreground">
                    ${tier.basePrice}
                  </span>
                  <span className="text-muted-foreground text-sm">/person</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="size-4 text-primary mt-0.5 shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.popular ? "default" : "outline"}
                  className="w-full font-semibold"
                  onClick={() => {
                    setTeamSize(
                      i === 0 ? 15 : i === 1 ? 35 : 60
                    );
                    document
                      .querySelector("#cta")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {tier.popular ? "Get Started" : "Choose Plan"}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}