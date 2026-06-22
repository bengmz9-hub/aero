"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2, PlaneTakeoff, ShoppingBag, Utensils, Car, Luggage, Accessibility, Baby, Wifi, CircleDollarSign } from "lucide-react";

type Terminal = "T1" | "T2";
type Zone = "llegadas" | "salidas-tierra" | "seguridad" | "zona-aire" | "gates";

interface ZoneInfo {
  id: Zone;
  label: string;
  emoji: string;
  accent: string;
  description: string;
  services: { icon: React.ReactNode; name: string; detail: string }[];
  tip: string;
}

const ZONES_T1: ZoneInfo[] = [
  {
    id: "llegadas",
    label: "Llegadas (Planta Baja)",
    emoji: "🛬",
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
    emoji: "🏢",
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
    emoji: "🛡️",
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
    emoji: "🛍️",
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
    emoji: "✈️",
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
    emoji: "🛬",
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
    emoji: "🏢",
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
    emoji: "🛡️",
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
    emoji: "🛍️",
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
    emoji: "✈️",
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
    <section id="navegacion" className="py-20 md:py-28 section-glow">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase mb-4 border border-primary/20">
            <MapPin className="size-3.5" />
            Navega por el Aeropuerto
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Una vez dentro, ¿a dónde voy?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Selecciona tu terminal y la zona donde estás. Te explicamos qué encontrarás y cómo moverte.
          </p>
        </motion.div>

        {/* Terminal selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl border border-border bg-muted/30 p-1 gap-1">
            {(["T1", "T2"] as Terminal[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTerminal(t);
                  setActiveZone("salidas-tierra");
                }}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${
                  terminal === t
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t}
                {t === "T1" && <span className="ml-1.5 text-xs font-normal opacity-70">(grande)</span>}
                {t === "T2" && <span className="ml-1.5 text-xs font-normal opacity-70">(low-cost)</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={terminal}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-10"
          >
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              {terminal === "T1"
                ? "Terminal 1 es la más grande y moderna. Opera la mayoría de vuelos internacionales y de larga distancia. Aerolíneas: Iberia, Vueling (algunos), Air France, Lufthansa, British Airways, American Airlines..."
                : "Terminal 2 tiene tres módulos (A, B, C) y opera principalmente vuelos nacionales y europeos low-cost. Aerolíneas principales: Vueling, Ryanair (algunos), easyJet, Transavia..."}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Zone flow — visual timeline */}
        <div className="flex items-center justify-center gap-1 mb-10 overflow-x-auto pb-2">
          {zones.map((z, i) => (
            <div key={z.id} className="flex items-center shrink-0">
              <button
                onClick={() => setActiveZone(z.id)}
                className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl text-center transition-all cursor-pointer ${
                  activeZone === z.id
                    ? "bg-card border border-border shadow-sm"
                    : "hover:bg-muted/40"
                }`}
              >
                <div
                  className="size-10 rounded-full flex items-center justify-center text-lg transition-all"
                  style={{
                    backgroundColor: activeZone === z.id ? `color-mix(in oklch, ${z.accent} 20%, transparent)` : "transparent",
                    border: `2px solid ${activeZone === z.id ? z.accent : "var(--border)"}`,
                  }}
                >
                  {z.emoji}
                </div>
                <span className={`text-xs font-medium max-w-[70px] leading-tight ${activeZone === z.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {z.label.split("(")[0].trim()}
                </span>
              </button>
              {i < zones.length - 1 && (
                <div className="w-6 h-px bg-border mx-1 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Zone detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${terminal}-${activeZone}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
          >
            <div className="p-6 md:p-8" style={{ borderLeft: `4px solid ${zoneInfo.accent}` }}>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Header + description */}
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="size-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                      style={{ backgroundColor: `color-mix(in oklch, ${zoneInfo.accent} 15%, transparent)` }}
                    >
                      {zoneInfo.emoji}
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: zoneInfo.accent }}>
                        {terminal} — {zoneInfo.label}
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{zoneInfo.label}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{zoneInfo.description}</p>
                  <div
                    className="rounded-xl p-4 text-sm text-muted-foreground italic border"
                    style={{
                      backgroundColor: `color-mix(in oklch, ${zoneInfo.accent} 6%, transparent)`,
                      borderColor: `color-mix(in oklch, ${zoneInfo.accent} 20%, transparent)`,
                    }}
                  >
                    <span className="font-semibold not-italic" style={{ color: zoneInfo.accent }}>💡 Consejo: </span>
                    {zoneInfo.tip}
                  </div>
                </div>

                {/* Right: Services list */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-4">Servicios disponibles:</p>
                  <div className="space-y-3">
                    {zoneInfo.services.map((s, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-border/50"
                      >
                        <div
                          className="size-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `color-mix(in oklch, ${zoneInfo.accent} 15%, transparent)`,
                            color: zoneInfo.accent,
                          }}
                        >
                          {s.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.detail}</p>
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
