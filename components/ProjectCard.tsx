import { motion, AnimatePresence } from "motion/react";
import React from "react";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  github: string;
  skills: string[];
}

interface ProjectCardProps {
  project: Project;
  idx: number;
  openIdx: number | null;
  setOpenIdx: (idx: number | null) => void;
  selected: number;
  setSelected: (idx: number) => void;
}

const projectFont = {
  fontFamily: '"Saira Condensed", sans-serif',
  fontWeight: 400
};

function ProjectDetails({ project }: { project: Project }) {
  return (
    <motion.div
      id={`project-details-${project.title}`}
      initial={{ opacity: 0, y: -16, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: -16, height: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="overflow-hidden px-4 pb-4"
    >
      <div className="rounded-xl bg-white/5 p-4 mt-2 text-neutral-200 text-sm md:text-base shadow border border-white/10">
        <div
          className="mb-3 text-neutral-300 text-center md:text-left"
          style={{ fontFamily: '"Saira Condensed", sans-serif', fontWeight: 400, fontSize: '1rem', lineHeight: 1.3 }}
        >
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
  );
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx, openIdx, setOpenIdx, selected, setSelected }) => {
  return (
    <motion.div
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
          <span
            className="text-white block"
            style={{ fontFamily: '"Saira Condensed", sans-serif', fontWeight: 400, fontSize: '2.25rem', lineHeight: 1.1 }}
          >
            {project.title}
          </span>
          <span
            className="text-neutral-400 block truncate"
            style={{ fontFamily: '"Saira Condensed", sans-serif', fontWeight: 400, fontSize: '1.25rem', lineHeight: 1.2 }}
          >
            {project.subtitle}
          </span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {openIdx === idx && <ProjectDetails project={project} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard; 