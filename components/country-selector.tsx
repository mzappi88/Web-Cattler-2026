"use client"

import { useState } from "react"
import { ChevronDown, Globe } from "lucide-react"
import type { Country } from "@/hooks/use-translation"

interface CountrySelectorProps {
  selectedCountry: Country
  onCountryChange: (country: Country) => void
  t: (key: string) => string
}

export function CountrySelector({ selectedCountry, onCountryChange, t }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors min-w-[180px]"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <span className="text-lg">{selectedCountryData?.flag}</span>
        <span className="text-sm font-medium text-gray-700 flex-1 text-left">{t(`countries.${selectedCountry}`)}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => {
                onCountryChange(country.code)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                selectedCountry === country.code ? "bg-blue-50 text-blue-700" : "text-gray-700"
              }`}
            >
              <span className="text-lg">{country.flag}</span>
              <span className="text-sm font-medium">{t(`countries.${country.code}`)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
