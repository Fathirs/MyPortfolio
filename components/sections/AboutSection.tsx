"use client";

import { useRef, useEffect, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { SanityAbout } from "@/lib/queries";

// ── Static fallback content ────────────────────────────────────────────────────
const DEFAULT_BOLD_INTRO  = "Hi! I'm Fathir, a Product & Web Designer and Engineer";
const DEFAULT_PARA1_REST  =
  "based in Indonesia with 3 years of experience in the product design field." +
  " I specialize in transforming complex company and user problems into clear," +
  " effective, and visually engaging design solutions.";
const DEFAULT_PARA2 =
  "I have a strong design sense, allowing me to craft products with cohesive," +
  " distinctive, and highly engaging branding. Every design I create is not only" +
  " functional but also visually compelling, ensuring a memorable user experience" +
  " and strong product identity.";
const DEFAULT_PARA3 =
  "I'm highly skilled in leveraging generative AI to accelerate design" +
  " workflows—from ideation to execution—as well as optimizing products through" +
  " CRO (Conversion Rate Optimization) strategies. My work focuses on building" +
  " structured, user-centered experiences that not only look good but also drive" +
  " measurable results.";

// ── Token helper ──────────────────────────────────────────────────────────────
type Token = { word: string; bold: boolean };

function tok(text: string, bold = false): Token[] {
  return text.split(/\s+/).filter(Boolean).map(word => ({ word, bold }));
}

const SCROLL_RANGE = 2000;

// ── Desktop ───────────────────────────────────────────────────────────────────
function DesktopAbout({ boldIntro, para1Rest, para2, para3 }: {
  boldIntro: string; para1Rest: string; para2: string; para3: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef     = useRef(0);
  const [active, setActive] = useState(0);

  const paras: Token[][] = [
    [...tok(boldIntro, true), ...tok(para1Rest)],
    tok(para2),
    tok(para3),
  ];
  const offsets = paras.reduce<number[]>(
    (acc, _, i) => [...acc, i === 0 ? 0 : acc[i - 1] + paras[i - 1].length],
    []
  );
  const total = paras.reduce((s, p) => s + p.length, 0);

  useEffect(() => {
    const calc = () => {
      if (!sectionRef.current) return;
      const scrolled = -sectionRef.current.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, scrolled / SCROLL_RANGE));
      setActive(Math.round(progress * total));
    };
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(calc);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    calc();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [total]);

  return (
    <section
      ref={sectionRef}
      className="dot-pattern relative border-b border-dashed border-[#d9d9d9] hidden lg:block"
      style={{ height: `calc(100vh + ${SCROLL_RANGE}px)` }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <ScrollReveal threshold={0.3} once>
          <div
            className="bg-white w-full max-w-[582px] rounded-[16px] flex flex-col gap-[12px] overflow-hidden"
            style={{ boxShadow: "0px 0px 12px 0px rgba(148,148,148,0.25)" }}
          >
            {/* Header */}
            <div className="flex items-center border-b border-[#b6b6b6] pb-[10px] pt-[2px] px-[24px]">
              <p className="text-[22px] font-medium text-black leading-[1.5]">About me</p>
            </div>

            {/* Body — word-by-word highlight */}
            <div className="px-[24px] py-[12px]" style={{ letterSpacing: "-0.4px" }}>
              {paras.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-[20px] leading-[1.5] whitespace-pre-wrap"
                  style={{ marginBottom: pIdx < paras.length - 1 ? "1.5em" : 0 }}
                >
                  {para.map((token, wIdx) => {
                    const lit = offsets[pIdx] + wIdx < active;
                    return (
                      <span key={wIdx}>
                        {wIdx > 0 && " "}
                        <span
                          className={`transition-colors duration-[350ms] ease-out${token.bold ? " font-semibold" : ""}`}
                          style={{ color: lit ? (token.bold ? "#2e2f30" : "#676767") : (token.bold ? "#d0d0d0" : "#e0e0e0") }}
                        >
                          {token.word}
                        </span>
                      </span>
                    );
                  })}
                </p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ── Mobile ────────────────────────────────────────────────────────────────────
function MobileAbout({ boldIntro, para1Rest, para2, para3 }: {
  boldIntro: string; para1Rest: string; para2: string; para3: string;
}) {
  return (
    <section className="lg:hidden dot-pattern py-[40px] border-b border-dashed border-[#d9d9d9]">
      <div className="px-4">
        <div
          className="bg-white w-full rounded-[16px] flex flex-col gap-[12px] overflow-hidden"
          style={{ boxShadow: "0px 0px 12px 0px rgba(148,148,148,0.25)" }}
        >
          <div className="flex items-center border-b border-[#b6b6b6] pb-[10px] pt-[2px] px-[24px]">
            <p className="text-[20px] font-medium text-black leading-[1.5]">About me</p>
          </div>
          <div className="px-[24px] pb-[10px]" style={{ letterSpacing: "-0.32px" }}>
            <p className="text-[16px] leading-[1.5]" style={{ marginBottom: "1.5em" }}>
              <span className="font-semibold" style={{ color: "#2e2f30" }}>{boldIntro}{" "}</span>
              <span style={{ color: "#676767" }}>{para1Rest}</span>
            </p>
            <p className="text-[16px] leading-[1.5]" style={{ color: "#676767", marginBottom: "1.5em" }}>{para2}</p>
            <p className="text-[16px] leading-[1.5]" style={{ color: "#676767" }}>{para3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Default export ─────────────────────────────────────────────────────────────
export default function AboutSection({ about }: { about?: SanityAbout | null }) {
  const boldIntro = about?.boldIntro      ?? DEFAULT_BOLD_INTRO;
  const para1Rest = about?.paragraph1Rest ?? DEFAULT_PARA1_REST;
  const para2     = about?.paragraph2     ?? DEFAULT_PARA2;
  const para3     = about?.paragraph3     ?? DEFAULT_PARA3;

  return (
    <>
      <DesktopAbout boldIntro={boldIntro} para1Rest={para1Rest} para2={para2} para3={para3} />
      <MobileAbout  boldIntro={boldIntro} para1Rest={para1Rest} para2={para2} para3={para3} />
    </>
  );
}
