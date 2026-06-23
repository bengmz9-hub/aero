"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface TransportMode {
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

const TRANSPORTS: TransportMode[] = [
  {
    id: "aerobus",
    name: "Aerobús (A1 / A2)",
    duration: "30–40 min",
    price: "6,75 €",
    freq: "cada 5–10 min",
    terminal: "Terminales T1 y T2",
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
    terminal: "Terminales T1 y T2",
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
    terminal: "Terminales T1 y T2",
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
    terminal: "Terminales T1 y T2",
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
    terminal: "Solo Terminal T2",
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
    terminal: "Terminales T1 y T2",
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
  const [selectedTransport, setSelectedTransport] = useState<string>("aerobus");

  const activeTransport = TRANSPORTS.find((t) => t.id === selectedTransport) ?? TRANSPORTS[0];

  return (
    <section id="transporte" className="py-10 md:py-12 section-glow border-t border-white/5">
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
            Transporte y Conexiones
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4">
            Cómo llegar y salir <span className="runway-shimmer-text">de El Prat</span>
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Compara las opciones de transporte oficiales entre Barcelona y el aeropuerto.
            Selecciona una opción para ver detalles, tarifas y ventajas.
          </p>
        </motion.div>

        {/* Transport Mode Switcher */}
        <div className="flex overflow-x-auto gap-2.5 justify-start md:justify-center items-center pb-4 mb-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {TRANSPORTS.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTransport(t.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-300 cursor-pointer border shrink-0 ${
                selectedTransport === t.id
                  ? "bg-zinc-900/60 border-primary shadow-lg shadow-primary/5 text-zinc-100"
                  : "border-white/5 hover:border-white/15 text-zinc-300 hover:text-zinc-200"
              }`}
            >
              <div
                className="size-8 rounded-lg flex items-center justify-center shrink-0 transition-all"
                style={{
                  backgroundColor: selectedTransport === t.id ? `color-mix(in oklch, ${t.accent} 20%, transparent)` : "transparent",
                  color: selectedTransport === t.id ? t.accent : "var(--muted-foreground)",
                }}
              >
                {t.icon}
              </div>
              <span className="text-xs font-semibold leading-tight uppercase tracking-wider">
                {t.name.split("/")[0].split("(")[0].trim()}
              </span>
            </button>
          ))}
        </div>

        {/* Single Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTransport}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md overflow-hidden shadow-2xl"
          >
            <div className="p-6 md:p-8" style={{ borderLeft: `4px solid ${activeTransport.accent}` }}>
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Left: Info, Price, Duration, Tip */}
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className="size-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `color-mix(in oklch, ${activeTransport.accent} 15%, transparent)`,
                          color: activeTransport.accent
                        }}
                      >
                        {activeTransport.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: activeTransport.accent }}>
                          {activeTransport.terminal} · Frecuencia: {activeTransport.freq}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 leading-tight">{activeTransport.name}</h3>
                      </div>
                    </div>
                    
                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-4 p-5 rounded-xl bg-zinc-950/20 border border-white/5 mb-5">
                      <div>
                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Duración</span>
                        <span className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-1.5">
                          <Clock className="size-4.5 text-primary shrink-0" />
                          {activeTransport.duration}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Precio aproximado</span>
                        <span className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-1.5">
                          <Euro className="size-4.5 text-primary shrink-0" />
                          {activeTransport.price}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div
                    className="rounded-xl p-5 text-sm text-zinc-200 border leading-relaxed bg-zinc-950/20"
                    style={{
                      borderColor: `color-mix(in oklch, ${activeTransport.accent} 15%, transparent)`,
                    }}
                  >
                    <span className="font-bold text-zinc-100 text-sm block mb-1" style={{ color: activeTransport.accent }}>💡 Consejo Práctico:</span>
                    {activeTransport.tip}
                  </div>

                  {/* Category badges */}
                  <div className="flex flex-wrap gap-3 pt-5 mt-2 border-t border-white/5">
                    {activeTransport.tags.map((tag) => {
                      const f = FILTERS.find((fi) => fi.key === tag);
                      if (!f) return null;
                      const TagIcon = f.icon;
                      return (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide border bg-transparent text-zinc-400 border-white/5 shadow-none transition-colors hover:text-zinc-300"
                        >
                          <TagIcon className="size-3.5 shrink-0 opacity-50" />
                          {f.label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Pros and Cons */}
                <div className="flex flex-col gap-6">
                  {/* Pros Card */}
                  <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-5 md:p-6 flex flex-col gap-3.5">
                    <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                      Ventajas del servicio
                    </h4>
                    <ul className="space-y-3">
                      {activeTransport.pros.map((p) => (
                        <li key={p} className="text-sm text-zinc-200 flex items-start gap-2.5 leading-relaxed">
                          <span className="text-emerald-400 shrink-0 font-bold mt-0.5">✓</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons Card */}
                  <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-5 md:p-6 flex flex-col gap-3.5">
                    <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                      <XCircle className="size-4 text-red-400 shrink-0" />
                      Puntos en contra
                    </h4>
                    <ul className="space-y-3">
                      {activeTransport.cons.map((c) => (
                        <li key={c} className="text-sm text-zinc-300 flex items-start gap-2.5 leading-relaxed">
                          <span className="text-red-400/80 shrink-0 font-bold mt-0.5">✗</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
