"use client";

import React, { useState } from "react";
import { Play, X, Maximize2 } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";

interface FeatureVideoExpanderProps {
  videoSrc: string;
  title: string;
  description: string;
  isPhone?: boolean;
  videoStyle?: React.CSSProperties;
  phoneStyle?: React.CSSProperties;
  tabletStyle?: React.CSSProperties;
  videoScale?: number;
}

export default function FeatureVideoExpander({
  videoSrc,
  title,
  description,
  isPhone = false,
  videoStyle,
  phoneStyle,
  tabletStyle,
  videoScale = 1.0,
}: FeatureVideoExpanderProps) {
  const { t } = useTranslation();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleVideoClick = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      {/* Video Container */}
      <div className="flex-1 max-w-full md:max-w-[50%] flex justify-center items-center mb-6 md:mb-0">
        <div
          className={
            isPhone
              ? "w-[200px] h-[400px] md:w-[280px] md:h-[560px] bg-[#1a1a1a] rounded-[30px] md:rounded-[40px] overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.2)] p-2 md:p-2.5 cursor-pointer group"
              : "w-[300px] h-[200px] md:w-[500px] md:h-[350px] bg-[#1a1a1a] rounded-[15px] md:rounded-[20px] overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.2)] p-1.5 md:p-2.5 cursor-pointer group"
          }
          style={isPhone ? phoneStyle : tabletStyle}
          onClick={handleVideoClick}
        >
          <div
            className={
              isPhone
                ? "w-full h-full bg-black rounded-[24px] md:rounded-[32px] overflow-hidden relative"
                : "w-full h-full bg-black rounded-[10px] md:rounded-[12px] overflow-hidden relative"
            }
          >
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                transform: `scale(${videoScale})`,
                objectPosition: "center",
                ...videoStyle,
              }}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay with play button */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 md:p-4">
                <Play
                  className="w-6 h-6 md:w-8 md:h-8 text-white"
                  fill="currentColor"
                />
              </div>
            </div>
          </div>

          {/* Expand button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleVideoClick();
            }}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-colors duration-200 opacity-0 group-hover:opacity-100"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black z-[9999] flex flex-col"
          onClick={closeFullscreen}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 md:p-6 bg-black/90 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1">
              <h2 className="text-lg md:text-2xl font-bold text-white">
                {title}
              </h2>
              <p className="text-sm md:text-base text-gray-300 mt-1">
                {description}
              </p>
            </div>

            <Button
              onClick={closeFullscreen}
              variant="ghost"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Video Container */}
          <div
            className="flex-1 relative bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
              controls
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Footer */}
          <div
            className="p-4 md:p-6 bg-black/90 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={closeFullscreen}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50"
            >
              {t("close")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
