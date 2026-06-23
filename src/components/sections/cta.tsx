"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  PlaneTakeoff,
  Globe,
  Luggage,
  Accessibility,
  Bus,
  Phone,
  Clock,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface LinkCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  url: string;
  accent: string;
  badge?: string;
}

const LINK_CARDS: LinkCard[] = [
  {
    id: "aena-vuelos",
    icon: <PlaneTakeoff className="size-5" />,
    title: "Estado de Vuelos en Tiempo Real",
    description: "Consulta salidas, llegadas, retrasos y cancelaciones de tu vuelo en la web oficial de AENA.",
    url: "https://www.aena.es/es/infovuelos.html",
    accent: "var(--transport-aerobus)",
    badge: "Tiempo real",
  },
  {
    id: "aena-web",
    icon: <Globe className="size-5" />,
    title: "Web Oficial del Aeropuerto",
    description: "Planos, servicios, información de terminales, parking y todo sobre el Aeropuerto El Prat de Barcelona.",
    url: "https://www.aena.es/es/josep-tarradellas-barcelona-el-prat.html",
    accent: "var(--zone-aire)",
  },
  {
    id: "lost-found",
    icon: <Luggage className="size-5" />,
    title: "Objetos Perdidos (Lost & Found)",
    description: "¿Has perdido algo en el aeropuerto o tu maleta no llegó? Reclama aquí en la web de AENA.",
    url: "https://www.aena.es/es/josep-tarradellas-barcelona-el-prat.html",
    accent: "var(--transport-taxi)",
  },
  {
    id: "pmr",
    icon: <Accessibility className="size-5" />,
    title: "Asistencia para Personas con Movilidad Reducida",
    description: "Información y formulario para solicitar asistencia PMR en el aeropuerto de Barcelona.",
    url: "https://www.aena.es/es/josep-tarradellas-barcelona-el-prat.html",
    accent: "var(--step-green)",
  },
  {
    id: "aerobus",
    icon: <Bus className="size-5" />,
    title: "Aerobús — Compra de Billetes",
    description: "Compra con antelación el billete del Aerobús Barcelona–El Prat y obtén descuento.",
    url: "https://www.aerobusbcn.com/es/",
    accent: "var(--transport-metro)",
    badge: "Descuento online",
  },
  {
    id: "aena-parking",
    icon: <Globe className="size-5" />,
    title: "Reserva de Parking AENA",
    description: "Reserva tu plaza de aparcamiento online y ahorra hasta un 30% frente al precio en taquilla.",
    url: "https://parking.aena.es/",
    accent: "var(--transport-car)",
    badge: "Ahorra 30%",
  },
];

const QUICK_INFO = [
  {
    icon: <Clock className="size-4" />,
    label: "Horario del Aeropuerto",
    value: "Abierto 24 horas, 365 días al año",
  },
  {
    icon: <Phone className="size-4" />,
    label: "Teléfono AENA (BCN)",
    value: "+34 913 211 000",
  },
  {
    icon: <AlertCircle className="size-4" />,
    label: "Tiempo mínimo antes de salida",
    value: "90 min Schengen · 2h Internacional",
  },
  {
    icon: <ShieldCheck className="size-4" />,
    label: "Código IATA",
    value: "BCN · Código ICAO: LEBL",
  },
];

export function UsefulLinks() {
  return (
    <section id="links" className="py-10 md:py-12 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-md text-primary text-[10px] font-bold tracking-widest uppercase mb-4 border border-white/10">
            <Globe className="size-3.5" />
            Enlaces
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4">
            Todo lo que necesitas, <span className="runway-shimmer-text">a un clic</span>
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Enlaces oficiales y herramientas de consulta rápida para programar tu viaje con seguridad.
          </p>
        </motion.div>

        {/* Quick info strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {QUICK_INFO.map((info, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card"
            >
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {info.icon}
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">{info.label}</p>
                <p className="text-sm font-semibold text-foreground">{info.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Link cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LINK_CARDS.map((card, i) => (
            <motion.a
              key={card.id}
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-xl border border-border bg-card overflow-hidden hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 hover:border-primary/30 dark:hover:border-primary/20 transition-all duration-300 cursor-pointer block"
            >
              {/* Accent top bar */}
              <div className="h-1" style={{ backgroundColor: card.accent }} />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="size-11 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${card.accent} 14%, transparent)`,
                      color: card.accent,
                    }}
                  >
                    {card.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    {card.badge && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${card.accent} 15%, transparent)`,
                          color: card.accent,
                        }}
                      >
                        {card.badge}
                      </span>
                    )}
                    <ExternalLink
                      className="size-4 text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </div>
                </div>

                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 p-5 rounded-xl border border-border bg-muted/20 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">⚠️ Información orientativa.</span>{" "}
            Las normas de seguridad, horarios y precios pueden cambiar. Siempre consulta{" "}
            <a
              href="https://www.aena.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:no-underline"
            >
              la web oficial de AENA
            </a>{" "}
            y la web de tu aerolínea para información actualizada antes de volar.
          </p>
        </motion.div>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 relative rounded-2xl border border-border bg-card overflow-hidden shadow-xl p-8 md:p-12 text-center"
        >
          <div className="absolute inset-0 -z-0">
            <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-primary/5 dark:bg-primary/[0.04] blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-accent/5 dark:bg-accent/[0.03] blur-3xl" />
          </div>
          <div className="relative z-10">
            <div className="text-4xl mb-4">✈️</div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              ¡Buen viaje desde Barcelona!
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Con esta guía estás listo para llegar al aeropuerto, pasar el control sin estrés
              y disfrutar de tu vuelo. Comparte esta guía con alguien que la necesite.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                size="lg"
                className="font-semibold"
                onClick={() => window.open("https://www.aena.es/es/infovuelos.html", "_blank")}
              >
                <PlaneTakeoff className="size-4 mr-2" />
                Ver mi vuelo en AENA
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-semibold"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Volver al inicio
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
