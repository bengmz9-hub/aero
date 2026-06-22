"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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
  Moon,
  Zap,
  Briefcase
} from "lucide-react";

type FilterTag = "economico" | "rapido" | "equipaje" | "nocturno";

interface Transport {
  id: string;
  name: string;
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

const FILTERS = [
  { key: "economico" as const, label: "Económico", icon: Euro },
  { key: "rapido" as const, label: "Rápido", icon: Zap },
  { key: "equipaje" as const, label: "Fácil con Equipaje", icon: Briefcase },
  { key: "nocturno" as const, label: "Servicio Nocturno", icon: Moon },
];

const TRANSPORTS: Transport[] = [
  {
    id: "aerobus",
    name: "Aerobús (A1 / A2)",
    duration: "30–40 min",
    price: "6,75 €",
    freq: "cada 5–10 min",
    terminal: "T1 y T2",
    tags: ["economico", "equipaje", "nocturno"],
    accent: "var(--transport-aerobus)",
    icon: <Bus className="size-6" />,
    pros: [
      "Sale desde Plaza Cataluña (centro neurálgico)",
      "Paradas intermedias (Sepúlveda, Plaza España)",
      "Amplio espacio para maletas y equipaje de mano",
      "Funciona 24 horas al día, los 365 días del año",
      "Ticket de ida y vuelta válido por 90 días",
    ],
    cons: [
      "Sujeto a las condiciones de tráfico en hora punta",
      "Precio ligeramente superior al transporte subterráneo",
      "No cuenta con carril bus exclusivo en la autovía",
    ],
    tip: "Adquiere el billete online para ahorrar colas. El autobús A1 conecta con la T1 y el A2 con la T2.",
  },
  {
    id: "metro-l9",
    name: "Metro L9 Sud",
    duration: "40–50 min",
    price: "5,15 € (billete aeropuerto)",
    freq: "cada 7 min",
    terminal: "T1 y T2",
    tags: ["economico", "nocturno"],
    accent: "var(--transport-metro)",
    icon: <Train className="size-6" />,
    pros: [
      "La alternativa más económica",
      "Puntualidad absoluta, libre de atascos de tráfico",
      "Conexión con las líneas L1, L3 y L5 hacia el centro",
      "Horarios extendidos los fines de semana",
    ],
    cons: [
      "Trayecto largo por el elevado número de paradas intermedias",
      "Requiere hacer transbordo para llegar al centro de Barcelona",
      "Escaleras mecánicas incómodas si viajas con equipaje voluminoso",
    ],
    tip: "El billete sencillo de metro no es válido. Necesitas el billete especial de Aeropuerto (L9 Sud). Valídalo tanto al entrar como al salir.",
  },
  {
    id: "taxi",
    name: "Servicio de Taxi Oficial",
    duration: "25–40 min",
    price: "35–50 € (tarifa oficial)",
    freq: "Inmediato",
    terminal: "T1 y T2",
    tags: ["rapido", "equipaje"],
    accent: "var(--transport-taxi)",
    icon: <Car className="size-6" />,
    pros: [
      "Servicio puerta a puerta de máxima comodidad",
      "Ideal para grupos, familias o equipaje pesado",
      "Sin límite estricto de capacidad de bultos",
      "Disponible las 24 horas del día sin reserva previa",
    ],
    cons: [
      "El coste es superior al del transporte colectivo",
      "Posibles tiempos de espera en las horas de llegada masiva",
      "Tarifa sujeta al estado del tráfico y suplementos",
    ],
    tip: "Utiliza únicamente los taxis amarillos y negros de las paradas oficiales señalizadas. Desconfía de ofertas fuera de estas zonas.",
  },
  {
    id: "vtc",
    name: "Cabify / Uber",
    duration: "25–45 min",
    price: "20–40 € (tarifa dinámica)",
    freq: "Bajo demanda",
    terminal: "T1 y T2",
    tags: ["rapido", "equipaje"],
    accent: "var(--transport-vtc)",
    icon: <Wifi className="size-6" />,
    pros: [
      "Precio final fijado y garantizado antes del trayecto",
      "Posibilidad de solicitarlo cómodamente desde la terminal",
      "Pago digital automatizado mediante aplicación móvil",
      "Seguimiento en tiempo real del vehículo asignado",
    ],
    cons: [
      "El punto de recogida se encuentra en el parking (requiere caminar)",
      "El precio se incrementa significativamente con alta demanda",
      "Requiere de conexión a internet activa para su solicitud",
    ],
    tip: "Solicita el servicio una vez tengas tu equipaje en mano, ya que los conductores tienen tiempos limitados de espera en las plazas reservadas.",
  },
  {
    id: "renfe-r2",
    name: "Tren RENFE R2 Nord",
    duration: "30–35 min",
    price: "4,60 € (o T-Casual)",
    freq: "cada 30 min",
    terminal: "Solo T2",
    tags: ["economico"],
    accent: "var(--transport-train)",
    icon: <Train className="size-6" />,
    pros: [
      "La opción más económica si utilizas una tarjeta integrada de transporte",
      "Conexión directa con estaciones clave como Sants y Passeig de Gràcia",
      "Trayecto rápido e independiente de la densidad de tráfico",
    ],
    cons: [
      "Sale exclusivamente de la Terminal T2 (desde la T1 requiere autobús gratuito)",
      "La frecuencia de paso es de 30 minutos, la menor del aeropuerto",
      "No ofrece servicio durante la franja nocturna",
    ],
    tip: "Si tu vuelo sale de la T1, puedes usar el autobús lanzadera gratuito que conecta ambas terminales en unos 10-15 minutos.",
  },
  {
    id: "coche",
    name: "Parking Oficial AENA",
    duration: "Variable",
    price: "Desde 5 €/h · Larga estancia desde 14 €/día",
    freq: "—",
    terminal: "T1 y T2",
    tags: ["equipaje", "rapido"],
    accent: "var(--transport-car)",
    icon: <Car className="size-6" />,
    pros: [
      "Máxima flexibilidad horaria sin depender de terceros",
      "Ideal para traslados con equipajes de gran tamaño o especiales",
      "Plazas cubiertas de corta estancia conectadas directamente a la terminal",
    ],
    cons: [
      "La opción de coste más elevado para periodos prolongados de viaje",
      "Requiere anticipación para el trayecto por carretera",
    ],
    tip: "Reserva tu plaza con antelación en la web oficial de AENA para obtener importantes descuentos en tarifas de larga estancia.",
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
    <section id="transporte" className="py-16 md:py-20 section-glow border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-md text-primary text-[10px] font-bold tracking-widest uppercase mb-4 border border-white/10">
            <Bus className="size-3.5" />
            Conexiones
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Cómo llegar y salir <span className="runway-shimmer-text">de El Prat</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Compara las opciones de transporte oficiales entre Barcelona y el aeropuerto.
            Filtra según tus preferencias para encontrar tu trayecto ideal.
          </p>
        </motion.div>

        {/* Filter tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {FILTERS.map((f) => {
            const Icon = f.icon;
            const isActive = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(isActive ? null : f.key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                    : "border-white/10 bg-zinc-900/60 text-white/70 hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className="size-3.5 shrink-0" />
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <LayoutGroup>
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    className="group relative rounded-xl border border-white/10 bg-zinc-900/40 backdrop-blur-md hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col justify-between"
                  >
                    {/* Accent top bar */}
                    <div className="h-1" style={{ backgroundColor: t.accent }} />

                    <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                      {/* Header */}
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className="flex items-center justify-center size-12 rounded-xl text-primary"
                            style={{
                              backgroundColor: `color-mix(in oklch, ${t.accent} 12%, transparent)`,
                              color: t.accent,
                            }}
                          >
                            {t.icon}
                          </div>
                          <div className="text-right flex flex-col gap-1">
                            <div className="text-xs text-white/60 flex items-center justify-end gap-1.5 font-medium">
                              <Clock className="size-3.5 text-primary" />
                              {t.duration}
                            </div>
                            <div className="text-xs text-white/60 flex items-center justify-end gap-1.5 font-semibold">
                              <Euro className="size-3.5 text-primary" />
                              {t.price}
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                          {t.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
                          <span>Frecuencia: {t.freq}</span>
                          <span className="text-white/10">·</span>
                          <span style={{ color: t.accent }} className="font-medium">{t.terminal}</span>
                        </div>
                      </div>

                      {/* Pros & Cons */}
                      <div className="flex flex-col gap-5">
                        {/* Pros */}
                        <div>
                          <p className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                            <CheckCircle2 className="size-3.5 text-emerald-400" />
                            Ventajas
                          </p>
                          <ul className="space-y-2">
                            {t.pros.slice(0, 3).map((p) => (
                              <li key={p} className="text-xs text-white/60 flex items-start gap-2 leading-relaxed">
                                <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Cons */}
                        <div>
                          <p className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                            <XCircle className="size-3.5 text-red-400" />
                            Inconvenientes
                          </p>
                          <ul className="space-y-2">
                            {t.cons.slice(0, 2).map((c) => (
                              <li key={c} className="text-xs text-white/50 flex items-start gap-2 leading-relaxed">
                                <span className="text-red-400/80 shrink-0 mt-0.5">✗</span>
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Tip */}
                      <div
                        className="rounded-lg p-3.5 text-xs text-white/60 border mt-2 leading-relaxed"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${t.accent} 6%, transparent)`,
                          borderColor: `color-mix(in oklch, ${t.accent} 15%, transparent)`,
                        }}
                      >
                        <span className="font-bold text-white block mb-1" style={{ color: t.accent }}>💡 Consejo Práctico:</span>
                        {t.tip}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                        {t.tags.map((tag) => {
                          const f = FILTERS.find((fi) => fi.key === tag);
                          if (!f) return null;
                          const TagIcon = f.icon;
                          return (
                            <span
                              key={tag}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-bold tracking-wider uppercase border ${
                                activeFilter === tag
                                  ? "bg-primary/20 text-primary border-primary/30"
                                  : "bg-white/5 text-white/40 border-white/5"
                              }`}
                            >
                              <TagIcon className="size-3" />
                              {f.label}
                            </span>
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
