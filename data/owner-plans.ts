import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import type { Plan } from "@/types/pricing";

// Re-export the Plan interface for backward compatibility
export type { Plan };



// Plan names by country
export const PLAN_NAME_BY_COUNTRY: Record<
  string,
  Record<"plan1" | "plan2" | "plan3" | "plan4", string>
> = {
  AR: {
    plan1: "Feedlot Inicial",
    plan2: "Feedlot Esencial",
    plan3: "Feedlot Integral",
    plan4: "Feedlot Avanzado",
  },
  BR: {
    plan1: "Confinamento LITE",
    plan2: "Confinamento GO",
    plan3: "Confinamento FLEX",
    plan4: "Confinamento PRO",
  },
  US: {
    plan1: "Feeder START",
    plan2: "Feeder CORE",
    plan3: "Feeder PLUS",
    plan4: "Feeder MAX",
  },
  CA: {
    plan1: "Feeder START",
    plan2: "Feeder CORE",
    plan3: "Feeder PLUS",
    plan4: "Feeder MAX",
  },
  UY: {
    plan1: "Feedlot Inicial",
    plan2: "Feedlot Esencial",
    plan3: "Feedlot Integral",
    plan4: "Feedlot Avanzado",
  },
  PY: {
    plan1: "Confinamiento Inicial",
    plan2: "Confinamiento Esencial",
    plan3: "Confinamiento Integral",
    plan4: "Confinamiento Avanzado",
  },
  CH: {
    plan1: "Feedlot Inicial",
    plan2: "Feedlot Esencial",
    plan3: "Feedlot Integral",
    plan4: "Feedlot Avanzado",
  },
  BO: {
    plan1: "Confinamiento Inicial",
    plan2: "Confinamiento Esencial",
    plan3: "Confinamiento Integral",
    plan4: "Confinamiento Avanzado",
  },
  MX: {
    plan1: "Feeder START",
    plan2: "Feeder CORE",
    plan3: "Feeder PLUS",
    plan4: "Feeder MAX",
  },
  OT$EN: {
    plan1: "Feeder START",
    plan2: "Feeder CORE",
    plan3: "Feeder PLUS",
    plan4: "Feeder MAX",
  },
  OT$ES: {
    plan1: "Feeder START",
    plan2: "Feeder CORE",
    plan3: "Feeder PLUS",
    plan4: "Feeder MAX",
  },
};

// Prices by country
export const PRICES_BY_COUNTRY: Record<
  string,
  {
    plan1: number;
    plan2: number;
    plan3: number;
    plan4: number;
    plan1pens: number;
    plan2pens: number;
    plan3pens: number;
    plan4pens: number;
    plan1users: number;
    plan2users: number;
    plan3users: number;
    plan4usesr: number;
    ExtraUsers: number;
    ExtraPens: number;
    customFeeder: number;
    billing: number;
    grainBank: number;
    clientUsers: number;
    AnimalHealth: number;
    AnimalHealthbasic: number;
    AnimalHealthadvanced: number;
    animalHealthChute: number;
    Chute: number;
    ChuteQuickStart: number;
    ChuteCattleIN: number;
    ChuteNewOrder: number;
    EIDIntegration: number;
    AdvancedFeeding: number;
    FeedingProtocols: number;
    InputTransformation: number;
    Purchases: number;
    MicroingredientesManagement: number;
    FeedingAutomation: number;
    AutoAdjust: number;
    BunkScoreCustomization: number;
    AdvancedInventory: number;
    Analytics: number;
    MarketValueReport: number;
    TruckScaleIntegration: number;
    DumpBoxIntegration: number;
    MicroMachineIntegration: number;
    informeCuota481: number;
    cowCalfBasic: number;
    cowCalfAdvanced: number;
    pastureBasic: number;
    pastureAdvanced: number;
  }
> = {
  BR: {
    plan1: 1000,
    plan2: 1500,
    plan3: 1950,
    plan4: 3700,
    plan1pens: 10,
    plan2pens: 25,
    plan3pens: 40,
    plan4pens: 80,
    plan1users: 1,
    plan2users: 2,
    plan3users: 3,
    plan4usesr: 5,
    ExtraUsers: 120,
    ExtraPens: 50,
    customFeeder: 700,
    billing: 0,
    grainBank: 0,
    clientUsers: 120,
    AnimalHealth: 400,
    AnimalHealthbasic: 0,
    AnimalHealthadvanced: 0,
    animalHealthChute: 0,
    Chute: 300,
    ChuteQuickStart: 0,
    ChuteCattleIN: 0,
    ChuteNewOrder: 0,
    EIDIntegration: 300,
    AdvancedFeeding: 550,
    FeedingProtocols: 0,
    InputTransformation: 300,
    Purchases: 120,
    MicroingredientesManagement: 0,
    FeedingAutomation: 0,
    AutoAdjust: 0,
    BunkScoreCustomization: 0,
    AdvancedInventory: 550,
    Analytics: 0,
    MarketValueReport: 300,
    TruckScaleIntegration: 0,
    DumpBoxIntegration: 0,
    MicroMachineIntegration: 0,
    informeCuota481: 0,
    cowCalfBasic: 0,
    cowCalfAdvanced: 0,
    pastureBasic: 0,
    pastureAdvanced: 0,
  },
  AR: {
    plan1: 200,
    plan2: 300,
    plan3: 400,
    plan4: 500,
    plan1pens: 15,
    plan2pens: 25,
    plan3pens: 40,
    plan4pens: 60,
    plan1users: 2,
    plan2users: 3,
    plan3users: 4,
    plan4usesr: 6,
    ExtraUsers: 20,
    ExtraPens: 5,
    customFeeder: 75,
    billing: 0,
    grainBank: 0,
    clientUsers: 20,
    AnimalHealth: 75,
    AnimalHealthbasic: 0,
    AnimalHealthadvanced: 0,
    animalHealthChute: 0,
    Chute: 75,
    ChuteQuickStart: 0,
    ChuteCattleIN: 0,
    ChuteNewOrder: 0,
    EIDIntegration: 0,
    AdvancedFeeding: 0,
    FeedingProtocols: 50,
    AutoAdjust: 0,
    BunkScoreCustomization: 0,
    FeedingAutomation: 0,
    AdvancedInventory: 50,
    InputTransformation: 25,
    Purchases: 25,
    MicroingredientesManagement: 0,
    Analytics: 0,
    MarketValueReport: 0,
    TruckScaleIntegration: 100,
    DumpBoxIntegration: 100,
    MicroMachineIntegration: 100,
    informeCuota481: 25,
    cowCalfBasic: 0,
    cowCalfAdvanced: 0,
    pastureBasic: 0,
    pastureAdvanced: 0,
  },
  US: {
    plan1: 165,
    plan2: 221,
    plan3: 305,
    plan4: 650,
    plan1pens: 15,
    plan2pens: 30,
    plan3pens: 40,
    plan4pens: 60,
    plan1users: 1,
    plan2users: 2,
    plan3users: 3,
    plan4usesr: 5,
    ExtraUsers: 20,
    ExtraPens: 5,
    customFeeder: 100,
    billing: 0,
    grainBank: 0,
    clientUsers: 20,
    AnimalHealth: 0,
    AnimalHealthbasic: 0,
    AnimalHealthadvanced: 0,
    animalHealthChute: 0,
    Chute: 0,
    ChuteQuickStart: 0,
    ChuteCattleIN: 0,
    ChuteNewOrder: 0,
    EIDIntegration: 50,
    AdvancedFeeding: 100,
    FeedingProtocols: 0,
    AutoAdjust: 0,
    BunkScoreCustomization: 0,
    FeedingAutomation: 0,
    AdvancedInventory: 100,
    InputTransformation: 25,
    Purchases: 25,
    MicroingredientesManagement: 50,
    Analytics: 50,
    MarketValueReport: 25,
    TruckScaleIntegration: 100,
    DumpBoxIntegration: 100,
    MicroMachineIntegration: 100,
    informeCuota481: 0,
    cowCalfBasic: 0,
    cowCalfAdvanced: 0,
    pastureBasic: 0,
    pastureAdvanced: 0,
  },
  CA: {
    plan1: 165,
    plan2: 221,
    plan3: 305,
    plan4: 533,
    plan1pens: 15,
    plan2pens: 30,
    plan3pens: 40,
    plan4pens: 60,
    plan1users: 1,
    plan2users: 2,
    plan3users: 3,
    plan4usesr: 5,
    ExtraUsers: 20,
    ExtraPens: 5,
    customFeeder: 100,
    billing: 0,
    grainBank: 50,
    clientUsers: 20,
    AnimalHealth: 0,
    AnimalHealthbasic: 0,
    AnimalHealthadvanced: 0,
    animalHealthChute: 0,
    Chute: 0,
    ChuteQuickStart: 0,
    ChuteCattleIN: 0,
    ChuteNewOrder: 0,
    EIDIntegration: 50,
    AdvancedFeeding: 100,
    FeedingProtocols: 0,
    AutoAdjust: 0,
    BunkScoreCustomization: 0,
    FeedingAutomation: 0,
    AdvancedInventory: 100,
    InputTransformation: 25,
    Purchases: 25,
    MicroingredientesManagement: 50,
    Analytics: 50,
    MarketValueReport: 25,
    TruckScaleIntegration: 100,
    DumpBoxIntegration: 100,
    MicroMachineIntegration: 100,
    informeCuota481: 0,
    cowCalfBasic: 0,
    cowCalfAdvanced: 0,
    pastureBasic: 0,
    pastureAdvanced: 0,
  },
  UY: {
    plan1: 200,
    plan2: 300,
    plan3: 400,
    plan4: 500,
    plan1pens: 15,
    plan2pens: 25,
    plan3pens: 40,
    plan4pens: 60,
    plan1users: 2,
    plan2users: 3,
    plan3users: 4,
    plan4usesr: 6,
    ExtraUsers: 20,
    ExtraPens: 5,
    customFeeder: 75,
    billing: 0,
    grainBank: 0,
    clientUsers: 20,
    AnimalHealth: 75,
    AnimalHealthbasic: 0,
    AnimalHealthadvanced: 0,
    animalHealthChute: 0,
    Chute: 75,
    ChuteQuickStart: 0,
    ChuteCattleIN: 0,
    ChuteNewOrder: 0,
    EIDIntegration: 0,
    AdvancedFeeding: 0,
    FeedingProtocols: 50,
    AutoAdjust: 0,
    BunkScoreCustomization: 0,
    FeedingAutomation: 0,
    AdvancedInventory: 50,
    InputTransformation: 25,
    Purchases: 25,
    MicroingredientesManagement: 0,
    Analytics: 0,
    MarketValueReport: 0,
    TruckScaleIntegration: 100,
    DumpBoxIntegration: 100,
    MicroMachineIntegration: 100,
    informeCuota481: 25,
    cowCalfBasic: 0,
    cowCalfAdvanced: 0,
    pastureBasic: 0,
    pastureAdvanced: 0,
  },
  PY: {
    plan1: 200,
    plan2: 300,
    plan3: 400,
    plan4: 500,
    plan1pens: 15,
    plan2pens: 25,
    plan3pens: 40,
    plan4pens: 60,
    plan1users: 2,
    plan2users: 3,
    plan3users: 4,
    plan4usesr: 6,
    ExtraUsers: 20,
    ExtraPens: 5,
    customFeeder: 75,
    billing: 0,
    grainBank: 0,
    clientUsers: 20,
    AnimalHealth: 75,
    AnimalHealthbasic: 0,
    AnimalHealthadvanced: 0,
    animalHealthChute: 0,
    Chute: 75,
    ChuteQuickStart: 0,
    ChuteCattleIN: 0,
    ChuteNewOrder: 0,
    EIDIntegration: 0,
    AdvancedFeeding: 0,
    FeedingProtocols: 50,
    AutoAdjust: 0,
    BunkScoreCustomization: 0,
    FeedingAutomation: 0,
    AdvancedInventory: 50,
    InputTransformation: 25,
    Purchases: 25,
    MicroingredientesManagement: 0,
    Analytics: 0,
    MarketValueReport: 0,
    TruckScaleIntegration: 100,
    DumpBoxIntegration: 100,
    MicroMachineIntegration: 100,
    informeCuota481: 25,
    cowCalfBasic: 0,
    cowCalfAdvanced: 0,
    pastureBasic: 0,
    pastureAdvanced: 0,
  },
  CH: {
    plan1: 200,
    plan2: 300,
    plan3: 400,
    plan4: 500,
    plan1pens: 15,
    plan2pens: 25,
    plan3pens: 40,
    plan4pens: 60,
    plan1users: 2,
    plan2users: 3,
    plan3users: 4,
    plan4usesr: 6,
    ExtraUsers: 20,
    ExtraPens: 5,
    customFeeder: 75,
    billing: 0,
    grainBank: 0,
    clientUsers: 20,
    AnimalHealth: 75,
    AnimalHealthbasic: 0,
    AnimalHealthadvanced: 0,
    animalHealthChute: 0,
    Chute: 75,
    ChuteQuickStart: 0,
    ChuteCattleIN: 0,
    ChuteNewOrder: 0,
    EIDIntegration: 0,
    AdvancedFeeding: 0,
    FeedingProtocols: 50,
    AutoAdjust: 0,
    BunkScoreCustomization: 0,
    FeedingAutomation: 0,
    AdvancedInventory: 50,
    InputTransformation: 25,
    Purchases: 25,
    MicroingredientesManagement: 0,
    Analytics: 0,
    MarketValueReport: 0,
    TruckScaleIntegration: 100,
    DumpBoxIntegration: 100,
    MicroMachineIntegration: 100,
    informeCuota481: 25,
    cowCalfBasic: 0,
    cowCalfAdvanced: 0,
    pastureBasic: 0,
    pastureAdvanced: 0,
  },
  BO: {
    plan1: 200,
    plan2: 300,
    plan3: 400,
    plan4: 500,
    plan1pens: 15,
    plan2pens: 25,
    plan3pens: 40,
    plan4pens: 60,
    plan1users: 2,
    plan2users: 3,
    plan3users: 4,
    plan4usesr: 6,
    ExtraUsers: 20,
    ExtraPens: 5,
    customFeeder: 75,
    billing: 0,
    grainBank: 0,
    clientUsers: 20,
    AnimalHealth: 75,
    AnimalHealthbasic: 0,
    AnimalHealthadvanced: 0,
    animalHealthChute: 0,
    Chute: 75,
    ChuteQuickStart: 0,
    ChuteCattleIN: 0,
    ChuteNewOrder: 0,
    EIDIntegration: 0,
    AdvancedFeeding: 0,
    FeedingProtocols: 50,
    AutoAdjust: 0,
    BunkScoreCustomization: 0,
    FeedingAutomation: 0,
    AdvancedInventory: 50,
    InputTransformation: 25,
    Purchases: 25,
    MicroingredientesManagement: 0,
    Analytics: 0,
    MarketValueReport: 0,
    TruckScaleIntegration: 100,
    DumpBoxIntegration: 100,
    MicroMachineIntegration: 100,
    informeCuota481: 25,
    cowCalfBasic: 0,
    cowCalfAdvanced: 0,
    pastureBasic: 0,
    pastureAdvanced: 0,
  },
  MX: {
    plan1: 165,
    plan2: 221,
    plan3: 305,
    plan4: 533,
    plan1pens: 15,
    plan2pens: 30,
    plan3pens: 40,
    plan4pens: 60,
    plan1users: 1,
    plan2users: 2,
    plan3users: 3,
    plan4usesr: 5,
    ExtraUsers: 20,
    ExtraPens: 5,
    customFeeder: 100,
    billing: 0,
    grainBank: 50,
    clientUsers: 20,
    AnimalHealth: 0,
    AnimalHealthbasic: 0,
    AnimalHealthadvanced: 0,
    animalHealthChute: 0,
    Chute: 0,
    ChuteQuickStart: 0,
    ChuteCattleIN: 0,
    ChuteNewOrder: 0,
    EIDIntegration: 50,
    AdvancedFeeding: 100,
    FeedingProtocols: 0,
    AutoAdjust: 0,
    BunkScoreCustomization: 0,
    FeedingAutomation: 0,
    AdvancedInventory: 100,
    InputTransformation: 25,
    Purchases: 25,
    MicroingredientesManagement: 50,
    Analytics: 50,
    MarketValueReport: 25,
    TruckScaleIntegration: 100,
    DumpBoxIntegration: 100,
    MicroMachineIntegration: 100,
    informeCuota481: 0,
    cowCalfBasic: 0,
    cowCalfAdvanced: 0,
    pastureBasic: 0,
    pastureAdvanced: 0,
  },
  OT$EN:{
    plan1: 165,
    plan2: 221,
    plan3: 305,
    plan4: 533,
    plan1pens: 15,
    plan2pens: 30,
    plan3pens: 40,
    plan4pens: 60,
    plan1users: 1,
    plan2users: 2,
    plan3users: 3,
    plan4usesr: 5,
    ExtraUsers: 20,
    ExtraPens: 5,
    customFeeder: 100,
    billing: 0,
    grainBank: 50,
    clientUsers: 20,
    AnimalHealth: 0,
    AnimalHealthbasic: 0,
    AnimalHealthadvanced: 0,
    animalHealthChute: 0,
    Chute: 0,
    ChuteQuickStart: 0,
    ChuteCattleIN: 0,
    ChuteNewOrder: 0,
    EIDIntegration: 50,
    AdvancedFeeding: 100,
    FeedingProtocols: 0,
    AutoAdjust: 0,
    BunkScoreCustomization: 0,
    FeedingAutomation: 0,
    AdvancedInventory: 100,
    InputTransformation: 25,
    Purchases: 25,
    MicroingredientesManagement: 50,
    Analytics: 50,
    MarketValueReport: 25,
    TruckScaleIntegration: 100,
    DumpBoxIntegration: 100,
    MicroMachineIntegration: 100,
    informeCuota481: 0,
    cowCalfBasic: 0,
    cowCalfAdvanced: 0,
    pastureBasic: 0,
    pastureAdvanced: 0,
  },
  OT$ES: {
    plan1: 200,
    plan2: 300,
    plan3: 400,
    plan4: 500,
    plan1pens: 15,
    plan2pens: 25,
    plan3pens: 40,
    plan4pens: 60,
    plan1users: 2,
    plan2users: 3,
    plan3users: 4,
    plan4usesr: 6,
    ExtraUsers: 20,
    ExtraPens: 5,
    customFeeder: 100,
    billing: 0,
    grainBank: 0,
    clientUsers: 20,
    AnimalHealth: 75,
    AnimalHealthbasic: 0,
    AnimalHealthadvanced: 0,
    animalHealthChute: 0,
    Chute: 75,
    ChuteQuickStart: 0,
    ChuteCattleIN: 0,
    ChuteNewOrder: 0,
    EIDIntegration: 0,
    AdvancedFeeding: 0,
    FeedingProtocols: 50,
    AutoAdjust: 0,
    BunkScoreCustomization: 0,
    FeedingAutomation: 0,
    AdvancedInventory: 50,
    InputTransformation: 25,
    Purchases: 25,
    MicroingredientesManagement: 0,
    Analytics: 0,
    MarketValueReport: 0,
    TruckScaleIntegration: 100,
    DumpBoxIntegration: 100,
    MicroMachineIntegration: 100,
    informeCuota481: 25,
    cowCalfBasic: 0,
    cowCalfAdvanced: 0,
    pastureBasic: 0,
    pastureAdvanced: 0,
  },
};

// Helper function to calculate annual price
export const calculateAnnualPrice = (monthlyPrice: number) => {
  return Math.round(monthlyPrice * 12 * 0.9);
};

// Helper function to get coming soon text
export const getComingSoonText = (selectedCountry: string) => {
  switch (selectedCountry) {
    case "US":
    case "CA":
      return "Coming Soon";
    case "AR":
    case "PY":
    case "UY":
    case "BO":
    case "MX":
    case "CH":
    case "OT$ES":
      return "Proximamente";
    case "BR":
      return "Em Breve";
    default:
      return "Coming Soon";
  }
};

// Helper function to get localized pens and users text
function getLocalizedPensUsersText(selectedCountry: string): { pens: string; users: string } {
  console.log("🔍 getLocalizedPensUsersText called with country:", selectedCountry);
  
  const translations: Record<string, { pens: string; users: string }> = {
    BR: { pens: "currais", users: "usuários" },
    AR: { pens: "corrales", users: "usuarios" },
    US: { pens: "pens", users: "users" },
    CA: { pens: "pens", users: "users" },
    MX: { pens: "corrales", users: "usuarios" },
    PY: { pens: "corrales", users: "usuarios" },
    UY: { pens: "corrales", users: "usuarios" },
    BO: { pens: "corrales", users: "usuarios" },
    CH: { pens: "corrales", users: "usuarios" },
    "OT$EN": { pens: "pens", users: "users" },
    "OT$ES": { pens: "corrales", users: "usuarios" },
  };

  const result = translations[selectedCountry] ?? translations["OT$EN"];
  console.log("🔍 getLocalizedPensUsersText result:", result);
  return result;
}

// Function to get owner plans for a specific country
export function getOwnerPlans(selectedCountry: string): Plan[] {
  const planName =
    PLAN_NAME_BY_COUNTRY[selectedCountry] ?? PLAN_NAME_BY_COUNTRY["OT$EN"];
  const countryPrices =
    PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  const localizedText = getLocalizedPensUsersText(selectedCountry);

  const plans: Plan[] = [];

  // Plan 1
  if (planName.plan1) {
    plans.push({
      id: planName.plan1,
      name: planName.plan1,
      price: countryPrices.plan1,
      annualPrice: calculateAnnualPrice(countryPrices.plan1),
      description: getPlanDescription(selectedCountry, 1),
      pens: `${countryPrices.plan1pens} ${localizedText.pens}`,
      users: `${countryPrices.plan1users} ${localizedText.users}`,
      keyFeatures: getPlanFeatures(selectedCountry, 1),
      popular: false,
      country: selectedCountry,
    });
  }

  // Plan 2
  if (planName.plan2) {
    plans.push({
      id: planName.plan2,
      name: planName.plan2,
      price: countryPrices.plan2,
      annualPrice: calculateAnnualPrice(countryPrices.plan2),
      description: getPlanDescription(selectedCountry, 2),
      pens: `${countryPrices.plan2pens} ${localizedText.pens}`,
      users: `${countryPrices.plan2users} ${localizedText.users}`,
      keyFeatures: getPlanFeatures(selectedCountry, 2),
      popular: getPopularPlan(selectedCountry) === 2,
      country: selectedCountry,
    });
  }

  // Plan 3
  if (planName.plan3) {
    plans.push({
      id: planName.plan3,
      name: planName.plan3,
      price: countryPrices.plan3,
      annualPrice: calculateAnnualPrice(countryPrices.plan3),
      description: getPlanDescription(selectedCountry, 3),
      pens: `${countryPrices.plan3pens} ${localizedText.pens}`,
      users: `${countryPrices.plan3users} ${localizedText.users}`,
      keyFeatures: getPlanFeatures(selectedCountry, 3),
      popular: getPopularPlan(selectedCountry) === 3,
      country: selectedCountry,
    });
  }

  // Plan 4
  if (planName.plan4) {
    plans.push({
      id: planName.plan4,
      name: planName.plan4,
      price: countryPrices.plan4,
      annualPrice: calculateAnnualPrice(countryPrices.plan4),
      description: getPlanDescription(selectedCountry, 4),
      pens: `${countryPrices.plan4pens} ${localizedText.pens}`,
      users: `${countryPrices.plan4usesr} ${localizedText.users}`,
      keyFeatures: getPlanFeatures(selectedCountry, 4),
      popular: getPopularPlan(selectedCountry) === 4,
      country: selectedCountry,
    });
  }

  return plans;
}

// Helper function to get plan descriptions
export function getPlanDescription(country: string, planNumber: number): string {
  const descriptions: Record<string, Record<number, string>> = {
    BR: {
      1: "Para quem quer focar no essencial da gestão do rebanho e da alimentação",
      2: "Ideal para quem quer levar a gestão alimentar a um novo nível, com planejamento e personalização.",
      3: "Registro em tempo real do trabalho no tronco, ideal para quem não quer deixar nenhum detalhe de fora.",
      4: "Ideal para quem não abre mão de uma sanidade integral.",
    },
    AR: {
      1: "Para quienes quieren enfocarse en lo fundamental de la gestión de hacienda y alimentación.",
      2: "Ideal para quienes buscan una gestión completa de sanidad.",
      3: "Registro en tiempo real del trabajo en manga, ideal para quienes no quieren dejar ningún detalle afuera.",
      4: "Pensado para feedlots con gestión avanzada de alimentación e inventarios",
    },
    US: {
      1: "For essential cattle and feed management.",
      2: "Everything you need for basic health and chute operations",
      3: "Run advanced health and chute workflows — powered by EID",
      4: "Feeding and inventory automations with market value reports — all in one plan.",
    },
    CA: {
      1: "For essential cattle and feed management.",
      2: "Everything you need for basic health and chute operations",
      3: "Run advanced health and chute workflows — powered by EID",
      4: "Feeding and inventory automations with market value reports — all in one plan.",
    },
    PY: {
      1: "Para quienes quieren enfocarse en lo fundamental de la gestión de hacienda y alimentación.",
      2: "Planifica mejor tu alimentación con protocolos y herramientas de premix.",
      3: "Llevá tu operación al siguiente nivel con lectura de batea personalizada y entrada de animales desde la manga.",
      4: "Manejo completo de sanidad y trabajo en manga en un solo plan.",
    },
    CH: {
      1: "Para quienes quieren enfocarse en lo fundamental de la gestión de hacienda y alimentación.",
      2: "Ideal para quienes buscan una gestión completa de sanidad.",
      3: "Llevá tu operación al siguiente nivel con manejo de manga completo y automatizaciones en la alimentación.",
      4: "Pensado para feedlots con gestión avanzada de alimentación e inventarios.",
    },
    UY: {
      1: "Para quienes quieren enfocarse en lo fundamental de la gestión de hacienda y alimentación.",
      2: "Manejo completo de sanidad y trabajo en manga en un solo plan.",
      3: "Pensado para feedlots con gestión avanzada de alimentación e inventarios",
    },
    BO: {
      1: "Para quienes quieren enfocarse en lo fundamental de la gestión de hacienda y alimentación.",
      2: "Manejo completo de sanidad y trabajo en manga en un solo plan.",
      3: "Pensado para feedlots con gestión avanzada de alimentación e inventarios",
    },
    MX: {
      1: "Para quienes quieren enfocarse en lo fundamental de la gestión de hacienda y alimentación.",
      2: "Todo lo que necesita para una gestión básica de la sanidad y manga en un solo plan.",
      3: "Trabajo avanzado de sanidad y manga — potenciado por EID",
      4: "Automatización de alimentación e inventarios con informes de valor de mercado — todo en un plan.",
    },
    OT$EN: {
      1: "For essential cattle and feed management.",
      2: "Everything you need for basic health and chute operations",
      3: "Run advanced health and chute workflows — powered by EID",
      4: "Feeding and inventory automations with market value reports — all in one plan.",
    },
    OT$ES: {
      1:"Para quienes quieren enfocarse en lo fundamental de la gestión de hacienda y alimentación.",
      2: "Todo lo que necesita para una gestión básica de la sanidad y manga en un solo plan.",
      3: "Trabajo avanzado de sanidad y manga — potenciado por EID",
      4: "Automatización de alimentación e inventarios con informes de valor de mercado — todo en un plan.",
    },
  };

  return (
    descriptions[country]?.[planNumber] ?? descriptions["OT$EN"][planNumber]
  );
}

// Helper function to get plan features
export function getPlanFeatures(
  country: string,
  planNumber: number
): string[] {
  const features: Record<
    string,
    Record<number, string[]>
  > = {
    BR: {
      1: [
        "Gestão completa da alimentação",
        "Manejo do rebanho e mapa de currais",
        "Gestão de inventários",
      
      ],
      2: [
        "Tudo do LITE",
        "Protocolos de alimentação",
        "Personalização da leitura de cocho",
      ],
      3: [
        "Tudo do GO",
        "Trabalho de tronco completo",
        "Integração com leitores de caravanas eletrônicas",
        "Transformação de ingredientes - Criação de premixes",
        "Ingresso de animais desde o tronco",
      ],
      4: [
        "Tudo do GO",
        "Sanidade animal (protocolos de tratamento, registros de eventos e análises).",
        "Transformação de ingredientes",
        "Gestão de compras de insumos",
      ],
    },
    AR: {
      1: [
        "Gestión completa de Alimentación",
        "Lectura de comederos configurable",
        "Manejo de Hacienda, Mapa de Corrales y Liquidaciones",
        "Manejo de Inventarios",
        "Optimización de Viajes del Mixer",
        "Corrección por Desvíos de Entrega",
       
      ],
      2: [
        "Incluye todo en Feedlot Inicial",
        "Sanidad animal (protocolos de tratamiento, registros de eventos y analytics)",
        "Manga e Integración con Lector de Caravana",
        "Manejo sanitario individual de animales",
        
      ],
      3: [
        "Incluye todo en Feedlot Esencial",
        "Programación de Plan de Alimentación por Lote",
        "Creación de Premezclas y Transformación de Suministros",
        "Registro de Compras de Insumos"
      ],
      4: [
        "Incluye todo en Feedlot Integral",
        "Informes cuota 481",
        
      ],
    },
    US: {
      1: [
        "Feeding Management",
        "Yardsheet",
        "Cattle Management",
        "Supply Inventory",
        "Pen Rider",
      ],
      2: [
        "Everything in Starter",
        "Animal Health Basic",
        "Quick Start Chute",
        "Billing",
      ],
      3: [
        "Everything in Core",
        "Advanced Animal Health & Chute",
        "EID Integration",
        "Input Transformation - Premixes creation",
        "Chute-based cattle entry",
      ],
      4: [
        "Everything in Plus",
        "Advanced Feeding & Inventory",
        "Market Value Reports",
        `Analytics (${getComingSoonText(country)})`,
      ],
    },
    CA: {
      1: [
        "Feeding Management",
        "Yardsheet",
        "Cattle Management",
        "Supply Inventory",
        "Pen Rider",
      ],
      2: [
        "Everything in Starter",
        "Animal Health Basic",
        "Quick Start Chute",
        "Billing",
      ],
      3: [
        "Everything in Core",
        "Advanced Animal Health & Chute",
        "EID Integration",
        "Input Transformation - Premixes creation",
        "Chute-based cattle entry",
      ],
      4: [
        "Everything in Plus",
        "Advanced Feeding & Inventory",
        "Market Value Reports",
        `Analytics (${getComingSoonText(country)})`,
      ],
    },
    PY: {
      1: [
        "Gestión completa de Alimentación",
        "Lectura de bateas configurable",
        "Manejo de Hacienda, Mapa de Corrales y Liquidaciones",
        "Manejo de Inventarios",
        "Optimización de Viajes del Mixer",
        "Corrección por Desvíos de Entrega",
      ],
      2: [
        "Incluye todo en Confinamiento Inicial",
        "Programación de Plan de Alimentación por Lote",
        "Creación de Premezclas y Transformación de Suministros",
        "Registro de Compras de Insumos"
      ],
      3: [
        "Incluye todo en Confinamiento Esencial",
        "Sanidad animal (protocolos de tratamiento, registros de eventos y analytics)",
        "Manga e Integración con Lector de Caravana",
        "Manejo sanitario individual de animales",
      ],
      4: [
        "Incluye todo en Confinamiento Integral",
        "Informes cuota 481",
      ],
    },
    CH: {
      1: [
        "Gestión completa de Alimentación",
        "Lectura de comederos configurable",
        "Manejo de Hacienda, Mapa de Corrales y Liquidaciones",
        "Manejo de Inventarios",
        "Optimización de Viajes del Mixer",
        "Corrección por Desvíos de Entrega",
       
      ],
      2: [
        "Incluye todo en Feedlot Inicial",
        "Sanidad animal (protocolos de tratamiento, registros de eventos y analytics)",
        "Manga e Integración con Lector de Caravana",
        "Manejo sanitario individual de animales",
        
      ],
      3: [
        "Incluye todo en Feedlot Esencial",
        "Programación de Plan de Alimentación por Lote",
        "Creación de Premezclas y Transformación de Suministros",
        "Registro de Compras de Insumos"
      ],
      4: [
        "Incluye todo en Feedlot Integral",
        "Informes cuota 481",
      ],
    },
    UY: {
      1: [
        "Gestión completa de Alimentación",
        "Lectura de comederos configurable",
        "Manejo de Hacienda, Mapa de Corrales y Liquidaciones",
        "Manejo de Inventarios",
        "Optimización de Viajes del Mixer",
        "Corrección por Desvíos de Entrega",
       
      ],
      2: [
        "Incluye todo en Feedlot Inicial",
        "Sanidad animal (protocolos de tratamiento, registros de eventos y analytics)",
        "Manga e Integración con Lector de Caravana",
        "Manejo sanitario individual de animales",
        
      ],
      3: [
        "Incluye todo en Feedlot Esencial",
        "Programación de Plan de Alimentación por Lote",
        "Creación de Premezclas y Transformación de Suministros",
        "Registro de Compras de Insumos"
      ],
      4: [
        "Incluye todo en Feedlot Integral",
        "Informes cuota 481",
      ],
    },
    BO: {
      1: [
        "Gestión completa de Alimentación",
        "Lectura de comederos configurable",
        "Manejo de Hacienda, Mapa de Corrales y Liquidaciones",
        "Manejo de Inventarios",
        "Optimización de Viajes del Mixer",
        "Corrección por Desvíos de Entrega",
      ],
      2: [
        "Incluye todo en Confinamiento Inicial",
        "Sanidad animal (protocolos de tratamiento, registros de eventos y analytics)",
        "Manga e Integración con Lector de Caravana",
        "Manejo sanitario individual de animales",
      ],
      3: [
        "Incluye todo en Confinamiento Esencial",
        "Programación de Plan de Alimentación por Lote",
        "Creación de Premezclas y Transformación de Suministros",
        "Registro de Compras de Insumos"
      ],
      4: [
        "Incluye todo en Confinamiento Integral",
        "Informes cuota 481",
      ],
    },
    MX: {
      1: [
        "Gestión completa de Alimentación",
        "Manejo de Hacienda y Mapa de Corrales",
        "Manejo de Inventarios",
      ],
      2: [
        "Incluye todo en Feeder Start",
        "Sanidad animal básica",
        "Manga de inicio rápido",
        "Liquidaciones",
      ],
      3: [
        "Incluye todo en Feeder Core",
        "Trabajo avanzado de sanidad y manga — potenciado por EID",
        "Transformación de ingredientes - Creación de premixes",
        "Ingreso de animales desde la manga",
        "Ingreso de animales desde la manga",
      ],
      4: [
        "Incluye todo en Feeder Plus",
        "Automatización de alimentación e inventarios con informes de valor de mercado",
        "Informes de valor de mercado",
        `Analytics (${getComingSoonText(country)})`,
      ],
    },
    OT$EN: {
      1: [
        "Feeding Management",
        "Yardsheet",
        "Cattle Management",
        "Supply Inventory",
        "Pen Rider",
      ],
      2: [
        "Everything in Starter",
        "Animal Health Basic",
        "Quick Start Chute",
        "Billing",
      ],
      3: [
        "Everything in Core",
        "Advanced Animal Health & Chute",
        "EID Integration",
        "Input Transformation - Premixes creation",
        "Chute-based cattle entry",
      ],
      4: [
        "Everything in Plus",
        "Advanced Feeding & Inventory",
        "Market Value Reports",
        `Analytics (${getComingSoonText(country)})`,
      ],
    },
    OT$ES:{
      1: [
        "Gestión completa de Alimentación",
        "Manejo de Hacienda y Mapa de Corrales",
        "Manejo de Inventarios",
      ],
      2: [
        "Incluye todo en Feeder Start",
        "Sanidad animal básica",
        "Manga de inicio rápido",
        "Liquidaciones",
      ],
      3: [
        "Incluye todo en Feeder Core",
        "Trabajo avanzado de sanidad y manga — potenciado por EID",
        "Transformación de ingredientes - Creación de premixes",
        "Ingreso de animales desde la manga",
        "Ingreso de animales desde la manga",
      ],
      4: [
        "Incluye todo en Feeder Plus",
        "Automatización de alimentación e inventarios con informes de valor de mercado",
        "Informes de valor de mercado",
        `Analytics (${getComingSoonText(country)})`,
      ],
    },
  };

  return features[country]?.[planNumber] ?? features["OT$EN"][planNumber];
}

// Helper function to get which plan is popular for each country
function getPopularPlan(country: string): number {
  const popularPlans: Record<string, number> = {
    BR: 3, // FLEX
    AR: 2, // Esencial
    US: 3, // CORE
    CA: 3, // CORE
    CH: 2, // Esencial
    PY: 2, // Esencial
    UY: 2, // Esencial
    BO: 2, // Esencial
    MX: 2, // CORE
    OT$EN: 3, // CORE
    OT$ES: 3, // CORE
  };

  return popularPlans[country] ?? 2;
}



// Function to find a plan by ID (handles URL encoding)
export function findPlanById(plans: Plan[], planId: string): Plan | undefined {
  return plans.find(
    (plan) =>
      plan.id === planId ||
      encodeURIComponent(plan.id) === planId ||
      decodeURIComponent(planId) === plan.id
  );
}

// Helper function to get extra user price for a country
export function getExtraUserPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.ExtraUsers;
}

// Helper function to get extra pen price for a country
export function getExtraPenPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.ExtraPens;
}

// Helper function to get custom feeder price for a country
export function getCustomFeederPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.customFeeder;
}

// Helper function to get animal health price for a country
export function getAnimalHealthPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.AnimalHealth;
}

// Helper function to get animal health basic price for a country
export function getAnimalHealthBasicPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.AnimalHealthbasic;
}

// Helper function to get animal health advanced price for a country
export function getAnimalHealthAdvancedPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.AnimalHealthadvanced;
}

// Helper function to get animal health chute price for a country
export function getAnimalHealthChutePrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.animalHealthChute;
}

// Helper function to get chute price for a country
export function getChutePrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.Chute;
}
// Helper function to get chute quick start price for a country
export function getchutequickstartPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.ChuteQuickStart;}

export function getchutecattleinPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.ChuteCattleIN;
}
export function getchuteneworderPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.ChuteNewOrder;
}
// Helper function to get EID integration price for a country
export function getEIDIntegrationPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.EIDIntegration;
}

// Helper function to get advanced feeding price for a country
export function getAdvancedFeedingPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.AdvancedFeeding;
}

// Helper function to get input transformation price for a country
export function getInputTransformationPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.InputTransformation;
}

// Helper function to get client users price for a country
export function getClientUsersPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.clientUsers;
}
export function getMicroingredientesManagementPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.MicroingredientesManagement;
}
export function getMarketValueReportPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.MarketValueReport;
}
export function getTruckScaleIntegrationPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.TruckScaleIntegration;
}
export function getDumpBoxIntegrationPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.DumpBoxIntegration;
}
export function getMicroMachineIntegrationPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.MicroMachineIntegration;
}
export function getPurchasesPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.Purchases;
}
export function getBunkcoreCustomizationPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.BunkScoreCustomization;
}
export function getGrainBankPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.grainBank;
} 
export function getAutoAdjustPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.AutoAdjust;
}
export function getFeedingAutomationPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.FeedingAutomation;
}
export function getFeedingProtocolsPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.FeedingProtocols;
}
export function getadvancedinventoryPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.AdvancedInventory;
}
export function getBillingPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.billing;
}
export function getAnalyticsPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.Analytics;
}
export function getInformeCuota481Price(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.informeCuota481;
}
export function getPastureManagementBasicPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.pastureBasic;
}
export function getPastureManagementAdvancedPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.pastureAdvanced;
}
export function getCowCalfBasicPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.cowCalfBasic;
}
export function getCowCalfAdvancedPrice(selectedCountry: string): number {
  const countryPrices = PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];
  return countryPrices.cowCalfAdvanced;
}


