import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ContactOverlay from "@/components/layout/ContactOverlay";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageTransition from "@/components/providers/PageTransition";
import SplashScreen from "@/components/ui/SplashScreen";

const habitus = localFont({
  src: "../public/font/habitus-book.C_msFUnG.woff2",
  variable: "--font-habitus",
  weight: "300 500",
});

const aeonik = localFont({
  src: "../public/font/aeonik-regular.B7F5ivrz.woff2",
  variable: "--font-aeonik",
  weight: "400",
});

export const metadata: Metadata = {
  title: "REF — Digital Agency",
  description: "Move fast, build to last. A digital agency navigating the digital-first economy with quick wins and long games.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${habitus.variable} ${aeonik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SplashScreen />
        <SmoothScroll>
          <Navbar />
          <PageTransition>{children}</PageTransition>
          <ContactOverlay />
        </SmoothScroll>
      </body>
    </html>
  );
}
