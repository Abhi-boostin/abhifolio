"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Simple fade-in and slide-up transition on route change
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    }, [pathname]);

    return (
        <div ref={containerRef} className="min-h-screen w-full">
            {children}
        </div>
    );
}