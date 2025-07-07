"use client"

import type React from "react"
import { useLearnMoreClick } from "@/hooks/use-learn-more-click"
import { useTranslation } from "@/hooks/use-translation"
import { ArrowRight } from "lucide-react"

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

  console.log(`Rendering ${title} section with video source:`, videoSrc)

  const VideoComponent = () => (
    <div
      className={
        isPhone
          ? "flex-1 max-w-[50%] flex justify-center items-center"
          : "flex-1 max-w-[50%] flex justify-center items-center"
      }
    >
      <div
        className={
          isPhone
            ? "w-[280px] h-[560px] bg-[#1a1a1a] rounded-[40px] overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.2)] p-2.5"
            : "w-[500px] h-[350px] bg-[#1a1a1a] rounded-[20px] overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.2)] p-2.5"
        }
        style={isPhone ? phoneStyle : tabletStyle}
      >
        <div
          className={
            isPhone
              ? "w-full h-full bg-black rounded-[32px] overflow-hidden relative"
              : "w-full h-full bg-black rounded-[12px] overflow-hidden relative"
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
            <div className="absolute top-0 left-0 right-0 bottom-0 border-[10px] border-black rounded-[20px] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
          </div>
        )}
      </div>
    </div>
  )

  const ContentComponent = () => (
    <div className="flex-1 max-w-[50%] px-10">
      <h2 className="font-bold text-[28px] mb-5 text-gray-800">{title}</h2>
      {typeof description === "string" ? (
        <div className="text-base leading-relaxed text-gray-600 mb-5">
          {/* Convert description to bullet points */}
          <ul className="list-none pl-0 mb-5 [&_li]:relative [&_li]:pl-8 [&_li]:mb-2.5 [&_li]:leading-relaxed [&_li::before]:content-['✔'] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:text-green-500 [&_li::before]:font-bold">
            {description
              .split(". ")
              .filter((item) => item.trim())
              .map((item, index) => (
                <li key={index}>{item.trim().replace(/\.$/, "")}.</li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="text-base leading-relaxed text-gray-600 mb-5">{description}</div>
      )}
      <a
        href="#"
        data-url={learnMoreUrl}
        className="text-blue-600 no-underline font-medium hover:underline font-bold"
        onClick={handleLearnMoreClick}
      >
        {t("learnMore")} <ArrowRight className="inline-block ml-1 w-4 h-4" />
      </a>
    </div>
  )

  return (
    <section
      className={`flex flex-row items-center justify-between mb-15 gap-10 ${isReverse ? "flex-row-reverse" : ""} max-[768px]:flex-col max-[768px]:items-center`}
    >
      <ContentComponent />
      <VideoComponent />
    </section>
  )
}
