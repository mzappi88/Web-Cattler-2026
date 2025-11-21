"use client";

import type React from "react";

import { useEffect, useState } from "react";
import Script from "next/script";
import { ClipboardList, TrendingUp, Activity, DollarSign } from "lucide-react";
import { useTranslation, getDemoUrl } from "@/hooks/use-translation";
import { CountrySelector } from "./country-selector";
import { useRouter } from "next/navigation";
import VideoCtaSection from "@/components/video-cta-section";
import VideoPopup from "@/components/video-popup";
import EnhancedCtaSection from "./enhanced-cta-section";

export default function CattlerLandingSale() {
  const { selectedCountry, setSelectedCountry, language, t } = useTranslation();
  const [isWixIframe, setIsWixIframe] = useState(false);
  const [isWixMobile, setIsWixMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);

  useEffect(() => {
    // Detect if we're in a Wix iframe
    const isInIframe = window !== window.top;
    const isWix =
      window.location.hostname.includes("wix") ||
      window.location.hostname.includes("wixsite") ||
      document.referrer.includes("wix");
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    setIsWixIframe(isInIframe && isWix);
    setIsWixMobile(isInIframe && isWix && mobile);

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
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
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
    console.log("🔍 Form Debug:", { scriptLoaded, formLoaded, submitted });

    const createForm = () => {
      if (typeof window.hbspt !== "undefined") {
        // Determine which form to use based on language and country
        let formId = "ea412564-b4e0-4514-8d3a-2f1117acd27f"; // Default form

        if (language === "en") {
          switch (selectedCountry) {
            case "CA":
              formId = "36487514-58d0-497a-afec-65dbd0be2875";
              break;
            case "US":
              formId = "503c575b-28c0-44f3-9272-0fdcb0ff5e05";
              break;
            default:
              formId = "ea412564-b4e0-4514-8d3a-2f1117acd27f";
          }
        } else if (language === "pt") {
          // Portuguese forms (Brazil)
          formId = "bff83772-d203-45df-9702-11a9d6e748da";
        } else if (language === "es" || language === "es-ar") {
          // Spanish forms based on country
          switch (selectedCountry) {
            case "AR":
              formId = "8d18975e-6eeb-4cdc-8d15-5035c15eb05b";
              break;
            case "UY":
              formId = "2819f746-41bd-434a-9788-36ac763f137c";
              break;
            case "PY":
              formId = "052428bd-5926-422a-83e4-4d621969eb57";
              break;
            case "BO":
              formId = "99ed3c56-c96b-4af5-92c1-bc0462e67afd";
              break;
            case "CH":
              formId = "458e2f99-595b-4fba-98ac-c75571a90e89";
              break;
            case "MX":
              formId = "372755d3-04bd-47bb-8eda-c279f4a7ce4c";
              break;
            default:
              // For other Spanish-speaking countries (not AR, PY, UY, BO, CH, MX)
              formId = "ea595d2e-dbf9-45a7-b3f1-66bc40fd00cc";
              break;
          }
        }

        console.log(
          `Creating HubSpot form for ${language}/${selectedCountry} with formId: ${formId}`
        );

        try {
          window.hbspt.forms.create({
            portalId: "21027761",
            formId: formId,
            target: "#hubspot-form-container",
            region: "na1",
            onFormReady: () => {
              console.log("✅ Form ready");
              setFormLoaded(true);
            },
            onFormSubmitted: () => {
              console.log("✅ Form submitted");
              setSubmitted(true);
            },
          });
        } catch (error) {
          console.error("❌ Error creating HubSpot form:", error);
        }
      }
    };

    if (scriptLoaded) {
      // Try to create form immediately
      createForm();

      // If not successful, try again after a delay
      const timeoutId = setTimeout(() => {
        if (!formLoaded) {
          console.log("🔄 Retrying form creation...");
          createForm();
        }
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [scriptLoaded, language, selectedCountry, formLoaded]);

  const FeatureCard = ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start space-x-3 md:space-x-4">
        <div className="flex-shrink-0 bg-[#15B674] bg-opacity-10 p-2 md:p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-[#121334] text-sm md:text-base mb-1 md:mb-2">
            {title}
          </h3>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  // Función para determinar qué banner mostrar según el país
  const getBannerImage = () => {
    const latamCountries = ["AR", "BO", "PY", "UY", "CH", "MX"];
    const spanishLanguage = ["OT$ES"];

    if (
      latamCountries.includes(selectedCountry) ||
      spanishLanguage.includes(selectedCountry)
    ) {
      return {
        src: isMobile
          ? "/sale/sale-banner-latam-mobile.png"
          : "/Sale/sale-banner-latam.png",
        alt: "Promoción de Primavera",
      };
    }

    return {
      src: isMobile
        ? "/sale/sale-banner-us-mobile.png"
        : "/Sale/sale-banner-us.png",
      alt: "Labor Day Sale",
    };
  };

  const bannerImage = getBannerImage();

  return (
    <div className="bg-[#499E80]">
      {/* Hero Section with Image */}
      <div className="relative w-full bg-[#121334]">
        {/* Mobile Hero - Full height like home */}
        <div className="relative w-full h-[50vh] md:hidden flex items-center justify-center bg-[#121334]">
          <img
            src={bannerImage.src}
            alt={bannerImage.alt}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Desktop Hero - Same aspect ratio as home */}
        <div
          className="relative w-full hidden md:block"
          style={{
            paddingBottom:
              "42.19%" /* 16:9 aspect ratio reducido 25% desde 56.25% */,
          }}
        >
          <img
            src={bannerImage.src}
            alt={bannerImage.alt}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Title and Subtitle Section */}
      <div className="py-4 md:py-8">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center my-3 md:my-5 leading-tight pt-4 md:pt-8">
            {t("mainTitleWithCattler")}
          </h1>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto py-2 md:py-4 px-4 md:px-9">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="text-center mb-4 md:mb-6">
              <p className="text-lg md:text-xl lg:text-[25px] text-white mb-1 md:mb-2">
                {t("mainSubtitle")}
              </p>
              <p className="text-lg md:text-xl lg:text-[25px] text-white/90">
                {t("mainSubtitleLine2")}
              </p>
            </div>

            {/* Features and Form Section */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-6 md:mt-10 mb-10">
              {/* Left side - Features */}
              <div className="lg:w-1/2 order-1 lg:order-1 mt-8 lg:mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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

              {/* Right side - Form */}
              <div className="lg:w-1/2 order-2 lg:order-2">
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg max-w-md mx-auto lg:mx-0 sticky top-4">
                  {!submitted ? (
                    <>
                      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#121334] mb-4 text-center">
                        {t("formTitle")}
                      </h2>
                      <p className="text-base md:text-lg text-[#121334] mb-6 text-center">
                        {t("formSubtitleLanding")}
                      </p>
                      {!formLoaded && (
                        <div className="flex items-center justify-center h-32">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#121334]"></div>
                        </div>
                      )}
                      <div
                        id="hubspot-form-container"
                        className={formLoaded ? "block" : "hidden"}
                      ></div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <h2 className="text-xl md:text-2xl font-semibold text-[#121334] mb-4">
                        {t("thankYou")}
                      </h2>
                      <p className="text-sm md:text-base text-[#121334]">
                        {t("thankYouLanding")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacing before Video CTA Section */}
      <div className="py-8 md:py-0"></div>

      {/* Video CTA Section */}
      <VideoCtaSection />

      {/* Spacing before Enhanced CTA Section */}
      <div className="py-16 md:py-16"></div>

      {/* Enhanced CTA Section */}
      <EnhancedCtaSection />

      {/* Video Popup */}
      <VideoPopup
        isOpen={isVideoPopupOpen}
        onClose={() => setIsVideoPopupOpen(false)}
      />

      <Script
        src="//js.hsforms.net/forms/embed/v2.js"
        onLoad={() => setScriptLoaded(true)}
      />
    </div>
  );
}
