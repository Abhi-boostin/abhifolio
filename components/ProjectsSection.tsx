"use client"
import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard, { Project } from "./ProjectCard";

const ButterflyFollower = dynamic(() => import('./ButterflyFollower'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    title: "Lesson AI",
    subtitle: "AI-powered lesson planning assistant",
    description: "Lesson Planner AI is an innovative educational tool that leverages Google's Gemini AI to create detailed, professional lesson plans instantly. Perfect for teachers and educators, it features a beautiful dark/light mode interface, easy plan management, and the ability to export lessons to PDF.",
    url: "https://lessonai.netlify.app/",
    github: "https://github.com/Abhi-boostin/lessonai",
    skills: ["Next.js", "Gemini AI", "Tailwind CSS", "TypeScript"],
    year: "2024",
    category: "AI Tool",
    type: "Personal"
  },
  {
    title: "AptosPilot",
    subtitle: "Aptos blockchain dApp",
    description: "AptosPilot is a Next.js dApp for Aptos blockchain, featuring Google OAuth keyless accounts, Petra Wallet integration, live APT balance, AI chat assistant, and multi-network support.",
    url: "N/A",
    github: "https://github.com/Abhi-boostin/aptospilot",
    skills: ["Next.js", "Aptos SDK", "Google OAuth", "Gemini AI"],
    year: "2024",
    category: "Blockchain",
    type: "Personal"
  },
  {
    title: "AVDH",
    subtitle: "Universal video downloader API",
    description: "Universal video downloader API built with Node.js and Express. It enables users to download videos from various platforms using a single endpoint, leveraging yt-dlp for broad compatibility.",
    url: "https://allvideodownloaderhub.onrender.com/",
    github: "https://github.com/Abhi-boostin/AVDH",
    skills: ["Node.js", "Express", "yt-dlp", "REST API"],
    year: "2024",
    category: "API",
    type: "Personal"
  },
  {
    title: "Choolha Chawka",
    subtitle: "Mess management web application",
    description: "Mess management web application built with React and Django. Streamlines daily operations for mess administrators and users, allowing menu browsing, meal booking, and profile management.",
    url: "https://www.choolhachowka.com/",
    github: "https://github.com/himanshu-sharmav/Choolha_Chawka",
    skills: ["React", "Django", "PostgreSQL", "AWS"],
    year: "2024",
    category: "Web App",
    type: "Personal"
  },
  {
    title: "StashBoard",
    subtitle: "Secure inventory management",
    description: "Secure inventory management backend with user authentication and OTP-based email verification. Built using Node.js, Express, MongoDB, and Mongoose.",
    url: "N/A",
    github: "https://github.com/Abhi-boostin/stashboard",
    skills: ["Node.js", "MongoDB", "Express", "JWT"],
    year: "2024",
    category: "Backend",
    type: "Personal"
  },
  {
    title: "Mained",
    subtitle: "Music Player with no ads",
    description: "A modern music discovery platform that combines LastFM's music data with YouTube playback functionality. Features a visually striking grid layout and real-time track search.",
    url: "https://abhi-boostin.github.io/Mained-web-app/",
    github: "https://github.com/Abhi-boostin/Mained-web-app",
    skills: ["Next.js", "Mantine UI", "YouTube API", "LastFM API"],
    year: "2024",
    category: "Music",
    type: "Personal"
  },
  {
    title: "Sideswitch",
    subtitle: "Agency website for Indie startups",
    description: "My own Agency website that provide multiple services currently working with Indie startups.",
    url: "https://sidedswitch2-0.vercel.app/",
    github: "https://github.com/Abhi-boostin/sidedswitch2.0",
    skills: ["Next.js", "React", "Design"],
    year: "2025",
    category: "Agency",
    type: "Client"
  },
  {
    title: "HEALTHUP",
    subtitle: "Angular fitness tracking app",
    description: "A fitness tracking application built with Angular 19 that helps users monitor their workout activities. Features include multi-user support and progress visualization.",
    url: "https://abhi-boostin.github.io/HEALTHUP/",
    github: "https://github.com/Abhi-boostin/HEALTHUP",
    skills: ["Angular 19", "Material UI", "Chart.js"],
    year: "2025",
    category: "Fitness",
    type: "Personal"
  },
  {
    title: "ecommerce-app",
    subtitle: "Trial Next.js + Vercel AI frontend",
    description: "A trial Next.js application created using Vercel's AI (v0) to explore AI-powered frontend design and rapid prototyping capabilities.",
    url: "http://67bc13020592966dd9e7f7a2--v0ecommercesite.netlify.app",
    github: "https://github.com/Abhi-boostin/ecommerce-app",
    skills: ["Next.js", "Vercel AI", "TypeScript"],
    year: "2025",
    category: "Ecommerce",
    type: "Personal"
  },
  {
    title: "ADHD",
    subtitle: "Random Unsplash Wallpaper",
    description: "A Python-based script that changes your desktop wallpaper to a random HD image from Unsplash. Automate fresh looks for your workspace.",
    url: "N/A",
    github: "https://github.com/Abhi-boostin/ADHD",
    skills: ["Python", "Unsplash API", "Automation"],
    year: "2025",
    category: "Script",
    type: "Personal"
  },
  {
    title: "course-app",
    subtitle: "Modern course platform",
    description: "A modern course platform using Next.js 15 and TypeScript, featuring intuitive course browsing and enrollment, responsive design, and real-time updates.",
    url: "https://coursemanagerui.netlify.app/",
    github: "https://github.com/Abhi-boostin/course-app",
    skills: ["Next.js 15", "TypeScript", "Real-time"],
    year: "2025",
    category: "Education",
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
    title: "Dikhato",
    subtitle: "Face matching automation",
    description: "A Python script for photographers to perform face recognition and distribute different sets of photos based on recognized faces.",
    url: "N/A",
    github: "https://github.com/Abhi-boostin/Dikhato",
    skills: ["Python", "Face Recognition", "Automation"],
    year: "2025",
    category: "Automation",
    type: "Personal"
  },
  {
    title: "IntelCorp",
    subtitle: "Phone number OSINT tool",
    description: "A JS tool to find details associated with a phone number including name, location, and last seen, useful for OSINT and information gathering.",
    url: "https://intelcorp.netlify.app/",
    github: "https://github.com/Abhi-boostin/IntelCorp",
    skills: ["JavaScript", "OSINT", "Tools"],
    year: "2025",
    category: "OSINT",
    type: "Personal"
  },
  {
    title: "OneBrand",
    subtitle: "One stop ecommerce website",
    description: "A website for your store with complete backend, frontend, database, admin side, and customer side. Full ecommerce solution.",
    url: "https://onebrandoutfit.netlify.app/",
    github: "https://github.com/Abhi-boostin/OneBrand",
    skills: ["React", "Node.js", "MongoDB", "Figma"],
    year: "2025",
    category: "Ecommerce",
    type: "Client"
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
    type: "Client"
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

        {/* Personal Projects Section */}
        <div className="mb-32">
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

        {/* Client Projects Section */}
        <div>
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

      </div>
    </section>
  );
}