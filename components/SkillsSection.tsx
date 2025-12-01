"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = {
  languages: [
    { name: "Java", icon: "☕", color: "text-orange-400" },
    { name: "JavaScript", icon: "JS", color: "text-yellow-300" },
    { name: "TypeScript", icon: "TS", color: "text-blue-400" },
    { name: "C++", icon: "C++", color: "text-blue-500" },
    { name: "Python", icon: "🐍", color: "text-green-400" },
    { name: "SQL", icon: "🗃️", color: "text-blue-400" },
  ],
  frontend: [
    { name: "React", icon: "⚛️", color: "text-cyan-300" },
    { name: "Next.js", icon: "N", color: "text-white" },
    { name: "Vite", icon: "⚡", color: "text-yellow-400" },
    { name: "Tailwind CSS", icon: "TW", color: "text-cyan-400" },
    { name: "Three.js", icon: "3D", color: "text-white" },
    { name: "GSAP", icon: "GS", color: "text-green-400" },
    { name: "Framer Motion", icon: "FM", color: "text-purple-400" },
    { name: "HTML5", icon: "HTML", color: "text-orange-400" },
    { name: "CSS3", icon: "CSS", color: "text-blue-300" },
  ],
  backend: [
    { name: "Node.js", icon: "🟢", color: "text-green-400" },
    { name: "Express.js", icon: "EX", color: "text-gray-300" },
    { name: "NestJS", icon: "N", color: "text-red-500" },
    { name: "PostgreSQL", icon: "🐘", color: "text-blue-400" },
    { name: "MongoDB", icon: "🍃", color: "text-green-500" },
    { name: "Redis", icon: "🔴", color: "text-red-400" },
    { name: "Supabase", icon: "⚡", color: "text-green-400" },
    { name: "Firebase", icon: "🔥", color: "text-orange-400" },
    { name: "GraphQL", icon: "🔷", color: "text-pink-400" },
  ],
  tools: [
    { name: "Git", icon: "📝", color: "text-orange-500" },
    { name: "Docker", icon: "🐳", color: "text-blue-400" },
    { name: "Figma", icon: "🎨", color: "text-purple-400" },
    { name: "Postman", icon: "📮", color: "text-orange-400" },
    { name: "Vercel", icon: "▲", color: "text-white" },
    { name: "GitHub Actions", icon: "⚡", color: "text-blue-400" },
  ]
};

const SkillCategory = ({ title, items, delay = 0 }: { title: string, items: typeof skills.languages, delay?: number }) => {
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
            <span className={`text-xl ${skill.color} filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {skill.icon}
            </span>
            <span
              className="text-neutral-300 group-hover:text-white transition-colors text-sm md:text-base font-medium"
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
            A comprehensive toolkit that enables me to build scalable, performant, and beautiful web applications.
          </p>
        </div>

        <SkillCategory title="LANGUAGES" items={skills.languages} delay={0.1} />
        <SkillCategory title="FRONTEND DEVELOPMENT" items={skills.frontend} delay={0.2} />
        <SkillCategory title="BACKEND & DATABASES" items={skills.backend} delay={0.3} />
        <SkillCategory title="TOOLS & DEVOPS" items={skills.tools} delay={0.4} />
      </div>
    </section>
  );
}