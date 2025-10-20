# Configuración de GTM para Wix con iframe

## Problema

Cuando la página está embebida en un iframe de Wix, el código JavaScript no puede acceder directamente al `dataLayer` del sitio padre.

## Solución implementada

El código ahora detecta si está en iframe de Wix y envía los eventos de conversión usando `postMessage`.

## Código para agregar en Wix

### 1. En el Custom Code del sitio Wix (cattler.farm)

Agrega este código en el **Custom Code** de tu sitio Wix:

```javascript
// Escuchar eventos de conversión desde el iframe
window.addEventListener("message", function (event) {
  // Verificar que el mensaje viene del iframe correcto
  if (event.data && event.data.type === "CattlerConversion") {
    console.log("🎯 Received conversion event from iframe:", event.data);

    // Enviar evento a GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: event.data.event,
        event_category: event.data.data.event_category,
        event_label: event.data.data.event_label,
        form_type: event.data.data.form_type,
        page_location: event.data.data.page_location,
        page_title: event.data.data.page_title,
        country: event.data.data.country,
        language: event.data.data.language,
        value: event.data.data.value,
        currency: event.data.data.currency,
        timestamp: event.data.data.timestamp,
      });

      console.log("✅ Event sent to GTM dataLayer");
    } else {
      console.error("❌ dataLayer not found on parent window");
    }
  }
});
```

### 2. Verificar que GTM esté configurado en Wix

Asegúrate de que tu GTM (GTM-MM57STLM) esté correctamente configurado en el sitio Wix.

### 3. Testing

1. Abre la consola del navegador en cattler.farm/landing
2. Envía el formulario
3. Deberías ver estos logs:
   - `🎯 Form submitted - iframe detection:`
   - `📤 Sending conversion event to parent window (Wix)`
   - `🎯 Received conversion event from iframe:`
   - `✅ Event sent to GTM dataLayer`

## Alternativa: GTM en el iframe

Si no puedes modificar el código de Wix, también puedes:

1. **Agregar GTM directamente en el iframe** (en tu dominio)
2. **Usar Google Analytics directo** en lugar de GTM
3. **Configurar un webhook** que se active cuando se envíe el formulario

## Debugging

Para verificar que funciona:

1. Abre DevTools → Console
2. Envía el formulario
3. Busca los logs que empiezan con 🎯, 📤, 📊
4. En GTM Preview, deberías ver los eventos `form_submit` y `conversion`
