import type { Metadata } from "next";
import "./globals.css";
import DynamicIslandNav from "../components/DynamicIslandNav";
import PageTransitionWrapper from "../components/PageTransitionWrapper";
import TopLoader from "../components/TopLoader";
import Cursor from "../components/Cursor";

// Removed next/font/google to prevent Turbopack connection decryption errors
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
        className="antialiased bg-black text-white"
        suppressHydrationWarning
      >
        <TopLoader />
        <Cursor />
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
