"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useTranslation } from "@/hooks/use-translation";
import { CountrySelector } from "./country-selector";
import ThankYouContent from "./thank-you-content";

export default function DemoPage() {
  const { selectedCountry, setSelectedCountry, language, t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [formLoaded, setFormLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration and mobile detection
  useEffect(() => {
    setIsHydrated(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // HubSpot form logic
  useEffect(() => {
    // Don't proceed if script is not loaded
    if (!scriptLoaded) {
      return;
    }

    // Reset form loaded state when language or country changes
    setFormLoaded(false);

    // Clean up any existing form
    const container = document.getElementById("hubspot-form-container");
    if (container) {
      container.innerHTML = "";
    }

    // Wait for hbspt to be available (should be quick with preconnect)
    const createForm = () => {
      if (typeof window === "undefined" || typeof window.hbspt === "undefined") {
        // Retry after a short delay if API not ready
        setTimeout(createForm, 50);
        return;
      }

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
        formId = "bff83772-d203-45df-9702-11a9d6e748da";
      } else if (language === "es" || language === "es-ar") {
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
            formId = "ea595d2e-dbf9-45a7-b3f1-66bc40fd00cc";
            break;
        }
      }

      console.log("📝 Creating HubSpot form:", { formId, language, selectedCountry });

      try {
        window.hbspt.forms.create({
          portalId: "21027761",
          formId: formId,
          target: "#hubspot-form-container",
          region: "na1",
          onFormReady: () => {
            console.log("✅ HubSpot form ready");
            setFormLoaded(true);
          },
          onFormSubmitted: () => {
            console.log("✅ HubSpot form submitted");
            setSubmitted(true);
          },
          onFormError: (error: any) => {
            console.error("❌ HubSpot form error:", error);
            setFormLoaded(false);
          },
        });
      } catch (error) {
        console.error("❌ Error creating HubSpot form:", error);
        setFormLoaded(false);
      }
    };

    // Start creating form immediately
    createForm();
  }, [scriptLoaded, language, selectedCountry]);

  // Show loading state until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/demo-backgrounds/bunkscore.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Country Selector */}
        <div className="flex justify-center pt-8 pb-4">
          <CountrySelector
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-6xl">
            {isMobile ? (
              /* Mobile Layout */
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-lg shadow-xl p-8">
                  {!submitted ? (
                    <>
                      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
                        {t("formTitle")}
                      </h1>
                      <p className="text-lg text-gray-600 text-center mb-6">
                        {t("formSubtitleLanding")}
                      </p>
                      {!formLoaded && (
                        <div className="flex justify-center h-32">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                        </div>
                      )}
                      <div
                        id="hubspot-form-container"
                        className={formLoaded ? "block" : "hidden"}
                      ></div>
                    </>
                  ) : (
                    <ThankYouContent />
                  )}
                </div>
              </div>
            ) : (
              /* Desktop Layout */
              <div className="relative">
                {/* Placa translúcida grande que cubre todo */}
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg"></div>

                <div className="relative grid grid-cols-5 gap-8 items-center p-8">
                  {/* Form - Left side (40%) */}
                  <div className="col-span-2">
                    <div className="bg-white rounded-lg shadow-xl p-8">
                      {!submitted ? (
                        <>
                          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                            {t("formTitle")}
                          </h2>
                          <p className="text-lg text-gray-600 text-center mb-6">
                            {t("formSubtitleLanding")}
                          </p>
                          {!formLoaded && (
                            <div className="flex justify-center h-32">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                            </div>
                          )}
                          <div
                            id="hubspot-form-container"
                            className={formLoaded ? "block" : "hidden"}
                          ></div>
                        </>
                      ) : (
                        <ThankYouContent />
                      )}
                    </div>
                  </div>

                  {/* Text - Right side (60%) */}
                  <div className="col-span-3">
                    <div className="text-white ml-20 p-6">
                      <h1 className="text-5xl font-bold text-green-600 leading-tight mb-6">
                        Start Your Free Demo
                      </h1>
                      <p className="text-2xl text-green-500 font-medium mb-8">
                        No Credit Card Necessary
                      </p>
                      <div className="space-y-4 text-lg text-gray-100">
                        <p>• See how Cattler can transform your operation</p>
                        <p>• Get started with a personalized demo</p>
                        <p>• Join thousands of successful cattlemen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HubSpot Script - Load early with afterInteractive strategy */}
      <Script
        src="//js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ HubSpot script loaded");
          setScriptLoaded(true);
        }}
        onError={(e) => {
          console.error("❌ Error loading HubSpot script:", e);
        }}
      />

      {/* HubSpot Form Styles */}
      <style jsx global>{`
        .hs-form {
          background: white !important;
          color: #374151 !important;
        }
        .hs-form fieldset {
          background: white !important;
        }
        .hs-form .hs-form-field {
          color: #374151 !important;
        }
        .hs-form .hs-form-field label {
          color: #374151 !important;
          font-weight: 600 !important;
        }
        .hs-form .hs-form-field input,
        .hs-form .hs-form-field select,
        .hs-form .hs-form-field textarea {
          color: #374151 !important;
          background: white !important;
          border: 1px solid #d1d5db !important;
        }
        .hs-form .hs-button {
          background: #f97316 !important;
          color: white !important;
          border: none !important;
          padding: 12px 24px !important;
          font-weight: 600 !important;
          width: 100% !important;
        }
        .hs-form .hs-button:hover {
          background: #ea580c !important;
        }
      `}</style>
    </div>
  );
}
