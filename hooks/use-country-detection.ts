"use client";

import { useEffect, useState, useRef } from "react";
import type { Country } from "@/hooks/use-translation";

// Lista de países de habla hispana
const spanishSpeakingCountries = [
  "ES", "CO", "PE", "VE", "CL", "EC", "GT", "CU", "BO", "DO", 
  "HN", "PY", "SV", "NI", "CR", "PA", "UY", "GQ", "MX", "AR", "CH"
];

// Lista de países de habla inglesa
const englishSpeakingCountries = [
  "GB", "AU", "NZ", "IE", "ZA", "IN", "PK", "NG", "KE", "UG", 
  "TZ", "ZW", "ZM", "MW", "BW", "NA", "SZ", "LS", "US", "CA"
];

// Lista de países mapeados que deben mantener su detección normal
const mappedCountries = ["CL", "BO", "PY", "UY", "AR", "MX", "BR"];

// 0. DETECCIÓN POR IFRAME PADRE Y DOMINIO
function detectIframeDomain(): "cattler.agr.br" | "cattler.com.ar" | "cattler.farm" | null {
  if (typeof window === 'undefined') return null;
  
  const referrer = document.referrer || '';
  const hostname = window.location.hostname;
  const isInIframe = window !== window.top;
  
  // Check if we're in a Wix iframe
  const isWix = 
    hostname.includes("wix") ||
    hostname.includes("wixsite") ||
    referrer.includes("wix");
  
  if (!isInIframe || !isWix) {
    return null;
  }
  
  console.log("🌍 Iframe detection debug:", {
    referrer,
    hostname,
    isInIframe,
    isWix
  });
  
  // Check for cattler.agr.br (any URL starting with www.cattler.agr.br)
  if (hostname.includes('cattler.agr.br') || referrer.includes('cattler.agr.br')) {
    console.log("🌍 Iframe detected: cattler.agr.br");
    return "cattler.agr.br";
  }
  
  // Check for cattler.com.ar (any URL starting with www.cattler.com.ar)
  if (hostname.includes('cattler.com.ar') || referrer.includes('cattler.com.ar')) {
    console.log("🌍 Iframe detected: cattler.com.ar");
    return "cattler.com.ar";
  }
  
  // Check for cattler.farm
  if (hostname.includes('cattler.farm') || referrer.includes('cattler.farm')) {
    console.log("🌍 Iframe detected: cattler.farm");
    return "cattler.farm";
  }
  
  return null;
}

// 1. GEOLOCALIZACIÓN DEL NAVEGADOR (Más Preciso)
async function detectCountryFromGeolocation(): Promise<Country | null> {
  if (typeof window === 'undefined' || !navigator.geolocation) return null;
  
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log("🌍 Geolocation coordinates:", { latitude, longitude });
          
          // Use reverse geocoding to get country
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          
          console.log("🌍 Reverse geocoding result:", data);
          
          if (data.countryCode) {
            const countryCode = data.countryCode.toUpperCase();
            console.log("🌍 Geolocation detected country:", countryCode);
            resolve(countryCode as Country);
          } else {
            resolve(null);
          }
        } catch (error) {
          console.warn("🌍 Geolocation reverse geocoding failed:", error);
          resolve(null);
        }
      },
      (error) => {
        console.warn("🌍 Geolocation failed:", error);
        resolve(null);
      },
      {
        timeout: 5000,
        enableHighAccuracy: false,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

// 2. DETECCIÓN POR TIMEZONE (Mejor que solo idioma)
function detectCountryFromTimezone(): Country | null {
  if (typeof window === 'undefined') return null;
  
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log("🌍 Browser timezone:", timezone);
  
  // Mapeo de timezones a países
  const timezoneCountryMap: Record<string, Country> = {
    // Argentina
    "America/Argentina/Buenos_Aires": "AR",
    "America/Buenos_Aires": "AR",
    "America/Argentina/Cordoba": "AR",
    "America/Argentina/Rosario": "AR",
    "America/Argentina/Mendoza": "AR",
    "America/Argentina/La_Rioja": "AR",
    "America/Argentina/San_Juan": "AR",
    "America/Argentina/Tucuman": "AR",
    "America/Argentina/Catamarca": "AR",
    "America/Argentina/Jujuy": "AR",
    "America/Argentina/Salta": "AR",
    "America/Argentina/Santiago_del_Estero": "AR",
    
    // Brasil
    "America/Sao_Paulo": "BR",
    "America/Rio_Branco": "BR",
    "America/Manaus": "BR",
    "America/Recife": "BR",
    "America/Bahia": "BR",
    "America/Fortaleza": "BR",
    "America/Maceio": "BR",
    "America/Aracaju": "BR",
    "America/Sergipe": "BR",
    "America/Alagoas": "BR",
    "America/Pernambuco": "BR",
    "America/Paraiba": "BR",
    "America/Rio_Grande_do_Norte": "BR",
    "America/Ceara": "BR",
    "America/Piaui": "BR",
    "America/Maranhao": "BR",
    "America/Para": "BR",
    "America/Amapa": "BR",
    "America/Roraima": "BR",
    "America/Rondonia": "BR",
    "America/Acre": "BR",
    "America/Campo_Grande": "BR",
    "America/Cuiaba": "BR",
    "America/Goiania": "BR",
    "America/Brasilia": "BR",
    "America/Vitoria": "BR",
    "America/Espirito_Santo": "BR",
    "America/Rio_de_Janeiro": "BR",
    "America/Santarem": "BR",
    "America/Belem": "BR",
    "America/Boa_Vista": "BR",
    "America/Porto_Velho": "BR",
    "America/Porto_Alegre": "BR",
    "America/Santa_Catarina": "BR",
    "America/Curitiba": "BR",
    "America/Sao_Luis": "BR",
    "America/Teresina": "BR",
    "America/Joao_Pessoa": "BR",
    "America/Natal": "BR",
    "America/Fortaleza": "BR",
    "America/Maceio": "BR",
    "America/Aracaju": "BR",
    "America/Sergipe": "BR",
    "America/Alagoas": "BR",
    "America/Pernambuco": "BR",
    "America/Paraiba": "BR",
    "America/Rio_Grande_do_Norte": "BR",
    "America/Ceara": "BR",
    "America/Piaui": "BR",
    "America/Maranhao": "BR",
    "America/Para": "BR",
    "America/Amapa": "BR",
    "America/Roraima": "BR",
    "America/Rondonia": "BR",
    "America/Acre": "BR",
    "America/Campo_Grande": "BR",
    "America/Cuiaba": "BR",
    "America/Goiania": "BR",
    "America/Brasilia": "BR",
    "America/Vitoria": "BR",
    "America/Espirito_Santo": "BR",
    "America/Rio_de_Janeiro": "BR",
    "America/Santarem": "BR",
    "America/Belem": "BR",
    "America/Boa_Vista": "BR",
    "America/Porto_Velho": "BR",
    "America/Porto_Alegre": "BR",
    "America/Santa_Catarina": "BR",
    "America/Curitiba": "BR",
    "America/Sao_Luis": "BR",
    "America/Teresina": "BR",
    "America/Joao_Pessoa": "BR",
    "America/Natal": "BR",
    
    // México
    "America/Mexico_City": "MX",
    "America/Cancun": "MX",
    "America/Merida": "MX",
    "America/Monterrey": "MX",
    "America/Tijuana": "MX",
    "America/Chihuahua": "MX",
    "America/Hermosillo": "MX",
    "America/Mazatlan": "MX",
    "America/Bahia_Banderas": "MX",
    "America/Ciudad_Juarez": "MX",
    "America/Matamoros": "MX",
    "America/Ojinaga": "MX",
    "America/Saltillo": "MX",
    "America/Tampico": "MX",
    "America/Veracruz": "MX",
    "America/Villahermosa": "MX",
    "America/Chetumal": "MX",
    "America/Cozumel": "MX",
    "America/Isla_Mujeres": "MX",
    "America/Playa_del_Carmen": "MX",
    "America/Puerto_Vallarta": "MX",
    "America/Acapulco": "MX",
    "America/Guadalajara": "MX",
    "America/Leon": "MX",
    "America/Puebla": "MX",
    "America/Queretaro": "MX",
    "America/San_Luis_Potosi": "MX",
    "America/Toluca": "MX",
    "America/Zacatecas": "MX",
    "America/Aguascalientes": "MX",
    "America/Campeche": "MX",
    "America/Campeche": "MX",
    "America/Chiapas": "MX",
    "America/Colima": "MX",
    "America/Durango": "MX",
    "America/Guanajuato": "MX",
    "America/Guerrero": "MX",
    "America/Hidalgo": "MX",
    "America/Jalisco": "MX",
    "America/Michoacan": "MX",
    "America/Morelos": "MX",
    "America/Nayarit": "MX",
    "America/Nuevo_Leon": "MX",
    "America/Oaxaca": "MX",
    "America/Queretaro": "MX",
    "America/Quintana_Roo": "MX",
    "America/San_Luis_Potosi": "MX",
    "America/Sinaloa": "MX",
    "America/Sonora": "MX",
    "America/Tabasco": "MX",
    "America/Tamaulipas": "MX",
    "America/Tlaxcala": "MX",
    "America/Veracruz": "MX",
    "America/Yucatan": "MX",
    "America/Zacatecas": "MX",
    
    // Chile
    "America/Santiago": "CH",
    "America/Punta_Arenas": "CH",
    "Pacific/Easter": "CH",
    
    // Paraguay
    "America/Asuncion": "PY",
    
    // Uruguay
    "America/Montevideo": "UY",
    
    // Bolivia
    "America/La_Paz": "BO",
    "America/Cochabamba": "BO",
    "America/Santa_Cruz": "BO",
    
    // Canadá
    "America/Toronto": "CA",
    "America/Vancouver": "CA",
    "America/Edmonton": "CA",
    "America/Winnipeg": "CA",
    "America/Halifax": "CA",
    "America/St_Johns": "CA",
    "America/Goose_Bay": "CA",
    "America/Glace_Bay": "CA",
    "America/Moncton": "CA",
    "America/Blanc-Sablon": "CA",
    "America/Atikokan": "CA",
    "America/Cambridge_Bay": "CA",
    "America/Creston": "CA",
    "America/Dawson": "CA",
    "America/Dawson_Creek": "CA",
    "America/Fort_Nelson": "CA",
    "America/Inuvik": "CA",
    "America/Iqaluit": "CA",
    "America/Moncton": "CA",
    "America/Nipigon": "CA",
    "America/Pangnirtung": "CA",
    "America/Rainy_River": "CA",
    "America/Rankin_Inlet": "CA",
    "America/Resolute": "CA",
    "America/St_Johns": "CA",
    "America/Swift_Current": "CA",
    "America/Thunder_Bay": "CA",
    "America/Toronto": "CA",
    "America/Vancouver": "CA",
    "America/Whitehorse": "CA",
    "America/Winnipeg": "CA",
    "America/Yellowknife": "CA",
    
    // Estados Unidos
    "America/New_York": "US",
    "America/Chicago": "US",
    "America/Denver": "US",
    "America/Los_Angeles": "US",
    "America/Anchorage": "US",
    "America/Honolulu": "US",
    "America/Detroit": "US",
    "America/Indiana/Indianapolis": "US",
    "America/Indiana/Knox": "US",
    "America/Indiana/Marengo": "US",
    "America/Indiana/Petersburg": "US",
    "America/Indiana/Tell_City": "US",
    "America/Indiana/Vevay": "US",
    "America/Indiana/Vincennes": "US",
    "America/Indiana/Winamac": "US",
    "America/Kentucky/Louisville": "US",
    "America/Kentucky/Monticello": "US",
    "America/Los_Angeles": "US",
    "America/Menominee": "US",
    "America/Metlakatla": "US",
    "America/New_York": "US",
    "America/Nome": "US",
    "America/Sitka": "US",
    "America/Yakutat": "US",
    "Pacific/Honolulu": "US"
  };
  
  // Buscar coincidencia exacta
  if (timezoneCountryMap[timezone]) {
    console.log("🌍 Timezone exact match:", timezone, "→", timezoneCountryMap[timezone]);
    return timezoneCountryMap[timezone];
  }
  
  // Buscar coincidencia parcial
  for (const [tz, country] of Object.entries(timezoneCountryMap)) {
    if (timezone.includes(tz.split('/')[1])) { // Comparar solo la parte del país
      console.log("🌍 Timezone partial match:", timezone, "→", country);
      return country;
    }
  }
  
  console.log("🌍 No timezone match found for:", timezone);
  return null;
}

// 3. DETECCIÓN POR IDIOMA DEL NAVEGADOR (Fallback)
function detectCountryFromBrowserLanguage(): Country {
  if (typeof window === 'undefined') return "OT$EN";
  
  const browserLanguage = navigator.language.toLowerCase();
  console.log("🌍 Browser language:", browserLanguage);
  
  // Check for specific Spanish-speaking countries
  if (browserLanguage.startsWith("es-ar")) {
    console.log("🌍 Browser language is es-AR, setting to AR");
    return "AR";
  } else if (browserLanguage.startsWith("pt")) {
    console.log("🌍 Browser language is Portuguese, setting to BR");
    return "BR";
  } else if (browserLanguage.startsWith("es")) {
    console.log("🌍 Browser language is Spanish, setting OT$ES");
    return "OT$ES";
  } else {
    console.log("🌍 Browser language is not Spanish/Portuguese, setting OT$EN");
    return "OT$EN";
  }
}

// 4. DETECCIÓN POR API PROPIA (Más confiable - usa IP del servidor)
async function detectCountryFromOwnAPI(): Promise<Country | null> {
  try {
    console.log("🌍 Trying own API route...");
    const response = await fetch("/api/country", {
      signal: AbortSignal.timeout(3000)
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.country_code) {
        console.log("🌍 Own API detected:", data.country_code);
        return data.country_code.toUpperCase() as Country;
      }
    }
  } catch (error) {
    console.warn("🌍 Own API failed:", error);
  }
  
  return null;
}

// 5. MÚLTIPLES APIs DE IP (Más Robusto) - Ahora en paralelo
async function detectCountryFromMultipleIPs(): Promise<Country | null> {
  const apis = [
    {
      name: "ipapi.co",
      url: "https://ipapi.co/json/",
      parser: (data: any) => data.country_code
    },
    {
      name: "ip-api.com",
      url: "http://ip-api.com/json/",
      parser: (data: any) => data.status === 'success' ? data.countryCode : null
    },
    {
      name: "ipinfo.io",
      url: "https://ipinfo.io/json",
      parser: (data: any) => data.country
    },
    {
      name: "ipgeolocation.io",
      url: "https://api.ipgeolocation.io/ipgeo?apiKey=free",
      parser: (data: any) => data.country_code2
    },
    {
      name: "ipwho.is",
      url: "https://ipwho.is/",
      parser: (data: any) => data.success ? data.country_code : null
    }
  ];
  
  // Try own API first (most reliable)
  const ownApiResult = await detectCountryFromOwnAPI();
  if (ownApiResult) {
    return ownApiResult;
  }
  
  // Try other APIs in parallel for faster detection
  const promises = apis.map(async (api) => {
    try {
      console.log(`🌍 Trying ${api.name}...`);
      const response = await fetch(api.url, {
        signal: AbortSignal.timeout(3000)
      });
      
      if (response.ok) {
        const data = await response.json();
        const countryCode = api.parser(data);
        
        if (countryCode) {
          console.log(`🌍 ${api.name} detected:`, countryCode);
          return countryCode.toUpperCase() as Country;
        }
      }
    } catch (error) {
      console.warn(`🌍 ${api.name} failed:`, error);
    }
    return null;
  });
  
  const results = await Promise.allSettled(promises);
  
  // Get first successful result
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      return result.value;
    }
  }
  
  return null;
}

// 6. DETECCIÓN POR URL PARAMETER (Override manual)
function detectCountryFromURL(): Country | null {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  const countryParam = urlParams.get('country');
  
  if (countryParam) {
    const validCountries: Country[] = ["US", "CA", "AR", "PY", "UY", "BO", "BR", "MX", "CH", "OT$EN", "OT$ES"];
    const upperCountry = countryParam.toUpperCase() as Country;
    
    if (validCountries.includes(upperCountry)) {
      console.log("🌍 Country from URL parameter:", upperCountry);
      return upperCountry;
    }
  }
  
  return null;
}

// Utility function to clear country detection cache
export function clearCountryDetectionCache() {
  if (typeof window === 'undefined') return;
  
  // Clear all possible cache keys
  localStorage.removeItem("cattler-country");
  localStorage.removeItem("cattler-country-last-detection");
  localStorage.removeItem("cattler-country-detected");
  
  // Clear any old cache keys that might exist
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.includes("cattler")) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
  
  console.log("🌍 Country detection cache cleared completely");
}

// Helper function to check if we're in admin mode
function isAdminMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem("cattler-admin-mode") === "true";
}

// Helper function to save country only if not in admin mode
function saveCountryIfNotAdmin(country: Country): void {
  if (!isAdminMode()) {
    const now = Date.now();
    localStorage.setItem("cattler-country", country);
    localStorage.setItem("cattler-country-last-detection", now.toString());
    console.log("🌍 Country saved to localStorage:", country);
  } else {
    console.log("🌍 Admin mode active - NOT saving country to localStorage");
  }
}

export function useCountryDetection() {
  const [detectedCountry, setDetectedCountry] = useState<Country | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);
  const hasDetected = useRef(false);

  useEffect(() => {
    // Ensure we're on client side
    if (typeof window === 'undefined') {
      return;
    }

    // Only prevent multiple detections if we already have a result
    if (hasDetected.current && detectedCountry) {
      return;
    }

    const detectCountry = async () => {
      // First, check iframe domain detection (highest priority for Wix iframes)
      const iframeDomain = detectIframeDomain();
      
      // 1. If in cattler.agr.br iframe → Always BR (PT), never EN, ES or ES-AR
      if (iframeDomain === "cattler.agr.br") {
        console.log("🌍 Iframe cattler.agr.br detected - forcing BR (PT)");
        setDetectedCountry("BR");
        setIsDetecting(false);
        hasDetected.current = true;
        saveCountryIfNotAdmin("BR");
        return;
      }
      
      // 2. If in cattler.com.ar iframe → ES or ES-AR based on detected country, never PT or EN
      if (iframeDomain === "cattler.com.ar") {
        console.log("🌍 Iframe cattler.com.ar detected - detecting country for ES/ES-AR");
        
        let detectedCountryForES: Country | null = null;
        
        // Try to detect the actual country
        const geolocationCountry = await detectCountryFromGeolocation();
        if (geolocationCountry) {
          detectedCountryForES = geolocationCountry;
        }
        
        if (!detectedCountryForES) {
          const timezoneCountry = detectCountryFromTimezone();
          if (timezoneCountry) {
            detectedCountryForES = timezoneCountry;
          }
        }
        
        if (!detectedCountryForES) {
          // Try own API first
          const ownApiCountry = await detectCountryFromOwnAPI();
          if (ownApiCountry) {
            detectedCountryForES = ownApiCountry;
          }
        }
        
        if (!detectedCountryForES) {
          const ipCountry = await detectCountryFromMultipleIPs();
          if (ipCountry) {
            detectedCountryForES = ipCountry;
          }
        }
        
        // If detected country is AR, use AR (ES-AR)
        // Otherwise use OT$ES (Spanish)
        if (detectedCountryForES === "AR") {
          console.log("🌍 Detected AR in cattler.com.ar iframe - using AR (ES-AR)");
          setDetectedCountry("AR");
        } else {
          console.log("🌍 Using OT$ES for cattler.com.ar iframe");
          setDetectedCountry("OT$ES");
        }
        
        setIsDetecting(false);
        hasDetected.current = true;
        saveCountryIfNotAdmin(detectedCountryForES === "AR" ? "AR" : "OT$ES");
        return;
      }
      
      // 3. If in cattler.farm iframe → Default US, CA→US, mapped countries use their country, Spanish-speaking non-mapped → OT$ES, others → OT$EN
      if (iframeDomain === "cattler.farm") {
        console.log("🌍 Iframe cattler.farm detected - detecting country");
        
        let finalCountry: Country | null = null;
        
        // Try geolocation
        const geolocationCountry = await detectCountryFromGeolocation();
        if (geolocationCountry) {
          finalCountry = geolocationCountry;
        }
        
        // Try timezone
        if (!finalCountry) {
          const timezoneCountry = detectCountryFromTimezone();
          if (timezoneCountry) {
            finalCountry = timezoneCountry;
          }
        }
        
        // Try own API first
        if (!finalCountry) {
          const ownApiCountry = await detectCountryFromOwnAPI();
          if (ownApiCountry) {
            finalCountry = ownApiCountry;
          }
        }
        
        // Try other IP APIs
        if (!finalCountry) {
          const ipCountry = await detectCountryFromMultipleIPs();
          if (ipCountry) {
            finalCountry = ipCountry;
          }
        }
        
        let selectedCountry: Country;
        
        // Default to US
        if (!finalCountry) {
          console.log("🌍 No country detected in cattler.farm iframe - using US (default)");
          selectedCountry = "US";
        } else if (finalCountry === "CA") {
          // CA → US
          console.log("🌍 CA detected in cattler.farm iframe - using US");
          selectedCountry = "US";
        } else if (mappedCountries.includes(finalCountry)) {
          // Mapped countries use their own country
          console.log("🌍 Mapped country detected in cattler.farm iframe:", finalCountry);
          selectedCountry = finalCountry as Country;
        } else if (spanishSpeakingCountries.includes(finalCountry)) {
          // Spanish-speaking non-mapped countries → OT$ES
          console.log("🌍 Spanish-speaking non-mapped country detected in cattler.farm iframe:", finalCountry, "- using OT$ES");
          selectedCountry = "OT$ES";
        } else {
          // Other non-mapped countries → OT$EN
          console.log("🌍 Other non-mapped country detected in cattler.farm iframe:", finalCountry, "- using OT$EN");
          selectedCountry = "OT$EN";
        }
        
        setDetectedCountry(selectedCountry);
        setIsDetecting(false);
        hasDetected.current = true;
        saveCountryIfNotAdmin(selectedCountry);
        return;
      }
      
      // Normal country detection (not in Wix iframe or not in any of the above domains)
      console.log("🌍 Starting normal country detection...");
      
      let finalCountry: Country | null = null;
      
      // 0. Check URL parameter first (manual override - highest priority)
      const urlCountry = detectCountryFromURL();
      if (urlCountry) {
        console.log("🌍 URL parameter override detected:", urlCountry);
        setDetectedCountry(urlCountry);
        setIsDetecting(false);
        hasDetected.current = true;
        saveCountryIfNotAdmin(urlCountry);
        return;
      }
      
      // 1. Try geolocation (most accurate for direct access)
      console.log("🌍 Step 1: Trying geolocation...");
      const geolocationCountry = await detectCountryFromGeolocation();
      if (geolocationCountry) {
        finalCountry = geolocationCountry;
        console.log("🌍 Geolocation success:", finalCountry);
      }
      
      // 2. Try timezone detection
      if (!finalCountry) {
        console.log("🌍 Step 2: Trying timezone detection...");
        const timezoneCountry = detectCountryFromTimezone();
        if (timezoneCountry) {
          finalCountry = timezoneCountry;
          console.log("🌍 Timezone detection success:", finalCountry);
        }
      }
      
      // 3. Try multiple IP APIs (includes own API and others in parallel)
      if (!finalCountry) {
        console.log("🌍 Step 3: Trying multiple IP APIs...");
        const ipCountry = await detectCountryFromMultipleIPs();
        if (ipCountry) {
          finalCountry = ipCountry;
          console.log("🌍 IP detection success:", finalCountry);
        }
      }
      
      // 4. Fallback to browser language
      if (!finalCountry) {
        console.log("🌍 Step 4: Using browser language fallback...");
        finalCountry = detectCountryFromBrowserLanguage();
        console.log("🌍 Browser language fallback:", finalCountry);
      }
      
      // Check if detected country is in mapped countries list
      const isMappedCountry = finalCountry && mappedCountries.includes(finalCountry);
      console.log("🌍 Detected country:", finalCountry, "Is mapped:", isMappedCountry);
      
      // If it's a mapped country, use normal detection result
      if (isMappedCountry) {
        console.log("🌍 Mapped country detected, using normal detection result:", finalCountry);
        setDetectedCountry(finalCountry);
        setIsDetecting(false);
        hasDetected.current = true;
        
        // Cache the result
        saveCountryIfNotAdmin(finalCountry);
        return;
      }
      
      // If we reach here, use the final country from normal detection
      if (finalCountry) {
        console.log("🌍 Using final country from normal detection:", finalCountry);
        setDetectedCountry(finalCountry);
        setIsDetecting(false);
        hasDetected.current = true;
        
        // Cache the result
        saveCountryIfNotAdmin(finalCountry);
      } else {
        console.log("🌍 No country detected, using fallback");
        const fallbackCountry = detectCountryFromBrowserLanguage();
        setDetectedCountry(fallbackCountry);
        setIsDetecting(false);
        hasDetected.current = true;
        
        // Cache the fallback result
        saveCountryIfNotAdmin(fallbackCountry);
      }
    }

    detectCountry();
  }, []);

  return { detectedCountry, isDetecting };
} 
