"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import {
  getLogosForCountry,
  type PartnerLogo,
} from "@/hooks/use-partner-logos";

export default function LogoCarousel() {
  const { selectedCountry, isHydrated } = useTranslation();
  const [logos, setLogos] = useState<PartnerLogo[]>([]);

  useEffect(() => {
    if (isHydrated) {
      const countryLogos = getLogosForCountry(selectedCountry);
      // Duplicate logos for infinite scroll effect
      setLogos([...countryLogos, ...countryLogos, ...countryLogos]);
    }
  }, [selectedCountry, isHydrated]);

  if (!isHydrated || logos.length === 0) {
    return (
      <div className="w-full py-12 bg-gray-50">
        <div className="animate-pulse">
          <div className="flex gap-8 justify-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 w-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 mb-8"></div>

      <div className="relative">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

        {/* Carousel container */}
        <div className="flex animate-scroll-infinite">
          {logos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <div className="group cursor-pointer transition-all duration-300 hover:scale-110">
                <img
                  src={logo.logoUrl || "/placeholder.svg"}
                  alt={logo.name}
                  className="h-12 w-auto max-w-[120px] object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
