"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Bus,
  Train,
  Car,
  Wifi,
  Clock,
  Euro,
  CheckCircle2,
  XCircle,
  MapPin,
} from "lucide-react";

type FilterTag = "economico" | "rapido" | "equipaje" | "nocturno";

interface Transport {
  id: string;
  name: string;
  emoji: string;
  duration: string;
  price: string;
  freq: string;
  terminal: string;
  tags: FilterTag[];
  accent: string;
  icon: React.ReactNode;
  pros: string[];
  cons: string[];
  tip: string;
}

const FILTERS: { key: FilterTag; label: string }[] = [
  { key: "economico", label: "💰 Económico" },
  { key: "rapido", label: "⚡ Rápido" },
  { key: "equipaje", label: "🧳 Fácil con equipaje" },
  { key: "nocturno", label: "🌙 Servicio nocturno" },
];

const TRANSPORTS: Transport[] = [
  {
    id: "aerobus",
    name: "Aerobús (A1 / A2)",
    emoji: "🚌",
    duration: "30–40 min",
    price: "6,75 €",
    freq: "cada 5–10 min",
    terminal: "T1 y T2",
    tags: ["economico", "equipaje", "nocturno"],
    accent: "var(--transport-aerobus)",
    icon: <Bus className="size-6" />,
    pros: [
      "Sale desde Plaça Catalunya (centro)",
      "Paradas intermedias (Urgell, Plaça Espanya)",
      "Amplio espacio para maletas",
      "Funciona 24h (servicio nocturno disponible)",
      "Ticket válido de ida y vuelta (60 días)",
    ],
    cons: [
      "Puede haber tráfico en hora punta",
      "Precio ligeramente mayor que el metro",
      "No tiene carril bus en todo el trayecto",
    ],
    tip: "Compra el billete online con antelación para evitar colas. El A1 va a T1 y el A2 a T2.",
  },
  {
    id: "metro-l9",
    name: "Metro L9 Sud",
    emoji: "🚇",
    duration: "40–50 min",
    price: "5,15 € (ticket especial aeropuerto)",
    freq: "cada 7 min",
    terminal: "T1 y T2",
    tags: ["economico", "nocturno"],
    accent: "var(--transport-metro)",
    icon: <Train className="size-6" />,
    pros: [
      "La opción más barata disponible",
      "Sin tráfico, horario muy regular",
      "Conecta con otras líneas de metro en el centro",
      "Funciona de 5:00 a medianoche aprox.",
    ],
    cons: [
      "Trayecto más largo (muchas paradas)",
      "Requiere transbordo en Zona Universitaria",
      "Las escaleras mecánicas son largas con mucho equipaje",
      "No muy cómodo con maletas grandes en hora punta",
    ],
    tip: "El billete de metro normal no vale — necesitas el ticket especial aeropuerto (L9). Valídalo al entrar Y al salir.",
  },
  {
    id: "taxi",
    name: "Taxi",
    emoji: "🚕",
    duration: "25–40 min",
    price: "35–50 € (tarifa oficial)",
    freq: "Inmediato",
    terminal: "T1 y T2",
    tags: ["rapido", "equipaje"],
    accent: "var(--transport-taxi)",
    icon: <Car className="size-6" />,
    pros: [
      "Puerta a puerta sin transbordos",
      "Cómodo con mucho equipaje o familias",
      "Sin límite de maletas",
      "Disponible las 24h en la parada oficial",
    ],
    cons: [
      "El más caro de las opciones",
      "Puede haber cola en llegadas internacionales",
      "Precio variable por tráfico (hay suplementos nocturnos y festivos)",
    ],
    tip: "Usa SIEMPRE los taxis oficiales de la parada señalizada. Tarifa única desde aeropuerto hasta Barcelona: ~39€ (regulada). Desconfía de los piratas.",
  },
  {
    id: "vtc",
    name: "Cabify / Uber",
    emoji: "🚗",
    duration: "25–45 min",
    price: "20–40 € (variable)",
    freq: "Bajo demanda",
    terminal: "T1 y T2",
    tags: ["rapido", "equipaje"],
    accent: "var(--transport-vtc)",
    icon: <Wifi className="size-6" />,
    pros: [
      "Precio conocido antes de pedir",
      "Puedes pedir desde el avión",
      "Sin efectivo necesario",
      "Sin espera en cola de taxis",
    ],
    cons: [
      "La zona de recogida está lejos de la terminal (hay que caminar)",
      "Precio puede subir en momentos de alta demanda",
      "Requieren zona específica de VTC (señalizada en el aeropuerto)",
    ],
    tip: "La zona de recogida de Uber/Cabify está claramente señalizada en el aeropuerto. Pide el coche cuando ya tengas el equipaje recogido.",
  },
  {
    id: "renfe-r2",
    name: "Tren RENFE R2 Nord",
    emoji: "🚆",
    duration: "30–35 min",
    price: "4,60 € (o T-Casual incluida)",
    freq: "cada 30 min aprox.",
    terminal: "Solo T2",
    tags: ["economico"],
    accent: "var(--transport-train)",
    icon: <Train className="size-6" />,
    pros: [
      "El más barato con tarjeta T-Casual/T-Usual",
      "Llega a Passeig de Gràcia y Sants",
      "Sin tráfico, puntual",
    ],
    cons: [
      "Solo desde Terminal 2 (T1 requiere bus lanzadera gratuito)",
      "Frecuencia de 30 minutos (no tan frecuente)",
      "No funciona 24h — consultar horarios",
      "Con mucho equipaje puede ser incómodo",
    ],
    tip: "Si vuelas desde T1, hay un bus lanzadera gratuito entre T1 y T2 cada 5-10 min. El tren es la opción más barata si ya tienes tarjeta integrada.",
  },
  {
    id: "coche",
    name: "Coche Propio / Aparcamiento",
    emoji: "🅿️",
    duration: "Variable",
    price: "Desde 5 €/h · Long stay desde 14 €/día",
    freq: "—",
    terminal: "T1 y T2",
    tags: ["equipaje", "rapido"],
    accent: "var(--transport-car)",
    icon: <MapPin className="size-6" />,
    pros: [
      "Máxima flexibilidad horaria",
      "Ideal para viajes con mucho equipaje",
      "Parking corta duración (P1/P2) cerca de la terminal",
      "Opciones de parking exterior más económicas",
    ],
    cons: [
      "El más caro en estancias largas",
      "Posibles atascos en accesos al aeropuerto",
      "Parking corta duración lleno en temporada alta",
    ],
    tip: "Reserva parking online en la web de AENA para asegurar plaza y obtener descuento. El 'Long Stay' (P3/P4) tiene lanzadera gratuita a la terminal.",
  },
];

export function Transport() {
  const [activeFilter, setActiveFilter] = useState<FilterTag | null>(null);

  const sorted = useMemo(() => {
    if (!activeFilter) return TRANSPORTS;
    return [...TRANSPORTS].sort((a, b) => {
      const aM = a.tags.includes(activeFilter) ? 0 : 1;
      const bM = b.tags.includes(activeFilter) ? 0 : 1;
      return aM - bM;
    });
  }, [activeFilter]);

  return (
    <section id="transporte" className="py-20 md:py-28 section-glow">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4 border border-primary/20">
            🚇 Transporte
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Cómo llegar (y salir) del aeropuerto
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Compara todas las opciones de transporte entre Barcelona y El Prat.
            Filtra según lo que más te importa.
          </p>
        </motion.div>

        {/* Filter tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(activeFilter === f.key ? null : f.key)}
              className={`filter-tag-glow inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                activeFilter === f.key
                  ? "active"
                  : "border-border bg-background text-foreground hover:border-primary/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <LayoutGroup>
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {sorted.map((t) => {
                const isMatch = activeFilter ? t.tags.includes(activeFilter) : true;
                return (
                  <motion.article
                    layout
                    key={t.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: isMatch ? 1 : 0.35,
                      scale: 1,
                      transition: { duration: 0.35, ease: "easeInOut" },
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative rounded-xl border border-border bg-card hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 hover:border-primary/30 dark:hover:border-primary/20 transition-all duration-300 overflow-hidden"
                  >
                    {/* Accent top bar */}
                    <div className="h-1" style={{ backgroundColor: t.accent }} />

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="flex items-center justify-center size-12 rounded-xl text-2xl"
                          style={{ backgroundColor: `color-mix(in oklch, ${t.accent} 12%, transparent)` }}
                        >
                          {t.emoji}
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                            <Clock className="size-3" />
                            {t.duration}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5 flex items-center justify-end gap-1">
                            <Euro className="size-3" />
                            {t.price}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {t.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        <span>Frecuencia: {t.freq}</span>
                        <span className="text-border">·</span>
                        <span style={{ color: t.accent }}>{t.terminal}</span>
                      </div>

                      {/* Pros */}
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                          <CheckCircle2 className="size-3.5 text-chart-5" />
                          Ventajas
                        </p>
                        <ul className="space-y-1">
                          {t.pros.slice(0, 3).map((p) => (
                            <li key={p} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-chart-5 mt-0.5 shrink-0">✓</span>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Cons */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                          <XCircle className="size-3.5 text-destructive" />
                          Inconvenientes
                        </p>
                        <ul className="space-y-1">
                          {t.cons.slice(0, 2).map((c) => (
                            <li key={c} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <span className="text-destructive mt-0.5 shrink-0">✗</span>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tip */}
                      <div
                        className="rounded-lg p-3 text-xs text-muted-foreground italic border"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${t.accent} 6%, transparent)`,
                          borderColor: `color-mix(in oklch, ${t.accent} 20%, transparent)`,
                        }}
                      >
                        <span className="font-semibold not-italic" style={{ color: t.accent }}>💡 Consejo: </span>
                        {t.tip}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {t.tags.map((tag) => {
                          const f = FILTERS.find((fi) => fi.key === tag);
                          return (
                            <Badge key={tag} variant={activeFilter === tag ? "default" : "secondary"} className="text-xs">
                              {f?.label}
                            </Badge>
                          );
                        })}
                      </div>
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
