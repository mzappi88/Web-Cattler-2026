"use client";

import React, { useState, useEffect } from "react";
import { X, Play, Maximize2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";

interface FullscreenVideoProps {
  videoUrl: string;
  title?: string;
  subtitle?: string;
  onClose: () => void;
  isOpen: boolean;
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

export default function FullscreenVideo({
  videoUrl,
  title,
  subtitle,
  onClose,
  isOpen,
}: FullscreenVideoProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when video is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const videoId = getVideoId(videoUrl);
  const displayTitle = title || t("videoCtaTitle");
  const displaySubtitle = subtitle || t("videoCtaSubtitle");

  return (
    <div
      className="fixed inset-0 bg-black z-[9999] flex flex-col"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 md:p-6 bg-black/90 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1">
          <h2 className="text-lg md:text-2xl font-bold text-white">
            {displayTitle}
          </h2>
          {displaySubtitle && (
            <p className="text-sm md:text-base text-gray-300 mt-1">
              {displaySubtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Video Container */}
      <div
        className="flex-1 relative bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              border: "none",
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <p className="text-xl mb-4">{t("videoNotAvailable")}</p>
              <p className="text-gray-400 text-sm">URL: {videoUrl}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="p-4 md:p-6 bg-black/90 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          variant="outline"
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50"
        >
          {t("close")}
        </Button>
      </div>
    </div>
  );
}
