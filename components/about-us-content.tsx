"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"

export function AboutUsContent() {
  const { t, isHydrated } = useTranslation()

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Our Story Section */}
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
            {t("aboutUs.ourStory.title")}
          </h1>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                <p>{t("aboutUs.ourStory.paragraph1")}</p>
                <p>{t("aboutUs.ourStory.paragraph2")}</p>
                <p>{t("aboutUs.ourStory.paragraph3")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet The Founders Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            {t("aboutUs.founders.title")}
          </h2>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Ignacio Albornoz */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <Image
                      src="/placeholder-user.jpg"
                      alt="Ignacio Albornoz"
                      fill
                      className="rounded-full object-cover border-4 border-green-100 group-hover:border-green-300 transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("aboutUs.founders.ignacio.name")}</h3>
                  <p className="text-green-600 font-semibold text-lg mb-4">{t("aboutUs.founders.ignacio.title")}</p>
                </div>
                <p className="text-gray-700 leading-relaxed">{t("aboutUs.founders.ignacio.description")}</p>
              </CardContent>
            </Card>

            {/* Ezequiel Conti */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <Image
                      src="/placeholder-user.jpg"
                      alt="Ezequiel Conti"
                      fill
                      className="rounded-full object-cover border-4 border-green-100 group-hover:border-green-300 transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("aboutUs.founders.ezequiel.name")}</h3>
                  <p className="text-green-600 font-semibold text-lg mb-4">{t("aboutUs.founders.ezequiel.title")}</p>
                </div>
                <p className="text-gray-700 leading-relaxed">{t("aboutUs.founders.ezequiel.description")}</p>
              </CardContent>
            </Card>

            {/* Martín Garbulsky */}
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 lg:col-span-1 md:col-span-2 lg:mx-0 md:mx-auto md:max-w-md">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <Image
                      src="/placeholder-user.jpg"
                      alt="Martín Garbulsky"
                      fill
                      className="rounded-full object-cover border-4 border-green-100 group-hover:border-green-300 transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("aboutUs.founders.martin.name")}</h3>
                  <p className="text-green-600 font-semibold text-lg mb-4">{t("aboutUs.founders.martin.title")}</p>
                </div>
                <p className="text-gray-700 leading-relaxed">{t("aboutUs.founders.martin.description")}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Our Investors & Supporters Section */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            {t("aboutUs.investors.title")}
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Cattle Producers-Investors */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.jpg"
                      alt="Cattle Producers Investors"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("aboutUs.investors.producers.title")}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{t("aboutUs.investors.producers.description")}</p>
              </CardContent>
            </Card>

            {/* VCs & Corporate Investors */}
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8">{t("aboutUs.investors.corporate.title")}</h3>

                  {/* Investor logos grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 flex items-center justify-center h-24 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <span className="text-gray-600 font-semibold text-sm">SVG Ventures</span>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 flex items-center justify-center h-24 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <span className="text-gray-600 font-semibold text-sm">Thrive Agrifood</span>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 flex items-center justify-center h-24 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <span className="text-gray-600 font-semibold text-sm">Plug and Play</span>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 flex items-center justify-center h-24 border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <span className="text-gray-600 font-semibold text-sm">Other VCs</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t("aboutUs.investors.corporate.description1")}
                  </p>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {t("aboutUs.investors.corporate.description2")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
