"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, PlaneTakeoff, ShoppingBag, Utensils, Car, Luggage, Accessibility, Baby, Wifi, CircleDollarSign, PlaneLanding, Shield, Sparkles } from "lucide-react";

type Terminal = "T1" | "T2";
type Zone = "llegadas" | "salidas-tierra" | "seguridad" | "zona-aire" | "gates";

interface ZoneInfo {
  id: Zone;
  label: string;
  icon: React.ComponentType<any>;
  accent: string;
  description: string;
  services: { icon: React.ReactNode; name: string; detail: string }[];
  tip: string;
}

const ZONES_T1: ZoneInfo[] = [
  {
    id: "llegadas",
    label: "Llegadas (Planta Baja)",
    icon: PlaneLanding,
    accent: "var(--zone-tierra)",
    description: "La zona de llegadas de T1 es donde sales si vienes de un vuelo. Aquí recoges tu equipaje y encuentras todos los servicios de bienvenida.",
    services: [
      { icon: <Luggage className="size-4" />, name: "Cintas de Equipaje", detail: "Identificadas por número de vuelo. Pantallas informativas por toda la zona." },
      { icon: <Car className="size-4" />, name: "Alquiler de Coches", detail: "Todas las grandes compañías (Hertz, Avis, Europcar, Sixt) en el propio módulo." },
      { icon: <CircleDollarSign className="size-4" />, name: "Cambio de Divisas / ATM", detail: "Cajeros y casas de cambio disponibles en la planta de llegadas." },
      { icon: <Baby className="size-4" />, name: "Sala de Lactancia", detail: "Disponible en la zona de llegadas. Señalizada con pictograma." },
      { icon: <Accessibility className="size-4" />, name: "Asistencia PMR", detail: "Punto de asistencia para personas con movilidad reducida. Infórmalo con antelación en tu aerolínea." },
    ],
    tip: "Si tu maleta no aparece en 30 minutos, ve al mostrador de Lost & Found antes de salir de la zona de llegadas.",
  },
  {
    id: "salidas-tierra",
    label: "Salidas Zona Tierra (Planta 3)",
    icon: Building2,
    accent: "var(--step-teal)",
    description: "La zona de salidas en Zona Tierra es donde empiezas tu viaje. Aquí está el check-in, consigna de equipaje y acceso al control de seguridad.",
    services: [
      { icon: <Building2 className="size-4" />, name: "Mostradores Check-in", detail: "Mostradores A–S para todas las aerolíneas. Busca tu aerolínea en las pantallas de información." },
      { icon: <Luggage className="size-4" />, name: "Facturación Automática", detail: "Muchas aerolíneas tienen kioscos de auto-check-in y cintas de drop de maletas." },
      { icon: <Luggage className="size-4" />, name: "Consigna de Equipaje", detail: "Servicio de guarda equipaje disponible en Zona Tierra. Pago por horas." },
      { icon: <Wifi className="size-4" />, name: "WiFi Gratuito", detail: "WiFi gratis en todo el aeropuerto (Wifi-BCN). Sin contraseña, conexión directa." },
      { icon: <Utensils className="size-4" />, name: "Cafeterías y Restaurantes", detail: "Varias opciones de restauración antes del control de seguridad (más baratas que dentro)." },
    ],
    tip: "Factura tu maleta antes de las 45 min antes de salida para vuelos cortos, o 60-90 min para internacionales. Algunos mostradores cierran antes.",
  },
  {
    id: "seguridad",
    label: "Control de Seguridad",
    icon: Shield,
    accent: "var(--step-red)",
    description: "El punto de transición entre la Zona Tierra y la Zona Aire. Una vez dentro no puedes volver sin perder el derecho a entrar.",
    services: [
      { icon: <MapPin className="size-4" />, name: "Accesos en T1", detail: "Varios puntos de control en la Planta 3. Hay colas separadas por tipo de pasajero." },
      { icon: <Accessibility className="size-4" />, name: "Acceso PMR", detail: "Carril específico para silla de ruedas y personas con movilidad reducida." },
      { icon: <Baby className="size-4" />, name: "Familias con niños", detail: "Cola especial para familias. Avisa al personal del aeropuerto." },
      { icon: <Building2 className="size-4" />, name: "Fast Track", detail: "Acceso rápido pagando o con tarjeta Business de ciertas aerolíneas. Señalizado en amarillo." },
    ],
    tip: "Consulta la sección 'Seguridad' de esta guía para prepararte bien. Sube por la guía ↑ para ver los 6 pasos del control.",
  },
  {
    id: "zona-aire",
    label: "Zona Aire — Comercial",
    icon: ShoppingBag,
    accent: "var(--zone-aire)",
    description: "Una vez pasado el control de seguridad, bienvenido a la Zona Aire. Aquí el tiempo pasa volando: tiendas, restaurantes y servicios de primera.",
    services: [
      { icon: <ShoppingBag className="size-4" />, name: "Duty Free", detail: "Grandes tiendas de perfumes, alcohol, tabaco y moda libre de impuestos. Compra con tu tarjeta de embarque." },
      { icon: <Utensils className="size-4" />, name: "Restaurantes y Bares", detail: "Amplia oferta gastronómica: desde bocadillos hasta sushi y hamburguesas gourmet." },
      { icon: <Wifi className="size-4" />, name: "Lounges (VIP)", detail: "Sala Premier (AENA) y lounges de aerolíneas. Acceso con tarjeta Premium o DragonPass/LoungeKey." },
      { icon: <Baby className="size-4" />, name: "Sala Familiar", detail: "Zona de juegos para niños en la Zona Aire de T1." },
      { icon: <Car className="size-4" />, name: "Farmacia y Servicios", detail: "Farmacia, peluquería, prensa internacional y tiendas de recuerdos." },
    ],
    tip: "Los precios en Zona Aire son más caros que fuera. Come y bebe algo antes de pasar el control si quieres ahorrar.",
  },
  {
    id: "gates",
    label: "Puertas de Embarque (Gates)",
    icon: PlaneTakeoff,
    accent: "var(--transport-aerobus)",
    description: "La zona final antes de subir al avión. T1 tiene muchísimos gates — vigila bien las pantallas de información.",
    services: [
      { icon: <PlaneTakeoff className="size-4" />, name: "Módulos A, B y C", detail: "T1 tiene 3 módulos grandes conectados. Los gates B y C requieren tren automatizado (APM) de acceso." },
      { icon: <MapPin className="size-4" />, name: "APM — Tren Interno", detail: "Tren automático que conecta los módulos de T1 en menos de 5 minutos. Sigue la señalética 'Módulo B/C'." },
      { icon: <Utensils className="size-4" />, name: "Cafeterías en Gates", detail: "Hay varias opciones de comida y bebida cerca de los gates. También vending machines." },
      { icon: <Wifi className="size-4" />, name: "Enchufes y Carga", detail: "Hay enchufes y cargadores USB cerca de la mayoría de asientos de espera en los gates." },
    ],
    tip: "¡Atención! Los gates B y C de T1 requieren coger el tren APM. Súmate mínimo 15 minutos extra al tiempo estimado si tu gate empieza por B o C.",
  },
];

const ZONES_T2: ZoneInfo[] = [
  {
    id: "llegadas",
    label: "Llegadas T2 (Planta Baja)",
    icon: PlaneLanding,
    accent: "var(--zone-tierra)",
    description: "T2 tiene tres módulos (T2A, T2B, T2C). Todas las llegadas salen por la misma zona. Más pequeña que T1 pero perfectamente funcional.",
    services: [
      { icon: <Luggage className="size-4" />, name: "Recogida de Equipaje", detail: "Cintas en planta baja. T2 es más compacta, más fácil de navegar que T1." },
      { icon: <Car className="size-4" />, name: "Alquiler de Coches", detail: "Compañías disponibles en T2B. Área de recogida bien señalizada." },
      { icon: <MapPin className="size-4" />, name: "Bus Interterminales", detail: "Bus gratuito cada 5-10 min entre T1 y T2. Parada exterior junto a llegadas." },
    ],
    tip: "¿Tu vuelo llegó a T2 pero tienes conexión en T1? El bus interterminales gratuito sale justo fuera. Cuenta con 15-20 minutos de tiempo de conexión.",
  },
  {
    id: "salidas-tierra",
    label: "Salidas T2 Zona Tierra",
    icon: Building2,
    accent: "var(--step-teal)",
    description: "T2 es más sencilla de navegar que T1. Los mostradores de check-in y los accesos al control están en la misma planta.",
    services: [
      { icon: <Building2 className="size-4" />, name: "Check-in y Drop Bag", detail: "T2 opera principalmente con Vueling, Iberia Express y algunas low-cost. Mostradores bien señalizados." },
      { icon: <MapPin className="size-4" />, name: "Tren RENFE R2 Nord", detail: "La estación de tren está justo debajo de T2B. La opción más barata para llegar al centro." },
      { icon: <Wifi className="size-4" />, name: "WiFi y Servicios", detail: "Mismos servicios que T1: WiFi gratuito, cajeros, cafeterías en Zona Tierra." },
    ],
    tip: "Vueling y muchas aerolíneas low-cost operan desde T2. Confirma tu terminal en el email de la reserva o tarjeta de embarque.",
  },
  {
    id: "seguridad",
    label: "Control de Seguridad T2",
    icon: Shield,
    accent: "var(--step-red)",
    description: "El control de seguridad de T2 suele tener menos cola que T1. Mismas normas aplicables.",
    services: [
      { icon: <MapPin className="size-4" />, name: "Acceso Único por Módulo", detail: "Cada módulo de T2 (A, B, C) tiene su propio control de seguridad. Entra por el módulo correcto." },
      { icon: <Accessibility className="size-4" />, name: "Asistencia", detail: "Mismo servicio que T1. Infórmate en el mostrador de la aerolínea." },
    ],
    tip: "T2 tiene 3 controles de seguridad separados (uno por módulo). Asegúrate de entrar por el módulo que corresponde a tu gate.",
  },
  {
    id: "zona-aire",
    label: "Zona Aire T2",
    icon: ShoppingBag,
    accent: "var(--zone-aire)",
    description: "La Zona Aire de T2 es más pequeña pero ofrece los servicios esenciales: Duty Free, restauración y zonas de espera cómodas.",
    services: [
      { icon: <ShoppingBag className="size-4" />, name: "Duty Free", detail: "Tienda principal en T2B. Alcohol, perfumes y tabaco libre de impuestos." },
      { icon: <Utensils className="size-4" />, name: "Cafeterías", detail: "Opciones de desayuno, snacks y comida caliente en cada módulo de T2." },
      { icon: <Wifi className="size-4" />, name: "Enchufes y Conectividad", detail: "WiFi gratuito y enchufes disponibles en las zonas de espera." },
    ],
    tip: "T2 es más tranquila y menos masificada que T1. Si tu vuelo sale de T2, llega con tiempo normal — raramente hay grandes colas.",
  },
  {
    id: "gates",
    label: "Gates T2 (A, B, C)",
    icon: PlaneTakeoff,
    accent: "var(--transport-aerobus)",
    description: "Los tres módulos de T2 son separados pero conectados por pasillo cubierto. No necesitas salir al exterior para moverte entre ellos.",
    services: [
      { icon: <PlaneTakeoff className="size-4" />, name: "T2A, T2B, T2C", detail: "Conectados por pasillo climatizado. A pie, 5-10 minutos entre módulos." },
      { icon: <MapPin className="size-4" />, name: "Pantallas de Info", detail: "Gates numerados claramente. Mira las pantallas para confirmar tu gate (puede cambiar)." },
    ],
    tip: "En T2, siempre confirma tu gate en las pantallas de información justo antes de ir. Ocasionalmente se hacen cambios de última hora.",
  },
];

export function AirportNav() {
  const [terminal, setTerminal] = useState<Terminal>("T1");
  const [activeZone, setActiveZone] = useState<Zone>("salidas-tierra");

  const zones = terminal === "T1" ? ZONES_T1 : ZONES_T2;
  const zoneInfo = zones.find((z) => z.id === activeZone) ?? zones[1];

  return (
    <section id="navegacion" className="py-16 md:py-20 section-glow border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-md text-primary text-[10px] font-bold tracking-widest uppercase mb-4 border border-white/10">
            <MapPin className="size-3.5" />
            Navegación
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Distribución e <span className="runway-shimmer-text">Interior</span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explora el mapa conceptual del aeropuerto por terminales y áreas clave. Encuentra servicios, accesos y todo lo necesario en cada parada.
          </p>
        </motion.div>

        {/* Terminal Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-zinc-900 border border-white/10 p-1">
            <button
              onClick={() => {
                setTerminal("T1");
                setActiveZone("salidas-tierra");
              }}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                terminal === "T1"
                  ? "bg-primary text-primary-foreground font-semibold shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Terminal T1
            </button>
            <button
              onClick={() => {
                setTerminal("T2");
                setActiveZone("salidas-tierra");
              }}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                terminal === "T2"
                  ? "bg-primary text-primary-foreground font-semibold shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Terminal T2
            </button>
          </div>
        </div>

        {/* Zone navigation steps */}
        <div className="flex overflow-x-auto gap-2 justify-start md:justify-center items-center pb-4 mb-8 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {zones.map((z, i) => (
            <div key={z.id} className="flex items-center shrink-0">
              <button
                onClick={() => setActiveZone(z.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-300 cursor-pointer border ${
                  activeZone === z.id
                    ? "bg-zinc-900/60 border-primary shadow-lg shadow-primary/5 text-white"
                    : "border-white/5 hover:border-white/15 text-white/50 hover:text-white/80"
                }`}
              >
                <div
                  className="size-8 rounded-lg flex items-center justify-center shrink-0 transition-all"
                  style={{
                    backgroundColor: activeZone === z.id ? `color-mix(in oklch, ${z.accent} 20%, transparent)` : "transparent",
                    color: activeZone === z.id ? z.accent : "var(--muted-foreground)",
                  }}
                >
                  <z.icon className="size-4.5" />
                </div>
                <span className="text-xs font-semibold leading-tight uppercase tracking-wider">
                  {z.label.split("(")[0].trim()}
                </span>
              </button>
              {i < zones.length - 1 && (
                <div className="w-4 h-px bg-white/10 mx-2 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Zone detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${terminal}-${activeZone}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md overflow-hidden shadow-2xl"
          >
            <div className="p-6 md:p-8" style={{ borderLeft: `4px solid ${zoneInfo.accent}` }}>
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Left: Header + description */}
                <div className="flex flex-col justify-between gap-5">
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="size-14 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `color-mix(in oklch, ${zoneInfo.accent} 15%, transparent)` }}
                      >
                        <zoneInfo.icon className="size-7" style={{ color: zoneInfo.accent }} />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: zoneInfo.accent }}>
                          {terminal} — {zoneInfo.label}
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">{zoneInfo.label}</h3>
                      </div>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{zoneInfo.description}</p>
                  </div>
                  
                  <div
                    className="rounded-xl p-4 text-xs text-white/70 border leading-relaxed bg-zinc-950/20"
                    style={{
                      borderColor: `color-mix(in oklch, ${zoneInfo.accent} 15%, transparent)`,
                    }}
                  >
                    <span className="font-bold text-white block mb-1" style={{ color: zoneInfo.accent }}>💡 Consejo Útil:</span>
                    {zoneInfo.tip}
                  </div>
                </div>

                {/* Right: Services list */}
                <div>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-primary" />
                    Servicios Destacados
                  </p>
                  <div className="space-y-3">
                    {zoneInfo.services.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3.5 p-3.5 rounded-xl bg-zinc-950/20 border border-white/5 hover:border-white/10 transition-colors"
                      >
                        <div
                          className="size-8.5 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `color-mix(in oklch, ${zoneInfo.accent} 12%, transparent)`,
                            color: zoneInfo.accent,
                          }}
                        >
                          {s.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white mb-0.5 leading-snug">{s.name}</p>
                          <p className="text-xs text-white/55 leading-relaxed">{s.detail}</p>
                        </div>
                      </motion.div>
                    ))}
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
