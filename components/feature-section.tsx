"use client";

import type React from "react";
import { useLearnMoreClick } from "@/hooks/use-learn-more-click";
import { useTranslation, getDemoUrl } from "@/hooks/use-translation";
import { ArrowRight } from "lucide-react";
import FeatureVideoExpander from "@/components/feature-video-expander";

interface FeatureSectionProps {
  title: string;
  description: string | React.ReactNode;
  learnMoreUrl: string;
  videoSrc: string;
  isReverse?: boolean;
  isPhone?: boolean;
  videoFit?: "contain" | "cover";
  videoStyle?: React.CSSProperties;
  phoneStyle?: React.CSSProperties;
  tabletStyle?: React.CSSProperties;
  videoScale?: number;
}

export function FeatureSection({
  title,
  description,
  learnMoreUrl,
  videoSrc,
  isReverse,
  isPhone,
  videoFit = "contain",
  videoStyle,
  phoneStyle,
  tabletStyle,
  videoScale = 1.0,
}: FeatureSectionProps) {
  const handleLearnMoreClick = useLearnMoreClick();
  const { t, selectedCountry } = useTranslation();

  console.log(`Rendering ${title} section with video source:`, videoSrc);

  const VideoComponent = () => (
    <FeatureVideoExpander
      videoSrc={videoSrc}
      title={title}
      description={typeof description === "string" ? description : ""}
      isPhone={isPhone}
      videoStyle={videoStyle}
      phoneStyle={phoneStyle}
      tabletStyle={tabletStyle}
      videoScale={videoScale}
    />
  );

  const ContentComponent = () => (
    <div className="flex-1 max-w-full md:max-w-[50%] px-4 md:px-10">
      <h2 className="font-bold text-xl md:text-2xl lg:text-[28px] mb-3 md:mb-5 text-gray-800 text-center md:text-left">
        {title}
      </h2>
      {typeof description === "string" ? (
        <div className="text-sm md:text-base leading-relaxed text-gray-600 mb-4 md:mb-5">
          {/* Convert description to bullet points */}
          <ul className="list-none pl-0 mb-4 md:mb-5 [&_li]:relative [&_li]:pl-6 md:[&_li]:pl-8 [&_li]:mb-2 md:[&_li]:mb-2.5 [&_li]:leading-relaxed [&_li::before]:content-['✔'] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:text-green-500 [&_li::before]:font-bold">
            {description
              .split(". ")
              .filter((item) => item.trim())
              .map((item, index) => (
                <li key={index}>{item.trim().replace(/\.$/, "")}.</li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="text-sm md:text-base leading-relaxed text-gray-600 mb-4 md:mb-5">
          {description}
        </div>
      )}
      {/* Request Free Demo button */}
      <div className="text-center md:text-left">
        <button
          onClick={() => {
            const cattlerUrl = getDemoUrl(selectedCountry);
            if (window.parent && window.parent !== window) {
              window.parent.location.href = cattlerUrl;
            } else {
              window.location.href = cattlerUrl;
            }
          }}
          className="bg-[#15B674] hover:bg-[#12a066] text-white font-semibold py-2.5 px-5 md:py-3 md:px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2 text-sm md:text-base"
        >
          {t("requestFreeDemo")}{" "}
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <section
      className={`flex flex-col md:flex-row items-center justify-between mb-10 md:mb-15 gap-6 md:gap-10 my-4 md:my-5 py-4 md:py-5 ${
        isReverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <ContentComponent />
      <VideoComponent />
    </section>
  );
}
