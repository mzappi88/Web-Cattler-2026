import { PRICES_BY_COUNTRY } from "./owner-plans";
import type { AddOn } from "@/types/pricing";

// Re-export the AddOn interface for backward compatibility
export type { AddOn };

/**
 * OWNER ADD-ONS CONFIGURATION
 * 
 * This file contains all add-on configurations for the pricing system.
 * 
 * STRUCTURE:
 * 1. ADDON_IDS - Single source of truth for all add-on identifiers
 * 2. ADDON_CONFIGS_BY_COUNTRY - Complete configuration for each add-on by country
 * 3. Helper functions for retrieving add-on information
 * 
 * PRICING:
 * - Prices are defined in owner-plans.ts (PRICES_BY_COUNTRY)
 * - This file maps add-on keys to price fields using getAddOnPriceFromConfig()
 * - Single source of truth for pricing across the application
 */

// Single source of truth for all add-on IDs
export const ADDON_IDS = {
  // Core add-ons
  CUSTOM_FEEDER: "customFeeder",
  USER_CLIENTS: "userClients",
  
  // Animal Health related
  ANIMAL_HEALTH: "animalHealth",
  ANIMAL_HEALTH_BASIC: "animalHealthbasic",
  ANIMAL_HEALTH_ADVANCED: "animalHealthAdvanced",
  ANIMAL_HEALTH_CHUTE: "animalHealthChute",
  
  // Chute related
  CHUTE: "chute",
  EID_INTEGRATION: "EIDIntegration",
  CHUTE_QUICK_START: "chuteQuickStart",
  CHUTE_CATTLE_IN: "chuteCattleIN",
  
  // Feeding related
  ADVANCED_FEEDING: "advancedFeeding",
  FEEDING_PROTOCOLS: "feedingProtocols",
  INPUT_TRANSFORMATION: "inputTransformation",
  LOAD_DROP_AUTOMATION: "loadDropAutomation",
  CUSTOMIZE_BUNK_SCORING: "customizeBunkScoring",
  MICROINGREDIENT_MANAGEMENT: "microingridientManagement",
  AUTO_ADJUST: "autoAdjust",
  
  // Inventory and Purchases
  PURCHASES: "purchases",
  ADVANCED_INVENTORY: "advancedInventory",
  
  // Analytics and Reports
  ANALYTICS: "analytics",
  MARKET_VALUE_REPORT: "marketValueReport",
  
  // Integrations
  TRUCK_SCALEHEAD: "truckScalehead",
  DUMP_BOX: "dumpBox",
  MICRO_MACHINE_INTEGRATION: "MicroMachineIntegration",
  
  // Additional modules
  GRAIN_BANK: "grainBank",
  CUOTA_481: "cuota481",
  PASTURE_MANAGEMENT_BASIC: "pastureManagementBasic",
  PASTURE_MANAGEMENT_ADVANCED: "pastureManagementAdvanced",
  COW_CALF_BASIC: "cowCalfBasic",
  COW_CALF_ADVANCED: "cowCalfAdvanced",
} as const;

// Type for add-on ID values
export type AddOnId = typeof ADDON_IDS[keyof typeof ADDON_IDS];

// Legacy export for backward compatibility
export const addonKeys = ADDON_IDS;

// Helper function to get add-on name by country
export function getAddOnNameByCountry(addOnKey: string, selectedCountry: string): string {
  const countryConfig = ADDON_CONFIGS_BY_COUNTRY[selectedCountry] ?? ADDON_CONFIGS_BY_COUNTRY["OT$EN"];
  return countryConfig[addOnKey]?.name ?? addOnKey;
}

// Helper function to get "Coming Soon" text by country
const getComingSoonText = (selectedCountry: string) => {
  switch (selectedCountry) {
    case "US":
    case "CA":
      return "Coming Soon";
    
    case "BR":
      return "Em Breve";
    case "PY":
    case "AR":  
    case "UY":
    case "BO":
    case "MX":
     case "OT$ES":
      return "Próximamente";
    case "OT$EN":
      return "Coming Soon";
    default:
      return "Coming Soon";
  }
};

// Centralized add-on configurations by country
const ADDON_CONFIGS_BY_COUNTRY: Record<string, Record<string, {
  name: string;
  description: string;
  availableFor: string[];
  includedIn: string[];
  isCustomFeeder?: boolean;
  comingSoon?: boolean;
  hidden?: boolean;
}>> = {
  BR: {
    "customFeeder": {
      name: "Módulo Bôitel",
      description: "Gestão completa para operações de Bôitelcom múltiplos clientes",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "userClients": {
      name: "Usuários Clientes",
      description: "Usuários adicionais para clientes do Bôitel",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "animalHealth": {
      name: "Sanidade Animal",
      description: "Gestão completa da saúde do rebanho",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "chute": {
      name: "Tronco",
      description: "Sistema completo de manejo no tronco",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "EIDIntegration": {
      name: "Integração com Leitor de Brinco",
      description: "Integração com sistemas de leitura de brincos eletrônicos",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "advancedFeeding": {
      name: "Alimentação Avançada",
      description: "Recursos avançados para gestão e otimização de alimentação",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3", "plan4"],
      hidden: false,
    },
    "inputTransformation": {
      name: "Pré-misturas",
      description: "Sistema para geração e controle de pré-misturas",
      availableFor: ["plan2","plan3"],
      includedIn: [ "plan4"],
      hidden: false,
    },
 
    "marketValueReport": {
      name: "Relatório de Valor de Mercado",
      description: "Relatórios detalhados sobre valores de mercado do gado",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: false,
      hidden: true,
    },
    "truckScalehead": {
      name: "Integração com Balanças de Caminhões",
      description: "Integração com sistemas de balança de caminhão para pesagem automática",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "dumpBox": {
      name: "Integração com Misturador Estacionário Duplo",
      description: "Integração com sistemas de Dump Box para automação de alimentação",
      availableFor: ["plan3","plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "MicroMachineIntegration": {
      name: "Integração com Micro Máquina",
      description: "Integração com sistemas de micro máquina para automação avançada",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "grainBank": {
      name: "Banco de Grãos",
      description: "Sistema de gestão de banco de grãos",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "cuota481": {
      name: "Cuota 481",
      description: "Sistema de gestão de cuota 481",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "pastureManagementBasic": {
      name: "Gestão de Pastagem Básica",
      description: "Sistema básico de gestão de pastagem",
      availableFor: ["plan1", "plan2","plan3","plan4"],
      includedIn: [],
      hidden: false,
      comingSoon: true,
    },
    "pastureManagementAdvanced": {
      name: "Gestão de Pastagem Avançada",
      description: "Sistema avançado de gestão de pastagem",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
      comingSoon: true,
    },
    "cowCalfBasic": {
      name: "Cow-Calf Básico",
      description: "Sistema básico de gestão cow-calf",
      availableFor: ["plan1", "plan2","plan3","plan4"],
      includedIn: [],
      hidden: false,
      comingSoon: true,
    },
    "cowCalfAdvanced": {
      name: "Cow-Calf Avançado",
      description: "Sistema avançado de gestão cow-calf",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
      comingSoon: true,
    },
    "feedingProtocols": {
      name: "Protocolos de Alimentação",
      description: "Sistema de protocolos de alimentação",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "loadDropAutomation": {
      name: "Automação de Carga e Descarga",
      description: "Sistema de automação de carga e descarga",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "customizeBunkScoring": {
      name: "Personalização de Bunk Scoring",
      description: "Sistema de personalização de bunk scoring",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "microingridientManagement": {
      name: "Gestão de Microingredientes",
      description: "Sistema de gestão de microingredientes",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "analytics": {
      name: "Analytics",
      description: "Análises avançadas e relatórios detalhados para otimização da operação",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
    "animalHealthbasic": {
      name: "Sanidade Animal Básica",
      description: "Sistema básico de gestão da saúde do rebanho",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "animalHealthAdvanced": {
      name: "Sanidade Animal Avançada",
      description: "Sistema avançado de gestão da saúde do rebanho",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "animalHealthChute": {
      name: "Sanidade Animal Tronco",
      description: "Sistema de sanidade animal integrado com tronco",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chuteQuickStart": {
      name: "Tronco Quick Start",
      description: "Sistema rápido de configuração do tronco",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "chuteCattleIN": {
      name: "Tronco Cattle IN",
      description: "Sistema de entrada de gado no tronco",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "purchases": {
      name: "Compras",
      description: "Sistema de gestão de compras",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
    },
    "advancedInventory": {
      name: "Inventário Avançado",
      description: "Sistema avançado de gestão de inventário",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
  },
  AR: {
    "customFeeder": {
      name: "Módulo Hotelería",
      description: "Gestión completa para operaciones de Hotelería con múltiples clientes",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: ["plan2"],
      isCustomFeeder: true,
      hidden: false,
    },
    "userClients": {
      name: "Usuarios Clientes",
      description: "Usuarios adicionales para clientes de Hotelería",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "animalHealth": {
      name: "Sanidad Animal",
      description: "Gestión completa de la salud de la tropa",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "chute": {
      name: "Manga",
      description: "Sistema completo de manejo en manga",
      availableFor: ["plan1", "plan2"],
      includedIn: [ "plan3", "plan4"],
      hidden: false,
    },
    "EIDIntegration": {
      name: "Lector de Caravana Electrónico",
      description: "Integración con sistemas de lectura de caravanas electrónicas",
      availableFor: ["plan1", "plan2"],
      includedIn: [ "plan3", "plan4"],
      hidden: true,
    },
    "advancedFeeding": {
      name: "Alimentación Avanzada",
      description: "Recursos avanzados para gestión y optimización de alimentación",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3", "plan4"],
      hidden: true
    },
    "inputTransformation": {
      name: "Premixes",
      description: "Sistema para generación y control de premixes",
      availableFor: ["plan1", "plan2"],
      includedIn: [ "plan3", "plan4"],
      hidden: false,
    },
    "analytics": {
      name: "Analytics",
      description: "Análisis avanzados y reportes detallados para optimización de la operación",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [ "plan4"],
      comingSoon: true,
      hidden: false,
    },
    "marketValueReport": {
      name: "Reporte de Valor de Mercado",
      description: "Reportes detallados sobre valores de mercado del ganado",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [  "plan4"],
      hidden: false,
    },
    "truckScalehead": {
      name: "Integración con Balanzas de Camiones",
      description: "Integración con sistemas de balanza de camión para pesaje automático",
      availableFor: ["plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "dumpBox": {
      name: "Integración con Mixer Estático Doble",
      description: "Integración con sistemas de Dump Box para automatización de alimentación",
      availableFor: ["plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "MicroMachineIntegration": {
      name: "Integración con Micro Máquina",
      description: "Integración con sistemas de micro máquina para automatización avanzada",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: true
    },
    "grainBank": {
      name: "Banco de Granos",
      description: "Sistema de gestión de banco de granos",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true
    },
    "cuota481": {
      name: "Informes Cuota 481",
      description: "Generación de informes de cuota 481",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: ['plan4'],
      hidden: false
    },
    "pastureManagementBasic": {
      name: "Gestión de Pastura Básica",
      description: "Sistema básico de gestión de pastura",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "pastureManagementAdvanced": {
      name: "Gestión de Pastura Avanzada",
      description: "Sistema avanzado de gestión de pastura",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfBasic": {
      name: "Cría y Recría Básico",
      description: "Sistema básico de gestión cría y recría",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "cowCalfAdvanced": {
      name: "Cría y Recría Avanzado",
      description: "Sistema avanzado de gestión cría y recría",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "feedingProtocols": {
      name: "Protocolos de Alimentación",
      description: "Sistema de protocolos de alimentación",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "loadDropAutomation": {
      name: "Automatización de Carga y Descarga",
      description: "Sistema de automatización de carga y descarga",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
       hidden: false,
    },
    "customizeBunkScoring": {
      name: "Lectura de comederos personalizada",
      description: "Sistema de personalización de la lectura de comederos y ajuste automático de entregas",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
    "autoAdjust": {
      name: "Ajuste Automático de Órdenes de Entrega  ",
      description: "Sistema de ajuste automático de órdenes de entrega",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "microingridientManagement": {
      name: "Gestión de Microingredientes",
      description: "Sistema de gestión de microingredientes",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true
    },
    "animalHealthbasic": {
      name: "Sanidad Animal Básica",
      description: "Sistema básico de gestión de la salud del rebaño",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "animalHealthAdvanced": {
      name: "Sanidad Animal Avanzada",
      description: "Sistema avanzado de gestión de la salud del rebaño",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chuteQuickStart": {
      name: "Manga Quick Start",
      description: "Sistema rápido de configuración de manga",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "chuteCattleIN": {
      name: "Manga Cattle IN",
      description: "Sistema de entrada de ganado en manga",
      availableFor: ["plan1"],
      includedIn: ['plan2', 'plan3', 'plan4'],
      hidden: true,
    },
    "purchases": {
      name: "Compras",
      description: "Sistema de gestión de compras",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "advancedInventory": {
      name: "Inventario Avanzado",
      description: "Sistema avanzado de gestión de inventario",
      availableFor: ["plan2", "plan3", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
  },
  US: {
    "customFeeder": {
      name: "Custom Feeder Module",
      description: "Complete management for custom feeding operations with multiple clients",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "grainBank": {
      name: "Grain Bank",
      description: "Grain bank management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
      isCustomFeeder: true,
    },
    "userClients": {
      name: "Client Users",
      description: "Additional users for Custom Feeder Clients",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "animalHealth": {
      name: "Animal Health",
      description: "Complete herd health management",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chute": {
      name: "Chute",
      description: "Complete chute handling system",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "EIDIntegration": {
      name: "EID Integration",
      description: "Integration with EID Readers",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "advancedFeeding": {
      name: "Advanced Feeding",
      description: "Advanced features for feeding management and optimization",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "inputTransformation": {
      name: "Premixes",
      description: "System for premix generation and control",
      availableFor: ["plan1","plan2"],
      includedIn: [ "plan3", "plan4"],
      hidden: false,
    },
    "analytics": {
      name: "Analytics",
      description: "Advanced analytics and detailed reports for operation optimization",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
    "marketValueReport": {
      name: "Market Value Report",
      description: "Detailed reports on cattle market values",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "truckScalehead": {
      name: "Truck Scale Integration",
      description: "Integration with truck scale systems for automatic weighing",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "dumpBox": {
      name: "Dump Box Integration",
      description: "Integration with two way Dump Box systems",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
   
    
    "cuota481": {
      name: "Cuota 481",
      description: "Cuota 481 management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "pastureManagementBasic": {
      name: "Basic Pasture Management",
      description: "Basic pasture management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "pastureManagementAdvanced": {
      name: "Advanced Pasture Management",
      description: "Advanced pasture management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfBasic": {
      name: "Basic Cow-Calf",
      description: "Basic cow-calf management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfAdvanced": {
      name: "Advanced Cow-Calf",
      description: "Advanced cow-calf management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "feedingProtocols": {
      name: "Feeding Protocols",
      description: "Feeding protocols system",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "loadDropAutomation": {
      name: "Load/Drop Automation",
      description: "Load and drop automation system",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "customizeBunkScoring": {
      name: "Customize Bunk Scoring",
      description: "Customize bunk scoring system",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "microingridientManagement": {
      name: "Microingredient Management",
      description: "Microingredient management system",
      availableFor: ["plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "MicroMachineIntegration": {
      name: "Micro Machine Integration",
      description: "Integration with micro machine systems for advanced automation",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: false,
      hidden: false,
    },
    "animalHealthbasic": {
      name: "Basic Animal Health",
      description: "Basic herd health management system",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "animalHealthAdvanced": {
      name: "Advanced Animal Health",
      description: "Advanced herd health management system",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chuteQuickStart": {
      name: "Chute Quick Start",
      description: "Quick chute setup system",
      availableFor: [],
      includedIn: ["plan2","plan3", "plan4"],
      hidden: true,
    },
    "chuteCattleIN": {
      name: "Chute Cattle IN",
      description: "Cattle entry system for chute",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "purchases": {
      name: "Purchases",
      description: "Purchase management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "advancedInventory": {
      name: "Advanced Inventory",
      description: "Advanced inventory management system",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
  },
  CA:  {
    "customFeeder": {
      name: "Custom Feeder Module",
      description: "Complete management for custom feeding operations with multiple clients",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "userClients": {
      name: "Client Users",
      description: "Additional users for Custom Feeder Clients",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "animalHealth": {
      name: "Animal Health",
      description: "Complete herd health management",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chute": {
      name: "Chute",
      description: "Complete chute handling system",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "EIDIntegration": {
      name: "EID Integration",
      description: "Integration with EID Readers",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "advancedFeeding": {
      name: "Advanced Feeding",
      description: "Advanced features for feeding management and optimization",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "inputTransformation": {
      name: "Premixes",
      description: "System for premix generation and control",
      availableFor: ["plan1","plan2"],
      includedIn: [ "plan3", "plan4"],
      hidden: false,
    },
    "analytics": {
      name: "Analytics",
      description: "Advanced analytics and detailed reports for operation optimization",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
    "marketValueReport": {
      name: "Market Value Report",
      description: "Detailed reports on cattle market values",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "truckScalehead": {
      name: "Truck Scale Integration",
      description: "Integration with truck scale systems for automatic weighing",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "dumpBox": {
      name: "Dump Box Integration",
      description: "Integration with two way Dump Box systems",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "MicroMachineIntegration": {
      name: "Micro Machine Integration",
      description: "Integration with micro machine systems for advanced automation",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "grainBank": {
      name: "Grain Bank",
      description: "Grain bank management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
      isCustomFeeder: true,
    },
    "cuota481": {
      name: "Cuota 481",
      description: "Cuota 481 management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "pastureManagementBasic": {
      name: "Basic Pasture Management",
      description: "Basic pasture management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "pastureManagementAdvanced": {
      name: "Advanced Pasture Management",
      description: "Advanced pasture management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfBasic": {
      name: "Basic Cow-Calf",
      description: "Basic cow-calf management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfAdvanced": {
      name: "Advanced Cow-Calf",
      description: "Advanced cow-calf management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "feedingProtocols": {
      name: "Feeding Protocols",
      description: "Feeding protocols system",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "loadDropAutomation": {
      name: "Load/Drop Automation",
      description: "Load and drop automation system",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "customizeBunkScoring": {
      name: "Customize Bunk Scoring",
      description: "Customize bunk scoring system",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "microingridientManagement": {
      name: "Microingredient Management",
      description: "Microingredient management system",
      availableFor: ["plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "animalHealthbasic": {
      name: "Basic Animal Health",
      description: "Basic herd health management system",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "animalHealthAdvanced": {
      name: "Advanced Animal Health",
      description: "Advanced herd health management system",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chuteQuickStart": {
      name: "Chute Quick Start",
      description: "Quick chute setup system",
      availableFor: [],
      includedIn: ["plan2","plan3", "plan4"],
      hidden: true,
    },
    "chuteCattleIN": {
      name: "Chute Cattle IN",
      description: "Cattle entry system for chute",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "purchases": {
      name: "Purchases",
      description: "Purchase management system",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "advancedInventory": {
      name: "Advanced Inventory",
      description: "Advanced inventory management system",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
  },
  PY: {
    "customFeeder": {
      name: "Módulo Hotelería",
      description: "Gestión completa para operaciones de Hotelería con múltiples clientes",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "userClients": {
      name: "Usuarios Clientes",
      description: "Usuarios adicionales para clientes de Hotelería",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "animalHealth": {
      name: "Sanidad Animal",
      description: "Gestión completa de la salud del rebaño",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chute": {
      name: "Manga",
      description: "Sistema completo de manejo en manga",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3", "plan4"],
      hidden: true,
    },
    "EIDIntegration": {
      name: "Integración con Lector de Caravana",
      description: "Integración con sistemas de lectura de caravanas electrónicas",
      availableFor: ["plan1","plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "advancedFeeding": {
      name: "Alimentación Avanzada",
      description: "Recursos avanzados para gestión y optimización de alimentación",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3", "plan4"],
      hidden: true,
    },
    "inputTransformation": {
      name: "Premixes",
      description: "Sistema para generación y control de premixes",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3", "plan4"],
      hidden: false,
    },
    "analytics": {
      name: "Analytics",
      description: "Análisis avanzados y reportes detallados para optimización de la operación",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
    "marketValueReport": {
      name: "Reporte de Valor de Mercado",
      description: "Reportes detallados sobre valores de mercado del ganado",
      availableFor: ["plan2", "plan3"],
      includedIn: [ "plan4"],
      hidden: false,
    },
    "truckScalehead": {
      name: "Integración con Balanzas de Camiones",
      description: "Integración con sistemas de balanza de camión para pesaje automático",
      availableFor: ["plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "dumpBox": {
      name: "Integración con Dump Box",
      description: "Integración con sistemas de Dump Box para automatización de alimentación",
      availableFor: ["plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "MicroMachineIntegration": {
      name: "Integración con Micro Máquina",
      description: "Integración con sistemas de micro máquina para automatización avanzada",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "grainBank": {
      name: "Banco de Granos",
      description: "Sistema de gestión de banco de granos",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "cuota481": {
      name: "Cuota 481",
      description: "Sistema de gestión de cuota 481",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "pastureManagementBasic": {
      name: "Gestión de Pastura Básica",
      description: "Sistema básico de gestión de pastura",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "pastureManagementAdvanced": {
      name: "Gestión de Pastura Avanzada",
      description: "Sistema avanzado de gestión de pastura",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfBasic": {
      name: "Cría y Recría Básico",
      description: "Sistema básico de gestión cría y recría",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfAdvanced": {
      name: "Cría y Recría Avanzado",
      description: "Sistema avanzado de gestión cría y recría",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "feedingProtocols": {
      name: "Protocolos de Alimentación",
      description: "Sistema de protocolos de alimentación",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "loadDropAutomation": {
      name: "Automatización de Carga y Descarga",
      description: "Sistema de automatización de carga y descarga",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "customizeBunkScoring": {
      name: "Lectura de bateas personalizada",
      description: "Sistema de personalización de la lectura de bateas y ajuste automático de entregas",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
    },
    "microingridientManagement": {
      name: "Gestión de Microingredientes",
      description: "Sistema de gestión de microingredientes",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "animalHealthbasic": {
      name: "Sanidad Animal Básica",
      description: "Sistema básico de gestión de la salud del rebaño",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "animalHealthAdvanced": {
      name: "Sanidad Animal Avanzada",
      description: "Sistema avanzado de gestión de la salud del rebaño",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "animalHealthChute": {
      name: "Sanidade Animal Tronco",
      description: "Sistema de sanidade animal integrado com tronco",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "chuteQuickStart": {
      name: "Manga Quick Start",
      description: "Sistema rápido de configuración de manga",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "chuteCattleIN": {
      name: "Manga Cattle IN",
      description: "Sistema de entrada de ganado en manga",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
    },
    "purchases": {
      name: "Compras",
      description: "Sistema de gestión de compras",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "advancedInventory": {
      name: "Inventario Avanzado",
      description: "Sistema avanzado de gestión de inventario",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
  },
  UY: {
    "customFeeder": {
      name: "Módulo Hotelería",
      description: "Gestión completa para operaciones de Hotelería con múltiples clientes",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "userClients": {
      name: "Usuarios Clientes",
      description: "Usuarios adicionales para clientes de Hotelería",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "animalHealth": {
      name: "Sanidad Animal",
      description: "Gestión completa de la salud de la tropa",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3"],
      hidden: false,
    },
    "chute": {
      name: "Manga",
      description: "Sistema completo de manejo en manga",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3"],
      hidden: true,
    },
    "EIDIntegration": {
      name: "Integración con Lector de Caravana",
      description: "Integración con sistemas de lectura de caravanas electrónicas",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3"],
      hidden: false,
    },
    "advancedFeeding": {
      name: "Alimentación Avanzada",
      description: "Recursos avanzados para gestión y optimización de alimentación",
      availableFor: ["plan1","plan2"],
      includedIn: [ "plan3"],
      hidden: true,
    },
    "inputTransformation": {
      name: "Premixes",
      description: "Sistema para generación y control de premixes",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3"],
      hidden: false,
    },
    "analytics": {
      name: "Analytics",
      description: "Análisis avanzados y reportes detallados para optimización de la operación",
      availableFor: ["plan1","plan2"],
      includedIn: [ "plan3"],
      comingSoon: true,
      hidden: false,
    },
    "marketValueReport": {
      name: "Reporte de Valor de Mercado",
      description: "Reportes detallados sobre valores de mercado del ganado",
      availableFor: ["plan1","plan2"],
      includedIn: ["plan3"],
      hidden: false,
    },
    "truckScalehead": {
      name: "Integración con Balanzas de Camiones",
      description: "Integración con sistemas de balanza de camión para pesaje automático",
      availableFor: ["plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "dumpBox": {
      name: "Integración con Dump Box",
      description: "Integración con sistemas de Dump Box para automatización de alimentación",
      availableFor: ["plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "MicroMachineIntegration": {
      name: "Integración con Micro Máquina",
      description: "Integración con sistemas de micro máquina para automatización avanzada",
      availableFor: ["plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "grainBank": {
      name: "Banco de Granos",
      description: "Sistema de gestión de banco de granos",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [],
      hidden: true,
    },
    "cuota481": {
      name: "Informes Cuota 481",
      description: "Generación de informes de cuota 481",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [],
      hidden: false,
    },
    "pastureManagementBasic": {
      name: "Gestión de Pastura Básica",
      description: "Sistema básico de gestión de pastura",
      availableFor: ["plan1", "plan2","plan3  "],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "pastureManagementAdvanced": {
      name: "Gestión de Pastura Avanzada",
      description: "Sistema avanzado de gestión de pastura",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfBasic": {
      name: "Cría y Recría Básico",
      description: "Sistema básico de gestión cría y recría",
      availableFor: ["plan1", "plan2","plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfAdvanced": {
      name: "Cría y Recría Avanzado",
      description: "Sistema avanzado de gestión cría y recría",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "feedingProtocols": {
      name: "Protocolos de Alimentación",
      description: "Sistema de protocolos de alimentación",
      availableFor: [],
      includedIn: ["plan2","plan3"],
      hidden: false,
    },
    "loadDropAutomation": {
      name: "Automatización de Carga y Descarga",
      description: "Sistema de automatización de carga y descarga",
      availableFor: ["plan2"],
      includedIn: ["plan3"],
      hidden: false,
    },
    "customizeBunkScoring": {
      name: "Lectura de comederos personalizada",
      description: "Sistema de personalización de la lectura de comederos y ajuste automático de entregas",
      availableFor: ["plan2", "plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "microingridientManagement": {
      name: "Gestión de Microingredientes",
      description: "Sistema de gestión de microingredientes",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "animalHealthbasic": {
      name: "Sanidad Animal Básica",
      description: "Sistema básico de gestión de la salud del rebaño",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "animalHealthAdvanced": {
      name: "Sanidad Animal Avanzada",
      description: "Sistema avanzado de gestión de la salud del rebaño",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "animalHealthChute": {
      name: "Sanidad Animal y Manga",
      description: "Sistema de sanidad animal integrado con la manga",
      availableFor: ["plan1"],
      includedIn: ["plan2","plan3"],
      hidden: false,
    },
    "chuteQuickStart": {
      name: "Manga Quick Start",
      description: "Sistema rápido de configuración de manga",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "chuteCattleIN": {
      name: "Manga Cattle IN",
      description: "Sistema de entrada de ganado en manga",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "purchases": {
      name: "Compras",
      description: "Sistema de gestión de compras",
      availableFor: ["plan1"],
      includedIn: ["plan2","plan3"],
      hidden: false,
    },
    "advancedInventory": {
      name: "Inventario Avanzado",
      description: "Sistema avanzado de gestión de inventario",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
  },
  BO: {
    "customFeeder": {
      name: "Módulo Hotelería",
      description: "Gestión completa para operaciones de Hotelería con múltiples clientes",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "userClients": {
      name: "Usuarios Clientes",
      description: "Usuarios adicionales para clientes de Hotelería",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "animalHealth": {
      name: "Sanidad Animal",
      description: "Gestión completa de la salud de la tropa",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3"],
      hidden: false,
    },
    "chute": {
      name: "Manga",
      description: "Sistema completo de manejo en manga",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3"],
      hidden: true,
    },
    "EIDIntegration": {
      name: "Integración con Lector de Caravana",
      description: "Integración con sistemas de lectura de caravanas electrónicas",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3"],
      hidden: false,
    },
    "advancedFeeding": {
      name: "Alimentación Avanzada",
      description: "Recursos avanzados para gestión y optimización de alimentación",
      availableFor: ["plan1","plan2"],
      includedIn: [ "plan3"],
      hidden: true,
    },
    "inputTransformation": {
      name: "Premixes",
      description: "Sistema para generación y control de premixes",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3"],
      hidden: false,
    },
    "analytics": {
      name: "Analytics",
      description: "Análisis avanzados y reportes detallados para optimización de la operación",
      availableFor: ["plan1","plan2"],
      includedIn: [ "plan3"],
      comingSoon: true,
      hidden: false,
    },
    "marketValueReport": {
      name: "Reporte de Valor de Mercado",
      description: "Reportes detallados sobre valores de mercado del ganado",
      availableFor: ["plan1","plan2"],
      includedIn: ["plan3"],
      hidden: false,
    },
    "truckScalehead": {
      name: "Integración con Balanzas de Camiones",
      description: "Integración con sistemas de balanza de camión para pesaje automático",
      availableFor: ["plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "dumpBox": {
      name: "Integración con Dump Box",
      description: "Integración con sistemas de Dump Box para automatización de alimentación",
      availableFor: ["plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "MicroMachineIntegration": {
      name: "Integración con Micro Máquina",
      description: "Integración con sistemas de micro máquina para automatización avanzada",
      availableFor: ["plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "grainBank": {
      name: "Banco de Granos",
      description: "Sistema de gestión de banco de granos",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [],
      hidden: true,
    },
    "cuota481": {
      name: "Informes Cuota 481",
      description: "Generación de informes de cuota 481",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [],
      hidden: false,
    },
    "pastureManagementBasic": {
      name: "Gestión de Pastura Básica",
      description: "Sistema básico de gestión de pastura",
      availableFor: ["plan1", "plan2","plan3  "],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "pastureManagementAdvanced": {
      name: "Gestión de Pastura Avanzada",
      description: "Sistema avanzado de gestión de pastura",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfBasic": {
      name: "Cría y Recría Básico",
      description: "Sistema básico de gestión cría y recría",
      availableFor: ["plan1", "plan2","plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfAdvanced": {
      name: "Cría y Recría Avanzado",
      description: "Sistema avanzado de gestión cría y recría",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "feedingProtocols": {
      name: "Protocolos de Alimentación",
      description: "Sistema de protocolos de alimentación",
      availableFor: [],
      includedIn: ["plan2","plan3"],
      hidden: false,
    },
    "loadDropAutomation": {
      name: "Automatización de Carga y Descarga",
      description: "Sistema de automatización de carga y descarga",
      availableFor: ["plan2"],
      includedIn: ["plan3"],
      hidden: false,
    },
    "customizeBunkScoring": {
      name: "Lectura de comederos personalizada",
      description: "Sistema de personalización de la lectura de comederos y ajuste automático de entregas",
      availableFor: ["plan2", "plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "microingridientManagement": {
      name: "Gestión de Microingredientes",
      description: "Sistema de gestión de microingredientes",
      availableFor: ["plan2", "plan3"],
      includedIn: [],
      hidden: true,
    },
    "animalHealthbasic": {
      name: "Sanidad Animal Básica",
      description: "Sistema básico de gestión de la salud del rebaño",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "animalHealthAdvanced": {
      name: "Sanidad Animal Avanzada",
      description: "Sistema avanzado de gestión de la salud del rebaño",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "animalHealthChute": {
      name: "Sanidad Animal y Manga",
      description: "Sistema de sanidad animal integrado con la manga",
      availableFor: ["plan1"],
      includedIn: ["plan2","plan3"],
      hidden: false,
    },
    "chuteQuickStart": {
      name: "Manga Quick Start",
      description: "Sistema rápido de configuración de manga",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "chuteCattleIN": {
      name: "Manga Cattle IN",
      description: "Sistema de entrada de ganado en manga",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "purchases": {
      name: "Compras",
      description: "Sistema de gestión de compras",
      availableFor: ["plan1"],
      includedIn: ["plan2","plan3"],
      hidden: false,
    },
    "advancedInventory": {
      name: "Inventario Avanzado",
      description: "Sistema avanzado de gestión de inventario",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
  },
  MX:  {
    "customFeeder": {
      name: "Módulo de Alimentación Personalizada",
      description: "Gestión completa para operaciones de alimentación personalizada con múltiples clientes",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "userClients": {
      name: "Usuarios Clientes",
      description: "Usuarios adicionales para clientes de alimentación personalizada",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "animalHealth": {
      name: "Sanidad Animal",
      description: "Gestión completa de la salud del rebaño",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chute": {
      name: "Manga",
      description: "Sistema completo de manejo en manga",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "EIDIntegration": {
      name: "Integración EID",
      description: "Integración con sistemas de identificación electrónica",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "advancedFeeding": {
      name: "Alimentación Avanzada",
      description: "Características avanzadas para gestión y optimización de alimentación",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "inputTransformation": {
      name: "Premixes",
      description: "Sistema para generación y control de premixes",
      availableFor: ["plan1","plan2"],
      includedIn: [ "plan3", "plan4"],
      hidden: false,
    },
    "analytics": {
      name: "Analytics",
      description: "Análisis avanzados y reportes detallados para optimización de la operación",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
    "marketValueReport": {
      name: "Reporte de Valor de Mercado",
      description: "Reportes detallados sobre valores de mercado del ganado",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "truckScalehead": {
      name: "Integración con Balanzas de Camiones",
      description: "Integración con sistemas de balanza de camión para pesaje automático",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "dumpBox": {
      name: "Integración con Dump Box",
      description: "Integración con sistemas de Dump Box para automatización de alimentación",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "MicroMachineIntegration": {
      name: "Integración con Micro Máquina",
      description: "Integración con sistemas de micro máquina para automatización avanzada",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "grainBank": {
      name: "Banco de Granos",
      description: "Sistema de gestión de banco de granos",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
      isCustomFeeder: true,
    },
    "cuota481": {
      name: "Cuota 481",
      description: "Sistema de gestión de cuota 481",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "pastureManagementBasic": {
      name: "Gestión de Pastura Básica",
      description: "Sistema básico de gestión de pastura",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "pastureManagementAdvanced": {
      name: "Gestión de Pastura Avanzada",
      description: "Sistema avanzado de gestión de pastura",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfBasic": {
      name: "Cow-Calf Básico",
      description: "Sistema básico de gestión cow-calf",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfAdvanced": {
      name: "Cow-Calf Avanzado",
      description: "Sistema avanzado de gestión cow-calf",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "feedingProtocols": {
      name: "Protocolos de Alimentación",
      description: "Sistema de protocolos de alimentación",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "loadDropAutomation": {
      name: "Automatización de Carga y Descarga",
      description: "Sistema de automatización de carga y descarga",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "customizeBunkScoring": {
      name: "Personalización de Bunk Scoring",
      description: "Sistema de personalización de bunk scoring",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "microingridientManagement": {
      name: "Gestión de Microingredientes",
      description: "Sistema de gestión de microingredientes",
      availableFor: ["plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "animalHealthbasic": {
      name: "Sanidad Animal Básica",
      description: "Sistema básico de gestión de la salud del rebaño",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "animalHealthAdvanced": {
      name: "Sanidad Animal Avanzada",
      description: "Sistema avanzado de gestión de la salud del rebaño",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chuteQuickStart": {
      name: "Manga Quick Start",
      description: "Sistema rápido de configuración de manga",
      availableFor: [],
      includedIn: ["plan2","plan3", "plan4"],
      hidden: true,
    },
    "chuteCattleIN": {
      name: "Manga Cattle IN",
      description: "Sistema de entrada de ganado para manga",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "purchases": {
      name: "Compras",
      description: "Sistema de gestión de compras",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "advancedInventory": {
      name: "Advanced Inventory",
      description: "Advanced inventory management system",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
  },
  OT$ES:  {
    "customFeeder": {
      name: "Módulo de Alimentación Personalizada",
      description: "Gestión completa para operaciones de alimentación personalizada con múltiples clientes",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "userClients": {
      name: "Usuarios Clientes",
      description: "Usuarios adicionales para clientes de alimentación personalizada",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "animalHealth": {
      name: "Sanidad Animal",
      description: "Gestión completa de la salud del rebaño",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chute": {
      name: "Manga",
      description: "Sistema completo de manejo en manga",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "EIDIntegration": {
      name: "Integración EID",
      description: "Integración con sistemas de identificación electrónica",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "advancedFeeding": {
      name: "Alimentación Avanzada",
      description: "Características avanzadas para gestión y optimización de alimentación",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "inputTransformation": {
      name: "Premixes",
      description: "Sistema para generación y control de premixes",
      availableFor: ["plan1","plan2"],
      includedIn: [ "plan3", "plan4"],
      hidden: false,
    },
    "analytics": {
      name: "Analytics",
      description: "Análisis avanzados y reportes detallados para optimización de la operación",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
    "marketValueReport": {
      name: "Reporte de Valor de Mercado",
      description: "Reportes detallados sobre valores de mercado del ganado",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "truckScalehead": {
      name: "Integración con Balanzas de Camiones",
      description: "Integración con sistemas de balanza de camión para pesaje automático",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "dumpBox": {
      name: "Integración con Dump Box",
      description: "Integración con sistemas de Dump Box para automatización de alimentación",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "MicroMachineIntegration": {
      name: "Integración con Micro Máquina",
      description: "Integración con sistemas de micro máquina para automatización avanzada",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "grainBank": {
      name: "Banco de Granos",
      description: "Sistema de gestión de banco de granos",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
      isCustomFeeder: true,
    },
    "cuota481": {
      name: "Cuota 481",
      description: "Sistema de gestión de cuota 481",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "pastureManagementBasic": {
      name: "Gestión de Pastura Básica",
      description: "Sistema básico de gestión de pastura",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "pastureManagementAdvanced": {
      name: "Gestión de Pastura Avanzada",
      description: "Sistema avanzado de gestión de pastura",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfBasic": {
      name: "Cow-Calf Básico",
      description: "Sistema básico de gestión cow-calf",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "cowCalfAdvanced": {
      name: "Cow-Calf Avanzado",
      description: "Sistema avanzado de gestión cow-calf",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "feedingProtocols": {
      name: "Protocolos de Alimentación",
      description: "Sistema de protocolos de alimentación",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "loadDropAutomation": {
      name: "Automatización de Carga y Descarga",
      description: "Sistema de automatización de carga y descarga",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: true,
    },
    "customizeBunkScoring": {
      name: "Personalización de Bunk Scoring",
      description: "Sistema de personalización de bunk scoring",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "microingridientManagement": {
      name: "Gestión de Microingredientes",
      description: "Sistema de gestión de microingredientes",
      availableFor: ["plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "animalHealthbasic": {
      name: "Sanidad Animal Básica",
      description: "Sistema básico de gestión de la salud del rebaño",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "animalHealthAdvanced": {
      name: "Sanidad Animal Avanzada",
      description: "Sistema avanzado de gestión de la salud del rebaño",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chuteQuickStart": {
      name: "Manga Quick Start",
      description: "Sistema rápido de configuración de manga",
      availableFor: [],
      includedIn: ["plan2","plan3", "plan4"],
      hidden: true,
    },
    "chuteCattleIN": {
      name: "Manga Cattle IN",
      description: "Sistema de entrada de ganado para manga",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "purchases": {
      name: "Compras",
      description: "Sistema de gestión de compras",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "advancedInventory": {
      name: "Inventario Avanzado",
      description: "Sistema avanzado de gestión de inventario",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
  },
  OT$EN: {
    "customFeeder": {
      name: "Módulo de Alimentación Personalizada",
      description: "Gestión completa para operaciones de alimentación personalizada con múltiples clientes",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "userClients": {
      name: "Usuarios Clientes",
      description: "Usuarios adicionales para clientes de alimentación personalizada",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      isCustomFeeder: true,
      hidden: false,
    },
    "animalHealth": {
      name: "Sanidad Animal",
      description: "Gestión completa de la salud del rebaño",
      availableFor: ["plan1", "plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "chute": {
      name: "Manga",
      description: "Sistema completo de manejo en manga",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "EIDIntegration": {
      name: "Integración EID",
      description: "Integración con sistemas de identificación electrónica",
      availableFor: ["plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "advancedFeeding": {
      name: "Alimentación Avanzada",
      description: "Características avanzadas para gestión y optimización de alimentación",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3", "plan4"],
      hidden: false,
    },
    "inputTransformation": {
      name: "Premixes",
      description: "Sistema para generación y control de premixes",
      availableFor: ["plan1"],
      includedIn: ["plan2", "plan3", "plan4"],
      hidden: false,
    },
    "analytics": {
      name: "Analytics",
      description: "Análisis avanzados y reportes detallados para optimización de la operación",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "marketValueReport": {
      name: "Reporte de Valor de Mercado",
      description: "Reportes detallados sobre valores de mercado del ganado",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: false,
    },
    "truckScalehead": {
      name: "Integración con Balanzas de Camiones",
      description: "Integración con sistemas de balanza de camión para pesaje automático",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "dumpBox": {
      name: "Integración con Dump Box",
      description: "Integración con sistemas de Dump Box para automatización de alimentación",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "MicroMachineIntegration": {
      name: "Integración con Micro Máquina",
      description: "Integración con sistemas de micro máquina para automatización avanzada",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "grainBank": {
      name: "Banco de Granos",
      description: "Sistema de gestión de banco de granos",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
    },
    "cuota481": {
      name: "Cuota 481",
      description: "Sistema de gestión de cuota 481",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
    },
    "pastureManagementBasic": {
      name: "Gestión de Pastura Básica",
      description: "Sistema básico de gestión de pastura",
      availableFor: ["plan1", "plan2"],
      includedIn: [],
      hidden: false,
    },
    "pastureManagementAdvanced": {
      name: "Gestión de Pastura Avanzada",
      description: "Sistema avanzado de gestión de pastura",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
    },
    "cowCalfBasic": {
      name: "Cow-Calf Básico",
      description: "Sistema básico de gestión cow-calf",
      availableFor: ["plan1", "plan2"],
      includedIn: [],
      hidden: false,
    },
    "cowCalfAdvanced": {
      name: "Cow-Calf Avanzado",
      description: "Sistema avanzado de gestión cow-calf",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
    },
    "feedingProtocols": {
      name: "Protocolos de Alimentación",
      description: "Sistema de protocolos de alimentación",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: false,
    },
    "loadDropAutomation": {
      name: "Automatización de Carga y Descarga",
      description: "Sistema de automatización de carga y descarga",
      availableFor: ["plan3", "plan4"],
      includedIn: [],
      comingSoon: true,
      hidden: false,
    },
    "customizeBunkScoring": {
      name: "Personalización de Bunk Scoring",
      description: "Sistema de personalización de bunk scoring",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
    },
    "microingridientManagement": {
      name: "Gestión de Microingredientes",
      description: "Sistema de gestión de microingredientes",
      availableFor: ["plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: false,
    },
    "animalHealthbasic": {
      name: "Sanidad Animal Básica",
      description: "Sistema básico de gestión de la salud del rebaño",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "animalHealthAdvanced": {
      name: "Sanidad Animal Avanzada",
      description: "Sistema avanzado de gestión de la salud del rebaño",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "animalHealthChute": {
      name: "Sanidade Animal Tronco",
      description: "Sistema de sanidade animal integrado com tronco",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      hidden: true,
    },
    "chuteQuickStart": {
      name: "Manga Quick Start",
      description: "Sistema rápido de configuración de manga",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "chuteCattleIN": {
      name: "Manga Cattle IN",
      description: "Sistema de entrada de ganado en manga",
      availableFor: ["plan1", "plan2"],
      includedIn: ["plan3", "plan4"],
      hidden: true,
    },
    "purchases": {
      name: "Compras",
      description: "Sistema de gestión de compras",
      availableFor: ["plan1", "plan2", "plan3", "plan4"],
      includedIn: [],
      hidden: true,
    },
    "advancedInventory": {
      name: "Inventario Avanzado",
      description: "Sistema avanzado de gestión de inventario",
      availableFor: ["plan2", "plan3"],
      includedIn: ["plan4"],
      comingSoon: true,
      hidden: false,
    },
  },
};

/**
 * Helper function to get add-on price from configuration
 * Maps add-on IDs to their corresponding price fields in PRICES_BY_COUNTRY
 */
function getAddOnPriceFromConfig(addOnId: string, selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  
  // Map add-on IDs to their corresponding price fields in owner-plans.ts
  const priceMapping: Record<string, keyof typeof countryPrices> = {
    // Core add-ons
    [ADDON_IDS.CUSTOM_FEEDER]: "customFeeder",
    [ADDON_IDS.USER_CLIENTS]: "clientUsers",
    
    // Animal Health related
    [ADDON_IDS.ANIMAL_HEALTH]: "AnimalHealth",
    [ADDON_IDS.ANIMAL_HEALTH_BASIC]: "AnimalHealthbasic",
    [ADDON_IDS.ANIMAL_HEALTH_ADVANCED]: "AnimalHealthadvanced",
    [ADDON_IDS.ANIMAL_HEALTH_CHUTE]: "animalHealthChute",
    
    // Chute related
    [ADDON_IDS.CHUTE]: "Chute",
    [ADDON_IDS.EID_INTEGRATION]: "EIDIntegration",
    [ADDON_IDS.CHUTE_QUICK_START]: "ChuteQuickStart",
    [ADDON_IDS.CHUTE_CATTLE_IN]: "ChuteCattleIN",
    
    // Feeding related
    [ADDON_IDS.ADVANCED_FEEDING]: "AdvancedFeeding",
    [ADDON_IDS.FEEDING_PROTOCOLS]: "FeedingProtocols",
    [ADDON_IDS.INPUT_TRANSFORMATION]: "InputTransformation",
    [ADDON_IDS.LOAD_DROP_AUTOMATION]: "FeedingAutomation",
    [ADDON_IDS.CUSTOMIZE_BUNK_SCORING]: "BunkScoreCustomization",
    [ADDON_IDS.MICROINGREDIENT_MANAGEMENT]: "MicroingredientesManagement",
    [ADDON_IDS.AUTO_ADJUST]: "AutoAdjust",
    
    // Inventory and Purchases
    [ADDON_IDS.PURCHASES]: "Purchases",
    [ADDON_IDS.ADVANCED_INVENTORY]: "AdvancedInventory",
    
    // Analytics and Reports
    [ADDON_IDS.ANALYTICS]: "Analytics",
    [ADDON_IDS.MARKET_VALUE_REPORT]: "MarketValueReport",
    
    // Integrations
    [ADDON_IDS.TRUCK_SCALEHEAD]: "TruckScaleIntegration",
    [ADDON_IDS.DUMP_BOX]: "DumpBoxIntegration",
    [ADDON_IDS.MICRO_MACHINE_INTEGRATION]: "MicroMachineIntegration",
    
    // Additional modules
    [ADDON_IDS.GRAIN_BANK]: "grainBank",
    [ADDON_IDS.CUOTA_481]: "Cuota481",
    [ADDON_IDS.PASTURE_MANAGEMENT_BASIC]: "pastureBasic",
    [ADDON_IDS.PASTURE_MANAGEMENT_ADVANCED]: "pastureAdvanced",
    [ADDON_IDS.COW_CALF_BASIC]: "cowCalfBasic",
    [ADDON_IDS.COW_CALF_ADVANCED]: "cowCalfAdvanced",
  };

  const priceField = priceMapping[addOnId];
  return priceField ? countryPrices[priceField] : 0;
}

/**
 * Main function to get all add-ons for a specific country
 * Returns complete add-on objects with pricing, availability, and configuration
 */
export function getAddOns(selectedCountry: string): AddOn[] {
  const countryConfigs = ADDON_CONFIGS_BY_COUNTRY[selectedCountry] ?? ADDON_CONFIGS_BY_COUNTRY["OT$EN"];

  // Get all available add-on IDs for this country
  const addOnIds = Object.keys(countryConfigs);

  return addOnIds.map(addOnId => {
    const config = countryConfigs[addOnId];
    
    return {
      id: addOnId, // Use the addOnKey as the ID for consistency
      name: config.name,
      description: config.description,
      price: getAddOnPriceFromConfig(addOnId, selectedCountry),
      availableFor: config.availableFor,
      includedIn: config.includedIn,
      isCustomFeeder: config.isCustomFeeder,
      comingSoon: config.comingSoon,
      hidden: config.hidden,
      country: selectedCountry,
    };
  });
}

/**
 * Helper function to find add-on by ID in a list of add-ons
 */
export function findAddOnById(addOns: AddOn[], addOnId: string): AddOn | undefined {
  return addOns.find(addon => addon.id === addOnId);
}

/**
 * Helper function to get complete add-on information by ID and country
 * Returns null if add-on is not found
 */
export function getAddOnInfo(addOnId: string, selectedCountry: string) {
  const addOns = getAddOns(selectedCountry);
  const addOn = addOns.find(addon => addon.id === addOnId);
  
  if (!addOn) {
    return null;
  }

  return {
    id: addOn.id,
    name: addOn.name,
    description: addOn.description,
    price: addOn.price,
    availableFor: addOn.availableFor,
    includedIn: addOn.includedIn,
    isCustomFeeder: addOn.isCustomFeeder,
    comingSoon: addOn.comingSoon,
    hidden: addOn.hidden,
    country: addOn.country,
  };
}

// Helper function to get add-on name by ID and country
export function getAddOnName(addOnId: string, selectedCountry: string): string {
  const addOnInfo = getAddOnInfo(addOnId, selectedCountry);
  return addOnInfo?.name || addOnId;
}

// Helper function to get add-on description by ID and country
export function getAddOnDescription(addOnId: string, selectedCountry: string): string {
  const addOnInfo = getAddOnInfo(addOnId, selectedCountry);
  return addOnInfo?.description || '';
}

// Helper function to get add-on price by ID and country
export function getAddOnPrice(addOnId: string, selectedCountry: string): number {
  const addOnInfo = getAddOnInfo(addOnId, selectedCountry);
  return addOnInfo?.price || 0;
}

// Helper function to check if add-on is available for a specific plan
export function isAddOnAvailableForPlan(addOnId: string, planId: string, selectedCountry: string): boolean {
  const addOnInfo = getAddOnInfo(addOnId, selectedCountry);
  if (!addOnInfo) return false;
  
  return addOnInfo.availableFor.includes(planId);
}

// Helper function to check if add-on is included in a specific plan
export function isAddOnIncludedInPlan(addOnId: string, planId: string, selectedCountry: string): boolean {
  const addOnInfo = getAddOnInfo(addOnId, selectedCountry);
  if (!addOnInfo) return false;
  
  return addOnInfo.includedIn.includes(planId);
}

// Helper function to check if add-on is custom feeder
export function isAddOnCustomFeeder(addOnId: string, selectedCountry: string): boolean {
  const addOnInfo = getAddOnInfo(addOnId, selectedCountry);
  return addOnInfo?.isCustomFeeder || false;
}

// Helper function to check if add-on is coming soon
export function isAddOnComingSoon(addOnId: string, selectedCountry: string): boolean {
  const addOnInfo = getAddOnInfo(addOnId, selectedCountry);
  return addOnInfo?.comingSoon || false;
}

// Helper function to get all add-ons available for a specific plan
export function getAddOnsForPlan(planId: string, selectedCountry: string): AddOn[] {
  const addOns = getAddOns(selectedCountry);
  return addOns.filter(addon => 
    addon.availableFor.includes(planId) || addon.includedIn.includes(planId)
  );
}

// Helper function to get add-ons that are included in a specific plan
export function getIncludedAddOnsForPlan(planId: string, selectedCountry: string): AddOn[] {
  const addOns = getAddOns(selectedCountry);
  return addOns.filter(addon => addon.includedIn.includes(planId));
}

// Helper function to get add-ons that can be purchased for a specific plan
export function getPurchasableAddOnsForPlan(planId: string, selectedCountry: string): AddOn[] {
  const addOns = getAddOns(selectedCountry);
  return addOns.filter(addon => 
    addon.availableFor.includes(planId) && !addon.includedIn.includes(planId) && !addon.hidden
  );
}

/**
 * Helper function to get visible add-ons (not hidden)
 * Filters out add-ons marked as hidden: true
 */
export function getVisibleAddOns(selectedCountry: string): AddOn[] {
  const addOns = getAddOns(selectedCountry);
  return addOns.filter(addon => !addon.hidden);
}

/**
 * Helper function to get visible add-ons for a specific plan
 * Returns add-ons that are available for or included in the specified plan
 */
export function getVisibleAddOnsForPlan(planId: string, selectedCountry: string): AddOn[] {
  const addOns = getAddOns(selectedCountry);
  return addOns.filter(addon => 
    (addon.availableFor.includes(planId) || addon.includedIn.includes(planId)) && !addon.hidden
  );
}

/**
 * SPECIFIC ADD-ON GETTER FUNCTIONS
 * 
 * These functions provide convenient access to specific add-ons by their key.
 * They use the unified naming convention from addonKeys.
 */

// Helper functions to get specific add-ons by key
export function getCustomFeederAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.CUSTOM_FEEDER);
}

export function getUserClientsAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.USER_CLIENTS);
}

export function getAnimalHealthAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.ANIMAL_HEALTH);
}

export function getChuteAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.CHUTE);
}

export function getEidReaderAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.EID_INTEGRATION);
}

export function getAdvancedFeedingAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.ADVANCED_FEEDING);
}

export function getInputTransformationAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.INPUT_TRANSFORMATION);
}

export function getAnalyticsAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.ANALYTICS);
}

export function getMarketValueReportAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.MARKET_VALUE_REPORT);
}

export function getTruckScaleheadAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.TRUCK_SCALEHEAD);
}

export function getDumpBoxAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.DUMP_BOX);
}

export function getMicroMachineIntegrationAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.MICRO_MACHINE_INTEGRATION);
}

export function getGrainBankAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.GRAIN_BANK);
}

export function getCuota481AddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.CUOTA_481);
}

export function getPastureManagementBasicAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.PASTURE_MANAGEMENT_BASIC);
}

export function getPastureManagementAdvancedAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.PASTURE_MANAGEMENT_ADVANCED);
}

export function getCowCalfBasicAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.COW_CALF_BASIC);
}

export function getCowCalfAdvancedAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.COW_CALF_ADVANCED);
}

export function getFeedingProtocolsAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.FEEDING_PROTOCOLS);
}

export function getLoadDropAutomationAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.LOAD_DROP_AUTOMATION);
}

export function getCustomizeBunkScoringAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.CUSTOMIZE_BUNK_SCORING);
}

export function getMicroingridientManagementAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.MICROINGREDIENT_MANAGEMENT);
}

export function getAnimalHealthBasicAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.ANIMAL_HEALTH_BASIC);
}

export function getAnimalHealthAdvancedAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.ANIMAL_HEALTH_ADVANCED);
}

export function getChuteQuickStartAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.CHUTE_QUICK_START);
}

export function getChuteCattleINAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.CHUTE_CATTLE_IN);
}

export function getPurchasesAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.PURCHASES);
}

export function getAdvancedInventoryAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.ADVANCED_INVENTORY);
}

export function getAnimalHealthChuteAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.ANIMAL_HEALTH_CHUTE);
}

export function getAutoAdjustAddOn(selectedCountry: string): AddOn | undefined {
  const addOns = getAddOns(selectedCountry);
  return addOns.find(addon => addon.id === ADDON_IDS.AUTO_ADJUST);
}
 