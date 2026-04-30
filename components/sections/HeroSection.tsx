"use client";

import Image from "next/image";
import MockupShowcase from "@/components/ui/MockupShowcase";
import { PrimaryButton, LinkedInButton } from "@/components/ui/Buttons";
import { useEffect, useState } from "react";

import type { SanityHero } from "@/lib/queries";

// ── Profile photo ─────────────────────────────────────────────────────────────
function ProfilePhoto({ width, height, src, name }: { width: number; height: number; src: string; name: string }) {
  const [error, setError] = useState(false);
  return (
    <div
      style={{
        width,
        height,
        borderRadius:  12,
        borderTop:     "8px solid #ffffff",
        borderLeft:    "8px solid #ffffff",
        borderRight:   "8px solid #ffffff",
        borderBottom:  "24px solid #ffffff",
        boxShadow:     "0 4px 4px 0 rgba(0,0,0,0.15)",
        overflow:      "hidden",
        flexShrink:    0,
        position:      "relative",
      }}
    >
      {!error ? (
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover object-top"
          priority
          onError={() => setError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <span className="text-5xl font-bold text-gray-300 select-none">MF</span>
        </div>
      )}
    </div>
  );
}

// ── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_NAME     = "M Fathir Ramadhennis";
const DEFAULT_TAGLINE  = "Product Designer & Engineer, Focused on SaaS, Finance, Stocks & Web3 Products";
const DEFAULT_PHOTO    = "/images/profile.jpg";
const DEFAULT_EMAIL    = "hello@example.com";
const DEFAULT_LINKEDIN = "https://linkedin.com";

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroSection({ hero }: { hero?: SanityHero | null }) {
  const name     = hero?.name            ?? DEFAULT_NAME;
  const tagline  = hero?.tagline         ?? DEFAULT_TAGLINE;
  const photoSrc = hero?.profilePhotoUrl ?? DEFAULT_PHOTO;
  const email    = hero?.contactEmail    ?? DEFAULT_EMAIL;
  const linkedin = hero?.linkedinUrl     ?? DEFAULT_LINKEDIN;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const reveal = (delay: number): React.CSSProperties => ({
    opacity:    mounted ? 1 : 0,
    transform:  mounted ? "translateY(0px)" : "translateY(28px)",
    transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    willChange: "opacity, transform",
  });

  return (
    <section className="dot-pattern w-full min-h-screen flex flex-col lg:flex-row lg:items-center overflow-hidden">

      {/* ── Content area ── */}
      <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-center lg:min-h-screen lg:gap-[65px]">

        {/* Left column — 133px left padding, content capped at 597px */}
        <div className="w-full lg:w-auto lg:shrink-0 flex flex-col items-center lg:items-start gap-[35px] z-10 px-[34px] lg:pl-[133px] lg:pr-0 pt-[40px] pb-[0px] lg:py-0">

          {/* Photo + Name + Tagline */}
          <div className="flex flex-col items-center lg:items-start gap-[40px] lg:gap-[58px] w-full lg:w-[597px]">

            {/* Photo — bigger on mobile (304×291), smaller on desktop (266×251) */}
            <div style={reveal(0)} className="flex justify-center lg:justify-start w-full">
              {/* Mobile */}
              <div className="lg:hidden">
                <ProfilePhoto width={304} height={291} src={photoSrc} name={name} />
              </div>
              {/* Desktop */}
              <div className="hidden lg:block">
                <ProfilePhoto width={266} height={251} src={photoSrc} name={name} />
              </div>
            </div>

            {/* Name + tagline — centered on mobile, left on desktop */}
            <div className="flex flex-col gap-[14px] text-center lg:text-left w-full" style={reveal(80)}>
              <h1 className="text-[32px] lg:text-[40px] font-medium text-black leading-normal">
                {name}
              </h1>
              <p className="text-[18px] lg:text-[20px] text-[#3a3a3a] leading-[1.5]">
                {tagline}
              </p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-4 w-full lg:w-[597px]" style={reveal(160)}>
            <span className="text-[20px] font-medium text-black">
              Get to know me more :
            </span>

            {/* Mobile — stacked full width */}
            <div className="flex flex-col gap-4 w-full lg:hidden">
              <PrimaryButton  href="/projects"  className="w-full justify-center" />
              <LinkedInButton href={linkedin}   className="w-full justify-center" />
            </div>

            {/* Desktop — side by side */}
            <div className="hidden lg:flex flex-wrap gap-4">
              <PrimaryButton  href="/projects" />
              <LinkedInButton href={linkedin} />
            </div>
          </div>
        </div>

        {/* Right column — mockup showcase, flex-1 takes remaining space */}
        <div style={reveal(240)} className="w-full lg:flex-1 mt-[40px] lg:mt-0">
          <MockupShowcase />
        </div>

      </div>
    </section>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

