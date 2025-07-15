"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Checkout from "@/components/pricing/checkout";
import { getOwnerPlans, findPlanById } from "@/data/owner-plans";
import { usePricingTranslation } from "@/hooks/use-pricing-translation";

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

export default function CheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedCountry } = usePricingTranslation();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    const ownerPlans = getOwnerPlans(selectedCountry);
    const plan = findPlanById(ownerPlans, planId);

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
  }, [planId, billingCycle, selectedCountry]);

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
