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

// 0. DETECCIÓN POR IFRAME PADRE (Solo para países NO mapeados)
function detectCountryFromIframe(): Country | null {
  if (typeof window === 'undefined') return null;
  
  const referrer = document.referrer || '';
  const hostname = window.location.hostname;
  
  console.log("🌍 Iframe detection debug:", {
    referrer,
    hostname,
    referrerIncludes: referrer.includes('cattler.com.ar'),
    hostnameIncludes: hostname.includes('cattler.com.ar')
  });
  
  // Detect if we're embedded in Cattler.com.ar (Always Spanish for non-mapped countries)
  const isCattlerComAr = 
    hostname.includes('cattler.com.ar') ||
    referrer.includes('cattler.com.ar');
    
  // Detect if we're embedded in Cattler.agr.br (Always Portuguese for non-mapped countries)
  const isCattlerAgrBr = 
    hostname.includes('cattler.agr.br') ||
    referrer.includes('cattler.agr.br');
  
  console.log("🌍 Iframe detection results:", {
    isCattlerComAr,
    isCattlerAgrBr
  });
  
  if (isCattlerComAr) {
    console.log("🌍 Iframe parent detected: cattler.com.ar - forcing Spanish for non-mapped countries");
    return "OT$ES"; // Force Spanish for cattler.com.ar (only for non-mapped countries)
  }
  
  if (isCattlerAgrBr) {
    console.log("🌍 Iframe parent detected: cattler.agr.br - forcing Portuguese for non-mapped countries");
    return "BR"; // Force Portuguese for cattler.agr.br (only for non-mapped countries)
  }
  
  // cattler.farm - No force, use normal country detection
  console.log("🌍 No iframe parent detected or cattler.farm (use normal detection)");
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

// 4. MÚLTIPLES APIs DE IP (Más Robusto)
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
    }
  ];
  
  for (const api of apis) {
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
      // First, try normal country detection for mapped countries
      console.log("🌍 Starting normal country detection...");
      
      let finalCountry: Country | null = null;
      
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
      
      // 3. Try multiple IP APIs
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
        const now = Date.now();
        saveCountryIfNotAdmin(finalCountry);
        return;
      }
      
      // For non-mapped countries, check iframe detection
      console.log("🌍 Non-mapped country, checking iframe detection...");
      const iframeCountry = detectCountryFromIframe();
      if (iframeCountry) {
        console.log("🌍 Iframe parent detection success:", iframeCountry);
        setDetectedCountry(iframeCountry);
        setIsDetecting(false);
        hasDetected.current = true;
        
        // Cache the iframe result
        saveCountryIfNotAdmin(iframeCountry);
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
