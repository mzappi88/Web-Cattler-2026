"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Checkout from "@/components/pricing/checkout";

// Simplified promotional state
const PROMOTIONAL_STATE = {
  saleActive: false,
  saleName: "",
  discounts: {
    annual: {},
    monthly: {},
    xMonthly: {},
    freeMonths: {},
  },
};

const OWNER_PLANS = [
  {
    id: "lite",
    name: "CONFINAMENTO LITE",
    price: 1000,
    annualPrice: 900,
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
    annualPrice: 1350,
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
    annualPrice: 1755,
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
    annualPrice: 3330,
    description: "Para quem exige excelência em sanidade e análise do rebanho.",
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

export default function CheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the plan ID and billing cycle to prevent unnecessary re-renders
  const planId = useMemo(() => {
    if (!params?.planId) return "";
    return Array.isArray(params.planId) ? params.planId[0] : params.planId;
  }, [params?.planId]);

  const billingCycle = useMemo(() => {
    if (!searchParams) return "monthly";
    return (searchParams.get("billing") as "monthly" | "annual") || "monthly";
  }, [searchParams]);

  useEffect(() => {
    if (!planId) {
      setError("Plan ID not found");
      setIsLoading(false);
      return;
    }

    const plan = OWNER_PLANS.find((p) => p.id === planId);

    if (plan) {
      setSelectedPlan({
        ...plan,
        billingCycle,
        planType: "owner",
        promotionalState: PROMOTIONAL_STATE,
      });
      setError(null);
    } else {
      setError(`Plan "${planId}" not found`);
    }

    setIsLoading(false);
  }, [planId, billingCycle]);

  const handleBack = () => {
    router.push("/pricing");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cattler-green mx-auto mb-4"></div>
          <p className="text-cattler-navy font-lato">Carregando plano...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-lato mb-4">{error}</p>
          <button
            onClick={handleBack}
            className="text-cattler-navy/70 font-roboto hover:text-cattler-navy transition-colors"
          >
            Voltar para a página de planos
          </button>
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-cattler-navy/70 font-roboto">
            Plano não encontrado
          </p>
          <button
            onClick={handleBack}
            className="text-cattler-navy/70 font-roboto hover:text-cattler-navy transition-colors mt-2"
          >
            Voltar para a página de planos
          </button>
        </div>
      </div>
    );
  }

  return <Checkout selectedPlan={selectedPlan} onBack={handleBack} />;
}
