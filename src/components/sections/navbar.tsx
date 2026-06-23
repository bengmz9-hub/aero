"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Plane, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_30px_rgba(0,0,0,0.10)] dark:shadow-[0_1px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-5 py-3 md:px-8">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground"
        >
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
            <Plane className="size-4.5" />
          </div>
          <span>
            <span className="text-primary">BCN</span>
            <span className="text-muted-foreground font-normal"> · El Prat</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {t.navbar.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-2 bg-muted/50 px-3 py-1.5 rounded-full border border-border"
          >
            <Globe className="size-4" />
            {language === 'es' ? 'EN' : 'ES'}
          </button>
        </div>

        {/* Mobile Menu Button & Lang Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={toggleLanguage}
            className="flex items-center justify-center text-muted-foreground hover:text-foreground bg-muted/50 p-2 rounded-full border border-border"
          >
            <span className="text-xs font-bold">{language === 'es' ? 'EN' : 'ES'}</span>
          </button>
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="flex flex-col gap-6 p-8">
              {t.navbar.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-semibold text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                className="mt-2 font-semibold"
                onClick={() => window.open("https://www.aena.es/es/josep-tarradellas-barcelona-el-prat.html", "_blank")}
              >
                Ver vuelos en AENA
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
