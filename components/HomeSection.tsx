"use client";
import Hero3DModel from "./Hero3DModel";
import { useReducer } from "react";
import TextPressure from "./reactbits/TextAnimations/TextPressure/TextPressure";

export default function HomeSection() {
  const [accent, click] = useReducer((state) => ++state % 4, 0); // 4 accents in Hero3DModel
  return (
    <section id="home" className="h-screen w-full flex items-center justify-center bg-black px-2 md:px-0">
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 h-full">
        {/* 3D Model */}
        <div className="w-full md:w-1/2 flex justify-center items-center h-72 md:h-[500px] mt-8 md:mt-0">
          <Hero3DModel accent={accent} click={click} />
        </div>
        {/* About Me with Animated Name */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center about-me-font order-2 md:order-1 items-start md:items-start justify-start h-full">
          <div className="w-full flex flex-col items-center md:items-start mt-8 md:mt-16">
            <div style={{ position: 'relative', height: '90px', width: '100%', maxWidth: 500 }} className="mb-2 flex justify-center md:justify-start">
              <TextPressure
                text="Abhimanyu Singh"
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#ff0000"
                minFontSize={36}
              />
            </div>
            <h2 className="text-base md:text-lg font-normal text-neutral-300 mb-6 max-w-xl text-center md:text-left">
              Developer, designer, and Web3 enthusiast. I enjoy turning ideas into interactive experiences and can help add a techy twist to your marketing projects. Let's build something cool together!
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
} 