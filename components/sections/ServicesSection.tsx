"use client";

import { useState, useRef, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

// ── Data ──────────────────────────────────────────────────────────────────────
type Service = {
  id: number;
  tab: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  tags: string[];
  Icon: () => React.JSX.Element;
};

const SERVICES: Service[] = [
  {
    id: 0,
    tab: "WEBSITE AND APP DESIGN",
    title: "Website & App Design",
    shortDesc:
      "End-to-end UI/UX design for web and mobile apps crafted for clarity, conversion, and a strong brand identity.",
    longDesc:
      "We collaborate with you from concept to final mockup, building intuitive flows and polished interfaces that align with your brand and drive measurable results across every touchpoint.",
    tags: [
      "Discovery call",
      "Requirements analysis",
      "Technical planning",
      "Solution design",
      "Development roadmap",
    ],
    Icon: WebDesignIcon,
  },
  {
    id: 1,
    tab: "NO-CODE FRAMER DEVELOPMENT",
    title: "No-Code Framer Development",
    shortDesc:
      "Pixel-perfect Framer sites with smooth animations, CMS-powered content, and fast launch cycles.",
    longDesc:
      "We build production-ready Framer websites with custom interactions, responsive layouts, and structured CMS setups that empower your team to manage content independently after launch.",
    tags: [
      "Framer build",
      "Animation design",
      "CMS setup",
      "Responsive layout",
      "Launch support",
    ],
    Icon: FramerIcon,
  },
  {
    id: 2,
    tab: "WEBSITE DEVELOPMENT",
    title: "Website Development",
    shortDesc:
      "Custom websites built with modern frameworks, optimized for speed, SEO, and long-term scalability.",
    longDesc:
      "From landing pages to full-scale web applications, we engineer clean, maintainable code using Next.js, Tailwind, and modern tooling, ensuring peak performance and developer-friendly architecture.",
    tags: [
      "Next.js / React",
      "Performance audit",
      "SEO setup",
      "Deployment",
      "Ongoing support",
    ],
    Icon: WebDevIcon,
  },
];

// ── Desktop ───────────────────────────────────────────────────────────────────
function DesktopServicesSection() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const containerRef        = useRef<HTMLDivElement>(null);
  const tabRefs             = useRef<(HTMLButtonElement | null)[]>([]);
  const [line, setLine]     = useState({ x: 0, top: 0 });
  const switchTimerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stable measureLine that always reads current active from the ref
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const measure = () => {
      const tab  = tabRefs.current[activeRef.current];
      const cont = containerRef.current;
      if (!tab || !cont) return;
      const tr = tab.getBoundingClientRect();
      const cr = cont.getBoundingClientRect();
      setLine({ x: tr.left - cr.left + tr.width / 2, top: tr.bottom - cr.top });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // Cleanup pending tab-switch timer on unmount
  useEffect(() => {
    return () => { if (switchTimerRef.current) clearTimeout(switchTimerRef.current); };
  }, []);

  const switchTab = (i: number) => {
    if (i === active) return;
    if (switchTimerRef.current) clearTimeout(switchTimerRef.current);
    setFading(true);
    switchTimerRef.current = setTimeout(() => { setActive(i); setFading(false); }, 150);
  };

  const svc  = SERVICES[active];
  const Icon = svc.Icon;

  return (
    <section
      className="dot-pattern w-full py-[80px] border-b border-dashed hidden lg:block"
      style={{ borderColor: "#d9d9d9" }}
    >
      <div className="max-w-[1200px] mx-auto px-[40px]">
        <ScrollReveal once={false} threshold={0.06}>
          <div
            className="rounded-[16px] overflow-hidden"
            style={{ background: "#ffffff", border: "1px solid #dedede" }}
          >
            {/* Card header */}
            <div className="px-[24px] py-[12px] border-b" style={{ borderColor: "#dedede" }}>
              <p className="text-[24px] font-medium leading-[1.5]" style={{ color: "#0e0e16" }}>
                Solutions
              </p>
            </div>

            {/* Card body */}
            <div className="p-[24px]">
              <div className="relative flex flex-col gap-[40px]" ref={containerRef}>

                {/* Tab row */}
                <div className="flex items-center flex-wrap gap-y-2">
                  {SERVICES.map((s, i) => (
                    <div key={s.id} className="flex items-center">
                      {i > 0 && <TabArrow />}
                      <button
                        ref={el => { tabRefs.current[i] = el; }}
                        onClick={() => switchTab(i)}
                        className="inline-flex items-center px-[16px] py-[8px] rounded-[100px] font-mono text-[14px] whitespace-nowrap border transition-all duration-200 select-none cursor-pointer"
                        style={active === i ? {
                          background: "#ffffff", color: "#0e0e16",
                          borderColor: "#d7d7d7", boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.25)",
                        } : {
                          background: "#e6e6e6", color: "#606060", borderColor: "#d7d7d7",
                        }}
                      >
                        {s.tab}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Vertical connector */}
                <div
                  className="absolute w-px pointer-events-none transition-[left] duration-300 ease-in-out"
                  style={{ left: line.x, top: line.top, height: 40, background: "#d7d7d7" }}
                />

                {/* Service content card */}
                <div
                  className="rounded-[24px] overflow-hidden flex flex-row"
                  style={{
                    border: "1px solid #ececec",
                    opacity:    fading ? 0 : 1,
                    transform:  fading ? "translateY(6px)" : "translateY(0)",
                    transition: "opacity 150ms ease, transform 150ms ease",
                  }}
                >
                  {/* Left column */}
                  <div
                    className="flex-1 flex flex-col gap-[16px] p-[32px] border-r"
                    style={{ borderColor: "#ececec" }}
                  >
                    <div
                      className="size-[80px] rounded-[16px] flex items-center justify-center shrink-0"
                      style={{ background: "#f0f0f0", border: "1px solid #d7d7d7" }}
                    >
                      <Icon />
                    </div>
                    <div className="flex flex-col gap-[16px]">
                      <h3 className="text-[24px] leading-[1.2] font-normal" style={{ color: "#0e0e16" }}>
                        {svc.title}
                      </h3>
                      <p className="text-[16px] leading-[1.5]" style={{ color: "#606060" }}>
                        {svc.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="flex-1 flex flex-col gap-[24px] px-[32px] py-[24px]">
                    <p className="text-[16px] leading-[1.5]" style={{ color: "#606060" }}>
                      {svc.longDesc}
                    </p>
                    <div className="flex flex-wrap gap-[12px]">
                      {svc.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center justify-center px-[16px] py-[8px] rounded-[100px] text-[16px] leading-[1.5] cursor-default"
                          style={{ background: "#f0f0f0", color: "#0e0e16" }}
                          onMouseEnter={e => (e.currentTarget.style.background = "#e8e8e8")}
                          onMouseLeave={e => (e.currentTarget.style.background = "#f0f0f0")}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ── Mobile ────────────────────────────────────────────────────────────────────
function MobileServicesSection() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const switchTimerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (switchTimerRef.current) clearTimeout(switchTimerRef.current); };
  }, []);

  const switchTab = (i: number) => {
    if (i === active) return;
    if (switchTimerRef.current) clearTimeout(switchTimerRef.current);
    setFading(true);
    switchTimerRef.current = setTimeout(() => { setActive(i); setFading(false); }, 150);
  };

  const svc  = SERVICES[active];
  const Icon = svc.Icon;

  return (
    <section
      className="lg:hidden dot-pattern w-full py-[48px] border-b border-dashed"
      style={{ borderColor: "#d9d9d9" }}
    >
      <div className="px-[24px] flex flex-col gap-[32px]">

        {/* Badge */}
        <div className="flex justify-center">
          <div
            className="inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-[100px] border bg-white"
            style={{ borderColor: "#d7d7d7", boxShadow: "0px 6px 8.1px 0px rgba(0,0,0,0.08)" }}
          >
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
            <span className="font-mono text-[13px] leading-[1.5] text-[#0e0e16] tracking-wide">
              SOLUTIONS
            </span>
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
          </div>
        </div>

        {/* Heading + subtext */}
        <div className="flex flex-col gap-[16px] text-center">
          <h2
            className="text-[32px] font-medium leading-[1.15] text-[#0e0e16]"
          >
            Design. Build. Launch.
          </h2>
          <p className="text-[16px] leading-[1.5] text-[#606060]">
            End-to-end solutions crafted to elevate your brand, engage your
            audience, and drive measurable results.
          </p>
        </div>

        {/* Tab pills — stacked, full width */}
        <div className="flex flex-col gap-[8px]">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => switchTab(i)}
              className="w-full flex items-center justify-center px-[14px] py-[10px] rounded-[100px] font-mono text-[12px] border transition-all duration-200 select-none cursor-pointer whitespace-nowrap"
              style={active === i ? {
                background:  "#ffffff",
                color:       "#0e0e16",
                borderColor: "#54b4e0",
                boxShadow:   "0px 0px 0px 3px rgba(84,180,224,0.15)",
              } : {
                background:  "#e6e6e6",
                color:       "#606060",
                borderColor: "#d7d7d7",
              }}
            >
              {s.tab}
            </button>
          ))}
        </div>

        {/* Content card — single column */}
        <div
          className="rounded-[20px] overflow-hidden flex flex-col"
          style={{
            border:     "1px solid #ececec",
            background: "#ffffff",
            opacity:    fading ? 0 : 1,
            transform:  fading ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 150ms ease, transform 150ms ease",
          }}
        >
          {/* Top block: icon + title + short desc */}
          <div
            className="flex flex-col gap-[16px] p-[24px] border-b"
            style={{ borderColor: "#ececec" }}
          >
            {/* Icon box */}
            <div
              className="size-[72px] rounded-[16px] flex items-center justify-center shrink-0"
              style={{ background: "#f0f0f0", border: "1px solid #d7d7d7" }}
            >
              <Icon />
            </div>

            <h3 className="text-[22px] leading-[1.2] font-normal" style={{ color: "#0e0e16" }}>
              {svc.title}
            </h3>

            <p className="text-[15px] leading-[1.5]" style={{ color: "#606060" }}>
              {svc.shortDesc}
            </p>
          </div>

          {/* Bottom block: long desc + tags */}
          <div className="flex flex-col gap-[20px] p-[24px]">
            <p className="text-[15px] leading-[1.5]" style={{ color: "#606060" }}>
              {svc.longDesc}
            </p>

            <div className="flex flex-wrap gap-[10px]">
              {svc.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center justify-center px-[14px] py-[7px] rounded-[100px] text-[14px] leading-[1.5]"
                  style={{ background: "#f0f0f0", color: "#0e0e16" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Default export ─────────────────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <>
      <DesktopServicesSection />
      <MobileServicesSection />
    </>
  );
}

// ── Tab arrow connector ───────────────────────────────────────────────────────
function TabArrow() {
  return (
    <div className="flex items-center px-[6px] shrink-0">
      <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
        <line x1="0" y1="5" x2="13" y2="5" stroke="#d0d0d0" strokeWidth="1.2" />
        <path
          d="M10 2.5 L15 5 L10 7.5"
          stroke="#d0d0d0" strokeWidth="1.2"
          strokeLinecap="round" strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function WebDesignIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <rect x="3" y="7" width="36" height="28" rx="3.5" stroke="#0e0e16" strokeWidth="1.8" />
      <line x1="3" y1="15" x2="39" y2="15" stroke="#0e0e16" strokeWidth="1.5" />
      <circle cx="9"  cy="11" r="2" fill="#0e0e16" />
      <circle cx="15" cy="11" r="2" fill="#0e0e16" />
      <rect x="8"  y="20" width="11" height="9" rx="2" stroke="#0e0e16" strokeWidth="1.5" />
      <line x1="23" y1="21" x2="34" y2="21" stroke="#0e0e16" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="25" x2="30" y2="25" stroke="#0e0e16" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FramerIcon() {
  return (
    <svg width="30" height="36" viewBox="0 0 30 36" fill="#0e0e16">
      <path d="M0 0h30v12H15L0 0zm0 12h15l15 12H0V12zm0 12h15v12z" />
    </svg>
  );
}

function WebDevIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M13 10 L4 20 L13 30" stroke="#0e0e16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M27 10 L36 20 L27 30" stroke="#0e0e16" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="24" y1="8" x2="16" y2="32" stroke="#0e0e16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
