"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useCountryDetection } from "./use-country-detection"
import { aboutUsTranslations } from "./use-about-us"


export type Country = "US" | "CA" | "AR" | "PY" | "UY" | "BO" | "BR" | "MX" | "CH" | "OT$EN" | "OT$ES"

type Language = "en" | "es" | "pt" | "es-ar"

const countryLanguageMap: Record<Country, Language> = {
  US: "en",
  CA: "en",
  AR: "es-ar",
  PY: "es",
  UY: "es",
  BO: "es",
  BR: "pt",
  MX: "es",
  CH: "es",
  "OT$EN":"en",
  "OT$ES": "es",
}

const translations = {
  en: {
    // Navigation
    "navigation.home": "Home",
    "navigation.pricing": "Pricing",
    "navigation.aboutUs": "About Us",
    "navigation.login": "Log In",
    "navigation.requestDemo": "Request Free Demo",
    "navigation.getStarted": "Get Started",
    "navigation.callUs": "Call us",

    // Footer
    "footer.company": "Company",
    "footer.aboutCattler": "About Cattler",
    "footer.careers": "Careers",
    "footer.termsConditions": "Terms & Conditions",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.termsOfService": "Terms of Service",
    "footer.contact": "Contact",
    "footer.contactUs": "Contact Us",
    "footer.allRightsReserved": "All rights reserved",
    "footer.companyDescription": "Leading cattle management platform for modern ranchers and feedlot operators.",



    // Hero Section
    heroTitle: "The Complete Cattle Management Solution",
    getStarted: "Get Started Now",

    // Main Content
    mainTitle: "Transform Your Cattle Operation",
    mainTitleWithCattler: "Transform your cattle operation",
    mainSubtitle:
      "Cattle management software that centralizes all your feedlot operations in one platform.",
    mainSubtitleLine2:
      "From feeding and health to processing and inventory — everything you need in one place.",

    // Features
    endPaperwork: "End Paperwork",
    endPaperworkDesc: "Digital records and automated reporting eliminate manual paperwork and reduce errors.",

    boostProductivity: "Boost Productivity",
    boostProductivityDesc: "Streamlined workflows and real-time data help you make faster, better decisions.",

    preventHealth: "Improve health management",
    preventHealthDesc: "Digitize tasks, speed up chute-side work, and make better calls.",

    maximizeProfits: "Maximize Profits",
    maximizeProfitsDesc: "Optimize feed costs, track performance, and improve your bottom line.",

    // Form
    formTitle: "Start Your Free Trial",
    formSubtitleLanding: "See how Cattler can transform your operation. Get started with a personalized demo.",
    formSubtitleAds: "Join cattlemen transforming their operations. Start your free trial today.",

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

    // Testimonials
    testimonialsTitle: "What Our Members Say",
    watchVideo: "Watch Video",

    // Countries
    "countries.US": "United States",
    "countries.CA": "Canada",
    "countries.AR": "Argentina",
    "countries.PY": "Paraguay",
    "countries.UY": "Uruguay",
    "countries.BO": "Bolivia",
    "countries.BR": "Brazil",
    "countries.MX": "Mexico",
    "countries.CH": "Chile",
    "countries.OT": "Other",

    // Pricing CTA
    pricingCtaTitle: "Ready to Get Started?",
    pricingCtaSubtitle:
      "Choose the perfect plan for your operation. From small ranches to large feedlots, we have a solution that fits your needs and budget.",
    viewPlansAndPrices: "View Plans & Prices",

    // Video CTA Section
    videoCtaTitle: "Discover Cattler in Action",
    videoCtaSubtitle: "See how producers everywhere are transforming their cattle management",
    watchPresentationVideo: "Watch Presentation Video",
    presentationVideoUrl: "https://www.youtube.com/watch?v=cqYQBYMDLGU",
    videoNotAvailable: "Video not available",

    // Enhanced CTA Section
    enhancedCtaTitle: "Join the CattleR Digital Revolution",
    enhancedCtaSubtitle: "Producers everywhere are turning to Cattler to optimize their operations. Discover why we are the most innovative platform in cattle management.",
    cattleHeadCount: "1.2 million +",
    cattleHead: "Head of Cattle per year",
    feedTon: "Tons of Feed per day",
    feedTonCount: "7 thousand +",
    timeSaved: "Hours saved per month",
    timeSavedCount: "48+",
    implementation24h: "Implementation in 24 hours",
    specializedSupport: "Specialized technical support",
    automaticUpdates: "New updates every month",
    systemIntegration: "Integration with existing systems",
    explorePlansAndPrices: "Explore Plans & Prices",
    requestFreeDemo: "Request Free Demo",
    close: "Close",
  },
  es: {
    // Navigation
    "navigation.home": "Inicio",
    "navigation.pricing": "Precios",
    "navigation.aboutUs": "Sobre Nosotros",
    "navigation.login": "Iniciar Sesión",
    "navigation.requestDemo": "Solicitar Demo Gratuita",
    "navigation.getStarted": "Comenzar",
    "navigation.callUs": "Llámanos",

    // Footer
    "footer.company": "Empresa",
    "footer.aboutCattler": "Sobre Cattler",
    "footer.careers": "Carreras",
    "footer.termsConditions": "Términos y Condiciones",
    "footer.privacyPolicy": "Política de Privacidad",
    "footer.termsOfService": "Términos de Servicio",
    "footer.contact": "Contacto",
    "footer.contactUs": "Contáctenos",
    "footer.allRightsReserved": "Todos los derechos reservados",
    "footer.companyDescription":
      "Plataforma líder de gestión ganadera para ganaderos y operadores de feedlot modernos.",

    // Hero Section
    heroTitle: "La Solución Completa de Gestión Ganadera",
    getStarted: "Comenzar Hoy",

    // Main Content
    mainTitle: "Transforma Tu Operación Ganadera",
    mainTitleWithCattler: "Transforma tu operación ganadera",
    mainSubtitle:
      "Cattler es un software de gestión ganadera que centraliza toda la operación del feedlot en una sola plataforma.",
    mainSubtitleLine2:
      "Desde la alimentación y la salud hasta el procesamiento y el inventario, todo en un solo lugar.",
    // Features
    endPaperwork: "Elimina el Papeleo",
    endPaperworkDesc: "Registros digitales y reportes automatizados eliminan el papeleo manual y reducen errores.",

    boostProductivity: "Aumenta la Productividad",
    boostProductivityDesc:
      "Flujos de trabajo optimizados y datos en tiempo real te ayudan a tomar decisiones más rápidas y mejores.",

    preventHealth: "Mejora la gestión sanitaria con datos.",
    preventHealthDesc: "Digitaliza tareas, acelera el trabajo en la manga y toma mejores decisiones.",

    maximizeProfits: "Maximiza las Ganancias",
    maximizeProfitsDesc: "Optimiza costos de alimentación, rastrea el rendimiento y mejora tu rentabilidad.",

    // Form
    formTitle: "Inicia Tu Prueba Gratuita",
    formSubtitleLanding: "Comienza con una demo personalizada.",
    formSubtitleAds: "Únete a miles de ganaderos exitosos. Inicia tu prueba gratuita hoy.",

    // Thank You
    thankYou: "¡Gracias!",
    thankYouLanding: "Nos pondremos en contacto pronto para programar tu demo personalizada.",
    thankYouAds: "¡Bienvenido a Cattler! Revisa tu email para los próximos pasos.",

    // Cattler Features Page
    featuresMainTitle: "Ahorra tiempo y dinero con el software de gestión ganadera más avanzado",

    // Bullet Points
    bulletMultipleIntegrations: "Múltiples Integraciones y Multiidioma (portugués incluido)",
    bulletAllDataOnePlace: "Todos tus datos en un solo lugar",
    bulletUserFriendly: "Interfaz fácil de usar",

    // Feature Sections
    feedingTitle: "Alimentación",
    feedingDesc:
      "Alimenta en cualquier momento (online/offline) con cualquier báscula o dispositivo (iOS o Android). Gestiona tus stocks de alimento y medicamentos sin problemas. Crea tus raciones, gestiona ENG, ENM y MS%, y establece planes de entrega para cada corral. Lectura de comederos simple y ágil que funciona offline.",

    cattleManagementTitle: "Gestión de Ganado",
    cattleManagementDesc:
      "Toma control de tus operaciones de engorde con seguimiento en tiempo real de movimientos, alimentación y ganancias de peso. Gestiona tareas diarias sin esfuerzo. Mezcla lotes entre corrales manteniendo supervisión individual o por lote. Accede a información en vivo de cierre y punto de equilibrio.",

    animalHealthTitle: "Salud Animal y Manga",
    animalHealthDesc:
      "El Recorredor de corral puede rastrear y tratar animales en tiempo real desde un teléfono. Conecta sin problemas a lectores EID principales, ya sea en el corral o manga. Procesa ganado online u offline para mayor flexibilidad. Gestiona separaciones y el hospital animal con registros precisos. Implementa protocolos de tratamiento integrados para mejor control de salud.",

    accountManagementTitle: "Gestión de Cuentas y Facturación",
    accountManagementDesc:
      "Facturación instantánea con un clic: todos los costos y gastos están integrados perfectamente en Cattler. Alertas automatizadas de cuentas por cobrar para mantenerte al día con los pagos. Supervisión financiera completa con seguimiento y reportes en tiempo real.",

    advancedFeedingTitle: "Alimentación Avanzada",
    advancedFeedingDesc:
      "Protocolos de Alimentación para planificar y ajustar alimento para cada lote por adelantado, con proyecciones de costos. Alertas de Incremento de Ración para adelantarse a las transiciones. Genera automáticamente órdenes de carga y entrega basadas en capacidad de mezcladora y distribución de corrales para optimizar la entrega. Acelera el proceso de lectura de comederos con puntuación personalizada y automatización de ajustes. Ajuste Automático Objetivos entre Entrega y Entregas durante el día respetando la meta del corral.",

    // Learn More
    learnMore: "Conocer más",

    // Why Choose Cattler
    whyChooseCattler: "Por Qué Elegir Cattler",
    comprehensiveSolution: "Solución Integral",
    comprehensiveSolutionDesc:
      "Desde alimentación hasta facturación, Cattler ofrece un conjunto completo de herramientas para la gestión ganadera moderna.",
    customizable: "Personalizable",
    customizableDesc: "Cattler se adapta a tus necesidades específicas con características flexibles y módulos adicionales.",
    realTimeUpdates: "Actualizaciones en Tiempo Real",
    realTimeUpdatesDesc:
      "Mantente informado con alertas instantáneas sobre inventarios, salud del ganado y alimentación.",
    multiUserAccess: "Acceso Multi-Usuario",
    multiUserAccessDesc: "Facilita el trabajo en equipo con accesos personalizados según el rol de cada usuario.",

    // CTA Section
    ctaTitle: "¿Listo para Revolucionar tu Gestión Ganadera?",
    ctaSubtitle:
      "Únete a todos los ganaderos satisfechos que han transformado sus operaciones con Cattler.",
    requestDemo: "Solicitar Demo Gratuita",

    // Testimonials
    testimonialsTitle: "Lo Que Dicen Nuestros Clientes",
    watchVideo: "Ver Video",

    // Countries
    "countries.US": "Estados Unidos",
    "countries.CA": "Canadá",
    "countries.AR": "Argentina",
    "countries.PY": "Paraguay",
    "countries.UY": "Uruguay",
    "countries.BO": "Bolivia",
    "countries.BR": "Brasil",
    "countries.MX": "México",
    "countries.OT": "Otros",

    // Pricing CTA
    pricingCtaTitle: "¿Listo para Comenzar?",
    pricingCtaSubtitle:
      "Elige el plan perfecto para tu operación. Desde pequeñas operaciones hasta grandes feedlots, tenemos una solución que se adapta a tus necesidades y presupuesto.",
    viewPlansAndPrices: "Ver Planes y Precios",

    // Video CTA Section
    videoCtaTitle: "Descubre Cattler en Acción",
    videoCtaSubtitle: "Descubre como productores en todas partes del mundo están transformando su gestión ganadera",
    watchPresentationVideo: "Ver Video de Presentación",
    presentationVideoUrl: "https://youtu.be/gQGAclpnnBo",

    // Enhanced CTA Section
    enhancedCtaTitle: "Unite a la Revolución Ganadera",
    enhancedCtaSubtitle: "Cada vez más ganaderos confían en Cattler para optimizar sus operaciones, aumentar la productividad y maximizar las ganancias.",
    cattleHeadCount: "+1,2 millones",
    cattleHead: "Cabezas de Ganado al año",
    feedTon: "Toneladas de alimento por día",
    feedTonCount: "+7 mil",
    timeSaved: "Horas ahorradas por mes",
    timeSavedCount: "+48",
    implementation24h: "Implementación en 24 horas",
    specializedSupport: "Soporte técnico especializado",
    automaticUpdates: "Actualizaciones todos los meses",
    systemIntegration: "Integración con sistemas existentes",
    explorePlansAndPrices: "Explorar Planes y Precios",
    requestFreeDemo: "Solicitar Demo Gratuita",
    close: "Cerrar",
    videoNotAvailable: "Video no disponible",
  },
  pt: {
    // Navigation
    "navigation.home": "Início",
    "navigation.pricing": "Preços",
    "navigation.aboutUs": "Sobre Nós",
    "navigation.login": "Entrar",
    "navigation.requestDemo": "Solicitar Demo Gratuita",
    "navigation.getStarted": "Começar Agora",
    "navigation.callUs": "Ligue para nós",

    // Footer
    "footer.company": "Empresa",
    "footer.aboutCattler": "Sobre a Cattler",
    "footer.careers": "Carreiras",
    "footer.termsConditions": "Termos e Condições",
    "footer.privacyPolicy": "Política de Privacidade",
    "footer.termsOfService": "Termos de Serviço",
    "footer.contact": "Contato",
    "footer.contactUs": "Entre em Contato",
    "footer.allRightsReserved": "Todos os direitos reservados",
    "footer.companyDescription":
      "Plataforma líder de gestão de gado para pecuaristas e operadores de confinamento modernos.",

    // Hero Section
    heroTitle: "A Solução Completa de Gestão de Gado",
    getStarted: "Comece Hoje",

    // Main Content
    mainTitle: "Transforme Sua Operação Pecuária",
    mainTitleWithCattler: "Transforme sua operação pecuária com",
    mainSubtitle:
      "Cattler é um software de gestão pecuária que centraliza toda a operação do confinamento em uma única plataforma.",
    mainSubtitleLine2:
      "Da alimentação e saúde ao processamento e estoque, tudo em um só lugar.",
    // Features
    endPaperwork: "Elimine a Papelada",
    endPaperworkDesc: "Registros digitais e relatórios automatizados eliminam a papelada manual e reduzem erros.",

    boostProductivity: "Aumente a Produtividade",
    boostProductivityDesc:
      "Fluxos de trabalho otimizados e dados em tempo real ajudam você a tomar decisões mais rápidas e melhores.",

    preventHealth: "Melhore a gestão sanitária com dados",
    preventHealthDesc: "Digitalize tarefas, agilize o trabalho no curral e tome decisões mais precisas.",

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
      "Alimente a qualquer momento (online/offline) com qualquer balança ou dispositivo (iOS ou Android). Gerencie seus estoques de ração e medicamentos sem problemas. Crie suas rações, gerencie ENG, ENM e MS%, e defina planos de entrega para cada curral. Leitura de cocho simples e agil que funciona offline.",

    cattleManagementTitle: "Gestão de Gado",
    cattleManagementDesc:
      "Assuma o controle de suas operações de confinamento com rastreamento em tempo real de movimentos, alimentação e ganhos de peso. Gerencie tarefas diárias sem esforço. Misture lotes entre currais mantendo supervisão individual ou por lote. Acesse informações ao vivo de fechamento e ponto de equilíbrio.",

    animalHealthTitle: "Saúde Animal e Tronco",
    animalHealthDesc:
      "O vaqueiro pode rastrear e tratar animais em tempo real pelo telefone. Conecte-se perfeitamente aos leitores EID principais, seja no curral ou tronco. Processe gado online ou offline para maior flexibilidade. Gerencie separações e o hospital animal com registros precisos. Implemente protocolos de tratamento integrados para melhor controle de saúde.",

    accountManagementTitle: "Gestão de Contas e Faturamento",
    accountManagementDesc:
      "Faturamento instantâneo com um clique—todos os custos e despesas estão perfeitamente integrados no Cattler. Alertas automatizados de contas a receber para manter-se em dia com os pagamentos. Supervisão financeira completa com rastreamento e relatórios em tempo real. Gestão de banco de grãos para rastrear estoques de grãos dos clientes com facilidade. Integração com QuickBooks em breve!",

    advancedFeedingTitle: "Alimentação Avanzada",
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
      "Mantenha-se informado com atualizações instantâneas sobre saúde do gado, alimentação e dados financieros.",
    multiUserAccess: "Acesso Multi-Usuário",
    multiUserAccessDesc: "Colabore eficientemente com acesso baseado em funções para toda sua equipe.",

    // CTA Section
    ctaTitle: "Pronto para Revolucionar sua Gestão de Gado?",
    ctaSubtitle:
      "Junte-se a centenas de pecuaristas e operadores de confinamento satisfeitos que transformaram suas operações com o Cattler.",
    requestDemo: "Solicitar Demonstração Gratuita",

    // Testimonials
    testimonialsTitle: "O Que Nossos Clientes Dizem",
    watchVideo: "Assistir Vídeo",

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

    // Pricing CTA
    pricingCtaTitle: "Pronto para Começar?",
    pricingCtaSubtitle:
      "Escolha o plano perfeito para sua operação. De pequenas fazendas a grandes confinamentos, temos uma solução que se adapta às suas necessidades e orçamento.",
    viewPlansAndPrices: "Ver Planos e Preços",

    // Video CTA Section
    videoCtaTitle: "Descubra o Cattler em Ação",
    videoCtaSubtitle: "Veja como milhares de produtores estão transformando sua gestão de gado",
    watchPresentationVideo: "Assistir Vídeo de Apresentação",
    presentationVideoUrl: "https://youtu.be/gQGAclpnnBo",

    // Enhanced CTA Section
    enhancedCtaTitle: "Junte-se à Revolução Pecuária",
    enhancedCtaSubtitle: "Milhares de produtores já confiam no Cattler para otimizar suas operações. Descubra por que somos a plataforma líder em gestão de gado.",
    cattleHeadCount: "+1,2 milhões",
    cattleHead: "Cabeças de gado por ano",
    feedTon: "Toneladas de ração por dia",
    feedTonCount: "+7 mil",
    timeSaved: "Horas economizadas por mês",
    timeSavedCount: "+48",
    implementation24h: "Implementação em 24 horas",
    specializedSupport: "Suporte técnico especializado",
    automaticUpdates: "Atualizações automáticas",
    systemIntegration: "Integração com sistemas existentes",
    explorePlansAndPrices: "Explorar Planos e Preços",
    requestFreeDemo: "Solicitar Demo Gratuita",
    close: "Fechar",
    videoNotAvailable: "Vídeo não disponível",
  },
  "es-ar": {
    // Navigation
    "navigation.home": "Inicio",
    "navigation.pricing": "Precios",
    "navigation.aboutUs": "Sobre Nosotros",
    "navigation.login": "Iniciar Sesión",
    "navigation.requestDemo": "Solicitar Demo Gratuita",
    "navigation.getStarted": "Comenzar",
    "navigation.callUs": "Llámanos",

    // Footer
    "footer.company": "Empresa",
    "footer.aboutCattler": "Sobre Cattler",
    "footer.careers": "Carreras",
    "footer.termsConditions": "Términos y Condiciones",
    "footer.privacyPolicy": "Política de Privacidad",
    "footer.termsOfService": "Términos de Servicio",
    "footer.contact": "Contacto",
    "footer.contactUs": "Contáctenos",
    "footer.allRightsReserved": "Todos los derechos reservados",
    "footer.companyDescription":
      "Plataforma líder de gestión ganadera para ganaderos y operadores de feedlot modernos.",

    // Hero Section
    heroTitle: "La Solución Completa de Gestión Ganadera",
    getStarted: "Comenzar Hoy",

    // Main Content
    mainTitle: "Transformá Tu Operación Ganadera",
    mainTitleWithCattler: "Transformá tu operación ganadera",
    mainSubtitle:
      "Cattler es un software de gestión ganadera que centraliza toda la operación del feedlot en una sola plataforma",
    mainSubtitleLine2:
      "Desde la alimentación y la salud hasta el procesamiento y el inventario, todo en un solo lugar.",
    // Features
    endPaperwork: "Eliminá el Papeleo",
    endPaperworkDesc: "Registros digitales y reportes automatizados eliminan el papeleo manual y reducen errores.",

    boostProductivity: "Aumentá la Productividad",
    boostProductivityDesc:
      "Flujos de trabajo optimizados y datos en tiempo real te ayudan a tomar decisiones más rápidas y mejores.",

    preventHealth: "Potenciá la salud animal con datos.",
    preventHealthDesc: "Digitalizá tareas, acelerá el trabajo en la manga y tomá mejores decisiones.",

    maximizeProfits: "Maximizá las Ganancias",
    maximizeProfitsDesc: "Optimiza costos de alimentación, rastrea el rendimiento y mejora tu rentabilidad.",

    // Form
    formTitle: "Iniciá Tu Prueba Gratuita",
    formSubtitleLanding: "Comienza con una demo personalizada.",
    formSubtitleAds: "Cada vez más ganaderos confían en Cattler para optimizar sus operaciones, aumentar la productividad y maximizar las ganancias.",

    // Thank You
    thankYou: "¡Gracias!",
    thankYouLanding: "Nos pondremos en contacto pronto para programar tu demo personalizada.",
    thankYouAds: "¡Bienvenido a Cattler! Revisa tu email para los próximos pasos.",

    // Cattler Features Page
    featuresMainTitle: "Ahorra tiempo y dinero con el software de gestión ganadera más avanzado",

    // Bullet Points
    bulletMultipleIntegrations: "Múltiples Integraciones y Multiidioma (portugués incluido)",
    bulletAllDataOnePlace: "Todos tus datos en un solo lugar",
    bulletUserFriendly: "Interfaz fácil de usar",

    // Feature Sections
    feedingTitle: "Alimentación",
    feedingDesc:
      "Alimentá en cualquier momento (online/offline) con cualquier báscula o dispositivo (iOS o Android). Gestioná tus stocks de alimento y medicamentos sin problemas. Creá tus raciones, gestioná ENG, ENM y MS%, y establece planes de entrega para cada corral. Lectura de comederos simple y ágil que funciona offline.",

    cattleManagementTitle: "Gestión de Ganado",
    cattleManagementDesc:
      "Tomá control de tus operaciones de engorde con seguimiento en tiempo real de movimientos, alimentación y ganancias de peso. Gestioná tareas diarias sin esfuerzo. Mezclá lotes entre corrales manteniendo supervisión individual o por lote. Accedé a información en vivo de cierre y punto de equilibrio.",

    animalHealthTitle: "Salud Animal y Manga",
    animalHealthDesc:
      "El Recorredor puede rastrear y tratar animales en tiempo real desde un teléfono. Conectá sin problemas a lectores de Caravanas Electrónicas principales, ya sea en el corral o manga. Procesá ganado online u offline para mayor flexibilidad. Gestioná separaciones y el hospital animal con registros precisos. Implementá protocolos de tratamiento integrados para mejor control de salud.",

    accountManagementTitle: "Gestión de Cuentas y Facturación",
    accountManagementDesc:
      "Facturación instantánea con un clic: todos los costos y gastos están integrados perfectamente en Cattler. Alertas automatizadas de cuentas por cobrar para mantenerte al día con los pagos. Supervisión financiera completa con seguimiento y reportes en tiempo real.",

    advancedFeedingTitle: "Alimentación Avanzada",
    advancedFeedingDesc:
      "Protocolos de Alimentación para planificar y ajustar alimento para cada lote por adelantado, con proyecciones de costos. Alertas de Incremento de Ración para adelantarse a las transiciones. Genera automáticamente órdenes de carga y entrega basadas en capacidad de mezcladora y distribución de corrales para optimizar la entrega. Acelera el proceso lectura de comederos con puntuación personalizada y automatización de ajustes. Ajuste Automático Objetivos entre Entrega y Entregas durante el día respetando la meta del corral.",


    // Learn More
    learnMore: "Conocer más",

    // Why Choose Cattler
    whyChooseCattler: "Por Qué Elegir Cattler",
    comprehensiveSolution: "Solución Integral",
    comprehensiveSolutionDesc:
      "Desde alimentación hasta facturación, Cattler ofrece un conjunto completo de herramientas para la gestión ganadera moderna.",
    customizable: "Personalizable",
    customizableDesc: "Cattler se adapta a tus necesidades específicas con características flexibles y módulos adicionales.",
    realTimeUpdates: "Actualizaciones en Tiempo Real",
    realTimeUpdatesDesc:
      "Mantenete informado con alertas instantáneas sobre inventarios, salud del ganado y alimentación.",
    multiUserAccess: "Acceso Multi-Usuario",
    multiUserAccessDesc: "Facilitá el trabajo en equipo con accesos personalizados según el rol de cada usuario.",

    // CTA Section
    ctaTitle: "¿Listo para Revolucionar tu Gestión Ganadera?",
    ctaSubtitle:
        "Unite a todos los ganaderos satisfechos que han transformado sus operaciones con Cattler.",
      requestDemo: "Solicitar Demo Gratuita",

    // Testimonials
    testimonialsTitle: "Lo Que Dicen Nuestros Clientes",
    watchVideo: "Ver Video",

    // Countries
    "countries.US": "Estados Unidos",
    "countries.CA": "Canadá",
    "countries.AR": "Argentina",
    "countries.PY": "Paraguay",
    "countries.UY": "Uruguay",
    "countries.BO": "Bolivia",
    "countries.BR": "Brasil",
    "countries.MX": "México",
    "countries.OT": "Otros",

    // Pricing CTA
    pricingCtaTitle: "¿Listo para Comenzar?",
    pricingCtaSubtitle:
      "Eligí el plan perfecto para tu operación. Desde pequeñas operaciones hasta grandes feedlots, tenemos una solución que se adapta a tus necesidades y presupuesto.",
    viewPlansAndPrices: "Ver Planes y Precios",

    // Video CTA Section
    videoCtaTitle: "Descubre Cattler en Acción",
    videoCtaSubtitle: "Mirá cómo productores en todas partes del mundo están transformando su gestión ganadera",
    watchPresentationVideo: "Ver Video de Presentación",
    presentationVideoUrl: "https://youtu.be/gQGAclpnnBo",

    // Enhanced CTA Section
    enhancedCtaTitle: "Unite a la Revolución Ganadera",
    enhancedCtaSubtitle: "Cada vez más ganaderos confían en Cattler para optimizar sus operaciones, aumentar la productividad y maximizar las ganancias.",
    cattleHeadCount: "+1,2 millones",
    cattleHead: "Cabezas de Ganado al año",
    feedTon: "Toneladas de alimento por día",
    feedTonCount: "+7 mil",
    timeSaved: "Horas ahorradas por mes",
    timeSavedCount: "+48",
    implementation24h: "Implementación en 24 horas",
    specializedSupport: "Soporte técnico especializado",
    automaticUpdates: "Actualizaciones todos los meses",
    systemIntegration: "Integración con sistemas existentes",
    explorePlansAndPrices: "Explorar Planes y Precios",
    requestFreeDemo: "Solicitar Demo Gratuita",
    close: "Cerrar",
    videoNotAvailable: "Video no disponible",
  },
}

export function useTranslation() {
  const [selectedCountry, setSelectedCountry] = useState<Country>("US")
  const [isHydrated, setIsHydrated] = useState(false)
  const { detectedCountry, isDetecting } = useCountryDetection()

  // Initialize from localStorage on mount
  useEffect(() => {
    // Ensure we're on the client side
    if (typeof window === 'undefined') {
      setIsHydrated(true);
      return;
    }

    const savedCountry = localStorage.getItem("cattler-country") as Country
    const hasBeenDetected = localStorage.getItem("cattler-country-detected") === "true"
    
    if (detectedCountry && !isDetecting) {
      // Si es la primera vez o no hay país guardado, usar el detectado automáticamente
      if (!hasBeenDetected || !savedCountry) {
        setSelectedCountry(detectedCountry)
        localStorage.setItem("cattler-country", detectedCountry)
        localStorage.setItem("cattler-country-detected", "true")
      } else if (savedCountry && Object.keys(countryLanguageMap).includes(savedCountry)) {
        // Si ya se ha detectado antes, usar el guardado
        setSelectedCountry(savedCountry)
      }
    } else if (savedCountry && Object.keys(countryLanguageMap).includes(savedCountry)) {
      // Fallback: usar el guardado si no hay detección
      setSelectedCountry(savedCountry)
    }
    setIsHydrated(true)
  }, [detectedCountry, isDetecting])

  // Save to localStorage when country changes
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      localStorage.setItem("cattler-country", selectedCountry)
    }
  }, [selectedCountry, isHydrated])

  const handleCountryChange = useCallback((country: Country) => {
    setSelectedCountry(country)
  }, [])

  // Memoize language to prevent unnecessary recalculations
  const language = useMemo(() => {
    const mappedLanguage = countryLanguageMap[selectedCountry];
    if (!mappedLanguage) {
      console.warn(`No language mapping found for country: ${selectedCountry}, falling back to 'en'`);
      return "en";
    }
    return mappedLanguage;
  }, [selectedCountry])

  // Memoize current translations object
  const currentTranslations = useMemo(() => {
    const baseTranslations = translations[language]
    const aboutUsTranslationsForLanguage = aboutUsTranslations[language]
    
    if (!baseTranslations) {
      console.warn(`No base translations found for language: ${language}, falling back to 'en'`);
      return translations.en;
    }
    
    // Merge base translations with about us translations
    return {
      ...baseTranslations,
      ...aboutUsTranslationsForLanguage
    }
  }, [language])

  // Translation function that updates immediately when language changes
  const t = useCallback(
    (key: string): any => {
      const translation = currentTranslations?.[key as keyof typeof currentTranslations]
      if (translation === undefined) {
        console.warn(`Translation missing for key: ${key} in language: ${language}`)
        return key
      }
      return translation
    },
    [currentTranslations, language],
  )

  return {
    selectedCountry,
    setSelectedCountry: handleCountryChange,
    language,
    t,
    isHydrated,
  }
}

// Helper function to get the appropriate pricing URL based on country
export function getPricingUrl(country: Country): string {
  switch (country) {
    case "AR":
    case "UY":
    case "PY":
    case "BO":
    case "MX":
    case "CH":
    case "OT$ES":
      return "https://www.cattler.com.ar/precios";
    case "BR":
      return "https://cattler.agr.br/precos";
    case "US":
    case "CA":
    case "OT$EN":
      return "https://cattler.farm/getstarted";
    default:
      return "https://cattler.farm/getstarted"; // Default fallback
  }
}

// Helper function to get the appropriate demo URL based on country
export function getDemoUrl(country: Country): string {
  switch (country) {
    case "AR":
    case "UY":
    case "PY":
    case "BO":
    case "MX":
    case "CH":
    case "OT$ES":
      return "https://cattler.com.ar/demo";
    case "BR":
      return "https://cattler.agr.br/demo";
    case "US":
    case "CA":
    case "OT$EN":
      return "https://cattler.farm/demo";
    default:
      return "https://cattler.farm/demo"; // Default fallback
  }
}
