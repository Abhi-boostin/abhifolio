"use client";
import { useEffect } from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: any;
    let rafId: number;
    import("@studio-freight/lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        smooth: true,
        lerp: 0.1, // adjust for more/less smoothness
      });
      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);
  return <>{children}</>;
} 