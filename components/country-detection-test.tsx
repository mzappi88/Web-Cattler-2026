"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCountryDetection } from "@/hooks/use-country-detection";
import { useTranslation } from "@/hooks/use-translation";
import { clearCountryDetectionCache } from "@/hooks/use-country-detection";
import { useRouter } from "next/navigation";

export function CountryDetectionTest() {
  const { detectedCountry, isDetecting } = useCountryDetection();
  const { selectedCountry, setSelectedCountry, language, isHydrated, t } =
    useTranslation();
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [apiTestResult, setApiTestResult] = useState<any>(null);
  const [isInIframe, setIsInIframe] = useState<boolean>(false);

  // Detect admin mode - only on client side
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);

  // Detect admin mode and iframe - only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const adminMode = window.location.pathname === "/country-test";
      const inIframe = window !== window.top;

      setIsAdminMode(adminMode);
      setIsInIframe(inIframe);

      // Activate admin mode in localStorage when accessing /country-test
      if (adminMode) {
        localStorage.setItem("cattler-admin-mode", "true");
        console.log("🔍 Admin Mode Activated");
      }

      console.log("🔍 Admin Mode Detection:", { adminMode });
      console.log("🔍 Iframe Detection:", { inIframe });
    }
  }, []);

  useEffect(() => {
    if (isHydrated && selectedCountry) {
      // Test translations for current language
      const translationTests = {
        contact: t("footer.contact"),
        contactUs: t("footer.contactUs"),
        terms: t("footer.termsConditions"),
        privacy: t("footer.privacyPolicy"),
      };

      const timezone =
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : "unknown";
      const timezoneOffset = new Date().getTimezoneOffset();
      const timezoneOffsetHours = -timezoneOffset / 60;

      setDebugInfo({
        selectedCountry,
        detectedCountry,
        isDetecting,
        language,
        isHydrated,
        isInIframe,
        browserLanguage:
          typeof navigator !== "undefined" ? navigator.language : "unknown",
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
        timezone: {
          timezone,
          offset: `${
            timezoneOffsetHours > 0 ? "+" : ""
          }${timezoneOffsetHours} hours`,
          offsetMinutes: timezoneOffset,
          dateString: new Date().toString(),
          localeString: new Date().toLocaleString(),
        },
        translationTests,
        localStorage:
          typeof window !== "undefined"
            ? {
                cattlerCountry: localStorage.getItem("cattler-country"),
                cattlerCountryDetected: localStorage.getItem(
                  "cattler-country-detected"
                ),
                cattlerCountryLastDetection: localStorage.getItem(
                  "cattler-country-last-detection"
                ),
              }
            : null,
      });
    }
  }, [
    selectedCountry,
    detectedCountry,
    isDetecting,
    isHydrated,
    language,
    t,
    isInIframe,
  ]);

  const handleClearCache = () => {
    clearCountryDetectionCache();
    window.location.reload();
  };

  const exitAdminMode = () => {
    localStorage.removeItem("cattler-admin-mode");
    localStorage.removeItem("cattler-country");
    localStorage.removeItem("cattler-country-detected");
    localStorage.removeItem("cattler-country-last-detection");
    window.location.reload();
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
    const cacheInfo = {
      cattlerCountry: localStorage.getItem("cattler-country"),
      cattlerCountryDetected: localStorage.getItem("cattler-country-detected"),
      cattlerCountryLastDetection: localStorage.getItem(
        "cattler-country-last-detection"
      ),
      browserLanguage:
        typeof navigator !== "undefined" ? navigator.language : "unknown",
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
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

  // Navigation functions - only available when not in iframe
  const navigateToRoute = (route: string) => {
    if (isInIframe) {
      console.log("🚫 Navigation blocked: Page is embedded in iframe");
      return;
    }

    console.log(`🌍 Navigating to ${route} with country: ${selectedCountry}`);
    router.push(route);
  };

  const navigationRoutes = [
    { path: "/", label: "Home" },
    { path: "/pricing", label: "Pricing" },
    { path: "/about_us", label: "About Us" },
    { path: "/contact", label: "Contact" },
    { path: "/demo", label: "Demo" },
    { path: "/sale", label: "Sale" },
  ];

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading country detection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Country Detection Debug
            {isAdminMode && (
              <span className="px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
                ADMIN MODE
              </span>
            )}
          </CardTitle>
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
              {typeof navigator !== "undefined"
                ? navigator.language
                : "unknown"}
            </div>
            <div className="col-span-2">
              <strong>Timezone:</strong>{" "}
              {typeof Intl !== "undefined"
                ? (() => {
                    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    const offset = new Date().getTimezoneOffset();
                    const offsetHours = -offset / 60;
                    return `${tz} (UTC${
                      offsetHours > 0 ? "+" : ""
                    }${offsetHours})`;
                  })()
                : "unknown"}
            </div>
            <div>
              <strong>User Agent:</strong>{" "}
              {typeof navigator !== "undefined"
                ? navigator.userAgent.substring(0, 50) + "..."
                : "unknown"}
            </div>
            <div>
              <strong>In Iframe:</strong> {isInIframe ? "Yes" : "No"}
            </div>
            <div>
              <strong>Admin Mode:</strong> {isAdminMode ? "Yes" : "No"}
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
            <Button onClick={testApiDirectly} variant="outline">
              Test API Directamente
            </Button>
            <Button onClick={logCacheInfo} variant="outline">
              Log Cache Info
            </Button>
            <Button onClick={testTranslation} variant="outline">
              Test Translations
            </Button>
            {isAdminMode && (
              <Button onClick={exitAdminMode} variant="destructive">
                Salir del Modo Admin
              </Button>
            )}
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
                "CH",
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

          {/* Navigation Section - Only show when not in iframe */}
          {!isInIframe && (
            <div className="mt-6">
              <h3 className="font-bold mb-2">
                Navigate to Routes with Current Country:
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Current country: <strong>{selectedCountry}</strong> ({language})
              </p>
              <div className="flex flex-wrap gap-2">
                {navigationRoutes.map((route) => (
                  <Button
                    key={route.path}
                    onClick={() => navigateToRoute(route.path)}
                    variant="secondary"
                    size="sm"
                  >
                    {route.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Admin Mode Info */}
          {isAdminMode && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">
                🔧 Admin Mode Active
              </h3>
              <p className="text-sm text-blue-700">
                You're in admin mode! Auto-detection is disabled. You can
                manually select any country and it will persist until you change
                it. Perfect for testing different locales.
              </p>
            </div>
          )}

          {/* Iframe Warning */}
          {isInIframe && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-bold text-yellow-800 mb-2">
                ⚠️ Iframe Detected
              </h3>
              <p className="text-sm text-yellow-700">
                Navigation is disabled because this page is embedded in an
                iframe. This prevents navigation from affecting the parent page.
              </p>
            </div>
          )}

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
