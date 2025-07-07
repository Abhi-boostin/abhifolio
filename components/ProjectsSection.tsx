"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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

  return (
    <section id="projects" className="min-h-screen w-full flex flex-col items-center border-b px-2 md:px-0 bg-black dark:bg-black pt-12">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-2">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.08 }}
            className={idx !== 0 ? "mt-4" : ""}
          >
            <button
              type="button"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              onMouseEnter={() => setSelected(idx)}
              onFocus={() => setSelected(idx)}
              className={`group w-full flex items-center justify-between rounded-2xl px-4 py-2 md:py-3 transition-colors duration-200 cursor-pointer text-left ${
                selected === idx
                  ? "bg-white/5 shadow-lg"
                  : "hover:bg-white/2 focus:bg-white/5"
              }`}
              aria-expanded={openIdx === idx}
              aria-controls={`project-details-${idx}`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-3 w-full">
                <span className="font-semibold text-white text-sm md:text-base">
                  {project.title}
                </span>
                <span className="text-neutral-400 text-xs md:text-sm truncate">
                  {project.subtitle}
                </span>
              </div>
              <span className="ml-4 text-neutral-400 text-xs md:text-sm min-w-[3rem] text-right">
                {project.year}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {openIdx === idx && (
                <motion.div
                  id={`project-details-${idx}`}
                  initial={{ opacity: 0, y: -16, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -16, height: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden px-4 pb-4"
                >
                  <div className="rounded-xl bg-white/5 p-4 mt-2 text-neutral-200 text-sm md:text-base shadow border border-white/10">
                    <div className="mb-3 text-neutral-300 text-xs md:text-sm text-center md:text-left">
                      {project.description}
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-white/10 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 justify-center md:justify-start">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xs font-semibold shadow hover:from-blue-600 hover:to-blue-800 transition-colors"
                      >
                        Live Demo
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-neutral-700 to-neutral-900 text-white text-xs font-semibold shadow hover:from-neutral-800 hover:to-black transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 