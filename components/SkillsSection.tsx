"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Skill {
    name: string;
    abbr: string;
    color: string;
}

const skills: Record<string, Skill[]> = {
    Languages: [
        { name: "JavaScript", abbr: "JS", color: "text-yellow-300" },
        { name: "TypeScript", abbr: "TS", color: "text-blue-400" },
        { name: "Python", abbr: "PY", color: "text-emerald-300" },
        { name: "SQL", abbr: "SQL", color: "text-sky-300" },
        { name: "Java", abbr: "JV", color: "text-orange-300" },
    ],
    Frontend: [
        { name: "HTML / CSS", abbr: "WEB", color: "text-rose-300" },
        { name: "React", abbr: "RX", color: "text-cyan-300" },
        { name: "Next.js", abbr: "NX", color: "text-white" },
        { name: "Vite", abbr: "VT", color: "text-yellow-300" },
        { name: "TanStack Query", abbr: "TQ", color: "text-rose-400" },
        { name: "React Router", abbr: "RR", color: "text-rose-300" },
        { name: "Tailwind CSS", abbr: "TW", color: "text-cyan-400" },
        { name: "Three.js", abbr: "3D", color: "text-white" },
        { name: "Capacitor", abbr: "CAP", color: "text-blue-300" },
    ],
    "Backend & APIs": [
        { name: "Node.js", abbr: "ND", color: "text-emerald-400" },
        { name: "Express", abbr: "EX", color: "text-neutral-200" },
        { name: "Flask", abbr: "FL", color: "text-emerald-300" },
        { name: "Django", abbr: "DJ", color: "text-emerald-500" },
        { name: "REST API", abbr: "API", color: "text-pink-300" },
        { name: "GraphQL", abbr: "GQL", color: "text-pink-400" },
    ],
    Integrations: [
        { name: "Stripe", abbr: "ST", color: "text-violet-300" },
        { name: "Razorpay", abbr: "RZ", color: "text-blue-300" },
        { name: "Twilio", abbr: "TW", color: "text-rose-300" },
        { name: "Shopify", abbr: "SH", color: "text-emerald-300" },
        { name: "GitHub Actions", abbr: "GHA", color: "text-neutral-200" },
        { name: "Agentic Workflows", abbr: "AGT", color: "text-purple-300" },
    ],
    "Databases & Infra": [
        { name: "PostgreSQL", abbr: "PG", color: "text-sky-400" },
        { name: "MongoDB", abbr: "MG", color: "text-emerald-500" },
        { name: "Redis", abbr: "RD", color: "text-rose-400" },
        { name: "Supabase", abbr: "SB", color: "text-emerald-400" },
        { name: "Prisma", abbr: "PR", color: "text-white" },
    ],
    "Cloud & DevOps": [
        { name: "AWS (EC2, S3, Lambda)", abbr: "AWS", color: "text-orange-300" },
        { name: "GCP (Compute Engine, Cloud Run, Cloud Storage)", abbr: "GCP", color: "text-blue-300" },
        { name: "Docker", abbr: "DK", color: "text-blue-400" },
        { name: "Git", abbr: "GIT", color: "text-orange-400" },
        { name: "GitHub", abbr: "GH", color: "text-neutral-200" },
    ],
};

const SkillCategory = ({ title, items, delay = 0 }: { title: string; items: Skill[]; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="mb-16">
            <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay }}
                className="text-2xl md:text-3xl text-white mb-8 font-light tracking-wider flex items-center gap-4"
                style={{ fontFamily: '"Oswald", sans-serif' }}
            >
                <span className="w-8 h-[1px] bg-white/30"></span>
                {title}
            </motion.h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((skill, idx) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: delay + (idx * 0.05) }}
                        className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    >
                        <span
                            className={`shrink-0 w-9 h-9 rounded-md flex items-center justify-center text-[10px] font-mono tracking-wider border border-white/10 bg-white/5 ${skill.color} group-hover:scale-105 transition-transform duration-300`}
                        >
                            {skill.abbr}
                        </span>
                        <span
                            className="text-neutral-300 group-hover:text-white transition-colors text-sm md:text-[15px] font-medium leading-snug"
                            style={{ fontFamily: '"Quicksand", sans-serif' }}
                        >
                            {skill.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default function SkillsSection() {
    return (
        <section id="skills" className="min-h-screen w-full bg-black text-white py-24 px-4 md:px-8 relative">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Quicksand:wght@300..700&display=swap');
      `}</style>

            <div className="max-w-6xl mx-auto">
                <div className="mb-20">
                    <h2
                        className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight"
                        style={{ fontFamily: '"Oswald", sans-serif' }}
                    >
                        SKILLS &<br />TECHNOLOGIES
                    </h2>
                    <p
                        className="text-neutral-400 max-w-xl text-lg leading-relaxed"
                        style={{ fontFamily: '"Quicksand", sans-serif' }}
                    >
                        Tools I reach for daily. Languages I write in, frameworks I ship on, and infra I trust in production.
                    </p>
                </div>

                <SkillCategory title="LANGUAGES" items={skills.Languages} delay={0.05} />
                <SkillCategory title="FRONTEND" items={skills.Frontend} delay={0.1} />
                <SkillCategory title="BACKEND & APIS" items={skills["Backend & APIs"]} delay={0.15} />
                <SkillCategory title="INTEGRATIONS" items={skills.Integrations} delay={0.2} />
                <SkillCategory title="DATABASES & INFRA" items={skills["Databases & Infra"]} delay={0.25} />
                <SkillCategory title="CLOUD & DEVOPS" items={skills["Cloud & DevOps"]} delay={0.3} />
            </div>
        </section>
    );
}
