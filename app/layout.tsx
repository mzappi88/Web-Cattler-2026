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
              
              // Resize on load and when content changes
              window.addEventListener('load', resizeIframe);
              window.addEventListener('resize', resizeIframe);
              
              // Use ResizeObserver to detect content changes
              if (window.ResizeObserver) {
                const observer = new ResizeObserver(() => {
                  setTimeout(resizeIframe, 100);
                });
                observer.observe(document.body);
              }
              
              // Also resize when DOM changes
              const observer = new MutationObserver(() => {
                setTimeout(resizeIframe, 100);
              });
              observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true
              });
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
