'use client';
import { Badge } from "./ui/badge";
import React from "react";

const skills = {
  languages: [
    { name: "JavaScript", icon: "JS", iconColor: "text-yellow-300" },
    { name: "TypeScript", icon: "TS", iconColor: "text-blue-400" },
    { name: "HTML", icon: "HTML", iconColor: "text-orange-400" },
    { name: "CSS", icon: "CSS", iconColor: "text-blue-300" },
    { name: "NodeJs", icon: "Node", iconColor: "text-green-400" },
    { name: "SQL", icon: "SQL", iconColor: "text-yellow-200" },
    { name: "Postgres", icon: "PG", iconColor: "text-blue-200" },
    { name: "MongoDB", icon: "MDB", iconColor: "text-green-300" },
    { name: "SVG Animation", icon: "SVG", iconColor: "text-gray-200" },
  ],
  frameworks: [
    { name: "React", icon: "⚛️", iconColor: "text-cyan-300" },
    { name: "NextJs", icon: "N", iconColor: "text-white" },
    { name: "LiquidJs", icon: "LJ", iconColor: "text-blue-300" },
    { name: "ExpressJs", icon: "EX", iconColor: "text-yellow-200" },
    { name: "TailwindCSS", icon: "TW", iconColor: "text-cyan-400" },
    { name: "TankStack Query", icon: "TQ", iconColor: "text-pink-400" },
    { name: "Motion.dev", icon: "M", iconColor: "text-blue-400" },
    { name: "GSAP", icon: "GS", iconColor: "text-green-400" },
    { name: "React Email", icon: "RE", iconColor: "text-blue-200" },
    { name: "BetterAuth", icon: "BA", iconColor: "text-purple-300" },
  ],
  tools: [
    { name: "Drizzle", icon: "D", iconColor: "text-green-300" },
    { name: "Prisma", icon: "P", iconColor: "text-gray-200" },
    { name: "NeonDB", icon: "N", iconColor: "text-cyan-300" },
  ],
  platforms: [
    { name: "Github", icon: "GH", iconColor: "text-white" },
    { name: "Netlify", icon: "NL", iconColor: "text-cyan-300" },
    { name: "Vercel", icon: "V", iconColor: "text-white" },
    { name: "Ubuntu", icon: "U", iconColor: "text-orange-400" },
    { name: "Cloudflare", icon: "CF", iconColor: "text-yellow-300" },
  ],
  softwares: [
    { name: "Cursor", icon: "C", iconColor: "text-white" },
    { name: "DataGrip", icon: "DG", iconColor: "text-yellow-300" },
    { name: "Postman", icon: "PM", iconColor: "text-orange-400" },
    { name: "Figma", icon: "F", iconColor: "text-pink-400" },
    { name: "Photoshop", icon: "PS", iconColor: "text-blue-400" },
  ],
  devops: [
    { name: "TRPC", icon: "TR", iconColor: "text-cyan-300" },
    { name: "Github Actions(CI/CD)", icon: "GA", iconColor: "text-white" },
    { name: "Authentication (OAuth, JWT)", icon: "AU", iconColor: "text-yellow-200" },
  ],
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <div className="text-xs text-gray-400 mb-3 tracking-widest font-mono uppercase">{title}</div>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full min-h-screen h-full flex flex-col items-center justify-start px-2 py-8 md:py-16 bg-black text-white overflow-y-auto relative"
      style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bitcount+Grid+Double:wght@100..900&display=swap');`}</style>
      <div className="w-full max-w-2xl mx-auto relative z-10 bg-transparent backdrop-blur-md" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
        <div className="flex items-center mb-8 gap-4 md:gap-6">
          <h1 className="text-3xl md:text-4xl tracking-widest" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
            Skills
          </h1>
          <img
            src="/icons and gifs/skill.gif"
            alt="Sanrio Chococat GIF"
            width={48}
            height={48}
            className="md:w-[64px] md:h-[64px] rounded-xl object-contain"
            style={{ background: 'transparent', display: 'block' }}
          />
        </div>
        <Section title="Languages">
          {skills.languages.map((skill) => (
            <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
              <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
            </Badge>
          ))}
        </Section>
        <Section title="Frameworks">
          {skills.frameworks.map((skill) => (
            <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
              <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
            </Badge>
          ))}
        </Section>
        <Section title="Tools">
          {skills.tools.map((skill) => (
            <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
              <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
            </Badge>
          ))}
        </Section>
        <Section title="Platforms">
          {skills.platforms.map((skill) => (
            <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
              <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
            </Badge>
          ))}
        </Section>
        <Section title="Softwares">
          {skills.softwares.map((skill) => (
            <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
              <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
            </Badge>
          ))}
        </Section>
        <Section title="Dev Ops">
          {skills.devops.map((skill) => (
            <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
              <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
            </Badge>
          ))}
        </Section>
      </div>
    </section>
  );
} 