"use client";

import { useEffect } from "react";

export function ClientScripts() {
  useEffect(() => {
    // Google Tag Manager - Conditional Loading
    // Note: GTM-MM57STLM is loaded in layout.tsx by default
    // This only loads GTM-TNCF2F2Q for cattler.com.ar
    const hostname = window.location.hostname;

    // Only load GTM if it's for cattler.com.ar (different GTM ID)
    if (hostname === "cattler.com.ar") {
      const gtmId = "GTM-TNCF2F2Q";
      console.log("🌍 Loading GTM for cattler.com.ar:", gtmId);
      
      // Check if GTM is already loaded
      const existingScript = document.querySelector(
        `script[src*="googletagmanager.com/gtm.js?id=${gtmId}"]`
      );
      
      if (!existingScript) {
        (function (w: any, d: any, s: any, l: any, i: any) {
          w[l] = w[l] || [];
          w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s) as HTMLScriptElement;
          var dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", gtmId);

        console.log("✅ GTM loaded:", gtmId);
      } else {
        console.log("✅ GTM already loaded:", gtmId);
      }
    } else {
      // For cattler.farm and other domains, GTM-MM57STLM is already loaded in layout.tsx
      console.log("🌍 Using GTM from layout.tsx (GTM-MM57STLM)");
    }

    // Microsoft Clarity - Conditional Loading
    const clarityId =
      hostname === "cattler.com.ar" ? "m8xq8q8q8q" : "k8xq8q8q8q";

    if (hostname === "cattler.com.ar" || hostname === "cattler.farm") {
      (function (c: any, l: any, a: any, r: any, i: any) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        const t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        const y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", clarityId);

      console.log("✅ Clarity loaded:", clarityId);
    }
  }, []);

  return null;
}
