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

interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  annualPrice?: number;
  description: string;
  pens: string;
  users: string;
  keyFeatures: string[];
  popular: boolean;
  billingCycle?: "monthly" | "annual";
  planType?: "owner" | "custom";
  promotion?: any;
  originalPrice?: number;
  promotionalState?: any;
  pricingOption?: "standard" | "plan-50-50";
  headCount?: number;
  summerStartDate?: string;
  summerEndDate?: string;
  summerMonths?: number;
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
  isBoitel?: boolean;
}

interface Feature {
  name: string;
  lite: any;
  go: any;
  flex: any;
  pro: any;
  isAddOn?: boolean;
  isExpandable?: boolean;
  isBoitel?: boolean;
  comingSoon?: boolean;
  subFeatures?: { name: string; lite: any; go: any; flex: any; pro: any }[];
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
      lite: { isActive: true, discountFactor: 0.15 },
      go: { isActive: true, discountFactor: 0.15 },
      flex: { isActive: true, discountFactor: 0.15 },
      pro: { isActive: true, discountFactor: 0.15 },
      "boitel-addon": { isActive: true, discountFactor: 0.15 },
      "sanidade-animal": { isActive: true, discountFactor: 0.15 },
    },
    monthly: {
      lite: { isActive: false, discountFactor: 0.2 },
      go: { isActive: false, discountFactor: 0.2 },
      flex: { isActive: true, discountFactor: 0.3 },
      pro: { isActive: false, discountFactor: 0.25 },
      "boitel-addon": { isActive: false, discountFactor: 0.2 },
    },
    xMonthly: {
      lite: { isActive: true, discountFactor: 0.5, xMonths: 6 },
      go: { isActive: true, discountFactor: 0.5, xMonths: 6 },
      flex: { isActive: false, discountFactor: 0.5, xMonths: 6 },
      pro: { isActive: false, discountFactor: 0.4, xMonths: 3 },
      "boitel-addon": { isActive: false, discountFactor: 0.5, xMonths: 12 },
    },
    freeMonths: {
      lite: { isActive: false, discountFactor: 0, freeMonths: 2 },
      go: { isActive: false, discountFactor: 0, freeMonths: 2 },
      flex: { isActive: false, discountFactor: 0, freeMonths: 2 },
      pro: { isActive: true, discountFactor: 0, freeMonths: 1 },
      "boitel-addon": { isActive: false, discountFactor: 0, freeMonths: 3 },
    },
  },
};

export default function Component() {
  const router = useRouter();
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
  const [summerPlan, setSummerPlan] = useState<string>("go"); // Default to Confinamento GO

  const calculateAnnualPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 12 * 0.9); // 10% discount on annual billing
  };

  const getActivePromotion = (
    productId: string,
    billingType: "monthly" | "annual"
  ) => {
    if (!promotionalState.saleActive) return null;

    // For annual billing, check annual discounts first
    if (
      billingType === "annual" &&
      promotionalState.discounts.annual[productId]?.isActive
    ) {
      return {
        type: "annual",
        ...promotionalState.discounts.annual[productId],
      };
    }

    // For monthly billing, check monthly discounts first
    if (
      billingType === "monthly" &&
      promotionalState.discounts.monthly[productId]?.isActive
    ) {
      return {
        type: "monthly",
        ...promotionalState.discounts.monthly[productId],
      };
    }

    // Check xMonthly promotions (can apply to both billing types)
    if (promotionalState.discounts.xMonthly[productId]?.isActive) {
      return {
        type: "xMonthly",
        ...promotionalState.discounts.xMonthly[productId],
      };
    }

    // Check freeMonths promotions (can apply to both billing types)
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
      // For free months, we don't change the displayed price but show the promotion
      return originalPrice;
    }

    // Apply the discount
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
        )}% de desconto por ${promotion.xMonths} meses`;
      case "freeMonths":
        return `${promotion.freeMonths} meses grátis`;
      case "annual":
      case "monthly":
        return `${Math.round(promotion.discountFactor * 100)}% de desconto`;
      default:
        return null;
    }
  };

  // Owner plans
  const PEN_PRICE = 30; // R$ 30 per month per pen (cambiar de 50 a 30)
  const USER_PRICE = 120; // R$ 120 per month per user (cambiar de 100 a 120)

  const ownerPlans: Plan[] = [
    {
      id: "lite",
      name: "CONFINAMENTO LITE",
      price: 1000,
      annualPrice: calculateAnnualPrice(1000),
      description: "Solução básica para pequenas operações",
      pens: "10 Currais",
      users: "1 Usuário",
      keyFeatures: [
        "Alimentação",
        "Gestão de Gado",
        "Inventário de Suprimentos",
        "Manejo de Dietas",
      ],
      popular: false,
    },
    {
      id: "go",
      name: "CONFINAMENTO GO",
      price: 1500,
      annualPrice: calculateAnnualPrice(1500),
      description: "Para produtores que buscam planejamento nutricional.",
      pens: "25 Currais",
      users: "2 Usuários",
      keyFeatures: [
        "Tudo do LITE",
        "Protocolos de alimentação",
        "Personalização da leitura de cocho",
      ],
      popular: false,
    },
    {
      id: "flex",
      name: "CONFINAMENTO FLEX",
      price: 1950,
      annualPrice: calculateAnnualPrice(1950),
      description: "Para quem deseja gestão precisa no tronco.",
      pens: "40 Currais",
      users: "3 Usuários",
      keyFeatures: [
        "Tudo do GO",
        "Tronco",
        "Integração com Leitor de Brinco",
        "Geração de Pré-mistura",
      ],
      popular: true,
    },
    {
      id: "pro",
      name: "CONFINAMENTO PRO",
      price: 3700,
      annualPrice: calculateAnnualPrice(3700),
      description:
        "Para quem exige excelência em sanidade e análise do rebanho.",
      pens: "80 Currais",
      users: "5 Usuários",
      keyFeatures: [
        "Tudo do FLEX",
        "Sanidade Animal",
        "Analytics",
        "Relatório de Valor de Mercado",
      ],
      popular: false,
    },
  ];

  // Owner features with expandable structure - MASTER REFERENCE
  const ownerFeatures: Feature[] = [
    { name: "Currais Incluídos", lite: "10", go: "25", flex: "40", pro: "80" },
    { name: "Usuários", lite: "1", go: "2", flex: "3", pro: "5" },
    {
      name: "Curral Extra",
      lite: "+R$ 30",
      go: "+R$ 30",
      flex: "+R$ 30",
      pro: "+R$ 30",
    },
    {
      name: "Usuário Extra",
      lite: "+R$ 120",
      go: "+R$ 120",
      flex: "+R$ 120",
      pro: "+R$ 120",
    },
    { name: "Alimentação", lite: true, go: true, flex: true, pro: true },
    {
      name: "Mapa do Confinamento",
      lite: true,
      go: true,
      flex: true,
      pro: true,
    },
    { name: "Gestão de Gado", lite: true, go: true, flex: true, pro: true },
    {
      name: "Inventário de Suprimentos",
      lite: true,
      go: true,
      flex: true,
      pro: true,
    },
    {
      name: "Quantidade de Suprimentos",
      lite: "Ilimitado",
      go: "Ilimitado",
      flex: "Ilimitado",
      pro: "Ilimitado",
    },
    { name: "Manejo de Dietas", lite: true, go: true, flex: true, pro: true },
    {
      name: "Quantidade de Dietas",
      lite: "Ilimitado",
      go: "Ilimitado",
      flex: "Ilimitado",
      pro: "Ilimitado",
    },
    { name: "Recorredor", lite: true, go: true, flex: true, pro: true },
    { name: "Relatórios", lite: true, go: true, flex: true, pro: true },
    {
      name: "Alimentação Avançada",
      lite: "+R$ 600",
      go: true,
      flex: true,
      pro: true,
      isExpandable: true,
      subFeatures: [
        {
          name: "Protocolos de Alimentação",
          lite: false,
          go: true,
          flex: true,
          pro: true,
        },
        {
          name: "Automação de Ordens de Carga/Descarga",
          lite: false,
          go: true,
          flex: true,
          pro: true,
        },
        {
          name: "Personalização da Leitura de Cocho",
          lite: false,
          go: true,
          flex: true,
          pro: true,
        },
      ],
    },
    {
      name: "Geração de Pré-misturas (Premixes)",
      lite: "+R$ 150",
      go: "+R$ 150",
      flex: true,
      pro: true,
    },
    {
      name: "Sanidade Animal",
      lite: "+R$ 400",
      go: "+R$ 400",
      flex: "+R$ 400",
      pro: true,
    },
    { name: "Tronco", lite: false, go: "+R$ 300", flex: true, pro: true },
    {
      name: "Integração com Leitor de Brinco",
      lite: false,
      go: "+R$ 300",
      flex: true,
      pro: true,
    },
    {
      name: "Sanidade Animal",
      lite: "+R$ 400",
      go: "+R$ 400",
      flex: "+R$ 400",
      pro: true,
    },
    {
      name: "Módulo Boitel",
      lite: "+R$ 600",
      go: "+R$ 600",
      flex: "+R$ 600",
      pro: "+R$ 600",
      isAddOn: true,
      isBoitel: true,
      isExpandable: true,
      subFeatures: [
        {
          name: "Demonstrativos",
          lite: false,
          go: false,
          flex: false,
          pro: false,
        },
        {
          name: "Gestão de Contas",
          lite: false,
          go: false,
          flex: false,
          pro: false,
        },
        {
          name: "Relatório de Margens e Lucros",
          lite: false,
          go: false,
          flex: false,
          pro: false,
        },
        {
          name: "Usuários de Clientes",
          lite: "+R$ 120",
          go: "+R$ 120",
          flex: "+R$ 120",
          pro: "+R$ 120",
        },
      ],
    },
    {
      name: "Integração com Balanças de Caminhões",
      lite: false,
      go: false,
      flex: "Proximamente",
      pro: "Proximamente",
    },
    {
      name: "Integração com Dump Box",
      lite: false,
      go: false,
      flex: "Proximamente",
      pro: "Proximamente",
    },
  ];

  const currentPlans = ownerPlans;
  const currentFeatures = ownerFeatures;

  // Add-ons array - Updated with all available add-ons
  const addOns: AddOn[] = [
    {
      id: "boitel-addon",
      name: "Módulo Boitel",
      description:
        "Gestão completa para operações de Boitel com múltiplos clientes",
      price: 600,
      availableFor: ["lite", "go", "flex", "pro"],
      includedIn: [],
      isBoitel: true,
    },
    {
      id: "usuarios-clientes",
      name: "Usuários de Clientes",
      description: "Usuários adicionais para clientes específicos",
      price: 120,
      availableFor: ["lite", "go", "flex", "pro"],
      includedIn: [],
      isBoitel: true,
    },
    {
      id: "sanidade-animal",
      name: "Sanidade Animal",
      description: "Gestão completa da saúde do rebanho",
      price: 400,
      availableFor: ["lite", "go", "flex"],
      includedIn: ["pro"],
    },
    {
      id: "tronco",
      name: "Tronco",
      description: "Sistema completo de manejo no tronco",
      price: 300,
      availableFor: ["go"],
      includedIn: ["flex", "pro"],
    },
    {
      id: "leitor-brinco",
      name: "Integração com Leitor de Brinco",
      description: "Integração com sistemas de leitura de brincos eletrônicos",
      price: 300,
      availableFor: ["go"],
      includedIn: ["flex", "pro"],
    },
    {
      id: "alimentacao-avancada",
      name: "Alimentação Avançada",
      description: "Recursos avançados para gestão e otimização de alimentação",
      price: 600,
      availableFor: ["lite"],
      includedIn: ["go", "flex", "pro"],
    },
    {
      id: "pre-misturas",
      name: "Geração de Pré-misturas",
      description: "Sistema para geração e controle de pré-misturas",
      price: 150,
      availableFor: ["lite", "go"],
      includedIn: ["flex", "pro"],
    },
    {
      id: "analytics",
      name: "Analytics",
      description:
        "Análises avançadas e relatórios detalhados para otimização da operação",
      price: 300,
      availableFor: ["go", "flex"],
      includedIn: ["pro"],
    },
    {
      id: "relatorio-mercado",
      name: "Relatório de Valor de Mercado",
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
    if (typeof value === "string" && value.startsWith("+R$")) {
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
    // Navigate to checkout with plan ID and billing cycle
    router.push(`/pricing/checkout/${plan.id}?billing=${billingCycle}`);
  };

  const handleAddOnSelect = (addOn: AddOn) => {
    // Don't allow selection of coming soon add-ons
    if (addOn.comingSoon) {
      return;
    }

    // Add promotional state to addon before navigation
    const addonWithPromotion = {
      ...addOn,
      promotionalState: promotionalState,
    };

    // Navigate to addon checkout with promotional data
    const addonData = encodeURIComponent(JSON.stringify(addonWithPromotion));
    router.push(`/pricing/addon/${addOn.id}?data=${addonData}`);
  };

  const toggleBillingCycle = () => {
    setBillingCycle((prev) => (prev === "monthly" ? "annual" : "monthly"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
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
            Escolha Seu Plano de Confinamento
          </h1>
          <p className="text-xl font-lato text-cattler-navy/80 max-w-3xl mx-auto mb-8">
            Soluções completas de gestão de confinamento projetadas para
            otimizar suas operações. Da alimentação básica a análises avançadas.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex flex-col items-center gap-6 mb-8">
            {/* Billing Cycle Toggle */}
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
                  Mensal
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
                  Anual (10% de desconto)
                </span>
              </div>
            </div>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold font-barlow text-cattler-navy">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-sm font-roboto text-cattler-navy/70">
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
                                R$ {originalPrice}
                              </span>
                              <Badge className="bg-red-500 text-white text-xs animate-pulse">
                                {promotionalState.saleName}
                              </Badge>
                            </div>
                          )}
                          <div>R$ {displayPrice}</div>
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
                    por mês
                    {billingCycle === "annual" ? ", cobrado anualmente" : ""}
                  </div>
                  {billingCycle === "annual" && (
                    <div className="mt-1 text-xs font-roboto text-cattler-orange font-medium">
                      R$ {plan.annualPrice} por ano (Economize R${" "}
                      {Math.round(plan.price * 12 * 0.1)})
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium font-lato text-cattler-navy">
                        Currais:
                      </span>
                      <span className="text-sm font-roboto text-cattler-navy/80">
                        {plan.pens}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium font-lato text-cattler-navy">
                        Usuários:
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
                        // Excluir las integraciones
                        if (
                          feature.toLowerCase().includes("integração") ||
                          feature.toLowerCase().includes("integrações")
                        ) {
                          return null;
                        }
                        return (
                          <li
                            key={idx}
                            className="text-sm font-roboto text-cattler-navy/70 flex items-center"
                          >
                            <Check className="h-4 w-4 text-cattler-green mr-2 flex-shrink-0" />
                            {feature}
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
                    Começar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* New Section: Do you do Boitel? */}
          <div className="text-center mt-12 mb-20 bg-gradient-to-r from-cattler-amber/10 via-cattler-orange/10 to-cattler-amber/10 rounded-2xl p-12 border-2 border-cattler-amber/30">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-cattler-amber rounded-full flex items-center justify-center mr-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold font-barlow text-cattler-navy">
                  Você faz Boitel?
                </h2>
              </div>

              <p className="text-xl font-lato text-cattler-navy/80 max-w-3xl mx-auto mb-8">
                Aprimore suas operações de Boitel com recursos especializados
                projetados para gerenciar múltiplos clientes e operações
                complexas.
              </p>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-8 border border-cattler-amber/20">
                <h3 className="text-lg font-bold font-barlow text-cattler-navy mb-4">
                  Complemento Recomendado para Boitel
                </h3>
                <div className="max-w-md mx-auto">
                  <div className="bg-gradient-to-br from-cattler-amber/5 to-cattler-orange/5 rounded-lg p-4 border border-cattler-amber/30 flex flex-col">
                    <h4 className="font-bold font-lato text-cattler-amber mb-2">
                      Módulo Boitel
                    </h4>
                    <p className="text-sm font-roboto text-cattler-navy/70 mb-3">
                      Gestão completa para operações de Boitel com múltiplos
                      clientes, controle de propriedade e faturamento
                      especializado.
                    </p>
                    <div className="text-lg font-bold font-barlow text-cattler-green mb-4">
                      +R$ 600/mês
                    </div>
                    <Button
                      className="mt-auto bg-cattler-amber hover:bg-cattler-amber/90 text-white font-lato font-bold py-3 shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={() =>
                        handleAddOnSelect(
                          addOns.find((addon) => addon.id === "boitel-addon")!
                        )
                      }
                    >
                      Adicionar ao Plano
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm font-roboto text-cattler-navy/60">
                Este complemento é especificamente projetado para operações de
                Boitel e pode ser adicionado a qualquer plano de Confinamento.
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
                      CONFINAMENTO LITE
                      <br />
                      <span className="text-sm font-normal font-roboto text-cattler-navy/60">
                        R$ 1.000
                      </span>
                    </th>
                    <th className="text-center py-4 px-4 font-bold font-lato text-cattler-navy bg-white">
                      CONFINAMENTO GO
                      <br />
                      <span className="text-sm font-normal font-roboto text-cattler-navy/60">
                        R$ 1.500
                      </span>
                    </th>
                    <th className="text-center py-4 px-4 font-bold font-lato text-cattler-navy bg-cattler-light-teal/20">
                      CONFINAMENTO FLEX
                      <br />
                      <span className="text-sm font-normal font-roboto text-cattler-navy/60">
                        R$ 1.950
                      </span>
                    </th>
                    <th className="text-center py-4 px-4 font-bold font-lato text-cattler-navy bg-white">
                      CONFINAMENTO PRO
                      <br />
                      <span className="text-sm font-normal font-roboto text-cattler-navy/60">
                        R$ 3.700
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
                            : feature.isBoitel
                            ? "bg-cattler-amber/10"
                            : ""
                        }`}
                      >
                        <td
                          className={`py-3 px-4 font-medium font-lato ${
                            feature.isAddOn
                              ? "font-bold text-cattler-orange"
                              : feature.isBoitel
                              ? "font-bold text-cattler-amber"
                              : "text-cattler-navy"
                          }`}
                        >
                          <div className="flex items-center">
                            {feature.name}
                            {feature.isBoitel && (
                              <Badge className="ml-2 bg-cattler-amber text-white text-xs">
                                <Users className="h-3 w-3 mr-1" />
                                Boitel
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
                            feature.lite,
                            true,
                            feature.name,
                            feature.comingSoon
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {renderFeatureValue(
                            feature.go,
                            true,
                            feature.name,
                            feature.comingSoon
                          )}
                        </td>
                        <td className="py-3 px-4 text-center bg-cattler-light-teal/10">
                          {renderFeatureValue(
                            feature.flex,
                            true,
                            feature.comingSoon
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {renderFeatureValue(
                            feature.pro,
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
                                subFeature.lite,
                                true,
                                subFeature.name
                              )}
                            </td>
                            <td className="py-2 px-4 text-center">
                              {renderFeatureValue(
                                subFeature.go,
                                true,
                                subFeature.name
                              )}
                            </td>
                            <td className="py-2 px-4 text-center bg-cattler-light-teal/10">
                              {renderFeatureValue(
                                subFeature.flex,
                                true,
                                subFeature.name
                              )}
                            </td>
                            <td className="py-2 px-4 text-center">
                              {renderFeatureValue(
                                subFeature.pro,
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

          {/* Add-ons Section - Now Clickable */}
          <div className="mt-16 bg-white rounded-lg shadow-xl border border-cattler-teal/20 p-8">
            <h3 className="text-2xl font-bold font-barlow text-cattler-navy text-center mb-6">
              Complementos Disponíveis
            </h3>
            <p className="text-center text-cattler-navy/70 font-roboto mb-8">
              Clique no complemento para comprá-lo para seu plano de
              Confinamento existente
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addOns.map((addon, index) => {
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
                        : addon.isBoitel
                        ? "hover:shadow-lg cursor-pointer border-cattler-amber/50 hover:border-cattler-amber bg-cattler-amber/5"
                        : "hover:shadow-lg cursor-pointer border-cattler-teal/50 hover:border-cattler-teal bg-cattler-teal/5"
                    }`}
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          addon.comingSoon
                            ? "bg-gray-200"
                            : addon.isBoitel
                            ? "bg-cattler-amber/10 group-hover:bg-cattler-amber/20"
                            : "bg-cattler-teal/10 group-hover:bg-cattler-teal/20"
                        }`}
                      >
                        <Plus
                          className={`h-5 w-5 ${
                            addon.comingSoon
                              ? "text-gray-400"
                              : addon.isBoitel
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
                          : addon.isBoitel
                          ? "text-cattler-amber group-hover:text-cattler-amber"
                          : "text-cattler-teal group-hover:text-cattler-teal"
                      }`}
                    >
                      {addon.name}
                      {addon.isBoitel && (
                        <Badge className="ml-2 bg-cattler-amber text-white text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          Boitel
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
                          : addon.isBoitel
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
                                  +R$ {originalPrice}/mês
                                </span>
                                <Badge className="bg-red-500 text-white text-xs animate-pulse">
                                  {promotionalState.saleName}
                                </Badge>
                              </div>
                            )}
                            <div>+R$ {promotionalPrice}/mês</div>
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
                            addon.isBoitel
                              ? "border-cattler-amber text-cattler-amber"
                              : "border-cattler-teal text-cattler-teal"
                          }`}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Disponível para:{" "}
                          {addon.availableFor
                            .map((plan) =>
                              plan === "go"
                                ? "GO"
                                : plan === "flex"
                                ? "FLEX"
                                : plan === "PRO"
                                ? "PRO"
                                : plan === "lite"
                                ? "LITE"
                                : ""
                            )
                            .join(", ")}
                        </Badge>
                      </div>

                      {/* Add included in plans information */}
                      {addon.includedIn && addon.includedIn.length > 0 && (
                        <div className="flex items-center justify-center gap-1 text-xs font-roboto">
                          <Badge className="bg-cattler-green text-white text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Incluído em:{" "}
                            {addon.includedIn
                              .map((plan) =>
                                plan === "go"
                                  ? "GO"
                                  : plan === "flex"
                                  ? "FLEX"
                                  : plan === "pro"
                                  ? "PRO"
                                  : plan === "lite"
                                  ? "LITE"
                                  : ""
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
                            addon.isBoitel
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
