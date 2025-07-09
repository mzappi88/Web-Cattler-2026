"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

// Tipos y mapeo de idioma por país
export type Country =
  | "US"
  | "CA"
  | "AR"
  | "PY"
  | "UY"
  | "BO"
  | "BR"
  | "MX"
  | "OT";
type Language = "en" | "es" | "pt" | "es-ar";

const countryLanguageMap: Record<Country, Language> = {
  US: "en",
  CA: "en",
  AR: "es",
  PY: "es-ar",
  UY: "es",
  BO: "es",
  BR: "pt",
  MX: "es",
  OT: "en",
};

interface TranslationContextType {
  selectedCountry: Country;
  language: Language;
  setselectedCountry: (c: Country) => void;
  isHydrated: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setselectedCountryState] = useState<Country>("US");
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("selectedCountry") as Country | null;
    if (saved) setselectedCountryState(saved);
    setIsHydrated(true);
  }, []);

  const setselectedCountry = (newCountry: Country) => {
    localStorage.setItem("selectedCountry", newCountry);
    setselectedCountryState(newCountry);
  };

  const language = countryLanguageMap[selectedCountry] || "en";

  return (
    <TranslationContext.Provider
      value={{ selectedCountry, language, setselectedCountry, isHydrated }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
