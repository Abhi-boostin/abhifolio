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
    {
        text: "Do not be sorry, be better.",
        source: "God of War",
        Icon: Axe
    },
    {
        text: "We're more ghosts than people.",
        source: "Red Dead Redemption 2",
        Icon: Ghost
    },
    {
        text: "No matter what, you keep finding something to fight for.",
        source: "The Last of Us",
        Icon: Sprout
    },
    {
        text: "Victory belongs to the bold.",
        source: "Counter-Strike 2",
        Icon: Crosshair
    },
    {
        text: "The cycle ends here. We must be better than this.",
        source: "God of War",
        Icon: Axe
    },
    {
        text: "I gave you all I had.",
        source: "Red Dead Redemption 2",
        Icon: Ghost
    },
    {
        text: "Endure and survive.",
        source: "The Last of Us",
        Icon: Sprout
    }
];

export default function GameQuoteLoader() {
    const { active, progress } = useProgress();
    const [quote, setQuote] = useState<Quote>(quotes[0]);
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set random quote on mount
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    useEffect(() => {
        // Minimum load time of 2 seconds to prevent flickering
        const minLoadTime = 2000;
        const startTime = Date.now();

        const checkLoading = () => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, minLoadTime - elapsedTime);

            if (!active && progress === 100) {
                setTimeout(() => {
                    // Animate out
                    if (containerRef.current) {
                        gsap.to(containerRef.current, {
                            opacity: 0,
                            duration: 0.8,
                            ease: "power2.inOut",
                            onComplete: () => setIsVisible(false),
                        });
                    }
                }, remainingTime);
            }
        };

        const interval = setInterval(checkLoading, 100);
        return () => clearInterval(interval);
    }, [active, progress]);

    useEffect(() => {
        if (isVisible && textRef.current) {
            gsap.fromTo(textRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
            );
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const Icon = quote.Icon;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-4 text-center"
        >
            <div ref={textRef} className="max-w-2xl flex flex-col items-center">
                <div className="mb-8 p-4 rounded-full bg-white/5 border border-white/10">
                    <Icon size={48} className="text-white/80" strokeWidth={1.5} />
                </div>

                <p
                    className="text-2xl md:text-4xl text-white font-light mb-6 leading-relaxed"
                    style={{ fontFamily: '"Oswald", sans-serif' }}
                >
                    "{quote.text}"
                </p>
                <p
                    className="text-neutral-500 text-sm md:text-base uppercase tracking-widest"
                    style={{ fontFamily: '"Quicksand", sans-serif' }}
                >
                    — {quote.source}
                </p>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-1 bg-neutral-900 rounded-full overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full bg-white transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="absolute bottom-8 text-neutral-600 text-xs font-mono">
                LOADING ASSETS... {Math.round(progress)}%
            </div>
        </div>
    );
}
