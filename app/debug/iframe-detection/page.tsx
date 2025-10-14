"use client";

import { useIframeDetection } from "@/hooks/use-iframe-detection";
import { useCountryDetection } from "@/hooks/use-country-detection";
import { useTranslation } from "@/hooks/use-translation";
import { useState, useEffect } from "react";

export default function IframeDetectionDebugPage() {
  const iframeDetection = useIframeDetection();
  const { detectedCountry, isDetecting } = useCountryDetection();
  const { selectedCountry, language } = useTranslation();
  const [userAgent, setUserAgent] = useState("Loading...");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserAgent(window.navigator.userAgent);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🔍 Iframe Detection Debug
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Iframe Detection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📱 Iframe Detection
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">In Iframe:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    iframeDetection.isInIframe
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {iframeDetection.isInIframe ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Is Wix:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    iframeDetection.isWix
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {iframeDetection.isWix ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Platform:</span>
                <span className="px-2 py-1 rounded bg-purple-100 text-purple-800">
                  {iframeDetection.platform}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Parent Domain:</span>
                <span className="text-sm text-gray-600">
                  {iframeDetection.parentDomain || "N/A"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Cattler.com.ar:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    iframeDetection.isCattlerComAr
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {iframeDetection.isCattlerComAr ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Cattler.farm:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    iframeDetection.isCattlerFarm
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {iframeDetection.isCattlerFarm ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Cattler.agr.br:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    iframeDetection.isCattlerAgrBr
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {iframeDetection.isCattlerAgrBr ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Country Detection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              🌍 Country Detection
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Detected Country:</span>
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                  {detectedCountry || "None"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Selected Country:</span>
                <span className="px-2 py-1 rounded bg-green-100 text-green-800">
                  {selectedCountry}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Language:</span>
                <span className="px-2 py-1 rounded bg-purple-100 text-purple-800">
                  {language}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium">Is Detecting:</span>
                <span
                  className={`px-2 py-1 rounded ${
                    isDetecting
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {isDetecting ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              🔧 Technical Details
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Hostname:</span>
                <span className="ml-2 text-gray-600">
                  {iframeDetection.hostname}
                </span>
              </div>
              <div>
                <span className="font-medium">Referrer:</span>
                <span className="ml-2 text-gray-600 break-all">
                  {iframeDetection.referrer || "None"}
                </span>
              </div>
              <div>
                <span className="font-medium">User Agent:</span>
                <span className="ml-2 text-gray-600 text-xs break-all">
                  {userAgent}
                </span>
              </div>
            </div>
          </div>

          {/* Redirect URLs */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              🔗 Redirect URLs & Language Logic
            </h2>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Iframe Detection Priority:</span>
                <div className="mt-2 p-3 bg-blue-50 rounded text-sm space-y-1">
                  {iframeDetection.isCattlerComAr && (
                    <div className="text-green-700 font-medium">
                      ✅ cattler.com.ar detected → FORCE Spanish (OT$ES)
                    </div>
                  )}
                  {iframeDetection.isCattlerAgrBr && (
                    <div className="text-orange-700 font-medium">
                      ✅ cattler.agr.br detected → FORCE Portuguese (BR)
                    </div>
                  )}
                  {iframeDetection.isCattlerFarm && (
                    <div className="text-blue-700 font-medium">
                      ✅ cattler.farm detected → Use normal country detection
                    </div>
                  )}
                  {!iframeDetection.isCattlerComAr &&
                    !iframeDetection.isCattlerFarm &&
                    !iframeDetection.isCattlerAgrBr && (
                      <div className="text-gray-600">
                        → Use country-based detection (geolocation, timezone,
                        IP, browser language)
                      </div>
                    )}
                </div>
              </div>

              <div>
                <span className="font-medium">Current Detection Result:</span>
                <div className="mt-1 p-2 bg-gray-50 rounded text-sm">
                  <div className="font-medium">
                    Country: {selectedCountry} | Language: {language}
                  </div>
                  {iframeDetection.isCattlerComAr && (
                    <div className="text-green-600 text-xs">
                      🎯 Iframe parent forces Spanish regardless of user
                      location
                    </div>
                  )}
                  {iframeDetection.isCattlerAgrBr && (
                    <div className="text-orange-600 text-xs">
                      🎯 Iframe parent forces Portuguese regardless of user
                      location
                    </div>
                  )}
                  {iframeDetection.isCattlerFarm && (
                    <div className="text-blue-600 text-xs">
                      🎯 Iframe parent uses normal country detection
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
