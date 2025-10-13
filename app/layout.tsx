import type { Metadata } from "next";
import "./globals.css";
import { TranslationProvider } from "@/hooks/TranslationProvider";
import Footer from "@/components/footer";
import IframeResizer from "@/components/iframe-resizer";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Microsoft Clarity */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "nk835onlfr");
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Auto-resize iframe for Wix
              function resizeIframe() {
                if (window.parent && window.parent !== window) {
                  const height = document.documentElement.scrollHeight;
                  window.parent.postMessage({
                    type: 'resize',
                    height: height
                  }, '*');
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
                window.addEventListener('load', resizeIframe);
                window.addEventListener('resize', resizeIframe);
                
                // Use ResizeObserver to detect content changes
                if (window.ResizeObserver && document.body) {
                  try {
                    const resizeObserver = new ResizeObserver(() => {
                      setTimeout(resizeIframe, 100);
                    });
                    resizeObserver.observe(document.body);
                  } catch (error) {
                    console.warn('ResizeObserver error:', error);
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
                    attributes: true
                  });
                } catch (error) {
                  console.warn('MutationObserver error:', error);
                }
                
                // Initial resize
                setTimeout(resizeIframe, 100);
              }
              
              // Start setup when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', setupResizeObservers);
              } else {
                setupResizeObservers();
              }
            `,
          }}
        />
      </head>
      <body>
        <TranslationProvider>
          <IframeResizer />
          {children}
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
