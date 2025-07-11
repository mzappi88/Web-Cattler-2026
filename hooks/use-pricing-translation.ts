"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useTranslation } from "@/hooks/TranslationProvider";


export type Country = "US" | "CA" | "AR" | "PY" | "UY" | "BO" | "BR" | "MX" | "OT-EN" | "OT-ES"

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
  "OT-EN": "en",
  "OT-ES": "es",
}

const countryCurrencyMap: Record<Country, string> = {
  US: "$",
  CA: "$",
  AR: "kg",
  PY: "$",
  UY: "$",
  BO: "$",
  BR: "R$",
  MX: "$",
  "OT-EN": "$",
  "OT-ES": "$",
}

const pricingTranslations = {
  en: {
    // Page titles
    pricingTitle: "Choose Your Feedlot Plan",
    pricingSubtitle:
      "Complete feedlot management solutions designed to optimize your operations. From basic feeding to advanced analytics.",

    // Plan names
    planLite: "FEEDLOT LITE",
    planGo: "FEEDLOT GO",
    planFlex: "FEEDLOT FLEX",
    planPro: "FEEDLOT PRO",

    // Plan descriptions
    planLiteDesc: "Basic solution for small operations",
    planGoDesc: "For producers seeking nutritional planning",
    planFlexDesc: "For those who want precise chute management",
    planProDesc: "For those who demand excellence in health and herd analysis",

    // Common terms
    pens: "Pens",
    users: "Users",
    perMonth: "per month",
    perYear: "per year",
    annually: "annually",
    monthly: "monthly",
    getStarted: "Get Started",
    mostPopular: "Most Popular",

    // Billing
    billingCycle: "Billing Cycle",
    monthlyBilling: "Monthly",
    annualBilling: "Annual (10% discount)",
    annualSavings: "Save with annual billing",

    // Features
    feeding: "Feeding",
    cattleManagement: "Cattle Management",
    suppliesInventory: "Supplies Inventory",
    dietManagement: "Diet Management",
    advancedFeeding: "Advanced Feeding",
    animalHealth: "Animal Health",
    chute: "Chute",
    tagReaderIntegration: "Tag Reader Integration",
    premixGeneration: "Premix Generation",
    analytics: "Analytics",
    marketValueReport: "Market Value Report",

    // Add-ons
    addOnsTitle: "Available Add-ons",
    addOnsSubtitle: "Click on an add-on to purchase it for your existing Feedlot plan",
    customFeederModule: "customFeeder Module",
    customFeederModuleDesc: "Complete management for customFeeder operations with multiple clients",
    clientUsers: "Client Users",
    clientUsersDesc: "Additional users for specific clients",

    // Checkout
    checkoutTitle: "Complete Your Order",
    checkoutSubtitle: "Customize your plan with additional features",
    contactInfo: "Contact Information",
    orderSummary: "Order Summary",
    fullName: "Full Name",
    emailAddress: "Email Address",
    companyName: "Company Name",
    phoneNumber: "Phone Number",
    additionalPens: "Additional Pens",
    additionalUsers: "Additional Users",
    total: "Total",
    continueToPayment: "Continue to Payment",

    // Payment
    paymentTitle: "Payment Information",
    paymentSubtitle: "Complete your subscription securely",
    cardDetails: "Card Details",
    cardholderName: "Cardholder Name",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
    billingAddress: "Billing Address",
    address: "Address",
    city: "City",
    state: "State",
    zipCode: "ZIP Code",
    country: "Country",
    finalizePayment: "Finalize Payment",
    securePayment: "Secure Payment",

    // Feedlot Info
    feedlotInfoTitle: "Feedlot Information",
    feedlotInfoSubtitle: "Tell us more about your operation to customize your experience",
    companyInfo: "Company Information",
    location: "Location",
    operationInfo: "Operation Information",
    totalCapacity: "Total Capacity (head)",
    currentHeadCount: "Current Head Count",
    startDate: "Desired Start Date",
    previousSoftware: "Previous Feeding Software",
    howDidYouHear: "How did you hear about us?",
    additionalNotes: "Additional Notes",
    finishSetup: "Finish Setup",

    // Success
    successTitle: "Payment Successful!",
    successSubtitle: "Welcome to FEEDER! Your account has been created and is ready to use.",
    nextSteps: "Next Steps",
    accessAccount: "Access your account",
    configureOperation: "Configure your operation",
    exploreFeatures: "Explore features",
    needHelp: "Need Help?",
    contactSupport: "Contact Support",
    helpCenter: "Help Center",
    accessFeeder: "Access FEEDER",
    downloadReceipt: "Download Receipt",

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

    // Software options
    "software.none": "No Feeding Software",
    "software.performanceBeef": "Performance Beef",
    "software.nutron": "Nutron",
    "software.other": "Other",

    // How did you hear options
    "hear.google": "Google Search",
    "hear.social": "Social Media",
    "hear.conference": "Industry Conference",
    "hear.referral": "Colleague Referral",
    "hear.publication": "Trade Publication",
    "hear.sales": "Sales Representative",
    "hear.customer": "Existing Customer",
    "hear.other": "Other",
  },
  es: {
    // Page titles
    pricingTitle: "Elige Tu Plan de Confinamiento",
    pricingSubtitle:
      "Soluciones completas de gestión de confinamiento diseñadas para optimizar tus operaciones. Desde alimentación básica hasta análisis avanzados.",

    // Plan names
    planLite: "CONFINAMIENTO LITE",
    planGo: "CONFINAMIENTO GO",
    planFlex: "CONFINAMIENTO FLEX",
    planPro: "CONFINAMIENTO PRO",

    // Plan descriptions
    planLiteDesc: "Solución básica para pequeñas operaciones",
    planGoDesc: "Para productores que buscan planificación nutricional",
    planFlexDesc: "Para quienes desean gestión precisa en la manga",
    planProDesc: "Para quienes exigen excelencia en sanidad y análisis del rebaño",

    // Common terms
    pens: "Corrales",
    users: "Usuarios",
    perMonth: "por mes",
    perYear: "por año",
    annually: "anualmente",
    monthly: "mensual",
    getStarted: "Comenzar",
    mostPopular: "Más Popular",

    // Billing
    billingCycle: "Ciclo de Facturación",
    monthlyBilling: "Mensual",
    annualBilling: "Anual (10% de descuento)",
    annualSavings: "Ahorra con facturación anual",

    // Features
    feeding: "Alimentación",
    cattleManagement: "Gestión de Ganado",
    suppliesInventory: "Inventario de Suministros",
    dietManagement: "Manejo de Dietas",
    advancedFeeding: "Alimentación Avanzada",
    animalHealth: "Sanidad Animal",
    chute: "Manga",
    tagReaderIntegration: "Integración con Lector de Caravanas",
    premixGeneration: "Generación de Premezclas",
    analytics: "Análisis",
    marketValueReport: "Reporte de Valor de Mercado",

    // Add-ons
    addOnsTitle: "Complementos Disponibles",
    addOnsSubtitle: "Haz clic en un complemento para comprarlo para tu plan de Confinamiento existente",
    customFeederModule: "Módulo customFeeder",
    customFeederModuleDesc: "Gestión completa para operaciones de customFeeder con múltiples clientes",
    clientUsers: "Usuarios de Clientes",
    clientUsersDesc: "Usuarios adicionales para clientes específicos",

    // Checkout
    checkoutTitle: "Completa Tu Pedido",
    checkoutSubtitle: "Personaliza tu plan con características adicionales",
    contactInfo: "Información de Contacto",
    orderSummary: "Resumen del Pedido",
    fullName: "Nombre Completo",
    emailAddress: "Dirección de Email",
    companyName: "Nombre de la Empresa",
    phoneNumber: "Número de Teléfono",
    additionalPens: "Corrales Adicionales",
    additionalUsers: "Usuarios Adicionales",
    total: "Total",
    continueToPayment: "Continuar al Pago",

    // Payment
    paymentTitle: "Información de Pago",
    paymentSubtitle: "Completa tu suscripción de forma segura",
    cardDetails: "Datos de la Tarjeta",
    cardholderName: "Nombre del Titular",
    cardNumber: "Número de Tarjeta",
    expiryDate: "Fecha de Vencimiento",
    cvv: "CVV",
    billingAddress: "Dirección de Facturación",
    address: "Dirección",
    city: "Ciudad",
    state: "Estado/Provincia",
    zipCode: "Código Postal",
    country: "País",
    finalizePayment: "Finalizar Pago",
    securePayment: "Pago Seguro",

    // Feedlot Info
    feedlotInfoTitle: "Información del Confinamiento",
    feedlotInfoSubtitle: "Cuéntanos más sobre tu operación para personalizar tu experiencia",
    companyInfo: "Información de la Empresa",
    location: "Ubicación",
    operationInfo: "Información de la Operación",
    totalCapacity: "Capacidad Total (cabezas)",
    currentHeadCount: "Rebaño Actual",
    startDate: "Fecha de Inicio Deseada",
    previousSoftware: "Software de Alimentación Anterior",
    howDidYouHear: "¿Cómo te enteraste de nosotros?",
    additionalNotes: "Notas Adicionales",
    finishSetup: "Finalizar Configuración",

    // Success
    successTitle: "¡Pago Exitoso!",
    successSubtitle: "¡Bienvenido a FEEDER! Tu cuenta ha sido creada y está lista para usar.",
    nextSteps: "Próximos Pasos",
    accessAccount: "Accede a tu cuenta",
    configureOperation: "Configura tu operación",
    exploreFeatures: "Explora las características",
    needHelp: "¿Necesitas Ayuda?",
    contactSupport: "Contactar Soporte",
    helpCenter: "Centro de Ayuda",
    accessFeeder: "Acceder a FEEDER",
    downloadReceipt: "Descargar Recibo",

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

    // Software options
    "software.none": "Sin Software de Alimentación",
    "software.performanceBeef": "Performance Beef",
    "software.nutron": "Nutron",
    "software.other": "Otro",

    // How did you hear options
    "hear.google": "Búsqueda en Google",
    "hear.social": "Redes Sociales",
    "hear.conference": "Conferencia de la Industria",
    "hear.referral": "Referencia de Colega",
    "hear.publication": "Publicación Comercial",
    "hear.sales": "Representante de Ventas",
    "hear.customer": "Cliente Existente",
    "hear.other": "Otro",
  },
  pt: {
    // Page titles
    pricingTitle: "Escolha Seu Plano de Confinamento",
    pricingSubtitle:
      "Soluções completas de gestão de confinamento projetadas para otimizar suas operações. Da alimentação básica a análises avançadas.",

    // Plan names
    planLite: "CONFINAMENTO LITE",
    planGo: "CONFINAMENTO GO",
    planFlex: "CONFINAMENTO FLEX",
    planPro: "CONFINAMENTO PRO",

    // Plan descriptions
    planLiteDesc: "Solução básica para pequenas operações",
    planGoDesc: "Para produtores que buscam planejamento nutricional",
    planFlexDesc: "Para quem deseja gestão precisa no tronco",
    planProDesc: "Para quem exige excelência em sanidade e análise do rebanho",

    // Common terms
    pens: "Currais",
    users: "Usuários",
    perMonth: "por mês",
    perYear: "por ano",
    annually: "anualmente",
    monthly: "mensal",
    getStarted: "Começar",
    mostPopular: "Mais Popular",

    // Billing
    billingCycle: "Ciclo de Faturamento",
    monthlyBilling: "Mensal",
    annualBilling: "Anual (10% de desconto)",
    annualSavings: "Economize com faturamento anual",

    // Features
    feeding: "Alimentação",
    cattleManagement: "Gestão de Gado",
    suppliesInventory: "Inventário de Suprimentos",
    dietManagement: "Manejo de Dietas",
    advancedFeeding: "Alimentação Avançada",
    animalHealth: "Sanidade Animal",
    chute: "Tronco",
    tagReaderIntegration: "Integração com Leitor de Brinco",
    premixGeneration: "Geração de Pré-misturas",
    analytics: "Analytics",
    marketValueReport: "Relatório de Valor de Mercado",

    // Add-ons
    addOnsTitle: "Complementos Disponíveis",
    addOnsSubtitle: "Clique no complemento para comprá-lo para seu plano de Confinamento existente",
    customFeederModule: "Módulo customFeeder",
    customFeederModuleDesc: "Gestão completa para operações de customFeeder com múltiplos clientes",
    clientUsers: "Usuários de Clientes",
    clientUsersDesc: "Usuários adicionais para clientes específicos",

    // Checkout
    checkoutTitle: "Complete Seu Pedido",
    checkoutSubtitle: "Personalize seu plano com recursos adicionais",
    contactInfo: "Informações de Contato",
    orderSummary: "Resumo do Pedido",
    fullName: "Nome Completo",
    emailAddress: "Endereço de Email",
    companyName: "Nome da Empresa",
    phoneNumber: "Número de Telefone",
    additionalPens: "Currais Adicionais",
    additionalUsers: "Usuários Adicionais",
    total: "Total",
    continueToPayment: "Continuar para Pagamento",

    // Payment
    paymentTitle: "Informações de Pagamento",
    paymentSubtitle: "Finalize sua assinatura com segurança",
    cardDetails: "Dados do Cartão",
    cardholderName: "Nome do Portador",
    cardNumber: "Número do Cartão",
    expiryDate: "Validade",
    cvv: "CVV",
    billingAddress: "Endereço de Cobrança",
    address: "Endereço",
    city: "Cidade",
    state: "Estado",
    zipCode: "CEP",
    country: "País",
    finalizePayment: "Finalizar Pagamento",
    securePayment: "Pagamento Seguro",

    // Feedlot Info
    feedlotInfoTitle: "Informações do Confinamento",
    feedlotInfoSubtitle: "Nos conte mais sobre sua operação para personalizar sua experiência",
    companyInfo: "Informações da Empresa",
    location: "Localização",
    operationInfo: "Informações da Operação",
    totalCapacity: "Capacidade Total (cabeças)",
    currentHeadCount: "Rebanho Atual (cabeças)",
    startDate: "Data de Início Desejada",
    previousSoftware: "Software de Alimentação Anterior",
    howDidYouHear: "Como você ficou sabendo sobre nós?",
    additionalNotes: "Observações Adicionais",
    finishSetup: "Finalizar Configuração",

    // Success
    successTitle: "Pagamento Realizado com Sucesso!",
    successSubtitle: "Bem-vindo ao FEEDER! Sua conta foi criada e está pronta para uso.",
    nextSteps: "Próximos Passos",
    accessAccount: "Acesse sua conta",
    configureOperation: "Configure sua operação",
    exploreFeatures: "Explore os recursos",
    needHelp: "Precisa de Ajuda?",
    contactSupport: "Contatar Suporte",
    helpCenter: "Central de Ajuda",
    accessFeeder: "Acessar FEEDER",
    downloadReceipt: "Baixar Recibo",

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

    // Software options
    "software.none": "Nenhum Software de Alimentação",
    "software.performanceBeef": "Performance Beef",
    "software.nutron": "Nutron",
    "software.other": "Outro",

    // How did you hear options
    "hear.google": "Pesquisa Google",
    "hear.social": "Redes Sociais",
    "hear.conference": "Conferência do Setor",
    "hear.referral": "Indicação de Colega",
    "hear.publication": "Publicação Especializada",
    "hear.sales": "Representante de Vendas",
    "hear.customer": "Cliente Existente",
    "hear.other": "Outro",
  },
}

export function usePricingTranslation() {
  const [selectedCountry, setSelectedCountry] = useState<Country>("US")
  const [isHydrated, setIsHydrated] = useState(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedCountry = localStorage.getItem("cattler-country") as Country
    if (savedCountry && Object.keys(countryLanguageMap).includes(savedCountry)) {
      setSelectedCountry(savedCountry)
    }
    setIsHydrated(true)
  }, [])

  // Save to localStorage when country changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cattler-country", selectedCountry)
    }
  }, [selectedCountry, isHydrated])

  const handleCountryChange = useCallback((country: Country) => {
    setSelectedCountry(country)
  }, [])

  // Memoize language and currency to prevent unnecessary recalculations
  const language = useMemo(() => countryLanguageMap[selectedCountry], [selectedCountry])
  const currency = useMemo(() => countryCurrencyMap[selectedCountry], [selectedCountry])

  // Memoize current translations object
  const currentTranslations = useMemo(() => pricingTranslations[language], [language])

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

  // Format price with currency
const formatPrice = useCallback(
  (price: number) => {
    if (selectedCountry === "AR") {
      return `${price.toLocaleString()} ${currency}`;
    }
    return `${currency}${price.toLocaleString()}`;
  },
  [currency, selectedCountry],
);

  return {
    selectedCountry,
    setSelectedCountry: handleCountryChange,
    language,
    currency,
    t,
    formatPrice,
    isHydrated,
  }
}
