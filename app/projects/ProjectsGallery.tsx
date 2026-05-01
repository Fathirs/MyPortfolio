"use client";

import Image from "next/image";
import { useState } from "react";
import { categories, type Category, type Project } from "@/data/projects";
import { PrimaryButton, LinkedInButton, LinkedInIcon } from "@/components/ui/Buttons";
import { CARD_TRANSITION } from "@/lib/animations";

// ── Types ─────────────────────────────────────────────────────────────────────
type FilterCategory = "ALL" | Category;
type ViewType = "UI SHOWCASE" | "UI WITH DETAILS";

const ALL_CATS: FilterCategory[] = ["ALL", ...categories];
const VIEW_TYPES: ViewType[] = ["UI SHOWCASE", "UI WITH DETAILS"];

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
              background: isActive ? "#ffffff" : "transparent",
              color:      isActive ? "#2d2d2d" : "#8e8e8e",
              filter:     isActive ? "drop-shadow(0px 0px 5px rgba(131,127,127,0.25))" : "none",
              transition: "background 0.15s ease, color 0.15s ease, filter 0.15s ease",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#5a5a5a"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#8e8e8e"; }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

// ── Project card (single component, variant prop) ─────────────────────────────
function ProjectCard({ project, variant }: { project: Project; variant: ViewType }) {
  const [hovered, setHovered] = useState(false);
  const showDetails = variant === "UI WITH DETAILS";

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
      <div
        className="relative rounded-[10px] overflow-hidden bg-[#efefef]"
        style={{ aspectRatio: showDetails ? "512/280" : "512/330" }}
      >
        {project.images[0] && (
          <Image
            src={project.images[0]} alt={project.name} fill className="object-cover object-top"
            style={{ transform: hovered ? "scale(1.04)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
          />
        )}
      </div>
      {showDetails && (
        <div className="flex flex-col gap-[8px] px-[8px] pb-[8px] pt-[4px]">
          <p className="font-mono text-[14px] font-medium text-[#0e0e16] leading-[1.4]">{project.num} {project.name}</p>
          <p className="text-[13px] text-[#606060] leading-[1.5]">{project.description}</p>
          <div className="flex flex-wrap gap-[6px]">
            {project.tags.map((tag) => (
              <span key={tag} className="px-[10px] py-[4px] rounded-[100px] text-[12px] text-[#0e0e16]" style={{ background: "#f0f0f0" }}>{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
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
      <div className="flex flex-col gap-[16px] p-[8px] rounded-[16px] bg-white overflow-clip" style={{ border: "1px solid #e0e0e0" }}>
        <div className="flex flex-col items-start pb-[16px] pt-[8px] px-[8px] w-full" style={{ borderBottom: "1px solid #ececec" }}>
          <h1 className="text-[20px] font-medium text-[#0e0e16] leading-[1.2] whitespace-nowrap">Projects Gallery</h1>
        </div>
        <div className="flex flex-col gap-[8px]">
          <FilterGroup items={ALL_CATS}   active={activeCategory} onSelect={setActiveCategory} />
          <FilterGroup items={VIEW_TYPES} active={activeView}     onSelect={setActiveView} />
        </div>
      </div>

      <div className="flex flex-col gap-[12px]">
        <PrimaryButton href={linkedinUrl} label="Contact me" className="w-full justify-center" target="_blank" />
        <LinkedInButton href="/" label="Back to Homepage" className="w-full justify-center" target="_self" />
      </div>
    </aside>
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
              {filtered.map((project) => (
                <ProjectCard key={project.num} project={project} variant={activeView} />
              ))}
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
