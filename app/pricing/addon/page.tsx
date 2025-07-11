"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import AddOnCheckout from "@/components/pricing/addon-checkout";

// Move add-ons data outside component to prevent recreation on every render
const ADD_ONS = [
  {
    id: "customFeeder-addon",
    name: "Módulo customFeeder",
    description:
      "Gestão completa para operações de customFeeder com múltiplos clientes",
    price: 600,
    availableFor: ["lite", "go", "flex", "pro"],
    includedIn: [],
    isCustomFeeder: true,
  },
  {
    id: "usuarios-clientes",
    name: "Usuários de Clientes",
    description: "Usuários adicionais para clientes específicos",
    price: 120,
    availableFor: ["lite", "go", "flex", "pro"],
    includedIn: [],
    isCustomFeeder: true,
  },
  {
    id: "animal-health",
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

export default function AddonCheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedAddOn, setSelectedAddOn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // Fallback to finding addon in static data
        if (!addon) {
          addon = ADD_ONS.find((a) => a.id === addonId);
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
          <p className="text-cattler-navy font-lato">
            Complemento não encontrado
          </p>
          <p className="text-cattler-navy/70 font-roboto">
            Redirecionando para a página de planos...
          </p>
        </div>
      </div>
    );
  }

  return <AddOnCheckout selectedAddOn={selectedAddOn} onBack={handleBack} />;
}
