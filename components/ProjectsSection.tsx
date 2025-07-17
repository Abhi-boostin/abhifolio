"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import dynamic from 'next/dynamic';
import ProjectCard from "./ProjectCard";

const ButterflyFollower = dynamic(() => import('./ButterflyFollower'), { ssr: false });

const projects = [
  {
    title: "Lesson AI",
    subtitle: "AI-powered lesson planning assistant",
    description: "Lesson Planner AI is an innovative educational tool that leverages Google's Gemini AI to create detailed, professional lesson plans instantly. Perfect for teachers and educators, it features a beautiful dark/light mode interface, easy plan management, and the ability to export lessons to PDF. Built with Next.js and modern web technologies.",
    url: "https://lessonai.netlify.app/",
    github: "https://github.com/Abhi-boostin/lessonai",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Gemini AI", "Radix UI", "shadcn/ui", "Node.js", "npm", "ESLint", "Turbo", "html2pdf", "jsPDF", "next-theme", "react-to-print", "Google Studio", "Lucide", "tailwind-merge", "React 19"],
  },
  {
    title: "AptosPilot",
    subtitle: "Aptos blockchain dApp with keyless accounts",
    description: "AptosPilot is a Next.js dApp for Aptos blockchain, featuring Google OAuth keyless accounts, Petra Wallet integration, live APT balance, AI chat assistant, and multi-network support. It offers a modern, glassmorphic UI for secure, user-friendly blockchain interactions.",
    url: "N/A",
    github: "https://github.com/Abhi-boostin/aptospilot",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Aptos SDK", "Wallet Adapter", "Google OAuth", "Gemini AI", "API routes", "Cryptography"],
  },
  {
    title: "AVDH",
    subtitle: "Universal video downloader API",
    description: "This project is a universal video downloader API built with Node.js and Express. It enables users to download videos from various platforms using a single endpoint, leveraging yt-dlp for broad compatibility. The API streams requested videos directly, simplifying access and download for any supported video URL.",
    url: "https://allvideodownloaderhub.onrender.com/",
    github: "https://github.com/Abhi-boostin/AVDH",
    skills: ["Node.js", "Express.js", "REST API", "yt-dlp integration", "Video streaming", "File handling", "Error handling"],
  },
  {
    title: "Choolha Chawka",
    subtitle: "Mess management web application",
    description: "Choolha Chawka is a mess management web application built with React, Tailwind CSS, and Django REST Framework. It streamlines daily operations for mess administrators and users, allowing menu browsing, meal booking, and profile management. The backend uses PostgreSQL and AWS Elastic Beanstalk for secure, scalable data handling.",
    url: "N/A",
    github: "https://github.com/himanshu-sharmav/Choolha_Chawka",
    skills: ["React 18", "TypeScript", "Tailwind CSS", "React Router", "Axios", "React Hot Toast", "Lucide React", "Vite", "Django 5.2.1", "Django REST Framework", "Python 3.x", "PostgreSQL", "AWS Elastic Beanstalk", "boto3", "django-cors-headers"],
  },
  {
    title: "StashBoard",
    subtitle: "Secure inventory management system",
    description: "Stashboard is a secure inventory management backend with user authentication and OTP-based email verification. Built using Node.js, Express, MongoDB, and Mongoose, it features registration, login, OTP generation, and resend OTP endpoints. Users can update their profiles and change passwords securely. The API uses JWT for authentication and Gmail SMTP.",
    url: "N/A",
    github: "https://github.com/Abhi-boostin/stashboard",
    skills: ["React", "React Router DOM", "Tailwind CSS", "Vite", "Axios", "React Hot Toast", "Lucide React", "ESLint", "PostCSS", "Autoprefixer", "Node.js", "Express", "Mongoose", "MongoDB", "dotenv", "bcryptjs", "jsonwebtoken", "nodemailer", "express-validator", "Morgan", "CORS", "Nodemon"],
  },
  {
    title: "Mained",
    subtitle: "Music Player with no ads",
    description: "A modern music discovery platform that combines LastFM's music data with YouTube playback functionality. Features a visually striking grid layout with dynamic image tiles, real-time track search, and a seamless music player experience. The app showcases weekly top tracks and allows users to explore and play music directly within the interface.",
    url: "https://abhi-boostin.github.io/Mained-web-app/",
    github: "https://github.com/Abhi-boostin/Mained-web-app",
    skills: [
      "Next.js (React)",
      "TypeScript",
      "Mantine UI",
      "Tabler Icons",
      "Tailwind CSS",
      "PostCSS",
      "Cheerio",
      "LastFM API",
      "YouTube Data API",
      "Genius API",
      "ESLint",
      "GitHub Actions (CI/CD)",
      "CSS-in-JS",
      "React Hooks"
    ],
  },
  {
    title: "Sideswitch",
    subtitle: "Agency website for Indie startups",
    description: "My own Agency website that provide multiple services currently working with Indie startups",
    url: "https://sidedswitch2-0.vercel.app/",
    github: "https://github.com/Abhi-boostin/sidedswitch2.0",
    skills: ["Nextjs/React", "and a lot of things"],
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
      className="min-h-screen w-full flex flex-col items-center border-b px-2 md:px-0 bg-black dark:bg-black pt-12 pb-32 relative overflow-hidden"
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