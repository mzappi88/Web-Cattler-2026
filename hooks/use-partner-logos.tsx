"use client";

import { useTranslation } from "@/hooks/TranslationProvider";

export interface PartnerLogo {
  id: string;
  name: string;
  logoUrl: string;
  countries: string[];
  category?: string;
}

const allPartners: PartnerLogo[] = [
  {
    id: "elanco",
    name: "Elanco Animal Health",
    logoUrl: "elanco.png",
    countries: ["US", "AR"],
  },
  {
    id: "fbn",
    name: "Farmers Business Network",
    logoUrl: "FBN.png",
    countries: ["US"],
  },
  {
    id: "topDollar",
    name: "Top Dollar Angus",
    logoUrl: "TOP DOLLAR ANGUS.png",
    countries: ["US", "BR"],
  },
  {
    id: "countryside",
    name: "Countryside Feed",
    logoUrl: "Countryside-Feed.png",
    countries: ["US"],
  },
  {
    id: "e",
    name: "Elanco Animal Health",
    logoUrl: "elanco.png",
    countries: ["US", "AR"],
  },
  {
    id: "f",
    name: "Farmers Business Network",
    logoUrl: "FBN.png",
    countries: ["US"],
  },
  {
    id: "b",
    name: "Top Dollar Angus",
    logoUrl: "TOP DOLLAR ANGUS.png",
    countries: ["US", "BR"],
  },
  {
    id: "countryside2",
    name: "Countryside Feed",
    logoUrl: "Countryside-Feed.png",
    countries: ["US"],
  },
];

export function usePartnerLogos(): PartnerLogo[] {
  const { selectedCountry } = useTranslation();
  return allPartners.filter((p) => p.countries.includes(selectedCountry));
}
