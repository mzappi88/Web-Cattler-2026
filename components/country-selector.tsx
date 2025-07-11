"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import type { Country } from "@/hooks/use-translation";

type Language = "en" | "es" | "pt" | "es-ar";
const countryOptions: Record<Country, { flag: string; language: string }> = {
  US: { flag: "🇺🇸", language: "en" },
  CA: { flag: "🇨🇦", language: "en" },
  AR: { flag: "🇦🇷", language: "es-ar" },
  PY: { flag: "🇵🇾", language: "es" },
  UY: { flag: "🇺🇾", language: "es" },
  BO: { flag: "🇧🇴", language: "es" },
  BR: { flag: "🇧🇷", language: "pt" },
  MX: { flag: "🇲🇽", language: "es" },
  "OT-EN": { flag: "🌍", language: "en" },
  "OT-ES": { flag: "🌍", language: "es" },
};

const langNames = {
  en: "English",
  es: "Español",
  pt: "Português",
  "es-ar": "Español",
};

interface CountrySelectorProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
}

export function CountrySelector({
  selectedCountry,
  onCountryChange,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const selected = countryOptions[selectedCountry];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors min-w-[70px] justify-center"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select country and language"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          <span className="text-sm">{selected.flag}</span>
        </span>
        <ChevronDown
          className={`w-3 h-3 text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto min-w-[120px]"
        >
          {Object.entries(countryOptions).map(([code, data]) => (
            <button
              key={code}
              onClick={() => {
                onCountryChange(code as Country);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                selectedCountry === code
                  ? "bg-green-50 text-green-700"
                  : "text-gray-700"
              }`}
            >
              <span className="text-sm">{data.flag}</span>
              <span className="text-sm font-medium">
                {langNames[data.language as Language]}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
