"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categories, type Category, type Project } from "@/data/projects";

// ── Types ─────────────────────────────────────────────────────────────────────
type FilterCategory = "ALL" | Category;
type ViewType = "UI SHOWCASE" | "UI WITH DETAILS";

const ALL_CATS: FilterCategory[] = ["ALL", ...categories];
const VIEW_TYPES: ViewType[] = ["UI SHOWCASE", "UI WITH DETAILS"];

// ── Shared spring transition ───────────────────────────────────────────────────
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE   = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
const BTN_TRANSITION = `transform 0.25s ${SPRING}, box-shadow 0.2s ${EASE}`;
const CARD_TRANSITION = `transform 0.4s ${SPRING}, box-shadow 0.3s ${EASE}, border-color 0.2s ease`;

// ── Sidebar action button (reusable with hover state) ─────────────────────────
function SidebarPrimaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const [s, setS] = useState<"idle" | "hover" | "active">("idle");
  const shadows = {
    idle:   "0px 4px 0px 0px #54b4e0, 0px 1px 2px 0px rgba(10,13,18,0.05), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
    hover:  "0px 6px 0px 0px #3fa3d5, 0px 4px 16px 0px rgba(84,180,224,0.35), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
    active: "0px 2px 0px 0px #3fa3d5, 0px 1px 4px 0px rgba(84,180,224,0.2), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
  };
  const y = { idle: "0px", hover: "-3px", active: "1px" };
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-center gap-[6px] h-[48px] px-[18px] rounded-[12px] w-full select-none"
      style={{ background: "#54b4e0", border: "1px solid #58a6ca", boxShadow: shadows[s], transform: `translateY(${y[s]})`, transition: BTN_TRANSITION, willChange: "transform, box-shadow" }}
      onMouseEnter={() => setS("hover")} onMouseLeave={() => setS("idle")}
      onMouseDown={() => setS("active")} onMouseUp={() => setS("hover")}
    >
      {children}
    </a>
  );
}

function SidebarSecondaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const [s, setS] = useState<"idle" | "hover" | "active">("idle");
  const shadows = {
    idle:   "0px 4px 0px 0px #e3e3e3, 0px 1px 2px 0px rgba(10,13,18,0.05), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
    hover:  "0px 6px 0px 0px #d0d0d0, 0px 4px 16px 0px rgba(0,0,0,0.08), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
    active: "0px 2px 0px 0px #d0d0d0, 0px 1px 4px 0px rgba(0,0,0,0.05), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
  };
  const y = { idle: "0px", hover: "-3px", active: "1px" };
  return (
    <Link href={href}
      className="flex items-center justify-center h-[48px] px-[18px] rounded-[12px] w-full select-none"
      style={{ background: "#ffffff", border: "1px solid #cacaca", boxShadow: shadows[s], transform: `translateY(${y[s]})`, transition: BTN_TRANSITION, willChange: "transform, box-shadow" }}
      onMouseEnter={() => setS("hover")} onMouseLeave={() => setS("idle")}
      onMouseDown={() => setS("active")} onMouseUp={() => setS("hover")}
    >
      {children}
    </Link>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({
  activeCategory, setActiveCategory,
  activeView, setActiveView,
  linkedinUrl,
}: {
  activeCategory: FilterCategory; setActiveCategory: (c: FilterCategory) => void;
  activeView: ViewType;           setActiveView: (v: ViewType) => void;
  linkedinUrl: string;
}) {
  return (
    <aside className="flex flex-col gap-[16px] w-[292px] shrink-0">
      {/* Card */}
      <div className="flex flex-col gap-[16px] p-[8px] rounded-[16px] bg-white overflow-clip" style={{ border: "1px solid #e0e0e0" }}>
        <div className="flex flex-col items-start pb-[16px] pt-[8px] px-[8px] w-full" style={{ borderBottom: "1px solid #ececec" }}>
          <h1 className="text-[20px] font-medium text-[#0e0e16] leading-[1.2] whitespace-nowrap">Projects Gallery</h1>
        </div>
        <div className="flex flex-col gap-[8px]">
          <FilterGroup items={ALL_CATS}   active={activeCategory} onSelect={setActiveCategory} />
          <FilterGroup items={VIEW_TYPES} active={activeView}     onSelect={setActiveView} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-[12px]">
        <SidebarPrimaryBtn href={linkedinUrl}>
          <LinkedInIconWhite />
          <span className="text-white text-[16px] font-semibold leading-[24px] whitespace-nowrap">Contact me</span>
        </SidebarPrimaryBtn>
        <SidebarSecondaryBtn href="/">
          <span className="text-[#414651] text-[16px] font-semibold leading-[24px] whitespace-nowrap">Back to Homepage</span>
        </SidebarSecondaryBtn>
      </div>
    </aside>
  );
}

// ── Filter group ──────────────────────────────────────────────────────────────
function FilterGroup<T extends string>({ items, active, onSelect }: { items: T[]; active: T; onSelect: (item: T) => void }) {
  return (
    <div className="flex flex-col gap-[7px] p-[4px] rounded-[4px] w-[276px]" style={{ background: "#ebebeb", border: "1px solid #e0e0e0" }}>
      {items.map((item) => {
        const isActive = item === active;
        return (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className="flex items-center justify-center px-[16px] py-[8px] rounded-[4px] w-full text-[16px] font-medium leading-[1.2] tracking-[-0.01em] whitespace-nowrap"
            style={{
              background:  isActive ? "#ffffff" : "transparent",
              color:       isActive ? "#2d2d2d" : "#8e8e8e",
              filter:      isActive ? "drop-shadow(0px 0px 5px rgba(131,127,127,0.25))" : "none",
              transition:  "background 0.15s ease, color 0.15s ease, filter 0.15s ease, opacity 0.15s ease",
            }}
            onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "#5a5a5a"; }}
            onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "#8e8e8e"; }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

// ── Project cards ─────────────────────────────────────────────────────────────
function ShowcaseCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex flex-col gap-[6px] bg-white p-[6px] rounded-[14px] cursor-pointer"
      style={{
        border:     hovered ? "0.6px solid rgba(84,180,224,0.4)" : "0.6px solid rgba(240,240,240,0.85)",
        boxShadow:  hovered ? "0px 12px 32px 0px rgba(0,0,0,0.10)" : "0px 2px 8px 0px rgba(0,0,0,0.04)",
        transform:  hovered ? "translateY(-6px) scale(1.01)" : "translateY(0px) scale(1)",
        transition: CARD_TRANSITION,
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative rounded-[10px] overflow-hidden bg-[#efefef]" style={{ aspectRatio: "512/330" }}>
        {project.images[0] && (
          <Image
            src={project.images[0]} alt={project.name} fill className="object-cover object-top"
            style={{ transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
          />
        )}
      </div>
    </div>
  );
}

function DetailCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex flex-col gap-[6px] bg-white p-[6px] rounded-[14px] cursor-pointer"
      style={{
        border:     hovered ? "0.6px solid rgba(84,180,224,0.4)" : "0.6px solid rgba(240,240,240,0.85)",
        boxShadow:  hovered ? "0px 12px 32px 0px rgba(0,0,0,0.10)" : "0px 2px 8px 0px rgba(0,0,0,0.04)",
        transform:  hovered ? "translateY(-6px) scale(1.01)" : "translateY(0px) scale(1)",
        transition: CARD_TRANSITION,
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative rounded-[10px] overflow-hidden bg-[#efefef]" style={{ aspectRatio: "512/280" }}>
        {project.images[0] && (
          <Image
            src={project.images[0]} alt={project.name} fill className="object-cover object-top"
            style={{ transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
          />
        )}
      </div>
      <div className="flex flex-col gap-[8px] px-[8px] pb-[8px] pt-[4px]">
        <p className="font-mono text-[14px] font-medium text-[#0e0e16] leading-[1.4]">{project.num} {project.name}</p>
        <p className="text-[13px] text-[#606060] leading-[1.5]">{project.description}</p>
        <div className="flex flex-wrap gap-[6px]">
          {project.tags.map((tag) => (
            <span key={tag} className="px-[10px] py-[4px] rounded-[100px] text-[12px] text-[#0e0e16]" style={{ background: "#f0f0f0" }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Icon ──────────────────────────────────────────────────────────────────────
function LinkedInIconWhite() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" className="shrink-0">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────
export default function ProjectsGallery({ projects, linkedinUrl }: { projects: Project[]; linkedinUrl: string }) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("ALL");
  const [activeView, setActiveView]         = useState<ViewType>("UI SHOWCASE");

  const filtered = activeCategory === "ALL" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="dot-pattern min-h-screen bg-[#f5f5f5]">
      <div className="flex gap-[35px] items-start px-[47px] py-[70px] max-w-[1440px] mx-auto">

        <div className="sticky top-[24px]">
          <Sidebar
            activeCategory={activeCategory} setActiveCategory={setActiveCategory}
            activeView={activeView}         setActiveView={setActiveView}
            linkedinUrl={linkedinUrl}
          />
        </div>

        <div className="flex-1 min-w-0">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-[14px]">
              {filtered.map((project) =>
                activeView === "UI SHOWCASE"
                  ? <ShowcaseCard key={project.num} project={project} />
                  : <DetailCard  key={project.num} project={project} />
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px]">
              <p className="text-[16px] text-[#9a9a9a]">No projects in this category yet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
