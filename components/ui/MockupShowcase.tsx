"use client";

import Image from "next/image";
import { useState } from "react";

const cards = [
  { src: "/images/proj1.png", alt: "Project 1" },
  { src: "/images/proj2.png", alt: "Project 2" },
  { src: "/images/proj3.png", alt: "Project 3" },
];

// ── Desktop vertical set ───────────────────────────────────────────────────────
const CARD_SLOT_V = 329 + 6.784 * 2 + 13.567;
const MIN_FILL_V  = 960;
const repeatV     = Math.max(1, Math.ceil(MIN_FILL_V / (cards.length * CARD_SLOT_V)));
const baseSetV    = Array.from({ length: repeatV }, () => cards).flat();
const allCardsV   = [...baseSetV, ...baseSetV];

// ── Mobile horizontal set — Figma 108-19 ──────────────────────────────────────
// Figma card: 440.597 × 295.19px  →  scaled to 260 × 174px (same 1.494 ratio)
// Gap: 11.671px → 12px
// Seamless offset = 3 cards + 3 gaps = 3×260 + 3×12 = 816px
const M_W   = 260;
const M_H   = 174;
const M_PAD = 5.836;   // exact from Figma
const M_BR  = 11.671;  // exact from Figma
const M_GAP = 12;
const LOOP_OFFSET = 3 * M_W + 3 * M_GAP; // 816px

const allCardsH = [...cards, ...cards]; // 6 total — 3 base + 3 duplicate

// ── Desktop card ───────────────────────────────────────────────────────────────
function DesktopCard({ src, alt }: { src: string; alt: string }) {
  const pad = 6.784;
  const br  = 13.567;
  return (
    <div
      className="bg-white shrink-0"
      style={{
        borderRadius: `${br}px`,
        padding:      `${pad}px`,
        border:       "0.565px solid rgba(240,240,240,0.85)",
        width:        "512px",
      }}
    >
      <div
        className="relative bg-[#efefef] overflow-hidden"
        style={{ borderRadius: `${br - pad}px`, height: "329px" }}
      >
        <Image src={src} alt={alt} fill className="object-cover object-top" />
      </div>
    </div>
  );
}

// ── Mobile card — Figma 108-19 exact proportions ───────────────────────────────
function MobileCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        width:        M_W,
        height:       M_H,
        flexShrink:   0,
        borderRadius: M_BR,
        padding:      M_PAD,
        background:   "#ffffff",
        border:       "0.486px solid rgba(240,240,240,0.85)",
        boxShadow:    "0px 0px 9px 0px rgba(148,148,148,0.15)",
      }}
    >
      <div
        style={{
          position:     "relative",
          width:        "100%",
          height:       "100%",
          borderRadius: M_BR - M_PAD,
          background:   "#efefef",
          overflow:     "hidden",
        }}
      >
        <Image src={src} alt={alt} fill className="object-cover object-top" />
      </div>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function MockupShowcase() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      <style>{`
        @keyframes scroll-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes scroll-left-mobile {
          from { transform: translateX(0); }
          to   { transform: translateX(-${LOOP_OFFSET}px); }
        }
      `}</style>

      {/* ── Desktop — vertical scroll, untouched ── */}
      <div className="hidden lg:flex w-full justify-end items-center">
        <div
          className="relative overflow-hidden w-full lg:w-auto"
          style={{ height: "calc(100vh - 64px)" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex flex-col gap-[13.567px] px-[22.612px]"
            style={{
              animation:          "scroll-up 28s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {allCardsV.map((card, i) => (
              <DesktopCard key={i} src={card.src} alt={card.alt} />
            ))}
          </div>

          {/* Top fade */}
          <div
            className="absolute inset-x-0 top-0 h-[200px] pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, #f5f5f5, transparent)" }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-[220px] pointer-events-none z-10"
            style={{ background: "linear-gradient(to top, #f5f5f5, transparent)" }}
          />
        </div>
      </div>

      {/* ── Mobile — Figma 108-19: framed landscape cards, horizontal scroll ── */}
      <div
        className="lg:hidden relative overflow-hidden w-full"
        style={{ height: M_H + 16, paddingTop: 8, paddingBottom: 8 }}
      >
        {/* Scrolling strip */}
        <div
          style={{
            display:        "flex",
            flexDirection:  "row",
            gap:            M_GAP,
            paddingLeft:    19,
            animation:      "scroll-left-mobile 14s linear infinite",
            willChange:     "transform",
          }}
        >
          {allCardsH.map((card, i) => (
            <MobileCard key={i} src={card.src} alt={card.alt} />
          ))}
        </div>

        {/* Left fade */}
        <div
          className="absolute inset-y-0 left-0 w-[100px] pointer-events-none z-10"
          style={{ background: "linear-gradient(to right, #f5f5f5 20%, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute inset-y-0 right-0 w-[100px] pointer-events-none z-10"
          style={{ background: "linear-gradient(to left, #f5f5f5 20%, transparent)" }}
        />
      </div>
    </>
  );
}
