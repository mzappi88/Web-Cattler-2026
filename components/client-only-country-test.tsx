"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Importar el componente dinámicamente para evitar problemas de hidratación
const CountryDetectionTest = dynamic(
  () =>
    import("@/components/country-detection-test").then((mod) => ({
      default: mod.CountryDetectionTest,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    ),
  }
);

export function ClientOnlyCountryTest() {
  return <CountryDetectionTest />;
}
