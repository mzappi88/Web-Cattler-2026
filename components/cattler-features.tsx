"use client"

import { FeatureSection } from "./feature-section"
import { Settings, Clock, Users, Info } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"
import { useMemo } from "react"
import TestimonialsCarousel from "./testimonials-carousel"
import { useRouter } from "next/navigation"

export default function CattlerFeatures() {
  const { selectedCountry, setSelectedCountry, language, t, isHydrated } = useTranslation()
  const router = useRouter()

  const navigateToDemo = () => {
    router.push("/demo")
  }

  // Memoize the highlighted title to ensure it updates when language changes
  const highlightedTitle = useMemo(() => {
    const fullTitle = t("featuresMainTitle")

    if (language === "es") {
      return (
        <>
          <span className="text-[#15B674]">Ahorra tiempo y dinero</span> con el software de gestión ganadera más
          avanzado
        </>
      )
    } else if (language === "pt") {
      return (
        <>
          <span className="text-[#15B674]">Economize tempo e dinheiro</span> com o software de gestão de gado mais
          avançado
        </>
      )
    } else {
      // English (default)
      return (
        <>
          <span className="text-[#15B674]">Save time & money</span> with the most advanced Cattle Management Software
        </>
      )
    }
  }, [language, t])

  // Show loading state only during initial hydration
  if (!isHydrated) {
    return (
      <main className="font-sans max-w-6xl mx-auto px-5 py-10 text-gray-800">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-20 mx-auto max-w-4xl"></div>
          <div className="h-32 bg-gray-100 rounded mb-20"></div>
        </div>
      </main>
    )
  }

  return (
    <main className="font-sans max-w-6xl mx-auto px-5 py-10 text-gray-800">
      <h1 className="font-bold text-center mb-20 text-gray-800 text-4xl lg:text-5xl">{highlightedTitle}</h1>

      <div className="flex justify-around my-10 mb-20 flex-wrap bg-gray-50 rounded-xl p-8 shadow-md">
        <div className="flex items-center font-bold text-lg text-gray-800 my-2.5 mx-5 transition-transform hover:-translate-y-1">
          <span className="mr-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="#15B674" strokeWidth="2" />
              <path
                d="M8 12L11 15L16 9"
                stroke="#15B674"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-medium leading-tight">{t("bulletMultipleIntegrations")}</span>
        </div>

        <div className="flex items-center font-bold text-lg text-gray-800 my-2.5 mx-5 transition-transform hover:-translate-y-1">
          <span className="mr-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="#15B674" strokeWidth="2" />
              <path
                d="M8 12L11 15L16 9"
                stroke="#15B674"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-medium leading-tight">{t("bulletAllDataOnePlace")}</span>
        </div>

        <div className="flex items-center font-bold text-lg text-gray-800 my-2.5 mx-5 transition-transform hover:-translate-y-1">
          <span className="mr-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="#15B674" strokeWidth="2" />
              <path
                d="M8 12L11 15L16 9"
                stroke="#15B674"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-medium leading-tight">{t("bulletUserFriendly")}</span>
        </div>
      </div>

      <FeatureSection
        title={t("feedingTitle")}
        description={t("feedingDesc")}
        learnMoreUrl="https://www.cattler.farm/feeder"
        videoSrc="https://video.wixstatic.com/video/93f7fc_449a9d335f4546d18ac6336ec5755d9a/720p/mp4/file.mp4"
        isPhone={true}
        isReverse={true}
        phoneStyle={{
          width: "270px",
          height: "520px",
        }}
      />

      <div className="w-0.5 h-15 bg-gray-300 mx-auto"></div>

      <FeatureSection
        title={t("cattleManagementTitle")}
        description={t("cattleManagementDesc")}
        learnMoreUrl="https://www.cattler.farm/cattle-management"
        videoSrc="https://video.wixstatic.com/video/93f7fc_50076f9ae9784c11a97b4000e3d06e00/480p/mp4/file.mp4"
        isPhone={true}
        isReverse={false}
        phoneStyle={{
          width: "270px",
          height: "560px",
        }}
      />

      <div className="w-0.5 h-15 bg-gray-300 mx-auto"></div>

      <FeatureSection
        title={t("animalHealthTitle")}
        description={t("animalHealthDesc")}
        learnMoreUrl="https://www.cattler.farm/animal-health"
        videoSrc="https://video.wixstatic.com/video/93f7fc_3abf23fd19d044e195dfa84a7eca55bf/1080p/mp4/file.mp4"
        isPhone={true}
        isReverse={true}
        phoneStyle={{
          width: "270px",
          height: "560px",
        }}
      />

      <div className="w-0.5 h-15 bg-gray-300 mx-auto"></div>

      <FeatureSection
        title={t("accountManagementTitle")}
        description={t("accountManagementDesc")}
        learnMoreUrl="https://www.cattler.farm/account-management"
        videoSrc="https://video.wixstatic.com/video/93f7fc_42cd75cbe9cf4230af581a1821c51623/720p/mp4/file.mp4"
        isReverse={false}
      />

      <div className="w-0.5 h-15 bg-gray-300 mx-auto"></div>

      <FeatureSection
        title={t("advancedFeedingTitle")}
        description={t("advancedFeedingDesc")}
        learnMoreUrl="https://www.cattler.farm/advanced-feeding"
        videoSrc="https://video.wixstatic.com/video/93f7fc_ffa986ce4ad44915b28719917029acee/1080p/mp4/file.mp4"
        isReverse={true}
      />

      <div className="w-0.5 h-15 bg-gray-300 mx-auto"></div>

      <section className="py-15 bg-gray-50 py-16">
        <h2 className="font-bold text-4xl font-bold text-center mb-10 text-gray-800 mt-5">{t("whyChooseCattler")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-5 py-8">
          <div className="bg-white rounded-lg p-8 text-center shadow-md transition-transform hover:-translate-y-1">
            <Info className="w-12 h-12 mx-auto mb-5 text-[#15B674]" />
            <h3 className="font-bold text-xl font-semibold mb-4 text-gray-800">{t("comprehensiveSolution")}</h3>
            <p className="text-base leading-relaxed text-gray-600">{t("comprehensiveSolutionDesc")}</p>
          </div>
          <div className="bg-white rounded-lg p-8 text-center shadow-md transition-transform hover:-translate-y-1">
            <Settings className="w-12 h-12 mx-auto mb-5 text-[#15B674]" />
            <h3 className="font-bold text-xl font-semibold mb-4 text-gray-800">{t("customizable")}</h3>
            <p className="text-base leading-relaxed text-gray-600">{t("customizableDesc")}</p>
          </div>
          <div className="bg-white rounded-lg p-8 text-center shadow-md transition-transform hover:-translate-y-1">
            <Clock className="w-12 h-12 mx-auto mb-5 text-[#15B674]" />
            <h3 className="font-bold text-xl font-semibold mb-4 text-gray-800">{t("realTimeUpdates")}</h3>
            <p className="text-base leading-relaxed text-gray-600">{t("realTimeUpdatesDesc")}</p>
          </div>
          <div className="bg-white rounded-lg p-8 text-center shadow-md transition-transform hover:-translate-y-1">
            <Users className="w-12 h-12 mx-auto mb-5 text-[#15B674]" />
            <h3 className="font-bold text-xl font-semibold mb-4 text-gray-800">{t("multiUserAccess")}</h3>
            <p className="text-base leading-relaxed text-gray-600">{t("multiUserAccessDesc")}</p>
          </div>
        </div>
        {/* Pricing CTA Component */}
        <div className="mt-16 bg-gradient-to-r from-[#15B674] to-[#12a066] rounded-2xl p-8 text-center text-white shadow-xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-bold text-3xl mb-4">{t("pricingCtaTitle")}</h3>
            <p className="text-lg mb-8 opacity-90">{t("pricingCtaSubtitle")}</p>
            <button
              onClick={() => router.push("/pricing")}
              className="bg-white text-[#15B674] font-bold text-lg py-4 px-8 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-3"
            >
              <span>{t("viewPlansAndPrices")}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <div className="w-0.5 h-15 bg-gray-300 mx-auto"></div>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      <div className="w-0.5 h-15 bg-gray-300 mx-auto"></div>

      <section className="py-20 text-center bg-[#121334] text-white">
        <h2 className="font-bold text-4xl font-bold mb-5">{t("ctaTitle")}</h2>
        <p className="text-lg max-w-2xl mx-auto mb-8">{t("ctaSubtitle")}</p>
        <button
          className="bg-[#f25f24] text-white font-bold text-lg font-semibold py-3 px-8 border-none rounded-full cursor-pointer transition-colors hover:bg-[#d14d1a]"
          onClick={navigateToDemo}
        >
          {t("requestDemo")}
        </button>
      </section>
    </main>
  )
}
