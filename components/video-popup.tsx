"use client";

import React from "react";
import { X } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function VideoPopup({ isOpen, onClose }: VideoPopupProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-2 md:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-full">
          {/* Header */}
          <div className="p-3 md:p-6 text-center relative flex-shrink-0">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-gray-500 hover:text-gray-700 transition-colors z-10 bg-white/80 hover:bg-white rounded-full p-1 md:p-2"
            >
              <X className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <h3 className="text-lg md:text-2xl font-bold text-[#121334] mb-1 md:mb-2 pr-8">
              {t("videoCtaTitle")}
            </h3>
            <p className="text-xs md:text-base text-gray-600">
              {t("videoCtaSubtitle")}
            </p>
          </div>

          {/* Video Container */}
          <div className="flex-1 min-h-0">
            <div
              className="relative bg-gray-200 w-full h-full"
              style={{
                paddingBottom: "56.25%",
                maxHeight: "calc(85vh - 140px)",
                minHeight: "200px",
              }}
            >
              {(() => {
                const videoUrl = t("presentationVideoUrl");
                const videoId = getVideoId(videoUrl);
                console.log("Video URL:", videoUrl);
                console.log("Video ID:", videoId);

                if (!videoId) {
                  return (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-gray-500">{t("videoNotAvailable")}</p>
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
          </div>

          {/* Footer */}
          <div className="p-3 md:p-6 text-center flex-shrink-0">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-[#121334] text-[#121334] hover:bg-[#121334] hover:text-white text-sm md:text-base"
            >
              {t("close")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
