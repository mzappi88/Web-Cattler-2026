# Configuración de Google Maps API

## Error: InvalidKeyMapError

Si estás viendo el error `InvalidKeyMapError`, significa que necesitas configurar una API key válida de Google Maps.

## Pasos para resolver el error:

### 1. Obtener una API Key de Google Maps

1. **Ve a Google Cloud Console:**

   - Abre [https://console.cloud.google.com/](https://console.cloud.google.com/)

2. **Crea o selecciona un proyecto:**

   - Si no tienes un proyecto, crea uno nuevo
   - Si ya tienes uno, selecciónalo

3. **Habilita la API de Google Maps JavaScript:**

   - En el menú lateral, ve a "APIs y servicios" > "Biblioteca"
   - Busca "Maps JavaScript API"
   - Haz clic en "Habilitar"

4. **Crea una API Key:**
   - Ve a "APIs y servicios" > "Credenciales"
   - Haz clic en "Crear credenciales" > "Clave de API"
   - Copia la API key generada

### 2. Configurar la API Key en el proyecto

1. **Crea el archivo de variables de entorno:**

   - En la raíz del proyecto, crea un archivo llamado `.env.local`
   - **IMPORTANTE:** Este archivo NO debe subirse a Git (ya está en .gitignore)

2. **Agrega la API key al archivo:**

   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
   ```

   Reemplaza `tu_api_key_aqui` con la API key que copiaste de Google Cloud Console.

3. **Reinicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

### 3. Verificar la configuración

- Ve a `/pricing/forms/form1-annual-AR`
- Deberías ver el mapa de Google Maps en lugar del mensaje de error
- El mapa debe estar centrado en Argentina

## Restricciones de seguridad (Recomendado)

Para mayor seguridad, puedes restringir tu API key:

1. **Restricciones de aplicación:**

   - En Google Cloud Console, ve a "Credenciales"
   - Haz clic en tu API key
   - En "Restricciones de aplicación", selecciona "Sitios web HTTP"
   - Agrega tu dominio (ej: `localhost:3000`, `tudominio.com`)

2. **Restricciones de API:**
   - En "Restricciones de API", selecciona "Restringir clave"
   - Selecciona "Maps JavaScript API"

## Solución de problemas

### Error: "This API project is not authorized to use this API"

- Asegúrate de que la API de Maps JavaScript esté habilitada
- Verifica que estés usando el proyecto correcto

### Error: "RefererNotAllowedMapError"

- Agrega tu dominio a las restricciones de aplicación
- Para desarrollo local, agrega `localhost:3000`

### El mapa no se carga

- Verifica que el archivo `.env.local` esté en la raíz del proyecto
- Asegúrate de que la variable se llame exactamente `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Reinicia el servidor después de crear/modificar el archivo `.env.local`

## Estructura del archivo .env.local

```
# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Otras variables de entorno pueden ir aquí
# NEXT_PUBLIC_OTRA_VARIABLE=valor
```

## Notas importantes

- ✅ El archivo `.env.local` está en `.gitignore` por seguridad
- ✅ La variable debe empezar con `NEXT_PUBLIC_` para ser accesible en el cliente
- ✅ Reinicia el servidor después de cambiar variables de entorno
- ❌ Nunca subas tu API key a Git o repositorios públicos

