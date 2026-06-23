"use client";

import { motion } from "framer-motion";
import { Plane, Heart, PlaneTakeoff } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
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

          <div>
            <h4 className="text-zinc-100 font-semibold mb-4">{t.footer.sections.services}</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.vip}</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.dutyFree}</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.fastTrack}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-zinc-100 font-semibold mb-4">{t.footer.sections.transport}</h4>
            <ul className="space-y-3">
              <li><a href="https://parking.aena.es/" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.parking}</a></li>
              <li><a href="https://aerobusbarcelona.es/" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.aerobus}</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.metro}</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.train}</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.taxi}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-zinc-100 font-semibold mb-4">{t.footer.sections.usefulLinks}</h4>
            <ul className="space-y-3">
              <li><a href="https://www.aena.es/es/infovuelos.html" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.liveFlights}</a></li>
              <li><a href="https://www.aena.es/es/pasajeros/equipajes-controles/objetos-perdidos.html" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.lostObjects}</a></li>
              <li><a href="#faq" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.faq}</a></li>
              <li><a href="https://www.aena.es/es/pasajeros/viajeros/personas-con-necesidades-especiales/servicio-asistencia-sin-barreras.html" className="text-sm text-zinc-400 hover:text-primary transition-colors">{t.footer.links.pmr}</a></li>
            </ul>
          </div>
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
