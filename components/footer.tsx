"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function Footer() {
  const { t, selectedCountry } = useTranslation();

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

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
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
                  selectedCountry === "OT-ES"
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
                  selectedCountry === "OT-ES"
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
                selectedCountry === "OT-EN" ||
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
                selectedCountry === "OT-EN" ||
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
              <p>2125 Transformation Drive</p>
              <p>Suite 1000</p>
              <p>Lincoln, NE 68508</p>
              <p className="pt-2">(531) 234-5882</p>
              <p>
                <a
                  href="mailto:support@cattler.farm"
                  className="hover:text-white"
                >
                  support@cattler.farm
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2022 by Cattler Corporation. {t("footer.allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
