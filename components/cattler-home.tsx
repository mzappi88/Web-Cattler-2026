"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  ClipboardList,
  TrendingUp,
  Activity,
  DollarSign,
  Play,
  ArrowRight,
  Award,
  Zap,
  CheckCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/hooks/use-translation";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CattlerHome() {
  const { selectedCountry, setSelectedCountry, language, t } = useTranslation();
  const router = useRouter();
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  const [heroVideoError, setHeroVideoError] = useState(false);

  const getVideoId = (url: string) => {
    // Handle youtu.be format
    if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1]?.split("?")[0];
    }
    // Handle youtube.com/watch?v= format
    if (url.includes("youtube.com/watch?v=")) {
      return url.split("v=")[1]?.split("&")[0];
    }
    // Handle youtube.com/embed/ format
    if (url.includes("youtube.com/embed/")) {
      return url.split("embed/")[1]?.split("?")[0];
    }
    return null;
  };

  return (
    <div className="bg-[#499E80] flex flex-col items-center justify-center px-0">
      {/* Hero Video Section */}
      <div className="relative w-full bg-black">
        <div
          className="relative w-full"
          style={{
            paddingBottom:
              "42.1875%" /* 16:9 aspect ratio aumentado 50% desde 28.125% */,
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
                <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-8 drop-shadow-lg">
                  {t("heroTitle")}
                </h2>
              </div>
            </div>
          )}

          {/* Overlay Banner */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center px-4">
              <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-8 drop-shadow-lg">
                {t("heroTitle")}
              </h2>
            </div>
          </div>
        </div>

        {/* Get Started Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button
            className="bg-[#f25f24] hover:bg-[#d14d1a] text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
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

      <div className="py-8">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white text-center my-5 leading-tight pt-8">
            {t("mainTitleWithCattler")}
          </h1>
          <div className="mt-4 mb-6">
            <Image
              src="/Cattler-black.png"
              alt="Cattler"
              width={350}
              height={80}
              className="h-16 md:h-20 lg:h-24 w-auto brightness-0 invert"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-4 px-9">
        <div className="flex flex-col">
          <div className="w-full">
            <div className="text-center mb-6">
              <p className="text-[25px] text-white mb-2">{t("mainSubtitle")}</p>
              <p className="text-[25px] text-white/90">
                {t("mainSubtitleLine2")}
              </p>
            </div>
            <div className="flex-1 items-center justify-center mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <FeatureCard
                  icon={<ClipboardList className="w-8 h-8 text-[#121334]" />}
                  title={t("endPaperwork")}
                  description={t("endPaperworkDesc")}
                />
                <FeatureCard
                  icon={<TrendingUp className="w-8 h-8 text-[#121334]" />}
                  title={t("boostProductivity")}
                  description={t("boostProductivityDesc")}
                />
                <FeatureCard
                  icon={<Activity className="w-8 h-8 text-[#121334]" />}
                  title={t("preventHealth")}
                  description={t("preventHealthDesc")}
                />
                <FeatureCard
                  icon={<DollarSign className="w-8 h-8 text-[#121334]" />}
                  title={t("maximizeProfits")}
                  description={t("maximizeProfitsDesc")}
                />
              </div>
            </div>
          </div>

          {/* Video CTA Section - Now below the feature cards */}
          <div className="text-center mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-[#121334] mb-4">
                {t("videoCtaTitle")}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {t("videoCtaSubtitle")}
              </p>

              <button
                onClick={() => setIsVideoPopupOpen(true)}
                className="group bg-gradient-to-r from-[#f25f24] to-[#d14d1a] hover:from-[#d14d1a] hover:to-[#b8421a] text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
              >
                <div className="bg-white/20 rounded-full p-2 mr-3 group-hover:bg-white/30 transition-colors">
                  <Play className="w-5 h-5 ml-0.5" />
                </div>
                {t("watchPresentationVideo")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="w-full bg-gradient-to-br from-[#121334] via-[#1a1a4a] to-[#121334] py-20 relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("enhancedCtaTitle")}
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t("enhancedCtaSubtitle")}
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#15B674] to-[#12a066] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/cow.png"
                    alt="Cow"
                    width={48}
                    height={48}
                    className="w-12 h-12 brightness-0 invert"
                  />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {t("cattleHeadCount")}
                </div>
                <div className="text-gray-300">{t("cattleHead")}</div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#f25f24] to-[#d14d1a] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Image
                    src="/tractor.png"
                    alt="Tractor"
                    width={48}
                    height={48}
                    className="w-12 h-12 brightness-0 invert"
                  />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {t("feedTonCount")}
                </div>
                <div className="text-gray-300">{t("feedTon")}</div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {t("timeSavedCount")}
                </div>
                <div className="text-gray-300">{t("timeSaved")}</div>
              </div>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
              <div className="flex items-center text-left">
                <CheckCircle className="w-5 h-5 text-[#15B674] mr-3 flex-shrink-0" />
                <span className="text-gray-300">{t("implementation24h")}</span>
              </div>
              <div className="flex items-center text-left">
                <CheckCircle className="w-5 h-5 text-[#15B674] mr-3 flex-shrink-0" />
                <span className="text-gray-300">{t("specializedSupport")}</span>
              </div>
              <div className="flex items-center text-left">
                <CheckCircle className="w-5 h-5 text-[#15B674] mr-3 flex-shrink-0" />
                <span className="text-gray-300">{t("automaticUpdates")}</span>
              </div>
              <div className="flex items-center text-left">
                <CheckCircle className="w-5 h-5 text-[#15B674] mr-3 flex-shrink-0" />
                <span className="text-gray-300">{t("systemIntegration")}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => router.push("/pricing")}
                className="bg-gradient-to-r from-[#15B674] to-[#12a066] hover:from-[#12a066] hover:to-[#0f8a56] text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl border-0"
              >
                {t("explorePlansAndPrices")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              <Button
                onClick={() => {
                  const cattlerUrl = "https://www.cattler.com.ar/demo";
                  if (window.parent && window.parent !== window) {
                    window.parent.location.href = cattlerUrl;
                  } else {
                    window.location.href = cattlerUrl;
                  }
                }}
                className="bg-white text-[#121334] hover:bg-gray-100 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg border-0"
              >
                {t("requestFreeDemo")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Popup */}
      {isVideoPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setIsVideoPopupOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-[#121334] mb-2">
                  {t("videoCtaTitle")}
                </h3>
                <p className="text-gray-600 mb-4">{t("videoCtaSubtitle")}</p>
              </div>

              <div
                className="relative bg-gray-200"
                style={{ paddingBottom: "56.25%" }}
              >
                {(() => {
                  const videoUrl = t("presentationVideoUrl");
                  const videoId = getVideoId(videoUrl);
                  console.log("Video URL:", videoUrl);
                  console.log("Video ID:", videoId);

                  if (!videoId) {
                    return (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-gray-500">
                          {t("videoNotAvailable")}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          URL: {videoUrl}
                        </p>
                      </div>
                    );
                  }
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  );
                })()}
              </div>

              <div className="p-6 text-center">
                <Button
                  onClick={() => setIsVideoPopupOpen(false)}
                  variant="outline"
                  className="border-[#121334] text-[#121334] hover:bg-[#121334] hover:text-white"
                >
                  {t("close")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-[#121334] ml-3">{title}</h3>
      </div>
      <p className="text-[#121334]">{description}</p>
    </div>
  );
}
