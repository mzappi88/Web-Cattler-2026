"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCountryDetection } from "@/hooks/use-country-detection";
import { useTranslation } from "@/hooks/use-translation";
import { clearCountryDetectionCache } from "@/hooks/use-country-detection";

export function CountryDetectionTest() {
  const { detectedCountry, isDetecting } = useCountryDetection();
  const { selectedCountry, setSelectedCountry, language, isHydrated, t } =
    useTranslation();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [apiTestResult, setApiTestResult] = useState<any>(null);

  useEffect(() => {
    if (isHydrated && selectedCountry) {
      // Test translations for current language
      const translationTests = {
        contact: t("footer.contact"),
        contactUs: t("footer.contactUs"),
        terms: t("footer.termsConditions"),
        privacy: t("footer.privacyPolicy"),
      };

      setDebugInfo({
        selectedCountry,
        detectedCountry,
        isDetecting,
        language,
        isHydrated,
        browserLanguage:
          typeof window !== "undefined" ? navigator.language : "N/A",
        userAgent: typeof window !== "undefined" ? navigator.userAgent : "N/A",
        translationTests,
        localStorage: {
          cattlerCountry:
            typeof window !== "undefined"
              ? localStorage.getItem("cattler-country")
              : null,
          cattlerCountryDetected:
            typeof window !== "undefined"
              ? localStorage.getItem("cattler-country-detected")
              : null,
          cattlerCountryLastDetection:
            typeof window !== "undefined"
              ? localStorage.getItem("cattler-country-last-detection")
              : null,
        },
      });
    }
  }, [selectedCountry, detectedCountry, isDetecting, isHydrated, language, t]);

  const handleClearCache = () => {
    clearCountryDetectionCache();
    window.location.reload();
  };

  const forceArgentina = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cattler-country", "AR");
      localStorage.setItem(
        "cattler-country-last-detection",
        Date.now().toString()
      );
      window.location.reload();
    }
  };

  const testApiDirectly = async () => {
    try {
      setApiTestResult({ status: "loading", message: "Testing API..." });
      const response = await fetch("/api/country");
      const data = await response.json();
      console.log("🌍 Direct API test result:", data);
      setApiTestResult({ status: "success", data });
    } catch (error) {
      console.error("🌍 Direct API test failed:", error);
      setApiTestResult({
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      });
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

  const testTranslation = () => {
    const testKeys = [
      "footer.contact",
      "footer.contactUs",
      "footer.termsConditions",
      "footer.privacyPolicy",
    ];

    const results = testKeys.map((key) => ({
      key,
      translation: t(key),
      exists: t(key) !== key,
    }));

    console.log("🌍 Translation Test Results:", results);
    alert(`Translation Test: ${JSON.stringify(results, null, 2)}`);
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
              <strong>Language:</strong> {language}
            </div>
            <div>
              <strong>Is Detecting:</strong> {isDetecting ? "Yes" : "No"}
            </div>
            <div>
              <strong>Is Hydrated:</strong> {isHydrated ? "Yes" : "No"}
            </div>
            <div>
              <strong>Browser Language:</strong>{" "}
              {typeof window !== "undefined" ? navigator.language : "N/A"}
            </div>
            <div>
              <strong>Timezone:</strong>{" "}
              {typeof window !== "undefined"
                ? Intl.DateTimeFormat().resolvedOptions().timeZone
                : "N/A"}
            </div>
            <div>
              <strong>User Agent:</strong>{" "}
              {typeof window !== "undefined"
                ? navigator.userAgent.substring(0, 50) + "..."
                : "N/A"}
            </div>
          </div>

          {debugInfo && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Debug Info:</h3>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}

          {apiTestResult && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">API Test Result:</h3>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(apiTestResult, null, 2)}
              </pre>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleClearCache} variant="outline">
              Limpiar Cache y Redetectar País
            </Button>
            <Button
              onClick={forceArgentina}
              variant="outline"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Forzar Argentina
            </Button>
            <Button onClick={testApiDirectly} variant="outline">
              Test API Directamente
            </Button>
            <Button onClick={logCacheInfo} variant="outline">
              Log Cache Info
            </Button>
            <Button onClick={testTranslation} variant="outline">
              Test Translations
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

          <div className="mt-4">
            <h3 className="font-bold mb-2">Translation Test:</h3>
            <div className="space-y-2">
              <div>
                <strong>Contact:</strong> {t("footer.contact")}
              </div>
              <div>
                <strong>Contact Us:</strong> {t("footer.contactUs")}
              </div>
              <div>
                <strong>Terms:</strong> {t("footer.termsConditions")}
              </div>
              <div>
                <strong>Privacy:</strong> {t("footer.privacyPolicy")}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-bold mb-2">Language Mapping Test:</h3>
            <div className="space-y-2">
              <div>
                <strong>US → Language:</strong> en
              </div>
              <div>
                <strong>AR → Language:</strong> es-ar
              </div>
              <div>
                <strong>ES → Language:</strong> es
              </div>
              <div>
                <strong>PT → Language:</strong> pt
              </div>
              <div>
                <strong>Current Country → Language:</strong> {selectedCountry} →{" "}
                {language}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
