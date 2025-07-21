"use client";

import { useTranslation } from "@/hooks/use-translation";

import type { Country } from "@/hooks/use-translation";

export interface PartnerLogo {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
  countries: Country[];
  category?: string;
}

import { allPartnerLogos } from "@/data/partner-logos";

const allPartners: PartnerLogo[] = allPartnerLogos;

export function usePartnerLogos(): PartnerLogo[] {
  const { selectedCountry } = useTranslation();

  return allPartners.filter((p) => p.countries.includes(selectedCountry));
}
