"use client";

import { useEffect } from "react";

export function ClientScripts() {
  useEffect(() => {
    // Google Tag Manager - Conditional Loading
    const hostname = window.location.hostname;

    // Determine which GTM container to use
    let gtmId = null;

    // Case 1: Direct access to cattler.farm
    if (hostname === "cattler.farm") {
      gtmId = "GTM-MM57STLM";
      console.log("🌍 Loading GTM for cattler.farm");
    }
    // Case 2: Direct access to cattler.com.ar
    else if (hostname === "cattler.com.ar") {
      gtmId = "GTM-TNCF2F2Q";
      console.log("🌍 Loading GTM for cattler.com.ar");
    }
    // Case 3: Default fallback
    else {
      // Use cattler.farm as default
      gtmId = "GTM-MM57STLM";
      console.log("🌍 Loading default GTM (cattler.farm)");
    }

    // Load the appropriate GTM container
    if (gtmId) {
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
