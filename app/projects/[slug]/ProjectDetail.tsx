"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Project, type ProjectStatus } from "@/data/projects";
import { LinkedInButton } from "@/components/ui/Buttons";
import {
  BTN_TRANSITION,
  BTN_Y,
  SECONDARY_SHADOWS,
  type ButtonState,
} from "@/lib/animations";

// ── Status badge ──────────────────────────────────────────────────────────────
// Colour-coded by lifecycle stage. "Launched" is the canonical green;
// other states get tonal variants so the badge stays readable at a glance.

const STATUS_PALETTE: Record<ProjectStatus, { bg: string; border: string; dot: string }> = {
  "Launched":     { bg: "rgba(167,234,127,0.05)", border: "#a7ea7f", dot: "#3eb320" },
  "On Dev":       { bg: "rgba(255,200,80,0.06)",  border: "#ffc850", dot: "#d99100" },
  "Design Draft": { bg: "rgba(180,130,255,0.06)", border: "#c49bff", dot: "#7c3aed" },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  const c = STATUS_PALETTE[status];
  return (
    <div
      className="flex items-center gap-[10px] pl-[8px] pr-[12px] py-[6px] rounded-[8px] shrink-0"
      style={{ background: c.bg, border: `1px solid ${c.border}` }}
    >
      <span className="block w-[8px] h-[8px] rounded-full" style={{ background: c.dot }} />
      <span className="text-[14px] font-medium leading-[1.2] text-black whitespace-nowrap">{status}</span>
    </div>
  );
}

// ── Pressable secondary button (matches the design's outlined buttons) ────────
// Reuses the same shadow recipe as Buttons.tsx so resting/hover/active feel
// identical to the rest of the site, just smaller and arrow-trailing.

function ArrowRight({ size = 20, color = "#414651" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M9 6l6 6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowLeft({ size = 20, color = "#414651" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M15 6l-6 6 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type SecondaryProps = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  target?: string;
  height?: number;
};

function SecondaryButton({
  href, label, icon, iconPosition = "right", className = "", target, height = 48,
}: SecondaryProps) {
  const [s, setS] = useState<ButtonState>("idle");
  const isExternal = target === "_blank";

  return (
    <Link
      href={href}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className={`inline-flex items-center justify-center gap-[6px] px-[18px] rounded-[12px] whitespace-nowrap select-none ${className}`}
      style={{
        height,
        background: "#ffffff",
        border: "1px solid #cacaca",
        boxShadow: SECONDARY_SHADOWS[s],
        transform: `translateY(${BTN_Y[s]})`,
        transition: BTN_TRANSITION,
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={() => setS("hover")}
      onMouseLeave={() => setS("idle")}
      onMouseDown={() => setS("active")}
      onMouseUp={() => setS("hover")}
    >
      {icon && iconPosition === "left" && icon}
      <span className="text-[#414651] text-[16px] font-semibold leading-[24px] px-[2px]">{label}</span>
      {icon && iconPosition === "right" && icon}
    </Link>
  );
}

// ── Tech stack row ────────────────────────────────────────────────────────────
function TechStackRow({ category, name, icon }: { category: string; name: string; icon?: string }) {
  return (
    <div className="flex items-center justify-between px-[8px] w-full">
      <p className="font-mono text-[16px] font-normal leading-[1.5] text-[#2e2f30] tracking-[-0.32px] whitespace-nowrap">
        {category} :
      </p>
      <div
        className="flex items-center gap-[10px] pl-[4px] pr-[8px] py-[4px] rounded-[8px] shrink-0"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #ececec" }}
      >
        {icon ? (
          <div className="relative w-[16px] h-[16px] shrink-0">
            <Image src={icon} alt={name} fill className="object-contain" sizes="16px" />
          </div>
        ) : (
          // Subtle placeholder dot keeps row alignment consistent when no icon is set.
          <span className="block w-[8px] h-[8px] rounded-full bg-[#d7d7d7]" />
        )}
        <p className="text-[16px] font-medium leading-[1.2] text-black whitespace-nowrap">{name}</p>
      </div>
    </div>
  );
}

// ── Gallery image ─────────────────────────────────────────────────────────────
// Wraps each image in the same "frame card" the design uses: white outer card,
// soft inner background, image inset from the edges.

function GalleryFrame({ src, alt, index }: { src: string; alt: string; index: number }) {
  return (
    <div
      className="relative w-full bg-white rounded-[21px] p-[10px] sm:p-[10.5px]"
      style={{ border: "0.873px solid rgba(240,240,240,0.85)" }}
    >
      <div
        className="relative w-full rounded-[21px] overflow-hidden"
        style={{ background: "#efefef", aspectRatio: "770 / 509" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          // First image in the gallery is above-the-fold for many users — prioritise.
          priority={index === 0}
          sizes="(min-width: 1024px) 791px, 100vw"
        />
      </div>
    </div>
  );
}

// ── Main detail layout ────────────────────────────────────────────────────────
export default function ProjectDetail({
  project,
  linkedinUrl,
}: {
  project:     Project;
  linkedinUrl: string;
}) {
  // Prefer the curated `gallery` for the detail page; fall back to card images.
  const galleryImages = (project.gallery && project.gallery.length > 0
    ? project.gallery
    : project.images
  ).filter(Boolean);

  const longCopy = project.longDescription ?? project.description;

  return (
    <div className="dot-pattern bg-[#f5f5f5] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-[24px] lg:px-[40px] py-[40px] lg:py-[70px]">
        <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[32px] items-start">

          {/* ── LEFT (sidebar — sticky on desktop) ─────────────────────────── */}
          <aside className="w-full lg:flex-1 lg:max-w-[537px] lg:sticky lg:top-[24px] flex flex-col gap-[24px]">

            {/* Project info card */}
            <div className="flex flex-col bg-white rounded-[16px] overflow-hidden" style={{ border: "1px solid #e0e0e0" }}>
              <div className="flex flex-col gap-[16px] pt-[8px] pb-[16px] px-[8px]">
                <div className="flex flex-col items-start pt-[8px] pb-[16px] px-[8px]" style={{ borderBottom: "1px solid #ececec" }}>
                  <h1 className="text-[20px] font-medium leading-[1.2] text-[#0e0e16] whitespace-nowrap">
                    Project Detail
                  </h1>
                </div>
                <div className="flex flex-col gap-[8px] px-[8px]">
                  <p className="font-mono font-bold text-[20px] leading-[1.5] text-[#2e2f30] tracking-[-0.4px]">
                    {project.name}
                  </p>
                  <div className="flex flex-col gap-[12px] text-[16px] leading-[1.5] text-[#4a4a4a] tracking-[-0.32px]">
                    {longCopy.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status + Visit website footer */}
              {(project.status || project.websiteUrl) && (
                <div className="flex items-center justify-between flex-wrap gap-[12px] px-[16px] py-[12px]" style={{ borderTop: "1px solid #ececec" }}>
                  {project.status ? <StatusBadge status={project.status} /> : <span />}
                  {project.websiteUrl && (
                    <SecondaryButton
                      href={project.websiteUrl}
                      label="Visit The Website"
                      icon={<ArrowRight />}
                      iconPosition="right"
                      target="_blank"
                      height={38}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Tools & Techstacks card */}
            {project.techStack && project.techStack.length > 0 && (
              <div
                className="flex flex-col gap-[16px] bg-white rounded-[16px] pt-[8px] pb-[16px] px-[8px] overflow-hidden"
                style={{ border: "1px solid #e0e0e0" }}
              >
                <div className="flex flex-col items-start pt-[8px] pb-[16px] px-[8px]" style={{ borderBottom: "1px solid #ececec" }}>
                  <h2 className="text-[20px] font-medium leading-[1.2] text-[#0e0e16] whitespace-nowrap">
                    Tools &amp; Techstacks
                  </h2>
                </div>
                {project.techStack.map((t, i) => (
                  <TechStackRow key={`${t.category}-${i}`} category={t.category} name={t.name} icon={t.icon} />
                ))}
              </div>
            )}

            {/* Action row */}
            <div className="flex gap-[12px] w-full">
              <SecondaryButton
                href="/projects"
                label="Back"
                icon={<ArrowLeft />}
                iconPosition="left"
                target="_self"
                className="flex-1 min-w-0"
              />
              <LinkedInButton
                href={linkedinUrl}
                label="Contact me"
                target="_blank"
                className="flex-1 min-w-0 justify-center"
              />
            </div>
          </aside>

          {/* ── RIGHT (gallery) ─────────────────────────────────────────────── */}
          <div className="w-full lg:w-[791px] flex flex-col gap-[24px] lg:gap-[29px]">
            {galleryImages.length > 0 ? (
              galleryImages.map((src, i) => (
                <GalleryFrame key={`${src}-${i}`} src={src} alt={`${project.name} — image ${i + 1}`} index={i} />
              ))
            ) : (
              <div className="bg-white rounded-[21px] p-[10px]" style={{ border: "0.873px solid rgba(240,240,240,0.85)" }}>
                <div className="w-full rounded-[21px] flex items-center justify-center" style={{ background: "#efefef", aspectRatio: "770 / 509" }}>
                  <p className="text-[14px] text-[#9a9a9a]">No gallery images yet.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
