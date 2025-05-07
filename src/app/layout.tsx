import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Glorys - Landing Page",
  },
  keywords: [
    "kaca film",
    "glory kaca film",
    "glorys kaca film",
    "kaca film glory",
    "kaca film riau",
    "kaca film pekanbaru",
    "8 istana profil",
  ],
  metadataBase: new URL("https://gloryskacafilm.com/"),
  twitter: {
    card: "summary_large_image",
    site: "gloryskacafilm",
    title: "Glorys - Kaca Film",
    description: "Kaca Film Pekanbaru, Riau terpercaya",
    images: ["images/featured.png"],
  },
  openGraph: {
    title: "Glorys - Kaca Film",
    siteName: "gloryskacafilm",
    images: ["images/opengraph-image.png"],
    description: "Kaca Film Pekanbaru, Riau terpercaya",
  },
  robots: {
    index: true,
    googleBot: {
      index: true,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <Script
            src="https://umami.gloryskacafilm.com/script.js"
            data-website-id="78658c39-b54c-4ced-81e0-8f03e3c1cd79"
            strategy="afterInteractive"
          />
          {/* Google Analytics script */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-VL0DKSRNWR"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VL0DKSRNWR');
            `}
          </Script>
        </head>
        <body className={`${inter.variable} antialiased`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
