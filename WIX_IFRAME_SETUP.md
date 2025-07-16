# Configuración del iframe en Wix

## Problema

Cuando se coloca la aplicación en un iframe de Wix, el contenido no se ajusta automáticamente a la altura del iframe, causando que el footer quede fuera de la vista.

## Solución Implementada

### 1. Auto-resize del iframe

La aplicación ahora incluye un sistema automático de redimensionamiento que:

- Detecta cuando está dentro de un iframe
- Calcula la altura total del contenido
- Envía mensajes al padre (Wix) para ajustar la altura del iframe
- Se ejecuta automáticamente cuando el contenido cambia

### 2. Configuración en Wix

#### Opción A: Usando HTML Personalizado

1. En Wix, agrega un elemento "HTML Personalizado"
2. Usa este código:

```html
<iframe
  id="cattler-iframe"
  src="TU_URL_AQUI"
  style="width: 100%; border: none; overflow: hidden;"
  scrolling="no"
>
</iframe>

<script>
  // Escuchar mensajes de resize desde el iframe
  window.addEventListener("message", function (event) {
    if (event.data.type === "resize") {
      const iframe = document.getElementById("cattler-iframe");
      if (iframe) {
        iframe.style.height = event.data.height + "px";
      }
    }
  });
</script>
```

#### Opción B: Usando Velo (Wix Code)

1. En Wix, ve a "Configuración del sitio" > "Velo by Wix"
2. En la página donde quieres el iframe, agrega este código:

```javascript
import wixWindow from "wix-window";

// En el evento onReady de la página
export function page_onReady() {
  // Crear el iframe dinámicamente
  const iframe = document.createElement("iframe");
  iframe.src = "TU_URL_AQUI";
  iframe.style.width = "100%";
  iframe.style.border = "none";
  iframe.style.overflow = "hidden";
  iframe.scrolling = "no";

  // Escuchar mensajes de resize
  window.addEventListener("message", function (event) {
    if (event.data.type === "resize") {
      iframe.style.height = event.data.height + "px";
    }
  });

  // Agregar el iframe al contenedor
  const container = document.getElementById("cattler-container");
  if (container) {
    container.appendChild(iframe);
  }
}
```

### 3. Configuración CSS Adicional

Para asegurar que el iframe se vea correctamente, agrega estos estilos CSS en Wix:

```css
/* Contenedor del iframe */
.cattler-iframe-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* El iframe mismo */
#cattler-iframe {
  width: 100%;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Características del Sistema

### Detección Automática

- Detecta automáticamente si está dentro de un iframe
- Solo envía mensajes cuando es necesario

### Resize Inteligente

- Se ejecuta al cargar la página
- Se ejecuta cuando cambia el contenido
- Se ejecuta cuando cambia el tamaño de la ventana
- Usa ResizeObserver para detectar cambios de contenido
- Usa MutationObserver para detectar cambios en el DOM

### Compatibilidad

- Funciona con navegadores modernos
- Fallback para navegadores que no soportan ResizeObserver
- Timeout de seguridad para evitar loops infinitos

## Troubleshooting

### El iframe no se redimensiona

1. Verifica que el código JavaScript esté correctamente implementado en Wix
2. Asegúrate de que el iframe tenga `scrolling="no"`
3. Verifica la consola del navegador para errores

### El contenido se corta

1. Asegúrate de que el contenedor del iframe tenga suficiente ancho
2. Verifica que no haya CSS que limite la altura del iframe

### Problemas de rendimiento

1. El sistema incluye timeouts para evitar demasiadas actualizaciones
2. Los observadores se limpian automáticamente cuando el componente se desmonta

## Notas Importantes

- La URL del iframe debe ser la URL completa de tu aplicación desplegada
- El sistema funciona mejor con contenido estático
- Para contenido dinámico, el resize se ejecuta automáticamente
- El sistema es compatible con todas las funcionalidades de la aplicación (pricing, traducciones, etc.)
