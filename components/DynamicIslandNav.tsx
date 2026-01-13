"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconHome,
    IconCode,
    IconBulb,
    IconBrandGithub,
    IconBrandLinkedin,
    IconFileText,
    IconMail,
    IconDeviceGamepad2,
    IconBriefcase,
    IconMenu2,
    IconX
} from "@tabler/icons-react";
import Link from 'next/link';
import MailModal from "./MailModal";

const navItems = [
    { title: "Home", icon: <IconHome size={20} />, href: "/", isInternal: true },
    { title: "Projects", icon: <IconCode size={20} />, href: "/projects", isInternal: true },
    { title: "Skills", icon: <IconBulb size={20} />, href: "/skills", isInternal: true },
    { title: "Experience", icon: <IconBriefcase size={20} />, href: "/experience", isInternal: true },
    { title: "Game", icon: <IconDeviceGamepad2 size={20} />, href: "/game", isInternal: true },
    { title: "GitHub", icon: <IconBrandGithub size={20} />, href: "https://github.com/Abhi-boostin" },
    { title: "LinkedIn", icon: <IconBrandLinkedin size={20} />, href: "https://www.linkedin.com/in/abhiboostin/" },
    { title: "Resume", icon: <IconFileText size={20} />, href: "https://drive.google.com/file/d/1VnoOlRSkGPoGQypLrUekEQiM8BfQCqiJ/view?usp=drive_link" },
    { title: "Mail", icon: <IconMail size={20} />, href: "#", isInternal: false, isMail: true },
];

export default function DynamicIslandNav() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMailModalOpen, setIsMailModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleItemClick = (item: any) => {
        if (item.isMail) {
            setIsMailModalOpen(true);
            setIsOpen(false);
            return;
        }
        setIsOpen(false);
    };

    return (
        <>
            <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center items-end pointer-events-none">
                <div className="pointer-events-auto" ref={containerRef}>
                    <motion.div
                        layout
                        initial={false}
                        animate={{
                            width: isOpen ? "auto" : 60,
                            height: isOpen ? "auto" : 60,
                            borderRadius: 32,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                        }}
                        className={`bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl shadow-black/50 relative flex items-center justify-center ${isOpen ? "p-4" : ""
                            }`}
                        style={{
                            minWidth: 60,
                            minHeight: 60,
                        }}
                    >
                        <AnimatePresence mode="popLayout">
                            {!isOpen ? (
                                <motion.button
                                    key="menu-btn"
                                    layout="position"
                                    initial={{ opacity: 0, scale: 0.5, filter: "blur(5px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.5, filter: "blur(5px)" }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => setIsOpen(true)}
                                    className="absolute inset-0 flex items-center justify-center w-full h-full text-white hover:text-neutral-300 transition-colors z-10"
                                >
                                    <IconMenu2 size={24} />
                                </motion.button>
                            ) : (
                                <motion.div
                                    key="content"
                                    layout="position"
                                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                        opacity: { duration: 0.2 }
                                    }}
                                    className="flex flex-col gap-4 min-w-[300px] sm:min-w-[400px]"
                                >
                                    {/* Header with Close Button */}
                                    <div className="flex items-center justify-between mb-2 px-2">
                                        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Navigation</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                            className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                        >
                                            <IconX size={16} className="text-neutral-400" />
                                        </button>
                                    </div>

                                    {/* Grid of Items */}
                                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                                        {navItems.map((item) => {
                                            const isExternal = !item.isInternal && !item.isMail;

                                            const Content = () => (
                                                <div className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/10 transition-colors group min-w-[70px]">
                                                    <div className="p-2 rounded-xl bg-white/5 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300 border border-white/5 group-hover:border-white/20 text-white">
                                                        {item.icon}
                                                    </div>
                                                    <span className="text-[10px] font-medium text-neutral-400 group-hover:text-white transition-colors">
                                                        {item.title}
                                                    </span>
                                                </div>
                                            );

                                            if (item.isMail) {
                                                return (
                                                    <button key={item.title} onClick={() => handleItemClick(item)}>
                                                        <Content />
                                                    </button>
                                                );
                                            }

                                            if (isExternal) {
                                                return (
                                                    <a
                                                        key={item.title}
                                                        href={item.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <Content />
                                                    </a>
                                                );
                                            }

                                            return (
                                                <Link key={item.title} href={item.href} onClick={() => setIsOpen(false)}>
                                                    <Content />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            <MailModal
                isOpen={isMailModalOpen}
                onClose={() => setIsMailModalOpen(false)}
            />
        </>
    );
}
