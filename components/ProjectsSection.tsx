"use client"
import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard, { Project } from "./ProjectCard";

const ButterflyFollower = dynamic(() => import('./ButterflyFollower'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  // --- Client Projects ---
  {
    title: "Choolha Chowka",
    subtitle: "Mess management web application",
    description: "Mess management web application built with React and Django. Streamlines daily operations for mess administrators and users. with 10+ modules from purachasing subscription upload feedback ask for leaves to disable daily expenditure and much more.",
    url: "https://www.choolhachowka.com/",
    github: "Private",
    skills: ["React", "Django", "PostgreSQL"],
    year: "2024",
    category: "Web App",
    type: "Client"
  },
  {
    title: "Berry Pos",
    subtitle: "Point Of Sale System",
    description: "this is a point of system made for cafe and restaurernt chain handllising customer and waiter management to on table view and order and vallet and zomotato swiggy integration ( Ongoing )",
    url: "https://berrysoftwaresolutions.netlify.app/login2",
    github: "Private",
    skills: ["React", "Node.js", "MongoDB"],
    year: "2025",
    category: "SaaS",
    type: "Client"
  },
  {
    title: "Light Emotion",
    subtitle: "Creative lighting showcase",
    description: "A visually immersive website showcasing creative lighting solutions and emotional design concepts. portfolio website for a b2b brand that is in the light creation buisness",
    url: "https://lightemotion.netlify.app/",
    github: "Private",
    skills: ["Web Design", "Frontend", "Creative"],
    year: "2024",
    category: "Creative",
    type: "Client"
  },
  {
    title: "Archideus",
    subtitle: "Architecture Portfolio",
    description: "another portfolio work done for a archtecture buisnes website to showcase and show their mision and vision",
    url: "https://www.archideus.in/",
    github: "Private",
    skills: ["React", "Next.js", "Design"],
    year: "2025",
    category: "Portfolio",
    type: "Client"
  },
  {
    title: "Sideswitch",
    subtitle: "Agency website for Indie startups",
    description: "We are a multi-tasking agency, offering everything from creative design to complex automation. Thanks to our diverse core team from different domains, we provide every service imaginable.",
    url: "https://sideswitch.boostin.space",
    github: "Private",
    skills: ["Next.js", "React", "Design"],
    year: "2025",
    category: "Agency",
    type: "Client"
  },
  {
    title: "More Coming Soon",
    subtitle: "Future Projects",
    description: "More exciting projects are in the pipeline and will be added soon.",
    url: "N/A",
    github: "N/A",
    skills: ["..."],
    year: "2025",
    category: "Future",
    type: "Client"
  },

  // --- Personal Projects ---
  {
    title: "OneBrand",
    subtitle: "One stop ecommerce website",
    description: "A website for your store with complete backend, frontend, database, admin side, and customer side. Full ecommerce solution.",
    url: "https://onebrandoutfit.netlify.app/",
    github: "https://github.com/Abhi-boostin/OneBrand",
    skills: ["React", "Node.js", "MongoDB"],
    year: "2025",
    category: "Ecommerce",
    type: "Personal"
  },
  {
    title: "EasyHealth",
    subtitle: "Medical document reader",
    description: "EasyHealth is a web app that helps users understand medical documents, health reports, and provides guidance for further medical understanding.",
    url: "https://eayhealthdemo.netlify.app/",
    github: "https://github.com/Abhi-boostin/EasyHealth",
    skills: ["JavaScript", "Medical Tech", "Web App"],
    year: "2025",
    category: "Health",
    type: "Personal"
  },
  {
    title: "autoshift",
    subtitle: "n8n pipeline for business mails",
    description: "autoshift streamlines lead generation and outreach by enabling you to quickly discover business emails. The workflow leverages a custom n8n pipeline.",
    url: "https://autoshift.vercel.app/",
    github: "https://github.com/Abhi-boostin/autoshift",
    skills: ["n8n", "React", "Automation"],
    year: "2025",
    category: "Automation",
    type: "Personal"
  },
  {
    title: "Lesson AI",
    subtitle: "AI-powered lesson planning assistant",
    description: "Lesson Planner AI is an innovative educational tool that leverages Google's Gemini AI to create detailed, professional lesson plans instantly. Perfect for teachers and educators.",
    url: "https://lessonai.netlify.app/",
    github: "https://github.com/Abhi-boostin/lessonai",
    skills: ["Next.js", "Gemini AI", "Tailwind CSS"],
    year: "2024",
    category: "AI Tool",
    type: "Personal"
  },
  {
    title: "Mained",
    subtitle: "Music Player with no ads",
    description: "A modern music discovery platform that combines LastFM's music data with YouTube playback functionality. Features a visually striking grid layout and real-time track search.",
    url: "https://mainedmusicplayer.netlify.app/",
    github: "https://github.com/Abhi-boostin/Mained-web-app",
    skills: ["Next.js", "Mantine UI", "YouTube API"],
    year: "2024",
    category: "Music",
    type: "Personal"
  },
  {
    title: "More Coming Soon",
    subtitle: "Future Projects",
    description: "More exciting projects are in the pipeline and will be added soon.",
    url: "N/A",
    github: "N/A",
    skills: ["..."],
    year: "2025",
    category: "Future",
    type: "Personal"
  }
];

export default function ProjectsSection() {
  const [selected, setSelected] = useState(0);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const personalProjects = projects.filter(p => p.type === 'Personal');
  const clientProjects = projects.filter(p => p.type === 'Client');

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate items on scroll
    const items = gsap.utils.toArray('.project-item');

    items.forEach((item: any, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen w-full bg-black text-white py-20 relative overflow-hidden"
      style={{ cursor: 'url("/icons and gifs/Cosmos.cur"), auto' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Quicksand:wght@300..700&family=Saira+Condensed:wght@100..900&display=swap');
      `}</style>

      <ButterflyFollower />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl">

        {/* Client Projects Section */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <span className="h-px w-8 bg-white/20"></span>
            <h2 className="text-sm text-neutral-400 uppercase tracking-[0.2em]">Client's Work</h2>
          </div>
          <div className="flex flex-col">
            {clientProjects.map((project) => {
              const globalIdx = projects.indexOf(project);
              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  idx={globalIdx}
                  openIdx={openIdx}
                  setOpenIdx={setOpenIdx}
                  selected={selected}
                  setSelected={setSelected}
                />
              );
            })}
          </div>
        </div>

        {/* Personal Projects Section */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <span className="h-px w-8 bg-white/20"></span>
            <h2 className="text-sm text-neutral-400 uppercase tracking-[0.2em]">Personal Projects</h2>
          </div>
          <div className="flex flex-col">
            {personalProjects.map((project) => {
              const globalIdx = projects.indexOf(project);
              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  idx={globalIdx}
                  openIdx={openIdx}
                  setOpenIdx={setOpenIdx}
                  selected={selected}
                  setSelected={setSelected}
                />
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}