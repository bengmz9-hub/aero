"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, ChevronRight, ChevronLeft, Shield, LucideIcon, Droplet, Briefcase, Clock, Inbox, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Step {
  id: number;
  title: string;
  icon: LucideIcon;
  accent: string;
  description: string;
  details: string[];
  warning?: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    title: "Prepara los líquidos ANTES de llegar",
    icon: Droplet,
    accent: "var(--step-blue)",
    description: "La regla de los 100 ml es la más importante y la que más problemas causa. Prepárala en casa para no tener sorpresas.",
    details: [
      "Cada recipiente individual debe ser de máximo 100 ml (aunque esté medio vacío).",
      "Todos los líquidos deben caber en UNA sola bolsa zip transparente de 1 litro.",
      "Solo se permite UNA bolsa por persona.",
      "La bolsa de líquidos debe sacarse fácilmente del equipaje de mano.",
      "Geles, cremas, pasta de dientes, colonia, desodorante spray — todo cuenta como líquido.",
      "¿No tienes bolsa zip? Las venden en el propio aeropuerto, pero es mejor llevarla preparada.",
    ],
    warning: "Si un recipiente tiene 200ml pero está medio vacío, NO puede pasar. Lo que importa es la capacidad total del envase, no la cantidad que contiene.",
  },
  {
    id: 2,
    title: "Identifica qué llevas en el bolso/mochila",
    icon: Briefcase,
    accent: "var(--step-teal)",
    description: "Antes de llegar al control, ten claro qué necesitarás sacar. Esto ahorra tiempo y evita bloqueos.",
    details: [
      "Ordenador portátil → FUERA de la mochila, en su propia bandeja.",
      "Tablet grande (iPad, etc.) → también FUERA.",
      "Cámaras grandes (DSLR, mirrorless) → FUERA.",
      "Móvil → puedes dejarlo en la mochila o en tu bolsillo (lo pasan por el escáner).",
      "Bolsa de líquidos → FUERA en bandeja separada.",
      "Chaqueta, cinturón, monedas → al llevar todo al escáner.",
      "Cargadores, cables, powerbanks → pueden quedarse dentro de la mochila normalmente.",
    ],
  },
  {
    id: 3,
    title: "Llega con tiempo y elige bien la cola",
    icon: Clock,
    accent: "var(--step-amber)",
    description: "El control de seguridad es el cuello de botella principal. Con tiempo y la actitud correcta, lo pasarás sin estrés.",
    details: [
      "Vuelos domésticos/Schengen: llega mínimo 90 minutos antes.",
      "Vuelos internacionales extra-Schengen: llega mínimo 2 horas antes.",
      "Observa qué colas avanzan más rápido — no siempre la más corta es la más rápida.",
      "Las colas de familias con niños o carritos suelen avanzar más despacio por el volumen de bultos.",
      "Ten a mano la tarjeta de embarque (física o en el móvil con brillo al máximo).",
    ],
  },
  {
    id: 4,
    title: "Coloca todo en las bandejas correctamente",
    icon: Inbox,
    accent: "var(--step-green)",
    description: "El orden en que colocas las cosas en las bandejas determina si el escáner bloquea o no.",
    details: [
      "Bandeja 1: La mochila/maleta de cabina sola.",
      "Bandeja 2: Ordenador portátil (plano, solo).",
      "Bandeja 3: Bolsa de líquidos + chaqueta + cinturón + accesorios sueltos.",
      "Nunca pongas el ordenador debajo de la mochila — el escáner no lo ve bien.",
      "Los zapatos NO es obligatorio quitarlos en España (a diferencia de EE.UU.). Solo si el arco pita.",
      "Si llevas prendas gruesas (abrigo), sácalas y ponlas en la bandeja.",
    ],
  },
  {
    id: 5,
    title: "Pasa por el arco o escáner de personas",
    icon: User,
    accent: "var(--step-red)",
    description: "Sigue las instrucciones del personal. Si pita, no te asustes — es muy habitual y tiene solución fácil.",
    details: [
      "Vacía completamente los bolsillos antes de pasar.",
      "Lleva el móvil en la bandeja, no en el bolsillo.",
      "Algunos aeropuertos tienen escáner de cuerpo completo (en forma de cabina) — es seguro.",
      "Si el arco pita: el agente usará un detector manual en tu cuerpo — es rutina.",
      "Marcapasos u objetos metálicos médicos: informa al personal antes de pasar.",
      "No intentes pasar apresuradamente ni antes de que te indiquen.",
    ],
    warning: "Si tu bandeja bloquea el escáner, un agente la revisará manualmente. No es nada grave, pero sí lleva más tiempo. Mejor preparar bien las bandejas.",
  },
  {
    id: 6,
    title: "Recoge todo al otro lado con calma",
    icon: CheckCircle2,
    accent: "var(--step-purple)",
    description: "El otro lado del control es la Zona Aire — ya estás dentro. Pero no te vayas sin comprobarlo todo.",
    details: [
      "Recoge TODAS tus bandejas — especialmente si tienes varias.",
      "Comprueba que el ordenador está en la mochila antes de alejarte.",
      "Revisa que llevas el móvil, documentación y billete.",
      "Si necesitas recoger el cinturón o ponerte los zapatos, apártate de la zona de bandejas para no bloquear a otros.",
      "¡Bienvenido a la Zona Aire! Ya puedes ir al duty free, restaurantes y tu gate.",
      "Comprueba en las pantallas el número de puerta (gate) de tu vuelo.",
    ],
  },
];

const LIQUIDS = [
  { item: "Agua comprada ANTES del control", status: "danger", note: "La tirarán. Cómprala dentro." },
  { item: "Agua comprada DENTRO del aeropuerto", status: "ok", note: "Puedes pasear con ella al avión." },
  { item: "Medicamentos líquidos (con receta)", status: "warn", note: "Lleva la receta médica. Se puede pasar en más cantidad." },
  { item: "Leche / comida para bebés", status: "ok", note: "Permitido en cantidad razonable. Pueden pedirte probarlo." },
  { item: "Gel hidroalcohólico hasta 100ml", status: "ok", note: "Cuenta en la bolsa de 1L." },
  { item: "Crema solar / hidratante hasta 100ml", status: "ok", note: "En la bolsa de 1L con el resto de líquidos." },
  { item: "Perfume hasta 100ml", status: "ok", note: "En la bolsa de 1L." },
  { item: "Perfume de 150ml (aunque sea nuevo)", status: "danger", note: "No puede pasar. Factúralo o cómpralo dentro." },
  { item: "Pasta de dientes hasta 100ml", status: "ok", note: "Sí puede pasar (es gel/pasta = líquido)." },
  { item: "Cuchilla de afeitar de hoja", status: "danger", note: "No permitida en cabina. Ve en facturado." },
  { item: "Maquinilla eléctrica", status: "ok", note: "Permitida en cabina." },
  { item: "Vino / alcohol comprado en tiendas Duty Free", status: "ok", note: "Solo si viene en bolsa sellada del aeropuerto." },
];

const ELECTRONICS = [
  { item: "Ordenador portátil", status: "warn", note: "FUERA de la mochila en su propia bandeja." },
  { item: "iPad / Tablet grande (+25cm)", status: "warn", note: "FUERA de la mochila en bandeja separada." },
  { item: "iPad mini / Tablet pequeña", status: "ok", note: "Puede quedarse dentro del bolso." },
  { item: "Móvil / Smartphone", status: "ok", note: "Dentro del bolso o en bandeja. Ambas opciones OK." },
  { item: "Cámara DSLR / Mirrorless", status: "warn", note: "FUERA de la mochila en bandeja." },
  { item: "Cámara compacta / GoPro", status: "ok", note: "Puede ir dentro de la mochila." },
  { item: "Powerbank hasta 100Wh", status: "ok", note: "Solo en cabina (nunca en bodega). Debe ir en equipaje de mano." },
  { item: "Powerbank entre 100-160Wh", status: "warn", note: "Necesita autorización de la aerolínea. Consulta antes." },
  { item: "Powerbank +160Wh", status: "danger", note: "Prohibido completamente en aviones." },
  { item: "Auriculares / Cascos", status: "ok", note: "Dentro de la mochila sin problema." },
  { item: "Cables y cargadores", status: "ok", note: "Dentro de la mochila sin problema." },
  { item: "Consola (Nintendo Switch, etc.)", status: "ok", note: "Dentro del bolso. No hace falta sacarla." },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "ok") return <CheckCircle2 className="size-4 shrink-0 text-chart-5" />;
  if (status === "danger") return <XCircle className="size-4 shrink-0 text-destructive" />;
  return <AlertTriangle className="size-4 shrink-0 text-accent" />;
}

function StatusBadge({ status }: { status: string }) {
  const cls = status === "ok" ? "badge-ok" : status === "danger" ? "badge-danger" : "badge-warn";
  const label = status === "ok" ? "✓ Permitido" : status === "danger" ? "✗ Prohibido" : "⚠ Condiciones";
  return <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap inline-block ${cls}`}>{label}</span>;
}

export function Security() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState<"liquids" | "electronics">("liquids");

  const step = STEPS[activeStep];

  return (
    <section id="seguridad" className="py-10 md:py-12 bg-muted/20 section-glow border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-md text-primary text-[10px] font-bold tracking-widest uppercase mb-4 border border-white/10">
            <Shield className="size-3.5" />
            Seguridad
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4">
            Pasa el control <span className="runway-shimmer-text">sin estrés</span>
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Guía paso a paso para ir desde la Zona Tierra a la Zona Aire con total tranquilidad.
            Sigue estos 6 pasos y llegarás a tu puerta de embarque relajado.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Step navigator — desktop */}
          <div className="hidden lg:flex flex-col gap-2 lg:col-span-1">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(i)}
                className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  activeStep === i
                    ? "bg-card border border-border shadow-sm"
                    : "hover:bg-muted/50"
                }`}
              >
                <div
                  className="size-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-all"
                  style={{
                    backgroundColor: activeStep === i ? `color-mix(in oklch, ${s.accent} 20%, transparent)` : "transparent",
                    color: activeStep === i ? s.accent : "#d4d4d8",
                    border: `2px solid ${activeStep === i ? s.accent : "var(--border)"}`,
                  }}
                >
                  {activeStep > i ? "✓" : s.id}
                </div>
                <span className={`text-xs font-medium leading-tight ${activeStep === i ? "text-foreground" : "text-zinc-300"}`}>
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* Step content */}
          <div className="lg:col-span-4">
            {/* Mobile step indicators */}
            <div className="flex gap-1.5 mb-6 lg:hidden overflow-x-auto pb-2">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(i)}
                  className={`shrink-0 size-9 rounded-full text-xs font-bold transition-all cursor-pointer border-2 ${
                    i === activeStep
                      ? "text-zinc-100"
                      : i < activeStep
                      ? "border-chart-5 text-chart-5"
                      : "border-border text-zinc-300"
                  }`}
                  style={
                    i === activeStep
                      ? { backgroundColor: s.accent, borderColor: s.accent }
                      : {}
                  }
                >
                  {i < activeStep ? "✓" : s.id}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm"
              >
                {/* Step header */}
                <div
                  className="p-6 md:p-8"
                  style={{ borderBottom: `3px solid ${step.accent}` }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="size-14 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `color-mix(in oklch, ${step.accent} 15%, transparent)` }}
                    >
                      <step.icon className="size-7" style={{ color: step.accent }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: step.accent }}>
                        Paso {step.id} de {STEPS.length}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-zinc-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Step details */}
                <div className="p-6 md:p-8">
                  <ul className="space-y-3 mb-6">
                    {step.details.map((d, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-3 text-sm text-zinc-300"
                      >
                        <div
                          className="size-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                          style={{
                            backgroundColor: `color-mix(in oklch, ${step.accent} 15%, transparent)`,
                            color: step.accent,
                          }}
                        >
                          {i + 1}
                        </div>
                        {d}
                      </motion.li>
                    ))}
                  </ul>

                  {step.warning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-3 p-4 rounded-xl badge-warn border text-sm mb-6"
                    >
                      <AlertTriangle className="size-4 shrink-0 mt-0.5" />
                      <p>{step.warning}</p>
                    </motion.div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                      className="gap-2"
                    >
                      <ChevronLeft className="size-4" />
                      Anterior
                    </Button>
                    <span className="text-xs text-zinc-300">
                      {activeStep + 1} / {STEPS.length}
                    </span>
                    {activeStep < STEPS.length - 1 ? (
                      <Button
                        onClick={() => setActiveStep(Math.min(STEPS.length - 1, activeStep + 1))}
                        className="gap-2"
                      >
                        Siguiente
                        <ChevronRight className="size-4" />
                      </Button>
                    ) : (
                      <Button onClick={() => setActiveStep(0)} variant="outline">
                        ¡Repasa desde el inicio!
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Liquid & Electronics reference tables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-2">
            Guía rápida: ¿Qué puedo llevar?
          </h3>
          <p className="text-zinc-300 text-center mb-8">
            Consulta antes de hacer la maleta de mano.
          </p>

          {/* Tab selector */}
          <div className="flex justify-center gap-2 mb-6">
            {[
              { key: "liquids", label: "💧 Líquidos" },
              { key: "electronics", label: "💻 Electrónica" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer border ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-zinc-300 hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left p-4 text-sm font-semibold text-foreground">Artículo</th>
                    <th className="text-center p-4 text-sm font-semibold text-foreground w-32">Estado</th>
                    <th className="text-left p-4 text-sm font-semibold text-foreground">Nota importante</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="wait">
                    {(activeTab === "liquids" ? LIQUIDS : ELECTRONICS).map((row, i) => (
                      <motion.tr
                        key={`${activeTab}-${i}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors"
                      >
                        <td className="p-4 text-sm text-foreground font-medium flex items-center gap-2">
                          <StatusIcon status={row.status} />
                          {row.item}
                        </td>
                        <td className="p-4 text-center">
                          <StatusBadge status={row.status} />
                        </td>
                        <td className="p-4 text-sm text-zinc-300">{row.note}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
