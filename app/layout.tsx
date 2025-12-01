import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PortfolioFloatingDock from "../components/PortfolioFloatingDock";
import PageTransitionWrapper from "../components/PageTransitionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhiboostin's Portfolio",
  description: "Hire me if you don't wanna burn your VC's money.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        {/* Floating Dock on all pages */}
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <PortfolioFloatingDock />
          </div>
        </div>
        {/* Page transition wrapper (client component) */}
        <PageTransitionWrapper>
          <div className="min-h-screen bg-black text-white">
            {children}
          </div>
        </PageTransitionWrapper>
      </body>
    </html>
  );
}
