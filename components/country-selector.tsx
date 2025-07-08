"use client"

import { useState } from "react"
import { ChevronDown, Globe } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation" // 👈 asegurate de que esta ruta sea correcta
import type { Country } from "@/hooks/use-translation"

interface CountrySelectorProps {
  selectedCountry: Country
  onCountryChange: (country: Country) => void
}

export function CountrySelector({ selectedCountry, onCountryChange }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  const countries: { code: Country; flag: string }[] = [
    { code: "US", flag: "🇺🇸" },
    { code: "CA", flag: "🇨🇦" },
    { code: "AR", flag: "🇦🇷" },
    { code: "PY", flag: "🇵🇾" },
    { code: "UY", flag: "🇺🇾" },
    { code: "BO", flag: "🇧🇴" },
    { code: "BR", flag: "🇧🇷" },
    { code: "MX", flag: "🇲🇽" },
    { code: "OT", flag: "🌍" },
  ]

  const selectedCountryData = countries.find((c) => c.code === selectedCountry)

  const language = {
    US: "en",
    CA: "en",
    AR: "es",
    PY: "es",
    UY: "es",
    BO: "es",
    BR: "pt",
    MX: "es",
    OT: "en",
  }[selectedCountry]

  const countryLanguageMap = {
    US: "en",
    CA: "en",
    AR: "es",
    PY: "es",
    UY: "es",
    BO: "es",
    BR: "pt",
    MX: "es",
    OT: "en",
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-colors min-w-[70px] justify-center"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">{language.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto min-w-[120px]">
          {countries.map((country) => {
            const lang = countryLanguageMap[country.code]
            const langNames = {
              en: "English",
              es: "Español",
              pt: "Português",
            }

            return (
              <button
                key={country.code}
                onClick={() => {
                  onCountryChange(country.code)
                  setIsOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors ${
                  selectedCountry === country.code ? "bg-green-50 text-green-700" : "text-gray-700"
                }`}
              >
                <span className="text-sm">{country.flag}</span>
                <span className="text-sm font-medium">{langNames[lang]}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
