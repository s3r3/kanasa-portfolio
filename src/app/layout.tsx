import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ContactOverlay from "@/components/layout/ContactOverlay";
import SmoothScroll from "@/components/providers/SmoothScroll";
import PageTransition from "@/components/providers/PageTransition";
import SplashScreen from "@/components/ui/SplashScreen";

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
      className={`h-full antialiased`}
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
