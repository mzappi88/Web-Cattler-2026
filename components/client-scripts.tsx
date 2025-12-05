"use client";

import { useEffect } from "react";

export function ClientScripts() {
  useEffect(() => {
    // Google Tag Manager is loaded in layout.tsx (GTM-MM57STLM)
    // No additional GTM loading needed here

    // Microsoft Clarity - Single ID for all domains
    const clarityId = "k8xq8q8q8q";

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
  }, []);

  return null;
}
