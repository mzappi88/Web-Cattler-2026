"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import AddOnCheckout from "@/components/pricing/addon-checkout";
import { getAddOns, getAddOnInfo } from "@/data/owner-addons";

export default function AddonCheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedAddOn, setSelectedAddOn] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the addon ID and data parameter
  const addonId = useMemo(() => {
    try {
      return params.addonId as string;
    } catch (e) {
      console.error("Error getting addon ID:", e);
      return null;
    }
  }, [params.addonId]);

  const dataParam = useMemo(() => {
    try {
      return searchParams.get("data");
    } catch (e) {
      console.error("Error getting data param:", e);
      return null;
    }
  }, [searchParams]);

  useEffect(() => {
    let mounted = true;

    const loadAddon = async () => {
      try {
        if (!addonId) {
          if (mounted) {
            setError("No addon ID provided");
            setTimeout(() => {
              if (mounted) {
                router.push("/pricing");
              }
            }, 100);
          }
          return;
        }

        let addon = null;

        // Try to get addon from URL data first (includes promotional state)
        if (dataParam) {
          try {
            addon = JSON.parse(decodeURIComponent(dataParam));
          } catch (e) {
            console.error("Error parsing addon data:", e);
          }
        }

        // Fallback to getting addon from centralized data source
        if (!addon) {
          // Get addon from the centralized data source
          // We'll use a default country for now, but ideally this should be passed as a parameter
          const defaultCountry = "BR"; // This should be dynamic based on user selection
          const addonInfo = getAddOnInfo(addonId, defaultCountry);
          if (addonInfo) {
            addon = addonInfo;
          }
        }

        if (addon) {
          // Check if addon is coming soon
          if (addon.comingSoon) {
            if (mounted) {
              setError("Este complemento ainda não está disponível");
              setTimeout(() => {
                if (mounted) {
                  router.push("/pricing");
                }
              }, 2000);
            }
            return;
          }

          if (mounted) {
            setSelectedAddOn(addon);
            setError(null);
          }
        } else {
          if (mounted) {
            setError(`Complemento "${addonId}" não encontrado`);
            setTimeout(() => {
              if (mounted) {
                router.push("/pricing");
              }
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Error loading addon:", error);
        if (mounted) {
          setError("Erro ao carregar complemento");
          setTimeout(() => {
            if (mounted) {
              router.push("/pricing");
            }
          }, 2000);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadAddon();

    return () => {
      mounted = false;
    };
  }, [addonId, dataParam, router]);

  const handleBack = () => {
    router.push("/pricing");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cattler-green mx-auto mb-4"></div>
          <p className="text-cattler-navy font-lato">
            Carregando complemento...
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

  if (!selectedAddOn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cattler-light-teal/10 to-cattler-teal/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-cattler-navy font-lato mb-4">
            Nenhum complemento selecionado
          </p>
          <button
            onClick={handleBack}
            className="bg-cattler-teal text-white px-6 py-2 rounded-lg hover:bg-cattler-green transition-colors"
          >
            Voltar aos Planos
          </button>
        </div>
      </div>
    );
  }

  return <AddOnCheckout selectedAddOn={selectedAddOn} onBack={handleBack} />;
}
