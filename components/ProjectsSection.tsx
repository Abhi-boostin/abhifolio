"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const projects = [
  {
    title: "Personal Portfolio",
    description: "A modern portfolio website built with Next.js and Tailwind CSS.",
    year: 2024,
    url: "https://yourportfolio.com",
    skills: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Open Source CLI",
    description: "A cross-platform CLI tool for productivity.",
    year: 2023,
    url: "https://github.com/yourusername/cli-tool",
    skills: ["Node.js", "TypeScript", "Commander.js"],
  },
  {
    title: "UI Component Library",
    description: "A set of accessible, minimal React UI components.",
    year: 2023,
    url: "https://github.com/yourusername/ui-library",
    skills: ["React", "TypeScript", "Storybook", "Jest"],
  },
  {
    title: "Blog Platform",
    description: "A markdown-based blog platform with custom themes.",
    year: 2022,
    url: "https://yourblog.com",
    skills: ["Markdown", "Express.js", "MongoDB", "Styled Components"],
  },
];

export default function ProjectsSection() {
  const [selected, setSelected] = useState(0);

  return (
    <section id="projects" className="min-h-screen h-screen flex flex-col justify-center items-center border-b px-2 md:px-0 bg-black dark:bg-black">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-2">
        <AnimatePresence initial={false}>
          {projects.map((project, idx) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.25, delay: idx * 0.05 }}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setSelected(idx)}
                onFocus={() => setSelected(idx)}
                className={`group flex items-center justify-between rounded-2xl px-4 py-3 md:py-4 transition-colors duration-200 cursor-pointer ${
                  selected === idx
                    ? "bg-white/5 shadow-lg"
                    : "hover:bg-white/2 focus:bg-white/5"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 w-full">
                  <span className="font-semibold text-white text-base md:text-lg">
                    {project.title}
                  </span>
                  <span className="hidden md:inline text-neutral-400 text-sm md:text-base">
                    {project.description}
                  </span>
                </div>
                <span className="ml-4 text-neutral-400 text-sm md:text-base min-w-[3rem] text-right">
                  {project.year}
                </span>
              </a>
              {/* Desktop: Skills bubbles below each project row */}
              <div className="hidden md:flex flex-wrap gap-2 mt-2 px-4">
                <AnimatePresence>
                  {project.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, delay: 0.05 * skillIdx }}
                      className="bg-white/10 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm border border-white/10"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Mobile description and skills below the selected project */}
      <div className="md:hidden mt-4 w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={projects[selected].title + "-desc"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl bg-white/5 p-4 text-neutral-300 text-sm text-center mb-2"
          >
            {projects[selected].description}
          </motion.div>
          <motion.div
            key={projects[selected].title + "-skills"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {projects[selected].skills.map((skill) => (
              <span
                key={skill}
                className="bg-white/10 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm border border-white/10"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
} 