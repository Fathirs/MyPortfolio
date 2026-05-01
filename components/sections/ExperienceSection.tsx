"use client";

import { useState, useEffect, useRef } from "react";
import type { SanityExperience } from "@/lib/queries";

// ── Static fallback data ───────────────────────────────────────────────────────
const DEFAULT_EXPERIENCES: SanityExperience[] = [
  {
    _id: "0",
    role: "Founding Designer & UX Lead",
    company: "Revalue Academy",
    location: "Indonesia, Jakarta",
    period: "Feb 2025 - Now",
    order: 0,
    description: `As the Product Design Lead at Revalue Academy, I am responsible for the end-to-end design strategy and execution across four core products: Membership, Masterclass, FreeClass, and the Mobile App. I work cross-functionally with product, marketing & sales, and engineering teams to deliver intuitive and impactful experiences in the investment education space.

Key Achievements:
- Revalue Membership: Designed and optimized the user journey for our exclusive membership platform, resulting in 500+ active members within 3 months of launch.

- Masterclass: Led the UX/UI of the premium learning experience, which has attracted hundreds of paying participants and driven thousands of conversions through our website.

- FreeClass: Crafted scalable interfaces and onboarding flows for our free educational content—empowering 2,000+ learners to join from organic web traffic alone.

- Mobile App (in development): Spearheading the design system and feature architecture to ensure a seamless mobile-first experience for stock and crypto learners on the go.

My focus is not only on beautiful design, but on data-backed decisions, growth, and user activation through thoughtful interaction flows.`,
  },
  {
    _id: "1",
    role: "Part Time UI/UX Designer",
    company: "Cerulean Studio",
    location: "Italia",
    period: "Nov 2024 - Feb 2025",
    order: 1,
    description: `Joined Cerulean Studio on a part-time basis to support the design of client-facing digital products across e-commerce and SaaS verticals. Operated within a small, agile design team focused on delivering polished UI with strong UX foundations.

Key Contributions:
- Client Product Design: Designed end-to-end UI for three client projects spanning web and mobile platforms, each launched within tight 6-week sprint cycles.

- Responsive Design Systems: Created adaptive design systems in Figma that ensured visual consistency across breakpoints and device types.

- Brand-Aligned UI: Developed cohesive visual languages for each client brand, balancing aesthetic quality with conversion-focused layouts.

- Prototyping & Handoff: Produced interactive prototypes for stakeholder reviews and developer-ready specs to ensure smooth implementation.

Contributed to elevating Cerulean's design output quality during a period of rapid client expansion.`,
  },
  {
    _id: "2",
    role: "Software Designer & UX Lead",
    company: "MYX Studio",
    location: "Amsterdam, Uruguay",
    period: "Dec 2023 - Mar 2025",
    order: 2,
    description: `Led product design across multiple software ventures at MYX Studio, a creative technology studio operating across Amsterdam and Uruguay. Responsible for establishing design culture, mentoring junior designers, and delivering high-quality product experiences for studio clients.

Key Contributions:
- UX Leadership: Defined the design process, tooling standards, and quality benchmarks across all active projects within the studio.

- Cross-Cultural Collaboration: Coordinated design deliverables across two time zones, maintaining consistency and alignment between remote teams.

- SaaS Product Design: Designed core user flows and interfaces for two B2B SaaS products from ideation through to beta launch.

- Design System Architecture: Built a scalable, token-based design system used across multiple studio products, reducing onboarding time for new designers by 60%.

Played a pivotal role in growing the studio's design capability and shaping its creative direction during a key growth phase.`,
  },
  {
    _id: "3",
    role: "UI/UX Designer",
    company: "Daffascript Agency",
    location: "Jakarta (Remote)",
    period: "Nov 2023 - Mar 2025",
    description: `Worked as a UI/UX Designer at Daffascript, a Jakarta-based digital agency delivering web and mobile solutions for local and regional clients. Contributed to a wide range of projects spanning fintech, retail, and services industries.

Key Contributions:
- Multi-Industry Design: Designed digital products across fintech, retail, and logistics verticals, developing adaptable design skills across diverse user contexts.

- Landing Page Optimization: Created conversion-optimized landing pages for agency clients, contributing to measurable increases in lead generation.

- Client Presentation: Prepared design presentations and interactive prototypes for client review sessions, strengthening communication between design and stakeholders.

- Collaborative Execution: Worked alongside developers and project managers to ensure pixel-perfect delivery and smooth handoff on every project.

Built strong foundations in commercial design thinking, stakeholder communication, and end-to-end delivery within a fast-paced agency environment.`,
    order: 3,
  },
];

// ── Shared styles ──────────────────────────────────────────────────────────────
const CARD_STYLE: React.CSSProperties = {
  background: "#ffffff",
  boxShadow: "0px 0px 9px 0px rgba(148,148,148,0.25)",
};
const HDR_BORDER: React.CSSProperties = { borderColor: "#b6b6b6" };

// ── Desktop component ──────────────────────────────────────────────────────────
function DesktopExperience({ experiences }: { experiences: SanityExperience[] }) {
  const N = experiences.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const fadeTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll-driven index
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
      setActiveIndex(Math.min(N - 1, Math.floor(progress * N)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [N]);

  // Fade transition on index change
  useEffect(() => {
    if (activeIndex === displayIndex) return;
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    setFading(true);
    fadeTimer.current = setTimeout(() => {
      setDisplayIndex(activeIndex);
      setFading(false);
    }, 160);
    return () => { if (fadeTimer.current) clearTimeout(fadeTimer.current); };
  }, [activeIndex, displayIndex]);

  const active = experiences[displayIndex];

  return (
    <section ref={sectionRef} className="relative dot-pattern hidden lg:block" style={{ height: `${(N + 1) * 100}vh` }}>
      <div className="sticky top-[100px] h-[calc(100vh-100px)] flex items-center justify-center px-8">
        <div className="flex items-start gap-[24px]">

          {/* Left card — timeline */}
          <div className="flex flex-col pb-[12px] pt-[7.5px] rounded-[12px] overflow-hidden w-[581px]" style={CARD_STYLE}>
            <div className="flex items-center border-b pb-[7.5px] pt-[1.5px] px-[18px] mb-[9px]" style={HDR_BORDER}>
              <p className="text-[19.5px] font-medium leading-[1.5]" style={{ color: "#0e0e16" }}>Work of Experiences</p>
            </div>
            <div className="flex flex-col px-[18px]">
              {experiences.map((exp, i) => (
                <div key={exp._id} className="flex items-start gap-[10px]">
                  {/* Stepper */}
                  <div className="flex flex-col items-center self-stretch shrink-0 w-[12px]">
                    <div className="h-[11px] shrink-0" />
                    <div className="w-[9px] h-[9px] rounded-full shrink-0 transition-colors duration-300" style={{ background: i === activeIndex ? "#0e0e16" : "#d0d0d0" }} />
                    {i < N - 1 && <div className="w-[1px] flex-1 mt-[5px]" style={{ background: "#e8e8e8" }} />}
                  </div>
                  {/* Content */}
                  <div className={`flex-1 min-w-0 flex flex-col gap-[6px] ${i < N - 1 ? "pb-[18px]" : ""}`}>
                    <div className="flex items-center justify-between gap-[6px]">
                      <p className="text-[18px] font-medium leading-[1.5] transition-all duration-300" style={{ color: i === activeIndex ? "#0e0e16" : "#c0c0c0" }}>
                        {exp.role} — {exp.company}
                      </p>
                      <div className={`shrink-0 transition-all duration-300 ${i === activeIndex ? "opacity-100 translate-x-0" : "opacity-0 translate-x-1 pointer-events-none"}`}>
                        <ChevronBadge direction="right" />
                      </div>
                    </div>
                    <div className="flex items-center gap-[12px]">
                      <span className="text-[16px] leading-[1.5]" style={{ color: "#696969" }}>{exp.location}</span>
                      <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: "#d0d0d0" }} />
                      <span className="text-[16px] leading-[1.5]" style={{ color: "#696969" }}>{exp.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right card — description */}
          <div className="flex flex-col pb-[12px] pt-[7.5px] rounded-[12px] overflow-hidden w-[539px]" style={CARD_STYLE}>
            <div className="flex items-center border-b pb-[7.5px] pt-[1.5px] px-[18px] mb-[9px]" style={HDR_BORDER}>
              <p className="text-[19.5px] font-medium leading-[1.5]" style={{ color: "#0e0e16" }}>Description &amp; Metrix</p>
            </div>
            <div className="flex items-start px-[18px]">
              <div className="flex flex-col items-center self-stretch shrink-0 w-[12px] mr-[10px]">
                <div className="h-[11px] shrink-0" />
                <div className="w-[9px] h-[9px] rounded-full shrink-0" style={{ background: "#0e0e16" }} />
                <div className="w-[1px] flex-1 mt-[5px]" style={{ background: "#e8e8e8" }} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-[8px] transition-all duration-300" style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(5px)" : "translateY(0)" }}>
                <div className="flex flex-col">
                  <p className="text-[18px] font-medium leading-[1.5]" style={{ color: "#0e0e16" }}>{active.role} — {active.company}</p>
                  <p className="text-[16px] leading-[1.5]" style={{ color: "#696969" }}>{active.location} • {active.period}</p>
                </div>
                <p className="text-[14px] leading-[1.5] whitespace-pre-wrap" style={{ color: "#606060" }}>{active.description}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── Mobile component ───────────────────────────────────────────────────────────
function MobileExperience({ experiences }: { experiences: SanityExperience[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [readMoreIndex, setReadMoreIndex] = useState<number | null>(null);

  const toggleOpen = (i: number) => {
    const isOpen = openIndex === i;
    setOpenIndex(isOpen ? null : i);
    if (isOpen) setReadMoreIndex(null);
  };

  return (
    <section className="lg:hidden dot-pattern py-[40px] border-b border-dashed" style={{ borderColor: "#d9d9d9" }}>
      <div className="px-4">
        <div className="rounded-[12px] flex flex-col pb-[12px] pt-[7.5px]" style={CARD_STYLE}>
          <div className="flex items-center border-b pb-[7.5px] pt-[1.5px] px-[18px] mb-[12px]" style={HDR_BORDER}>
            <p className="text-[19.5px] font-medium leading-[1.5]" style={{ color: "#0e0e16" }}>Work of Experiences</p>
          </div>
          <div className="flex flex-col gap-[12px] px-[18px]">
            {experiences.map((exp, i) => {
              const isOpen = openIndex === i;
              const isExpanded = readMoreIndex === i;
              return (
                <div key={exp._id} className="bg-white rounded-[12px] flex flex-col" style={{
                  border: "1px solid #ebebeb",
                  boxShadow: "0px 0px 9px 0px rgba(148,148,148,0.25)",
                  paddingTop: "7.5px",
                  paddingBottom: isOpen ? "12px" : "6px",
                  transition: "padding-bottom 300ms ease",
                }}>
                  <div className="flex flex-col gap-[8px] px-[16px]">
                    <div className="flex flex-col gap-[4px]">
                      <div className="flex items-center gap-[7.5px]">
                        <p className="flex-1 min-w-0 text-[16px] font-medium leading-[1.5] truncate" style={{ color: "#0e0e16" }}>{exp.role}</p>
                        <button onClick={() => toggleOpen(i)} className="shrink-0 flex items-center justify-center">
                          <ChevronBadge direction={isOpen ? "down-open" : "down"} />
                        </button>
                      </div>
                      <p className="text-[14px] leading-[1.5]" style={{ color: "#9a9a9a" }}>{exp.company}</p>
                    </div>
                    <p className="text-[14px] leading-[1.5]" style={{ color: "#696969" }}>{exp.location} {exp.period}</p>
                  </div>
                  <div className="overflow-hidden transition-all duration-300" style={{
                    maxHeight: isOpen ? "800px" : "0px",
                    paddingLeft: 16, paddingRight: 16,
                    marginTop: isOpen ? 8 : 0,
                    transition: "max-height 300ms ease, margin-top 300ms ease",
                  }}>
                    <p className="text-[12px] leading-[1.5]" style={{
                      color: "#636363", whiteSpace: "pre-wrap",
                      ...(isExpanded ? {} : { display: "-webkit-box", WebkitLineClamp: 8, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }),
                    }}>
                      {exp.description}
                    </p>
                    {!isExpanded && (
                      <button className="text-[12px] font-semibold mt-[2px]" style={{ color: "#0e0e16" }} onClick={() => setReadMoreIndex(i)}>Read More</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Shared chevron badge ─────────────────────────────────────────────────────
function ChevronBadge({ direction }: { direction: "right" | "down" | "down-open" }) {
  const points = direction === "right" ? "9 18 15 12 9 6" : "6 9 12 15 18 9";
  return (
    <div className="flex items-center justify-center rounded-[8px] w-[26px] h-[27px]" style={{
      background: "#ffffff",
      border: direction === "right" ? "1px solid #ececec" : "1px solid #f5f5f5",
      boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.25)",
    }}>
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" style={{ stroke: "#0e0e16" }}
        className={direction === "down-open" ? "transition-transform duration-200 rotate-180" : "transition-transform duration-200"}
      >
        <polyline points={points} />
      </svg>
    </div>
  );
}

// ── Default export ────────────────────────────────────────────────────────────
export default function ExperienceSection({ experiences }: { experiences?: SanityExperience[] }) {
  const data = experiences && experiences.length > 0 ? experiences : DEFAULT_EXPERIENCES;
  return (
    <>
      <DesktopExperience experiences={data} />
      <MobileExperience  experiences={data} />
    </>
  );
}
