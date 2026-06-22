"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Shield, Info, Plane, Search, Clock, Sparkles } from "lucide-react";

const MOCK_FLIGHTS = [
  { id: 1, flight: "VY 1002", destination: "Londres-Gatwick", time: "18:45", status: "Embarcando", type: "departure", gate: "B24" },
  { id: 2, flight: "IB 1234", destination: "Madrid-Barajas", time: "19:15", status: "En hora", type: "departure", gate: "A12" },
  { id: 3, flight: "FR 6342", destination: "Roma-Fiumicino", time: "19:40", status: "Retrasado", type: "departure", gate: "C10" },
  { id: 4, flight: "LH 1815", destination: "Múnich", time: "20:05", status: "Programado", type: "departure", gate: "B31" },
  { id: 5, flight: "VY 2004", destination: "París-Orly", time: "20:20", status: "Programado", type: "departure", gate: "A08" },
  { id: 6, flight: "AF 1123", destination: "París-CDG", time: "19:00", status: "Llegado", type: "arrival", gate: "T1 - Sala A" },
  { id: 7, flight: "AZ 7890", destination: "Milán-Linate", time: "19:30", status: "En hora", type: "arrival", gate: "T1 - Sala B" },
  { id: 8, flight: "UX 4002", destination: "Palma de Mallorca", time: "20:10", status: "En hora", type: "arrival", gate: "T2 - Sala C" },
];

const SECURITY_QUEUES = [
  { terminal: "Terminal T1", name: "Filtros T1", time: "4 min", status: "fluid", description: "Tránsito rápido" },
  { terminal: "Terminal T1 Express", name: "Fast Track T1", time: "1 min", status: "fluid", description: "Preferente" },
  { terminal: "Terminal T2", name: "Filtros T2B", time: "3 min", status: "fluid", description: "Sin esperas" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<"vuelos" | "seguridad">("vuelos");
  const [flightType, setFlightType] = useState<"salidas" | "llegadas">("salidas");
  const [searchQuery, setSearchQuery] = useState("");

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -5, y: x * 5 });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const filteredFlights = MOCK_FLIGHTS.filter((f) => {
    const matchType = f.type === (flightType === "salidas" ? "departure" : "arrival");
    const matchSearch =
      f.flight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      onMouseLeave={handleMouseLeave}
    >
      {/* Sky gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.02_260)] via-[oklch(0.14_0.05_255)] to-[oklch(0.10_0.015_255)] dark:from-[oklch(0.06_0.02_260)] dark:via-[oklch(0.10_0.04_255)] dark:to-[oklch(0.08_0.015_255)]" />
        {/* Aurora blobs */}
        <div
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-[0.08] blur-3xl"
          style={{ background: "oklch(0.68 0.20 220)", transform: `translate(${tilt.y * 25}px, ${tilt.x * 25}px)`, transition: "transform 0.4s ease-out" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: "oklch(0.78 0.18 58)", transform: `translate(${tilt.y * -15}px, ${tilt.x * -15}px)`, transition: "transform 0.4s ease-out" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full opacity-[0.04] blur-3xl"
          style={{ background: "oklch(0.68 0.18 185)", transform: `translate(${tilt.y * 10}px, ${tilt.x * 10}px)`, transition: "transform 0.4s ease-out" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 md:py-24">
        {/* Left: Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-xs font-semibold tracking-wide uppercase w-fit border border-primary/20">
            <MapPin className="size-3.5" />
            Aeropuerto de Barcelona · IATA: BCN
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-white">
            Tu vuelo,{" "}
            <span className="runway-shimmer-text">sin estrés</span>
            <span className="text-white">.</span>
          </h1>

          <p className="text-lg text-white/60 leading-relaxed max-w-xl">
            Todo lo que necesitas saber antes de llegar al Aeropuerto El Prat:
            transporte, control de seguridad, equipaje de mano y cómo moverte
            por dentro sin complicaciones.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Button
              size="lg"
              className="font-semibold text-base px-7"
              onClick={() => document.querySelector("#transporte")?.scrollIntoView({ behavior: "smooth" })}
            >
              Cómo llegar
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-semibold text-base px-7 border-white/20 text-white hover:bg-white/10 hover:text-white"
              onClick={() => document.querySelector("#seguridad")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Shield className="size-4 mr-1.5" />
              Guía de seguridad
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 mt-4 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <Info className="size-4 text-primary" />
              <span><strong className="text-white/80">2 Terminales</strong> — T1 y T2</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="size-4 text-primary" />
              <span><strong className="text-white/80">50M+</strong> pasajeros/año</span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="size-4 text-primary" />
              <span><strong className="text-white/80">Abierto</strong> 24h/365 días</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Airport Live Dashboard Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative block w-full lg:max-w-[480px] justify-self-center"
        >
          {/* Main Card with tilt effect */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl flex flex-col min-h-[500px]"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transition: "transform 0.2s ease-out" }}
          >
            {/* Header Image */}
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src="/AERO/bcn-airport.png"
                alt="Aeropuerto El Prat"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-[10px] font-bold text-primary tracking-widest uppercase flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                Panel en vivo
              </div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-bold text-white leading-tight">Barcelona-El Prat</h3>
                <p className="text-xs text-white/70 font-medium">Terminal T1 & T2 · IATA: BCN</p>
              </div>
            </div>

            {/* Tabs Selector */}
            <div className="flex border-b border-white/10 bg-zinc-950/40">
              <button
                onClick={() => setActiveTab("vuelos")}
                className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === "vuelos"
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Plane className="size-4 shrink-0" />
                Vuelos en Vivo
              </button>
              <button
                onClick={() => setActiveTab("seguridad")}
                className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                  activeTab === "seguridad"
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Shield className="size-4 shrink-0" />
                Filtros Seguridad
              </button>
            </div>

            {/* Card Content Area */}
            <div className="p-5 flex-1 flex flex-col justify-between bg-zinc-950/20">
              {activeTab === "vuelos" ? (
                <div className="flex-1 flex flex-col gap-4">
                  {/* Search and flight type toggle */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
                      <input
                        type="text"
                        placeholder="Buscar vuelo o destino..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-zinc-900/60 border border-white/10 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    {/* Type Toggle */}
                    <div className="flex rounded-lg bg-zinc-900 border border-white/10 p-0.5 self-start sm:self-auto">
                      <button
                        onClick={() => setFlightType("salidas")}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                          flightType === "salidas"
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        Salidas
                      </button>
                      <button
                        onClick={() => setFlightType("llegadas")}
                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                          flightType === "llegadas"
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        Llegadas
                      </button>
                    </div>
                  </div>

                  {/* Flight list */}
                  <div className="overflow-y-auto max-h-[220px] flex flex-col gap-2 pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {filteredFlights.length > 0 ? (
                      filteredFlights.map((f) => (
                        <div
                          key={f.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/40 border border-white/5 hover:border-white/15 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-md ${
                              f.type === "departure" ? "bg-blue-500/10 text-blue-400" : "bg-teal-500/10 text-teal-400"
                            }`}>
                              <Plane className={`size-3.5 ${f.type === "departure" ? "rotate-45" : "rotate-135"}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-white">{f.flight}</span>
                                <span className="text-[10px] text-white/40 font-mono bg-white/5 px-1.5 py-0.5 rounded">
                                  {f.gate}
                                </span>
                              </div>
                              <span className="text-xs text-white/50">{f.destination}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="block font-mono text-sm text-white">{f.time}</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-1 ${
                              f.status === "Embarcando" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                              f.status === "En hora" ? "bg-green-500/10 text-green-400 border border-green-500/20" :
                              f.status === "Retrasado" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                              f.status === "Llegado" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                              "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                            }`}>
                              {f.status}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-sm text-white/40">
                        No se encontraron vuelos
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col gap-4">
                  {/* Wait times */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                      Tiempos de espera estimados
                    </span>
                    {SECURITY_QUEUES.map((q, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/40 border border-white/5"
                      >
                        <div className="flex items-center gap-2.5">
                          <Clock className="size-4 text-primary shrink-0" />
                          <div>
                            <span className="block font-semibold text-sm text-white leading-none mb-1">
                              {q.name}
                            </span>
                            <span className="text-xs text-white/45">{q.description}</span>
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <div className="w-16 bg-zinc-800 h-1.5 rounded-full overflow-hidden hidden sm:block">
                            <div
                              className="bg-primary h-full rounded-full"
                              style={{ width: q.time.includes("1 min") ? "20%" : "60%" }}
                            />
                          </div>
                          <span className="font-mono text-base font-bold text-primary">
                            {q.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Security Alert Tips */}
                  <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs text-white/80 leading-relaxed flex items-start gap-2.5">
                    <Info className="size-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-primary mb-1">¿Cómo pasar rápido el filtro?</span>
                      Lleva los líquidos en una bolsa transparente independiente y saca ordenadores, tablets y cargadores de tu equipaje de mano antes del escaneo.
                    </div>
                  </div>
                </div>
              )}

              {/* Status info bar */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Actualizado en tiempo real
                </span>
                <span className="hover:text-primary transition-colors cursor-pointer" onClick={() => document.querySelector("#seguridad")?.scrollIntoView({ behavior: "smooth" })}>
                  Ver guía de líquidos &rarr;
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 text-xs"
      >
        <span>Desplázate para explorar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
