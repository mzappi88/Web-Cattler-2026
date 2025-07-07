"use client"

import { useState, useEffect } from "react"

export type Country = "US" | "CA" | "AR" | "PY" | "UY" | "BO" | "BR" | "MX" | "OT"

type Language = "en" | "es" | "pt"

const countryLanguageMap: Record<Country, Language> = {
  US: "en",
  CA: "en",
  AR: "es",
  PY: "es",
  UY: "es",
  BO: "es",
  BR: "pt",
  MX: "es",
  OT: "en",
}

const translations = {
  en: {
    // Hero Section
    heroTitle: "The Complete Cattle Management Solution",
    getStarted: "Get Started Today",

    // Main Content
    mainTitle: "Transform Your Cattle Operation",
    mainSubtitle:
      "Join thousands of ranchers who trust Cattler to streamline their operations, increase productivity, and maximize profits.",

    // Features
    endPaperwork: "End Paperwork",
    endPaperworkDesc: "Digital records and automated reporting eliminate manual paperwork and reduce errors.",

    boostProductivity: "Boost Productivity",
    boostProductivityDesc: "Streamlined workflows and real-time data help you make faster, better decisions.",

    preventHealth: "Prevent Health Issues",
    preventHealthDesc: "Early detection and treatment protocols keep your cattle healthy and productive.",

    maximizeProfits: "Maximize Profits",
    maximizeProfitsDesc: "Optimize feed costs, track performance, and improve your bottom line.",

    // Form
    formTitle: "Start Your Free Trial",
    formSubtitleLanding: "See how Cattler can transform your operation. Get started with a personalized demo.",
    formSubtitleAds: "Join thousands of successful ranchers. Start your free trial today.",

    // Thank You
    thankYou: "Thank You!",
    thankYouLanding: "We'll be in touch soon to schedule your personalized demo.",
    thankYouAds: "Welcome to Cattler! Check your email for next steps.",

    // Cattler Features Page
    featuresMainTitle: "Save time & money with the most advanced Cattle Management Software",

    // Bullet Points
    bulletMultipleIntegrations: "Multiple Integrations & Multilingual (spanish included)",
    bulletAllDataOnePlace: "All your data in one place",
    bulletUserFriendly: "User friendly interface",

    // Feature Sections
    feedingTitle: "Feeding",
    feedingDesc:
      "Feed at any moment (online/offline) with any scale or device (iOS or Android). Manage your feed and medication stocks seamlessly. Create your rations, manage NEG, NEM, and DM%, and set delivery plans for each pen. Simple, informative bunk scoring that works offline.",

    cattleManagementTitle: "Cattle Management",
    cattleManagementDesc:
      "Take control of your feedlot operations with real-time tracking of movements, feeding, and weight gains. Effortlessly manage daily tasks. Mix lots across pens while maintaining individual or lot-level oversight. Access live closeout and breakeven insights.",

    animalHealthTitle: "Animal Health & Chute",
    animalHealthDesc:
      "Pen rider can track and treat animals in real-time from a phone. Seamlessly connect to main EID readers, whether in the pen or chute. Process cattle online or offline for greater flexibility. Manage pull-outs and the animal hospital with accurate records. Implement integrated treatment protocols for better health control.",

    accountManagementTitle: "Account Management & Billing",
    accountManagementDesc:
      "Instant billing with one click—all costs and expenses are seamlessly integrated into Cattler. Automated receivables alerts to stay on top of payments. Full financial oversight with real-time tracking and reporting. Grain bank management to track customer grain stocks with ease. QuickBooks integration coming soon!",

    advancedFeedingTitle: "Advanced Feeding",
    advancedFeedingDesc:
      "Feeding Protocols to plan and adjust feed for each lot in advance, with cost projections. Ration Step-Up Alerts to stay ahead of transitions. Automatically generate load & drop orders based on mixer capacity and pen distribution to optimize delivery. Speed up the bunk calling process with customizable scoring and call automation. Load & Drop Auto-Adjustment",

    // Learn More
    learnMore: "Learn more",

    // Why Choose Cattler
    whyChooseCattler: "Why Choose Cattler",
    comprehensiveSolution: "Comprehensive Solution",
    comprehensiveSolutionDesc:
      "From feeding to billing, Cattler offers a complete suite of tools for modern cattle management.",
    customizable: "Customizable",
    customizableDesc: "Tailor Cattler to your specific needs with flexible features and add-ons.",
    realTimeUpdates: "Real-time Updates",
    realTimeUpdatesDesc: "Stay informed with instant updates on cattle health, feeding, and financial data.",
    multiUserAccess: "Multi-User Access",
    multiUserAccessDesc: "Collaborate efficiently with role-based access for your entire team.",

    // CTA Section
    ctaTitle: "Ready to Revolutionize Your Cattle Management?",
    ctaSubtitle:
      "Join hundreds of satisfied cattlemen and feedlot operators who have transformed their operations with Cattler.",
    requestDemo: "Request Free Demo",

    // Countries
    "countries.US": "United States",
    "countries.CA": "Canada",
    "countries.AR": "Argentina",
    "countries.PY": "Paraguay",
    "countries.UY": "Uruguay",
    "countries.BO": "Bolivia",
    "countries.BR": "Brazil",
    "countries.MX": "Mexico",
    "countries.OT": "Other",
  },
  es: {
    // Hero Section
    heroTitle: "La Solución Completa de Gestión Ganadera",
    getStarted: "Comenzar Hoy",

    // Main Content
    mainTitle: "Transforma Tu Operación Ganadera",
    mainSubtitle:
      "Únete a miles de ganaderos que confían en Cattler para optimizar sus operaciones, aumentar la productividad y maximizar las ganancias.",

    // Features
    endPaperwork: "Elimina el Papeleo",
    endPaperworkDesc: "Registros digitales y reportes automatizados eliminan el papeleo manual y reducen errores.",

    boostProductivity: "Aumenta la Productividad",
    boostProductivityDesc:
      "Flujos de trabajo optimizados y datos en tiempo real te ayudan a tomar decisiones más rápidas y mejores.",

    preventHealth: "Previene Problemas de Salud",
    preventHealthDesc: "Detección temprana y protocolos de tratamiento mantienen tu ganado saludable y productivo.",

    maximizeProfits: "Maximiza las Ganancias",
    maximizeProfitsDesc: "Optimiza costos de alimentación, rastrea el rendimiento y mejora tu rentabilidad.",

    // Form
    formTitle: "Inicia Tu Prueba Gratuita",
    formSubtitleLanding: "Ve cómo Cattler puede transformar tu operación. Comienza con una demo personalizada.",
    formSubtitleAds: "Únete a miles de ganaderos exitosos. Inicia tu prueba gratuita hoy.",

    // Thank You
    thankYou: "¡Gracias!",
    thankYouLanding: "Nos pondremos en contacto pronto para programar tu demo personalizada.",
    thankYouAds: "¡Bienvenido a Cattler! Revisa tu email para los próximos pasos.",

    // Cattler Features Page
    featuresMainTitle: "Ahorra tiempo y dinero con el software de gestión ganadera más avanzado",

    // Bullet Points
    bulletMultipleIntegrations: "Múltiples Integraciones y Multiidioma (español incluido)",
    bulletAllDataOnePlace: "Todos tus datos en un solo lugar",
    bulletUserFriendly: "Interfaz fácil de usar",

    // Feature Sections
    feedingTitle: "Alimentación",
    feedingDesc:
      "Alimenta en cualquier momento (online/offline) con cualquier báscula o dispositivo (iOS o Android). Gestiona tus stocks de alimento y medicamentos sin problemas. Crea tus raciones, gestiona NEG, NEM y DM%, y establece planes de entrega para cada corral. Puntuación de comederos simple e informativa que funciona offline.",

    cattleManagementTitle: "Gestión de Ganado",
    cattleManagementDesc:
      "Toma control de tus operaciones de engorde con seguimiento en tiempo real de movimientos, alimentación y ganancias de peso. Gestiona tareas diarias sin esfuerzo. Mezcla lotes entre corrales manteniendo supervisión individual o por lote. Accede a información en vivo de cierre y punto de equilibrio.",

    animalHealthTitle: "Salud Animal y Manga",
    animalHealthDesc:
      "El jinete de corral puede rastrear y tratar animales en tiempo real desde un teléfono. Conecta sin problemas a lectores EID principales, ya sea en el corral o manga. Procesa ganado online u offline para mayor flexibilidad. Gestiona separaciones y el hospital animal con registros precisos. Implementa protocolos de tratamiento integrados para mejor control de salud.",

    accountManagementTitle: "Gestión de Cuentas y Facturación",
    accountManagementDesc:
      "Facturación instantánea con un clic: todos los costos y gastos están integrados perfectamente en Cattler. Alertas automatizadas de cuentas por cobrar para mantenerte al día con los pagos. Supervisión financiera completa con seguimiento y reportes en tiempo real. Gestión de banco de granos para rastrear stocks de granos de clientes con facilidad. ¡Integración con QuickBooks próximamente!",

    advancedFeedingTitle: "Alimentación Avanzada",
    advancedFeedingDesc:
      "Protocolos de Alimentación para planificar y ajustar alimento para cada lote por adelantado, con proyecciones de costos. Alertas de Incremento de Ración para adelantarse a las transiciones. Genera automáticamente órdenes de carga y entrega basadas en capacidad de mezcladora y distribución de corrales para optimizar la entrega. Acelera el proceso de llamada de comederos con puntuación personalizable y automatización de llamadas. Ajuste Automático de Carga y Entrega",

    // Learn More
    learnMore: "Saber más",

    // Why Choose Cattler
    whyChooseCattler: "Por Qué Elegir Cattler",
    comprehensiveSolution: "Solución Integral",
    comprehensiveSolutionDesc:
      "Desde alimentación hasta facturación, Cattler ofrece un conjunto completo de herramientas para la gestión ganadera moderna.",
    customizable: "Personalizable",
    customizableDesc: "Adapta Cattler a tus necesidades específicas con características flexibles y complementos.",
    realTimeUpdates: "Actualizaciones en Tiempo Real",
    realTimeUpdatesDesc:
      "Mantente informado con actualizaciones instantáneas sobre salud del ganado, alimentación y datos financieros.",
    multiUserAccess: "Acceso Multi-Usuario",
    multiUserAccessDesc: "Colabora eficientemente con acceso basado en roles para todo tu equipo.",

    // CTA Section
    ctaTitle: "¿Listo para Revolucionar tu Gestión Ganadera?",
    ctaSubtitle:
      "Únete a cientos de ganaderos y operadores de engorde satisfechos que han transformado sus operaciones con Cattler.",
    requestDemo: "Solicitar Demo Gratuita",

    // Countries
    "countries.US": "Estados Unidos",
    "countries.CA": "Canadá",
    "countries.AR": "Argentina",
    "countries.PY": "Paraguay",
    "countries.UY": "Uruguay",
    "countries.BO": "Bolivia",
    "countries.BR": "Brasil",
    "countries.MX": "México",
    "countries.OT": "Otro",
  },
  pt: {
    // Hero Section
    heroTitle: "A Solução Completa de Gestão de Gado",
    getStarted: "Comece Hoje",

    // Main Content
    mainTitle: "Transforme Sua Operação Pecuária",
    mainSubtitle:
      "Junte-se a milhares de pecuaristas que confiam no Cattler para otimizar suas operações, aumentar a produtividade e maximizar os lucros.",

    // Features
    endPaperwork: "Elimine a Papelada",
    endPaperworkDesc: "Registros digitais e relatórios automatizados eliminam a papelada manual e reduzem erros.",

    boostProductivity: "Aumente a Produtividade",
    boostProductivityDesc:
      "Fluxos de trabalho otimizados e dados em tempo real ajudam você a tomar decisões mais rápidas e melhores.",

    preventHealth: "Previna Problemas de Saúde",
    preventHealthDesc: "Detecção precoce e protocolos de tratamento mantêm seu gado saudável e produtivo.",

    maximizeProfits: "Maximize os Lucros",
    maximizeProfitsDesc: "Otimize custos de alimentação, acompanhe o desempenho e melhore sua rentabilidade.",

    // Form
    formTitle: "Inicie Sua Avaliação Gratuita",
    formSubtitleLanding:
      "Veja como o Cattler pode transformar sua operação. Comece com uma demonstração personalizada.",
    formSubtitleAds: "Junte-se a milhares de pecuaristas bem-sucedidos. Inicie sua avaliação gratuita hoje.",

    // Thank You
    thankYou: "Obrigado!",
    thankYouLanding: "Entraremos em contato em breve para agendar sua demonstração personalizada.",
    thankYouAds: "Bem-vindo ao Cattler! Verifique seu email para os próximos passos.",

    // Cattler Features Page
    featuresMainTitle: "Economize tempo e dinheiro com o software de gestão de gado mais avançado",

    // Bullet Points
    bulletMultipleIntegrations: "Múltiplas Integrações e Multilíngue (espanhol incluído)",
    bulletAllDataOnePlace: "Todos os seus dados em um só lugar",
    bulletUserFriendly: "Interface amigável ao usuário",

    // Feature Sections
    feedingTitle: "Alimentação",
    feedingDesc:
      "Alimente a qualquer momento (online/offline) com qualquer balança ou dispositivo (iOS ou Android). Gerencie seus estoques de ração e medicamentos sem problemas. Crie suas rações, gerencie NEG, NEM e DM%, e defina planos de entrega para cada curral. Pontuação de cocho simples e informativa que funciona offline.",

    cattleManagementTitle: "Gestão de Gado",
    cattleManagementDesc:
      "Assuma o controle de suas operações de confinamento com rastreamento em tempo real de movimentos, alimentação e ganhos de peso. Gerencie tarefas diárias sem esforço. Misture lotes entre currais mantendo supervisão individual ou por lote. Acesse informações ao vivo de fechamento e ponto de equilíbrio.",

    animalHealthTitle: "Saúde Animal e Tronco",
    animalHealthDesc:
      "O vaqueiro pode rastrear e tratar animais em tempo real pelo telefone. Conecte-se perfeitamente aos leitores EID principais, seja no curral ou tronco. Processe gado online ou offline para maior flexibilidade. Gerencie separações e o hospital animal com registros precisos. Implemente protocolos de tratamento integrados para melhor controle de saúde.",

    accountManagementTitle: "Gestão de Contas e Faturamento",
    accountManagementDesc:
      "Faturamento instantâneo com um clique—todos os custos e despesas estão perfeitamente integrados no Cattler. Alertas automatizados de contas a receber para manter-se em dia com os pagamentos. Supervisão financeira completa com rastreamento e relatórios em tempo real. Gestão de banco de grãos para rastrear estoques de grãos dos clientes com facilidade. Integração com QuickBooks em breve!",

    advancedFeedingTitle: "Alimentação Avançada",
    advancedFeedingDesc:
      "Protocolos de Alimentação para planejar e ajustar ração para cada lote antecipadamente, com projeções de custos. Alertas de Aumento de Ração para se antecipar às transições. Gere automaticamente ordens de carga e entrega baseadas na capacidade do misturador e distribuição de currais para otimizar a entrega. Acelere o processo de chamada de cocho com pontuação personalizável e automação de chamadas. Ajuste Automático de Carga e Entrega",

    // Learn More
    learnMore: "Saiba mais",

    // Why Choose Cattler
    whyChooseCattler: "Por Que Escolher o Cattler",
    comprehensiveSolution: "Solução Abrangente",
    comprehensiveSolutionDesc:
      "Da alimentação ao faturamento, o Cattler oferece um conjunto completo de ferramentas para gestão moderna de gado.",
    customizable: "Personalizável",
    customizableDesc: "Adapte o Cattler às suas necessidades específicas com recursos flexíveis e complementos.",
    realTimeUpdates: "Atualizações em Tempo Real",
    realTimeUpdatesDesc:
      "Mantenha-se informado com atualizações instantâneas sobre saúde do gado, alimentação e dados financeiros.",
    multiUserAccess: "Acesso Multi-Usuário",
    multiUserAccessDesc: "Colabore eficientemente com acesso baseado em funções para toda sua equipe.",

    // CTA Section
    ctaTitle: "Pronto para Revolucionar sua Gestão de Gado?",
    ctaSubtitle:
      "Junte-se a centenas de pecuaristas e operadores de confinamento satisfeitos que transformaram suas operações com o Cattler.",
    requestDemo: "Solicitar Demonstração Gratuita",

    // Countries
    "countries.US": "Estados Unidos",
    "countries.CA": "Canadá",
    "countries.AR": "Argentina",
    "countries.PY": "Paraguai",
    "countries.UY": "Uruguai",
    "countries.BO": "Bolívia",
    "countries.BR": "Brasil",
    "countries.MX": "México",
    "countries.OT": "Outro",
  },
}

export function useTranslation() {
  const [selectedCountry, setSelectedCountry] = useState<Country>("US")

  useEffect(() => {
    // Try to detect country from browser or localStorage
    const savedCountry = localStorage.getItem("cattler-country") as Country
    if (savedCountry) {
      setSelectedCountry(savedCountry)
    }
  }, [])

  useEffect(() => {
    // Save country selection
    localStorage.setItem("cattler-country", selectedCountry)
  }, [selectedCountry])

  const language = countryLanguageMap[selectedCountry]

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return {
    selectedCountry,
    setSelectedCountry,
    language,
    t,
  }
}
