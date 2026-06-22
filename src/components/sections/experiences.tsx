"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Trophy,
  Lightbulb,
  Search,
  Lock,
  Compass,
  Clock,
  Star,
} from "lucide-react";

type Skill = "collaboration" | "leadership" | "creativity";

interface Experience {
  id: string;
  title: string;
  description: string;
  duration: string;
  players: string;
  skills: Skill[];
  icon: React.ReactNode;
  accent: string;
}

const SKILLS: { key: Skill; label: string; icon: React.ReactNode }[] = [
  { key: "collaboration", label: "Collaboration", icon: <Users className="size-3.5" /> },
  { key: "leadership", label: "Leadership", icon: <Trophy className="size-3.5" /> },
  { key: "creativity", label: "Creativity", icon: <Lightbulb className="size-3.5" /> },
];

const EXPERIENCES: Experience[] = [
  {
    id: "the-manor-mystery",
    title: "The Manor Mystery",
    description:
      "A poisoned goblet, a sealed study, and six suspects with motives. Your team must interrogate witnesses, decode secret correspondence, and piece together a timeline before the clock runs out. Every member holds a different piece of the puzzle.",
    duration: "90 min",
    players: "10–30",
    skills: ["collaboration", "leadership"],
    icon: <Search className="size-6" />,
    accent: "oklch(0.42 0.1 175)",
  },
  {
    id: "vault-heist",
    title: "Vault Heist Protocol",
    description:
      "Your team has been hired for the ultimate challenge: crack a multi-layered vault using nothing but collective logic, physical puzzles, and strategic communication. Teams must delegate roles and manage time across simultaneous puzzle stations.",
    duration: "60 min",
    players: "8–25",
    skills: ["leadership", "collaboration"],
    icon: <Lock className="size-6" />,
    accent: "oklch(0.65 0.15 25)",
  },
  {
    id: "the-inventors-lab",
    title: "The Inventor's Lab",
    description:
      "Step into the workshop of a missing genius. Strange contraptions, blueprints with hidden messages, and a prototype that could change everything. Teams must think outside the box, experiment with unconventional solutions, and connect disparate ideas.",
    duration: "75 min",
    players: "10–40",
    skills: ["creativity", "collaboration"],
    icon: <Lightbulb className="size-6" />,
    accent: "oklch(0.78 0.15 85)",
  },
  {
    id: "arctic-expedition",
    title: "Arctic Expedition Lost",
    description:
      "Your research team is stranded at a remote outpost. Food is running low, the radio is damaged, and a storm is approaching. Leaders must emerge, resources must be rationed, and critical decisions must be made under pressure.",
    duration: "90 min",
    players: "15–50",
    skills: ["leadership", "creativity"],
    icon: <Compass className="size-6" />,
    accent: "oklch(0.55 0.12 300)",
  },
  {
    id: "codebreakers",
    title: "Codebreakers: Enigma Unlocked",
    description:
      "Inspired by real wartime cryptography, teams race to crack intercepted messages using cipher wheels, frequency analysis, and lateral thinking. A high-stakes narrative keeps the energy electric from start to finish.",
    duration: "60 min",
    players: "10–35",
    skills: ["creativity", "collaboration"],
    icon: <Star className="size-6" />,
    accent: "oklch(0.5 0.18 75)",
  },
  {
    id: "the-gala-affair",
    title: "The Gala Affair",
    description:
      "A high-society evening, a stolen artifact, and everyone is a suspect. This elegant murder-mystery demands keen observation, persuasive negotiation, and the ability to form alliances — or betray them.",
    duration: "120 min",
    players: "20–60",
    skills: ["collaboration", "leadership", "creativity"],
    icon: <Trophy className="size-6" />,
    accent: "oklch(0.45 0.14 310)",
  },
];

export function Experiences() {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const sortedExperiences = useMemo(() => {
    if (!activeSkill) return EXPERIENCES;
    return [...EXPERIENCES].sort((a, b) => {
      const aMatch = a.skills.includes(activeSkill) ? 0 : 1;
      const bMatch = b.skills.includes(activeSkill) ? 0 : 1;
      return aMatch - bMatch;
    });
  }, [activeSkill]);

  return (
    <section id="experiences" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Immersive Experiences
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every scenario is designed to sharpen specific team skills. Filter by
            the competency your organization needs most.
          </p>
        </motion.div>

        {/* Skill filter tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {SKILLS.map((skill) => (
            <button
              key={skill.key}
              onClick={() =>
                setActiveSkill(activeSkill === skill.key ? null : skill.key)
              }
              className={`skill-tag-glow inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                activeSkill === skill.key
                  ? "active"
                  : "border-border bg-background text-foreground hover:border-primary/40"
              }`}
            >
              {skill.icon}
              {skill.label}
            </button>
          ))}
        </div>

        {/* Experience cards */}
        <LayoutGroup>
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {sortedExperiences.map((exp) => {
                const isMatch = activeSkill ? exp.skills.includes(activeSkill) : true;
                return (
                  <motion.article
                    layout
                    key={exp.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: isMatch ? 1 : 0.4,
                      scale: 1,
                      transition: { duration: 0.35, ease: "easeInOut" },
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:border-primary/30 transition-shadow duration-300"
                  >
                    {/* Accent bar */}
                    <div
                      className="absolute top-0 left-6 right-6 h-0.5 rounded-b"
                      style={{ backgroundColor: exp.accent }}
                    />

                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="flex items-center justify-center size-11 rounded-lg"
                        style={{ backgroundColor: `${exp.accent}15`, color: exp.accent }}
                      >
                        {exp.icon}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {exp.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="size-3" />
                          {exp.players}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((s) => {
                        const info = SKILLS.find((sk) => sk.key === s);
                        return (
                          <Badge
                            key={s}
                            variant={activeSkill === s ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {info?.icon}
                            {info?.label}
                          </Badge>
                        );
                      })}
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}