import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ContactOverlay from "@/components/layout/ContactOverlay";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageTransition from "@/components/providers/PageTransition";
import LoadingScreen from "@/components/ui/LoadingScreen";
import SplashScreen from "@/components/ui/SplashScreen";

export const metadata: Metadata = {
  title: {
    default: "Kanasa Creative — Design & Technology",
    template: "%s — Kanasa Creative",
  },
  description: "Kanasa Creative — blending design and technology to build digital products that matter.",
  openGraph: {
    type: "website",
    siteName: "Kanasa Creative",
    title: "Kanasa Creative — Design & Technology",
    description: "Blending design and technology to build digital products that matter.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
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
