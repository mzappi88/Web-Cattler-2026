"use client";

import { useCountryDetection } from "@/hooks/use-country-detection";
import { useTranslation } from "@/hooks/use-translation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CountryDetectionTest() {
  const { detectedCountry, isDetecting } = useCountryDetection();
  const { selectedCountry, language, t, setSelectedCountry } = useTranslation();

  const clearStorageAndRedetect = () => {
    localStorage.removeItem("cattler-country");
    localStorage.removeItem("cattler-country-detected");
    window.location.reload();
  };

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
          <h3 className="font-semibold mb-2">Traducción de Prueba:</h3>
          <p className="text-sm text-gray-600">{t("getStarted")}</p>
        </div>

        <div className="pt-4">
          <Button
            onClick={clearStorageAndRedetect}
            variant="outline"
            className="w-full"
          >
            Limpiar Storage y Redetectar País
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
