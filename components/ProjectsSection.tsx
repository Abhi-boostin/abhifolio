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
    skills: [
      "Next.js", "React", "TypeScript", "Tailwind CSS", "Gemini AI", "Radix UI", "shadcn/ui", "Node.js", 
      "npm", "ESLint", "Turbo", "html2pdf", "jsPDF", "next-theme", "react-to-print", "Google Studio", 
      "Lucide", "tailwind-merge", "React 19"
    ],
  },
  {
    title: "AptosPilot",
    subtitle: "Aptos blockchain dApp with keyless accounts",
    description: "AptosPilot is a Next.js dApp for Aptos blockchain, featuring Google OAuth keyless accounts, Petra Wallet integration, live APT balance, AI chat assistant, and multi-network support. It offers a modern, glassmorphic UI for secure, user-friendly blockchain interactions.",
    url: "N/A",
    github: "https://github.com/Abhi-boostin/aptospilot",
    skills: [
      "Next.js", "TypeScript", "Tailwind CSS", "React", "Aptos SDK", "Wallet Adapter", "Google OAuth",
      "Gemini AI", "API routes", "Cryptography"
    ],
  },
  {
    title: "AVDH",
    subtitle: "Universal video downloader API",
    description: "This project is a universal video downloader API built with Node.js and Express. It enables users to download videos from various platforms using a single endpoint, leveraging yt-dlp for broad compatibility. The API streams requested videos directly, simplifying access and download for any supported video URL.",
    url: "https://allvideodownloaderhub.onrender.com/",
    github: "https://github.com/Abhi-boostin/AVDH",
    skills: [
      "Node.js", "Express.js", "REST API", "yt-dlp integration", "Video streaming", 
      "File handling", "Error handling"
    ],
  },
  {
    title: "Choolha Chawka",
    subtitle: "Mess management web application",
    description: "Choolha Chawka is a mess management web application built with React, Tailwind CSS, and Django REST Framework. It streamlines daily operations for mess administrators and users, allowing menu browsing, meal booking, and profile management. The backend uses PostgreSQL and AWS Elastic Beanstalk for secure, scalable data handling.",
    url: "https://www.choolhachowka.com/",
    github: "https://github.com/himanshu-sharmav/Choolha_Chawka",
    skills: [
      "React 18", "TypeScript", "Tailwind CSS", "React Router", "Axios", "React Hot Toast", "Lucide React",
      "Vite", "Django 5.2.1", "Django REST Framework", "Python 3.x", "PostgreSQL",
      "AWS Elastic Beanstalk", "boto3", "django-cors-headers"
    ],
  },
  {
    title: "StashBoard",
    subtitle: "Secure inventory management system",
    description: "Stashboard is a secure inventory management backend with user authentication and OTP-based email verification. Built using Node.js, Express, MongoDB, and Mongoose, it features registration, login, OTP generation, and resend OTP endpoints. Users can update their profiles and change passwords securely. The API uses JWT for authentication and Gmail SMTP.",
    url: "N/A",
    github: "https://github.com/Abhi-boostin/stashboard",
    skills: [
      "React", "React Router DOM", "Tailwind CSS", "Vite", "Axios", "React Hot Toast", "Lucide React", 
      "ESLint", "PostCSS", "Autoprefixer", "Node.js", "Express", "Mongoose", "MongoDB", "dotenv", 
      "bcryptjs", "jsonwebtoken", "nodemailer", "express-validator", "Morgan", "CORS", "Nodemon"
    ],
  },
  {
    title: "Mained",
    subtitle: "Music Player with no ads",
    description: "A modern music discovery platform that combines LastFM's music data with YouTube playback functionality. Features a visually striking grid layout with dynamic image tiles, real-time track search, and a seamless music player experience. The app showcases weekly top tracks and allows users to explore and play music directly within the interface.",
    url: "https://abhi-boostin.github.io/Mained-web-app/",
    github: "https://github.com/Abhi-boostin/Mained-web-app",
    skills: [
      "Next.js (React)", "TypeScript", "Mantine UI", "Tabler Icons", "Tailwind CSS", "PostCSS", 
      "Cheerio", "LastFM API", "YouTube Data API", "Genius API", "ESLint", "GitHub Actions (CI/CD)",
      "CSS-in-JS", "React Hooks"
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
  // --- Newly added projects below ---
  {
    title: "HEALTHUP",
    subtitle: "Angular fitness tracking app",
    description: "A fitness tracking application built with Angular 19 that helps users monitor their workout activities. Features include multi-user support, workout type categorization (Running, Cycling, Swimming, etc.), progress visualization with Chart.js, and data persistence using LocalStorage. Styled with Material UI and Tailwind CSS for a modern, responsive UI.",
    url: "https://abhi-boostin.github.io/HEALTHUP/",
    github: "https://github.com/Abhi-boostin/HEALTHUP",
    skills: ["Angular 19", "Angular Material", "Tailwind CSS", "Chart.js", "TypeScript", "GitHub Actions", "GitHub Pages"],
  },
  {
    title: "ecommerce-app",
    subtitle: "Trial Next.js + Vercel AI frontend",
    description: "A trial Next.js application created using Vercel's AI (v0) to explore AI-powered frontend design and rapid prototyping capabilities. Built with TypeScript.",
    url: "http://67bc13020592966dd9e7f7a2--v0ecommercesite.netlify.app",
    github: "https://github.com/Abhi-boostin/ecommerce-app",
    skills: ["Next.js", "Vercel AI (v0)", "TypeScript"],
  },
  {
    title: "ADHD",
    subtitle: "Random Unsplash Wallpaper for Desktop",
    description: "A Python-based script that changes your desktop wallpaper to a random HD image from Unsplash. Automate fresh looks for your workspace with one command.",
    url: "N/A",
    github: "https://github.com/Abhi-boostin/ADHD",
    skills: ["Python", "Unsplash API", "Automation", "Scripting"],
  },
  {
    title: "course-app",
    subtitle: "Modern course platform",
    description: "A modern course platform using Next.js 15 and TypeScript, featuring intuitive course browsing and enrollment, responsive design, dark/light mode, and real-time update features.",
    url: "https://coursemanagerui.netlify.app/",
    github: "https://github.com/Abhi-boostin/course-app",
    skills: ["Next.js 15", "TypeScript", "Responsive Web Design", "Real-time updates"],
  },
  {
    title: "EasyHealth",
    subtitle: "Medical document reader and guide",
    description: "EasyHealth is a web app that helps users understand medical documents, health reports, and provides guidance for further medical understanding and actions.",
    url: "https://eayhealthdemo.netlify.app/",
    github: "https://github.com/Abhi-boostin/EasyHealth",
    skills: ["JavaScript", "Web App", "Medical Tech"],
  },
  {
    title: "Dikhato",
    subtitle: "Face matching automation for photographers",
    description: "A Python script for photographers to perform face recognition and distribute different sets of photos based on recognized faces from large image pools.",
    url: "N/A",
    github: "https://github.com/Abhi-boostin/Dikhato",
    skills: ["Python", "Face Recognition", "Automation", "Photography Tools"],
  },
  {
    title: "IntelCorp",
    subtitle: "Phone number OSINT tool",
    description: "A JS tool to find details associated with a phone number including name, location, and last seen, useful for OSINT and information gathering.",
    url: "https://intelcorp.netlify.app/",
    github: "https://github.com/Abhi-boostin/IntelCorp",
    skills: ["JavaScript", "OSINT", "Phone Lookup"],
  },
  {
    title: "OneBrand",
    subtitle: "One stop ecommerce website",
    description:
      "A website for your store with complete backend, frontend, database, admin side, and customer side. You can add products, let your customers add to cart, wishlist, proceed with payment, and offers delivery integration.",
    url: "https://onebrandoutfit.netlify.app/",
    github: "https://github.com/Abhi-boostin/OneBrand",
    skills: [
      "HTML", "CSS", "JavaScript", "React", "Vite", "React Router", "React Query",
      "Figma", "MongoDB", "Mongoose", "JWT Auth", "Zod"
    ],
  },
  {
    title: "autoshift",
    subtitle: "A n8n pipeline for finding business mails in just a minute",
    description:
      "autoshift streamlines lead generation and outreach by enabling you to quickly discover business emails. The workflow leverages a custom n8n pipeline with React front-end, allowing users to enter a company or domain and instantly receive verified business emails—ready for marketing, sales, or networking purposes.",
    url: "https://autoshift.vercel.app/",
    github: "https://github.com/Abhi-boostin/autoshift",
    skills: [
      "HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "n8n", "Context API"
    ],
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