export const es = {
  navbar: {
    links: [
      { label: "Cómo Llegar", href: "#transporte" },
      { label: "Seguridad", href: "#seguridad" },
      { label: "En el Aeropuerto", href: "#navegacion" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  hero: {
    tagLocation: "Aeropuerto de Barcelona · IATA: BCN",
    title: "Tu vuelo,",
    titleHighlight: "sin estrés",
    titlePunctuation: ".",
    description: "Todo lo que necesitas saber antes de llegar al Aeropuerto El Prat: transporte, control de seguridad, equipaje de mano y cómo moverte por dentro sin complicaciones.",
    btnPrimary: "Cómo llegar",
    btnSecondary: "Guía de seguridad",
    stats: {
      terminals: "2 Terminales",
      terminalsDesc: "— T1 y T2",
      pax: "50M+",
      paxDesc: "pasajeros/año",
      open: "Abierto",
      openDesc: "24h/365 días",
    },
    globe: {
      badge: "Conexiones Globales",
      title: "Rutas internacionales y de largo radio",
      hoverHint: "Arrastra para rotar · Haz clic en un destino para centrarlo",
      stats: {
        distance: "Distancia",
        duration: "Duración media",
        frequency: "Frecuencia",
        airlines: "Aerolíneas principales",
        terminal: "Terminal habitual",
        passport: "Control de pasaportes",
        passportRequired: "Requerido (Vuelo Internacional)",
        passportNotRequired: "No requerido (Espacio Schengen)",
        weekly: "vuelos/semana",
        hours: "h",
        minutes: "m",
        layover: "Escala principal",
        direct: "Directo",
      },
      destinations: {
        newYork: {
          name: "Nueva York (JFK)",
          airlines: "LEVEL, Iberia, Delta, American Airlines, United",
          tip: "Vuelo transatlántico directo. Conexión rápida a toda Norteamérica.",
        },
        buenosAires: {
          name: "Buenos Aires (EZE)",
          airlines: "LEVEL, Iberia, Aerolíneas Argentinas",
          tip: "La principal ruta directa a Sudamérica desde Barcelona.",
        },
        tokyo: {
          name: "Tokio (HND)",
          airlines: "Iberia",
          tip: "Ruta directa recuperada recientemente. Conexión directa con Asia.",
        },
        dubai: {
          name: "DXB · Dubái",
          airlines: "Emirates",
          tip: "Puerta de enlace clave hacia Oriente Medio, África y Oceanía.",
        },
        miami: {
          name: "Miami (MIA)",
          airlines: "LEVEL, American Airlines",
          tip: "Conexión directa con el principal hub del Caribe y Latinoamérica.",
        },
        london: {
          name: "Londres (LHR)",
          airlines: "British Airways, Vueling",
          tip: "La ruta de negocios y conexión más frecuente desde Barcelona.",
        },
        singapore: {
          name: "Singapur (SIN)",
          airlines: "Singapore Airlines",
          tip: "Votado frecuentemente como el mejor vuelo de larga distancia desde BCN.",
        },
        losAngeles: {
          name: "Los Ángeles (LAX)",
          airlines: "LEVEL, Iberia, British Airways, American Airlines",
          tip: "Gran demanda de largo radio. Vuelo directo estacional o con escala corta vía Madrid o Londres.",
        },
        sydney: {
          name: "Sídney (SYD)",
          airlines: "Qatar Airways, Emirates, Qantas",
          tip: "Una de las rutas más voladas de Oceanía en 2025. Conexión óptima con 1 escala en Dubái o Doha.",
        },
      },
    },
  },
  "transport":{"tagLocation":"Transporte y Conexiones","title":"Cómo llegar y salir","titleHighlight":"de El Prat","description":"Compara las opciones de transporte oficiales entre Barcelona y el aeropuerto. Selecciona una opción para ver detalles, tarifas y ventajas.","duration":"Duración","price":"Precio aproximado","frequency":"Frecuencia","tip":"💡 Consejo Práctico:","prosTitle":"Ventajas del servicio","consTitle":"Puntos en contra","filters":{"economico":"Económico","rapido":"Rápido","equipaje":"Fácil con Equipaje","nocturno":"Servicio Nocturno"},"items":{"aerobus":{"name":"Aerobús (A1 / A2)","duration":"30–40 min","price":"6,75 €","freq":"cada 5–10 min","terminal":"Terminales T1 y T2","pros":["Sale desde Plaza Cataluña (centro neurálgico)","Paradas intermedias (Sepúlveda, Plaza España)","Amplio espacio para maletas y equipaje de mano","Funciona 24 horas al día, los 365 días del año","Ticket de ida y vuelta válido por 90 días"],"cons":["Sujeto a las condiciones de tráfico en hora punta","Precio ligeramente superior al transporte subterráneo","No cuenta con carril bus exclusivo en la autovía"],"tip":"Adquiere el billete online para ahorrar colas. El autobús A1 conecta con la T1 y el A2 con la T2."},"metro":{"name":"Metro L9 Sud","duration":"40–50 min","price":"5,15 € (billete aeropuerto)","freq":"cada 7 min","terminal":"Terminales T1 y T2","pros":["La alternativa más económica","Puntualidad absoluta, libre de atascos de tráfico","Conexión con las líneas L1, L3 y L5 hacia el centro","Horarios extendidos los fines de semana"],"cons":["Trayecto largo por el elevado número de paradas intermedias","Requiere hacer transbordo para llegar al centro de Barcelona","Escaleras mecánicas incómodas si viajas con equipaje voluminoso"],"tip":"El billete sencillo de metro no es válido. Necesitas el billete especial de Aeropuerto (L9 Sud). Valídalo tanto al entrar como al salir."},"taxi":{"name":"Servicio de Taxi Oficial","duration":"25–40 min","price":"35–50 € (tarifa oficial)","freq":"Inmediato","terminal":"Terminales T1 y T2","pros":["Servicio puerta a puerta de máxima comodidad","Ideal para grupos, familias o equipaje pesado","Sin límite estricto de capacidad de bultos","Disponible las 24 horas del día sin reserva previa"],"cons":["El coste es superior al del transporte colectivo","Posibles tiempos de espera en las horas de llegada masiva","Tarifa sujeta al estado del tráfico y suplementos"],"tip":"Utiliza únicamente los taxis amarillos y negros de las paradas oficiales señalizadas. Desconfía de ofertas fuera de estas zonas."},"vtc":{"name":"Cabify / Uber","duration":"25–45 min","price":"20–40 € (tarifa dinámica)","freq":"Bajo demanda","terminal":"Terminales T1 y T2","pros":["Precio final fijado y garantizado antes del trayecto","Posibilidad de solicitarlo cómodamente desde la terminal","Pago digital automatizado mediante aplicación móvil","Seguimiento en tiempo real del vehículo asignado"],"cons":["El punto de recogida se encuentra en el parking (requiere caminar)","El precio se incrementa significativamente con alta demanda","Requiere de conexión a internet activa para su solicitud"],"tip":"Solicita el servicio una vez tengas tu equipaje en mano, ya que los conductores tienen tiempos limitados de espera en las plazas reservadas."},"train":{"name":"Tren RENFE R2 Nord","duration":"30–35 min","price":"4,60 € (o T-Casual)","freq":"cada 30 min","terminal":"Solo Terminal T2","pros":["La opción más económica si utilizas una tarjeta integrada de transporte","Conexión directa con estaciones clave como Sants y Passeig de Gràcia","Trayecto rápido e independiente de la densidad de tráfico"],"cons":["Sale exclusivamente de la Terminal T2 (desde la T1 requiere autobús gratuito)","La frecuencia de paso es de 30 minutos, la menor del aeropuerto","No ofrece servicio durante la franja nocturna"],"tip":"Si tu vuelo sale de la T1, puedes usar el autobús lanzadera gratuito que conecta ambas terminales en unos 10-15 minutos."},"car":{"name":"Parking Oficial AENA","duration":"Variable","price":"Desde 5 €/h · Larga estancia desde 14 €/día","freq":"—","terminal":"Terminales T1 y T2","pros":["Máxima flexibilidad horaria sin depender de terceros","Ideal para traslados con equipajes de gran tamaño o especiales","Plazas cubiertas de corta estancia conectadas directamente a la terminal"],"cons":["La opción de coste más elevado para periodos prolongados de viaje","Requiere anticipación para el trayecto por carretera"],"tip":"Reserva tu plaza con antelación en la web oficial de AENA para obtener importantes descuentos en tarifas de larga estancia."}}},
  security: {
    tagLocation: "Control de Seguridad",
    title: "Pasa el control",
    titleHighlight: "sin estrés",
    description: "Conoce las reglas exactas para líquidos, aparatos electrónicos y equipaje de mano. Prepárate antes de llegar para evitar esperas y revisiones manuales.",
    tabs: {
      stepByStep: "Paso a paso",
      liquids: "Líquidos",
      electronics: "Electrónica"
    },
    nav: {
      prev: "Anterior",
      next: "Siguiente",
      restart: "¡Repasa desde el inicio!",
      stepLabel: "Paso",
      stepOf: "de"
    },
    guide: {
      title: "Guía rápida: ¿Qué puedo llevar?",
      subtitle: "Consulta antes de hacer la maleta de mano."
    },
    tableHeaders: {
      item: "Artículo",
      status: "Estado",
      note: "Nota importante"
    },
    badges: {
      ok: "✓ Permitido",
      danger: "✗ Prohibido",
      warn: "⚠ Condiciones"
    },
    steps: [
      {
        title: "Prepara los líquidos ANTES de llegar",
        description: "La regla de los 100 ml es la más importante y la que más problemas causa. Prepárala en casa para no tener sorpresas.",
        details: [
          "Cada recipiente individual debe ser de máximo 100 ml (aunque esté medio vacío).",
          "Todos los líquidos deben caber en UNA sola bolsa zip transparente de 1 litro.",
          "Solo se permite UNA bolsa por persona.",
          "La bolsa de líquidos debe sacarse fácilmente del equipaje de mano.",
          "Geles, cremas, pasta de dientes, colonia, desodorante spray — todo cuenta como líquido.",
          "¿No tienes bolsa zip? Las venden en el propio aeropuerto, pero es mejor llevarla preparada."
        ],
        warning: "Si un recipiente tiene 200ml pero está medio vacío, NO puede pasar. Lo que importa es la capacidad total del envase, no la cantidad que contiene."
      },
      {
        title: "Identifica qué llevas en el bolso/mochila",
        description: "Antes de llegar al control, ten claro qué necesitarás sacar. Esto ahorra tiempo y evita bloqueos.",
        details: [
          "Ordenador portátil → FUERA de la mochila, en su propia bandeja.",
          "Tablet grande (iPad, etc.) → también FUERA.",
          "Cámaras grandes (DSLR, mirrorless) → FUERA.",
          "Móvil → puedes dejarlo en la mochila o en tu bolsillo (lo pasan por el escáner).",
          "Bolsa de líquidos → FUERA en bandeja separada.",
          "Chaqueta, cinturón, monedas → al llevar todo al escáner.",
          "Cargadores, cables, powerbanks → pueden quedarse dentro de la mochila normalmente."
        ]
      },
      {
        title: "Llega con tiempo y elige bien la cola",
        description: "El control de seguridad es el cuello de botella principal. Con tiempo y la actitud correcta, lo pasarás sin estrés.",
        details: [
          "Vuelos domésticos/Schengen: llega mínimo 90 minutos antes.",
          "Vuelos internacionales extra-Schengen: llega mínimo 2 horas antes.",
          "Observa qué colas avanzan más rápido — no siempre la más corta es la más rápida.",
          "Las colas de familias con niños o carritos suelen avanzar más despacio por el volumen de bultos.",
          "Ten a mano la tarjeta de embarque (física o en el móvil con brillo al máximo)."
        ]
      },
      {
        title: "Coloca todo en las bandejas correctamente",
        description: "El orden en que colocas las cosas en las bandejas determina si el escáner bloquea o no.",
        details: [
          "Bandeja 1: La mochila/maleta de cabina sola.",
          "Bandeja 2: Ordenador portátil (plano, solo).",
          "Bandeja 3: Bolsa de líquidos + chaqueta + cinturón + accesorios sueltos.",
          "Nunca pongas el ordenador debajo de la mochila — el escáner no lo ve bien.",
          "Los zapatos NO es obligatorio quitarlos en España (a diferencia de EE.UU.). Solo si el arco pita.",
          "Si llevas prendas gruesas (abrigo), sácalas y ponlas en la bandeja."
        ]
      },
      {
        title: "Pasa por el arco o escáner de personas",
        description: "Sigue las instrucciones del personal. Si pita, no te asustes — es muy habitual y tiene solución fácil.",
        details: [
          "Vacía completamente los bolsillos antes de pasar.",
          "Lleva el móvil en la bandeja, no en el bolsillo.",
          "Algunos aeropuertos tienen escáner de cuerpo completo (en forma de cabina) — es seguro.",
          "Si el arco pita: el agente usará un detector manual en tu cuerpo — es rutina.",
          "Marcapasos u objetos metálicos médicos: informa al personal antes de pasar.",
          "No intentes pasar apresuradamente ni antes de que te indiquen."
        ],
        warning: "Si tu bandeja bloquea el escáner, un agente la revisará manualmente. No es nada grave, pero sí lleva más tiempo. Mejor preparar bien las bandejas."
      },
      {
        title: "Recoge todo al otro lado con calma",
        description: "El otro lado del control es la Zona Aire — ya estás dentro. Pero no te vayas sin comprobarlo todo.",
        details: [
          "Recoge TODAS tus bandejas — especialmente si tienes varias.",
          "Comprueba que el ordenador está en la mochila antes de alejarte.",
          "Revisa que llevas el móvil, documentación y billete.",
          "Si necesitas recoger el cinturón o ponerte los zapatos, apártate de la zona de bandejas para no bloquear a otros.",
          "¡Bienvenido a la Zona Aire! Ya puedes ir al duty free, restaurantes y tu gate.",
          "Comprueba en las pantallas el número de puerta (gate) de tu vuelo."
        ]
      }
    ],
    liquids: [
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
      { item: "Vino / alcohol comprado en tiendas Duty Free", status: "ok", note: "Solo si viene en bolsa sellada del aeropuerto." }
    ],
    electronics: [
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
      { item: "Consola (Nintendo Switch, etc.)", status: "ok", note: "Dentro del bolso. No hace falta sacarla." }
    ]
  },
  navigation: {
    tagLocation: "Terminales y Mapa",
    title: "Muévete como",
    titleHighlight: "un experto",
    description: "El Aeropuerto del Prat tiene dos terminales principales separadas por 4km. Selecciona tu terminal para descubrir los servicios paso a paso.",
    tabs: {
      t1: "Terminal T1",
      t2: "Terminal T2"
    },
    zones: {
      t1: [
        {
          label: "Llegadas (Planta Baja)",
          description: "La zona de llegadas de T1 es donde sales si vienes de un vuelo. Aquí recoges tu equipaje y encuentras todos los servicios de bienvenida.",
          services: [
            { name: "Cintas de Equipaje", detail: "Identificadas por número de vuelo. Pantallas informativas por toda la zona." },
            { name: "Alquiler de Coches", detail: "Todas las grandes compañías (Hertz, Avis, Europcar, Sixt) en el propio módulo." },
            { name: "Cambio de Divisas / ATM", detail: "Cajeros y casas de cambio disponibles en la planta de llegadas." },
            { name: "Sala de Lactancia", detail: "Disponible en la zona de llegadas. Señalizada con pictograma." },
            { name: "Asistencia PMR", detail: "Punto de asistencia para personas con movilidad reducida. Infórmalo con antelación en tu aerolínea." }
          ],
          tip: "Si tu maleta no aparece en 30 minutos, ve al mostrador de Lost & Found antes de salir de la zona de llegadas."
        },
        {
          label: "Salidas Zona Tierra (Planta 3)",
          description: "La zona de salidas en Zona Tierra es donde empiezas tu viaje. Aquí está el check-in, consigna de equipaje y acceso al control de seguridad.",
          services: [
            { name: "Mostradores Check-in", detail: "Mostradores A–S para todas las aerolíneas. Busca tu aerolínea en las pantallas de información." },
            { name: "Facturación Automática", detail: "Muchas aerolíneas tienen kioscos de auto-check-in y cintas de drop de maletas." },
            { name: "Consigna de Equipaje", detail: "Servicio de guarda equipaje disponible en Zona Tierra. Pago por horas." },
            { name: "WiFi Gratuito", detail: "WiFi gratis en todo el aeropuerto (Wifi-BCN). Sin contraseña, conexión directa." },
            { name: "Cafeterías y Restaurantes", detail: "Varias opciones de restauración antes del control de seguridad (más baratas que dentro)." }
          ],
          tip: "Factura tu maleta antes de las 45 min antes de salida para vuelos cortos, o 60-90 min para internacionales. Algunos mostradores cierran antes."
        },
        {
          label: "Control de Seguridad",
          description: "El punto de transición entre la Zona Tierra y la Zona Aire. Una vez dentro no puedes volver sin perder el derecho a entrar.",
          services: [
            { name: "Accesos en T1", detail: "Varios puntos de control en la Planta 3. Hay colas separadas por tipo de pasajero." },
            { name: "Acceso PMR", detail: "Carril específico para silla de ruedas y personas con movilidad reducida." },
            { name: "Familias con niños", detail: "Cola especial para familias. Avisa al personal del aeropuerto." },
            { name: "Fast Track", detail: "Acceso rápido pagando o con tarjeta Business de ciertas aerolíneas. Señalizado en amarillo." }
          ],
          tip: "Consulta la sección 'Seguridad' de esta guía para prepararte bien. Sube por la guía ↑ para ver los 6 pasos del control."
        },
        {
          label: "Zona Aire — Comercial",
          description: "Una vez pasado el control de seguridad, bienvenido a la Zona Aire. Aquí el tiempo pasa volando: tiendas, restaurantes y servicios de primera.",
          services: [
            { name: "Duty Free", detail: "Grandes tiendas de perfumes, alcohol, tabaco y moda libre de impuestos. Compra con tu tarjeta de embarque." },
            { name: "Restaurantes y Bares", detail: "Amplia oferta gastronómica: desde bocadillos hasta sushi y hamburguesas gourmet." },
            { name: "Lounges (VIP)", detail: "Sala Premier (AENA) y lounges de aerolíneas. Acceso con tarjeta Premium o DragonPass/LoungeKey." },
            { name: "Sala Familiar", detail: "Zona de juegos para niños en la Zona Aire de T1." },
            { name: "Farmacia y Servicios", detail: "Farmacia, peluquería, prensa internacional y tiendas de recuerdos." }
          ],
          tip: "Los precios en Zona Aire son más caros que fuera. Come y bebe algo antes de pasar el control si quieres ahorrar."
        },
        {
          label: "Puertas de Embarque (Gates)",
          description: "La zona final antes de subir al avión. T1 tiene muchísimos gates — vigila bien las pantallas de información.",
          services: [
            { name: "Módulos A, B y C", detail: "T1 tiene 3 módulos grandes conectados. Los gates B y C requieren tren automatizado (APM) de acceso." },
            { name: "APM — Tren Interno", detail: "Tren automático que conecta los módulos de T1 en menos de 5 minutos. Sigue la señalética 'Módulo B/C'." },
            { name: "Cafeterías en Gates", detail: "Hay varias opciones de comida y bebida cerca de los gates. También vending machines." },
            { name: "Enchufes y Carga", detail: "Hay enchufes y cargadores USB cerca de la mayoría de asientos de espera en los gates." }
          ],
          tip: "¡Atención! Los gates B y C de T1 requieren coger el tren APM. Súmate mínimo 15 minutos extra al tiempo estimado si tu gate empieza por B o C."
        }
      ],
      t2: [
        {
          label: "Llegadas T2 (Planta Baja)",
          description: "T2 tiene tres módulos (T2A, T2B, T2C). Todas las llegadas salen por la misma zona. Más pequeña que T1 pero perfectamente funcional.",
          services: [
            { name: "Recogida de Equipaje", detail: "Cintas en planta baja. T2 es más compacta, más fácil de navegar que T1." },
            { name: "Alquiler de Coches", detail: "Compañías disponibles en T2B. Área de recogida bien señalizada." },
            { name: "Bus Interterminales", detail: "Bus gratuito cada 5-10 min entre T1 y T2. Parada exterior junto a llegadas." }
          ],
          tip: "¿Tu vuelo llegó a T2 pero tienes conexión en T1? El bus interterminales gratuito sale justo fuera. Cuenta con 15-20 minutos de tiempo de conexión."
        },
        {
          label: "Salidas T2 Zona Tierra",
          description: "T2 es más sencilla de navegar que T1. Los mostradores de check-in y los accesos al control están en la misma planta.",
          services: [
            { name: "Check-in y Drop Bag", detail: "T2 opera principalmente con Vueling, Iberia Express y algunas low-cost. Mostradores bien señalizados." },
            { name: "Tren RENFE R2 Nord", detail: "La estación de tren está justo debajo de T2B. La opción más barata para llegar al centro." },
            { name: "WiFi y Servicios", detail: "Mismos servicios que T1: WiFi gratuito, cajeros, cafeterías en Zona Tierra." }
          ],
          tip: "Vueling y muchas aerolíneas low-cost operan desde T2. Confirma tu terminal en el email de la reserva o tarjeta de embarque."
        },
        {
          label: "Control de Seguridad T2",
          description: "El control de seguridad de T2 suele tener menos cola que T1. Mismas normas aplicables.",
          services: [
            { name: "Acceso Único por Módulo", detail: "Cada módulo de T2 (A, B, C) tiene su propio control de seguridad. Entra por el módulo correcto." },
            { name: "Asistencia", detail: "Mismo servicio que T1. Infórmate en el mostrador de la aerolínea." }
          ],
          tip: "T2 tiene 3 controles de seguridad separados (uno por módulo). Asegúrate de entrar por el módulo que corresponde a tu gate."
        },
        {
          label: "Zona Aire T2",
          description: "La Zona Aire de T2 es más pequeña pero ofrece los servicios esenciales: Duty Free, restauración y zonas de espera cómodas.",
          services: [
            { name: "Duty Free", detail: "Tienda principal en T2B. Alcohol, perfumes y tabaco libre de impuestos." },
            { name: "Cafeterías", detail: "Opciones de desayuno, snacks y comida caliente en cada módulo de T2." },
            { name: "Enchufes y Conectividad", detail: "WiFi gratuito y enchufes disponibles en las zonas de espera." }
          ],
          tip: "T2 es más tranquila y menos masificada que T1. Si tu vuelo sale de T2, llega con tiempo normal — raramente hay grandes colas."
        },
        {
          label: "Gates T2 (A, B, C)",
          description: "Los tres módulos de T2 son separados pero conectados por pasillo cubierto. No necesitas salir al exterior para moverte entre ellos.",
          services: [
            { name: "T2A, T2B, T2C", detail: "Conectados por pasillo climatizado. A pie, 5-10 minutos entre módulos." },
            { name: "Pantallas de Info", detail: "Gates numerados claramente. Mira las pantallas para confirmar tu gate (puede cambiar)." }
          ],
          tip: "En T2, siempre confirma tu gate en las pantallas de información justo antes de ir. Ocasionalmente se hacen cambios de última hora."
        }
      ]
    }
  },
  faq: {
    tagLocation: "Preguntas Frecuentes",
    title: "Dudas",
    titleHighlight: "resueltas",
    description: "Respuestas directas a las preguntas más comunes de los pasajeros en el Aeropuerto del Prat.",
    allTags: "Todos",
    items: [
      {
        tag: "Líquidos",
        question: "¿Puedo llevar agua en el equipaje de mano?",
        answer: "No puedes pasar agua comprada ANTES del control de seguridad. Independientemente de si la botella está llena o medio vacía, si es mayor de 100ml la tirarán. La solución: vacía la botella antes del control y rellénala en las fuentes de agua potable que hay dentro de la Zona Aire (son gratuitas), o cómprala dentro del aeropuerto una vez pasado el control. También puedes llevar una botella vacía y reutilizable."
      },
      {
        tag: "Electrónica",
        question: "¿Puedo llevar el ordenador dentro de la mochila sin sacarlo?",
        answer: "En la mayoría de controles en España y Europa, los ordenadores portátiles y tablets grandes deben salir de la mochila y colocarse en su propia bandeja separada. Esto se debe a que el escáner de rayos X necesita verlos con claridad. Algunos aeropuertos tienen escáneres de nueva generación (tomografía) donde no hace falta, pero en El Prat lo más seguro es sacar siempre el ordenador. ¿Por qué? Porque si el agente no lo ve bien, tendrás que abrir la mochila y hacerlo de todas formas, perdiendo más tiempo."
      },
      {
        tag: "Líquidos",
        question: "¿Cuántos mililitros puede tener cada recipiente de líquido?",
        answer: "La regla es sencilla: cada recipiente individual puede contener un máximo de 100 ml (o 100g para productos sólidos con textura de gel/pasta). El tamaño del envase es lo que importa, NO la cantidad de líquido dentro. Es decir, una botella de 200ml aunque esté llena solo a la mitad NO puede pasar. Todos tus recipientes de hasta 100ml deben caber en UNA bolsa zip de cierre hermético de 1 litro (aproximadamente 20x20 cm). Solo se permite UNA bolsa por pasajero."
      },
      {
        tag: "Líquidos",
        question: "¿Puedo llevar medicación líquida en más de 100ml?",
        answer: "Sí, los medicamentos líquidos con receta médica son una excepción a la regla de los 100ml. Debes presentar la medicación junto a la receta o prescripción médica en el control de seguridad. El personal la revisará y, si todo es correcto, podrás pasar con la cantidad necesaria para el viaje. Lleva siempre el envase original con el etiquetado farmacéutico. También aplica a insulina, jeringas (con certificado médico) y otros tratamientos especiales."
      },
      {
        tag: "Familias",
        question: "¿Puedo llevar leche o comida para bebé?",
        answer: "Sí, la leche materna, leche de fórmula, agua para bebés y comida para bebés son excepciones a la regla de líquidos. Puedes llevarlos en cantidad razonable para la duración del viaje. El personal puede pedirte que abras el envase y que lo pruebes tú mismo (una pequeña cantidad). No hace falta que lleves receta médica para esto, pero sí que tengas al bebé contigo. Si el niño no viaja contigo, puede haber complicaciones — lleva documentación médica."
      },
      {
        tag: "Planificación",
        question: "¿Cuánto tiempo antes debo estar en el aeropuerto?",
        answer: "La recomendación oficial de AENA y la mayoría de aerolíneas es: vuelos nacionales (Schengen) → 90 minutos antes de la hora de salida; vuelos internacionales extra-Schengen (UK, EEUU, Latinoamérica, etc.) → 2-3 horas antes. Estos tiempos son para tener el proceso de check-in, facturación de maletas, control de seguridad y llegada al gate completado con margen. En temporada alta (verano, Navidades, Semana Santa) añade 30-45 minutos extra a estas estimaciones."
      },
      {
        tag: "Seguridad",
        question: "¿Tengo que quitarme el cinturón y los zapatos?",
        answer: "El cinturón metálico normalmente sí debes quitártelo y ponerlo en la bandeja — activa el detector. Los zapatos en España y Europa NO es obligatorio quitarlos por norma general (a diferencia de EE.UU.), aunque si el arco de detección pita, el personal puede pedirte que te los quites para comprobarlo. Zapatos con mucho metal o suelas muy gruesas son más susceptibles de activar el detector. Consejo: lleva zapatos fáciles de poner/quitar si viajas mucho."
      },
      {
        tag: "Electrónica",
        question: "¿Dónde va el powerbank? ¿Mano o bodega?",
        answer: "Los powerbanks (baterías externas) SIEMPRE deben ir en el equipaje de mano, NUNCA en la maleta que va a bodega. Esto es por normativa de seguridad aérea internacional (las baterías de litio pueden inflamarse y en bodega no hay forma de actuar). En cuanto a capacidad: hasta 100Wh se puede llevar sin problema; entre 100Wh y 160Wh necesitas permiso de la aerolínea (consúltalo al hacer la reserva); por encima de 160Wh está completamente prohibido. La mayoría de powerbanks domésticos están por debajo de 100Wh."
      },
      {
        tag: "Líquidos",
        question: "¿Puedo llevar comida sólida en el equipaje de mano?",
        answer: "La comida sólida en general puede pasar el control de seguridad sin problema — sándwiches, fruta entera, snacks, galletas, chocolate, etc. Lo que tiene restricción es la comida con textura líquida o semilíquida: mermeladas, yogures, sopas, natillas, etc. si superan los 100ml. Atención: los quesos blandos tipo brie o philadelphia también pueden ser problemáticos. Si llevas comida en tápers, ábrelos si el agente lo solicita. Los alimentos congelados son generalmente OK."
      },
      {
        tag: "Planificación",
        question: "¿Puedo hacer el check-in online y no ir al mostrador?",
        answer: "Sí, y es muy recomendable. La mayoría de aerolíneas permiten el check-in online desde 24h (algunas hasta 48h) antes del vuelo. Si solo llevas equipaje de mano, puedes ir directamente al control de seguridad con tu tarjeta de embarque digital (en el móvil o impresa). Si necesitas facturar maleta, busca los kioscos de drop de equipaje (cintas automáticas) de tu aerolínea — son mucho más rápidos que hacer cola en el mostrador. Guarda la tarjeta de embarque en tu teléfono Y tenla descargada (sin necesidad de internet) por si acaso."
      },
      {
        tag: "Servicios",
        question: "¿Hay WiFi gratuito en el aeropuerto?",
        answer: "Sí, el Aeropuerto de Barcelona El Prat tiene WiFi gratuito en toda la terminal, tanto en Zona Tierra como en Zona Aire. La red se llama Wifi-BCN o similar. No tiene contraseña y la conexión es directa — simplemente selecciónala en tu dispositivo y acepta los términos de uso. La velocidad es suficiente para uso normal (email, redes sociales, streaming ligero). Para videoconferencias importantes o trabajos que requieran alta velocidad, considera usar tus datos móviles."
      },
      {
        tag: "Incidencias",
        question: "¿Qué hago si mi maleta no aparece en la cinta de llegadas?",
        answer: "Si tu maleta no aparece en 30-40 minutos desde que empezó a salir el equipaje de tu vuelo, NO salgas de la Zona de Llegadas. Dirígete al mostrador de Lost & Found (Objetos Perdidos / Equipajes) antes de salir. Está situado en la zona de llegadas. Necesitarás: tu tarjeta de embarque, el talón de equipaje (la pegatina que te dan en facturación) y tu documento de identidad. Te abrirán un expediente (PIR). Si la maleta aparece en los próximos días, la aerolínea la entregará en tu domicilio gratuitamente. Guarda el número de expediente."
      }
    ]
  },
  usefulLinks: {
    tagLocation: "Enlaces",
    title: "Todo lo que necesitas,",
    titleHighlight: "a un clic",
    description: "Enlaces oficiales y herramientas de consulta rápida para programar tu viaje con seguridad.",
    btnVisit: "Visitar Web",
    items: [
      {
        title: "Estado de Vuelos en Tiempo Real",
        description: "Consulta salidas, llegadas, retrasos y cancelaciones de tu vuelo en la web oficial de AENA.",
        badge: "Tiempo real"
      },
      {
        title: "Web Oficial del Aeropuerto",
        description: "Planos, servicios, información de terminales, parking y todo sobre el Aeropuerto El Prat de Barcelona."
      },
      {
        title: "Objetos Perdidos (Lost & Found)",
        description: "¿Has perdido algo en el aeropuerto o tu maleta no llegó? Reclama aquí en la web de AENA."
      },
      {
        title: "Asistencia para Personas con Movilidad Reducida",
        description: "Reserva gratuita de asistencia para personas con movilidad reducida (PMR) en AENA."
      },
      {
        title: "Aerobús — Compra de Billetes",
        description: "El autobús oficial. Conecta Plaza Cataluña con el aeropuerto en 35 min, 24h al día.",
        badge: "Descuento online"
      },
      {
        title: "Reserva de Parking AENA",
        description: "Reserva tu plaza de aparcamiento online y ahorra hasta un 30% frente al precio en taquilla.",
        badge: "Ahorra 30%"
      }
    ],
    quickInfo: [
      {
        label: "Horario del Aeropuerto",
        value: "Abierto 24 horas, 365 días al año"
      },
      {
        label: "Teléfono AENA (BCN)",
        value: "+34 913 211 000"
      },
      {
        label: "Tiempo mínimo antes de salida",
        value: "90 min Schengen · 2h Internacional"
      },
      {
        label: "Código IATA",
        value: "BCN · Código ICAO: LEBL"
      }
    ],
    disclaimer: {
      warning: "⚠️ Información orientativa.",
      text: "Las normas de seguridad, horarios y precios pueden cambiar. Siempre consulta ",
      linkAena: "la web oficial de AENA",
      textEnd: " y la web de tu aerolínea para información actualizada antes de volar."
    },
    ctaFooter: {
      title: "¡Buen viaje desde Barcelona!",
      description: "Con esta guía estás listo para llegar al aeropuerto, pasar el control sin estrés y disfrutar de tu vuelo. Comparte esta guía con alguien que la necesite.",
      btnPrimary: "Ver mi vuelo en AENA",
      btnSecondary: "Volver al inicio"
    }
  },
  footer: {
    rights: "© 2026 Guía Aeropuerto de Barcelona.",
    disclaimer: "Esta es una web informativa independiente y no tiene vinculación oficial con AENA ni con el Aeropuerto Josep Tarradellas Barcelona-El Prat. La información mostrada se proporciona con fines de ayuda al pasajero.",
    sections: {
      services: "Servicios del Aeropuerto",
      transport: "Transporte",
      usefulLinks: "Links Útiles",
    },
    links: {
      vip: "Salas VIP",
      dutyFree: "Duty Free y Tiendas",
      fastTrack: "Fast Track",
      parking: "Parking Oficial",
      aerobus: "Aerobús Oficial",
      metro: "Metro L9S",
      train: "Rodalies R2N",
      taxi: "Taxis y VTC",
      liveFlights: "AENA — Vuelos en directo",
      lostObjects: "Objetos Perdidos",
      faq: "Preguntas Frecuentes",
      pmr: "Asistencia PMR",
    },
    madeBy: "Hecho con",
    forPax: "para pasajeros de BCN"
  }
};
