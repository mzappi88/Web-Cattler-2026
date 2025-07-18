"use client";

import { useTranslation } from "@/hooks/TranslationProvider";

export interface PartnerLogo {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
  countries: string[];
  category?: string;
}

import { allPartnerLogos } from "@/data/partner-logos";

const allPartners: PartnerLogo[] = allPartnerLogos;

export function usePartnerLogos(): PartnerLogo[] {
  const { selectedCountry } = useTranslation();
  return allPartners.filter((p) => p.countries.includes(selectedCountry));
}
