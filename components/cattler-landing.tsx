"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Script from "next/script"
import { ClipboardList, TrendingUp, Activity, DollarSign } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { CountrySelector } from "./country-selector"

declare global {
  interface Window {
    hbspt: any
  }
}
export type Version = "landing" | "ads-a" | "ads-b"

export default function CattlerLanding() {
  const { selectedCountry, setSelectedCountry, language, t } = useTranslation()
  const [version, setVersion] = useState<Version>("landing")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ver = params.get("ver") as Version | null
    setVersion(ver || "landing")
  }, [])

  const [submitted, setSubmitted] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [formLoaded, setFormLoaded] = useState(false)

  useEffect(() => {
    if (scriptLoaded && typeof window.hbspt !== "undefined") {
      window.hbspt.forms.create({
        portalId: "21027761",
        formId:
          version == "ads-a"
            ? "36487514-58d0-497a-afec-65dbd0be2875"
            : version == "ads-b"
              ? "307e5904-2059-4a40-8f24-fd1a8c3e98e8"
              : "302022b8-67fb-454c-86bf-d6f4b449f4e0",
        target: "#hubspot-form-container",
        region: "na1",
        onFormReady: () => setFormLoaded(true),
        onFormSubmitted: () => setSubmitted(true),
      })
    }
  }, [scriptLoaded, version])

  return (
    <div className="bg-gradient-to-b from-[#f0f1f7] to-[#d1d3e2] flex flex-col items-center justify-center">
      {/* Country Selector - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <CountrySelector selectedCountry={selectedCountry} onCountryChange={setSelectedCountry} t={t} />
      </div>

      {/* Hero Video Section */}
      <div className="relative w-full bg-black">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" /* 16:9 aspect ratio */ }}>
          <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
            <source
              src="https://video.wixstatic.com/video/93f7fc_55b18a9715124be680e597e4a30bc548/720p/mp4/file.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

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
              document.getElementById("hubspot-form-container")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            {t("getStarted")}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-[#121334] text-center my-5">{t("mainTitle")}</h1>
      </div>
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:justify-between gap-12">
          <div className="md:w-1/2 flex-1">
            <p className="text-[25px] text-[#121334] mb-6 text-center">{t("mainSubtitle")}</p>
            <div className="flex-1 items-center justify-center mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
              {!submitted ? (
                <>
                  <h2 className="text-3xl font-bold text-[#121334] mb-4 text-center">{t("formTitle")}</h2>
                  <p className="text-xl text-[#121334] mb-6">
                    {version != "landing" ? t("formSubtitleAds") : t("formSubtitleLanding")}
                  </p>
                  {!formLoaded && (
                    <div className="flex items-center justify-center h-30">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#121334]"></div>
                    </div>
                  )}
                  <div id="hubspot-form-container"></div>
                </>
              ) : (
                <div className="text-center py-8">
                  <h2 className="text-2xl font-semibold text-[#121334] mb-4">{t("thankYou")}</h2>
                  <p className="text-[#121334]">{version == "landing" ? t("thankYouLanding") : t("thankYouAds")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Script src="//js.hsforms.net/forms/embed/v2.js" onLoad={() => setScriptLoaded(true)} />
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-[#121334] ml-3">{title}</h3>
      </div>
      <p className="text-[#121334]">{description}</p>
    </div>
  )
}
