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

    // Wait for DOM to be ready before setting up observers
    function setupObservers() {
      if (!document.body) {
        // If body is not ready, wait a bit and try again
        setTimeout(setupObservers, 50);
        return;
      }

      // Resize on load and when content changes
      window.addEventListener("load", resizeIframe);
      window.addEventListener("resize", resizeIframe);

      // Use ResizeObserver to detect content changes
      let resizeObserver: ResizeObserver | null = null;
      if (window.ResizeObserver && document.body) {
        try {
          resizeObserver = new ResizeObserver(() => {
            setTimeout(resizeIframe, 100);
          });
          resizeObserver.observe(document.body);
        } catch (error) {
          console.warn("ResizeObserver error:", error);
        }
      }

      // Also resize when DOM changes
      let mutationObserver: MutationObserver | null = null;
      try {
        mutationObserver = new MutationObserver(() => {
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

      // Cleanup function
      return () => {
        window.removeEventListener("load", resizeIframe);
        window.removeEventListener("resize", resizeIframe);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        if (mutationObserver) {
          mutationObserver.disconnect();
        }
      };
    }

    // Start setup when DOM is ready
    let cleanup: (() => void) | undefined;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        cleanup = setupObservers();
      });
    } else {
      cleanup = setupObservers();
    }

    // Return cleanup function
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}
