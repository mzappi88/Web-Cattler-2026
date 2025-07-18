"use client";

import { useMemo } from "react";
import { usePricingTranslation } from "./use-pricing-translation";

// Video configurations for different countries/languages
const videoConfigs = {
  // English videos (US, CA, OT$EN)
  EN: {
    feeding: "https://video.wixstatic.com/video/93f7fc_449a9d335f4546d18ac6336ec5755d9a/720p/mp4/file.mp4",
    cattleManagement: "https://video.wixstatic.com/video/93f7fc_50076f9ae9784c11a97b4000e3d06e00/480p/mp4/file.mp4",
    animalHealth: "https://video.wixstatic.com/video/93f7fc_3abf23fd19d044e195dfa84a7eca55bf/1080p/mp4/file.mp4",
    accountManagement: "https://video.wixstatic.com/video/93f7fc_42cd75cbe9cf4230af581a1821c51623/720p/mp4/file.mp4",
    advancedFeeding: "https://video.wixstatic.com/video/93f7fc_ffa986ce4ad44915b28719917029acee/1080p/mp4/file.mp4",
  },
  // Spanish videos (AR, UY, BO, PY, MX, OT$ES)
  ES: {
    feeding: "/Features-ES/feeding.mp4",
    cattleManagement: "/Features-ES/cattle-management.mov",
    animalHealth: "/Features-ES/animal-health.mov",
    accountManagement: "/Features-ES/account-management.mov",
    advancedFeeding: "/Features-ES/advanced-feeding.mov",
  },
  // Portuguese videos (BR)
  PT: {
    feeding: "/Features-PT/feeding.mp4",
    cattleManagement: "/Features-PT/cattle-management.mov",
    animalHealth: "/Features-PT/animal-health.mov",
    accountManagement: "/Features-PT/account-management.mov",
    advancedFeeding: "/Features-PT/advanced-feeding.mov",
  },
};

// Country to language mapping
const countryToLanguage: Record<string, "EN" | "ES" | "PT"> = {
  US: "EN",
  CA: "EN",
  "OT$EN": "EN",
  AR: "ES",
  UY: "ES",
  BO: "ES",
  PY: "ES",
  MX: "ES",
  "OT$ES": "ES",
  BR: "PT",
};

export function useFeatureVideos() {
  const { selectedCountry } = usePricingTranslation();

  const videos = useMemo(() => {
    const language = countryToLanguage[selectedCountry] || "EN";
    const config = videoConfigs[language];
    
    // Use fallback to English videos only if the specific video doesn't exist
    const fallbackConfig = videoConfigs.EN;
    
    return {
      feeding: config.feeding,
      cattleManagement: config.cattleManagement,
      animalHealth: config.animalHealth,
      accountManagement: config.accountManagement,
      advancedFeeding: config.advancedFeeding,
    };
  }, [selectedCountry]);

  return videos;
} 