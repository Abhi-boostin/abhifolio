"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconBriefcase, IconExternalLink } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    url?: string;
    linkedin?: string;
    tech?: string[];
    color: string;
}

const experiences: Experience[] = [
    {
        company: "Miracle.AI",
        role: "Frontend Engineer",
        period: "Jan 2026 - Present",
        description: "Currently working on cutting-edge AI solutions. (Details Confidential)",
        color: "text-purple-400",
        tech: ["AI", "Next.js"]
    },
    {
        company: "Mouse & Cheese",
        role: "Frontend Engineer & Team Lead",
        period: "Nov 2025 - Jan 2026",
        description: "Spearheaded the development of a bespoke SaaS middleware bridging clients with Shopify. Engineered a secure, headless administrative interface that eliminates direct Shopify access, streamlining operations and enhancing security for e-commerce management.",
        url: "https://lightemotion.netlify.app/",
        color: "text-yellow-400",
        tech: ["Shopify API", "SaaS", "Middleware"]
    },
    {
        company: "Choolha Chowka",
        role: "Project Manager / Frontend Engineer",
        period: "Jun 2025 - Sep 2025",
        description: "Architected a comprehensive Mess Management SaaS. Transformed manual mess operations into a fully automated digital ecosystem featuring subscription management, payment gateways, real-time feedback loops, and inventory logs.",
        url: "https://www.choolhachowka.com/",
        color: "text-orange-400",
        tech: ["React", "Django", "SaaS"]
    },
    {
        company: "Nritya",
        role: "Fullstack Developer",
        period: "Oct 2024 - Dec 2024",
        description: "Built a hyper-local discovery platform for dance enthusiasts. Implemented advanced filtering logic and a seamless booking interface, connecting users with studios through a dynamic, real-time experience.",
        url: "https://www.nritya.co.in/",
        linkedin: "https://www.linkedin.com/company/nritya/",
        color: "text-pink-400",
        tech: ["Frontend", "Maps", "UX"]
    },
    {
        company: "Sideswitch",
        role: "Founding Engineer",
        period: "Aug 2024 - Dec 2024",
        description: "Co-founded a multi-disciplinary digital agency delivering high-impact Web2/Web3 solutions and automation. Led diverse client projects including ATCCoinfra and DKFFJ, driving digital transformation for startups.",
        url: "https://sideswitch.in/",
        linkedin: "https://www.linkedin.com/in/sideswitch/",
        color: "text-blue-400",
        tech: ["Agency", "Web3", "Automation"]
    },
    {
        company: "The LogicGen",
        role: "Frontend Designer",
        period: "Jan 2024 - Jun 2024",
        description: "Crafted the company's core web presence and delivered tailored UI/UX solutions for key clients. Specialized in translating complex requirements into intuitive, performant frontend interfaces.",
        url: "https://thelogicgen.com/",
        linkedin: "https://www.linkedin.com/company/thelogicgen/",
        color: "text-cyan-400",
        tech: ["UI/UX", "Frontend"]
    },
    {
        company: "SMTPget",
        role: "General Software Engineer",
        period: "Aug 2023 - Nov 2023",
        description: "Evolved from customer support to core development. Designed and built mission-critical SMTP dashboards, enabling clients to monitor email performance, manage senders, and troubleshoot delivery in real-time.",
        url: "https://smtpget.com/",
        linkedin: "https://www.linkedin.com/company/smtpget/",
        color: "text-green-400",
        tech: ["Dashboard", "Analytics"]
    }
];

export default function ExperienceTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".timeline-item");

            items.forEach((item: any) => {
                gsap.fromTo(item,
                    { opacity: 0, x: -50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            end: "bottom 20%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Line animation
            gsap.fromTo(".timeline-line",
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative max-w-4xl mx-auto px-4 py-20">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-20 bottom-20 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent timeline-line origin-top" />

            <div className="space-y-24">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className={`timeline-item flex flex-col md:flex-row gap-8 md:gap-16 relative ${index % 2 === 0 ? "md:text-right" : "md:flex-row-reverse md:text-left"
                            }`}
                    >
                        {/* Dot on the line */}
                        <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-black border-2 border-white/30 z-10 mt-1.5 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />

                        {/* Date (Opposite side) */}
                        <div className={`pl-16 md:pl-0 flex-1 md:w-1/2 ${index % 2 === 0 ? "md:order-1" : "md:order-2"
                            }`}>
                            <span className="font-mono text-sm text-neutral-500 tracking-widest uppercase">
                                {exp.period}
                            </span>
                        </div>

                        {/* Content Card */}
                        <div className={`pl-16 md:pl-0 flex-1 md:w-1/2 ${index % 2 === 0 ? "md:order-2" : "md:order-1"
                            }`}>
                            <div className="group relative">
                                <h3
                                    className="text-3xl md:text-4xl font-light mb-2 text-white group-hover:text-white/90 transition-colors"
                                    style={{ fontFamily: '"Oswald", sans-serif' }}
                                >
                                    {exp.company}
                                </h3>
                                <div className={`text-sm font-medium mb-4 uppercase tracking-wider ${exp.color}`}>
                                    {exp.role}
                                </div>
                                <p
                                    className="text-neutral-400 leading-relaxed mb-6 text-sm md:text-base"
                                    style={{ fontFamily: '"Quicksand", sans-serif' }}
                                >
                                    {exp.description}
                                </p>

                                {/* Tech Stack & Links */}
                                <div className={`flex flex-wrap gap-3 items-center ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                                    }`}>
                                    {exp.tech?.map(t => (
                                        <span key={t} className="px-2 py-1 text-[10px] uppercase tracking-wider border border-white/10 rounded-full text-neutral-500">
                                            {t}
                                        </span>
                                    ))}

                                    {exp.url && (
                                        <a
                                            href={exp.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-2 p-2 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white"
                                        >
                                            <IconExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
