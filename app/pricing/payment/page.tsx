"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import PaymentPage from "@/components/pricing/payment-page";
import { getPricingUrl } from "@/hooks/use-translation";

export default function PaymentPageRoute() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentData, setPaymentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the data parameter to prevent infinite re-renders
  const dataParam = useMemo(() => {
    try {
      return searchParams.get("data");
    } catch (e) {
      console.error("Error getting search params:", e);
      return null;
    }
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;

    const loadPaymentData = async () => {
      try {
        if (dataParam) {
          // Parse data from URL parameter
          const data = JSON.parse(decodeURIComponent(dataParam));
          if (mounted) {
            setPaymentData(data);
            setError(null);
          }
        } else {
          // Try to get from localStorage as fallback
          const storedData = localStorage.getItem("paymentData");
          if (storedData) {
            const data = JSON.parse(storedData);
            if (mounted) {
              setPaymentData(data);
              setError(null);
            }
          } else {
            if (mounted) {
              setError("No payment data found");
              // Use setTimeout to avoid state update during render
              setTimeout(() => {
                if (mounted) {
                  const savedCountry = localStorage.getItem(
                    "cattler-country"
                  ) as any;
                  const pricingUrl = getPricingUrl(savedCountry || "US");
                  if (window.parent && window.parent !== window) {
                    window.parent.location.href = pricingUrl;
                  } else {
                    window.location.href = pricingUrl;
                  }
                }
              }, 100);
            }
          }
        }
      } catch (error) {
        console.error("Error parsing payment data:", error);
        if (mounted) {
          setError("Invalid payment data");
          setTimeout(() => {
            if (mounted) {
              const savedCountry = localStorage.getItem(
                "cattler-country"
              ) as any;
              const pricingUrl = getPricingUrl(savedCountry || "US");
              if (window.parent && window.parent !== window) {
                window.parent.location.href = pricingUrl;
              } else {
                window.location.href = pricingUrl;
              }
            }
          }, 100);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadPaymentData();

    return () => {
      mounted = false;
    };
  }, [dataParam, router]);

  const handleBack = () => {
    // Navigate back to checkout with the plan ID and billing cycle
    if ((paymentData as any)?.plan?.id && (paymentData as any)?.billingCycle) {
      router.push(
        `/pricing/checkout/${(paymentData as any).plan.id}?billing=${
          (paymentData as any).billingCycle
        }`
      );
    } else {
      const savedCountry = localStorage.getItem("cattler-country") as any;
      const pricingUrl = getPricingUrl(savedCountry || "US");
      if (window.parent && window.parent !== window) {
        window.parent.location.href = pricingUrl;
      } else {
        window.location.href = pricingUrl;
      }
    }
  };

  const handleSuccess = () => {
    router.push("/pricing/feedlot-info");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cattler-green mx-auto mb-4"></div>
          <p className="text-cattler-navy font-lato">
            Carregando dados de pagamento...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-lato mb-4">{error}</p>
          <p className="text-cattler-navy/70 font-roboto">
            Redirecionando para a página de planos...
          </p>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return null;
  }

  return (
    <PaymentPage
      paymentData={paymentData}
      onBack={handleBack}
      onSuccess={handleSuccess}
    />
  );
}
