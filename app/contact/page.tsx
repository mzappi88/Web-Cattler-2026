"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";

export default function ContactPage() {
  const { language } = useTranslation();
  const [formLoaded, setFormLoaded] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    // Clean up any existing forms
    const existingContainer = document.getElementById("hubspot-form-container");
    if (existingContainer) {
      existingContainer.innerHTML = "";
    }

    // Load HubSpot script v2
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.async = true;

    script.onload = () => {
      console.log("🌍 HubSpot script loaded successfully");
      createForm();
    };

    script.onerror = () => {
      console.error("🌍 Failed to load HubSpot script");
      setFormError("Failed to load form. Please refresh the page.");
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector(
        'script[src="//js.hsforms.net/forms/embed/v2.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [language]);

  const createForm = () => {
    if (typeof window !== "undefined" && window.hbspt) {
      try {
        const formId = getFormId();
        const portalId = "21027761";
        const region = "na1";

        console.log("🌍 Creating HubSpot form with:", {
          formId,
          portalId,
          region,
          language,
        });

        window.hbspt.forms.create({
          region: region,
          portalId: portalId,
          formId: formId,
          target: "#hubspot-form-container",
          onFormReady: () => {
            console.log("🌍 HubSpot form ready");
            setFormLoaded(true);
            setFormError(null);
          },
          onFormSubmitted: () => {
            console.log("🌍 HubSpot form submitted");
          },
          onFormError: (error: any) => {
            console.error("🌍 HubSpot form error:", error);
            setFormError("Error loading form. Please try again.");
          },
        });
      } catch (error) {
        console.error("🌍 Error creating HubSpot form:", error);
        setFormError("Error creating form. Please refresh the page.");
      }
    } else {
      console.error("🌍 HubSpot not available");
      setFormError("Form service not available. Please refresh the page.");
    }
  };

  const getFormId = () => {
    switch (language) {
      case "es":
      case "es-ar":
        return "65c56081-d955-46aa-a840-9b2438f179f6";
      case "pt":
        return "32ef2806-0a0e-4cd6-a698-a307f17090c4";
      default:
        return "8598e85d-76de-475b-9e59-1635a82df6c6";
    }
  };

  const getPageTitle = () => {
    switch (language) {
      case "es":
      case "es-ar":
        return "Contáctanos";
      case "pt":
        return "Contate-nos";
      default:
        return "Contact Us";
    }
  };

  const getPageSubtitle = () => {
    switch (language) {
      case "es":
      case "es-ar":
        return "Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo pronto.";
      case "pt":
        return "Estamos aqui para ajudá-lo. Preencha o formulário e entraremos em contato em breve.";
      default:
        return "We're here to help. Fill out the form and we'll get back to you soon.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#499E80] to-[#15B674]">
      {/* Header Section */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/Cattler-black.png"
                alt="Cattler"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {getPageTitle()}
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {getPageSubtitle()}
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-[#121334] mb-6">
                      {language === "es" ||
                      language === "es-ar" ||
                      language === "pt"
                        ? "Información de Contacto"
                        : "Contact Information"}
                    </h2>

                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#15B674] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#121334] mb-1">
                            {language === "es" ||
                            language === "es-ar" ||
                            language === "pt"
                              ? "Dirección"
                              : "Address"}
                          </h3>
                          <p className="text-gray-600">
                            {language === "es-ar"
                              ? "Delgado 377 2o B, CABA - 1428"
                              : "2125 Transformation Drive, Suite 1000, Lincoln, NE 68508"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#f25f24] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#121334] mb-1">
                            {language === "es" ||
                            language === "es-ar" ||
                            language === "pt"
                              ? "Teléfono"
                              : "Phone"}
                          </h3>
                          <p className="text-gray-600">
                            {language === "es" ||
                            language === "es-ar" ||
                            language === "pt"
                              ? "+54 11 5929 5601"
                              : "(531) 234-5882"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#8B5CF6] rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#121334] mb-1">
                            {language === "es" ||
                            language === "es-ar" ||
                            language === "pt"
                              ? "Email"
                              : "Email"}
                          </h3>
                          <p className="text-gray-600">
                            {language === "es" ||
                            language === "es-ar" ||
                            language === "pt"
                              ? "ventas@cattler.farm"
                              : "support@cattler.farm"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-[#121334] mb-3">
                      {language === "es" ||
                      language === "es-ar" ||
                      language === "pt"
                        ? "¿Por qué elegir Cattler?"
                        : "Why Choose Cattler?"}
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#15B674] rounded-full mr-3"></span>
                        {language === "es" ||
                        language === "es-ar" ||
                        language === "pt"
                          ? "Soporte especializado 24/7"
                          : "24/7 Specialized Support"}
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#15B674] rounded-full mr-3"></span>
                        {language === "es" ||
                        language === "es-ar" ||
                        language === "pt"
                          ? "Implementación en 24 horas"
                          : "24-hour Implementation"}
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#15B674] rounded-full mr-3"></span>
                        {language === "es" ||
                        language === "es-ar" ||
                        language === "pt"
                          ? "Actualizaciones automáticas"
                          : "Automatic Updates"}
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-[#15B674] rounded-full mr-3"></span>
                        {language === "es" ||
                        language === "es-ar" ||
                        language === "pt"
                          ? "Integración de sistemas"
                          : "System Integration"}
                      </li>
                    </ul>
                  </div>
                </div>

                {/* HubSpot Form */}
                <div className="lg:pl-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-[#121334] mb-6">
                      {language === "es" ||
                      language === "es-ar" ||
                      language === "pt"
                        ? "Envíanos un mensaje"
                        : "Send us a message"}
                    </h2>

                    {formError ? (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-600 text-sm">{formError}</p>
                        <button
                          onClick={() => window.location.reload()}
                          className="mt-2 text-red-600 underline text-sm hover:text-red-800"
                        >
                          Refresh page
                        </button>
                      </div>
                    ) : !formLoaded ? (
                      <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#15B674] mx-auto mb-4"></div>
                          <p className="text-gray-500 text-sm">
                            {language === "es" ||
                            language === "es-ar" ||
                            language === "pt"
                              ? "Cargando formulario..."
                              : "Loading form..."}
                          </p>
                        </div>
                      </div>
                    ) : null}

                    <div
                      id="hubspot-form-container"
                      className="min-h-[400px]"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
