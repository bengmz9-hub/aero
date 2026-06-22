"use client";

import { Separator } from "@/components/ui/separator";
import { Sparkles } from "lucide-react";

const FOOTER_LINKS = {
  Experiences: [
    { label: "All Scenarios", href: "#experiences" },
    { label: "Murder Mysteries", href: "#experiences" },
    { label: "Escape Rooms", href: "#experiences" },
    { label: "Custom Experiences", href: "#customization" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#cta" },
  ],
  Resources: [
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

export function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-foreground mb-3"
            >
              <Sparkles className="size-5 text-primary" />
              EnigmaWorks
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-4">
              Immersive murder-mystery and escape-room experiences designed to
              strengthen corporate teams through play.
            </p>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} EnigmaWorks. All rights reserved.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            Designed for teams that think outside the box — and the escape room.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}