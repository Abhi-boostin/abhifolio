"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const target = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(pointer: fine)");
        if (!mq.matches) return;

        const onMove = (e: MouseEvent) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
            if (!visible) setVisible(true);
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            }
        };

        const onOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement | null;
            if (!t) return;
            const interactive = t.closest("a,button,[role=button],input,textarea,select,[data-cursor='hover']");
            setHovering(!!interactive);
        };

        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        let raf = 0;
        const loop = () => {
            ringPos.current.x += (target.current.x - ringPos.current.x) * 0.18;
            ringPos.current.y += (target.current.y - ringPos.current.y) * 0.18;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${hovering ? 2 : 1})`;
            }
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);
        document.addEventListener("mouseleave", onLeave);
        document.addEventListener("mouseenter", onEnter);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            document.removeEventListener("mouseleave", onLeave);
            document.removeEventListener("mouseenter", onEnter);
        };
    }, [hovering, visible]);

    return (
        <>
            <div
                ref={ringRef}
                aria-hidden
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 32,
                    height: 32,
                    borderRadius: 9999,
                    border: "1px solid rgba(255,255,255,0.45)",
                    backgroundColor: hovering ? "rgba(255,255,255,0.06)" : "transparent",
                    pointerEvents: "none",
                    zIndex: 9998,
                    transition: "background-color 200ms ease, border-color 200ms ease, opacity 200ms ease",
                    opacity: visible ? 1 : 0,
                    mixBlendMode: "difference",
                    willChange: "transform",
                }}
            />
            <div
                ref={dotRef}
                aria-hidden
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 5,
                    height: 5,
                    borderRadius: 9999,
                    backgroundColor: "white",
                    pointerEvents: "none",
                    zIndex: 9999,
                    opacity: visible ? 1 : 0,
                    transition: "opacity 200ms ease",
                    mixBlendMode: "difference",
                    willChange: "transform",
                }}
            />
        </>
    );
}
