"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useCountryDetection } from "./use-country-detection"


export type Country = "US" | "CA" | "AR" | "PY" | "UY" | "BO" | "BR" | "MX" | "OT$EN" | "OT$ES"

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

    // About Us Page
    "aboutUs.ourStory.title": "Our Story",
    "aboutUs.ourStory.paragraph1":
      "We are problem solvers, in constant search for solutions. We have been on this quest for some time, starting in 2019 by developing an automated sorting system for cattle, as well as a prototype for an animal weight predictor, using imagery.",
    "aboutUs.ourStory.paragraph2":
      "It was along these projects that we noticed about one key fact: data in the cattle industry is pretty difficult to collect, devices are isolated, and the information flow is fragmented, complicating the management of many cattle operations.",
    "aboutUs.ourStory.paragraph3":
      "It was at that moment that we decided to focus our attention on solving that lack of integration, with great potential for growth.",

    "aboutUs.founders.title": "Meet The Founders",
    "aboutUs.founders.ignacio.name": "Ignacio Albornoz",
    "aboutUs.founders.ignacio.title": "Co founder & CEO",
    "aboutUs.founders.ignacio.description":
      "Ignacio has been a cattle producer for some years, and later has spent several years innovating in the cattle & ag space. With an MSc in Industrial Economics and a past as a nerd debugging MS-DOS in the 90's, Ignacio is a mixture of different things, but more than anything, he likes to create and design products, get direct feedback from users, and then try to make it useful for customers.",

    "aboutUs.founders.ezequiel.name": "Ezequiel Conti",
    "aboutUs.founders.ezequiel.title": "Co founder & CTO",
    "aboutUs.founders.ezequiel.description":
      "Ezequiel is a physicist and end-to-end technologist who spent seven years in the National Space Agency from Argentina developing software for satellite launchers. So he knows a lot about installing software and hardware in extreme conditions. He also learned on a previous project to Cattler about dealing with technology in the cattle space, and also how to develop platforms.",

    "aboutUs.founders.martin.name": "Martín Garbulsky",
    "aboutUs.founders.martin.title": "Co founder & CIO",
    "aboutUs.founders.martin.description":
      "Martin is an experienced ag engineer focused on forage & satellite imagery. He is also a cattle farmer. As a PhD in terrestrial ecology and a principal researcher at CONICET (main national research agency in Argentina), he knows volumes about research & development in this area, and at Cattler he is in charge of everything related to new sensor products, and data quality in general.",

    "aboutUs.investors.title": "Our Investors & Supporters",
    "aboutUs.investors.producers.title": "Cattle Producers-Investors",
    "aboutUs.investors.producers.description":
      "We are proud to have more than 20 farmers from the United States and Argentina as our investors. Their trust and constant advice have proved essential in our growth and pushed us to constantly bring innovative solutions to producers. We are more committed than ever to serving farmers with the help of fellow farmers.",

    "aboutUs.investors.corporate.title": "VCs & Corporate Investors",
    "aboutUs.investors.corporate.description1":
      "Our project has been trusted by a diverse group of VCs and companies who have betted on us. Their resources, mentorship, and industry connections have been invaluable in helping us grow.",
    "aboutUs.investors.corporate.description2":
      "Our potential and innovation in the agtech industry have been recognized through our achievements in startup competitions such as SVG Ventures -Thrive Agrifood and Plug and Play.",

    // Hero Section
    heroTitle: "The Complete Cattle Management Solution",
    getStarted: "Get Started Now",

    // Main Content
    mainTitle: "Transform Your Cattle Operation",
    mainTitleWithCattler: "Transform your cattle operation",
    mainSubtitle:
      "Cattler is a livestock management software that centralizes all your feedlot operations in one platform.",
    mainSubtitleLine2:
      "From feeding and health to processing and inventory — everything you need in one place.",

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

    // Testimonials
    testimonialsTitle: "What Our Customers Say",
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
    "countries.OT": "Other",

    // Pricing CTA
    pricingCtaTitle: "Ready to Get Started?",
    pricingCtaSubtitle:
      "Choose the perfect plan for your operation. From small ranches to large feedlots, we have a solution that fits your needs and budget.",
    viewPlansAndPrices: "View Plans & Prices",

    // Video CTA Section
    videoCtaTitle: "Discover Cattler in Action",
    videoCtaSubtitle: "See how thousands of producers are transforming their cattle management",
    watchPresentationVideo: "Watch Presentation Video",
    presentationVideoUrl: "https://www.youtube.com/watch?v=cqYQBYMDLGU",
    videoNotAvailable: "Video not available",

    // Enhanced CTA Section
    enhancedCtaTitle: "Join the Cattle Revolution",
    enhancedCtaSubtitle: "Thousands of producers already trust Cattler to optimize their operations. Discover why we are the leading platform in cattle management.",
    cattleHeadCount: "1,200,000+",
    cattleHead: "Cattle Head per year",
    feedTon: "Feed Ton per day",
    feedTonCount: "7,000+",
    timeSaved: "Time saved per month",
    timeSavedCount: "40+",
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

    // About Us Page
    "aboutUs.ourStory.title": "Nuestra Historia",
    "aboutUs.ourStory.paragraph1":
      "Somos solucionadores de problemas, en constante búsqueda de soluciones. Hemos estado en esta búsqueda durante algún tiempo, comenzando en 2019 desarrollando un sistema automatizado de clasificación de ganado, así como un prototipo para un predictor de peso animal, utilizando imágenes.",
    "aboutUs.ourStory.paragraph2":
      "Fue durante estos proyectos que notamos un hecho clave: los datos en la industria ganadera son bastante difíciles de recopilar, los dispositivos están aislados y el flujo de información está fragmentado, complicando la gestión de muchas operaciones ganaderas.",
    "aboutUs.ourStory.paragraph3":
      "Fue en ese momento que decidimos enfocar nuestra atención en resolver esa falta de integración, con gran potencial de crecimiento.",

    "aboutUs.founders.title": "Conoce a los Fundadores",
    "aboutUs.founders.ignacio.name": "Ignacio Albornoz",
    "aboutUs.founders.ignacio.title": "Co fundador y CEO",
    "aboutUs.founders.ignacio.description":
      "Ignacio ha sido productor ganadero durante algunos años, y luego ha pasado varios años innovando en el espacio ganadero y agrícola. Con una Maestría en Economía Industrial y un pasado como nerd depurando MS-DOS en los 90, Ignacio es una mezcla de diferentes cosas, pero más que nada, le gusta crear y diseñar productos, obtener retroalimentación directa de los usuarios, y luego tratar de hacerlo útil para los clientes.",

    "aboutUs.founders.ezequiel.name": "Ezequiel Conti",
    "aboutUs.founders.ezequiel.title": "Co fundador y CTO",
    "aboutUs.founders.ezequiel.description":
      "Ezequiel es un físico y tecnólogo integral que pasó siete años en la Agencia Espacial Nacional de Argentina desarrollando software para lanzadores de satélites. Así que sabe mucho sobre instalar software y hardware en condiciones extremas. También aprendió en un proyecto anterior a Cattler sobre el manejo de tecnología en el espacio ganadero, y también cómo desarrollar plataformas.",

    "aboutUs.founders.martin.name": "Martín Garbulsky",
    "aboutUs.founders.martin.title": "Co fundador y CIO",
    "aboutUs.founders.martin.description":
      "Martín es un ingeniero agrónomo experimentado enfocado en forrajes e imágenes satelitales. También es ganadero. Como PhD en ecología terrestre e investigador principal en CONICET (principal agencia nacional de investigación en Argentina), sabe mucho sobre investigación y desarrollo en esta área, y en Cattler está a cargo de todo lo relacionado con nuevos productos de sensores y calidad de datos en general.",

    "aboutUs.investors.title": "Nuestros Inversores y Partidarios",
    "aboutUs.investors.producers.title": "Productores Ganaderos-Inversores",
    "aboutUs.investors.producers.description":
      "Estamos orgullosos de tener más de 20 ganaderos de Estados Unidos y Argentina como nuestros inversores. Su confianza y consejo constante han sido esenciales en nuestro crecimiento y nos han empujado a traer constantemente soluciones innovadoras a los productores. Estamos más comprometidos que nunca a servir a los ganaderos con la ayuda de compañeros ganaderos.",

    "aboutUs.investors.corporate.title": "VCs e Inversores Corporativos",
    "aboutUs.investors.corporate.description1":
      "Nuestro proyecto ha sido confiado por un grupo diverso de VCs y empresas que han apostado por nosotros. Sus recursos, mentoría y conexiones de la industria han sido invaluables para ayudarnos a crecer.",
    "aboutUs.investors.corporate.description2":
      "Nuestro potencial e innovación en la industria agtech han sido reconocidos a través de nuestros logros en competencias de startups como SVG Ventures -Thrive Agrifood y Plug and Play.",

    // Hero Section
    heroTitle: "La Solución Completa de Gestión Ganadera",
    getStarted: "Comenzar Hoy",

    // Main Content
    mainTitle: "Transforma Tu Operación Ganadera",
    mainTitleWithCattler: "Transforma tu operación ganadera",
    mainSubtitle:
      "Cattler es un software de gestión ganadera que centraliza toda la operación del feedlot en una sola plataforma — desde la alimentación y la salud hasta el procesamiento y el inventario.",

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
      "Elige el plan perfecto para tu operación. Desde pequeños ranchos hasta grandes feedlots, tenemos una solución que se adapta a tus necesidades y presupuesto.",
    viewPlansAndPrices: "Ver Planes y Precios",

    // Video CTA Section
    videoCtaTitle: "Descubre Cattler en Acción",
    videoCtaSubtitle: "Mira cómo miles de productores están transformando su gestión ganadera",
    watchPresentationVideo: "Ver Video de Presentación",
    presentationVideoUrl: "https://youtu.be/gQGAclpnnBo",

    // Enhanced CTA Section
    enhancedCtaTitle: "Unite a la Revolución Ganadera",
    enhancedCtaSubtitle: "Cada vez más ganaderos confían en Cattler para optimizar sus operaciones, aumentar la productividad y maximizar las ganancias.",
    cattleHeadCount: "1.200.000+",
    cattleHead: "Cabezas de Ganado al año",
    feedTon: "Toneladas de alimento por día",
    feedTonCount: "7.000+",
    timeSaved: "Tiempo ahorrado por mes",
    timeSavedCount: "40+",
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

    // About Us Page
    "aboutUs.ourStory.title": "Nossa História",
    "aboutUs.ourStory.paragraph1":
      "Somos solucionadores de problemas, em constante busca por soluções. Estamos nesta jornada há algum tempo, começando em 2019 desenvolvendo um sistema automatizado de classificação de gado, bem como um protótipo para um preditor de peso animal, usando imagens.",
    "aboutUs.ourStory.paragraph2":
      "Foi durante esses projetos que notamos um fato chave: os dados na indústria pecuária são bastante difíceis de coletar, os dispositivos estão isolados e o fluxo de informações está fragmentado, complicando a gestão de muitas operações pecuárias.",
    "aboutUs.ourStory.paragraph3":
      "Foi nesse momento que decidimos focar nossa atenção em resolver essa falta de integração, com grande potencial de crescimento.",

    "aboutUs.founders.title": "Conheça os Fundadores",
    "aboutUs.founders.ignacio.name": "Ignacio Albornoz",
    "aboutUs.founders.ignacio.title": "Co fundador e CEO",
    "aboutUs.founders.ignacio.description":
      "Ignacio tem sido produtor de gado por alguns anos, e depois passou vários anos inovando no espaço pecuário e agrícola. Com um MSc em Economia Industrial e um passado como nerd depurando MS-DOS nos anos 90, Ignacio é uma mistura de diferentes coisas, mas mais do que tudo, ele gosta de criar e projetar produtos, obter feedback direto dos usuários, e então tentar torná-lo útil para os clientes.",

    "aboutUs.founders.ezequiel.name": "Ezequiel Conti",
    "aboutUs.founders.ezequiel.title": "Co fundador e CTO",
    "aboutUs.founders.ezequiel.description":
      "Ezequiel é um físico e tecnólogo completo que passou sete anos na Agência Espacial Nacional da Argentina desenvolvendo software para lançadores de satélites. Então ele sabe muito sobre instalar software e hardware em condições extremas. Ele também aprendeu em um projeto anterior ao Cattler sobre lidar com tecnologia no espaço pecuário, e também como desenvolver plataformas.",

    "aboutUs.founders.martin.name": "Martín Garbulsky",
    "aboutUs.founders.martin.title": "Co fundador e CIO",
    "aboutUs.founders.martin.description":
      "Martín é um engenheiro agrônomo experiente focado em forragem e imagens de satélite. Ele também é pecuarista. Como PhD em ecologia terrestre e pesquisador principal no CONICET (principal agência nacional de pesquisa na Argentina), ele sabe muito sobre pesquisa e desenvolvimento nesta área, e no Cattler ele está encarregado de tudo relacionado a novos produtos de sensores e qualidade de dados em geral.",

    "aboutUs.investors.title": "Nossos Investidores e Apoiadores",
    "aboutUs.investors.producers.title": "Produtores de Gado-Investidores",
    "aboutUs.investors.producers.description":
      "Temos orgulho de ter mais de 20 fazendeiros dos Estados Unidos e Argentina como nossos investidores. Sua confiança e conselho constante têm sido essenciais em nosso crescimento e nos empurraram a constantemente trazer soluções inovadoras aos produtores. Estamos mais comprometidos do que nunca em servir fazendeiros com a ajuda de companheiros fazendeiros.",

    "aboutUs.investors.corporate.title": "VCs e Investidores Corporativos",
    "aboutUs.investors.corporate.description1":
      "Nosso projeto tem sido confiado por um grupo diverso de VCs e empresas que apostaram em nós. Seus recursos, mentoria e conexões da indústria têm sido inestimáveis para nos ajudar a crescer.",
    "aboutUs.investors.corporate.description2":
      "Nosso potencial e inovação na indústria agtech têm sido reconhecidos através de nossas conquistas em competições de startups como SVG Ventures -Thrive Agrifood e Plug and Play.",

    // Hero Section
    heroTitle: "A Solução Completa de Gestão de Gado",
    getStarted: "Comece Hoje",

    // Main Content
    mainTitle: "Transforme Sua Operação Pecuária",
    mainTitleWithCattler: "Transforme sua operação pecuária com",
    mainSubtitle:
      "Cattler é um software de gestão pecuária que centraliza toda a operação do confinamento em uma única plataforma — da alimentação e saúde ao processamento e estoque.",

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
    cattleHeadCount: "1.200.000+",
    cattleHead: "Cabeças de gado por ano",
    feedTon: "Toneladas de ração por dia",
    feedTonCount: "7.000+",
    timeSaved: "Tempo economizado por mês",
    timeSavedCount: "40+",
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

    // About Us Page
    "aboutUs.ourStory.title": "Nuestra Historia",
    "aboutUs.ourStory.paragraph1":
      "Somos solucionadores de problemas, en constante búsqueda de soluciones. Hemos estado en esta búsqueda durante algún tiempo, comenzando en 2019 desarrollando un sistema automatizado de clasificación de ganado, así como un prototipo para un predictor de peso animal, utilizando imágenes.",
    "aboutUs.ourStory.paragraph2":
      "Fue durante estos proyectos que notamos un hecho clave: los datos en la industria ganadera son bastante difíciles de recopilar, los dispositivos están aislados y el flujo de información está fragmentado, complicando la gestión de muchas operaciones ganaderas.",
    "aboutUs.ourStory.paragraph3":
      "Fue en ese momento que decidimos enfocar nuestra atención en resolver esa falta de integración, con gran potencial de crecimiento.",

    "aboutUs.founders.title": "Conoce a los Fundadores",
    "aboutUs.founders.ignacio.name": "Ignacio Albornoz",
    "aboutUs.founders.ignacio.title": "Co fundador y CEO",
    "aboutUs.founders.ignacio.description":
      "Ignacio ha sido productor ganadero durante algunos años, y luego ha pasado varios años innovando en el espacio ganadero y agrícola. Con una Maestría en Economía Industrial y un pasado como nerd depurando MS-DOS en los 90, Ignacio es una mezcla de diferentes cosas, pero más que nada, le gusta crear y diseñar productos, obtener retroalimentación directa de los usuarios, y luego tratar de hacerlo útil para los clientes.",

    "aboutUs.founders.ezequiel.name": "Ezequiel Conti",
    "aboutUs.founders.ezequiel.title": "Co fundador y CTO",
    "aboutUs.founders.ezequiel.description":
      "Ezequiel es un físico y tecnólogo integral que pasó siete años en la Agencia Espacial Nacional de Argentina desarrollando software para lanzadores de satélites. Así que sabe mucho sobre instalar software y hardware en condiciones extremas. También aprendió en un proyecto anterior a Cattler sobre el manejo de tecnología en el espacio ganadero, y también cómo desarrollar plataformas.",

    "aboutUs.founders.martin.name": "Martín Garbulsky",
    "aboutUs.founders.martin.title": "Co fundador y CIO",
    "aboutUs.founders.martin.description":
      "Martín es un ingeniero agrónomo experimentado enfocado en forrajes e imágenes satelitales. También es ganadero. Como PhD en ecología terrestre e investigador principal en CONICET (principal agencia nacional de investigación en Argentina), sabe mucho sobre investigación y desarrollo en esta área, y en Cattler está a cargo de todo lo relacionado con nuevos productos de sensores y calidad de datos en general.",

    "aboutUs.investors.title": "Nuestros Inversores y Partidarios",
    "aboutUs.investors.producers.title": "Productores Ganaderos-Inversores",
    "aboutUs.investors.producers.description":
      "Estamos orgullosos de tener más de 20 ganaderos de Estados Unidos y Argentina como nuestros inversores. Su confianza y consejo constante han sido esenciales en nuestro crecimiento y nos han empujado a traer constantemente soluciones innovadoras a los productores. Estamos más comprometidos que nunca a servir a los ganaderos con la ayuda de compañeros ganaderos.",

    "aboutUs.investors.corporate.title": "VCs e Inversores Corporativos",
    "aboutUs.investors.corporate.description1":
      "Nuestro proyecto ha sido confiado por un grupo diverso de VCs y empresas que han apostado por nosotros. Sus recursos, mentoría y conexiones de la industria han sido invaluables para ayudarnos a crecer.",
    "aboutUs.investors.corporate.description2":
      "Nuestro potencial e innovación en la industria agtech han sido reconocidos a través de nuestros logros en competencias de startups como SVG Ventures -Thrive Agrifood y Plug and Play.",

    // Hero Section
    heroTitle: "La Solución Completa de Gestión Ganadera",
    getStarted: "Comenzar Hoy",

    // Main Content
    mainTitle: "Transformá Tu Operación Ganadera",
    mainTitleWithCattler: "Transformá tu operación ganadera",
    mainSubtitle:
      "Cattler es un software de gestión ganadera que centraliza toda la operación del feedlot en una sola plataforma — desde la alimentación y la salud hasta el procesamiento y el inventario.",

    // Features
    endPaperwork: "Eliminá el Papeleo",
    endPaperworkDesc: "Registros digitales y reportes automatizados eliminan el papeleo manual y reducen errores.",

    boostProductivity: "Aumentá la Productividad",
    boostProductivityDesc:
      "Flujos de trabajo optimizados y datos en tiempo real te ayudan a tomar decisiones más rápidas y mejores.",

    preventHealth: "Prevení Problemas de Salud",
    preventHealthDesc: "Detección temprana y protocolos de tratamiento mantienen tu ganado saludable y productivo.",

    maximizeProfits: "Maximizá las Ganancias",
    maximizeProfitsDesc: "Optimiza costos de alimentación, rastrea el rendimiento y mejora tu rentabilidad.",

    // Form
    formTitle: "Iniciá Tu Prueba Gratuita",
    formSubtitleLanding: "Mirá cómo Cattler puede transformar tu operación. Comienza con una demo personalizada.",
    formSubtitleAds: "Cada vez más ganaderos confían en Cattler para optimizar sus operaciones, aumentar la productividad y maximizar las ganancias.",

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
      "Alimentá en cualquier momento (online/offline) con cualquier báscula o dispositivo (iOS o Android). Gestioná tus stocks de alimento y medicamentos sin problemas. Creá tus raciones, gestioná NEG, NEM y DM%, y establece planes de entrega para cada corral. Puntuación de comederos simple e informativa que funciona offline.",

    cattleManagementTitle: "Gestión de Ganado",
    cattleManagementDesc:
      "Tomá control de tus operaciones de engorde con seguimiento en tiempo real de movimientos, alimentación y ganancias de peso. Gestioná tareas diarias sin esfuerzo. Mezclá lotes entre corrales manteniendo supervisión individual o por lote. Accedé a información en vivo de cierre y punto de equilibrio.",

    animalHealthTitle: "Salud Animal y Manga",
    animalHealthDesc:
      "El recorredor puede rastrear y tratar animales en tiempo real desde un teléfono. Conectá sin problemas a lectores EID principales, ya sea en el corral o manga. Procesá ganado online u offline para mayor flexibilidad. Gestioná separaciones y el hospital animal con registros precisos. Implementá protocolos de tratamiento integrados para mejor control de salud.",

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
    customizableDesc: "Cattler se adapta a la realidad de tu operación con flexibilidad y capacidad de conectarse a cualquier indicador.",
    realTimeUpdates: "Actualizaciones en Tiempo Real",
    realTimeUpdatesDesc:
      "Mantené informado con actualizaciones instantáneas sobre salud del ganado, alimentación y datos financieros.",
    multiUserAccess: "Acceso Multi-Usuario",
    multiUserAccessDesc: "Colaborá eficientemente con acceso basado en roles para todo tu equipo.",

    // CTA Section
    ctaTitle: "¿Listo para Revolucionar tu Gestión Ganadera?",
    ctaSubtitle:
      "Cada vez más ganaderos confían en Cattler para optimizar sus operaciones, aumentar la productividad y maximizar las ganancias.",
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
    videoCtaSubtitle: "Mirá cómo miles de productores están transformando su gestión ganadera",
    watchPresentationVideo: "Ver Video de Presentación",
    presentationVideoUrl: "https://youtu.be/gQGAclpnnBo",

    // Enhanced CTA Section
    enhancedCtaTitle: "Unite a la Revolución Ganadera",
    enhancedCtaSubtitle: "Cada vez más ganaderos confían en Cattler para optimizar sus operaciones, aumentar la productividad y maximizar las ganancias.",
    cattleHeadCount: "1.200.000+",
    cattleHead: "Cabezas de Ganado al año",
    feedTon: "Toneladas de alimento por día",
    feedTonCount: "7.000+",
    timeSaved: "Tiempo ahorrado por mes",
    timeSavedCount: "40+",
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
  const language = useMemo(() => countryLanguageMap[selectedCountry], [selectedCountry])

  // Memoize current translations object
  const currentTranslations = useMemo(() => translations[language], [language])

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
