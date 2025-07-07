"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import dynamic from 'next/dynamic';
import ProjectCard from "./ProjectCard";

const ButterflyFollower = dynamic(() => import('./ButterflyFollower'), { ssr: false });

const projects = [
  {
    title: "Personal Portfolio",
    subtitle: "Modern portfolio website",
    description: "A modern portfolio website built with Next.js and Tailwind CSS. Features responsive design, dark mode, and animated UI elements.",
    year: 2024,
    url: "https://yourportfolio.com",
    github: "https://github.com/yourusername/portfolio",
    skills: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Open Source CLI",
    subtitle: "Productivity CLI tool",
    description: "A cross-platform CLI tool for productivity, supporting custom scripts and plugins. Built with Node.js and TypeScript.",
    year: 2023,
    url: "https://github.com/yourusername/cli-tool",
    github: "https://github.com/yourusername/cli-tool",
    skills: ["Node.js", "TypeScript", "Commander.js"],
  },
  {
    title: "UI Component Library",
    subtitle: "Minimal React UI components",
    description: "A set of accessible, minimal React UI components with Storybook documentation and full test coverage.",
    year: 2023,
    url: "https://github.com/yourusername/ui-library",
    github: "https://github.com/yourusername/ui-library",
    skills: ["React", "TypeScript", "Storybook", "Jest"],
  },
  {
    title: "Blog Platform",
    subtitle: "Markdown-based blog platform",
    description: "A markdown-based blog platform with custom themes, live preview, and easy deployment.",
    year: 2022,
    url: "https://yourblog.com",
    github: "https://github.com/yourusername/blog-platform",
    skills: ["Markdown", "Express.js", "MongoDB", "Styled Components"],
  },
];

export default function ProjectsSection() {
  const [selected, setSelected] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Import Alumni Sans Pinstripe font
  const projectFont = {
    fontFamily: '"Saira Condensed", sans-serif',
    fontWeight: 400
  };

  return (
    <section
      id="projects"
      className="min-h-screen w-full flex flex-col items-center border-b px-2 md:px-0 bg-black dark:bg-black pt-12 relative overflow-hidden"
      style={{ cursor: 'url("/icons and gifs/Cosmos.cur"), auto' }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Alumni+Sans+Pinstripe:ital@0;1&family=Anek+Devanagari:wght@100..800&family=Bitcount+Grid+Double:wght@100..900&family=Oswald:wght@200..700&family=Outfit:wght@100..900&family=Quicksand:wght@300..700&family=Saira+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap');
        #projects * {
          cursor: url('/icons and gifs/Cosmos.cur'), auto !important;
        }
      `}</style>
      <ButterflyFollower />
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-2">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.title}
            project={project}
            idx={idx}
            openIdx={openIdx}
            setOpenIdx={setOpenIdx}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </section>
  );
} 