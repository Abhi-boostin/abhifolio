"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IconExternalLink } from "@tabler/icons-react";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
    company: string;
    role: string;
    period: string;
    location: string;
    bullets: string[];
    url?: string;
    tech: string[];
    color: string;
}

const experiences: Experience[] = [
    {
        company: "BAU AI",
        role: "AI Full-Stack Engineer",
        period: "Jan 2026 - Present",
        location: "Remote · Germany / US",
        url: "https://www.bauai.eu",
        bullets: [
            "Designing the product frontend architecture using TanStack Query caching and hierarchical query keys.",
            "Built an end-to-end RAG pipeline with Apache Tika, Gemini embeddings, and pgvector retrieval.",
            "Setting up GCP infrastructure on Compute Engine and Cloud Run with cost-efficiency tuning.",
            "Owning Supabase schema and PostgreSQL query optimization for high-volume document tables.",
            "Maintaining Postgres RPCs and Supabase Edge Functions; patching open endpoints and access-control bugs.",
            "Implemented dual-side rate limiting (client + server) to harden public endpoints against abuse.",
            "Owning features end-to-end with Unit / E2E test coverage across the stack.",
        ],
        tech: ["Next.js", "TanStack", "Supabase", "GCP", "RAG", "pgvector"],
        color: "text-blue-400",
    },
    {
        company: "Miracle AI",
        role: "Founding Engineer",
        period: "Nov 2025 - Feb 2026",
        location: "Hybrid · Delhi",
        url: "https://www.miracleai.in",
        bullets: [
            "Owned the product frontend end-to-end, improving modularity and performance with TypeScript.",
            "Enforced feature-based architecture and dead-code cleanups for long-term maintainability.",
            "Integrated Flask + Celery + Redis backend for OCR-driven invoice automation into Tally.",
            "Triaging production logs and runtime metrics; catching regressions before user-facing impact.",
            "Shipping zero-downtime hotfixes under tight delivery SLAs.",
        ],
        tech: ["TypeScript", "Flask", "Celery", "Redis", "Tally"],
        color: "text-purple-400",
    },
    {
        company: "Mouse & Cheese Design Studio",
        role: "Frontend / Full-Stack Engineer",
        period: "Sep 2025 - Nov 2025",
        location: "In-Office · Noida",
        url: "https://www.mousencheese.design",
        bullets: [
            "Designed and shipped 5 high-revenue client websites: Figma to Next.js / React with on-page SEO.",
            "Translated Figma into accessible, responsive React components with cross-browser parity.",
            "Built a merchant-agnostic Node.js admin layer over Shopify's REST + GraphQL APIs.",
            "Single-button store ops (pause store, payments, offline) replacing Shopify's multi-step flows.",
        ],
        tech: ["Next.js", "Shopify", "GraphQL", "Node.js"],
        color: "text-yellow-400",
    },
    {
        company: "Choolha Chowka",
        role: "Frontend Engineer",
        period: "Jun 2025 - Aug 2025",
        location: "Remote",
        url: "https://www.choolhachowka.com/",
        bullets: [
            "Shipped a 22-page React + Vite + TypeScript SPA for a multi-role food-subscription platform.",
            "Built role-aware routing (customer, mess-owner, admin) with React Router.",
            "Designed reusable Tailwind CSS components for consistent UI across all 22 pages.",
            "Built the data layer on TanStack Query with typed services and cache invalidation.",
            "Integrated Razorpay checkout with HMAC-SHA256 signature verification on payment callbacks.",
        ],
        tech: ["React", "Vite", "TypeScript", "TanStack", "Razorpay"],
        color: "text-orange-400",
    },
    {
        company: "SideSwitch",
        role: "Full-Stack Engineer · Self-Employed",
        period: "Aug 2024 - Present",
        location: "Remote",
        url: "https://sideswitch.in",
        bullets: [
            "Delivering web apps, AI integrations, and automation pipelines across 10+ client engagements.",
            "Built n8n + custom Node automation pipelines that cut client manual work by ~40%.",
            "Migrated client legacy stacks to modern frameworks (React, Next.js) for better performance.",
            "Optimized on-page SEO across the portfolio, lifting organic traffic by ~35%.",
            "Managed automated ad pipelines as recurring deliverables for ongoing clients.",
        ],
        tech: ["Next.js", "n8n", "Node.js", "SEO"],
        color: "text-cyan-400",
    },
];

export default function ExperienceTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".timeline-item");

            items.forEach((item: any) => {
                gsap.fromTo(
                    item,
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
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            // Line animation
            gsap.fromTo(
                ".timeline-line",
                { scaleY: 0 },
                {
                    scaleY: 1,
                    duration: 2,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 1,
                    },
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
                        key={exp.company}
                        className={`timeline-item flex flex-col md:flex-row gap-8 md:gap-16 relative ${
                            index % 2 === 0 ? "md:text-right" : "md:flex-row-reverse md:text-left"
                        }`}
                    >
                        {/* Dot on the line */}
                        <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-black border-2 border-white/30 z-10 mt-1.5 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />

                        {/* Date + location (Opposite side) */}
                        <div
                            className={`pl-16 md:pl-0 flex-1 md:w-1/2 ${
                                index % 2 === 0 ? "md:order-1" : "md:order-2"
                            }`}
                        >
                            <span className="font-mono text-sm text-neutral-500 tracking-widest uppercase block">
                                {exp.period}
                            </span>
                            <span className="font-mono text-[11px] text-neutral-600 tracking-wider uppercase block mt-1">
                                {exp.location}
                            </span>
                        </div>

                        {/* Content Card */}
                        <div
                            className={`pl-16 md:pl-0 flex-1 md:w-1/2 ${
                                index % 2 === 0 ? "md:order-2" : "md:order-1"
                            }`}
                        >
                            <div className="group relative">
                                <h3
                                    className="text-3xl md:text-4xl font-light mb-2 text-white group-hover:text-white/90 transition-colors"
                                    style={{ fontFamily: '"Oswald", sans-serif' }}
                                >
                                    {exp.company}
                                </h3>
                                <div
                                    className={`text-sm font-medium mb-5 uppercase tracking-wider ${exp.color}`}
                                >
                                    {exp.role}
                                </div>

                                <ul
                                    className={`space-y-2 mb-6 text-sm md:text-[15px] text-neutral-400 leading-relaxed ${
                                        index % 2 === 0 ? "md:list-inside" : ""
                                    }`}
                                    style={{ fontFamily: '"Quicksand", sans-serif' }}
                                >
                                    {exp.bullets.map((b, i) => (
                                        <li
                                            key={i}
                                            className={`flex gap-2 ${
                                                index % 2 === 0
                                                    ? "md:flex-row-reverse md:text-right"
                                                    : ""
                                            }`}
                                        >
                                            <span className="mt-2 w-1 h-1 rounded-full bg-white/40 shrink-0" />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Tech Stack & Links */}
                                <div
                                    className={`flex flex-wrap gap-2 items-center ${
                                        index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                                    }`}
                                >
                                    {exp.tech?.map((t) => (
                                        <span
                                            key={t}
                                            className="px-2 py-1 text-[10px] uppercase tracking-wider border border-white/10 rounded-full text-neutral-500"
                                        >
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
