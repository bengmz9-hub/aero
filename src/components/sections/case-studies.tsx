"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  tag: string;
  tagColor: string;
}

const FAQS: FAQ[] = [
  {
    id: "agua",
    tag: "Líquidos",
    tagColor: "var(--step-blue)",
    question: "¿Puedo llevar agua en el equipaje de mano?",
    answer:
      "No puedes pasar agua comprada ANTES del control de seguridad. Independientemente de si la botella está llena o medio vacía, si es mayor de 100ml la tirarán. La solución: vacía la botella antes del control y rellénala en las fuentes de agua potable que hay dentro de la Zona Aire (son gratuitas), o cómprala dentro del aeropuerto una vez pasado el control. También puedes llevar una botella vacía y reutilizable.",
  },
  {
    id: "ordenador-maleta",
    tag: "Electrónica",
    tagColor: "var(--step-purple)",
    question: "¿Puedo llevar el ordenador dentro de la mochila sin sacarlo?",
    answer:
      "En la mayoría de controles en España y Europa, los ordenadores portátiles y tablets grandes deben salir de la mochila y colocarse en su propia bandeja separada. Esto se debe a que el escáner de rayos X necesita verlos con claridad. Algunos aeropuertos tienen escáneres de nueva generación (tomografía) donde no hace falta, pero en El Prat lo más seguro es sacar siempre el ordenador. ¿Por qué? Porque si el agente no lo ve bien, tendrás que abrir la mochila y hacerlo de todas formas, perdiendo más tiempo.",
  },
  {
    id: "liquidos-ml",
    tag: "Líquidos",
    tagColor: "var(--step-blue)",
    question: "¿Cuántos mililitros puede tener cada recipiente de líquido?",
    answer:
      "La regla es sencilla: cada recipiente individual puede contener un máximo de 100 ml (o 100g para productos sólidos con textura de gel/pasta). El tamaño del envase es lo que importa, NO la cantidad de líquido dentro. Es decir, una botella de 200ml aunque esté llena solo a la mitad NO puede pasar. Todos tus recipientes de hasta 100ml deben caber en UNA bolsa zip de cierre hermético de 1 litro (aproximadamente 20x20 cm). Solo se permite UNA bolsa por pasajero.",
  },
  {
    id: "medicacion",
    tag: "Líquidos",
    tagColor: "var(--step-blue)",
    question: "¿Puedo llevar medicación líquida en más de 100ml?",
    answer:
      "Sí, los medicamentos líquidos con receta médica son una excepción a la regla de los 100ml. Debes presentar la medicación junto a la receta o prescripción médica en el control de seguridad. El personal la revisará y, si todo es correcto, podrás pasar con la cantidad necesaria para el viaje. Lleva siempre el envase original con el etiquetado farmacéutico. También aplica a insulina, jeringas (con certificado médico) y otros tratamientos especiales.",
  },
  {
    id: "leche-bebe",
    tag: "Familias",
    tagColor: "var(--step-green)",
    question: "¿Puedo llevar leche o comida para bebé?",
    answer:
      "Sí, la leche materna, leche de fórmula, agua para bebés y comida para bebés son excepciones a la regla de líquidos. Puedes llevarlos en cantidad razonable para la duración del viaje. El personal puede pedirte que abras el envase y que lo pruebes tú mismo (una pequeña cantidad). No hace falta que lleves receta médica para esto, pero sí que tengas al bebé contigo. Si el niño no viaja contigo, puede haber complicaciones — lleva documentación médica.",
  },
  {
    id: "tiempo-anticipacion",
    tag: "Planificación",
    tagColor: "var(--step-amber)",
    question: "¿Cuánto tiempo antes debo estar en el aeropuerto?",
    answer:
      "La recomendación oficial de AENA y la mayoría de aerolíneas es: vuelos nacionales (Schengen) → 90 minutos antes de la hora de salida; vuelos internacionales extra-Schengen (UK, EEUU, Latinoamérica, etc.) → 2-3 horas antes. Estos tiempos son para tener el proceso de check-in, facturación de maletas, control de seguridad y llegada al gate completado con margen. En temporada alta (verano, Navidades, Semana Santa) añade 30-45 minutos extra a estas estimaciones.",
  },
  {
    id: "cinturon-zapatos",
    tag: "Seguridad",
    tagColor: "var(--step-red)",
    question: "¿Tengo que quitarme el cinturón y los zapatos?",
    answer:
      "El cinturón metálico normalmente sí debes quitártelo y ponerlo en la bandeja — activa el detector. Los zapatos en España y Europa NO es obligatorio quitarlos por norma general (a diferencia de EE.UU.), aunque si el arco de detección pita, el personal puede pedirte que te los quites para comprobarlo. Zapatos con mucho metal o suelas muy gruesas son más susceptibles de activar el detector. Consejo: lleva zapatos fáciles de poner/quitar si viajas mucho.",
  },
  {
    id: "powerbank",
    tag: "Electrónica",
    tagColor: "var(--step-purple)",
    question: "¿Dónde va el powerbank? ¿Mano o bodega?",
    answer:
      "Los powerbanks (baterías externas) SIEMPRE deben ir en el equipaje de mano, NUNCA en la maleta que va a bodega. Esto es por normativa de seguridad aérea internacional (las baterías de litio pueden inflamarse y en bodega no hay forma de actuar). En cuanto a capacidad: hasta 100Wh se puede llevar sin problema; entre 100Wh y 160Wh necesitas permiso de la aerolínea (consúltalo al hacer la reserva); por encima de 160Wh está completamente prohibido. La mayoría de powerbanks domésticos están por debajo de 100Wh.",
  },
  {
    id: "comida-mano",
    tag: "Líquidos",
    tagColor: "var(--step-blue)",
    question: "¿Puedo llevar comida sólida en el equipaje de mano?",
    answer:
      "La comida sólida en general puede pasar el control de seguridad sin problema — sándwiches, fruta entera, snacks, galletas, chocolate, etc. Lo que tiene restricción es la comida con textura líquida o semilíquida: mermeladas, yogures, sopas, natillas, etc. si superan los 100ml. Atención: los quesos blandos tipo brie o philadelphia también pueden ser problemáticos. Si llevas comida en tápers, ábrelos si el agente lo solicita. Los alimentos congelados son generalmente OK.",
  },
  {
    id: "check-in-online",
    tag: "Planificación",
    tagColor: "var(--step-amber)",
    question: "¿Puedo hacer el check-in online y no ir al mostrador?",
    answer:
      "Sí, y es muy recomendable. La mayoría de aerolíneas permiten el check-in online desde 24h (algunas hasta 48h) antes del vuelo. Si solo llevas equipaje de mano, puedes ir directamente al control de seguridad con tu tarjeta de embarque digital (en el móvil o impresa). Si necesitas facturar maleta, busca los kioscos de drop de equipaje (cintas automáticas) de tu aerolínea — son mucho más rápidos que hacer cola en el mostrador. Guarda la tarjeta de embarque en tu teléfono Y tenla descargada (sin necesidad de internet) por si acaso.",
  },
  {
    id: "wifi",
    tag: "Servicios",
    tagColor: "var(--step-teal)",
    question: "¿Hay WiFi gratuito en el aeropuerto?",
    answer:
      "Sí, el Aeropuerto de Barcelona El Prat tiene WiFi gratuito en toda la terminal, tanto en Zona Tierra como en Zona Aire. La red se llama Wifi-BCN o similar. No tiene contraseña y la conexión es directa — simplemente selecciónala en tu dispositivo y acepta los términos de uso. La velocidad es suficiente para uso normal (email, redes sociales, streaming ligero). Para videoconferencias importantes o trabajos que requieran alta velocidad, considera usar tus datos móviles.",
  },
  {
    id: "perdida-maleta",
    tag: "Incidencias",
    tagColor: "var(--step-red)",
    question: "¿Qué hago si mi maleta no aparece en la cinta de llegadas?",
    answer:
      "Si tu maleta no aparece en 30-40 minutos desde que empezó a salir el equipaje de tu vuelo, NO salgas de la Zona de Llegadas. Dirígete al mostrador de Lost & Found (Objetos Perdidos / Equipajes) antes de salir. Está situado en la zona de llegadas. Necesitarás: tu tarjeta de embarque, el talón de equipaje (la pegatina que te dan en facturación) y tu documento de identidad. Te abrirán un expediente (PIR). Si la maleta aparece en los próximos días, la aerolínea la entregará en tu domicilio gratuitamente. Guarda el número de expediente.",
  },
];

function FAQCard({ faq }: { faq: FAQ }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      layout
      className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 dark:hover:border-primary/20 transition-colors duration-200"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left cursor-pointer group"
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-3 flex-1">
          <div
            className="size-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{
              backgroundColor: `color-mix(in oklch, ${faq.tagColor} 15%, transparent)`,
              color: faq.tagColor,
            }}
          >
            <HelpCircle className="size-4" />
          </div>
          <div>
            <span
              className="text-xs font-semibold uppercase tracking-wide mb-1 block"
              style={{ color: faq.tagColor }}
            >
              {faq.tag}
            </span>
            <h3 className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
              {faq.question}
            </h3>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mt-1"
        >
          <ChevronDown className="size-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0">
              <div
                className="w-full h-px mb-4"
                style={{ backgroundColor: `color-mix(in oklch, ${faq.tagColor} 25%, var(--border))` }}
              />
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function FAQ() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const uniqueTags = Array.from(new Set(FAQS.map((f) => f.tag)));
  const filtered = activeTag ? FAQS.filter((f) => f.tag === activeTag) : FAQS;

  return (
    <section id="faq" className="py-10 md:py-12 bg-muted/20 section-glow border-t border-white/5">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-md text-primary text-[10px] font-bold tracking-widest uppercase mb-4 border border-white/10">
            <HelpCircle className="size-3.5" />
            Preguntas Frecuentes
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-100 mb-4">
            ¿Tienes alguna <span className="runway-shimmer-text">duda?</span>
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Las dudas más habituales resueltas con respuestas directas para planificar tu paso por Barcelona-El Prat.
          </p>
        </motion.div>

        {/* Tag filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          <button
            onClick={() => setActiveTag(null)}
            className={`inline-flex items-center px-4 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeTag === null
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/10"
                : "border-white/10 bg-zinc-900/60 text-zinc-200 hover:text-zinc-100 hover:border-white/20"
            }`}
          >
            Todas
          </button>
          {uniqueTags.map((tag) => {
            const faq = FAQS.find((f) => f.tag === tag)!;
            const isActive = activeTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(isActive ? null : tag)}
                className={`inline-flex items-center px-4 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer`}
                style={
                  isActive
                    ? { backgroundColor: faq.tagColor, borderColor: "transparent", color: "#fff" }
                    : { borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(24,24,27,0.6)", color: "rgba(255,255,255,0.7)" }
                }
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((faq, i) => (
              <motion.div
                key={faq.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <FAQCard faq={faq} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
