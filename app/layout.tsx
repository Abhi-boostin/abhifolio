import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DynamicIslandNav from "../components/DynamicIslandNav";
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
        {/* Dynamic Island Navigation */}
        <DynamicIslandNav />

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
