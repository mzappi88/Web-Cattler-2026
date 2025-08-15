"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";
import {
  useTranslation,
  getPricingUrl,
  getDemoUrl,
} from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";

export default function EnhancedCtaSection() {
  const { selectedCountry, t } = useTranslation();

  return (
    <div className="w-full bg-gradient-to-br from-[#121334] via-[#1a1a4a] to-[#121334] py-12 md:py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            {t("enhancedCtaTitle")}
          </h2>
          <p className="text-base md:text-xl text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("enhancedCtaSubtitle")}
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#15B674] to-[#12a066] rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Image
                  src="/cow.png"
                  alt="Cow"
                  width={48}
                  height={48}
                  className="w-8 h-8 md:w-12 md:h-12 brightness-0 invert"
                />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                {t("cattleHeadCount")}
              </div>
              <div className="text-sm md:text-base text-gray-300">
                {t("cattleHead")}
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#f25f24] to-[#d14d1a] rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Image
                  src="/tractor.png"
                  alt="Tractor"
                  width={48}
                  height={48}
                  className="w-8 h-8 md:w-12 md:h-12 brightness-0 invert"
                />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                {t("feedTonCount")}
              </div>
              <div className="text-sm md:text-base text-gray-300">
                {t("feedTon")}
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Clock className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                {t("timeSavedCount")}
              </div>
              <div className="text-sm md:text-base text-gray-300">
                {t("timeSaved")}
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-12 max-w-2xl mx-auto">
            <div className="flex items-center text-left">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#15B674] mr-2 md:mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base text-gray-300">
                {t("implementation24h")}
              </span>
            </div>
            <div className="flex items-center text-left">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#15B674] mr-2 md:mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base text-gray-300">
                {t("specializedSupport")}
              </span>
            </div>
            <div className="flex items-center text-left">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#15B674] mr-2 md:mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base text-gray-300">
                {t("automaticUpdates")}
              </span>
            </div>
            <div className="flex items-center text-left">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#15B674] mr-2 md:mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base text-gray-300">
                {t("systemIntegration")}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Button
              onClick={() => {
                const pricingUrl = getPricingUrl(selectedCountry);
                if (window.parent && window.parent !== window) {
                  window.parent.location.href = pricingUrl;
                } else {
                  window.location.href = pricingUrl;
                }
              }}
              className="bg-gradient-to-r from-[#15B674] to-[#12a066] hover:from-[#12a066] hover:to-[#0f8a56] text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full text-sm md:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl border-0 w-full sm:w-auto"
            >
              {t("explorePlansAndPrices")}
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>

            <Button
              onClick={() => {
                const cattlerUrl = getDemoUrl(selectedCountry);
                if (window.parent && window.parent !== window) {
                  window.parent.location.href = cattlerUrl;
                } else {
                  window.location.href = cattlerUrl;
                }
              }}
              className="bg-white text-[#121334] hover:bg-gray-100 font-semibold py-3 px-6 md:py-4 md:px-8 rounded-full text-sm md:text-lg transition-all duration-300 shadow-lg border-0 w-full sm:w-auto"
            >
              {t("requestFreeDemo")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
