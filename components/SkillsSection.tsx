'use client';
import { Badge } from "./ui/badge";
import React from "react";

const skills = {
  languages: [
    { name: "Java", icon: "☕", iconColor: "text-orange-400" },
    { name: "JavaScript", icon: "JS", iconColor: "text-yellow-300" },
    { name: "TypeScript", icon: "TS", iconColor: "text-blue-400" },
    { name: "C++", icon: "C++", iconColor: "text-blue-500" },
    { name: "Python", icon: "🐍", iconColor: "text-green-400" },         // Added Python
    { name: "SQL", icon: "🗃️", iconColor: "text-blue-400" },            // Added SQL
  ],
  frontendCore: [
    { name: "HTML5", icon: "HTML", iconColor: "text-orange-400" },
    { name: "CSS", icon: "CSS", iconColor: "text-blue-300" },
    { name: "JavaScript", icon: "JS", iconColor: "text-yellow-300" },
    { name: "TypeScript", icon: "TS", iconColor: "text-blue-400" },
  ],
  frontendMain: [
    { name: "React", icon: "⚛️", iconColor: "text-cyan-300" },
    { name: "Vite", icon: "⚡", iconColor: "text-yellow-400" },
    { name: "NextJs", icon: "N", iconColor: "text-white" },
    { name: "Angular", icon: "A", iconColor: "text-red-400" },
  ],
  styling: [
    { name: "TailwindCSS", icon: "TW", iconColor: "text-cyan-400" },
    { name: "SCSS/SASS", icon: "S", iconColor: "text-pink-400" },
    { name: "ShadcnUI", icon: "SU", iconColor: "text-white" },
    { name: "Material UI", icon: "MU", iconColor: "text-blue-400" },
    { name: "Framer Motion", icon: "FM", iconColor: "text-purple-400" },
    { name: "GSAP", icon: "GS", iconColor: "text-green-400" },
    { name: "Three.js", icon: "3D", iconColor: "text-blue-300" },
    { name: "Lenis", icon: "L", iconColor: "text-white" },
    { name: "Lottie", icon: "🎬", iconColor: "text-blue-400" },
    { name: "AccernityUI", icon: "AU", iconColor: "text-purple-300" },
    { name: "Reactbits", icon: "RB", iconColor: "text-green-300" },
    { name: "many more", icon: "✨", iconColor: "text-yellow-400" },
  ],
  backend: [
    { name: "Node.js", icon: "🟢", iconColor: "text-green-400" },
    { name: "Express.js", icon: "E", iconColor: "text-gray-300" },
    { name: "NestJS", icon: "N", iconColor: "text-red-500" },
    { name: "Fastify", icon: "F", iconColor: "text-blue-400" },
    { name: "Socket.IO", icon: "🔌", iconColor: "text-blue-300" },
    { name: "Mongoose", icon: "M", iconColor: "text-green-500" },
    { name: "Prisma", icon: "P", iconColor: "text-blue-600" },
    { name: "Passport.js", icon: "🔐", iconColor: "text-blue-400" },
    { name: "JWT", icon: "🎫", iconColor: "text-purple-400" },
    { name: "REST APIs", icon: "🌐", iconColor: "text-blue-400" },
    { name: "GraphQL", icon: "🔷", iconColor: "text-pink-400" },
    { name: "GitHub Actions", icon: "⚡", iconColor: "text-green-400" },
    { name: "Netlify CI", icon: "N", iconColor: "text-green-500" },
    { name: "Vercel CLI", icon: "V", iconColor: "text-black" },
    { name: "Supabase", icon: "🟩", iconColor: "text-green-500" },       // Supabase added previously
  ],
  backendTooling: [
    { name: "Postman", icon: "📮", iconColor: "text-orange-400" },
    { name: "Docker", icon: "🐳", iconColor: "text-blue-400" },
    { name: "Nodemon", icon: "🔄", iconColor: "text-green-400" },
    { name: "PM2", icon: "⚡", iconColor: "text-blue-500" },
    { name: "Swagger", icon: "📚", iconColor: "text-green-500" },
    { name: "Cron", icon: "⏰", iconColor: "text-yellow-400" },
    { name: "dotenv", icon: "🔧", iconColor: "text-gray-400" },
    { name: "Zod", icon: "Z", iconColor: "text-purple-400" },           // <-- Added Zod
  ],
  databases: [
    { name: "PostgreSQL", icon: "🐘", iconColor: "text-blue-400" },
    { name: "MySQL", icon: "🐬", iconColor: "text-blue-500" },
    { name: "SQLite", icon: "💎", iconColor: "text-blue-300" },
    { name: "SQL Server", icon: "🗄️", iconColor: "text-red-500" },
    { name: "MongoDB", icon: "🍃", iconColor: "text-green-500" },
    { name: "Firebase", icon: "🔥", iconColor: "text-orange-400" },
    { name: "Redis", icon: "🔴", iconColor: "text-red-400" },
  ],
  otherTools: [
    { name: "Git", icon: "📝", iconColor: "text-orange-500" },
    { name: "GitHub", icon: "🐙", iconColor: "text-white" },
    { name: "Figma", icon: "🎨", iconColor: "text-purple-400" },
    { name: "Framer", icon: "F", iconColor: "text-blue-500" },
    { name: "Webflow", icon: "W", iconColor: "text-blue-400" },
  ],
};


const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <div className="text-xs text-gray-400 mb-3 tracking-widest font-mono uppercase">{title}</div>
    <div className="flex flex-wrap gap-2">{children}</div>
  </div>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <div className="text-sm text-gray-300 mb-2 font-medium">{title}</div>
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
        
        <Section title="Frontend Development">
          <SubSection title="Core Technologies">
            {skills.frontendCore.map((skill) => (
              <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
                <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
              </Badge>
            ))}
          </SubSection>
          
          <SubSection title="Main">
            {skills.frontendMain.map((skill) => (
              <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
                <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
              </Badge>
            ))}
          </SubSection>
          
          <SubSection title="Styling">
            {skills.styling.map((skill) => (
              <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
                <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
              </Badge>
            ))}
          </SubSection>
        </Section>
        
        <Section title="Backend">
          {skills.backend.map((skill) => (
            <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
              <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
            </Badge>
          ))}
        </Section>
        
        <Section title="Backend Tooling">
          {skills.backendTooling.map((skill) => (
            <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
              <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
            </Badge>
          ))}
        </Section>
        
        <Section title="Databases">
          {skills.databases.map((skill) => (
            <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
              <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
            </Badge>
          ))}
        </Section>
        
        <Section title="Other Tools">
          {skills.otherTools.map((skill) => (
            <Badge key={skill.name} className="px-2 py-1 bg-[#222] text-white flex items-center gap-1" style={{ fontFamily: '"Bitcount Grid Double", Inter, ui-monospace, monospace' }}>
              <span className={skill.iconColor}>{skill.icon}</span> {skill.name}
            </Badge>
          ))}
        </Section>
      </div>
    </section>
  );
} 