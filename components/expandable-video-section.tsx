"use client";

import React, { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";

interface ExpandableVideoSectionProps {
  videoUrl: string;
  title?: string;
  subtitle?: string;
}

// Helper function to extract video ID from YouTube URL
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

export default function ExpandableVideoSection({
  videoUrl,
  title,
  subtitle,
}: ExpandableVideoSectionProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // If mobile, use regular popup behavior
  if (isMobile) {
    return (
      <div
        className="text-center mt-12 md:mt-16"
        id="video-presentation-section"
      >
        <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-[#121334] mb-3 md:mb-4">
            {title || t("videoCtaTitle")}
          </h3>
          <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
            {subtitle || t("videoCtaSubtitle")}
          </p>

          <button
            id="video-presentation-button"
            onClick={() => setIsExpanded(true)}
            className="group bg-gradient-to-r from-[#f25f24] to-[#d14d1a] hover:from-[#d14d1a] hover:to-[#b8421a] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto text-sm md:text-base"
          >
            <div className="bg-white/20 rounded-full p-1.5 md:p-2 mr-2 md:mr-3 group-hover:bg-white/30 transition-colors">
              <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
            </div>
            {t("watchPresentationVideo")}
          </button>
        </div>

        {/* Mobile Popup */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center z-50 p-2 md:p-4"
            onClick={() => setIsExpanded(false)}
          >
            <div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-full">
                <div className="p-3 md:p-6 text-center relative flex-shrink-0">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 transition-colors z-10 bg-white/80 hover:bg-white rounded-full p-1 md:p-2"
                  >
                    <X className="w-4 h-4 md:w-6 md:h-6" />
                  </button>
                  <h3 className="text-lg md:text-2xl font-bold text-[#121334] mb-1 md:mb-2 pr-8">
                    {title || t("videoCtaTitle")}
                  </h3>
                  <p className="text-xs md:text-base text-gray-600">
                    {subtitle || t("videoCtaSubtitle")}
                  </p>
                </div>

                <div className="flex-1 min-h-0">
                  <div
                    className="relative bg-gray-200 w-full h-full"
                    style={{
                      paddingBottom: "56.25%",
                      maxHeight: "calc(85vh - 160px)",
                      minHeight: "200px",
                    }}
                  >
                    {(() => {
                      const videoId = getVideoId(videoUrl);
                      if (!videoId) {
                        return (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-gray-500">
                              {t("videoNotAvailable")}
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
                </div>

                <div className="p-3 md:p-6 text-center flex-shrink-0">
                  <Button
                    onClick={() => setIsExpanded(false)}
                    variant="outline"
                    className="border-[#121334] text-[#121334] hover:bg-[#121334] hover:text-white text-sm md:text-base"
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

  // Desktop expansion behavior
  const videoId = getVideoId(videoUrl);
  const displayTitle = title || t("videoCtaTitle");
  const displaySubtitle = subtitle || t("videoCtaSubtitle");

  return (
    <div className="text-center mt-12 md:mt-16" id="video-presentation-section">
      {/* Original CTA Section */}
      <div
        className={`bg-white p-4 md:p-8 rounded-2xl shadow-lg max-w-2xl mx-auto transition-all duration-500 ${
          isExpanded ? "mb-8" : ""
        }`}
      >
        <h3 className="text-xl md:text-2xl font-bold text-[#121334] mb-3 md:mb-4">
          {displayTitle}
        </h3>
        <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
          {displaySubtitle}
        </p>

        <button
          id="video-presentation-button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="group bg-gradient-to-r from-[#f25f24] to-[#d14d1a] hover:from-[#d14d1a] hover:to-[#b8421a] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto text-sm md:text-base"
        >
          <div className="bg-white/20 rounded-full p-1.5 md:p-2 mr-2 md:mr-3 group-hover:bg-white/30 transition-colors">
            <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
          </div>
          {isExpanded ? t("close") : t("watchPresentationVideo")}
        </button>
      </div>

      {/* Expandable Video Section */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-[#121334]">
                {displayTitle}
              </h3>
              <p className="text-gray-600">{displaySubtitle}</p>
            </div>
            <Button
              onClick={() => setIsExpanded(false)}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div
            className="relative bg-gray-200 rounded-lg overflow-hidden"
            style={{ paddingBottom: "56.25%" }}
          >
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=${
                  isExpanded ? "1" : "0"
                }&rel=0&modestbranding=1&controls=1&showinfo=0`}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">{t("videoNotAvailable")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
