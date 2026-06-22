"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronDown,
  Building2,
  Quote,
} from "lucide-react";

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  participants: number;
  experience: string;
  rating: number;
  headline: string;
  quote: string;
  author: string;
  role: string;
  metric: string;
  metricValue: string;
  accent: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "stripe-case",
    company: "Finova Group",
    industry: "Financial Services",
    participants: 85,
    experience: "The Gala Affair",
    rating: 5,
    headline: "Turned skeptics into advocates in 2 hours",
    quote:
      "We were hesitant about game-based team building — it felt too casual for our culture. EnigmaWorks completely changed that perception. The sophistication of the narrative and the way it challenged our leadership team was extraordinary. Our VP of Engineering, who never participates in voluntary events, was the most engaged person in the room.",
    author: "Sarah Chen",
    role: "Head of People & Culture",
    metric: "Engagement Score",
    metricValue: "97%",
    accent: "var(--exp-teal)",
  },
  {
    id: "tech-case",
    company: "NovaTech Labs",
    industry: "Technology",
    participants: 42,
    experience: "Codebreakers: Enigma Unlocked",
    rating: 5,
    headline: "Broke down silos between engineering teams",
    quote:
      "Our backend and frontend teams rarely collaborated outside of sprint planning. After Codebreakers, we saw a measurable shift in cross-team communication. The shared experience created reference points and inside jokes that still come up in standups six months later. Best team-building investment we have ever made.",
    author: "Marcus Rivera",
    role: "CTO",
    metric: "Cross-team Collab",
    metricValue: "+62%",
    accent: "var(--exp-crimson)",
  },
  {
    id: "consulting-case",
    company: "Meridian Consulting",
    industry: "Management Consulting",
    participants: 120,
    experience: "Arctic Expedition Lost",
    rating: 5,
    headline: "Revealed hidden leaders across the organization",
    quote:
      "We needed an activity that could handle 120 people across four offices simultaneously. The Arctic Expedition not only managed that logistics flawlessly, but it surfaced leadership qualities in junior consultants that we had completely overlooked. Three of those individuals have since been promoted into team-lead roles.",
    author: "Dr. Helena Krause",
    role: "Managing Partner",
    metric: "Leaders Identified",
    metricValue: "14",
    accent: "var(--exp-gold)",
  },
  {
    id: "healthcare-case",
    company: "VitalPath Health",
    industry: "Healthcare",
    participants: 30,
    experience: "The Inventor's Lab",
    rating: 5,
    headline: "Sparked innovation in a risk-averse environment",
    quote:
      "Healthcare is naturally cautious, and our team struggled with brainstorming freely. The Inventor's Lab created a psychologically safe space where even the most reserved nurses and admins contributed bold ideas. The creativity exercises have become part of our quarterly offsites, and our innovation pipeline has tripled.",
    author: "James Okafor",
    role: "Chief Innovation Officer",
    metric: "Ideas Generated",
    metricValue: "3x",
    accent: "var(--exp-purple)",
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10 transition-all duration-300"
    >
      {/* Accent top bar */}
      <div
        className="h-1"
        style={{ backgroundColor: study.accent }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold text-sm dark:text-foreground/90"
              style={{ backgroundColor: study.accent }}
            >
              {study.company.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{study.company}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Building2 className="size-3" />
                {study.industry}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: study.rating }).map((_, i) => (
              <Star
                key={i}
                className="size-3.5 fill-amber text-amber"
              />
            ))}
          </div>
        </div>

        {/* Headline */}
        <p className="text-sm font-medium text-foreground mb-3">
          {study.headline}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
          <span>{study.participants} participants</span>
          <span className="text-border">|</span>
          <span>{study.experience}</span>
        </div>

        {/* Metric */}
        <div className="rounded-lg bg-muted/50 border border-border p-3 mb-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground font-medium">
            {study.metric}
          </span>
          <span
            className="text-2xl font-bold"
            style={{ color: study.accent }}
          >
            {study.metricValue}
          </span>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer py-1"
        >
          {expanded ? "Hide Testimonial" : "Read Full Testimonial"}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="size-4" />
          </motion.span>
        </button>

        {/* Expanded quote */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-border">
                {/* Speech mark */}
                <motion.div
                  initial={{ scale: 0.3, rotate: -12, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="mb-3"
                >
                  <Quote
                    className="size-8"
                    style={{ color: study.accent, opacity: 0.3 }}
                  />
                </motion.div>

                <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">
                  &ldquo;{study.quote}&rdquo;
                </p>

                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white dark:text-foreground/90 text-xs font-bold"
                    style={{ backgroundColor: study.accent }}
                  >
                    {study.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {study.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {study.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 md:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Trusted by Leading Teams
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real results from real companies. Hear how organizations across
            industries transformed their team dynamics through immersive experiences.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}