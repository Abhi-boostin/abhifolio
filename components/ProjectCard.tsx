import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  url: string;
  github: string;
  skills: string[];
  year: string;
  category: string;
  type: "Personal" | "Client";
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  idx: number;
  openIdx: number | null;
  setOpenIdx: (idx: number | null) => void;
  selected: number;
  setSelected: (idx: number) => void;
}

function ProjectDetails({ project, isOpen }: { project: Project; isOpen: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(containerRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(containerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden h-0 opacity-0"
    >
      <div className="pt-4 pb-8 text-neutral-200">
        <p
          className="mb-6 text-neutral-300 max-w-xl leading-relaxed"
          style={{
            fontFamily: '"Quicksand", sans-serif',
            fontSize: "1rem",
          }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs px-3 py-1 rounded-full border border-white/10 text-neutral-400"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.url !== "N/A" && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full border border-white/20 bg-transparent text-white text-sm hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Visit Site</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              >
                <path
                  d="M1 11L11 1M11 1H1M11 1V11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
          {project.github !== "N/A" && (
            project.github.toLowerCase().includes("private") ? (
              <button
                disabled
                className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-neutral-400 text-sm cursor-not-allowed flex items-center gap-2"
              >
                <span>GitHub</span>
                <span className="bg-neutral-800 text-neutral-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Private</span>
              </button>
            ) : (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full border border-white/20 bg-transparent text-white text-sm hover:bg-white hover:text-black transition-all duration-300"
              >
                GitHub
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  idx,
  openIdx,
  setOpenIdx,
  selected,
  setSelected,
}) => {
  const isOpen = openIdx === idx;

  return (
    <div
      className="border-t border-white/10 group project-item"
      onMouseEnter={() => setSelected(idx)}
    >
      <button
        onClick={() => setOpenIdx(isOpen ? null : idx)}
        className="w-full py-8 flex flex-col md:flex-row md:items-baseline gap-4 text-left focus:outline-none"
      >
        {/* Year */}
        <span className="text-neutral-500 font-mono text-sm md:w-24 shrink-0">
          {project.year}
        </span>

        {/* Title & Category */}
        <div className="flex-1 flex flex-col md:flex-row md:items-baseline md:justify-between w-full gap-2">
          <h3
            className={`text-3xl md:text-4xl font-light transition-colors duration-300 ${isOpen || selected === idx ? "text-white" : "text-neutral-400"
              }`}
            style={{ fontFamily: '"Oswald", sans-serif' }}
          >
            {project.title}
          </h3>
          <span className="text-neutral-500 text-sm md:text-base">
            {project.category}
          </span>
        </div>
      </button>

      <ProjectDetails project={project} isOpen={isOpen} />
    </div>
  );
};

export default ProjectCard;