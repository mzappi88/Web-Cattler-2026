"use client"

import type React from "react"
import { useLearnMoreClick } from "@/hooks/use-learn-more-click"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface FeatureSectionProps {
  title: string
  description: string | React.ReactNode
  learnMoreUrl: string
  videoSrc: string
  isReverse?: boolean
  isPhone?: boolean
  videoFit?: "contain" | "cover"
  videoStyle?: React.CSSProperties
  phoneStyle?: React.CSSProperties
  tabletStyle?: React.CSSProperties
  videoScale?: number
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
  const handleLearnMoreClick = useLearnMoreClick()
  const { t } = useTranslation()

  const VideoComponent = () => (
    <div className={`flex-1 max-w-[50%] flex justify-center items-center ${isPhone ? "" : ""}`}>
      <div
        className={`${isPhone ? "w-[280px] h-[560px] bg-gray-900 rounded-[40px] p-2.5 shadow-2xl" : "w-[500px] h-[350px] bg-gray-900 rounded-[20px] p-2.5 shadow-2xl"}`}
        style={isPhone ? phoneStyle : tabletStyle}
      >
        <div
          className={`w-full h-full bg-black ${isPhone ? "rounded-[32px]" : "rounded-[12px]"} overflow-hidden relative`}
        >
          {isPhone && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-gray-900 rounded-b-[20px] z-10" />
          )}
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{
              transform: `scale(${videoScale})`,
              objectPosition: "center",
              ...videoStyle,
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  )

  const ContentComponent = () => (
    <div className="flex-1 max-w-[50%] px-10">
      <h2 className="font-bold text-3xl mb-5 text-gray-800">{title}</h2>
      {typeof description === "string" ? (
        <div className="text-gray-600 text-base leading-relaxed mb-5">
          <p>{description}</p>
        </div>
      ) : (
        <div className="text-gray-600 text-base leading-relaxed mb-5">{description}</div>
      )}
      <a
        href="#"
        data-url={learnMoreUrl}
        className="text-blue-600 no-underline font-medium hover:underline font-bold inline-flex items-center"
        onClick={handleLearnMoreClick}
      >
        {t("learnMore")} <ArrowRight className="inline-block ml-1 w-4 h-4" />
      </a>
    </div>
  )

  return (
    <section
      className={`flex ${isReverse ? "flex-row-reverse" : "flex-row"} items-center justify-between mb-15 gap-10 max-md:flex-col max-md:items-center`}
    >
      <ContentComponent />
      <VideoComponent />
    </section>
  )
}
