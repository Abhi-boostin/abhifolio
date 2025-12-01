"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, FileText, ArrowRight, RefreshCw } from "lucide-react";

// --- Types ---
type Option = {
    id: string;
    text: string;
    isStar: boolean;
    percent: number; // Simulated community stat
};

type Question = {
    id: number;
    text: string;
    goal: string;
    options: Option[];
    explanation: string;
};

// --- Data ---
const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What impresses you most in a developer’s portfolio?",
        goal: "Highlight your strengths (real projects, shipping, clarity).",
        explanation: "I focus on A: small but real projects where I can show impact on users and business.",
        options: [
            { id: "A", text: "Real shipped projects with clear impact", isStar: true, percent: 68 },
            { id: "B", text: "Very long tech stack list", isStar: false, percent: 12 },
            { id: "C", text: "Beautiful UI only", isStar: false, percent: 15 },
            { id: "D", text: "Competitive programming profiles", isStar: false, percent: 5 },
        ],
    },
    {
        id: 2,
        text: "When you hire a dev, what matters more?",
        goal: "Position yourself as someone who ships + learns.",
        explanation: "I believe fundamentals > tools. Tools change, but problem-solving stays.",
        options: [
            { id: "A", text: "Perfect knowledge of every tool from day one", isStar: false, percent: 10 },
            { id: "B", text: "Strong fundamentals + ability to learn fast", isStar: true, percent: 85 },
            { id: "C", text: "Only past company names / big brands", isStar: false, percent: 5 },
        ],
    },
    {
        id: 3,
        text: "How should a junior dev behave in the first 90 days?",
        goal: "Show you’re proactive, communicative.",
        explanation: "I ask questions early and ship small things quickly to build trust.",
        options: [
            { id: "A", text: "Ask questions, ship small things quickly, and over-communicate", isStar: true, percent: 72 },
            { id: "B", text: "Try to do everything alone quietly", isStar: false, percent: 20 },
            { id: "C", text: "Only work on tasks assigned, nothing else", isStar: false, percent: 8 },
        ],
    },
    {
        id: 4,
        text: "What do you prefer during code reviews?",
        goal: "Show you like feedback and clean code.",
        explanation: "I view code reviews as a learning opportunity, not a test.",
        options: [
            { id: "A", text: "Open conversation, suggestions both ways, focus on readability", isStar: true, percent: 80 },
            { id: "B", text: "Only check if it compiles and passes tests", isStar: false, percent: 10 },
            { id: "C", text: "Nitpick tiny style issues but ignore bigger design problems", isStar: false, percent: 10 },
        ],
    },
    {
        id: 5,
        text: "A feature is almost done, but we’re near deadline. What’s your priority?",
        goal: "Show you balance shipping and quality.",
        explanation: "Perfect is the enemy of done. I ship stable MVPs and iterate.",
        options: [
            { id: "A", text: "Ship a small, stable version and improve it after feedback", isStar: true, percent: 75 },
            { id: "B", text: "Delay release until every pixel is perfect", isStar: false, percent: 15 },
            { id: "C", text: "Ship everything, even half-broken, just to say it’s done", isStar: false, percent: 10 },
        ],
    },
    {
        id: 6,
        text: "What soft skill do you value the most in a dev?",
        goal: "Tie into how you work with teams.",
        explanation: "Tech skills get you hired, but communication keeps you hired.",
        options: [
            { id: "A", text: "Clear, honest communication", isStar: true, percent: 90 },
            { id: "B", text: "Never asking for help", isStar: false, percent: 5 },
            { id: "C", text: "Working long hours silently", isStar: false, percent: 5 },
        ],
    },
    {
        id: 7,
        text: "What makes a CV stand out enough for you to interview someone?",
        goal: "Lead directly into your resume.",
        explanation: "If you picked A, you’ll probably like my CV too. 👀",
        options: [
            { id: "A", text: "Concise, focused CV with relevant projects and links", isStar: true, percent: 88 },
            { id: "B", text: "8-page CV listing every course ever taken", isStar: false, percent: 2 },
            { id: "C", text: "CV with generic buzzwords like ‘hard-working’", isStar: false, percent: 10 },
        ],
    },
];

export default function RecruiterPoll() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [showStats, setShowStats] = useState(false);
    const [matchScore, setMatchScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const currentQuestion = QUESTIONS[currentIndex];

    const handleVote = (optionId: string) => {
        if (showStats) return; // Prevent double voting
        setSelectedOptionId(optionId);
        setShowStats(true);

        const option = currentQuestion.options.find((o) => o.id === optionId);
        if (option?.isStar) {
            setMatchScore((prev) => prev + 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setSelectedOptionId(null);
            setShowStats(false);
        } else {
            setIsFinished(true);
        }
    };

    const restart = () => {
        setCurrentIndex(0);
        setSelectedOptionId(null);
        setShowStats(false);
        setMatchScore(0);
        setIsFinished(false);
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-black text-white px-4 font-sans">
            <div className="w-full max-w-2xl">
                <AnimatePresence mode="wait">
                    {!isFinished ? (
                        <motion.div
                            key="question-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-sm"
                        >
                            {/* Progress */}
                            <div className="flex items-center justify-between mb-8 text-sm text-neutral-500 font-mono">
                                <span>QUESTION {currentIndex + 1} / {QUESTIONS.length}</span>
                                <span>MATCH: {matchScore}</span>
                            </div>

                            {/* Question */}
                            <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                                {currentQuestion.text}
                            </h2>
                            <p className="text-neutral-400 mb-8 text-sm italic">
                                Goal: {currentQuestion.goal}
                            </p>

                            {/* Options */}
                            <div className="space-y-3">
                                {currentQuestion.options.map((option) => {
                                    const isSelected = selectedOptionId === option.id;
                                    const isStar = option.isStar;

                                    return (
                                        <button
                                            key={option.id}
                                            onClick={() => handleVote(option.id)}
                                            disabled={showStats}
                                            className={`relative w-full text-left p-4 rounded-xl border transition-all overflow-hidden group ${showStats
                                                ? isSelected
                                                    ? "border-white bg-neutral-800"
                                                    : "border-neutral-800 opacity-50"
                                                : "border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/50"
                                                }`}
                                        >
                                            {/* Percent Bar */}
                                            {showStats && (
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${option.percent}%` }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                    className={`absolute inset-y-0 left-0 bg-neutral-800 z-0 ${isSelected ? "bg-neutral-700" : ""}`}
                                                />
                                            )}

                                            <div className="relative z-10 flex items-center justify-between">
                                                <span className={`font-medium ${isSelected ? "text-white" : "text-neutral-300"}`}>
                                                    {option.text}
                                                </span>
                                                {showStats && (
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="text-sm font-mono text-neutral-400"
                                                    >
                                                        {option.percent}%
                                                    </motion.span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Explanation & Next Button */}
                            <AnimatePresence>
                                {showStats && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-8 pt-6 border-t border-neutral-800"
                                    >
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="text-sm text-neutral-500 mb-1 font-mono uppercase">My Take</div>
                                                <p className="text-neutral-300 leading-relaxed">
                                                    {currentQuestion.explanation}
                                                </p>
                                            </div>
                                            <button
                                                onClick={handleNext}
                                                className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2 shrink-0"
                                            >
                                                {currentIndex === QUESTIONS.length - 1 ? "See Results" : "Next"}
                                                <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm text-center max-w-lg mx-auto"
                        >
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} className="text-white" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold mb-2">You & Abhibo</h2>
                            <p className="text-xl text-neutral-400 mb-8">
                                You matched on <span className="text-white font-bold">{matchScore} / {QUESTIONS.length}</span> answers.
                            </p>

                            <p className="text-neutral-300 mb-8 leading-relaxed">
                                {matchScore >= 5
                                    ? "We probably work the same way. Want to see how I apply this in real projects?"
                                    : "We might have different styles, but diversity is good! Check out my work to see my approach."}
                            </p>

                            <div className="flex flex-col gap-3">
                                <a
                                    href="https://drive.google.com/file/d/1VnoOlRSkGPoGQypLrUekEQiM8BfQCqiJ/view?usp=drive_link"
                                    target="_blank"
                                    className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <FileText size={20} />
                                    VIEW RESUME (PDF)
                                </a>
                                <button
                                    onClick={restart}
                                    className="w-full py-4 bg-transparent border border-neutral-700 text-neutral-400 font-bold rounded-xl hover:bg-neutral-800 hover:text-white transition-colors flex items-center justify-center gap-2"
                                >
                                    <RefreshCw size={20} />
                                    I wanna shine (Retry)
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
}
