"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { usePartnerLogos } from "@/hooks/use-partner-logos";

export interface CarouselSettings {
  speed: "slow" | "normal" | "fast";
  direction: "left" | "right";
  pauseOnHover: boolean;
  showControls: boolean;
}

export default function LogoCarousel() {
  const { selectedCountry, isHydrated } = useTranslation();
  const logos = usePartnerLogos();
  const [isPlaying, setIsPlaying] = useState(true);

  const [settings, setSettings] = useState<CarouselSettings>({
    speed: "normal",
    direction: "left",
    pauseOnHover: true,
    showControls: true,
  });

  const carouselRef = useRef<HTMLDivElement>(null);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const changeDirection = () => {
    setSettings((prev) => ({
      ...prev,
      direction: prev.direction === "left" ? "right" : "left",
    }));
  };

  const changeSpeed = (speed: CarouselSettings["speed"]) => {
    setSettings((prev) => ({ ...prev, speed }));
  };

  const getAnimationClass = () => {
    const baseClass =
      settings.direction === "left"
        ? "animate-scroll-left"
        : "animate-scroll-right";
    const speedClass = `scroll-${settings.speed}`;
    return `${baseClass} ${speedClass}`;
  };

  const getCarouselStyle = () => {
    if (!isPlaying) {
      return { animationPlayState: "paused" as const };
    }
    return {};
  };

  const getLogoSize = (logoName: string) => {
    // Logos específicos que deben ser más grandes
    const largeLogos = ["Rumen", "Vetifarma", "Crealab"];

    if (
      largeLogos.some((name) =>
        logoName.toLowerCase().includes(name.toLowerCase())
      )
    ) {
      return "h-12 md:h-16 lg:h-20 w-auto max-w-[120px] md:max-w-[160px] lg:max-w-[200px]";
    }

    // Tamaño normal para el resto
    return "h-8 md:h-10 lg:h-12 w-auto max-w-[80px] md:max-w-[100px] lg:max-w-[120px]";
  };

  if (!isHydrated || logos.length === 0) {
    return (
      <div className="w-full py-8 md:py-12 bg-gray-50">
        <div className="animate-pulse">
          <div className="flex gap-4 md:gap-8 justify-center">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-12 md:h-16 w-24 md:w-32 bg-gray-200 rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 md:py-12 bg-gray-50 overflow-hidden">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className={`relative carousel-container ${
          settings.pauseOnHover ? "" : "no-hover-pause"
        }`}
      >
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 w-12 md:w-20 h-full carousel-fade-left z-10"></div>
        <div className="absolute right-0 top-0 w-12 md:w-20 h-full carousel-fade-right z-10"></div>

        {/* Carousel track */}
        <div
          className={`flex ${getAnimationClass()}`}
          style={getCarouselStyle()}
        >
          {logos.map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 mx-3 md:mx-6 lg:mx-8 flex items-center justify-center"
            >
              {logo.website ? (
                <a
                  href={logo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="logo-item group cursor-pointer block"
                >
                  <img
                    src={logo.logoUrl || "/placeholder.svg"}
                    alt={logo.name}
                    className={`${getLogoSize(logo.name)} object-contain`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=48&width=120&text=" +
                        encodeURIComponent(logo.name);
                    }}
                  />

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 md:px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
                    {logo.name}
                    {logo.category && (
                      <span className="ml-1 md:ml-2 px-1 py-0.5 bg-white/20 rounded text-xs">
                        {logo.category}
                      </span>
                    )}
                  </div>
                </a>
              ) : (
                <div className="logo-item group">
                  <img
                    src={logo.logoUrl || "/placeholder.svg"}
                    alt={logo.name}
                    className={`${getLogoSize(logo.name)} object-contain`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.svg?height=48&width=120&text=" +
                        encodeURIComponent(logo.name);
                    }}
                  />

                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 md:px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
                    {logo.name}
                    {logo.category && (
                      <span className="ml-1 md:ml-2 px-1 py-0.5 bg-white/20 rounded text-xs">
                        {logo.category}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
