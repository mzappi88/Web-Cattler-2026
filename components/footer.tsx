"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function Footer() {
  const { t, selectedCountry, language } = useTranslation();

  // Custom TikTok icon since it's not in Lucide
  const TikTok = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-tiktok"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
    </svg>
  );

  // Helper function to get contact info based on country and language
  const getContactInfo = () => {
    // For ES-AR only, show the specific address
    if (selectedCountry === "AR" && language === "es-ar") {
      return {
        address: (
          <>
            <p>Teniente Benjamín Matienzo 3132</p>
            <p>CABA, Argentina - CP 1426</p>
          </>
        ),
        phone: "+549 11 5929 5601",
        email: "ventas@cattler.farm",
      };
    }

    // For ES, ES-AR, and PT, show the new phone and email
    if (language === "es" || language === "es-ar" || language === "pt") {
      return {
        address: (
          <>
            <p>2125 Transformation Drive</p>
            <p>Suite 1000</p>
            <p>Lincoln, NE 68508</p>
          </>
        ),
        phone: "+549 11 5929 5601",
        email: "ventas@cattler.farm",
      };
    }

    // Default for English
    return {
      address: (
        <>
          <p>2125 Transformation Drive</p>
          <p>Suite 1000</p>
          <p>Lincoln, NE 68508</p>
        </>
      ),
      phone: "+1(531) 234-5882",
      email: "support@cattler.farm",
    };
  };

  // Helper function to get link URLs based on language
  const getLinkUrls = () => {
    if (language === "es" || language === "es-ar") {
      return {
        terms: "https://www.cattler.com.ar/terminos",
        privacy: "https://www.cattler.com.ar/privacy-policy",
        contact: "https://www.cattler.com.ar/contact",
      };
    } else if (language === "pt") {
      return {
        terms: "https://www.cattler.farm/terms",
        privacy: "https://www.cattler.farm/privacy-policy",
        contact: "https://www.cattler.agr.br/contato",
      };
    } else {
      return {
        terms: "https://www.cattler.farm/terms",
        privacy: "https://www.cattler.farm/privacy-policy",
        contact: "https://www.cattler.farm/contact",
      };
    }
  };

  const contactInfo = getContactInfo();
  const linkUrls = getLinkUrls();

  return (
    <footer
      className="bg-transparent text-white pt-12 pb-6"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <img
              src="/Cattler-black.png"
              alt="Cattler"
              className="h-10 mb-6 invert"
            />
            <p className="text-gray-400 mb-6">
              {t("footer.companyDescription")}
            </p>
            <div className="flex space-x-4">
              <a
                href={
                  selectedCountry === "AR" ||
                  selectedCountry === "PY" ||
                  selectedCountry === "UY" ||
                  selectedCountry === "BO" ||
                  selectedCountry === "MX" ||
                  selectedCountry === "OT$ES"
                    ? "https://www.instagram.com/cattler_ar"
                    : selectedCountry === "BR"
                    ? "https://www.instagram.com/cattler_us"
                    : "https://www.instagram.com/cattler_us"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href={
                  selectedCountry === "AR" ||
                  selectedCountry === "PY" ||
                  selectedCountry === "UY" ||
                  selectedCountry === "BO" ||
                  selectedCountry === "MX" ||
                  selectedCountry === "OT$ES"
                    ? "https://x.com/CattlerLatam"
                    : selectedCountry === "BR"
                    ? "https://www.twitter.com/cattler2"
                    : "https://www.twitter.com/cattler2"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCqUE87diFowfBqLC3L-vC-A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href="https://linkedin.com/company/cattler-corporation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              {(selectedCountry === "US" ||
                selectedCountry === "CA" ||
                selectedCountry === "OT$EN" ||
                selectedCountry === "BR") && (
                <a
                  href="https://www.facebook.com/cattler.farm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              {(selectedCountry === "US" ||
                selectedCountry === "CA" ||
                selectedCountry === "OT$EN" ||
                selectedCountry === "BR") && (
                <a
                  href="https://www.tiktok.com/@cattler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <TikTok />
                  <span className="sr-only">TikTok</span>
                </a>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.contactUs")}
            </h3>
            <address className="not-italic text-gray-400 space-y-3">
              {contactInfo.address}
              <p className="pt-2">{contactInfo.phone}</p>
              <p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-white"
                >
                  {contactInfo.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Links Section */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start space-x-6">
              <Link
                href={linkUrls.terms}
                className="text-gray-400 hover:text-white text-sm"
              >
                {t("footer.termsConditions")}
              </Link>
              <Link
                href={linkUrls.privacy}
                className="text-gray-400 hover:text-white text-sm"
              >
                {t("footer.privacyPolicy")}
              </Link>
              <Link
                href={linkUrls.contact}
                className="text-gray-400 hover:text-white text-sm"
              >
                {language === "es-ar" ? "Contáctanos" : t("footer.contact")}
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2022 by Cattler Corporation. {t("footer.allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
