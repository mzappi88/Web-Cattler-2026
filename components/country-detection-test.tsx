"use client";

import {
  useCountryDetection,
  clearCountryDetectionCache,
} from "@/hooks/use-country-detection";
import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function CountryDetectionTest() {
  const { detectedCountry, isDetecting } = useCountryDetection();
  const { selectedCountry, language, t, setSelectedCountry } = useTranslation();
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [testingApi, setTestingApi] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const clearStorageAndRedetect = () => {
    if (typeof window !== "undefined") {
      clearCountryDetectionCache();
      window.location.reload();
    }
  };

  const testApiDirectly = async () => {
    setTestingApi(true);
    try {
      const response = await fetch("/api/country");
      const data = await response.json();
      setApiResponse(data);
      console.log("🌍 Direct API test response:", data);
    } catch (error) {
      setApiResponse({
        error: error instanceof Error ? error.message : "Unknown error",
      });
      console.error("🌍 Direct API test error:", error);
    } finally {
      setTestingApi(false);
    }
  };

  const getBrowserLanguage = () => {
    if (typeof window === "undefined") return "unknown";
    return navigator.language || navigator.languages?.[0] || "unknown";
  };

  const getCachedCountry = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("cattler-country");
  };

  const getLastDetectionTime = () => {
    if (typeof window === "undefined") return "Never";
    const timestamp = localStorage.getItem("cattler-country-last-detection");
    if (!timestamp) return "Never";
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  const logCacheInfo = () => {
    if (typeof window === "undefined") return;
    console.log("🌍 Current localStorage items:");
    console.log("cattler-country:", localStorage.getItem("cattler-country"));
    console.log(
      "cattler-country-detected:",
      localStorage.getItem("cattler-country-detected")
    );
    console.log(
      "cattler-country-last-detection:",
      localStorage.getItem("cattler-country-last-detection")
    );
  };

  // Don't render anything until we're on the client
  if (!isClient) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Detección Automática de País</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">Cargando...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Detección Automática de País</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Estado de Detección:</h3>
          <Badge variant={isDetecting ? "secondary" : "default"}>
            {isDetecting ? "Detectando..." : "Detectado"}
          </Badge>
        </div>

        <div>
          <h3 className="font-semibold mb-2">País Detectado:</h3>
          <p className="text-sm text-gray-600">
            {detectedCountry || "No detectado"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">País Seleccionado:</h3>
          <p className="text-sm text-gray-600">{selectedCountry}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Idioma Actual:</h3>
          <p className="text-sm text-gray-600">{language}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Idioma del Navegador:</h3>
          <p className="text-sm text-gray-600">{getBrowserLanguage()}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">País en Cache:</h3>
          <p className="text-sm text-gray-600">
            {getCachedCountry() || "No cacheado"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Última Detección:</h3>
          <p className="text-sm text-gray-600">{getLastDetectionTime()}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Traducción de Prueba:</h3>
          <p className="text-sm text-gray-600">{t("getStarted")}</p>
        </div>

        {apiResponse && (
          <div>
            <h3 className="font-semibold mb-2">Respuesta de API:</h3>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-32">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}

        <div className="pt-4 space-y-2">
          <Button
            onClick={clearStorageAndRedetect}
            variant="outline"
            className="w-full"
          >
            Limpiar Cache y Redetectar País
          </Button>

          <Button
            onClick={testApiDirectly}
            variant="outline"
            className="w-full"
            disabled={testingApi}
          >
            {testingApi ? "Probando API..." : "Probar API Directamente"}
          </Button>

          <Button onClick={logCacheInfo} variant="outline" className="w-full">
            Log Cache Info (Console)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
