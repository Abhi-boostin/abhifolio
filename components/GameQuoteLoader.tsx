"use client";
import { useState, useEffect, useRef } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { Axe, Ghost, Sprout, Crosshair, LucideIcon } from "lucide-react";

interface Quote {
    text: string;
    source: string;
    Icon: LucideIcon;
}

const quotes: Quote[] = [
    { text: "Do not be sorry, be better.", source: "God of War", Icon: Axe },
    { text: "We're more ghosts than people.", source: "Red Dead Redemption 2", Icon: Ghost },
    { text: "No matter what, you keep finding something to fight for.", source: "The Last of Us", Icon: Sprout },
    { text: "Victory belongs to the bold.", source: "Counter-Strike 2", Icon: Crosshair },
    { text: "The cycle ends here.", source: "God of War", Icon: Axe },
    { text: "I gave you all I had.", source: "Red Dead Redemption 2", Icon: Ghost },
    { text: "Endure and survive.", source: "The Last of Us", Icon: Sprout },
];

export default function GameQuoteLoader() {
    const { active, progress } = useProgress();
    const [quote, setQuote] = useState<Quote>(quotes[0]);
    const [isVisible, setIsVisible] = useState(true);
    const cardRef = useRef<HTMLDivElement>(null);

    // Pick a random quote on mount
    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    // Close logic: minimum 1.2s, max 1.8s, exits when assets ready
    useEffect(() => {
        const startTime = Date.now();
        const minLoadTime = 1200;
        const maxLoadTime = 1800;

        const close = () => {
            if (cardRef.current) {
                gsap.to(cardRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    ease: "power2.inOut",
                    onComplete: () => setIsVisible(false),
                });
            } else {
                setIsVisible(false);
            }
        };

        const tick = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed >= minLoadTime && !active && progress === 100) {
                close();
                return true;
            }
            return false;
        };

        const interval = setInterval(() => {
            if (tick()) clearInterval(interval);
        }, 80);
        const safety = setTimeout(close, maxLoadTime);

        return () => {
            clearInterval(interval);
            clearTimeout(safety);
        };
    }, [active, progress]);

    // Entry animation
    useEffect(() => {
        if (isVisible && cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
            );
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const Icon = quote.Icon;
    const pct = Math.round(progress);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&display=swap');
            `}</style>

            <div
                ref={cardRef}
                aria-live="polite"
                className="fixed z-[9999] pointer-events-none
                           bottom-6 left-1/2 -translate-x-1/2
                           md:left-auto md:translate-x-0 md:right-6 md:bottom-6
                           w-[min(92vw,360px)]"
            >
                <div
                    className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(20,20,22,0.92) 0%, rgba(10,10,12,0.92) 100%)",
                        boxShadow:
                            "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                >
                    {/* Subtle top glow */}
                    <div
                        aria-hidden
                        className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full opacity-30 blur-3xl"
                        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)" }}
                    />

                    <div className="relative px-5 py-4 flex items-start gap-4">
                        {/* Icon block */}
                        <div
                            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                            style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                            <Icon size={18} strokeWidth={1.5} className="text-white/85" />
                        </div>

                        {/* Quote + source */}
                        <div className="flex-1 min-w-0">
                            <p
                                className="text-[15px] md:text-[16px] leading-snug text-white/90"
                                style={{
                                    fontFamily: '"Instrument Serif", ui-serif, Georgia, serif',
                                    fontStyle: "italic",
                                    letterSpacing: "0.005em",
                                }}
                            >
                                "{quote.text}"
                            </p>
                            <div
                                className="mt-2 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em]"
                                style={{ fontFamily: '"JetBrains Mono", ui-monospace, Menlo, monospace' }}
                            >
                                <span className="text-white/40 truncate">{quote.source}</span>
                                <span className="text-white/30 tabular-nums shrink-0">
                                    {String(pct).padStart(2, "0")}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Progress hairline */}
                    <div className="relative h-px w-full bg-white/[0.06]">
                        <div
                            className="absolute inset-y-0 left-0 bg-white/70 transition-[width] duration-200 ease-out"
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
