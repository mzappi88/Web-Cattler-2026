"use client";

import type React from "react";
import { useLearnMoreClick } from "@/hooks/use-learn-more-click";
import { useTranslation } from "@/hooks/use-translation";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

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
  const router = useRouter();

  console.log(`Rendering ${title} section with video source:`, videoSrc);

  const VideoComponent = () => (
    <div className="flex-1 max-w-full md:max-w-[50%] flex justify-center items-center mb-6 md:mb-0">
      <div
        className={
          isPhone
            ? "w-[200px] h-[400px] md:w-[280px] md:h-[560px] bg-[#1a1a1a] rounded-[30px] md:rounded-[40px] overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.2)] p-2 md:p-2.5"
            : "w-[300px] h-[200px] md:w-[500px] md:h-[350px] bg-[#1a1a1a] rounded-[15px] md:rounded-[20px] overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.2)] p-1.5 md:p-2.5"
        }
        style={isPhone ? phoneStyle : tabletStyle}
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
        </div>
        {!isPhone && (
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 bottom-0 border-[8px] md:border-[10px] border-black rounded-[15px] md:rounded-[20px] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
          </div>
        )}
      </div>
    </div>
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
            router.push("/demo");
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
