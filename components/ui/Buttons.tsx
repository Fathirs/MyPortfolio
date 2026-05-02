"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BTN_TRANSITION, BTN_Y,
  PRIMARY_SHADOWS, SECONDARY_SHADOWS,
  type ButtonState,
} from "@/lib/animations";

// ── Icons ─────────────────────────────────────────────────────────────────────

function ArrowRightIcon({ color = "#ffffff" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M6 3L11 8L6 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeftIcon({ color = "#414651" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <path d="M10 3L5 8L10 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkedInIcon({ color = "#000000", size = 24 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className="shrink-0">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── Base pressable button ─────────────────────────────────────────────────────

type BaseProps = {
  href: string;
  className?: string;
  target?: string;
  bg: string;
  border: string;
  shadows: Record<ButtonState, string>;
  children: React.ReactNode;
};

function PressableLink({ href, className = "", target, bg, border, shadows, children }: BaseProps) {
  const [s, setS] = useState<ButtonState>("idle");
  const isExternal = target === "_blank";

  return (
    <Link
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className={`flex items-center gap-[6px] h-[48px] px-[18px] rounded-[12px] whitespace-nowrap select-none ${className}`}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        boxShadow: shadows[s],
        transform: `translateY(${BTN_Y[s]})`,
        transition: BTN_TRANSITION,
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={() => setS("hover")}
      onMouseLeave={() => setS("idle")}
      onMouseDown={() => setS("active")}
      onMouseUp={() => setS("hover")}
    >
      {children}
    </Link>
  );
}

// ── Public variants ───────────────────────────────────────────────────────────

type BtnProps = { href: string; label?: string; className?: string; target?: string };

export function PrimaryButton({ href, label = "See My Projects", className, target }: BtnProps) {
  return (
    <PressableLink href={href} className={className} target={target} bg="#54b4e0" border="#58a6ca" shadows={PRIMARY_SHADOWS}>
      <span className="text-white text-[16px] font-semibold leading-[24px]">{label}</span>
      <ArrowRightIcon />
    </PressableLink>
  );
}

export function LinkedInButton({ href, label = "Contact Me", className, target = "_blank" }: BtnProps) {
  return (
    <PressableLink href={href} className={className} target={target} bg="#ffffff" border="#cacaca" shadows={SECONDARY_SHADOWS}>
      <LinkedInIcon />
      <span className="text-[#414651] text-[16px] font-semibold leading-[24px]">{label}</span>
    </PressableLink>
  );
}

export function SecondaryButton({ href, label = "View All Projects", className, target }: BtnProps) {
  return (
    <PressableLink href={href} className={className} target={target} bg="#ffffff" border="#cacaca" shadows={SECONDARY_SHADOWS}>
      <span className="text-[#414651] text-[16px] font-semibold leading-[24px] px-[2px]">{label}</span>
      <ArrowRightIcon color="#414651" />
    </PressableLink>
  );
}

export function SecondaryBackButton({ href, label = "Back to Homepage", className, target }: BtnProps) {
  return (
    <PressableLink href={href} className={className} target={target} bg="#ffffff" border="#cacaca" shadows={SECONDARY_SHADOWS}>
      <ArrowLeftIcon />
      <span className="text-[#414651] text-[16px] font-semibold leading-[24px] px-[2px]">{label}</span>
    </PressableLink>
  );
}
