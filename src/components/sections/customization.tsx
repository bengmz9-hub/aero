"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Palette,
  FileText,
  Briefcase,
  ArrowRight,
  Stamp,
  ShieldCheck,
} from "lucide-react";

const SCENARIO_THEMES = [
  { value: "noir", label: "Classic Noir" },
  { value: "spy", label: "Espionage & Intelligence" },
  { value: "scifi", label: "Sci-Fi Mystery" },
  { value: "historical", label: "Historical Intrigue" },
  { value: "heist", label: "The Grand Heist" },
  { value: "custom", label: "Fully Custom Narrative" },
];

const BRAND_COLORS = [
  { label: "Emerald", value: "oklch(0.42 0.1 175)" },
  { label: "Amber", value: "oklch(0.78 0.15 85)" },
  { label: "Crimson", value: "oklch(0.55 0.2 25)" },
  { label: "Violet", value: "oklch(0.5 0.18 300)" },
  { label: "Teal", value: "oklch(0.5 0.15 190)" },
];

export function Customization() {
  const [companyName, setCompanyName] = useState("Acme Corp");
  const [theme, setTheme] = useState("spy");
  const [teamCount, setTeamCount] = useState("35");
  const [brandColor, setBrandColor] = useState(BRAND_COLORS[0].value);
  const [isBuilding, setIsBuilding] = useState(false);
  const [dossierReady, setDossierReady] = useState(false);

  const handleBuildDossier = () => {
    if (!companyName.trim()) return;
    setIsBuilding(true);
    setDossierReady(false);
    setTimeout(() => {
      setIsBuilding(false);
      setDossierReady(true);
    }, 1800);
  };

  const selectedTheme = SCENARIO_THEMES.find((t) => t.value === theme);
  const selectedColor = BRAND_COLORS.find((c) => c.value === brandColor);

  return (
    <section id="customization" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-xs font-semibold tracking-wide uppercase mb-4">
            <Palette className="size-3.5" />
            Branded Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Make It Uniquely Yours
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Custom-branded scenarios that weave your company&apos;s culture, values,
            and even your logo into the mystery. Your team will never forget it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Configuration form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-border bg-card p-6 space-y-5">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Briefcase className="size-5 text-primary" />
                Configure Your Experience
              </h3>

              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your company name"
                  className="max-w-sm"
                />
              </div>

              <div className="space-y-2">
                <Label>Scenario Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="max-w-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SCENARIO_THEMES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team-count">Expected Team Size</Label>
                <Select value={teamCount} onValueChange={setTeamCount}>
                  <SelectTrigger className="max-w-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">10–24 people</SelectItem>
                    <SelectItem value="35">25–49 people</SelectItem>
                    <SelectItem value="75">50–99 people</SelectItem>
                    <SelectItem value="100">100+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Brand Accent Color</Label>
                <div className="flex flex-wrap gap-3">
                  {BRAND_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setBrandColor(color.value)}
                      className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer ${
                        brandColor === color.value
                          ? "border-foreground scale-110 shadow-md"
                          : "border-transparent hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={color.label}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <Button
                onClick={handleBuildDossier}
                disabled={!companyName.trim() || isBuilding}
                className="w-full font-semibold"
                size="lg"
              >
                {isBuilding ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                      }}
                      className="inline-block size-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                    Building Dossier...
                  </>
                ) : (
                  <>
                    <Stamp className="size-4 mr-2" />
                    Generate Preview Dossier
                    <ArrowRight className="size-4 ml-1.5" />
                  </>
                )}
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: <FileText className="size-5" />,
                  title: "Custom Narratives",
                  desc: "Storylines tailored to your industry and team dynamics",
                },
                {
                  icon: <ShieldCheck className="size-5" />,
                  title: "NDA Protected",
                  desc: "All proprietary content kept strictly confidential",
                },
              ].map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-lg border border-border bg-card p-4"
                >
                  <div className="text-primary mb-2">{benefit.icon}</div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Dossier preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div
                className={`dossier-bg rounded-2xl border border-border bg-card overflow-hidden shadow-lg transition-all duration-500 ${
                  dossierReady ? "ring-2 ring-primary/30" : ""
                }`}
              >
                {/* Dossier header */}
                <div
                  className="p-6 relative"
                  style={{ backgroundColor: `${brandColor}08` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="size-3 rounded-full"
                        style={{ backgroundColor: brandColor }}
                      />
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        Classified Preview
                      </span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      DOSSIER-{Date.now().toString(36).toUpperCase().slice(-6)}
                    </span>
                  </div>

                  {/* Company logo placeholder */}
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      key={companyName}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, type: "spring" }}
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md"
                      style={{ backgroundColor: brandColor }}
                    >
                      {companyName.slice(0, 2).toUpperCase()}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {companyName || "Your Company"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Custom Team-Building Dossier
                      </p>
                    </div>
                  </div>

                  <Separator />
                </div>

                {/* Dossier content */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Theme
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {selectedTheme?.label}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Team Size
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {parseInt(teamCount) >= 100
                          ? "100+"
                          : teamCount}{" "}
                        participants
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Status
                      </p>
                      <motion.p
                        key={isBuilding ? "building" : dossierReady ? "ready" : "pending"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`text-sm font-semibold ${
                          dossierReady
                            ? "text-primary"
                            : isBuilding
                            ? "text-amber"
                            : "text-muted-foreground"
                        }`}
                      >
                        {dossierReady
                          ? "Preview Ready"
                          : isBuilding
                          ? "Generating..."
                          : "Awaiting Config"}
                      </motion.p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                        Brand Color
                      </p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: brandColor }}
                        />
                        <span className="text-sm font-semibold text-foreground">
                          {selectedColor?.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Dossier preview content */}
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Scenario Brief
                    </p>
                    <div className="rounded-lg bg-muted/50 border border-border p-4">
                      <p className="text-sm text-foreground leading-relaxed">
                        {dossierReady
                          ? `A thrilling ${selectedTheme?.label?.toLowerCase()} scenario has been designed exclusively for ${companyName}. ${parseInt(teamCount) >= 50 ? "Multiple concurrent game tracks will ensure every participant is engaged." : "The narrative has been tailored to challenge your team's unique dynamics."} Brand elements, including your logo and corporate values, are woven seamlessly into every clue and character.`
                          : isBuilding
                          ? "Encrypting scenario parameters... Analyzing team dynamics... Generating custom narrative arcs..."
                          : "Configure your experience and click 'Generate Preview Dossier' to see a sample scenario brief tailored to your organization."}
                      </p>
                    </div>
                  </div>

                  {dossierReady && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Button
                        className="w-full font-semibold"
                        size="lg"
                        onClick={() => {
                          document
                            .querySelector("#cta")
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        Request Full Proposal
                        <ArrowRight className="size-4 ml-1.5" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}