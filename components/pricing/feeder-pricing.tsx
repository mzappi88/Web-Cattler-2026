"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Calendar, CalendarDays, Plus, Users } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { usePricingTranslation } from "@/hooks/use-pricing-translation";
import { CountrySelector } from "@/components/country-selector";

interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  annualPrice?: number;
  description: string;
  pens: string;
  users: string;
  keyFeatures: (string | React.ReactElement)[];
  popular: boolean;
  billingCycle?: "monthly" | "annual";
  planType?: "owner" | "custom";
  promotion?: any;
  promotionalState?: any;
  pricingOption?: "standard" | "plan-50-50";
  headCount?: number;
  summerStartDate?: string;
  summerEndDate?: string;
  summerMonths?: number;
  country: string;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  availableFor: string[];
  includedIn: string[];
  promotion?: any;
  promotionalState?: PricingState;
  comingSoon?: boolean;
  isCustomFeeder?: boolean;
  country: string;
}

interface Feature {
  name: string;
  plan1: any;
  plan2: any;
  plan3: any;
  plan4: any;
  isAddOn?: boolean;
  isExpandable?: boolean;
  isCustomFeeder?: boolean;
  comingSoon?: boolean;
  subFeatures?: {
    name: string;
    plan1: any;
    plan2: any;
    plan3: any;
    plan4: any;
  }[];
  country: string;
}

export interface PricingState {
  isAnnual: boolean;
  isPlan5050: boolean;
  headCount: number;
  summerStartDate: string;
  summerEndDate: string;
  defaultDiscountFactor: number;
  saleActive: boolean;
  saleName: string;
  defaultIsAnnual: boolean;
  discounts: {
    annual: {
      [key: string]: { isActive: boolean; discountFactor: number };
    };
    monthly: {
      [key: string]: { isActive: boolean; discountFactor: number };
    };
    xMonthly: {
      [key: string]: {
        isActive: boolean;
        discountFactor: number;
        xMonths: number;
      };
    };
    freeMonths: {
      [key: string]: {
        isActive: boolean;
        discountFactor: number;
        freeMonths: number;
      };
    };
  };
}

export const initialPricingState: PricingState = {
  isAnnual: false,
  isPlan5050: false,
  headCount: 100,
  summerStartDate: "",
  summerEndDate: "",
  defaultDiscountFactor: 0.1,
  saleActive: false,
  saleName: "Ofertas de Feriado",
  defaultIsAnnual: true,
  discounts: {
    annual: {
      plan1: { isActive: true, discountFactor: 0.15 },
      plan2: { isActive: true, discountFactor: 0.15 },
      plan3: { isActive: true, discountFactor: 0.15 },
      plan4: { isActive: true, discountFactor: 0.15 },
      "customFeeder-addon": { isActive: true, discountFactor: 0.15 },
      "animal-health": { isActive: true, discountFactor: 0.15 },
    },
    monthly: {
      plan1: { isActive: false, discountFactor: 0.2 },
      plan2: { isActive: false, discountFactor: 0.2 },
      plan3: { isActive: true, discountFactor: 0.3 },
      plan4n4: { isActive: false, discountFactor: 0.25 },
      "customFeeder-addon": { isActive: false, discountFactor: 0.2 },
    },
    xMonthly: {
      plan1: { isActive: true, discountFactor: 0.5, xMonths: 6 },
      plan2: { isActive: true, discountFactor: 0.5, xMonths: 6 },
      plan3: { isActive: false, discountFactor: 0.5, xMonths: 6 },
      plan4n4: { isActive: false, discountFactor: 0.4, xMonths: 3 },
      "customFeeder-addon": {
        isActive: false,
        discountFactor: 0.5,
        xMonths: 12,
      },
    },
    freeMonths: {
      plan1: { isActive: false, discountFactor: 0, freeMonths: 2 },
      plan2: { isActive: false, discountFactor: 0, freeMonths: 2 },
      plan3: { isActive: false, discountFactor: 0, freeMonths: 2 },
      plan4n4: { isActive: true, discountFactor: 0, freeMonths: 1 },
      "customFeeder-addon": {
        isActive: false,
        discountFactor: 0,
        freeMonths: 3,
      },
    },
  },
};

export default function Component() {
  const router = useRouter();
  const { t, formatPrice, selectedCountry, setSelectedCountry, isHydrated } =
    usePricingTranslation();
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(
    new Set()
  );
  const [promotionalState, setPromotionalState] =
    useState<PricingState>(initialPricingState);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    promotionalState.defaultIsAnnual ? "annual" : "monthly"
  );
  const [pricingOption, setPricingOption] = useState<"standard" | "plan-50-50">(
    "standard"
  );

  const [summerStartDate, setSummerStartDate] = useState("");
  const [summerEndDate, setSummerEndDate] = useState("");
  const [summerPlan, setSummerPlan] = useState<string>("plan1");

  const calculateAnnualPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 12 * 0.9);
  };

  const getActivePromotion = (
    productId: string,
    billingType: "monthly" | "annual"
  ) => {
    if (!promotionalState.saleActive) return null;

    if (
      billingType === "annual" &&
      promotionalState.discounts.annual[productId]?.isActive
    ) {
      return {
        type: "annual",
        ...promotionalState.discounts.annual[productId],
      };
    }

    if (
      billingType === "monthly" &&
      promotionalState.discounts.monthly[productId]?.isActive
    ) {
      return {
        type: "monthly",
        ...promotionalState.discounts.monthly[productId],
      };
    }

    if (promotionalState.discounts.xMonthly[productId]?.isActive) {
      return {
        type: "xMonthly",
        ...promotionalState.discounts.xMonthly[productId],
      };
    }

    if (promotionalState.discounts.freeMonths[productId]?.isActive) {
      return {
        type: "freeMonths",
        ...promotionalState.discounts.freeMonths[productId],
      };
    }

    return null;
  };

  const calculatePromotionalPrice = (
    originalPrice: number,
    productId: string,
    billingType: "monthly" | "annual"
  ) => {
    const promotion = getActivePromotion(productId, billingType);

    if (!promotion) return originalPrice;

    if (promotion.type === "freeMonths") {
      return originalPrice;
    }

    const discountedPrice = Math.round(
      originalPrice * (1 - promotion.discountFactor)
    );

    return discountedPrice;
  };

  const getPromotionBadgeText = (
    productId: string,
    billingType: "monthly" | "annual"
  ) => {
    const promotion = getActivePromotion(productId, billingType);

    if (!promotion) return null;

    switch (promotion.type) {
      case "xMonthly":
        return `${Math.round(
          promotion.discountFactor * 100
        )}% de desconto por ${(promotion as any).xMonths} meses`;
      case "freeMonths":
        return `${(promotion as any).freeMonths} meses grátis`;
      case "annual":
      case "monthly":
        return `${Math.round(promotion.discountFactor * 100)}% de desconto`;
      default:
        return null;
    }
  };
  const PLAN_NAME_BY_COUNTRY: Record<
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
      plan1: "Feedlot START",
      plan2: "Feedlot CORE",
      plan3: "Feedlot MAX",
      plan4: "",
    },
    PY: {
      plan1: "Confinamiento Esencial",
      plan2: "confinamiento Núcleo",
      plan3: "Confinamiento Total",
      plan4: "Confinamiento Máximo",
    },
    BO: {
      plan1: "Confinamiento START",
      plan2: "Confinamiento CORE",
      plan3: "Confinamiento MAX",
      plan4: "",
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

  const planName =
    PLAN_NAME_BY_COUNTRY[selectedCountry] ?? PLAN_NAME_BY_COUNTRY["OT$EN"];

  // Badge text by country
  const getComingSoonText = () => {
    switch (selectedCountry) {
      case "US":
      case "CA":
        return "Coming Soon";
      case "AR":
        return "Proximamente";
      case "BR":
        return "Em Breve";
      default:
        return "Coming Soon";
    }
  };

  const PRICES_BY_COUNTRY: Record<
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
      grainBank: number;
      clientUsers: number;
      AnimalHealth: number;
      AnimalHealthbasic: number;
      AnimalHealthadvanced: number;
      AnimalHealth$Chute: number;
      Chute: number;
      Chute$EID: number;
      ChuteQuickStart: number;
      ChuteCattleIN: number;
      EIDIntegration: number;
      CustomFeederModule: number;
      AdvancedFeeding: number;
      FeedingProtocols: number;
      InputTransformation: number;
      Purchases: number;
      MicroingredientesManagement: number;
      FeedingAutomation: number;
      BunkScoreCustomization: number;
      AdvancedInventory: number;
      Analytics: number;
      MarketValueReport: number;
      TruckScaleIntegration: number;
      DumpBoxIntegration: number;
      MicroMachineIntegration: number;
      Cuota481: number;
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
      grainBank: 0,
      clientUsers: 120,
      AnimalHealth: 400,
      AnimalHealthbasic: 0,
      AnimalHealthadvanced: 0,
      AnimalHealth$Chute: 0,
      Chute: 300,
      Chute$EID: 0,
      ChuteQuickStart: 0,
      ChuteCattleIN: 0,
      EIDIntegration: 300,
      CustomFeederModule: 0,
      AdvancedFeeding: 550,
      FeedingProtocols: 0,
      InputTransformation: 300,
      Purchases: 120,
      MicroingredientesManagement: 0,
      FeedingAutomation: 0,
      BunkScoreCustomization: 0,
      AdvancedInventory: 550,
      Analytics: 0,
      MarketValueReport: 300,
      TruckScaleIntegration: 0,
      DumpBoxIntegration: 0,
      MicroMachineIntegration: 0,
      Cuota481: 0,
      cowCalfBasic: 0,
      cowCalfAdvanced: 0,
      pastureBasic: 0,
      pastureAdvanced: 0,
    },
    AR: {
      plan1: 70,
      plan2: 90,
      plan3: 120,
      plan4: 200,
      plan1pens: 15,
      plan2pens: 25,
      plan3pens: 40,
      plan4pens: 60,
      plan1users: 1,
      plan2users: 2,
      plan3users: 3,
      plan4usesr: 5,
      ExtraUsers: 8,
      ExtraPens: 2,
      customFeeder: 30,
      grainBank: 8,
      clientUsers: 0,
      AnimalHealth: 0,
      AnimalHealthbasic: 0,
      AnimalHealthadvanced: 0,
      AnimalHealth$Chute: 0,
      Chute: 0,
      Chute$EID: 20,
      ChuteQuickStart: 0,
      ChuteCattleIN: 0,
      EIDIntegration: 0,
      CustomFeederModule: 0,
      AdvancedFeeding: 0,
      FeedingProtocols: 20,
      BunkScoreCustomization: 10,
      FeedingAutomation: 10,
      AdvancedInventory: 40,
      InputTransformation: 10,
      Purchases: 10,
      MicroingredientesManagement: 0,
      Analytics: 20,
      MarketValueReport: 10,
      TruckScaleIntegration: 40,
      DumpBoxIntegration: 40,
      MicroMachineIntegration: 0,
      Cuota481: 10,
      cowCalfBasic: 0,
      cowCalfAdvanced: 0,
      pastureBasic: 0,
      pastureAdvanced: 0,
    },
    US: {
      plan1: 165,
      plan2: 199,
      plan3: 275,
      plan4: 480,
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
      grainBank: 50,
      clientUsers: 20,
      AnimalHealth: 0,
      AnimalHealthbasic: 0,
      AnimalHealthadvanced: 0,
      AnimalHealth$Chute: 0,
      Chute: 0,
      Chute$EID: 50,
      ChuteQuickStart: 0,
      ChuteCattleIN: 0,
      EIDIntegration: 0,
      CustomFeederModule: 0,
      AdvancedFeeding: 0,
      FeedingProtocols: 0,
      BunkScoreCustomization: 0,
      FeedingAutomation: 0,
      AdvancedInventory: 100,
      InputTransformation: 25,
      Purchases: 0,
      MicroingredientesManagement: 0,
      Analytics: 50,
      MarketValueReport: 25,
      TruckScaleIntegration: 100,
      DumpBoxIntegration: 100,
      MicroMachineIntegration: 100,
      Cuota481: 0,
      cowCalfBasic: 0,
      cowCalfAdvanced: 0,
      pastureBasic: 0,
      pastureAdvanced: 0,
    },
    CA: {
      plan1: 165,
      plan2: 199,
      plan3: 275,
      plan4: 480,
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
      grainBank: 50,
      clientUsers: 20,
      AnimalHealth: 0,
      AnimalHealthbasic: 0,
      AnimalHealthadvanced: 0,
      AnimalHealth$Chute: 0,
      Chute: 0,
      Chute$EID: 50,
      ChuteQuickStart: 0,
      ChuteCattleIN: 0,
      EIDIntegration: 0,
      CustomFeederModule: 0,
      AdvancedFeeding: 0,
      FeedingProtocols: 0,
      BunkScoreCustomization: 0,
      FeedingAutomation: 0,
      AdvancedInventory: 100,
      InputTransformation: 25,
      Purchases: 0,
      MicroingredientesManagement: 0,
      Analytics: 50,
      MarketValueReport: 25,
      TruckScaleIntegration: 100,
      DumpBoxIntegration: 100,
      MicroMachineIntegration: 100,
      Cuota481: 0,
      cowCalfBasic: 0,
      cowCalfAdvanced: 0,
      pastureBasic: 0,
      pastureAdvanced: 0,
    },
    UY: {
      plan1: 200,
      plan2: 300,
      plan3: 500,
      plan4: 0,
      plan1pens: 10,
      plan2pens: 20,
      plan3pens: 40,
      plan4pens: 0,
      plan1users: 2,
      plan2users: 3,
      plan3users: 4,
      plan4usesr: 0,
      ExtraUsers: 20,
      ExtraPens: 5,
      customFeeder: 100,
      grainBank: 0,
      clientUsers: 20,
      AnimalHealth: 0,
      AnimalHealthbasic: 0,
      AnimalHealthadvanced: 0,
      AnimalHealth$Chute: 100,
      Chute: 0,
      Chute$EID: 50,
      ChuteQuickStart: 0,
      ChuteCattleIN: 0,
      EIDIntegration: 0,
      CustomFeederModule: 0,
      AdvancedFeeding: 0,
      FeedingProtocols: 0,
      BunkScoreCustomization: 0,
      FeedingAutomation: 25,
      AdvancedInventory: 100,
      InputTransformation: 25,
      Purchases: 0,
      MicroingredientesManagement: 0,
      Analytics: 50,
      MarketValueReport: 25,
      TruckScaleIntegration: 100,
      DumpBoxIntegration: 100,
      MicroMachineIntegration: 0,
      Cuota481: 0,
      cowCalfBasic: 0,
      cowCalfAdvanced: 0,
      pastureBasic: 0,
      pastureAdvanced: 0,
    },
    PY: {
      plan1: 200,
      plan2: 275,
      plan3: 390,
      plan4: 500,
      plan1pens: 10,
      plan2pens: 15,
      plan3pens: 20,
      plan4pens: 30,
      plan1users: 2,
      plan2users: 3,
      plan3users: 4,
      plan4usesr: 5,
      ExtraUsers: 20,
      ExtraPens: 5,
      customFeeder: 100,
      grainBank: 0,
      clientUsers: 20,
      AnimalHealth: 0,
      AnimalHealthbasic: 0,
      AnimalHealthadvanced: 0,
      AnimalHealth$Chute: 100,
      Chute: 0,
      Chute$EID: 50,
      ChuteQuickStart: 0,
      ChuteCattleIN: 25,
      EIDIntegration: 0,
      CustomFeederModule: 0,
      AdvancedFeeding: 0,
      FeedingProtocols: 0,
      BunkScoreCustomization: 25,
      FeedingAutomation: 0,
      AdvancedInventory: 100,
      InputTransformation: 25,
      Purchases: 0,
      MicroingredientesManagement: 0,
      Analytics: 50,
      MarketValueReport: 25,
      TruckScaleIntegration: 100,
      DumpBoxIntegration: 100,
      MicroMachineIntegration: 0,
      Cuota481: 0,
      cowCalfBasic: 0,
      cowCalfAdvanced: 0,
      pastureBasic: 0,
      pastureAdvanced: 0,
    },
    BO: {
      plan1: 200,
      plan2: 300,
      plan3: 500,
      plan4: 0,
      plan1pens: 10,
      plan2pens: 20,
      plan3pens: 40,
      plan4pens: 0,
      plan1users: 2,
      plan2users: 3,
      plan3users: 4,
      plan4usesr: 0,
      ExtraUsers: 20,
      ExtraPens: 5,
      customFeeder: 100,
      grainBank: 0,
      clientUsers: 20,
      AnimalHealth: 0,
      AnimalHealthbasic: 0,
      AnimalHealthadvanced: 0,
      AnimalHealth$Chute: 100,
      Chute: 0,
      Chute$EID: 50,
      ChuteQuickStart: 0,
      ChuteCattleIN: 0,
      EIDIntegration: 0,
      CustomFeederModule: 0,
      AdvancedFeeding: 0,
      FeedingProtocols: 0,
      BunkScoreCustomization: 0,
      FeedingAutomation: 25,
      AdvancedInventory: 100,
      InputTransformation: 25,
      Purchases: 0,
      MicroingredientesManagement: 0,
      Analytics: 50,
      MarketValueReport: 25,
      TruckScaleIntegration: 100,
      DumpBoxIntegration: 100,
      MicroMachineIntegration: 0,
      Cuota481: 0,
      cowCalfBasic: 0,
      cowCalfAdvanced: 0,
      pastureBasic: 0,
      pastureAdvanced: 0,
    },
    MX: {
      plan1: 165,
      plan2: 199,
      plan3: 275,
      plan4: 480,
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
      grainBank: 50,
      clientUsers: 20,
      AnimalHealth: 0,
      AnimalHealthbasic: 0,
      AnimalHealthadvanced: 0,
      AnimalHealth$Chute: 0,
      Chute: 0,
      Chute$EID: 50,
      ChuteQuickStart: 0,
      ChuteCattleIN: 0,
      EIDIntegration: 0,
      CustomFeederModule: 0,
      AdvancedFeeding: 0,
      FeedingProtocols: 0,
      BunkScoreCustomization: 0,
      FeedingAutomation: 0,
      AdvancedInventory: 100,
      InputTransformation: 25,
      Purchases: 0,
      MicroingredientesManagement: 0,
      Analytics: 50,
      MarketValueReport: 25,
      TruckScaleIntegration: 100,
      DumpBoxIntegration: 100,
      MicroMachineIntegration: 100,
      Cuota481: 0,
      cowCalfBasic: 0,
      cowCalfAdvanced: 0,
      pastureBasic: 0,
      pastureAdvanced: 0,
    },
    OT$EN: {
      plan1: 165,
      plan2: 199,
      plan3: 275,
      plan4: 480,
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
      grainBank: 50,
      clientUsers: 20,
      AnimalHealth: 0,
      AnimalHealthbasic: 0,
      AnimalHealthadvanced: 0,
      AnimalHealth$Chute: 0,
      Chute: 0,
      Chute$EID: 50,
      ChuteQuickStart: 0,
      ChuteCattleIN: 0,
      EIDIntegration: 0,
      CustomFeederModule: 0,
      AdvancedFeeding: 0,
      FeedingProtocols: 0,
      BunkScoreCustomization: 0,
      FeedingAutomation: 0,
      AdvancedInventory: 100,
      InputTransformation: 25,
      Purchases: 0,
      MicroingredientesManagement: 0,
      Analytics: 50,
      MarketValueReport: 25,
      TruckScaleIntegration: 100,
      DumpBoxIntegration: 100,
      MicroMachineIntegration: 100,
      Cuota481: 0,
      cowCalfBasic: 0,
      cowCalfAdvanced: 0,
      pastureBasic: 0,
      pastureAdvanced: 0,
    },
    OT$ES: {
      plan1: 165,
      plan2: 199,
      plan3: 275,
      plan4: 480,
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
      grainBank: 50,
      clientUsers: 20,
      AnimalHealth: 0,
      AnimalHealthbasic: 0,
      AnimalHealthadvanced: 0,
      AnimalHealth$Chute: 0,
      Chute: 0,
      Chute$EID: 50,
      ChuteQuickStart: 0,
      ChuteCattleIN: 0,
      EIDIntegration: 0,
      CustomFeederModule: 0,
      AdvancedFeeding: 0,
      FeedingProtocols: 0,
      BunkScoreCustomization: 0,
      FeedingAutomation: 0,
      AdvancedInventory: 100,
      InputTransformation: 25,
      Purchases: 0,
      MicroingredientesManagement: 0,
      Analytics: 50,
      MarketValueReport: 25,
      TruckScaleIntegration: 100,
      DumpBoxIntegration: 100,
      MicroMachineIntegration: 100,
      Cuota481: 0,
      cowCalfBasic: 0,
      cowCalfAdvanced: 0,
      pastureBasic: 0,
      pastureAdvanced: 0,
    },
    // Otros países si hace falta
  };
  const countryPrices =
    PRICES_BY_COUNTRY[selectedCountry] ?? PRICES_BY_COUNTRY["OT$EN"];

  const PEN_PRICE = 30;
  const USER_PRICE = 120;

  const ownerPlansBR: Omit<Plan, "country">[] = [
    {
      id: "BR-Lite",
      name: planName.plan1,
      price: countryPrices.plan1,
      annualPrice: calculateAnnualPrice(countryPrices.plan1),
      description: "caca",
      pens: `${countryPrices.plan1pens} ${"pens"}`,
      users: `${countryPrices.plan1users} ${"user"}`,
      keyFeatures: [
        "feeding",
        "cattleManagement",
        "suppliesInventory",
        "dietManagement",
      ],
      popular: false,
    },
    {
      id: "BR-Go",
      name: planName.plan2,
      price: countryPrices.plan2,
      annualPrice: calculateAnnualPrice(countryPrices.plan2),
      description: t("planGoDesc"),
      pens: `${countryPrices.plan2pens} ${t("pens")}`,
      users: `${countryPrices.plan2users} ${t("users")}`,
      keyFeatures: [
        "Tudo do LITE",
        "Protocolos de alimentação",
        "Personalização da leitura de cocho",
      ],
      popular: false,
    },
    {
      id: "BR-Flex",
      name: planName.plan3,
      price: countryPrices.plan3,
      annualPrice: calculateAnnualPrice(countryPrices.plan3),
      description: t("planFlexDesc"),
      pens: `${countryPrices.plan3pens} ${t("pens")}`,
      users: `${countryPrices.plan3users} ${t("users")}`,
      keyFeatures: [
        "Tudo do GO",
        t("chute"),
        t("tagReaderIntegration"),
        t("premixGeneration"),
      ],
      popular: true,
    },
    {
      id: "BR-Pro",
      name: planName.plan4,
      price: countryPrices.plan4,
      annualPrice: calculateAnnualPrice(countryPrices.plan4),
      description: t("planFlexDesc"),
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Tudo do GO",
        t("chute"),
        t("tagReaderIntegration"),
        t("premixGeneration"),
      ],
      popular: true,
    },
  ];
  // Plans for ARGENTINA
  const ownerPlansAR: Omit<Plan, "country">[] = [
    {
      id: "AR-Inicial",
      name: planName.plan1,
      price: countryPrices.plan1,
      annualPrice: calculateAnnualPrice(countryPrices.plan1),
      description:
        "Para quienes quieren enfocarse en lo fundamental de la gestión de hacienda y alimentación.",
      pens: `${countryPrices.plan1pens} ${"pens"}`,
      users: `${countryPrices.plan1users} ${"user"}`,
      keyFeatures: [
        "Gestión comleta de Alimentación",
        "Manejo de Haciendad y Mapa de Corrales",
        "Manejo de Inventarios",
      ],
      popular: false,
    },
    {
      id: "AR-Esencial",
      name: planName.plan2,
      price: countryPrices.plan2,
      annualPrice: calculateAnnualPrice(countryPrices.plan2),
      description: "Ideal para quienes buscan una gestión completa de sanidad.",
      pens: `${countryPrices.plan2pens} ${t("pens")}`,
      users: `${countryPrices.plan2users} ${t("users")}`,
      keyFeatures: [
        "Incluye todo en Feedlot Inicial",
        "Sanidad animal (protocolos de tratamiento, registros de eventos y analytics)",
        "Manejo sanitario individual de animales",
        "PLectura de comederos personalizada",
      ],
      popular: false,
    },
    {
      id: "AR-Integral",
      name: planName.plan3,
      price: countryPrices.plan3,
      annualPrice: calculateAnnualPrice(countryPrices.plan3),
      description:
        "Registro en tiempo real del trabajo en manga, ideal para quienes no quieren dejar ningún detalle afuera.",
      pens: `${countryPrices.plan3pens} ${t("pens")}`,
      users: `${countryPrices.plan3users} ${t("users")}`,
      keyFeatures: [
        "Incluye todo en Feedlot Esencial",
        "Trabajo de manga completo",
        "Integración con lectores de caravanas electrónicas",
        "Creación de premixes",
      ],
      popular: true,
    },
    {
      id: "AR-Avanzado",
      name: planName.plan4,
      price: countryPrices.plan4,
      annualPrice: calculateAnnualPrice(countryPrices.plan4),
      description:
        "Pensado para feedlots con gestión avanzada de alimentación e inventarios",
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Incluye todo en Feedlot Integral",
        "Protocolos de alimentación y autogeneración de órdenes de alimentación",
        "Informes cuota 481",
        "Inventario avanzado",
      ],
      popular: true,
    },
  ];
  const ownerPlansUS: Omit<Plan, "country">[] = [
    {
      id: "US-Start",
      name: planName.plan1,
      price: countryPrices.plan1,
      annualPrice: calculateAnnualPrice(countryPrices.plan1),
      description: "For essential cattle and feed management.",
      pens: `${countryPrices.plan1pens} ${"pens"}`,
      users: `${countryPrices.plan1users} ${"user"}`,
      keyFeatures: [
        "Feeding Management",
        "Yardsheet",
        "Cattle Management",
        "Supply Inventory",
        "Pen Rider",
      ],
      popular: false,
    },
    {
      id: "US-Core",
      name: planName.plan2,
      price: countryPrices.plan2,
      annualPrice: calculateAnnualPrice(countryPrices.plan2),
      description: "Everything you need for basic health and chute operations",
      pens: `${countryPrices.plan2pens} ${t("pens")}`,
      users: `${countryPrices.plan2users} ${t("users")}`,
      keyFeatures: [
        "Everything in Starter",
        "Animal Health Basic",
        "Quick Start Chute",
        "Billing",
      ],
      popular: true,
    },
    {
      id: "US-Plus",
      name: planName.plan3,
      price: countryPrices.plan3,
      annualPrice: calculateAnnualPrice(countryPrices.plan3),
      description: "Run advanced health and chute workflows — powered by EID",
      pens: `${countryPrices.plan3pens} ${t("pens")}`,
      users: `${countryPrices.plan3users} ${t("users")}`,
      keyFeatures: [
        "Everything in Core",
        "Advanced Animal Health & Chute",
        "EID Integration",
        "Input Transformation - Premixes creation",
        "Chute-based cattle entry",
      ],
      popular: false,
    },
    {
      id: "US-Max",
      name: planName.plan4,
      price: countryPrices.plan4,
      annualPrice: calculateAnnualPrice(countryPrices.plan4),
      description:
        "Feeding and inventory automations with market value reports — all in one plan.",
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Everything in Plus",
        "Advanced Feeding & Inventory",
        "Market Value Reports",
        <span className="flex items-center">
          Analytics
          <Badge className="ml-2 bg-blue-500 text-white text-xs">
            {getComingSoonText()}
          </Badge>
        </span>,
      ],
      popular: false,
    },
  ];
  const ownerPlansCA: Omit<Plan, "country">[] = [
    {
      id: "CA-Start",
      name: planName.plan1,
      price: countryPrices.plan1,
      annualPrice: calculateAnnualPrice(countryPrices.plan1),
      description: "For essential cattle and feed management.",
      pens: `${countryPrices.plan1pens} ${"pens"}`,
      users: `${countryPrices.plan1users} ${"user"}`,
      keyFeatures: [
        "Feeding Management",
        "Yardsheet",
        "Cattle Management",
        "Supply Inventory",
        "Pen Rider",
      ],
      popular: false,
    },
    {
      id: "CA-Core",
      name: planName.plan2,
      price: countryPrices.plan2,
      annualPrice: calculateAnnualPrice(countryPrices.plan2),
      description: "Everything you need for basic health and chute operations",
      pens: `${countryPrices.plan2pens} ${t("pens")}`,
      users: `${countryPrices.plan2users} ${t("users")}`,
      keyFeatures: [
        "Everything in Starter",
        "Animal Health Basic",
        "Quick Start Chute",
        "Billing",
      ],
      popular: true,
    },
    {
      id: "CA-Plus",
      name: planName.plan3,
      price: countryPrices.plan3,
      annualPrice: calculateAnnualPrice(countryPrices.plan3),
      description: "Run advanced health and chute workflows — powered by EID",
      pens: `${countryPrices.plan3pens} ${t("pens")}`,
      users: `${countryPrices.plan3users} ${t("users")}`,
      keyFeatures: [
        "Everything in Core",
        "Advanced Animal Health & Chute",
        "EID Integration",
        "Input Transformation - Premixes creation",
        "Chute-based cattle entry",
      ],
      popular: false,
    },
    {
      id: "CA-Max",
      name: planName.plan4,
      price: countryPrices.plan4,
      annualPrice: calculateAnnualPrice(countryPrices.plan4),
      description:
        "Feeding and inventory automations with market value reports — all in one plan.",
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Everything in Plus",
        "Advanced Feeding & Inventory",
        "Market Value Reports",
        <span className="flex items-center">
          Analytics
          <Badge className="ml-2 bg-blue-500 text-white text-xs">
            {getComingSoonText()}
          </Badge>
        </span>,
      ],
      popular: false,
    },
  ];
  const ownerPlansPY: Omit<Plan, "country">[] = [
    {
      id: "PY-Esencial",
      name: planName.plan1,
      price: countryPrices.plan1,
      annualPrice: calculateAnnualPrice(countryPrices.plan1),
      description:
        "Para quienes quieren enfocarse en lo fundamental de la gestión de hacienda y alimentación.",
      pens: `${countryPrices.plan1pens} ${"pens"}`,
      users: `${countryPrices.plan1users} ${"user"}`,
      keyFeatures: [
        "Gestión comleta de Alimentación",
        "Manejo de Haciendad y Mapa de Corrales",
        "Manejo de Inventarios",
      ],
      popular: false,
    },
    {
      id: "PY-Nucleo",
      name: planName.plan2,
      price: countryPrices.plan2,
      annualPrice: calculateAnnualPrice(countryPrices.plan2),
      description:
        "Planifica mejor tu alimentación con protocolos y herramientas de premix.",
      pens: `${countryPrices.plan2pens} ${t("pens")}`,
      users: `${countryPrices.plan2users} ${t("users")}`,
      keyFeatures: [
        "Incluye todo en Confinamiento Inicial",
        "Protocolos de alimentación",
        "Creación de premixes",
      ],
      popular: false,
    },
    {
      id: "PY-Total",
      name: planName.plan3,
      price: countryPrices.plan3,
      annualPrice: calculateAnnualPrice(countryPrices.plan3),
      description:
        "Llevá tu operación al siguiente nivel con lectura de batea personalizada y entrada de animales desde la manga.",
      pens: `${countryPrices.plan3pens} ${t("pens")}`,
      users: `${countryPrices.plan3users} ${t("users")}`,
      keyFeatures: [
        "Incluye todo en Confinamiento Nucleo",
        "Ingreso de animales desde la manga",
        "Lectura de bateas personalizada",
        "Autoajuste de entregas",
      ],
      popular: true,
    },
    {
      id: "PY-Maximo",
      name: planName.plan4,
      price: countryPrices.plan4,
      annualPrice: calculateAnnualPrice(countryPrices.plan4),
      description:
        "Manejo completo de sanidad y trabajo en manga en un solo plan.",
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Incluye todo en Confinamiento Total",
        "Sanidad animal (protocolos de tratamiento, registros de eventos y analytics)",
        "Trabajo de manga completo y conexión con lectores caravanas electrónicas",
        "Inventario avanzado",
      ],
      popular: false,
    },
  ];
  const ownerPlanUY: Omit<Plan, "country">[] = [
    {
      id: "UY-Start",
      name: planName.plan1,
      price: countryPrices.plan1,
      annualPrice: calculateAnnualPrice(countryPrices.plan1),
      description:
        "Para quienes quieren enfocarse en lo fundamental de la gestión de hacienda y alimentación.",
      pens: `${countryPrices.plan1pens} ${"pens"}`,
      users: `${countryPrices.plan1users} ${"user"}`,
      keyFeatures: [
        "Gestión comleta de Alimentación",
        "Manejo de Haciendad y Mapa de Corrales",
        "Manejo de Inventarios",
      ],
      popular: false,
    },
    {
      id: "UY-Core",
      name: planName.plan2,
      price: countryPrices.plan2,
      annualPrice: calculateAnnualPrice(countryPrices.plan2),
      description:
        "Manejo completo de sanidad y trabajo en manga en un solo plan.",
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Incluye todo en Feedlot Start",
        "Sanidad animal (protocolos de tratamiento, registros de eventos y analytics)",
        "Trabajo de manga completo y conexión con lectores caravanas electrónicas",
        "Protocolos de alimentación",
      ],
      popular: true,
    },
    {
      id: "UY-Max",
      name: planName.plan3,
      price: countryPrices.plan3,
      annualPrice: calculateAnnualPrice(countryPrices.plan3),
      description:
        "Pensado para feedlots con gestión avanzada de alimentación e inventarios",
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Incluye todo en Feedlot Core",
        "Lectura de Comederos Personalizada",
        "Informes cuota 481",
        "Inventario avanzado",
      ],
      popular: false,
    },
  ];
  const ownerPlansBO: Omit<Plan, "country">[] = [
    {
      id: "BO-Start",
      name: planName.plan1,
      price: countryPrices.plan1,
      annualPrice: calculateAnnualPrice(countryPrices.plan1),
      description:
        "Para quienes quieren enfocarse en lo fundamental de la gestión de hacienda y alimentación.",
      pens: `${countryPrices.plan1pens} ${"pens"}`,
      users: `${countryPrices.plan1users} ${"user"}`,
      keyFeatures: [
        "Gestión comleta de Alimentación",
        "Manejo de Haciendad y Mapa de Corrales",
        "Manejo de Inventarios",
      ],
      popular: false,
    },
    {
      id: "BO-Core",
      name: planName.plan2,
      price: countryPrices.plan2,
      annualPrice: calculateAnnualPrice(countryPrices.plan2),
      description:
        "Manejo completo de sanidad y trabajo en manga en un solo plan.",
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Incluye todo en Confinamiento Start",
        "Sanidad animal (protocolos de tratamiento, registros de eventos y analytics)",
        "Trabajo de manga completo y conexión con lectores caravanas electrónicas",
        "Protocolos de alimentación",
      ],
      popular: true,
    },
    {
      id: "BO-Max",
      name: planName.plan3,
      price: countryPrices.plan3,
      annualPrice: calculateAnnualPrice(countryPrices.plan3),
      description:
        "Pensado para feedlots con gestión avanzada de alimentación e inventarios",
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Incluye todo en Confinamiento Core",
        "Lectura de Comederos Personalizada",
        "Informes cuota 481",
        "Inventario avanzado",
      ],
      popular: false,
    },
  ];
  const ownerPlansOT$EN: Omit<Plan, "country">[] = [
    {
      id: "OT-EN-Start",
      name: planName.plan1,
      price: countryPrices.plan1,
      annualPrice: calculateAnnualPrice(countryPrices.plan1),
      description: "For essential cattle and feed management.",
      pens: `${countryPrices.plan1pens} ${"pens"}`,
      users: `${countryPrices.plan1users} ${"user"}`,
      keyFeatures: [
        "Feeding Management",
        "Yardsheet",
        "Cattle Management",
        "Supply Inventory",
        "Pen Rider",
      ],
      popular: false,
    },
    {
      id: "OT-EN-Core",
      name: planName.plan2,
      price: countryPrices.plan2,
      annualPrice: calculateAnnualPrice(countryPrices.plan2),
      description: "Everything you need for basic health and chute operations",
      pens: `${countryPrices.plan2pens} ${t("pens")}`,
      users: `${countryPrices.plan2users} ${t("users")}`,
      keyFeatures: [
        "Everything in Starter",
        "Animal Health Basic",
        "Quick Start Chute",
        "Billing",
      ],
      popular: true,
    },
    {
      id: "OT-EN-Plus",
      name: planName.plan3,
      price: countryPrices.plan3,
      annualPrice: calculateAnnualPrice(countryPrices.plan3),
      description: "Run advanced health and chute workflows — powered by EID",
      pens: `${countryPrices.plan3pens} ${t("pens")}`,
      users: `${countryPrices.plan3users} ${t("users")}`,
      keyFeatures: [
        "Everything in Core",
        "Advanced Animal Health & Chute",
        "EID Integration",
        "Input Transformation - Premixes creation",
        "Chute-based cattle entry",
      ],
      popular: false,
    },
    {
      id: "OT-EN-Max",
      name: planName.plan4,
      price: countryPrices.plan4,
      annualPrice: calculateAnnualPrice(countryPrices.plan4),
      description:
        "Feeding and inventory automations with market value reports — all in one plan.",
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Everything in Plus",
        "Advanced Feeding & Inventory",
        "Market Value Reports",
        <span className="flex items-center">
          Analytics
          <Badge className="ml-2 bg-blue-500 text-white text-xs">
            {getComingSoonText()}
          </Badge>
        </span>,
      ],
      popular: false,
    },
  ];
  const ownerPlansOT$ES: Omit<Plan, "country">[] = [
    {
      id: "OT-ES-Start",
      name: planName.plan1,
      price: countryPrices.plan1,
      annualPrice: calculateAnnualPrice(countryPrices.plan1),
      description: "For essential cattle and feed management.",
      pens: `${countryPrices.plan1pens} ${"pens"}`,
      users: `${countryPrices.plan1users} ${"user"}`,
      keyFeatures: [
        "Feeding Management",
        "Yardsheet",
        "Cattle Management",
        "Supply Inventory",
        "Pen Rider",
      ],
      popular: false,
    },
    {
      id: "OT-ES-Core",
      name: planName.plan2,
      price: countryPrices.plan2,
      annualPrice: calculateAnnualPrice(countryPrices.plan2),
      description: "Everything you need for basic health and chute operations",
      pens: `${countryPrices.plan2pens} ${t("pens")}`,
      users: `${countryPrices.plan2users} ${t("users")}`,
      keyFeatures: [
        "Everything in Starter",
        "Animal Health Basic",
        "Quick Start Chute",
        "Billing",
      ],
      popular: true,
    },
    {
      id: "OT-ES-Plus",
      name: planName.plan3,
      price: countryPrices.plan3,
      annualPrice: calculateAnnualPrice(countryPrices.plan3),
      description: "Run advanced health and chute workflows — powered by EID",
      pens: `${countryPrices.plan3pens} ${t("pens")}`,
      users: `${countryPrices.plan3users} ${t("users")}`,
      keyFeatures: [
        "Everything in Core",
        "Advanced Animal Health & Chute",
        "EID Integration",
        "Input Transformation - Premixes creation",
        "Chute-based cattle entry",
      ],
      popular: false,
    },
    {
      id: "OT-ES-Max",
      name: planName.plan4,
      price: countryPrices.plan4,
      annualPrice: calculateAnnualPrice(countryPrices.plan4),
      description:
        "Feeding and inventory automations with market value reports — all in one plan.",
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Everything in Plus",
        "Advanced Feeding & Inventory",
        "Market Value Reports",
        <span className="flex items-center">
          Analytics
          <Badge className="ml-2 bg-blue-500 text-white text-xs">
            {getComingSoonText()}
          </Badge>
        </span>,
      ],
      popular: false,
    },
  ];
  const ownerPlansMX: Omit<Plan, "country">[] = [
    {
      id: "MX-Start",
      name: planName.plan1,
      price: countryPrices.plan1,
      annualPrice: calculateAnnualPrice(countryPrices.plan1),
      description: "For essential cattle and feed management.",
      pens: `${countryPrices.plan1pens} ${"pens"}`,
      users: `${countryPrices.plan1users} ${"user"}`,
      keyFeatures: [
        "Feeding Management",
        "Yardsheet",
        "Cattle Management",
        "Supply Inventory",
        "Pen Rider",
      ],
      popular: false,
    },
    {
      id: "MX-Core",
      name: planName.plan2,
      price: countryPrices.plan2,
      annualPrice: calculateAnnualPrice(countryPrices.plan2),
      description: "Everything you need for basic health and chute operations",
      pens: `${countryPrices.plan2pens} ${t("pens")}`,
      users: `${countryPrices.plan2users} ${t("users")}`,
      keyFeatures: [
        "Everything in Starter",
        "Animal Health Basic",
        "Quick Start Chute",
        "Billing",
      ],
      popular: true,
    },
    {
      id: "MX-Plus",
      name: planName.plan3,
      price: countryPrices.plan3,
      annualPrice: calculateAnnualPrice(countryPrices.plan3),
      description: "Run advanced health and chute workflows — powered by EID",
      pens: `${countryPrices.plan3pens} ${t("pens")}`,
      users: `${countryPrices.plan3users} ${t("users")}`,
      keyFeatures: [
        "Everything in Core",
        "Advanced Animal Health & Chute",
        "EID Integration",
        "Input Transformation - Premixes creation",
        "Chute-based cattle entry",
      ],
      popular: false,
    },
    {
      id: "MX-Max",
      name: planName.plan4,
      price: countryPrices.plan4,
      annualPrice: calculateAnnualPrice(countryPrices.plan4),
      description:
        "Feeding and inventory automations with market value reports — all in one plan.",
      pens: `${countryPrices.plan4pens} ${t("pens")}`,
      users: `${countryPrices.plan4usesr} ${t("users")}`,
      keyFeatures: [
        "Everything in Plus",
        "Advanced Feeding & Inventory",
        "Market Value Reports",
        <span className="flex items-center">
          Analytics
          <Badge className="ml-2 bg-blue-500 text-white text-xs">
            {getComingSoonText()}
          </Badge>
        </span>,
      ],
      popular: false,
    },
  ];
  const ownersPlans: Plan[] = [
    ...ownerPlansBR.map((ownerPlans) => ({ ...ownerPlans, country: "BR" })),
    ...ownerPlansAR.map((ownerPlans) => ({ ...ownerPlans, country: "AR" })),
    ...ownerPlansUS.map((ownerPlans) => ({ ...ownerPlans, country: "US" })),
    ...ownerPlansCA.map((ownerPlans) => ({ ...ownerPlans, country: "CA" })),
    ...ownerPlansOT$EN.map((ownerPlans) => ({
      ...ownerPlans,
      country: "OT$EN",
    })),
    ...ownerPlansPY.map((ownerPlans) => ({ ...ownerPlans, country: "PY" })),
    ...ownerPlansOT$ES.map((ownerPlans) => ({
      ...ownerPlans,
      country: "OT$ES",
    })),
    ...ownerPlansMX.map((ownerPlans) => ({ ...ownerPlans, country: "MX" })),
    ...ownerPlanUY.map((ownerPlans) => ({ ...ownerPlans, country: "UY" })),
    ...ownerPlansBO.map((ownerPlans) => ({ ...ownerPlans, country: "BO" })),
  ];

  const currentPlans = ownersPlans.filter(
    (plan) => plan.country === selectedCountry
  );

  const ownerFeaturesAR: Omit<Feature, "country">[] = [
    {
      name: `${"pens"} Incluidos`,
      plan1: "10",
      plan2: "25",
      plan3: "40",
      plan4: "80",
    },
    { name: "users", plan1: "1", plan2: "2", plan3: "3", plan4: "5" },
    {
      name: "Curral Extra",
      plan1: `+${formatPrice(30)}`,
      plan2: `+${formatPrice(30)}`,
      plan3: `+${formatPrice(30)}`,
      plan4: `+${formatPrice(30)}`,
    },
    {
      name: "Usuário Extra",
      plan1: `+${formatPrice(120)}`,
      plan2: `+${formatPrice(120)}`,
      plan3: `+${formatPrice(120)}`,
      plan4: `+${formatPrice(120)}`,
    },
    {
      name: t("feeding"),
      plan1: true,
      plan2: true,
      plan3: true,
      plan4: true,
    },
    {
      name: "Mapa do Confinamento",
      plan1: true,
      plan2: true,
      plan3: true,
      plan4: true,
    },
    {
      name: t("cattleManagement"),
      plan1: true,
      plan2: true,
      plan3: true,
      plan4: true,
    },
    {
      name: t("suppliesInventory"),
      plan1: true,
      plan2: true,
      plan3: true,
      plan4: true,
    },
    {
      name: "Quantidade de Suprimentos",
      plan1: "Ilimitado",
      plan2: "Ilimitado",
      plan3: "Ilimitado",
      plan4: "Ilimitado",
    },
    {
      name: t("dietManagement"),
      plan1: true,
      plan2: true,
      plan3: true,
      plan4: true,
    },
    {
      name: "Quantidade de Dietas",
      plan1: "Ilimitado",
      plan2: "Ilimitado",
      plan3: "Ilimitado",
      plan4: "Ilimitado",
    },
    {
      name: "Recorredor",
      plan1: true,
      plan2: true,
      plan3: true,
      plan4: true,
    },
    {
      name: "Relatórios",
      plan1: true,
      plan2: true,
      plan3: true,
      plan4: true,
    },
    {
      name: "advancedFeeding",
      plan1: `+${formatPrice(600)}`,
      plan2: true,
      plan3: true,
      plan4: true,
      isExpandable: true,

      subFeatures: [
        {
          name: "Protocolos de Alimentação",
          plan1: false,
          plan2: true,
          plan3: true,
          plan4: true,
        },
        {
          name: "Automação de Ordens de Carga/Descarga",
          plan1: false,
          plan2: true,
          plan3: true,
          plan4: true,
        },
        {
          name: "Personalização da Leitura de Cocho",
          plan1: false,
          plan2: true,
          plan3: true,
          plan4: true,
        },
      ],
    },
    {
      name: "premixGeneration",
      plan1: `+${formatPrice(150)}`,
      plan2: `+${formatPrice(150)}`,
      plan3: true,
      plan4: true,
    },
    {
      name: "animalHealth",
      plan1: `+${formatPrice(400)}`,
      plan2: `+${formatPrice(400)}`,
      plan3: `+${formatPrice(400)}`,
      plan4: true,
    },
    {
      name: "chute",
      plan1: false,
      plan2: `+${formatPrice(300)}`,
      plan3: true,
      plan4: true,
    },
    {
      name: "tagReaderIntegration",
      plan1: false,
      plan2: `+${formatPrice(300)}`,
      plan3: true,
      plan4: true,
    },
    {
      name: "customFeederModule",
      plan1: `+${formatPrice(600)}`,
      plan2: `+${formatPrice(600)}`,
      plan3: `+${formatPrice(600)}`,
      plan4: `+${formatPrice(600)}`,
      isAddOn: true,
      isCustomFeeder: true,
      isExpandable: true,

      subFeatures: [
        {
          name: "Demonstrativos",
          plan1: false,
          plan2: false,
          plan3: false,
          plan4: false,
        },
        {
          name: "Gestão de Contas",
          plan1: false,
          plan2: false,
          plan3: false,
          plan4: false,
        },
        {
          name: "Relatório de Margens e Lucros",
          plan1: false,
          plan2: false,
          plan3: false,
          plan4: false,
        },
        {
          name: "clientUsers",
          plan1: `+${formatPrice(120)}`,
          plan2: `+${formatPrice(120)}`,
          plan3: `+${formatPrice(120)}`,
          plan4: `+${formatPrice(120)}`,
        },
      ],
    },
    {
      name: "Integração com Balanças de Caminhões",
      plan1: false,
      plan2: false,
      plan3: "Proximamente",
      plan4: "Proximamente",
    },
    {
      name: "Integração com Dump Box",
      plan1: false,
      plan2: false,
      plan3: "Proximamente",
      plan4: "Proximamente",
    },
  ];
  const ownerFeatures: Feature[] = [
    ...ownerFeaturesAR.map((ownerFeatures) => ({
      ...ownerFeatures,
      country: "AR",
    })),
  ];

  // filtrar owner plans por pais preguntar a chatgpt (por selectedCountry)
  const currentFeatures = ownerFeatures.filter(
    (features) => features.country === selectedCountry
  );

  // AddOns BRASIL//

  const addOnsBR: Omit<AddOn, "country">[] = [
    {
      id: "customFeeder-addon",
      name: t("customFeederModule"),
      description: t("customFeederModuleDesc"),
      price: 600,
      availableFor: ["lite", "go", "flex", "pro"],
      includedIn: [],
      isCustomFeeder: true,
    },
    {
      id: "usuarios-clientes",
      name: t("clientUsers"),
      description: t("clientUsersDesc"),
      price: 120,
      availableFor: ["lite", "go", "flex", "pro"],
      includedIn: [],
      isCustomFeeder: true,
    },
    {
      id: "animal-health",
      name: t("animalHealth"),
      description: "Gestão completa da saúde do rebanho",
      price: 400,
      availableFor: ["lite", "go", "flex"],
      includedIn: ["pro"],
    },
    {
      id: "tronco",
      name: t("chute"),
      description: "Sistema completo de manejo no tronco",
      price: 300,
      availableFor: ["go"],
      includedIn: ["flex", "pro"],
    },
    {
      id: "leitor-brinco",
      name: t("tagReaderIntegration"),
      description: "Integração com sistemas de leitura de brincos eletrônicos",
      price: 300,
      availableFor: ["go"],
      includedIn: ["flex", "pro"],
    },
    {
      id: "alimentacao-avancada",
      name: t("advancedFeeding"),
      description: "Recursos avançados para gestão e otimização de alimentação",
      price: 600,
      availableFor: ["lite"],
      includedIn: ["go", "flex", "pro"],
    },
    {
      id: "pre-misturas",
      name: t("premixGeneration"),
      description: "Sistema para geração e controle de pré-misturas",
      price: 150,
      availableFor: ["lite", "go"],
      includedIn: ["flex", "pro"],
    },
    {
      id: "analytics",
      name: t("analytics"),
      description:
        "Análises avançadas e relatórios detalhados para otimização da operação",
      price: 300,
      availableFor: ["go", "flex"],
      includedIn: ["pro"],
    },
    {
      id: "relatorio-mercado",
      name: t("marketValueReport"),
      description: "Relatórios detalhados sobre valores de mercado do gado",
      price: 150,
      availableFor: ["go", "flex"],
      includedIn: ["pro"],
    },

    {
      id: "balanca-caminhoes",
      name: "Integração com Balanças de Caminhões",
      description:
        "Integração com sistemas de balança de caminhão para pesagem automática",
      price: 600,
      availableFor: ["flex", "pro"],
      includedIn: [],
      comingSoon: true,
    },
    {
      id: "dump-box",
      name: "Integração com Dump Box",
      description:
        "Integração com sistemas de Dump Box para automação de alimentação",
      price: 600,
      availableFor: ["flex", "pro"],
      includedIn: [],
      comingSoon: true,
    },
  ];
  const addOnsAR: Omit<AddOn, "country">[] = [
    {
      id: "customFeeder-addon",
      name: t("customFeederModule"),
      description: t("customFeederModuleDesc"),
      price: 600,
      availableFor: ["plan1"],
      includedIn: ["plan2"],
      isCustomFeeder: true,
    },
    {
      id: "usuarios-clientes",
      name: t("clientUsers"),
      description: t("clientUsersDesc"),
      price: 120,
      availableFor: ["AR-Inicial", "AR-Esencial", "AR-Integral", "AR-Avanzado"],
      includedIn: [],
      isCustomFeeder: true,
    },
    {
      id: "animal-health",
      name: t("animalHealth"),
      description: "Gestão completa da saúde do rebanho",
      price: 400,
      availableFor: ["AR-Inicial", "AR-Esencial", "AR-Integral", "AR-Avanzado"],
      includedIn: ["AR-Avanzado"],
    },
    {
      id: "tronco",
      name: t("chute"),
      description: "Sistema completo de manejo no tronco",
      price: countryPrices.Chute,
      availableFor: ["AR-Inicial"],
      includedIn: ["AR-Esencial", "AR-Integral", "AR-Avanzado"],
    },
    {
      id: "leitor-brinco",
      name: t("tagReaderIntegration"),
      description: "Integração com sistemas de leitura de brincos eletrônicos",
      price: 300,
      availableFor: ["AR-Inicial"],
      includedIn: ["AR-Esencial", "AR-Integral", "AR-Avanzado"],
    },
    {
      id: "alimentacao-avancada",
      name: t("advancedFeeding"),
      description: "Recursos avançados para gestão e otimização de alimentação",
      price: 600,
      availableFor: ["AR-Inicial"],
      includedIn: ["AR-Esencial", "AR-Integral", "AR-Avanzado"],
    },
    {
      id: "pre-misturas",
      name: t("premixGeneration"),
      description: "Sistema para geração e controle de pré-misturas",
      price: 150,
      availableFor: ["AR-Inicial"],
      includedIn: ["AR-Esencial", "AR-Integral", "AR-Avanzado"],
    },
    {
      id: "analytics",
      name: t("analytics"),
      description:
        "Análises avançadas e relatórios detalhados para otimização da operação",
      price: 300,
      availableFor: ["AR-Inicial"],
      includedIn: ["AR-Esencial", "AR-Integral", "AR-Avanzado"],
    },
    {
      id: "relatorio-mercado",
      name: t("marketValueReport"),
      description: "Relatórios detalhados sobre valores de mercado do gado",
      price: 150,
      availableFor: ["AR-Inicial"],
      includedIn: ["AR-Esencial", "AR-Integral", "AR-Avanzado"],
    },

    {
      id: "balanca-caminhoes",
      name: "Integração com Balanças de Caminhões",
      description:
        "Integração com sistemas de balança de caminhão para pesagem automática",
      price: 600,
      availableFor: ["AR-Inicial"],
      includedIn: [],
      comingSoon: true,
    },
    {
      id: "dump-boxAR",
      name: "Integracion con Dump Box",
      description:
        "Integração com sistemas de Dump Box para automação de alimentação",
      price: 600,
      availableFor: ["AR-Inicial"],
      includedIn: [],
      comingSoon: true,
    },
  ];
  const addOns: AddOn[] = [
    ...addOnsBR.map((addon) => ({ ...addon, country: "BR" })),
    ...addOnsAR.map((addon) => ({ ...addon, country: "AR" })),
  ];

  const currentAddOns = addOns.filter(
    (addon) => addon.country === selectedCountry
  );

  const toggleFeatureExpansion = (featureName: string) => {
    setExpandedFeatures((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(featureName)) {
        newSet.delete(featureName);
      } else {
        newSet.add(featureName);
      }
      return newSet;
    });
  };

  const renderFeatureValue = (
    value: any,
    showIcons = true,
    featureName?: string,
    comingSoon?: boolean
  ) => {
    if (typeof value === "boolean") {
      if (!showIcons) {
        return (
          <span className="text-sm font-roboto text-cattler-navy/60">-</span>
        );
      }
      return (
        <div className="flex justify-center items-center">
          {value ? (
            <Check className="h-5 w-5 text-cattler-green" />
          ) : (
            <X className="h-5 w-5 text-gray-400" />
          )}
        </div>
      );
    }
    if (typeof value === "string" && value.startsWith("+")) {
      return (
        <div className="flex flex-col items-center">
          <span className="text-sm font-roboto text-cattler-orange font-medium">
            {value}
          </span>
          {comingSoon && (
            <Badge className="mt-1 bg-blue-500 text-white text-xs">
              Em Breve
            </Badge>
          )}
        </div>
      );
    }
    if (value === true && comingSoon) {
      return (
        <div className="flex flex-col items-center">
          <Check className="h-5 w-5 text-cattler-green" />
          <Badge className="mt-1 bg-blue-500 text-white text-xs">
            Em Breve
          </Badge>
        </div>
      );
    }
    if (typeof value === "string" && value === "Proximamente") {
      return (
        <div className="flex flex-col items-center">
          <Badge className="bg-blue-500 text-white text-xs">Em Breve</Badge>
        </div>
      );
    }
    return <span className="text-sm font-roboto">{value}</span>;
  };

  const handlePlanSelect = (plan: Plan) => {
    router.push(`/pricing/checkout/${plan.id}?billing=${billingCycle}`);
  };

  const handleAddOnSelect = (addOn: AddOn) => {
    if (addOn.comingSoon) {
      return;
    }

    const addonWithPromotion = {
      ...addOn,
      promotionalState: promotionalState,
    };

    const addonData = encodeURIComponent(JSON.stringify(addonWithPromotion));
    router.push(`/pricing/addon/${addOn.id}?data=${addonData}`);
  };

  const toggleBillingCycle = () => {
    setBillingCycle((prev) => (prev === "monthly" ? "annual" : "monthly"));
  };

  // Show loading state until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cattler-green mx-auto mb-4"></div>
          <p className="text-cattler-navy font-lato">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Country Selector */}
        <div className="flex justify-end mb-4">
          <CountrySelector
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />
        </div>

        {promotionalState.saleActive && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-3 mb-8 rounded-lg shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold animate-pulse">
                🔥 {promotionalState.saleName} 🔥
              </span>
              <span className="text-sm">
                Oferta por tempo limitado - Economize até 50% em planos e
                complementos selecionados!
              </span>
            </div>
          </div>
        )}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold font-barlow text-cattler-navy mb-6">
            {t("pricingTitle")}
          </h1>
          <p className="text-xl font-lato text-cattler-navy/80 max-w-3xl mx-auto mb-8">
            {t("pricingSubtitle")}
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex flex-col items-center gap-6 mb-8">
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border-2 border-cattler-teal/30">
              <div className="flex items-center gap-2">
                <Calendar
                  className={`h-5 w-5 ${
                    billingCycle === "monthly"
                      ? "text-cattler-green"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`font-lato ${
                    billingCycle === "monthly"
                      ? "font-bold text-cattler-navy"
                      : "text-gray-500"
                  }`}
                >
                  {t("monthlyBilling")}
                </span>
              </div>
              <Switch
                checked={billingCycle === "annual"}
                onCheckedChange={toggleBillingCycle}
              />
              <div className="flex items-center gap-2">
                <CalendarDays
                  className={`h-5 w-5 ${
                    billingCycle === "annual"
                      ? "text-cattler-green"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`font-lato ${
                    billingCycle === "annual"
                      ? "font-bold text-cattler-navy"
                      : "text-gray-500"
                  }`}
                >
                  {t("annualBilling")}
                </span>
              </div>
            </div>
          </div>

          {/* Plan Cards */}
          <div
            className={`grid gap-6 mb-20 ${
              currentPlans.length === 3
                ? "grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-center"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {currentPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-white border-2 hover:shadow-xl transition-all duration-300 flex flex-col ${
                  plan.popular
                    ? "ring-2 ring-cattler-green shadow-lg border-cattler-green"
                    : "border-cattler-teal/30"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-cattler-green text-white font-lato font-bold">
                    {t("mostPopular")}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold font-barlow text-cattler-navy">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm font-roboto text-cattler-navy/70 h-16 flex items-center justify-center">
                    {plan.description}
                  </CardDescription>
                  <div className="text-3xl font-bold font-barlow text-cattler-green mt-4">
                    {(() => {
                      const originalPrice =
                        billingCycle === "monthly"
                          ? plan.price
                          : Math.round(plan.annualPrice! / 12);
                      const promotionalPrice = calculatePromotionalPrice(
                        billingCycle === "monthly"
                          ? plan.price
                          : plan.annualPrice!,
                        plan.id,
                        billingCycle
                      );
                      const displayPrice =
                        billingCycle === "monthly"
                          ? promotionalPrice
                          : Math.round(promotionalPrice / 12);
                      const hasPromotion = getActivePromotion(
                        plan.id,
                        billingCycle
                      );

                      return (
                        <div className="flex flex-col items-center">
                          {hasPromotion && (
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg line-through text-gray-400">
                                {formatPrice(originalPrice)}
                              </span>
                              <Badge className="bg-red-500 text-white text-xs animate-pulse">
                                {promotionalState.saleName}
                              </Badge>
                            </div>
                          )}
                          <div>{formatPrice(displayPrice)}</div>
                        </div>
                      );
                    })()}
                  </div>
                  {(() => {
                    const promotionText = getPromotionBadgeText(
                      plan.id,
                      billingCycle
                    );
                    return (
                      promotionText && (
                        <Badge className="bg-red-500 text-white text-sm mt-2 animate-pulse text-center mx-auto">
                          {promotionText}
                        </Badge>
                      )
                    );
                  })()}
                  <div className="text-sm font-roboto text-cattler-navy/60">
                    {t("perMonth")}
                    {billingCycle === "annual"
                      ? `, cobrado ${t("annually")}`
                      : ""}
                  </div>
                  {billingCycle === "annual" && (
                    <div className="mt-1 text-xs font-roboto text-cattler-orange font-medium">
                      {formatPrice(plan.annualPrice!)} {t("perYear")} (Economize{" "}
                      {formatPrice(Math.round(plan.price * 12 * 0.1))})
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium font-lato text-cattler-navy">
                        {t("pens")}:
                      </span>
                      <span className="text-sm font-roboto text-cattler-navy/80">
                        {plan.pens}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium font-lato text-cattler-navy">
                        {t("users")}:
                      </span>
                      <span className="text-sm font-roboto text-cattler-navy/80">
                        {plan.users}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm font-lato text-cattler-navy">
                      Recursos Principais:
                    </h4>
                    <ul className="space-y-1">
                      {plan.keyFeatures.map((feature, idx) => {
                        // Check if feature is a string and contains integration keywords
                        if (
                          typeof feature === "string" &&
                          (feature.toLowerCase().includes("integração") ||
                            feature.toLowerCase().includes("integrações"))
                        ) {
                          return null;
                        }
                        return (
                          <li
                            key={idx}
                            className="text-sm font-roboto text-cattler-navy/70 flex items-start"
                          >
                            <Check className="h-4 w-4 text-cattler-green mr-2 flex-shrink-0 mt-0.5" />
                            <div className="flex-1 text-left">
                              {feature}
                              {typeof feature === "string" &&
                                feature === "Billing" && (
                                  <Badge className="ml-2 bg-cattler-amber text-white text-xs">
                                    <Users className="h-3 w-3 mr-1" />
                                    Custom Feeders
                                  </Badge>
                                )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handlePlanSelect(plan)}
                    className={`w-full font-lato font-bold transition-all duration-300 ${
                      plan.popular
                        ? "bg-cattler-orange hover:bg-cattler-orange/90 text-white"
                        : "bg-cattler-teal hover:bg-cattler-green text-white"
                    }`}
                  >
                    {t("getStarted")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Custom Feeder Section */}
          <div className="text-center mt-12 mb-20 bg-gradient-to-r from-cattler-amber/10 via-cattler-orange/10 to-cattler-amber/10 rounded-2xl p-12 border-2 border-cattler-amber/30">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-cattler-amber rounded-full flex items-center justify-center mr-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold font-barlow text-cattler-navy">
                  {selectedCountry === "BR"
                    ? "Você faz customFeeder?"
                    : ["AR"].includes(selectedCountry)
                    ? "¿Hacés Hotelería?"
                    : ["UY", "PY", "BO", "MX", "OT-ES"].includes(
                        selectedCountry
                      )
                    ? "¿Hace Hotelería?"
                    : "Do you custom feeed?"}
                </h2>
              </div>

              <p className="text-xl font-lato text-cattler-navy/80 max-w-3xl mx-auto mb-8">
                {selectedCountry === "BR"
                  ? "Aprimore suas operações de customFeeder com recursos especializados projetados para gerenciar múltiplos clientes e operações complexas."
                  : ["AR"].includes(selectedCountry)
                  ? "Mejorá tus operaciones de Hotelería con recursos especializados diseñados para gestionar múltiples clientes y operaciones complejas."
                  : ["UY", "PY", "BO", "MX", "OT-ES"].includes(selectedCountry)
                  ? "Mejore sus operaciones de Hotelería con recursos especializados diseñados para gestionar múltiples clientes y operaciones complejas."
                  : "Enhance your custom feeding operations with specialized features designed to manage multiple clients and complex operations."}
              </p>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-cattler-amber/20">
                <h3 className="text-lg font-bold font-barlow text-cattler-navy mb-4">
                  {selectedCountry === "BR"
                    ? "Complemento Recomendado para customFeeder"
                    : ["AR", "UY", "PY", "BO", "MX", "OT-ES"].includes(
                        selectedCountry
                      )
                    ? "Módulo Recomendado para Hotelería"
                    : "Recommended Add-On for Custom Feeding"}
                </h3>
                <div className="max-w-md mx-auto">
                  <div className="bg-gradient-to-br from-cattler-amber/5 to-cattler-orange/5 rounded-lg p-4 border border-cattler-amber/30 flex flex-col">
                    <h4 className="font-bold font-lato text-cattler-amber mb-2">
                      {selectedCountry === "BR"
                        ? "Módulo customFeeder"
                        : ["AR", "UY", "PY", "BO", "MX", "OT-ES"].includes(
                            selectedCountry
                          )
                        ? "Módulo Hotelería"
                        : "Custom Feeding Add On"}
                    </h4>
                    <p className="text-sm font-roboto text-cattler-navy/70 mb-3">
                      {selectedCountry === "BR"
                        ? "Gestão completa para operações de customFeeder com múltiplos clientes"
                        : ["AR", "UY", "PY", "BO", "MX", "OT-ES"].includes(
                            selectedCountry
                          )
                        ? "Gestión completa para operaciones de Hotelería con múltiples clientes"
                        : "Complete management for custom feeding operations with multiple clients"}
                    </p>
                    <div className="text-lg font-bold font-barlow text-cattler-green mb-4">
                      +{formatPrice(600)}/{t("perMonth")}
                    </div>
                    <Button
                      className="mt-auto bg-cattler-amber hover:bg-cattler-amber/90 text-white font-lato font-bold py-3 shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={() =>
                        handleAddOnSelect(
                          addOns.find(
                            (addon) => addon.id === "customFeeder-addon"
                          )!
                        )
                      }
                    >
                      {selectedCountry === "BR"
                        ? "Adicionar ao Plano"
                        : ["AR", "UY", "PY", "BO", "MX", "OT-ES"].includes(
                            selectedCountry
                          )
                        ? "Agregar al Plan"
                        : "Add to Plan"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm font-roboto text-cattler-navy/60">
                {selectedCountry === "BR"
                  ? "Este complemento é especificamente projetado para operações de customFeeder e pode ser adicionado a qualquer plano de Confinamento."
                  : ["AR", "UY", "OT-ES"].includes(selectedCountry)
                  ? "Este módulo está diseñado específicamente para operaciones de Hotelería y puede añadirse a cualquier plan de Feedlot."
                  : ["PY", "BO", "MX", "OT-ES"].includes(selectedCountry)
                  ? "Este módulo está diseñado específicamente para operaciones de Hotelería y puede añadirse a cualquier plan de Confinamiento."
                  : "This add-on is specifically designed for custom feeding operations and can be added to any Feeder plan."}
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-lg shadow-xl border border-cattler-teal/20 p-8">
            <h2 className="text-3xl font-bold font-barlow text-cattler-navy text-center mb-8">
              Compare Todos os Planos
            </h2>
            <div className="overflow-x-auto max-h-96 overflow-y-auto border border-cattler-teal/20 rounded-lg">
              <table className="w-full">
                <thead className="sticky top-0 bg-white z-10 border-b-2 border-cattler-teal/30">
                  <tr>
                    <th className="text-left py-4 px-4 font-bold font-lato text-cattler-navy bg-white">
                      Recursos
                    </th>
                    <th className="text-center py-4 px-4 font-bold font-lato text-cattler-navy bg-white">
                      {t("planLite")}
                      <br />
                      <span className="text-sm font-normal font-roboto text-cattler-navy/60">
                        {formatPrice(1000)}
                      </span>
                    </th>
                    <th className="text-center py-4 px-4 font-bold font-lato text-cattler-navy bg-white">
                      {t("planGo")}
                      <br />
                      <span className="text-sm font-normal font-roboto text-cattler-navy/60">
                        {formatPrice(1500)}
                      </span>
                    </th>
                    <th className="text-center py-4 px-4 font-bold font-lato text-cattler-navy bg-cattler-light-teal/20">
                      {t("planFlex")}
                      <br />
                      <span className="text-sm font-normal font-roboto text-cattler-navy/60">
                        {formatPrice(1950)}
                      </span>
                    </th>
                    <th className="text-center py-4 px-4 font-bold font-lato text-cattler-navy bg-white">
                      {t("planPro")}
                      <br />
                      <span className="text-sm font-normal font-roboto text-cattler-navy/60">
                        {formatPrice(3700)}
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentFeatures.map((feature, index) => (
                    <>
                      <tr
                        key={index}
                        className={`border-b border-cattler-teal/10 hover:bg-cattler-light-teal/5 ${
                          feature.isAddOn
                            ? "bg-cattler-orange/5"
                            : feature.isCustomFeeder
                            ? "bg-cattler-amber/10"
                            : ""
                        }`}
                      >
                        <td
                          className={`py-3 px-4 font-medium font-lato ${
                            feature.isAddOn
                              ? "font-bold text-cattler-orange"
                              : feature.isCustomFeeder
                              ? "font-bold text-cattler-amber"
                              : "text-cattler-navy"
                          }`}
                        >
                          <div className="flex items-center">
                            {feature.name}
                            {feature.isCustomFeeder && (
                              <Badge className="ml-2 bg-cattler-amber text-white text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                customFeeder
                              </Badge>
                            )}
                            {feature.isExpandable && (
                              <button
                                onClick={() =>
                                  toggleFeatureExpansion(feature.name)
                                }
                                className="ml-2 px-2 py-1 bg-cattler-teal/10 hover:bg-cattler-teal/20 text-cattler-teal hover:text-cattler-green rounded-md transition-all duration-200 flex items-center gap-1 text-xs font-medium"
                              >
                                {expandedFeatures.has(feature.name) ? (
                                  <>
                                    <span>Ocultar</span>
                                    <svg
                                      className="w-3 h-3"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </>
                                ) : (
                                  <>
                                    <span>Ver detalhes</span>
                                    <svg
                                      className="w-3 h-3"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </>
                                )}
                              </button>
                            )}
                            {feature.comingSoon && (
                              <Badge className="ml-2 bg-blue-500 text-white text-xs">
                                Em Breve
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {renderFeatureValue(
                            feature.plan1,
                            true,
                            feature.name,
                            feature.comingSoon
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {renderFeatureValue(
                            feature.plan2,
                            true,
                            feature.name,
                            feature.comingSoon
                          )}
                        </td>
                        <td className="py-3 px-4 text-center bg-cattler-light-teal/10">
                          {renderFeatureValue(
                            feature.plan3,
                            true,
                            feature.name,
                            feature.comingSoon
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {renderFeatureValue(
                            feature.plan4,
                            true,
                            feature.name,
                            feature.comingSoon
                          )}
                        </td>
                      </tr>
                      {/* Sub-features */}
                      {feature.subFeatures &&
                        expandedFeatures.has(feature.name) &&
                        feature.subFeatures.map((subFeature, subIndex) => (
                          <tr
                            key={`${index}-${subIndex}`}
                            className="border-b border-cattler-teal/5 bg-cattler-light-teal/5"
                          >
                            <td className="py-2 px-4 pl-8 text-sm font-roboto text-cattler-navy/80">
                              <div className="flex items-center">
                                <span className="mr-2 text-cattler-teal">
                                  └
                                </span>
                                {subFeature.name}
                              </div>
                            </td>
                            <td className="py-2 px-4 text-center">
                              {renderFeatureValue(
                                subFeature.plan1,
                                true,
                                subFeature.name
                              )}
                            </td>
                            <td className="py-2 px-4 text-center">
                              {renderFeatureValue(
                                subFeature.plan2,
                                true,
                                subFeature.name
                              )}
                            </td>
                            <td className="py-2 px-4 text-center bg-cattler-light-teal/10">
                              {renderFeatureValue(
                                subFeature.plan3,
                                true,
                                subFeature.name
                              )}
                            </td>
                            <td className="py-2 px-4 text-center">
                              {renderFeatureValue(
                                subFeature.plan4,
                                true,
                                subFeature.name
                              )}
                            </td>
                          </tr>
                        ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add-ons Section */}
          <div className="mt-16 bg-white rounded-lg shadow-xl border border-cattler-teal/20 p-8">
            <h3 className="text-2xl font-bold font-barlow text-cattler-navy text-center mb-6">
              {t("addOnsTitle")}
            </h3>
            <p className="text-center text-cattler-navy/70 font-roboto mb-8">
              {t("addOnsSubtitle")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentAddOns.map((addon, index) => {
                const originalPrice = addon.price;
                const promotionalPrice = calculatePromotionalPrice(
                  originalPrice,
                  addon.id,
                  "monthly"
                );
                const hasPromotion = getActivePromotion(addon.id, "monthly");

                return (
                  <div
                    key={index}
                    onClick={() => handleAddOnSelect(addon)}
                    className={`text-center p-4 border-2 rounded-lg transition-all group ${
                      addon.comingSoon
                        ? "border-gray-300 bg-gray-50 cursor-not-allowed opacity-75"
                        : addon.isCustomFeeder
                        ? "hover:shadow-lg cursor-pointer border-cattler-amber/50 hover:border-cattler-amber bg-cattler-amber/5"
                        : "hover:shadow-lg cursor-pointer border-cattler-teal/50 hover:border-cattler-teal bg-cattler-teal/5"
                    }`}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          addon.comingSoon
                            ? "bg-gray-200"
                            : addon.isCustomFeeder
                            ? "bg-cattler-amber/10 group-hover:bg-cattler-amber/20"
                            : "bg-cattler-teal/10 group-hover:bg-cattler-teal/20"
                        }`}
                      >
                        <Plus
                          className={`h-5 w-5 ${
                            addon.comingSoon
                              ? "text-gray-400"
                              : addon.isCustomFeeder
                              ? "text-cattler-amber group-hover:text-cattler-amber"
                              : "text-cattler-teal group-hover:text-cattler-teal"
                          }`}
                        />
                      </div>
                    </div>
                    <h4
                      className={`font-semibold font-lato mb-2 transition-colors ${
                        addon.comingSoon
                          ? "text-gray-500"
                          : addon.isCustomFeeder
                          ? "text-cattler-amber group-hover:text-cattler-amber"
                          : "text-cattler-teal group-hover:text-cattler-teal"
                      }`}
                    >
                      {addon.name}
                      {addon.isCustomFeeder && (
                        <Badge className="ml-2 bg-cattler-amber text-white text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          customFeeder
                        </Badge>
                      )}
                    </h4>
                    <p
                      className={`text-sm font-roboto mb-2 ${
                        addon.comingSoon
                          ? "text-gray-500"
                          : "text-cattler-navy/70"
                      }`}
                    >
                      {addon.description}
                    </p>
                    <p
                      className={`text-lg font-bold font-barlow ${
                        addon.comingSoon
                          ? "text-gray-500"
                          : addon.isCustomFeeder
                          ? "text-cattler-amber"
                          : "text-cattler-teal"
                      }`}
                    >
                      {(() => {
                        if (addon.comingSoon) {
                          return (
                            <div className="flex flex-col items-center">
                              <Badge className="bg-blue-500 text-white text-xs">
                                Em Breve
                              </Badge>
                            </div>
                          );
                        }

                        return (
                          <div className="flex flex-col items-center">
                            {hasPromotion && (
                              <div className="flex items-center gap-1 mb-1">
                                <span className="text-sm line-through text-gray-400">
                                  +{formatPrice(originalPrice)}/{t("perMonth")}
                                </span>
                                <Badge className="bg-red-500 text-white text-xs animate-pulse">
                                  {promotionalState.saleName}
                                </Badge>
                              </div>
                            )}
                            <div>
                              +{formatPrice(promotionalPrice)}/{t("perMonth")}
                            </div>
                            {(() => {
                              const promotionText = getPromotionBadgeText(
                                addon.id,
                                "monthly"
                              );
                              return (
                                promotionText && (
                                  <Badge className="bg-red-500 text-white text-xs mt-1 animate-pulse text-center mx-auto">
                                    {promotionText}
                                  </Badge>
                                )
                              );
                            })()}
                          </div>
                        );
                      })()}
                    </p>

                    {/* Plan availability information */}
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-center gap-1 text-xs font-roboto">
                        <Badge
                          variant="outline"
                          className={`${
                            addon.isCustomFeeder
                              ? "border-cattler-amber text-cattler-amber"
                              : "border-cattler-teal text-cattler-teal"
                          }`}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Disponível para:{" "}
                          {addon.availableFor
                            .map(
                              (plan) => planName[plan as keyof typeof planName]
                            )
                            .join(", ")}
                        </Badge>
                      </div>

                      {addon.includedIn && addon.includedIn.length > 0 && (
                        <div className="flex items-center justify-center gap-1 text-xs font-roboto">
                          <Badge className="bg-cattler-green text-white text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Incluído em:{" "}
                            {addon.includedIn
                              .map(
                                (plan) =>
                                  planName[plan as keyof typeof planName]
                              )
                              .join(", ")}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {!addon.comingSoon && (
                      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          className={`${
                            addon.isCustomFeeder
                              ? "bg-cattler-amber hover:bg-cattler-amber/90"
                              : "bg-cattler-teal hover:bg-cattler-teal/90"
                          } text-white font-lato font-bold`}
                        >
                          Adicionar ao Plano
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 bg-gradient-to-r from-cattler-navy to-cattler-teal rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold font-barlow mb-4">
              Pronto para Começar?
            </h2>
            <p className="text-xl font-lato mb-8 opacity-90">
              Escolha o plano que se adapta à sua operação e comece a gerenciar
              seu confinamento com mais eficiência hoje.
            </p>
            <div className="space-x-4">
              <Button
                size="lg"
                className="bg-cattler-orange hover:bg-cattler-orange/90 text-white font-lato font-bold px-8 py-3"
              >
                Iniciar Teste Gratuito
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-cattler-navy font-lato font-bold px-8 py-3 bg-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
              >
                Contatar Vendas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
