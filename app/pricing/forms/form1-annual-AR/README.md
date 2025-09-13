# Formulario 1 - Plan Anual - Argentina

Esta página contiene un formulario de HubSpot integrado con un mapa interactivo de Google Maps para capturar la ubicación del feedlot.

## Características

- **Formulario de HubSpot**: Formulario específico para Argentina con ID `ea7db311-17cb-4c33-868d-a1b30739551d`
- **Mapa interactivo**: Permite al usuario seleccionar la ubicación exacta del feedlot
- **Integración automática**: Las coordenadas se llenan automáticamente en los campos del formulario
- **Responsive**: Diseño adaptativo para móviles y escritorio

## Configuración requerida

### 1. Google Maps API Key

Para que el mapa funcione, necesitas configurar una API key de Google Maps:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Maps JavaScript
4. Ve a "Credenciales" y crea una API key
5. Crea un archivo `.env.local` en la raíz del proyecto con:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
   ```
6. Reinicia el servidor de desarrollo (`npm run dev`)

### 2. Campos del formulario de HubSpot

El formulario debe tener los siguientes campos:

- `feedyard_geolocation`: Para la latitud
- `feedyard_longitude`: Para la longitud

## Funcionalidad

1. **Selección de ubicación**: El usuario puede hacer clic en el mapa o arrastrar el marcador
2. **Coordenadas automáticas**: Las coordenadas se muestran en tiempo real
3. **Integración con HubSpot**: Los campos se llenan automáticamente cuando se selecciona una ubicación
4. **Ubicación por defecto**: El mapa se centra en Buenos Aires, Argentina

## Estructura del código

- **Estado**: Maneja las coordenadas, carga del mapa y scripts
- **Referencias**: Usa useRef para el mapa, instancia del mapa y marcador
- **Efectos**: Inicializa el mapa cuando los scripts están cargados
- **Eventos**: Escucha clics en el mapa y arrastre del marcador

## Ruta

La página es accesible en: `/pricing/forms/form1-annual-AR`
