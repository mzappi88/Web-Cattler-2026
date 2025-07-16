"use client";

import { useEffect } from "react";

export default function IframeResizer() {
  useEffect(() => {
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

    // Resize on load and when content changes
    window.addEventListener("load", resizeIframe);
    window.addEventListener("resize", resizeIframe);

    // Use ResizeObserver to detect content changes
    let resizeObserver: ResizeObserver | null = null;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        setTimeout(resizeIframe, 100);
      });
      resizeObserver.observe(document.body);
    }

    // Also resize when DOM changes
    const mutationObserver = new MutationObserver(() => {
      setTimeout(resizeIframe, 100);
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // Initial resize
    setTimeout(resizeIframe, 100);

    // Cleanup
    return () => {
      window.removeEventListener("load", resizeIframe);
      window.removeEventListener("resize", resizeIframe);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      mutationObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}
