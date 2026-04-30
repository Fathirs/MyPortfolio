"use client";

import { useEffect, useRef, useState } from "react";

type RevealState = "hidden" | "visible" | "past";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Delay before the transition starts, in ms */
  delay?: number;
  /** Initial vertical offset in px (default 28) */
  translateY?: number;
  /** IntersectionObserver threshold — fraction of element visible before triggering (default 0.08) */
  threshold?: number;
  /** If true, reveals once and stays visible. If false, also fades out when scrolled past (default true). */
  once?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  delay = 0,
  translateY = 28,
  threshold = 0.08,
  once = true,
  className,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<RevealState>("hidden");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          if (once) observer.disconnect();
        } else if (!once) {
          // Determine which direction the element exited
          const exitedFromTop = entry.boundingClientRect.top < 0;
          setState(exitedFromTop ? "past" : "hidden");
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const transforms: Record<RevealState, string> = {
    hidden: `translateY(${translateY}px)`,
    visible: "translateY(0px)",
    past:   `translateY(${-Math.round(translateY * 0.5)}px)`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity:    state === "visible" ? 1 : 0,
        transform:  transforms[state],
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
