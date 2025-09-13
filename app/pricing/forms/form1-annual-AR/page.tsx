"use client";

import React, { useEffect, useState, useRef } from "react";
import Script from "next/script";

// Declarar tipos para Google Maps y HubSpot
declare global {
  interface Window {
    google: any;
    hbspt?: {
      forms: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
          onFormReady?: () => void;
          onFormSubmitted?: () => void;
          onFormError?: (error: any) => void;
        }) => void;
      };
    };
  }
}

export default function Form1AnnualAR() {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  // Coordenadas por defecto de Argentina (Buenos Aires)
  const defaultCenter = { lat: -34.6037, lng: -58.3816 };

  useEffect(() => {
    if (scriptLoaded && mapRef.current && !mapLoaded) {
      initializeMap();
    }
  }, [scriptLoaded, mapLoaded]);

  const initializeMap = () => {
    if (typeof window !== "undefined" && window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 6,
        center: defaultCenter,
        mapTypeId: "roadmap",
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      mapInstanceRef.current = map;

      // Crear marcador inicial
      const marker = new window.google.maps.Marker({
        position: defaultCenter,
        map: map,
        draggable: true,
        title: "Ubicación del Feedlot",
      });

      markerRef.current = marker;

      // Actualizar coordenadas cuando se mueve el marcador
      marker.addListener("dragend", () => {
        const position = marker.getPosition();
        if (position) {
          const lat = position.lat();
          const lng = position.lng();
          setCoordinates({ lat, lng });
          updateHubSpotForm(lat, lng);
        }
      });

      // Actualizar coordenadas al hacer clic en el mapa
      map.addListener("click", (event: any) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        marker.setPosition({ lat, lng });
        setCoordinates({ lat, lng });
        updateHubSpotForm(lat, lng);
      });

      setMapLoaded(true);
    }
  };

  const updateHubSpotForm = (lat: number, lng: number) => {
    console.log("🗺️ Actualizando formulario HubSpot con coordenadas:", {
      lat,
      lng,
    });

    // Esperar a que el formulario de HubSpot esté listo
    setTimeout(() => {
      if (typeof window !== "undefined" && window.hbspt) {
        // Buscar todos los campos de entrada en el formulario de HubSpot
        const allInputs = document.querySelectorAll(
          'input[type="text"], input[type="number"], input[type="hidden"]'
        );
        console.log(
          "🔍 Campos encontrados en el formulario:",
          allInputs.length
        );

        // Buscar campos por diferentes nombres posibles
        const possibleLatNames = [
          "feedyard_geolocation",
          "feedyard_geolocation_latitude",
          "latitude",
          "lat",
          "geolocation_lat",
          "feedlot_latitude",
        ];

        const possibleLngNames = [
          "feedyard_longitude",
          "feedyard_geolocation_longitude",
          "longitude",
          "lng",
          "lng",
          "geolocation_lng",
          "feedlot_longitude",
        ];

        let latField: HTMLInputElement | null = null;
        let lngField: HTMLInputElement | null = null;

        // Buscar campos por nombre
        allInputs.forEach((input) => {
          const inputElement = input as HTMLInputElement;
          const name = inputElement.name || inputElement.id || "";
          const placeholder = inputElement.placeholder || "";

          console.log("🔍 Campo encontrado:", {
            name,
            placeholder,
            type: inputElement.type,
          });

          // Buscar campo de latitud
          if (
            possibleLatNames.some(
              (latName) =>
                name.toLowerCase().includes(latName.toLowerCase()) ||
                placeholder.toLowerCase().includes("latitud") ||
                placeholder.toLowerCase().includes("latitude")
            )
          ) {
            latField = inputElement;
            console.log("✅ Campo de latitud encontrado:", name);
          }

          // Buscar campo de longitud
          if (
            possibleLngNames.some(
              (lngName) =>
                name.toLowerCase().includes(lngName.toLowerCase()) ||
                placeholder.toLowerCase().includes("longitud") ||
                placeholder.toLowerCase().includes("longitude")
            )
          ) {
            lngField = inputElement;
            console.log("✅ Campo de longitud encontrado:", name);
          }
        });

        // Actualizar campos encontrados
        if (latField) {
          (latField as HTMLInputElement).value = lat.toString();
          (latField as HTMLInputElement).dispatchEvent(
            new Event("change", { bubbles: true })
          );
          (latField as HTMLInputElement).dispatchEvent(
            new Event("input", { bubbles: true })
          );
          console.log("✅ Latitud actualizada:", lat);
        } else {
          console.log("❌ Campo de latitud no encontrado");
        }

        if (lngField) {
          (lngField as HTMLInputElement).value = lng.toString();
          (lngField as HTMLInputElement).dispatchEvent(
            new Event("change", { bubbles: true })
          );
          (lngField as HTMLInputElement).dispatchEvent(
            new Event("input", { bubbles: true })
          );
          console.log("✅ Longitud actualizada:", lng);
        } else {
          console.log("❌ Campo de longitud no encontrado");
        }

        // Si no se encontraron campos, mostrar todos los campos disponibles
        if (!latField && !lngField) {
          console.log("🔍 Todos los campos disponibles:");
          allInputs.forEach((input, index) => {
            const inputElement = input as HTMLInputElement;
            console.log(
              `${index + 1}. Name: "${inputElement.name}", ID: "${
                inputElement.id
              }", Placeholder: "${inputElement.placeholder}"`
            );
          });
        }
      }
    }, 2000); // Aumentar el tiempo de espera
  };

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  // Verificar si la API key está configurada
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const hasApiKey = apiKey && apiKey !== "YOUR_ACTUAL_API_KEY";

  // Debug: mostrar información de la API key
  console.log("🔑 API Key Debug:", {
    apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : "undefined",
    hasApiKey,
    env: process.env.NODE_ENV,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Formulario 1 - Plan Anual - Argentina
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mapa */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Ubicación del Feedlot
              </h2>
              <p className="text-gray-600 mb-4 text-sm">
                Haz clic en el mapa o arrastra el marcador para seleccionar la
                ubicación exacta de tu feedlot.
              </p>

              {!hasApiKey ? (
                <div className="w-full h-96 rounded-lg border border-gray-300 bg-gray-100 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-yellow-600 mb-4">
                      <svg
                        className="w-12 h-12 mx-auto"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      API Key de Google Maps requerida
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Para mostrar el mapa, necesitas configurar una API key de
                      Google Maps.
                    </p>
                    <div className="bg-gray-50 p-3 rounded text-left text-xs text-gray-700">
                      <p className="font-semibold mb-1">
                        Pasos para configurar:
                      </p>
                      <ol className="list-decimal list-inside space-y-1">
                        <li>
                          Crea un archivo <code>.env.local</code> en la raíz del
                          proyecto
                        </li>
                        <li>
                          Agrega:{" "}
                          <code>
                            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key
                          </code>
                        </li>
                        <li>Reinicia el servidor de desarrollo</li>
                      </ol>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    ref={mapRef}
                    className="w-full h-96 rounded-lg border border-gray-300"
                    style={{ minHeight: "400px" }}
                  />

                  {coordinates && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Coordenadas seleccionadas:</strong>
                      </p>
                      <p className="text-sm text-blue-700">
                        Latitud: {coordinates.lat.toFixed(6)}
                      </p>
                      <p className="text-sm text-blue-700">
                        Longitud: {coordinates.lng.toFixed(6)}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Formulario de HubSpot */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Información del Feedlot
              </h2>
              <p className="text-gray-600 mb-4 text-sm">
                Completa la información de tu feedlot. Las coordenadas se
                llenarán automáticamente desde el mapa.
              </p>

              <div
                className="hs-form-frame"
                data-region="na1"
                data-form-id="ea7db311-17cb-4c33-868d-a1b30739551d"
                data-portal-id="21027761"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scripts */}
      {hasApiKey && (
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          onLoad={handleScriptLoad}
          strategy="afterInteractive"
        />
      )}
      <Script
        src="https://js.hsforms.net/forms/embed/21027761.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
