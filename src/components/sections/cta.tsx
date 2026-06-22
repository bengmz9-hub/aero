"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = name.trim() && email.trim() && company.trim() && teamSize;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setCompany("");
    setTeamSize("");
    setMessage("");
  };

  return (
    <section id="cta" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-border dark:border-border/50 bg-card overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-primary/5"
        >
          {/* Background accent */}
          <div className="absolute inset-0 -z-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 dark:bg-primary/[0.03] blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-accent/5 dark:bg-accent/[0.03] blur-3xl" />
          </div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-5">
                  <Sparkles className="size-3.5" />
                  Get Started
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                  Ready to Transform Your Next Team Event?
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Tell us about your team and we&apos;ll craft a tailored
                  proposal within 24 hours. No commitment, no pressure — just a
                  conversation about what&apos;s possible.
                </p>
                <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                  {[
                    "Free consultation with an event strategist",
                    "Custom scenario proposal within 24 hours",
                    "Flexible scheduling and group sizes",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Form / Confirmation */}
              <div className="relative min-h-[380px]">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cta-name">Full Name</Label>
                          <Input
                            id="cta-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jane Smith"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cta-email">Work Email</Label>
                          <Input
                            id="cta-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jane@company.com"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cta-company">Company</Label>
                          <Input
                            id="cta-company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Acme Corp"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Team Size</Label>
                          <Select value={teamSize} onValueChange={setTeamSize}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10-24">10–24 people</SelectItem>
                              <SelectItem value="25-49">25–49 people</SelectItem>
                              <SelectItem value="50-99">50–99 people</SelectItem>
                              <SelectItem value="100+">100+ people</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cta-message">
                          Anything else?{" "}
                          <span className="text-muted-foreground font-normal">
                            (optional)
                          </span>
                        </Label>
                        <Textarea
                          id="cta-message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your goals, preferred dates, or any special requirements..."
                          rows={3}
                          className="resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={!canSubmit}
                        className="w-full font-semibold text-base"
                      >
                        <Send className="size-4 mr-2" />
                        Request a Quote
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="confirmation"
                      initial={{ opacity: 0, x: 80, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: 0.15,
                        }}
                        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
                      >
                        <CheckCircle2 className="size-10 text-primary" />
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-foreground mb-2"
                      >
                        Quote Request Received!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-muted-foreground mb-8 max-w-sm"
                      >
                        Thanks, {name.split(" ")[0]}! Our event strategist will
                        reach out to <strong className="text-foreground">{email}</strong>{" "}
                        within 24 hours with a custom proposal for {company}.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-3"
                      >
                        <Button
                          variant="outline"
                          onClick={handleReset}
                          className="font-semibold"
                        >
                          Submit Another Request
                        </Button>
                        <Button
                          className="font-semibold"
                          onClick={() => {
                            document
                              .querySelector("#experiences")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Browse Experiences
                          <ArrowRight className="size-4 ml-1.5" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}