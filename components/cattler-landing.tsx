"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ClipboardList, TrendingUp, Activity, DollarSign } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { CountrySelector } from "./country-selector";
import { useRouter } from "next/navigation";

export type Version = "landing" | "ads-a" | "ads-b";

export default function CattlerLanding() {
  const { selectedCountry, setSelectedCountry, language, t } = useTranslation();
  const [version, setVersion] = useState<Version>("landing");
  const [isWixIframe, setIsWixIframe] = useState(false);
  const [isWixMobile, setIsWixMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ver = params.get("ver") as Version | null;
    setVersion(ver || "landing");

    // Detect if we're in a Wix iframe
    const isInIframe = window !== window.top;
    const isWix =
      window.location.hostname.includes("wix") ||
      window.location.hostname.includes("wixsite") ||
      document.referrer.includes("wix");
    const isMobile = window.innerWidth <= 768;
    setIsWixIframe(isInIframe && isWix);
    setIsWixMobile(isInIframe && isWix && isMobile);

    // Debug information
    console.log("🌐 Debug Info:", {
      isInIframe,
      isWix,
      isWixIframe: isInIframe && isWix,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      documentHeight: document.documentElement.scrollHeight,
      userAgent: navigator.userAgent,
      hostname: window.location.hostname,
      referrer: document.referrer,
      isMobile: window.innerWidth <= 768,
      isWixMobile: isInIframe && isWix && window.innerWidth <= 768,
    });

    // Mostrar información de país en la consola
    console.log("🌍 País detectado:", selectedCountry);
    console.log("🌍 Idioma del navegador:", navigator.language);
    console.log(
      "🌍 Zona horaria:",
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
  }, []);

  // Monitor dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDebugDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);
  const [debugDimensions, setDebugDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (scriptLoaded && typeof window.hbspt !== "undefined") {
      window.hbspt.forms.create({
        portalId: "21027761",
        formId:
          version == "ads-a"
            ? "36487514-58d0-497a-afec-65dbd0be2875"
            : version == "ads-b"
            ? "307e5904-2059-4a40-8f24-fd1a8c3e98e8"
            : "302022b8-67fb-454c-86bf-d6f4b449f4e0",
        target: "#hubspot-form-container",
        region: "na1",
      });
    }
  }, [scriptLoaded, version]);

  return (
    <div
      className="bg-gradient-to-b from-[#f0f1f7] to-[#d1d3e2] flex flex-col items-center justify-center px-0"
      style={{
        minHeight: isWixMobile ? "auto" : isWixIframe ? "800px" : "100vh",
        maxHeight: isWixMobile ? "none" : isWixIframe ? "800px" : "100vh",
        height: isWixMobile ? "auto" : isWixIframe ? "800px" : "100vh",
        overflow: isWixMobile ? "visible" : "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        transform: isWixMobile ? "none" : isWixIframe ? "scale(1)" : "none",
        transformOrigin: "top left",
        boxSizing: "border-box",
        flexShrink: isWixMobile ? "0" : isWixIframe ? "0" : "1",
        flexGrow: isWixMobile ? "0" : isWixIframe ? "0" : "1",
      }}
    >
      {/* Country Selector - Hidden for production, only available in debug */}
      {/* <div className="fixed top-4 right-4 z-50">
        <CountrySelector
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
        />
      </div> */}

      {/* Hero Video Section */}
      <div
        className="relative w-full bg-black"
        style={{
          height: isWixMobile ? "30vh" : isWixIframe ? "180px" : "30vh",
          maxHeight: isWixMobile ? "30vh" : isWixIframe ? "180px" : "30vh",
          minHeight: isWixMobile ? "180px" : isWixIframe ? "180px" : "180px",
          position: "relative",
          overflow: "hidden",
          transform: isWixMobile ? "none" : isWixIframe ? "scale(1)" : "none",
          transformOrigin: "top left",
          flexShrink: isWixMobile ? "0" : isWixIframe ? "0" : "1",
          flexGrow: isWixMobile ? "0" : isWixIframe ? "0" : "1",
          boxSizing: "border-box",
        }}
      >
        {/* Mobile Video - Limited height */}
        <div
          className="relative w-full h-full md:hidden overflow-hidden bg-black"
          style={{
            height: "100%",
            maxHeight: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <video
            className="absolute top-0 left-0 w-full h-full"
            autoPlay
            loop
            muted
            playsInline
            style={{
              objectFit: isWixMobile
                ? "cover"
                : isWixIframe
                ? "cover"
                : "contain",
              objectPosition: "center",
              maxWidth: "100%",
              maxHeight: "100%",
              width: "100%",
              height: "100%",
              transform: isWixMobile
                ? "scale(1)"
                : isWixIframe
                ? "scale(1)"
                : "scale(1)",
              transformOrigin: "center center",
              minHeight: "auto",
              minWidth: "auto",
              aspectRatio: "16/9",
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              zIndex: "1",
            }}
          >
            <source
              src="https://video.wixstatic.com/video/93f7fc_55b18a9715124be680e597e4a30bc548/720p/mp4/file.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Banner */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="mb-4 md:mb-6">
                <img
                  src="/Cattler-black.png"
                  alt="Cattler"
                  className="h-16 md:h-24 lg:h-32 w-auto brightness-0 invert mx-auto"
                />
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-8 drop-shadow-lg">
                {t("heroTitle")}
              </h2>
            </div>
          </div>
        </div>

        {/* Desktop Video */}
        <div
          className="relative w-full hidden md:block overflow-hidden bg-black"
          style={{
            paddingBottom:
              "42.19%" /* 16:9 aspect ratio reducido 25% desde 56.25% */,
          }}
        >
          <video
            className="absolute top-0 left-0 w-full h-full"
            autoPlay
            loop
            muted
            playsInline
            style={{
              objectFit: "scale-down",
              objectPosition: "center",
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
            }}
          >
            <source
              src="https://video.wixstatic.com/video/93f7fc_55b18a9715124be680e597e4a30bc548/720p/mp4/file.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Overlay Banner */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="mb-4 md:mb-6">
                <img
                  src="/Cattler-black.png"
                  alt="Cattler"
                  className="h-8 md:h-12 lg:h-16 w-auto brightness-0 invert mx-auto"
                />
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-8 drop-shadow-lg">
                {t("heroTitle")}
              </h2>
            </div>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button
            className="bg-[#f25f24] hover:bg-[#d14d1a] text-white font-bold py-2 px-4 md:py-4 md:px-8 rounded-full text-sm md:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            onClick={() => {
              const cattlerUrl = "https://www.cattler.com.ar/demo";
              if (window.parent && window.parent !== window) {
                window.parent.location.href = cattlerUrl;
              } else {
                window.location.href = cattlerUrl;
              }
            }}
          >
            {t("getStarted")}
          </button>
        </div>
      </div>

      <div
        className="container mx-auto px-4 py-2 md:py-4 flex flex-col items-center justify-center"
        style={{
          flex: isWixMobile ? "1" : isWixIframe ? "1" : "1",
          overflow: isWixMobile ? "visible" : "auto",
          maxHeight: isWixMobile
            ? "none"
            : isWixIframe
            ? "calc(800px - 180px)"
            : "calc(100vh - 30vh)",
          minHeight: isWixMobile ? "auto" : isWixIframe ? "620px" : "auto",
          flexShrink: isWixMobile ? "0" : isWixIframe ? "1" : "1",
          flexGrow: isWixMobile ? "0" : isWixIframe ? "1" : "1",
        }}
      >
        <h1 className="text-2xl md:text-4xl font-bold text-[#121334] text-center my-3 md:my-5">
          {t("mainTitle")}
        </h1>
      </div>
      <div className="container mx-auto py-2 md:py-4 px-4 md:px-9">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-12">
          <div className="md:w-1/2 flex-1">
            <p className="text-lg md:text-xl lg:text-[25px] text-[#121334] mb-4 md:mb-6 text-center">
              {t("mainSubtitle")}
            </p>
            <div className="flex-1 items-center justify-center mt-6 md:mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <FeatureCard
                  icon={
                    <ClipboardList className="w-6 h-6 md:w-8 md:h-8 text-[#121334]" />
                  }
                  title={t("endPaperwork")}
                  description={t("endPaperworkDesc")}
                />
                <FeatureCard
                  icon={
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-[#121334]" />
                  }
                  title={t("boostProductivity")}
                  description={t("boostProductivityDesc")}
                />
                <FeatureCard
                  icon={
                    <Activity className="w-6 h-6 md:w-8 md:h-8 text-[#121334]" />
                  }
                  title={t("preventHealth")}
                  description={t("preventHealthDesc")}
                />
                <FeatureCard
                  icon={
                    <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-[#121334]" />
                  }
                  title={t("maximizeProfits")}
                  description={t("maximizeProfitsDesc")}
                />
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg max-w-xl mx-auto">
              {!submitted ? (
                <>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#121334] mb-3 md:mb-4 text-center">
                    {t("formTitle")}
                  </h2>
                  <p className="text-base md:text-lg lg:text-xl text-[#121334] mb-4 md:mb-6">
                    {version != "landing"
                      ? t("formSubtitleAds")
                      : t("formSubtitleLanding")}
                  </p>
                  {!formLoaded && (
                    <div className="flex items-center justify-center h-24 md:h-30">
                      <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-[#121334]"></div>
                    </div>
                  )}
                  <div id="hubspot-form-container"></div>
                </>
              ) : (
                <div className="text-center py-6 md:py-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-[#121334] mb-3 md:mb-4">
                    {t("thankYou")}
                  </h2>
                  <p className="text-sm md:text-base text-[#121334]">
                    {version == "landing"
                      ? t("thankYouLanding")
                      : t("thankYouAds")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Script
        src="//js.hsforms.net/forms/embed/v2.js"
        onLoad={() => setScriptLoaded(true)}
      />

      {/* Debug Banner - Temporal para verificar país */}
      <div className="fixed top-4 left-4 z-50 bg-blue-500 text-white px-3 py-1 rounded text-sm">
        País: {selectedCountry} | Cache:{" "}
        {typeof window !== "undefined"
          ? localStorage.getItem("cattler-country")
          : "N/A"}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-3 md:mb-4">
        {icon}
        <h3 className="text-base md:text-lg font-semibold text-[#121334] ml-2 md:ml-3">
          {title}
        </h3>
      </div>
      <p className="text-sm md:text-base text-[#121334] leading-relaxed">
        {description}
      </p>
    </div>
  );
}
