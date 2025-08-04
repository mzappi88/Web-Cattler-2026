"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { getVisibleAddOns } from "@/data/owner-addons";
import {
  getOwnerPlans,
  getPlanDescription,
  getPlanFeatures,
} from "@/data/owner-plans";
import {
  getFeaturesForCountry,
  Feature,
  getLocalizedFeatureName,
} from "@/data/owner-features";
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

import type { AddOn, PricingState } from "@/types/pricing";
import {
  PLAN_NAME_BY_COUNTRY,
  PRICES_BY_COUNTRY,
  getComingSoonText,
  getExtraPenPrice,
  getExtraUserPrice,
  getCustomFeederPrice,
  getAnimalHealthPrice,
  getChutePrice,
  getEIDIntegrationPrice,
  getAdvancedFeedingPrice,
  getInputTransformationPrice,
  getClientUsersPrice,
  calculateAnnualPrice,
} from "@/data/owner-plans";

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
  const [forceShow, setForceShow] = useState(false);

  // Force show after 3 seconds to prevent infinite loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setForceShow(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Use centralized annual price calculation from owner-plans.ts

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

  // Get dynamic prices from centralized configuration
  const PEN_PRICE = getExtraPenPrice(selectedCountry);
  const USER_PRICE = getExtraUserPrice(selectedCountry);

  // Get plans from centralized configuration - no more duplicated data!
  const currentPlans = getOwnerPlans(selectedCountry);

  // Get features from centralized configuration
  const ownerFeatures: Feature[] = [
    ...getFeaturesForCountry(selectedCountry, t).map((feature) => ({
      ...feature,
      country: selectedCountry,
    })),
  ];

  // Get features for the selected country
  const currentFeatures = useMemo(() => {
    return getFeaturesForCountry(selectedCountry, t);
  }, [selectedCountry, t]);

  // Initialize expanded features state
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(
    new Set()
  );

  // Set default expanded features when currentFeatures changes
  useEffect(() => {
    const defaultExpanded = currentFeatures
      .filter((feature) => feature.expandedByDefault)
      .map((feature) => feature.name);
    setExpandedFeatures(new Set(defaultExpanded));
  }, [currentFeatures]);

  // Get visible add-ons and maintain the original order from configuration
  const allAddOns = useMemo(() => {
    return getVisibleAddOns(selectedCountry);
  }, [selectedCountry]);

  // Separate add-ons into two groups while maintaining original order within each group
  const currentAddOns = useMemo(() => {
    const notComingSoon = allAddOns.filter((addon) => !addon.comingSoon);
    const comingSoon = allAddOns.filter((addon) => addon.comingSoon);

    // Combine them with coming soon at the end
    return [...notComingSoon, ...comingSoon];
  }, [allAddOns]);

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
    comingSoon?: boolean,
    planNumber?: number
  ) => {
    // Check if value is a comingSoon object
    if (value && typeof value === "object" && value.type === "comingSoon") {
      return (
        <div className="flex justify-center items-center">
          <Badge className="bg-blue-500 text-white text-xs">{value.text}</Badge>
        </div>
      );
    }

    // Add asterisk for MicroMachineIntegration if MicroingredientesManagement is active (only for plan 3)
    if (
      typeof value === "string" &&
      value.startsWith("+") &&
      featureName ===
        getLocalizedFeatureName("MicroMachineIntegration", selectedCountry) &&
      planNumber === 3 &&
      currentFeatures.some(
        (feature) =>
          (feature.name ===
            getLocalizedFeatureName(
              "MicroingredientesManagement",
              selectedCountry
            ) &&
            feature.plan4 === true) ||
          (feature.subFeatures &&
            feature.subFeatures.some(
              (subFeature) =>
                subFeature.name ===
                  getLocalizedFeatureName(
                    "MicroingredientesManagement",
                    selectedCountry
                  ) && subFeature.plan4 === true
            ))
      )
    ) {
      return (
        <div className="flex flex-col items-center">
          <span className="text-sm font-roboto text-cattler-orange font-medium">
            {value}
            <span className="text-cattler-navy">*</span>
          </span>
          {comingSoon && (
            <Badge className="mt-1 bg-blue-500 text-white text-xs">
              {getComingSoonText(selectedCountry)}
            </Badge>
          )}
        </div>
      );
    }

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
            <X className="h-5 w-5 text-red-500" />
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
              {getComingSoonText(selectedCountry)}
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
            {getComingSoonText(selectedCountry)}
          </Badge>
        </div>
      );
    }
    if (typeof value === "string" && value === "Proximamente") {
      return (
        <div className="flex flex-col items-center">
          <Badge className="bg-blue-500 text-white text-xs">
            {getComingSoonText(selectedCountry)}
          </Badge>
        </div>
      );
    }
    return <span className="text-sm font-roboto">{value}</span>;
  };

  const handlePlanSelect = (plan: Plan) => {
    // Determinar qué plan es basado en el índice o ID
    let planNumber = 1;

    // Buscar el plan en la lista de planes actuales
    const planIndex = currentPlans.findIndex((p) => p.id === plan.id);
    if (planIndex !== -1) {
      planNumber = planIndex + 1;
    }

    // Redirigir a la URL específica de Cattler según el país
    const baseUrl =
      selectedCountry === "BR"
        ? "https://www.cattler.agr.br"
        : "https://www.cattler.com.ar";
    const cattlerUrl = `${baseUrl}/form-plan${planNumber}`;

    // Si estamos en un iframe, cambiar la URL del padre
    if (window.parent && window.parent !== window) {
      window.parent.location.href = cattlerUrl;
    } else {
      // Si no estamos en iframe, redirigir directamente
      window.location.href = cattlerUrl;
    }
  };

  const handleAddOnSelect = (addOn: AddOn) => {
    // Verificar que el addon existe
    if (!addOn) {
      console.warn("AddOn is undefined");
      return;
    }

    if (addOn.comingSoon) {
      return;
    }

    // Redirigir a la URL específica de Cattler para add-ons según el país
    const baseUrl =
      selectedCountry === "BR"
        ? "https://www.cattler.agr.br"
        : "https://www.cattler.com.ar";
    const cattlerUrl = `${baseUrl}/form-addon`;

    // Si estamos en un iframe, cambiar la URL del padre
    if (window.parent && window.parent !== window) {
      window.parent.location.href = cattlerUrl;
    } else {
      // Si no estamos en iframe, redirigir directamente
      window.location.href = cattlerUrl;
    }
  };

  const toggleBillingCycle = () => {
    setBillingCycle((prev) => (prev === "monthly" ? "annual" : "monthly"));
  };

  // Show loading state until hydrated (with timeout fallback)
  if (!isHydrated && !forceShow) {
    return (
      <div className="bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cattler-green mx-auto mb-4"></div>
          <p className="text-cattler-navy font-lato">Cargando...</p>
        </div>
      </div>
    );
  }

  function getShortPlanName(planKey: "plan1" | "plan2" | "plan3" | "plan4") {
    const planName =
      PLAN_NAME_BY_COUNTRY[selectedCountry] ?? PLAN_NAME_BY_COUNTRY["OT$EN"];
    const fullName = planName[planKey];
    if (!fullName) return "";
    const parts = fullName.split(" ");
    return parts.length > 1 ? parts.slice(1).join(" ") : fullName;
  }

  function getCustomFeederBadgeText() {
    switch (selectedCountry) {
      case "BR":
        return "Bôitel";
      case "AR":
        return "Hotelería";
      case "US":
      case "CA":
      case "OT$EN":
        return "Custom Feeder";
      case "MX":
      case "PY":
      case "UY":
      case "BO":
      case "OT$ES":
        return "Hotelería";
      default:
        return "Custom Feeder";
    }
  }

  function getCustomFeederDescription() {
    switch (selectedCountry) {
      case "BR":
        return "Gestão completa para operações de Bôitel com múltiplos clientes";
      case "AR":
      case "MX":
      case "PY":
      case "UY":
      case "BO":
      case "OT$ES":
        return "Gestión completa para operaciones de Hotelería con múltiples clientes";
      case "US":
      case "CA":
      case "OT$EN":
      default:
        return "Complete management for custom feeder operations with multiple clients";
    }
  }

  const isMicroingredientesActive = currentFeatures.some(
    (feature) =>
      (feature.name ===
        getLocalizedFeatureName(
          "MicroingredientesManagement",
          selectedCountry
        ) &&
        feature.plan4 === true) ||
      (feature.subFeatures &&
        feature.subFeatures.some(
          (subFeature) =>
            subFeature.name ===
              getLocalizedFeatureName(
                "MicroingredientesManagement",
                selectedCountry
              ) && subFeature.plan4 === true
        ))
  );

  return (
    <div className="bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Country Selector - Hidden for production, only available in debug */}
        {/* <div className="flex justify-end mb-4">
          <CountrySelector
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />
        </div> */}

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
        <div className="text-center mb-12">
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
            className={`grid gap-6 mb-12 ${
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
                      ? `,  ${
                          selectedCountry === "BR"
                            ? "cobrado anualmente"
                            : ["AR", "UY", "PY", "BO", "MX", "OT$ES"].includes(
                                selectedCountry
                              )
                            ? "cobrado anualmente"
                            : "billed annually"
                        }`
                      : ""}
                  </div>
                  {billingCycle === "annual" && (
                    <div className="mt-1 text-xs font-roboto text-cattler-orange font-medium">
                      {formatPrice(plan.annualPrice!)} {t("perYear")} (
                      {selectedCountry === "BR"
                        ? "Economize"
                        : ["UY", "PY", "BO", "MX", "OT$ES"].includes(
                            selectedCountry
                          )
                        ? "Ahorre"
                        : ["AR"].includes(selectedCountry)
                        ? "Ahorrá"
                        : "Save"}{" "}
                      {formatPrice(Math.round(plan.price * 12 * 0.1))})
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-3 mb-4">
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
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm font-lato text-cattler-navy">
                      {t("mainFeatures")}:
                    </h4>
                    <ul className="space-y-0.5">
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
          <div className="text-center mt-8 mb-12 bg-gradient-to-r from-cattler-amber/10 via-cattler-orange/10 to-cattler-amber/10 rounded-2xl p-8 border-2 border-cattler-amber/30">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-cattler-amber rounded-full flex items-center justify-center mr-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold font-barlow text-cattler-navy">
                  {selectedCountry === "BR"
                    ? `Você faz Bôitel?`
                    : ["AR"].includes(selectedCountry)
                    ? "¿Hacés Hotelería?"
                    : ["UY", "PY", "BO", "MX", "OT$ES"].includes(
                        selectedCountry
                      )
                    ? "¿Hace Hotelería?"
                    : "Do you custom feeed?"}
                </h2>
              </div>

              <p className="text-xl font-lato text-cattler-navy/80 max-w-3xl mx-auto mb-8">
                {selectedCountry === "BR"
                  ? "Aprimore suas operações de Bôitel com recursos especializados projetados para gerenciar múltiplos clientes e operações complexas."
                  : ["AR"].includes(selectedCountry)
                  ? "Mejorá tus operaciones de Hotelería con recursos especializados diseñados para gestionar múltiples clientes y operaciones complejas."
                  : ["UY", "PY", "BO", "MX", "OT$ES"].includes(selectedCountry)
                  ? "Mejore sus operaciones de Hotelería con recursos especializados diseñados para gestionar múltiples clientes y operaciones complejas."
                  : "Enhance your custom feeding operations with specialized features designed to manage multiple clients and complex operations."}
              </p>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-cattler-amber/20">
                <h3 className="text-lg font-bold font-barlow text-cattler-navy mb-4">
                  {selectedCountry === "BR"
                    ? "Complemento Recomendado para Bôitel"
                    : ["AR", "UY", "PY", "BO", "MX", "OT$ES"].includes(
                        selectedCountry
                      )
                    ? "Módulo Recomendado para Hotelería"
                    : "Recommended Add-On for Custom Feeders"}
                </h3>
                <div className="max-w-md mx-auto">
                  <div className="bg-gradient-to-br from-cattler-amber/5 to-cattler-orange/5 rounded-lg p-4 border border-cattler-amber/30 flex flex-col">
                    <h4 className="font-bold font-lato text-cattler-amber mb-2">
                      {selectedCountry === "BR"
                        ? "Módulo Bôitel"
                        : ["AR", "UY", "PY", "BO", "MX", "OT$ES"].includes(
                            selectedCountry
                          )
                        ? "Módulo Hotelería"
                        : "Custom Feeder Add On"}
                    </h4>
                    <p className="text-sm font-roboto text-cattler-navy/70 mb-3">
                      {getCustomFeederDescription()}
                    </p>
                    <div className="text-lg font-bold font-barlow text-cattler-green mb-4">
                      +{formatPrice(getCustomFeederPrice(selectedCountry))} /
                      {t("perMonth")}
                    </div>
                    <Button
                      className="mt-auto bg-cattler-amber hover:bg-cattler-amber/90 text-white font-lato font-bold py-3 shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={() => {
                        const customFeederAddon = currentAddOns.find(
                          (addon) => addon.id === "customFeeder"
                        );
                        if (customFeederAddon) {
                          handleAddOnSelect(customFeederAddon);
                        }
                      }}
                    >
                      {selectedCountry === "BR"
                        ? "Adicionar ao Plano"
                        : ["AR", "UY", "PY", "BO", "MX", "OT$ES"].includes(
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
                  ? "Este complemento é especificamente projetado para operações de Bôitel e pode ser adicionado a qualquer plano de Confinamento."
                  : ["AR", "UY", "OT$ES"].includes(selectedCountry)
                  ? "Este módulo está diseñado específicamente para operaciones de Hotelería y puede añadirse a cualquier plan de Feedlot."
                  : ["PY", "BO", "MX", "OT$ES"].includes(selectedCountry)
                  ? "Este módulo está diseñado específicamente para operaciones de Hotelería y puede añadirse a cualquier plan de Confinamiento."
                  : "This add-on is specifically designed for custom feeding operations and can be added to any Feeder plan."}
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-lg shadow-xl border border-cattler-teal/20 p-6">
            <h2 className="text-3xl font-bold font-barlow text-cattler-navy text-center mb-8">
              {selectedCountry === "BR"
                ? "Compare Todos os Planos"
                : ["UY", "PY", "BO", "MX", "OT$ES"].includes(selectedCountry)
                ? "Compare Todos los Planes"
                : ["AR"].includes(selectedCountry)
                ? "Compará Todos los Planes"
                : "Compare All Plans"}
            </h2>
            <div className="overflow-x-auto max-h-80 overflow-y-auto border border-cattler-teal/20 rounded-lg">
              <table className="w-full">
                <thead className="sticky top-0 bg-white z-10 border-b-2 border-cattler-teal/30">
                  <tr>
                    <th className="text-left py-4 px-4 font-bold font-lato text-cattler-navy bg-white">
                      {selectedCountry === "BR"
                        ? "Recursos"
                        : ["AR", "UY", "PY", "BO", "MX", "OT$ES"].includes(
                            selectedCountry
                          )
                        ? "Funcionalidades"
                        : "Features"}
                    </th>
                    {currentPlans.map((plan, index) => (
                      <th
                        key={index}
                        className={`text-center py-4 px-4 font-bold font-lato text-cattler-navy ${
                          plan.popular ? "bg-cattler-light-teal/20" : "bg-white"
                        }`}
                      >
                        {plan.name}
                        <br />
                        <span className="text-sm font-normal font-roboto text-cattler-navy/60">
                          {formatPrice(plan.price)}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentFeatures.flatMap((feature, index) => {
                    const mainRow = (
                      <tr
                        key={`feature-${index}`}
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
                                {getCustomFeederBadgeText()}
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
                                    <span>{t("hideDetails")}</span>
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
                                    <span>{t("showDetails")}</span>
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
                                {getComingSoonText(selectedCountry)}
                              </Badge>
                            )}
                          </div>
                        </td>
                        {currentPlans.map((plan, planIndex) => (
                          <td
                            key={planIndex}
                            className={`py-3 px-4 text-center ${
                              plan.popular ? "bg-cattler-light-teal/10" : ""
                            }`}
                          >
                            {renderFeatureValue(
                              feature[
                                `plan${planIndex + 1}` as keyof typeof feature
                              ],
                              true,
                              feature.name,
                              feature.comingSoon,
                              planIndex + 1
                            )}
                          </td>
                        ))}
                      </tr>
                    );

                    const subRows =
                      feature.subFeatures && expandedFeatures.has(feature.name)
                        ? feature.subFeatures.map((subFeature, subIndex) => (
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
                              {currentPlans.map((plan, planIndex) => (
                                <td
                                  key={planIndex}
                                  className={`py-2 px-4 text-center ${
                                    plan.popular
                                      ? "bg-cattler-light-teal/10"
                                      : ""
                                  }`}
                                >
                                  {renderFeatureValue(
                                    subFeature[
                                      `plan${
                                        planIndex + 1
                                      }` as keyof typeof subFeature
                                    ],
                                    true,
                                    subFeature.name,
                                    undefined,
                                    planIndex + 1
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))
                        : [];

                    return [mainRow, ...subRows];
                  })}
                </tbody>
              </table>
            </div>
            {/* Disclaimer for MicroMachineIntegration */}
            {isMicroingredientesActive && (
              <div className="mt-4 text-sm font-roboto text-cattler-navy/70 px-8">
                <p>
                  * Micro Machine Integration for FEEDER PLUS requires the
                  Microingredients Management add-on
                </p>
              </div>
            )}
          </div>

          {/* Add-ons Section */}
          <div className="mt-12 bg-white rounded-lg shadow-xl border border-cattler-teal/20 p-6">
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
                          {getCustomFeederBadgeText()}
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
                    <div
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
                                {getComingSoonText(selectedCountry)}
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
                    </div>

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
                          {selectedCountry === "BR"
                            ? "Disponível para:"
                            : ["AR", "UY", "PY", "BO", "MX", "OT$ES"].includes(
                                selectedCountry
                              )
                            ? "Disponible para:"
                            : "Available for:"}
                          {addon.availableFor
                            .map((plan) =>
                              getShortPlanName(
                                plan as "plan1" | "plan2" | "plan3" | "plan4"
                              )
                            )
                            .join(", ")}
                        </Badge>
                      </div>

                      {addon.includedIn && addon.includedIn.length > 0 && (
                        <div className="flex items-center justify-center gap-1 text-xs font-roboto">
                          <Badge className="bg-cattler-green text-white text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            {selectedCountry === "BR"
                              ? "Incluído em:"
                              : [
                                  "AR",
                                  "UY",
                                  "PY",
                                  "BO",
                                  "MX",
                                  "OT$ES",
                                ].includes(selectedCountry)
                              ? "Incluído en:"
                              : "Included in:"}
                            {addon.includedIn
                              .map((plan) =>
                                getShortPlanName(
                                  plan as "plan1" | "plan2" | "plan3" | "plan4"
                                )
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
                          onClick={() => addon && handleAddOnSelect(addon)}
                        >
                          {selectedCountry === "BR"
                            ? "Adicionar ao Plano"
                            : ["AR", "UY", "PY", "BO", "MX", "OT$ES"].includes(
                                selectedCountry
                              )
                            ? "Agregar al Plan"
                            : "Add to Plan"}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 bg-gradient-to-r from-cattler-navy to-cattler-teal rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold font-barlow mb-4">
              {selectedCountry === "BR"
                ? "Pronto para Começar?"
                : ["AR", "UY", "PY", "BO", "MX", "OT$ES"].includes(
                    selectedCountry
                  )
                ? "¿Listo para empezar?"
                : "Ready to Start?"}
            </h2>
            <p className="text-xl font-lato mb-8 opacity-90">
              {selectedCountry === "BR"
                ? "Escolha o plano que se adapta à sua operação e comece a gerenciar seu confinamento com mais eficiência hoje."
                : ["UY", "PY", "BO", "MX", "OT$ES"].includes(selectedCountry)
                ? "Elija el plan que se adapte a su operación y comience a gestionar su confinamiento con más eficiencia hoy."
                : ["AR"].includes(selectedCountry)
                ? "Elegí el plan que se adapte a tu operación y comienza a gestionar tu confinamiento con más eficiencia hoy."
                : "Choose the plan that fits your operation and start managing your confinement with more efficiency today."}
            </p>
            <div className="space-x-4">
              <Button
                size="lg"
                className="bg-cattler-orange hover:bg-cattler-orange/90 text-white font-lato font-bold px-8 py-3"
                onClick={() => {
                  const baseUrl =
                    selectedCountry === "BR"
                      ? "https://www.cattler.agr.br"
                      : "https://www.cattler.com.ar";
                  const demoPath =
                    selectedCountry === "BR" ? "/solicitar-demo" : "/demo";
                  const cattlerUrl = `${baseUrl}${demoPath}`;
                  if (window.parent && window.parent !== window) {
                    window.parent.location.href = cattlerUrl;
                  } else {
                    window.location.href = cattlerUrl;
                  }
                }}
              >
                {selectedCountry === "BR"
                  ? "Iniciar Teste Gratuito"
                  : ["AR", "UY", "PY", "BO", "MX", "OT$ES"].includes(
                      selectedCountry
                    )
                  ? "Iniciar Prueba Gratuita"
                  : "Start Free Trial"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-cattler-navy font-lato font-bold px-8 py-3 bg-white/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                onClick={() => {
                  const baseUrl =
                    selectedCountry === "BR"
                      ? "https://www.cattler.agr.br"
                      : "https://www.cattler.com.ar";
                  const cattlerUrl = `${baseUrl}/contact`;
                  if (window.parent && window.parent !== window) {
                    window.parent.location.href = cattlerUrl;
                  } else {
                    window.location.href = cattlerUrl;
                  }
                }}
              >
                {selectedCountry === "BR"
                  ? "Contatar Vendas"
                  : ["AR", "UY", "PY", "BO", "MX", "OT$ES"].includes(
                      selectedCountry
                    )
                  ? "Contactar Ventas"
                  : "Contact Sales"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
