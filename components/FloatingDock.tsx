/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/
"use client";
import { cn } from "../lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState, useEffect } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  Link,
  onItemClick,
}: {
  items: { title: string; icon: React.ReactNode; href: string; isInternal?: boolean; isMail?: boolean }[];
  desktopClassName?: string;
  mobileClassName?: string;
  Link?: any;
  onItemClick?: (item: any) => boolean;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} Link={Link} onItemClick={onItemClick} />
      <FloatingDockMobile items={items} className={mobileClassName} Link={Link} onItemClick={onItemClick} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  Link,
  onItemClick,
}: {
  items: { title: string; icon: React.ReactNode; href: string; isInternal?: boolean; isMail?: boolean }[];
  className?: string;
  Link?: any;
  onItemClick?: (item: any) => boolean;
}) => {
  let mouseX = useMotionValue(Infinity);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Touch support for floating effect and tooltip
  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches.length > 0) {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      mouseX.set(x);
      // Find which icon is under the touch
      for (let i = 0; i < iconRefs.current.length; i++) {
        const ref = iconRefs.current[i];
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            setHoveredIdx(i);
            return;
          }
        }
      }
      setHoveredIdx(null);
    }
  };
  const handleTouchEnd = () => {
    mouseX.set(Infinity);
    setHoveredIdx(null);
  };
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={cn(
        "fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex md:hidden h-14 items-end gap-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 px-3 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      {items.map((item, i) => (
        item.isInternal && Link ? (
          <Link
            href={item.href}
            key={item.title}
            onClick={(e: React.MouseEvent) => {
              mouseX.set(Infinity);
              if (onItemClick && !onItemClick(item)) {
                e.preventDefault();
              }
            }}
            onTouchEnd={() => mouseX.set(Infinity)}
          >
            <div ref={el => { iconRefs.current[i] = el; }}>
              <IconContainer mouseX={mouseX} {...item} hovered={hoveredIdx === i} />
            </div>
          </Link>
        ) : (
          <a
            href={item.href}
            key={item.title}
            onClick={(e: React.MouseEvent) => {
              mouseX.set(Infinity);
              if (onItemClick && !onItemClick(item)) {
                e.preventDefault();
              }
            }}
            onTouchEnd={() => mouseX.set(Infinity)}
          >
            <div ref={el => { iconRefs.current[i] = el; }}>
              <IconContainer mouseX={mouseX} {...item} hovered={hoveredIdx === i} />
            </div>
          </a>
        )
      ))}
    </motion.div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  Link,
  onItemClick,
}: {
  items: { title: string; icon: React.ReactNode; href: string; isInternal?: boolean; isMail?: boolean }[];
  className?: string;
  Link?: any;
  onItemClick?: (item: any) => boolean;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 px-5 pb-3 md:flex shadow-[0_12px_40px_0_rgba(0,0,0,0.5)]",
        className,
      )}
    >
      {items.map((item) => (
        item.isInternal && Link ? (
          <Link
            href={item.href}
            key={item.title}
            onClick={(e: React.MouseEvent) => {
              mouseX.set(Infinity);
              if (onItemClick && !onItemClick(item)) {
                e.preventDefault();
              }
            }}
            onTouchEnd={() => mouseX.set(Infinity)}
          >
            <IconContainer mouseX={mouseX} {...item} />
          </Link>
        ) : (
          <a
            href={item.href}
            key={item.title}
            onClick={(e: React.MouseEvent) => {
              mouseX.set(Infinity);
              if (onItemClick && !onItemClick(item)) {
                e.preventDefault();
              }
            }}
            onTouchEnd={() => mouseX.set(Infinity)}
          >
            <IconContainer mouseX={mouseX} {...item} />
          </a>
        )
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  hovered: hoveredProp,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
  hovered?: boolean;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);
  const actuallyHovered = hoveredProp !== undefined ? hoveredProp : hovered;

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-white/15 transition-colors shadow-inner"
    >
      <AnimatePresence>
        {actuallyHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-10 left-1/2 w-fit rounded-lg border border-white/20 bg-black/80 backdrop-blur-md px-3 py-1.5 text-xs font-medium whitespace-pre text-white shadow-xl"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center text-white"
      >
        {icon}
      </motion.div>
    </motion.div>
  );
} 