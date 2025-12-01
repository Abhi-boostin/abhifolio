"use client";
import Hero3DModel from "./Hero3DModel";
import { useReducer } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import GameQuoteLoader from "./GameQuoteLoader";

export default function HomeSection() {
    const [accent, click] = useReducer((state) => ++state % 4, 0);

    useGSAP(() => {
        gsap.from(".hero-text", {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            delay: 2.5 // Delay to sync with loader exit
        });
    });

    return (
        <section id="home" className="h-screen w-full flex items-center justify-center bg-black px-4 md:px-8 overflow-hidden">
            <GameQuoteLoader />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Quicksand:wght@300..700&display=swap');
            `}</style>

            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full relative z-10">

                {/* Left Side: Text Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-start z-20 pt-20 md:pt-0">
                    <h1 className="hero-text text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tighter mb-2"
                        style={{ fontFamily: '"Oswald", sans-serif' }}>
                        ABHIMANYU<br />SINGH
                    </h1>

                    <div className="hero-text flex items-center gap-4 mb-8">
                        <span className="text-sm md:text-lg text-neutral-500 tracking-[0.3em] font-light uppercase">
                            Designer
                        </span>
                        <span className="text-neutral-700">X</span>
                        <span className="text-sm md:text-lg text-neutral-500 tracking-[0.3em] font-light uppercase">
                            Developer
                        </span>
                    </div>

                    <p className="hero-text text-neutral-400 max-w-md text-sm md:text-base leading-relaxed"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}>
                        I am a <span className="text-white font-medium">Full Stack Engineer</span> specialized in <span className="text-white font-medium">Frontend Engineering</span> and <span className="text-white font-medium">Design</span>.
                    </p>
                </div>

                {/* Right Side: 3D Model */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-full flex items-center justify-center relative md:absolute md:right-0 md:top-0 md:bottom-0 pointer-events-auto">
                    <div className="w-full h-full scale-110 md:scale-125 origin-center">
                        <Hero3DModel accent={accent} click={click} />
                    </div>
                </div>

            </div>
        </section>
    );
}