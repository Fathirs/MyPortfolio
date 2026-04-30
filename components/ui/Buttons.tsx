"use client";

import Link from "next/link";
import { useState } from "react";

// ── Shared spring transition ───────────────────────────────────────────────────
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE   = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const TRANSITION = `transform 0.25s ${SPRING}, box-shadow 0.2s ${EASE}`;

// ── Icons ─────────────────────────────────────────────────────────────────────
function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M6 3L11 8L6 13" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000" className="shrink-0">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── Primary button ────────────────────────────────────────────────────────────
type PrimaryBtnProps = { href: string; label?: string; className?: string };

export function PrimaryButton({ href, label = "See My Project", className = "" }: PrimaryBtnProps) {
  const [state, setState] = useState<"idle" | "hover" | "active">("idle");

  const shadowMap = {
    idle:   "0px 4px 0px 0px #54b4e0, 0px 1px 2px 0px rgba(10,13,18,0.05), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
    hover:  "0px 6px 0px 0px #3fa3d5, 0px 4px 16px 0px rgba(84,180,224,0.35), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
    active: "0px 2px 0px 0px #3fa3d5, 0px 1px 4px 0px rgba(84,180,224,0.2), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
  };
  const yMap = { idle: "0px", hover: "-3px", active: "1px" };

  return (
    <Link
      href={href}
      className={`flex items-center gap-[6px] h-[48px] px-[18px] rounded-[12px] whitespace-nowrap select-none ${className}`}
      style={{
        background:  "#54b4e0",
        border:      "1px solid #58a6ca",
        boxShadow:   shadowMap[state],
        transform:   `translateY(${yMap[state]})`,
        transition:  TRANSITION,
        willChange:  "transform, box-shadow",
      }}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("idle")}
      onMouseDown={() => setState("active")}
      onMouseUp={() => setState("hover")}
    >
      <span className="text-white text-[16px] font-semibold leading-[24px]">{label}</span>
      <ArrowRightIcon />
    </Link>
  );
}

// ── LinkedIn button ───────────────────────────────────────────────────────────
type SecondaryBtnProps = { href: string; label?: string; className?: string; target?: string };

export function LinkedInButton({ href, label = "Contact Me via LinkedIn", className = "", target = "_blank" }: SecondaryBtnProps) {
  const [state, setState] = useState<"idle" | "hover" | "active">("idle");

  const shadowMap = {
    idle:   "0px 4px 0px 0px #e3e3e3, 0px 1px 2px 0px rgba(10,13,18,0.05), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
    hover:  "0px 6px 0px 0px #d0d0d0, 0px 4px 16px 0px rgba(0,0,0,0.08), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
    active: "0px 2px 0px 0px #d0d0d0, 0px 1px 4px 0px rgba(0,0,0,0.05), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
  };
  const yMap = { idle: "0px", hover: "-3px", active: "1px" };

  return (
    <Link
      href={href}
      target={target}
      rel="noopener noreferrer"
      className={`flex items-center gap-[6px] h-[48px] px-[18px] rounded-[12px] whitespace-nowrap select-none ${className}`}
      style={{
        background: "#ffffff",
        border:     "1px solid #cacaca",
        boxShadow:  shadowMap[state],
        transform:  `translateY(${yMap[state]})`,
        transition: TRANSITION,
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={() => setState("hover")}
      onMouseLeave={() => setState("idle")}
      onMouseDown={() => setState("active")}
      onMouseUp={() => setState("hover")}
    >
      <LinkedInIcon />
      <span className="text-[#414651] text-[16px] font-semibold leading-[24px]">{label}</span>
    </Link>
  );
}
