"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { projects as defaultProjects, categories, type Project, type Category } from "@/data/projects";
import { toProject, type SanityProject } from "@/lib/queries";

// ── Category filter button ────────────────────────────────────────────────────
function CategoryBtn({ cat, isActive, onClick }: { cat: string; isActive: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  const style = isActive
    ? { background: "#ffffff", color: "#2d2d2d", fontWeight: 500, boxShadow: "0px 0px 10px 0px rgba(131,127,127,0.25)", transition: "background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease" }
    : hovered
    ? { background: "rgba(255,255,255,0.55)", color: "#5a5a5a", fontWeight: 500, transition: "background 0.15s ease, color 0.15s ease" }
    : { background: "transparent", color: "#8e8e8e", fontWeight: 500, transition: "background 0.15s ease, color 0.15s ease" };

  return (
    <button
      onClick={onClick}
      className="px-[16px] py-[8px] rounded-[14px] text-[16px] leading-[1.2] tracking-[-0.01em] whitespace-nowrap cursor-pointer"
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {cat}
    </button>
  );
}

// ── Desktop ───────────────────────────────────────────────────────────────────
function DesktopProjectsSection({ projects }: { projects: Project[] }) {
  // Default to the first category that actually has projects, falling back to the first category
  const firstPopulated = categories.find(c => projects.some(p => p.category === c)) ?? categories[0];
  const [activeCategory, setActiveCategory] = useState<Category>(firstPopulated);
  const filtered = projects.filter((p) => p.category === activeCategory);

  return (
    <section
      className="dot-pattern w-full border-b border-dashed hidden lg:block"
      style={{ borderColor: "#d9d9d9" }}
    >
      <div className="max-w-[1440px] mx-auto px-[120px] py-[80px] flex flex-col gap-[40px] items-center">

        {/* Header */}
        <ScrollReveal once threshold={0.15} className="flex flex-col gap-[24px] items-center text-center">
          <div
            className="inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-[100px] border"
            style={{ background: "#ffffff", borderColor: "#d7d7d7", boxShadow: "0px 6px 8.1px 0px rgba(0,0,0,0.08)" }}
          >
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16] tracking-wide">REAL GROWTH STORIES</span>
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
          </div>
          <h2
            className="text-[40px] font-medium leading-[1.2] text-[#0e0e16] max-w-[572px]"
            style={{ letterSpacing: "-1.2px" }}
          >
            Projects That Prove It Works.{" "}
            <br />
            Yours Could Be Next.
          </h2>
        </ScrollReveal>

        {/* Category filter bar */}
        <ScrollReveal once threshold={0.1} delay={60} className="flex">
          <div
            className="flex items-center gap-[7px] p-[4px] rounded-[16px] border"
            style={{ background: "#ebebeb", borderColor: "#e0e0e0" }}
          >
            {categories.map((cat) => (
              <CategoryBtn
                key={cat}
                cat={cat}
                isActive={cat === activeCategory}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Cards */}
        <div className="flex flex-col gap-[24px] w-full items-center">
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <ScrollReveal key={`${activeCategory}-${i}`} once={false} threshold={0.1} delay={i * 60} className="w-full flex justify-center">
                <DesktopProjectCard project={project} />
              </ScrollReveal>
            ))
          ) : (
            <p className="text-[16px] text-[#9a9a9a] py-[40px]">No projects in this category yet.</p>
          )}
        </div>

      </div>
    </section>
  );
}

function DesktopProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (project.images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % project.images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [project.images.length]);

  useEffect(() => { setActiveImg(0); }, [project]);

  return (
    <div
      className="relative flex items-stretch overflow-hidden rounded-[24px] bg-white w-full max-w-[996px] cursor-pointer"
      style={{
        padding:    "12px",
        border:     hovered ? "1px solid #54b4e0" : "1px solid #d7d7d7",
        boxShadow:  hovered
          ? "0px 12px 40px 0px rgba(84,180,224,0.15), 0px 0px 0px 4px rgba(69,123,224,0.12), inset 0px 0px 0px 2px white"
          : "0px 4px 12px 0px rgba(0,0,0,0.04), inset 0px 0px 0px 2px white",
        transform:  hovered ? "translateY(-6px)" : "translateY(0px)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left: text */}
      <div className="flex flex-col gap-[16px] p-[32px] flex-1 min-w-0 self-stretch">
        <div className="flex flex-col gap-[16px] flex-1">
          <p className="font-mono text-[20px] leading-[1.5] text-[#0e0e16]">
            {project.num} {project.name}
          </p>
          <p className="text-[16px] leading-[1.5] text-[#606060]">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-[12px]">
          {project.tags.map((tag) => (
            <span key={tag} className="px-[16px] py-[8px] rounded-[100px] text-[16px] leading-[1.5] text-[#0e0e16]" style={{ background: "#f0f0f0" }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right: slideshow */}
      <div className="relative shrink-0 rounded-[16px] overflow-hidden w-[450px] h-[350px]" style={{ background: "#f0f0f0" }}>
        <Image
          src={project.images[activeImg]}
          alt={project.name}
          fill
          className="object-cover object-top"
          style={{
            transform: hovered ? "scale(1.03)" : "scale(1)",
            transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        {project.images.length > 1 && (
          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex gap-[6px] z-10">
            {project.images.map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-300" style={{
                width: i === activeImg ? "20px" : "6px", height: "6px",
                background: i === activeImg ? "#ffffff" : "rgba(255,255,255,0.5)",
              }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Mobile ────────────────────────────────────────────────────────────────────
function MobileProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section
      className="lg:hidden dot-pattern w-full py-[48px] border-b border-dashed"
      style={{ borderColor: "#d9d9d9" }}
    >
      <div className="px-[24px] flex flex-col gap-[40px]">

        {/* Header */}
        <div className="flex flex-col gap-[24px] items-center text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-[100px] border bg-white"
            style={{ borderColor: "#d7d7d7", boxShadow: "0px 6px 4.05px 0px rgba(0,0,0,0.08)" }}
          >
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16] tracking-wide">BUILT FOR SME GROWTH</span>
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
          </div>

          {/* Heading */}
          <h2 className="text-[28px] font-normal leading-[1.2] text-[#0e0e16] text-center">
            Projects that prove it works.{" "}
            yours could be next
          </h2>
        </div>

        {/* Cards — all projects, no filter */}
        <div className="flex flex-col gap-[24px]">
          {projects.map((project) => (
            <MobileProjectCard key={project.num} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}

function MobileProjectCard({ project }: { project: Project }) {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (project.images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % project.images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [project.images.length]);

  useEffect(() => { setActiveImg(0); }, [project]);

  return (
    <div
      className="relative flex flex-col gap-[24px] overflow-hidden rounded-[24px] bg-white w-full"
      style={{
        padding:   "12px",
        border:    "1px solid #d7d7d7",
        boxShadow: "inset 0px 0px 0px 2px white",
      }}
    >
      {/* Image — full width, fixed height */}
      <div className="relative w-full rounded-[16px] overflow-hidden" style={{ height: "242px", background: "#f0f0f0" }}>
        <Image
          src={project.images[activeImg]}
          alt={project.name}
          fill
          className="object-cover object-top"
        />
        {project.images.length > 1 && (
          <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 flex gap-[6px] z-10">
            {project.images.map((_, i) => (
              <div key={i} className="rounded-full transition-all duration-300" style={{
                width: i === activeImg ? "18px" : "6px", height: "6px",
                background: i === activeImg ? "#ffffff" : "rgba(255,255,255,0.5)",
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[24px] px-[4px]">

        {/* Number + name + description */}
        <div className="flex flex-col gap-[16px]">
          <p className="font-mono text-[20px] leading-[1.5] text-[#0e0e16]">
            {project.num} {project.name}
          </p>
          <p className="text-[14px] leading-[1.5] text-[#606060]">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-[8px]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-[12px] py-[8px] rounded-[100px] text-[12px] leading-[1.5] text-[#0e0e16]"
              style={{ background: "#f0f0f0" }}
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── Default export ─────────────────────────────────────────────────────────────
export default function ProjectsSection({ projects: sanityProjects }: { projects?: SanityProject[] }) {
  const projects = sanityProjects && sanityProjects.length > 0
    ? sanityProjects.map(toProject)
    : defaultProjects;
  return (
    <>
      <DesktopProjectsSection projects={projects} />
      <MobileProjectsSection  projects={projects} />
    </>
  );
}
