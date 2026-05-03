"use client";
import ExperienceTimeline from "@/components/ExperienceTimeline";

export default function ExperiencePage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-40 relative overflow-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Quicksand:wght@300..700&family=Saira+Condensed:wght@100..900&display=swap');
      `}</style>

            <div className="container mx-auto px-4 mb-20 text-center">
                <h1
                    className="text-5xl md:text-7xl font-light mb-6 tracking-tight"
                    style={{ fontFamily: '"Oswald", sans-serif' }}
                >
                    EXPERIENCE
                </h1>
                <p className="text-neutral-400 max-w-2xl mx-auto font-light tracking-wide">
                    A journey through code, products, and digital transformation.
                </p>
            </div>

            <ExperienceTimeline />
        </main>
    );
}
