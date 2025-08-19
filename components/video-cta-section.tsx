"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import FullscreenVideo from "@/components/fullscreen-video";

export default function VideoCtaSection() {
  const { t } = useTranslation();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      {/* Video CTA Section */}
      <div
        className="text-center mt-12 md:mt-16"
        id="video-presentation-section"
      >
        <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-[#121334] mb-3 md:mb-4">
            {t("videoCtaTitle")}
          </h3>
          <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
            {t("videoCtaSubtitle")}
          </p>

          <button
            id="video-presentation-button"
            onClick={() => setIsVideoOpen(true)}
            className="group bg-gradient-to-r from-[#f25f24] to-[#d14d1a] hover:from-[#d14d1a] hover:to-[#b8421a] text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto text-sm md:text-base"
          >
            <div className="bg-white/20 rounded-full p-1.5 md:p-2 mr-2 md:mr-3 group-hover:bg-white/30 transition-colors">
              <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
            </div>
            {t("watchPresentationVideo")}
          </button>
        </div>
      </div>

      {/* Fullscreen Video */}
      <FullscreenVideo
        videoUrl={t("presentationVideoUrl")}
        title={t("videoCtaTitle")}
        subtitle={t("videoCtaSubtitle")}
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </>
  );
}
