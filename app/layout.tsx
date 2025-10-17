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
        {/* Microsoft Clarity - Conditional Loading */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Conditional Clarity loading to prevent cross-session tracking
              function initializeClarity() {
                const hostname = window.location.hostname;
                const referrer = document.referrer || '';
                const isInIframe = window !== window.top;
                
                console.log('🔍 Clarity Debug:', {
                  hostname,
                  referrer,
                  isInIframe,
                  referrerIncludesCattlerComAr: referrer.includes('cattler.com.ar'),
                  referrerIncludesCattlerFarm: referrer.includes('cattler.farm')
                });
                
                // Determine which Clarity project to load
                let clarityProject = null;
                let clarityName = 'clarity';
                
                // Case 1: Direct access to cattler.farm
                if (hostname === 'cattler.farm') {
                  clarityProject = 'nk835onlfr'; // cattler.farm project
                  console.log('🌍 Loading Clarity for cattler.farm (direct access)');
                }
                // Case 2: Direct access to cattler.com.ar
                else if (hostname === 'cattler.com.ar') {
                  clarityProject = 'noy9x8lyx5'; // cattler.com.ar project
                  console.log('🌍 Loading Clarity for cattler.com.ar (direct access)');
                }
                // Case 3: Iframe from cattler.com.ar
                else if (isInIframe && referrer.includes('cattler.com.ar')) {
                  clarityProject = 'noy9x8lyx5'; // cattler.com.ar project
                  console.log('🌍 Loading Clarity for cattler.com.ar (iframe)');
                }
                // Case 4: Iframe from cattler.farm
                else if (isInIframe && referrer.includes('cattler.farm')) {
                  clarityProject = 'nk835onlfr'; // cattler.farm project
                  console.log('🌍 Loading Clarity for cattler.farm (iframe)');
                }
                // Case 5: Default fallback (no iframe, no specific domain)
                else if (!isInIframe) {
                  // Use cattler.farm as default for direct access
                  clarityProject = 'nk835onlfr';
                  console.log('🌍 Loading default Clarity (cattler.farm)');
                }
                // Case 6: Iframe from unknown source - don't load any Clarity
                else {
                  console.log('🌍 No Clarity loaded (unknown iframe source)');
                  return;
                }
                
                // Load the appropriate Clarity project
                if (clarityProject) {
                  (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, clarityName, "script", clarityProject);
                  
                  console.log('✅ Clarity loaded:', clarityProject);
                }
              }
              
              // Initialize Clarity when DOM is ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeClarity);
              } else {
                initializeClarity();
              }
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
