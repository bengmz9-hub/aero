"use client";

import { Separator } from "@/components/ui/separator";
import { PlaneTakeoff } from "lucide-react";

const FOOTER_LINKS = {
  "Llegar al Aeropuerto": [
    { label: "Aerobús", href: "#transporte" },
    { label: "Metro L9 Sud", href: "#transporte" },
    { label: "Taxi y VTC", href: "#transporte" },
    { label: "Tren RENFE R2", href: "#transporte" },
    { label: "Parking propio", href: "#transporte" },
  ],
  "Control de Seguridad": [
    { label: "Guía paso a paso", href: "#seguridad" },
    { label: "Regla de los líquidos", href: "#seguridad" },
    { label: "Electrónica permitida", href: "#seguridad" },
    { label: "Medicación y bebés", href: "#faq" },
  ],
  "En el Aeropuerto": [
    { label: "Terminal T1", href: "#navegacion" },
    { label: "Terminal T2", href: "#navegacion" },
    { label: "Zona Tierra", href: "#navegacion" },
    { label: "Zona Aire / Duty Free", href: "#navegacion" },
  ],
  "Links Útiles": [
    { label: "AENA — Vuelos en directo", href: "https://www.aena.es/es/infovuelos.html" },
    { label: "Objetos Perdidos", href: "https://www.aena.es/es/josep-tarradellas-barcelona-el-prat.html" },
    { label: "Preguntas Frecuentes", href: "#faq" },
    { label: "Asistencia PMR", href: "https://www.aena.es/es/pasajeros/viajeros/personas-con-necesidades-especiales/servicio-asistencia-sin-barreras.html" },
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-foreground mb-3"
            >
              <div className="flex items-center justify-center size-7 rounded-md bg-primary text-primary-foreground">
                <PlaneTakeoff className="size-4" />
              </div>
              <span>
                <span className="text-primary">BCN</span>
                <span className="text-muted-foreground font-normal"> · Guía</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-4">
              Guía para pasajeros del Aeropuerto de Barcelona El Prat. Información práctica,
              directa y sin complicaciones para volar sin estrés.
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>IATA: <strong className="text-foreground">BCN</strong> · ICAO: LEBL</p>
              <p>Terminal 1 · Terminal 2</p>
              <p>El Prat de Llobregat, Barcelona</p>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleClick(e, link.href)}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
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
            Información orientativa — consulta siempre{" "}
            <a
              href="https://www.aena.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              aena.es
            </a>{" "}
            para datos actualizados.
          </p>
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Guía BCN El Prat</span>
            <a
              href="https://www.aena.es/es/josep-tarradellas-barcelona-el-prat.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Web Oficial AENA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
