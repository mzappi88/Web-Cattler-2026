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
  const [hubspotFormReady, setHubspotFormReady] = useState(false);
  const [hubspotScriptLoaded, setHubspotScriptLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const hubspotFormRef = useRef<any>(null);

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
        }
      });

      // Actualizar coordenadas al hacer clic en el mapa
      map.addListener("click", (event: any) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        marker.setPosition({ lat, lng });
        setCoordinates({ lat, lng });
      });

      setMapLoaded(true);
    }
  };

  const updateHubSpotForm = (lat: number, lng: number) => {
    console.log("🗺️ Actualizando formulario HubSpot con coordenadas:", {
      lat,
      lng,
    });

    if (!hubspotFormReady) {
      console.log("⏳ Formulario de HubSpot aún no está listo, guardando coordenadas...");
      return;
    }

    // Función para intentar actualizar los campos
    const tryUpdateFields = (attempt: number = 1, maxAttempts: number = 10) => {
      if (attempt > maxAttempts) {
        console.log("❌ No se pudieron actualizar los campos después de múltiples intentos");
        return;
      }

      try {
        // Buscar en el contenedor del formulario
        const container = document.getElementById("hubspot-form-container");
        if (!container) {
          console.log(`⏳ Intento ${attempt}: Contenedor no encontrado, reintentando...`);
          setTimeout(() => tryUpdateFields(attempt + 1, maxAttempts), 500);
          return;
        }

        // Lista más completa de posibles nombres de campos
        const possibleLatNames = [
          "feedyard_geolocation",
          "feedyard_geolocation_latitude",
          "latitude",
          "lat",
          "geolocation_lat",
          "feedlot_latitude",
          "latitud",
          "coordenada_lat",
          "ubicacion_lat",
          "geolocation",
        ];

        const possibleLngNames = [
          "feedyard_longitude",
          "feedyard_geolocation_longitude",
          "longitude",
          "lng",
          "long",
          "geolocation_lng",
          "feedlot_longitude",
          "longitud",
          "coordenada_lng",
          "ubicacion_lng",
        ];

        // Buscar campos en el contenedor y en iframes
        let latField: HTMLInputElement | null = null;
        let lngField: HTMLInputElement | null = null;

        // Buscar en el contenedor principal
        const allInputs = container.querySelectorAll('input, textarea, select');
        console.log(`🔍 Intento ${attempt}: ${allInputs.length} campos encontrados en contenedor`);

        allInputs.forEach((field: any) => {
          const name = (field.name || field.id || "").toLowerCase();
          const label = field.closest("label")?.textContent?.toLowerCase() || "";
          const placeholder = (field.placeholder || "").toLowerCase();
          const ariaLabel = (field.getAttribute("aria-label") || "").toLowerCase();
          const allText = `${name} ${label} ${placeholder} ${ariaLabel}`;

          if (!latField && possibleLatNames.some((latName) => 
            allText.includes(latName.toLowerCase())
          )) {
            latField = field;
            console.log("✅ Campo de latitud encontrado:", { name, id: field.id, label });
          }

          if (!lngField && possibleLngNames.some((lngName) => 
            allText.includes(lngName.toLowerCase())
          )) {
            lngField = field;
            console.log("✅ Campo de longitud encontrado:", { name, id: field.id, label });
          }
        });

        // Si no se encontraron, buscar en iframes
        if ((!latField || !lngField) && container.querySelectorAll("iframe").length > 0) {
          console.log("🔍 Buscando campos en iframes...");
          const iframes = container.querySelectorAll("iframe");
          iframes.forEach((iframe) => {
            try {
              const iframeDoc = (iframe as HTMLIFrameElement).contentDocument || 
                              (iframe as HTMLIFrameElement).contentWindow?.document;
              if (iframeDoc) {
                const iframeInputs = iframeDoc.querySelectorAll('input, textarea, select');
                iframeInputs.forEach((field: any) => {
                  const name = (field.name || field.id || "").toLowerCase();
                  const label = field.closest("label")?.textContent?.toLowerCase() || "";
                  const allText = `${name} ${label}`;

                  if (!latField && possibleLatNames.some((latName) => 
                    allText.includes(latName.toLowerCase())
                  )) {
                    latField = field;
                    console.log("✅ Campo de latitud encontrado en iframe:", name);
                  }

                  if (!lngField && possibleLngNames.some((lngName) => 
                    allText.includes(lngName.toLowerCase())
                  )) {
                    lngField = field;
                    console.log("✅ Campo de longitud encontrado en iframe:", name);
                  }
                });
              }
            } catch (e) {
              // Ignorar errores de CORS
            }
          });
        }

        // Actualizar campos encontrados
        let updated = false;

        if (latField) {
          latField.value = lat.toString();
          // Disparar múltiples eventos
          ["input", "change", "blur", "keyup"].forEach((eventType) => {
            latField?.dispatchEvent(new Event(eventType, { bubbles: true, cancelable: true }));
          });
          // También usar setAttribute
          if (latField.setAttribute) {
            latField.setAttribute("value", lat.toString());
          }
          console.log("✅ Latitud actualizada:", lat);
          updated = true;
        }

        if (lngField) {
          lngField.value = lng.toString();
          // Disparar múltiples eventos
          ["input", "change", "blur", "keyup"].forEach((eventType) => {
            lngField?.dispatchEvent(new Event(eventType, { bubbles: true, cancelable: true }));
          });
          // También usar setAttribute
          if (lngField.setAttribute) {
            lngField.setAttribute("value", lng.toString());
          }
          console.log("✅ Longitud actualizada:", lng);
          updated = true;
        }

        if (!updated && attempt < maxAttempts) {
          console.log(`⏳ Reintentando en ${attempt * 500}ms...`);
          setTimeout(() => tryUpdateFields(attempt + 1, maxAttempts), attempt * 500);
        } else if (!updated) {
          // Mostrar todos los campos para debugging
          console.log("⚠️ No se encontraron los campos de coordenadas. Listando todos los campos:");
          allInputs.forEach((field: any, index: number) => {
            console.log(`${index + 1}. Name: "${field.name}", ID: "${field.id}", Type: "${field.type}", Label: "${field.closest('label')?.textContent}"`);
          });
        }
      } catch (error) {
        console.error("❌ Error al actualizar formulario HubSpot:", error);
        if (attempt < maxAttempts) {
          setTimeout(() => tryUpdateFields(attempt + 1, maxAttempts), attempt * 500);
        }
      }
    };

    // Intentar actualizar inmediatamente y con delays
    tryUpdateFields(1, 10);
    setTimeout(() => tryUpdateFields(1, 5), 1000);
    setTimeout(() => tryUpdateFields(1, 5), 3000);
  };

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  // Cargar formulario de HubSpot cuando el script esté listo
  useEffect(() => {
    if (!hubspotScriptLoaded || hubspotFormReady) {
      return;
    }

    const loadHubSpotForm = () => {
      if (
        typeof window !== "undefined" &&
        window.hbspt &&
        formContainerRef.current &&
        !hubspotFormReady
      ) {
        console.log("📝 Creando formulario de HubSpot...");

        try {
          console.log("📝 Configuración del formulario:", {
            region: "na1",
            portalId: "21027761",
            formId: "ea7db311-17cb-4c33-868d-a1b30739551d",
            target: "#hubspot-form-container",
          });

          window.hbspt.forms.create({
            region: "na1",
            portalId: "21027761",
            formId: "ea7db311-17cb-4c33-868d-a1b30739551d",
            target: "#hubspot-form-container",
            onFormReady: ($form: any) => {
              console.log("✅ Formulario de HubSpot listo!", $form);
              if ($form && $form.length > 0) {
                hubspotFormRef.current = $form[0];
                setHubspotFormReady(true);

                // Si ya hay coordenadas, actualizarlas
                if (coordinates) {
                  setTimeout(() => {
                    updateHubSpotForm(coordinates.lat, coordinates.lng);
                  }, 500);
                }
              } else {
                console.error("❌ El formulario no se creó correctamente, $form está vacío");
              }
            },
            onFormSubmitted: () => {
              console.log("✅ Formulario enviado exitosamente");
            },
            onFormError: (error: any) => {
              console.error("❌ Error en formulario HubSpot:", error);
              console.error("❌ Detalles del error:", {
                message: error?.message,
                error: error,
                portalId: "21027761",
                formId: "ea7db311-17cb-4c33-868d-a1b30739551d",
              });
              // Mostrar mensaje al usuario
              if (formContainerRef.current) {
                formContainerRef.current.innerHTML = `
                  <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p class="text-yellow-800 font-semibold mb-2">Error al cargar el formulario</p>
                    <p class="text-yellow-700 text-sm">
                      No se pudo cargar el formulario de HubSpot. Por favor, verifica que el formulario esté configurado correctamente.
                    </p>
                    <p class="text-yellow-600 text-xs mt-2">
                      Error: ${error?.message || "Error desconocido"}
                    </p>
                  </div>
                `;
              }
            },
          });
        } catch (error: any) {
          console.error("❌ Error al crear formulario HubSpot:", error);
          console.error("❌ Stack trace:", error?.stack);
          if (formContainerRef.current) {
            formContainerRef.current.innerHTML = `
              <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-red-800 font-semibold mb-2">Error al cargar el formulario</p>
                <p class="text-red-700 text-sm">
                  Hubo un error al intentar cargar el formulario. Por favor, recarga la página.
                </p>
              </div>
            `;
          }
        }
      } else {
        if (typeof window === "undefined") {
          console.log("⏳ Esperando window...");
        } else if (!window.hbspt) {
          console.log("⏳ Esperando script de HubSpot...");
        } else if (!formContainerRef.current) {
          console.log("⏳ Esperando contenedor del formulario...");
        } else if (hubspotFormReady) {
          console.log("✅ Formulario ya está listo");
        }
      }
    };

    // Intentar cargar inmediatamente
    loadHubSpotForm();

    // Intentar múltiples veces con delays progresivos
    const timeouts = [
      setTimeout(loadHubSpotForm, 500),
      setTimeout(loadHubSpotForm, 1000),
      setTimeout(loadHubSpotForm, 2000),
    ];

    return () => {
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hubspotScriptLoaded, hubspotFormReady]);

  // Actualizar coordenadas en el formulario cuando cambien
  useEffect(() => {
    if (hubspotFormReady && coordinates) {
      updateHubSpotForm(coordinates.lat, coordinates.lng);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates, hubspotFormReady]);

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

              <div ref={formContainerRef} id="hubspot-form-container" />
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
        src="//js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ Script de HubSpot cargado");
          setHubspotScriptLoaded(true);
        }}
        onError={(e) => {
          console.error("❌ Error al cargar script de HubSpot:", e);
        }}
      />
    </div>
  );
}
