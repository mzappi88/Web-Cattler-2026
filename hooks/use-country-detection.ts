"use client";

import { useEffect, useState } from "react";
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

export function useCountryDetection() {
  const [detectedCountry, setDetectedCountry] = useState<Country | null>(null);
  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Intentar obtener la ubicación del usuario
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        
        const userCountryCode = data.country_code;
        
        // Verificar si el país está en la lista de países soportados
        const supportedCountries: Country[] = ["US", "CA", "AR", "PY", "UY", "BO", "BR", "MX"];
        
        if (supportedCountries.includes(userCountryCode as Country)) {
          setDetectedCountry(userCountryCode as Country);
        } else {
          // Si no está en la lista soportada, determinar el idioma
          if (spanishSpeakingCountries.includes(userCountryCode)) {
            setDetectedCountry("OT-ES");
          } else if (englishSpeakingCountries.includes(userCountryCode)) {
            setDetectedCountry("OT-EN");
          } else {
            // Para otros países, intentar detectar el idioma del navegador
            const browserLanguage = navigator.language.toLowerCase();
            if (browserLanguage.startsWith("es")) {
              setDetectedCountry("OT-ES");
            } else {
              setDetectedCountry("OT-EN");
            }
          }
        }
      } catch (error) {
        console.warn("Error detecting country:", error);
        // Fallback: usar el idioma del navegador
        const browserLanguage = navigator.language.toLowerCase();
        if (browserLanguage.startsWith("es")) {
          setDetectedCountry("OT-ES");
        } else {
          setDetectedCountry("OT-EN");
        }
      } finally {
        setIsDetecting(false);
      }
    };

    detectCountry();
  }, []);

  return { detectedCountry, isDetecting };
} 