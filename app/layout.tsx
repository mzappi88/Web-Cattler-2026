import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { TranslationProvider } from "@/hooks/TranslationProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ClientScripts } from "@/components/client-scripts";

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
      <head></head>
      <body>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17782792916"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17782792916');
          `}
        </Script>
        <TranslationProvider>
          <ClientScripts />
          <Header />
          {children}
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
