"use client";

import { useEffect } from "react";

export function ClientScripts() {
  useEffect(() => {
    // Google Tag Manager - Conditional Loading
    const hostname = window.location.hostname;
    const referrer = document.referrer || "";
    const isInIframe = window !== window.top;

    // Determine which GTM container to use
    let gtmId = null;

    // Case 1: Direct access to cattler.farm
    if (hostname === "cattler.farm") {
      gtmId = "GTM-MM57STLM";
      console.log("🌍 Loading GTM for cattler.farm (direct access)");
    }
    // Case 2: Direct access to cattler.com.ar
    else if (hostname === "cattler.com.ar") {
      gtmId = "GTM-TNCF2F2Q";
      console.log("🌍 Loading GTM for cattler.com.ar (direct access)");
    }
    // Case 3: Iframe from cattler.com.ar
    else if (isInIframe && referrer.includes("cattler.com.ar")) {
      gtmId = "GTM-TNCF2F2Q";
      console.log("🌍 Loading GTM for cattler.com.ar (iframe)");
    }
    // Case 4: Iframe from cattler.farm
    else if (isInIframe && referrer.includes("cattler.farm")) {
      gtmId = "GTM-MM57STLM";
      console.log("🌍 Loading GTM for cattler.farm (iframe)");
    }
    // Case 5: Default fallback (no iframe, no specific domain)
    else if (!isInIframe) {
      // Use cattler.farm as default for direct access
      gtmId = "GTM-MM57STLM";
      console.log("🌍 Loading default GTM (cattler.farm)");
    }
    // Case 6: Iframe from unknown source - don't load any GTM
    else {
      console.log("🌍 No GTM loaded (unknown iframe source)");
      return;
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
      (function (c: any, l: any, a: any, r: any, i: any, t: any, y: any) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
      })(window, document, "clarity", "script", clarityId);

      console.log("✅ Clarity loaded:", clarityId);
    }

    // Auto-resize iframe for Wix
    function resizeIframe() {
      if (window.parent && window.parent !== window) {
        const height = document.documentElement.scrollHeight;
        window.parent.postMessage(
          {
            type: "resize",
            height: height,
          },
          "*"
        );
      }
    }

    // Wait for DOM to be ready before setting up observers
    function setupResizeObservers() {
      if (!document.body) {
        // If body is not ready, wait a bit and try again
        setTimeout(setupResizeObservers, 50);
        return;
      }

      // Resize on load and when content changes
      window.addEventListener("load", resizeIframe);
      window.addEventListener("resize", resizeIframe);

      // Use ResizeObserver to detect content changes
      if (window.ResizeObserver && document.body) {
        try {
          const resizeObserver = new ResizeObserver(() => {
            setTimeout(resizeIframe, 100);
          });
          resizeObserver.observe(document.body);
        } catch (error) {
          console.warn("ResizeObserver error:", error);
        }
      }

      // Also resize when DOM changes
      try {
        const mutationObserver = new MutationObserver(() => {
          setTimeout(resizeIframe, 100);
        });
        mutationObserver.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
        });
      } catch (error) {
        console.warn("MutationObserver error:", error);
      }

      // Initial resize
      setTimeout(resizeIframe, 100);
    }

    // Start setup when DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupResizeObservers);
    } else {
      setupResizeObservers();
    }
  }, []);

  return null;
}
