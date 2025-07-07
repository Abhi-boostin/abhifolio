import React, { useEffect, useRef, useState } from "react";

export default function ButterflyFollower() {
  const [target, setTarget] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  const [pos, setPos] = useState(target);
  const rafRef = useRef<number | null>(null);

  // Animation loop for smooth, constant-speed movement
  useEffect(() => {
    const speed = 0.03; // Lower = slower, 0.03 is very slow
    function animate() {
      setPos(prev => {
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        // If close enough, snap to target
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return target;
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  // Mouse move for desktop, touch/click for mobile
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTarget({ x: e.clientX, y: e.clientY });
    };
    const handleTouch = (e: TouchEvent | MouseEvent) => {
      let x, y;
      if ('touches' in e && e.touches.length > 0) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else if ('clientX' in e && 'clientY' in e) {
        x = e.clientX;
        y = e.clientY;
      } else {
        return;
      }
      setTarget({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouch);
    window.addEventListener("click", handleTouch);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("click", handleTouch);
    };
  }, []);

  return (
    <img
      src="/icons and gifs/butterfly.gif"
      alt="Butterfly"
      style={{
        position: "fixed",
        left: pos.x - 32,
        top: pos.y - 32,
        width: 64,
        height: 64,
        pointerEvents: "none",
        zIndex: 50,
        userSelect: "none",
      }}
      draggable={false}
    />
  );
} 