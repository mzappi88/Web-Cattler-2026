"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import type { Country } from "@/hooks/use-translation";
import { CountrySelector } from "@/components/country-selector";

export default function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>("US");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-1 md:py-2"
          : "bg-transparent py-2 md:py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/Cattler-black.png"
              alt="Cattler"
              className="h-8 md:h-10"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 font-medium text-sm lg:text-base"
            >
              {t("navigation.home")}
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-green-600 font-medium text-sm lg:text-base"
            >
              {t("navigation.pricing")}
            </Link>
            <Link
              href="/about_us"
              className="text-gray-700 hover:text-green-600 font-medium text-sm lg:text-base"
            >
              {t("navigation.aboutUs")}
            </Link>
            <a
              href="https://web.cattler.farm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-600 font-medium text-sm lg:text-base"
            >
              {t("navigation.login")}
            </a>
          </nav>

          {/* Contact and Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <div className="flex items-center mr-2 lg:mr-4">
              <Phone size={14} className="text-green-600 mr-1 lg:mr-2" />
              <span className="text-xs lg:text-sm font-medium">
                +1 (531) 234-5882
              </span>
            </div>
            {/* Country Selector - Hidden for production, only available in debug */}
            {/* <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            /> */}
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent text-xs lg:text-sm py-1 px-2 lg:py-2 lg:px-4"
              onClick={() => router.push("/demo")}
            >
              {t("navigation.requestDemo")}
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white text-xs lg:text-sm py-1 px-2 lg:py-2 lg:px-4"
              onClick={() => router.push("/pricing")}
            >
              {t("navigation.getStarted")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Country Selector - Hidden for production, only available in debug */}
            {/* <CountrySelector
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            /> */}
            <button onClick={toggleMenu} className="text-gray-700 p-1">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-3 pb-4 space-y-3 bg-white rounded-lg mt-2 shadow-lg">
            <Link
              href="/"
              className="block py-2 px-4 text-gray-700 hover:text-green-600 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("navigation.home")}
            </Link>
            <Link
              href="/pricing"
              className="block py-2 px-4 text-gray-700 hover:text-green-600 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("navigation.pricing")}
            </Link>
            <Link
              href="/about_us"
              className="block py-2 px-4 text-gray-700 hover:text-green-600 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("navigation.aboutUs")}
            </Link>
            <a
              href="https://web.cattler.farm/"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 px-4 text-gray-700 hover:text-green-600 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("navigation.login")}
            </a>
            <div className="flex items-center py-2 px-4">
              <Phone size={14} className="text-green-600 mr-2" />
              <span className="text-xs font-medium">+1 (531) 234-5882</span>
            </div>
            <div className="px-4 space-y-2">
              <Button
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent text-sm py-2"
                onClick={() => {
                  router.push("/demo");
                  setIsMenuOpen(false);
                }}
              >
                {t("navigation.requestDemo")}
              </Button>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2"
                onClick={() => {
                  router.push("/pricing");
                  setIsMenuOpen(false);
                }}
              >
                {t("navigation.getStarted")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
