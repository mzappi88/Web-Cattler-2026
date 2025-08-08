"use client";

import { useEffect, useState, useRef } from "react";
import type { Country } from "@/hooks/use-translation";

// Lista de países de habla hispana (excluyendo los que ya están en el selector)
const spanishSpeakingCountries = [
  "ES", // España
  "CO", // Colombia
  "PE", // Perú
  "VE", // Venezuela
  "CL", // Chile
  "EC", // Ecuador
  "GT", // Guatemala
  "CU", // Cuba
  "BO", // Bolivia (ya está en el selector)
  "DO", // República Dominicana
  "HN", // Honduras
  "PY", // Paraguay (ya está en el selector)
  "SV", // El Salvador
  "NI", // Nicaragua
  "CR", // Costa Rica
  "PA", // Panamá
  "UY", // Uruguay (ya está en el selector)
  "GQ", // Guinea Ecuatorial
  "MX", // México (ya está en el selector)
  "AR", // Argentina (ya está en el selector)
];

// Lista de países de habla inglesa (excluyendo los que ya están en el selector)
const englishSpeakingCountries = [
  "GB", // Reino Unido
  "AU", // Australia
  "NZ", // Nueva Zelanda
  "IE", // Irlanda
  "ZA", // Sudáfrica
  "IN", // India
  "PK", // Pakistán
  "NG", // Nigeria
  "KE", // Kenia
  "UG", // Uganda
  "TZ", // Tanzania
  "ZW", // Zimbabue
  "ZM", // Zambia
  "MW", // Malawi
  "BW", // Botsuana
  "NA", // Namibia
  "SZ", // Suazilandia
  "LS", // Lesoto
  "US", // Estados Unidos (ya está en el selector)
  "CA", // Canadá (ya está en el selector)
];

// Function to detect country using browser language as fallback
function detectCountryFromBrowser(): Country {
  if (typeof window === 'undefined') return "OT$EN";
  
  const browserLanguage = navigator.language.toLowerCase();
  console.log("🌍 Browser language:", browserLanguage);
  
  // Check for specific Spanish-speaking countries
  if (browserLanguage.startsWith("es-ar")) {
    console.log("🌍 Browser language is es-AR, setting to AR");
    return "AR";
  } else if (browserLanguage.startsWith("es")) {
    console.log("🌍 Browser language is Spanish, setting to OT$ES");
    return "OT$ES";
  } else {
    console.log("🌍 Browser language is not Spanish, setting to OT$EN");
    return "OT$EN";
  }
}

// Utility function to clear country detection cache
export function clearCountryDetectionCache() {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem("cattler-country");
  localStorage.removeItem("cattler-country-last-detection");
  localStorage.removeItem("cattler-country-detected");
  console.log("🌍 Country detection cache cleared");
}

export function useCountryDetection() {
  const [detectedCountry, setDetectedCountry] = useState<Country | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const hasDetected = useRef(false);

  useEffect(() => {
    // Prevent multiple detections and ensure we're on client side
    if (hasDetected.current || typeof window === 'undefined') {
      return;
    }

    const detectCountry = async () => {
      // Check if we already have a cached result
      const cachedCountry = localStorage.getItem("cattler-country");
      const lastDetection = localStorage.getItem("cattler-country-last-detection");
      const now = Date.now();
      
      // If we have a recent detection (within 24 hours), use cached result
      if (cachedCountry && lastDetection && (now - parseInt(lastDetection)) < 86400000) {
        console.log("🌍 Using cached country detection:", cachedCountry);
        setDetectedCountry(cachedCountry as Country);
        setIsDetecting(false);
        hasDetected.current = true;
        return;
      }

      try {
        console.log("🌍 Starting country detection...");
        
        // Try our own API route first (no CORS issues)
        let data;
        try {
          const response = await fetch("/api/country", {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
            signal: AbortSignal.timeout(5000)
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          data = await response.json();
          console.log("🌍 Our API Route Response:", data);
          
          if (!data.success) {
            console.log("🌍 API returned error, using fallback data:", data.fallback);
            // Use fallback data if available
            if (data.fallback && data.fallback.country_code) {
              data = data.fallback;
            } else {
              throw new Error(data.error || "API returned error");
            }
          }
        } catch (ourApiError) {
          console.warn("Our API failed, trying external API:", ourApiError);
          
          // Try external API as fallback
          try {
            const response = await fetch("https://ipapi.co/json/", {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
              },
              signal: AbortSignal.timeout(5000)
            });

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            data = await response.json();
            console.log("🌍 External API Response:", data);
          } catch (externalApiError) {
            console.warn("All APIs failed, using browser language:", externalApiError);
            throw new Error("All APIs failed");
          }
        }
        
        const userCountryCode = data.country_code;
        console.log("🌍 Country Code from API:", userCountryCode);
        console.log("🌍 Full API data:", data);
        
        // Verificar si el país está en la lista de países soportados
        const supportedCountries: Country[] = ["US", "CA", "AR", "PY", "UY", "BO", "BR", "MX"];
        
        console.log("🌍 Supported Countries:", supportedCountries);
        console.log("🌍 Is userCountryCode in supported countries?", supportedCountries.includes(userCountryCode as Country));
        
        let finalCountry: Country;
        
        if (supportedCountries.includes(userCountryCode as Country)) {
          console.log("🌍 Setting detected country to:", userCountryCode);
          finalCountry = userCountryCode as Country;
        } else {
          console.log("🌍 Country not in supported list, checking language...");
          // Si no está en la lista soportada, determinar el idioma
          if (spanishSpeakingCountries.includes(userCountryCode)) {
            console.log("🌍 Spanish speaking country detected, setting OT$ES");
            finalCountry = "OT$ES";
          } else if (englishSpeakingCountries.includes(userCountryCode)) {
            console.log("🌍 English speaking country detected, setting OT$EN");
            finalCountry = "OT$EN";
          } else {
            console.log("🌍 Using browser language as fallback");
            finalCountry = detectCountryFromBrowser();
          }
        }

        console.log("🌍 Final country decision:", finalCountry);

        // Special case: If we're in the US but got OT$EN, check browser language
        if (finalCountry === "OT$EN" && userCountryCode === "US") {
          console.log("🌍 Special case: US detected but got OT$EN, checking browser language...");
          const browserLanguage = navigator.language.toLowerCase();
          if (browserLanguage.startsWith("en")) {
            console.log("🌍 Browser language is English, setting to US");
            finalCountry = "US";
          }
        }

        console.log("🌍 Final country decision:", finalCountry);

        // Special case: If API returned US but user is likely in Argentina
        if (finalCountry === "US" && typeof window !== 'undefined') {
          const browserLanguage = navigator.language.toLowerCase();
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          console.log("🌍 Checking if user is actually in Argentina...");
          console.log("🌍 Browser language:", browserLanguage, "Timezone:", timezone);
          console.log("🌍 Is browser language Spanish?", browserLanguage.startsWith("es"));
          console.log("🌍 Is timezone from Argentina?", timezone.includes("America/Argentina") || timezone.includes("America/Buenos_Aires"));
          
          // If timezone is in Argentina, override to AR (regardless of browser language)
          if (timezone.includes("America/Argentina") || 
              timezone.includes("America/Buenos_Aires") ||
              timezone.includes("America/Cordoba") ||
              timezone.includes("America/Rosario") ||
              timezone.includes("America/Mendoza") ||
              timezone.includes("America/La_Rioja") ||
              timezone.includes("America/San_Juan") ||
              timezone.includes("America/Tucuman") ||
              timezone.includes("America/Catamarca") ||
              timezone.includes("America/Jujuy") ||
              timezone.includes("America/Salta") ||
              timezone.includes("America/Santiago_del_Estero")
          ) {
            console.log("🌍 Overriding to AR based on timezone (Argentina detected)");
            finalCountry = "AR";
          } else {
            console.log("🌍 Not overriding - timezone is not from Argentina");
          }
        } else {
          console.log("🌍 Not checking Argentina override - finalCountry is not US or window is undefined");
        }

        // Additional stability check: If we previously detected AR and are still in Argentina, keep AR
        const previousCountry = localStorage.getItem("cattler-country");
        if (previousCountry === "AR" && finalCountry !== "AR" && typeof window !== 'undefined') {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (timezone.includes("America/Argentina") || timezone.includes("America/Buenos_Aires")) {
            console.log("🌍 Stability check: Keeping AR as previously detected and still in Argentina");
            finalCountry = "AR";
          }
        }

        console.log("🌍 Final country decision after Argentina check:", finalCountry);

        // Cache the result
        localStorage.setItem("cattler-country", finalCountry);
        localStorage.setItem("cattler-country-last-detection", now.toString());
        
        // Log the final decision for debugging
        console.log("🌍 Final cached country:", finalCountry);
        console.log("🌍 Cache timestamp:", now);
        
        setDetectedCountry(finalCountry);
        hasDetected.current = true;
        
      } catch (error) {
        console.warn("Error detecting country:", error);
        
        // Final fallback: usar el idioma del navegador
        const fallbackCountry = detectCountryFromBrowser();
        
        console.log("🌍 Using browser language fallback:", fallbackCountry);
        
        // Cache the fallback result
        localStorage.setItem("cattler-country", fallbackCountry);
        localStorage.setItem("cattler-country-last-detection", now.toString());
        
        setDetectedCountry(fallbackCountry);
        hasDetected.current = true;
      } finally {
        setIsDetecting(false);
      }
    };

    detectCountry();
  }, []);

  return { detectedCountry, isDetecting };
} 