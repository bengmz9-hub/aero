"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Sparkles, PlaneTakeoff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const NAV_LINKS = [
  { label: "Cómo Llegar", href: "#transporte" },
  { label: "Seguridad", href: "#seguridad" },
  { label: "En el Aeropuerto", href: "#navegacion" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
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
            <PlaneTakeoff className="size-4.5" />
          </div>
          <span>
            <span className="text-primary">BCN</span>
            <span className="text-muted-foreground font-normal"> · El Prat</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-md hover:bg-muted/50"
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            className="ml-2 flex items-center justify-center size-9 rounded-full border border-border bg-card/80 hover:bg-muted/50 transition-all duration-200 hover:scale-105 cursor-pointer"
            aria-label="Cambiar tema"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {theme === "dark" ? (
                <Moon className="size-4 text-primary" />
              ) : theme === "light" ? (
                <Sun className="size-4 text-accent" />
              ) : (
                <Sparkles className="size-4 text-primary" />
              )}
            </motion.div>
          </button>

          <Button
            size="sm"
            className="ml-2 font-semibold"
            onClick={() => window.open("https://www.aena.es/es/aeropuerto-barcelona.html", "_blank")}
          >
            Ver vuelos en AENA
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center size-9 rounded-full border border-border bg-card/80 hover:bg-muted/50 transition-all cursor-pointer"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? <Moon className="size-4 text-primary" /> : theme === "light" ? <Sun className="size-4 text-accent" /> : <Sparkles className="size-4 text-primary" />}
          </button>
          <button
            className="p-2 rounded-md hover:bg-muted/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
                >
                  {link.label}
                </a>
              ))}
              <Button
                size="sm"
                className="mt-2 font-semibold"
                onClick={() => window.open("https://www.aena.es/es/aeropuerto-barcelona.html", "_blank")}
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
