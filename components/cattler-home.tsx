"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  ClipboardList,
  TrendingUp,
  Activity,
  DollarSign,
  Award,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useTranslation, getDemoUrl } from "@/hooks/use-translation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import EnhancedCtaSection from "@/components/enhanced-cta-section";
import VideoCtaSection from "@/components/video-cta-section";

export default function CattlerHome() {
  const { selectedCountry, setSelectedCountry, language, t } = useTranslation();
  const router = useRouter();
  const [heroVideoError, setHeroVideoError] = useState(false);

  return (
    <div className="bg-[#499E80] flex flex-col items-center justify-center px-0">
      {/* Hero Video Section */}
      <div className="relative w-full bg-black">
        {/* Mobile Video - Full height */}
        <div className="relative w-full h-[50vh] md:hidden">
          {!heroVideoError ? (
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onError={(e) => {
                console.error("Hero video error:", e);
                setHeroVideoError(true);
              }}
            >
              <source
                src="https://video.wixstatic.com/video/93f7fc_55b18a9715124be680e597e4a30bc548/720p/mp4/file.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#121334] to-[#1a1a4a] flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 md:mb-6">
                  <Image
                    src="/Cattler-black.png"
                    alt="Cattler"
                    width={200}
                    height={50}
                    className="h-16 md:h-24 lg:h-32 w-auto brightness-0 invert mx-auto"
                  />
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-8 drop-shadow-lg">
                  {t("heroTitle")}
                </h2>
              </div>
            </div>
          )}

          {/* Overlay Banner */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="mb-4 md:mb-6">
                <Image
                  src="/Cattler-black.png"
                  alt="Cattler"
                  width={200}
                  height={50}
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
          className="relative w-full hidden md:block"
          style={{
            paddingBottom:
              "42.19%" /* 16:9 aspect ratio reducido 25% desde 56.25% */,
          }}
        >
          {!heroVideoError ? (
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              onError={(e) => {
                console.error("Hero video error:", e);
                setHeroVideoError(true);
              }}
            >
              <source
                src="https://video.wixstatic.com/video/93f7fc_55b18a9715124be680e597e4a30bc548/720p/mp4/file.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#121334] to-[#1a1a4a] flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 md:mb-6">
                  <Image
                    src="/Cattler-black.png"
                    alt="Cattler"
                    width={200}
                    height={50}
                    className="h-16 md:h-24 lg:h-32 w-auto brightness-0 invert mx-auto"
                  />
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-8 drop-shadow-lg">
                  {t("heroTitle")}
                </h2>
              </div>
            </div>
          )}

          {/* Overlay Banner */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4">
              <div className="mb-4 md:mb-6">
                <Image
                  src="/Cattler-black.png"
                  alt="Cattler"
                  width={200}
                  height={50}
                  className="h-16 md:h-24 lg:h-32 w-auto brightness-0 invert mx-auto"
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
              const cattlerUrl = getDemoUrl(selectedCountry);
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

      <div className="py-4 md:py-8">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center my-3 md:my-5 leading-tight pt-4 md:pt-8">
            {t("mainTitleWithCattler")}
          </h1>
        </div>
      </div>

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
            <div className="flex-1 items-center justify-center mt-6 md:mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
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

          {/* Video CTA Section - Now below the feature cards */}
          <VideoCtaSection />
        </div>
      </div>

      {/* Spacing before Enhanced CTA Section */}
      <div className="py-16 md:py-24"></div>

      {/* Enhanced CTA Section */}
      <EnhancedCtaSection />
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
