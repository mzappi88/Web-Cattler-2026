"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCountryDetection } from "@/hooks/use-country-detection";
import { usePricingTranslation } from "@/hooks/use-pricing-translation";
import { getOwnerPlans } from "@/data/owner-plans";
import { clearCountryDetectionCache } from "@/hooks/use-country-detection";

export function CountryDetectionTest() {
  const { detectedCountry, isDetecting } = useCountryDetection();
  const { selectedCountry, setSelectedCountry, isHydrated } =
    usePricingTranslation();
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    if (isHydrated && selectedCountry) {
      const plans = getOwnerPlans(selectedCountry);
      setDebugInfo({
        selectedCountry,
        detectedCountry,
        isDetecting,
        plans: plans.map((plan) => ({
          id: plan.id,
          name: plan.name,
          price: plan.price,
          annualPrice: plan.annualPrice,
        })),
      });
    }
  }, [selectedCountry, detectedCountry, isDetecting, isHydrated]);

  const handleClearCache = () => {
    clearCountryDetectionCache();
    window.location.reload();
  };

  const testApiDirectly = async () => {
    try {
      const response = await fetch("/api/country");
      const data = await response.json();
      console.log("🌍 Direct API test result:", data);
      alert(`API Response: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error("🌍 Direct API test failed:", error);
      alert(`API Error: ${error}`);
    }
  };

  const logCacheInfo = () => {
    if (typeof window === "undefined") return;

    const cacheInfo = {
      cattlerCountry: localStorage.getItem("cattler-country"),
      cattlerCountryDetected: localStorage.getItem("cattler-country-detected"),
      cattlerCountryLastDetection: localStorage.getItem(
        "cattler-country-last-detection"
      ),
      browserLanguage: navigator.language,
      userAgent: navigator.userAgent,
    };

    console.log("🌍 Cache Info:", cacheInfo);
    alert(`Cache Info: ${JSON.stringify(cacheInfo, null, 2)}`);
  };

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Country Detection Debug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Detected Country:</strong>{" "}
              {detectedCountry || "Not detected"}
            </div>
            <div>
              <strong>Selected Country:</strong> {selectedCountry}
            </div>
            <div>
              <strong>Is Detecting:</strong> {isDetecting ? "Yes" : "No"}
            </div>
            <div>
              <strong>Is Hydrated:</strong> {isHydrated ? "Yes" : "No"}
            </div>
          </div>

          {debugInfo && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Current Plans and Prices:</h3>
              <div className="space-y-2">
                {debugInfo.plans.map((plan: any, index: number) => (
                  <div key={plan.id} className="p-2 bg-gray-100 rounded">
                    <strong>Plan {index + 1}:</strong> {plan.name} - $
                    {plan.price}/month (${plan.annualPrice}/year)
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleClearCache} variant="outline">
              Limpiar Cache y Redetectar País
            </Button>
            <Button onClick={testApiDirectly} variant="outline">
              Test API Directamente
            </Button>
            <Button onClick={logCacheInfo} variant="outline">
              Log Cache Info
            </Button>
          </div>

          <div className="mt-4">
            <h3 className="font-bold mb-2">Manual Country Selection:</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "US",
                "CA",
                "AR",
                "PY",
                "UY",
                "BO",
                "BR",
                "MX",
                "OT$EN",
                "OT$ES",
              ].map((country) => (
                <Button
                  key={country}
                  onClick={() => setSelectedCountry(country as any)}
                  variant={selectedCountry === country ? "default" : "outline"}
                  size="sm"
                >
                  {country}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
