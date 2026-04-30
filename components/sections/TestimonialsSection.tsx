"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { SanityTestimonial } from "@/lib/queries";

type Testimonial = { id: number; quote: string; projectImage: string; authorPhoto: string; name: string; role: string; };

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 0,
    quote:
      "The process was smooth, communication was clear, and the final result exceeded our expectations. The team were delightful to work with along the way.",
    projectImage: "/images/proj1-a.png",
    authorPhoto: "/images/profile.jpg",
    name: "Denis Slavonic",
    role: "CTO, GOOGLE",
  },
  {
    id: 1,
    quote:
      "Thanks to the work delivered, we now have a digital presence that truly reflects our business and drives consistent results. Love for the good service!",
    projectImage: "/images/proj2-a.png",
    authorPhoto: "/images/profile.jpg",
    name: "Corey Donin",
    role: "CTO, METRICFORM",
  },
  {
    id: 2,
    quote:
      "I told them I needed something simple and easy to manage. They listened, gave suggestions, and the result turned out better than I expected. Now updating the site feels effortless.",
    projectImage: "/images/proj3-a.png",
    authorPhoto: "/images/profile.jpg",
    name: "Nolan Ekstrom",
    role: "FOUNDER, CERULEAN",
  },
  {
    id: 3,
    quote:
      "At first, we just wanted a cleaner website. But once the work was finished, it wasn't just clean — it actually started bringing in more customers. We were surprised how quickly it made a difference.",
    projectImage: "/images/proj3-b.png",
    authorPhoto: "/images/profile.jpg",
    name: "James Philips",
    role: "CTO, MYK STUDIO",
  },
];

function toTestimonial(t: SanityTestimonial, i: number): Testimonial {
  return {
    id:          i,
    quote:       t.quote,
    authorPhoto: t.authorPhoto ?? "/images/profile.jpg",
    projectImage: t.projectImage ?? "/images/proj1-a.png",
    name:        t.authorName,
    role:        t.authorRole,
  };
}

// ── Shared scroll logic hook ───────────────────────────────────────────────────
function useTestimonialsScroll(sectionRef: React.RefObject<HTMLDivElement | null>, N: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardProgress, setCardProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = -rect.top;
      const scrollable = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

      const total = progress * N;
      const index = Math.min(N - 1, Math.floor(total));
      const cp = total - Math.floor(total);

      setActiveIndex(index);
      setCardProgress(index === N - 1 ? 0 : cp);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRef, N]);

  return { activeIndex, cardProgress };
}

// ── Desktop ───────────────────────────────────────────────────────────────────
function DesktopTestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const N = testimonials.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const { activeIndex, cardProgress } = useTestimonialsScroll(sectionRef, N);

  return (
    <section
      ref={sectionRef}
      className="relative dot-pattern border-b border-dashed hidden lg:block"
      style={{ height: `${(N + 1) * 100}vh`, borderColor: "#d9d9d9" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-[64px] px-[120px] overflow-hidden">

        {/* Header */}
        <ScrollReveal once threshold={0.1} className="flex flex-col gap-[24px] items-center text-center">
          <div
            className="inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-[100px] border bg-white"
            style={{ borderColor: "#d7d7d7", boxShadow: "0px 6px 8.1px 0px rgba(0,0,0,0.08)" }}
          >
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16] tracking-wide">TESTIMONIAL</span>
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
          </div>
          <h2 className="text-[40px] font-medium leading-[1.2] text-[#0e0e16] text-center max-w-[824px]">
            What my Clients Said About Me
          </h2>
        </ScrollReveal>

        {/* Card stack */}
        <div className="relative w-[672px] h-[318px]">
          {testimonials.map((t, i) => {
            const offset = i - activeIndex;
            if (offset < 0) return null;

            let rotate = 0, scale = 1, translateY = 0, opacity = 1;
            let zIndex = N - offset;

            if (offset === 0) {
              rotate    = cardProgress * 3.5;
              scale     = 1 - cardProgress * 0.07;
              translateY = cardProgress * 10;
              zIndex    = cardProgress < 0.4 ? N + 1 : 0;
              opacity   = cardProgress > 0.8 ? 1 - (cardProgress - 0.8) / 0.2 : 1;
            } else {
              const baseRot = offset * 1.66;
              const prevRot = (offset - 1) * 1.66;
              rotate = baseRot - cardProgress * (baseRot - prevRot);
            }

            return (
              <div
                key={t.id}
                className="absolute inset-0 origin-bottom"
                style={{
                  zIndex,
                  transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                  willChange: "transform, opacity",
                }}
              >
                <DesktopTestimonialCard testimonial={t} />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <DotIndicators count={N} activeIndex={activeIndex} />
      </div>
    </section>
  );
}

function DesktopTestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="flex flex-col w-[672px] rounded-[24px] overflow-hidden border bg-white"
      style={{ borderColor: "#d7d7d7", boxShadow: "8px 8px 32px 0px rgba(0,0,0,0.08)" }}
    >
      {/* Quote + project image */}
      <div className="flex gap-[32px] items-center p-[32px]">
        <p className="flex-1 text-[18px] leading-[1.5] text-[#0e0e16]">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="relative shrink-0 rounded-[8px] overflow-hidden" style={{ width: "142px", height: "135px" }}>
          <Image src={testimonial.projectImage} alt="" fill className="object-cover object-top" />
        </div>
      </div>
      {/* Author bar */}
      <div className="p-[12px]">
        <div className="flex items-center gap-[16px] p-[12px] rounded-[16px]" style={{ background: "#f0f0f0" }}>
          <div className="relative shrink-0 rounded-full overflow-hidden" style={{ width: "52px", height: "52px" }}>
            <Image src={testimonial.authorPhoto} alt={testimonial.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-[4px] flex-1 min-w-0">
            <p className="text-[18px] leading-[1.5] text-[#0e0e16]">{testimonial.name}</p>
            <p className="text-[14px] leading-[1.5] text-[#0e0e16]">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mobile ────────────────────────────────────────────────────────────────────
function MobileTestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const N = testimonials.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const { activeIndex, cardProgress } = useTestimonialsScroll(sectionRef, N);

  return (
    <section
      ref={sectionRef}
      className="relative dot-pattern border-b border-dashed lg:hidden"
      style={{ height: `${(N + 1) * 100}vh`, borderColor: "#d9d9d9" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-[48px] px-[24px] overflow-hidden">

        {/* Header */}
        <div className="flex flex-col gap-[24px] items-center text-center">
          <div
            className="inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-[100px] border bg-white"
            style={{ borderColor: "#d7d7d7", boxShadow: "0px 6px 4.05px 0px rgba(0,0,0,0.08)" }}
          >
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16] tracking-wide">TESTIMONIALS</span>
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
          </div>
          <h2 className="text-[32px] font-medium leading-[1.2] text-[#0e0e16] text-center">
            What my Clients Said About Me
          </h2>
        </div>

        {/* Card stack */}
        <div className="relative w-full" style={{ height: "256px" }}>
          {testimonials.map((t, i) => {
            const offset = i - activeIndex;
            if (offset < 0) return null;

            let rotate = 0, scale = 1, translateY = 0, opacity = 1;
            let zIndex = N - offset;

            if (offset === 0) {
              // Front card exits: rotates clockwise, scales down, slips behind at 40%
              rotate     = cardProgress * 3.5;
              scale      = 1 - cardProgress * 0.07;
              translateY = cardProgress * 10;
              zIndex     = cardProgress < 0.4 ? N + 1 : 0;
              opacity    = cardProgress > 0.8 ? 1 - (cardProgress - 0.8) / 0.2 : 1;
            } else {
              // Cards behind rotate from their stacked position toward front position
              // Figma: card 2 = 2.88°, card 3 = 5.46° (≈ offset × 2.73°)
              const baseRot = offset * 2.73;
              const prevRot = (offset - 1) * 2.73;
              rotate = baseRot - cardProgress * (baseRot - prevRot);
            }

            return (
              <div
                key={t.id}
                className="absolute inset-0 flex items-center justify-center origin-bottom"
                style={{
                  zIndex,
                  transform: `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
                  opacity,
                  willChange: "transform, opacity",
                }}
              >
                <MobileTestimonialCard testimonial={t} />
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <DotIndicators count={N} activeIndex={activeIndex} />
      </div>
    </section>
  );
}

function MobileTestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="flex flex-col bg-white w-[296px]"
      style={{
        borderRadius: "18px",
        border: "0.766px solid #d7d7d7",
        boxShadow: "6px 6px 24px 0px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Quote — full width, no project image */}
      <div className="p-[15px]">
        <p className="text-[14px] leading-[1.5] text-[#0e0e16]">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Author bar */}
      <div className="px-[9px] pb-[9px]">
        <div
          className="flex items-center gap-[12px] p-[9px]"
          style={{ background: "#f0f0f0", borderRadius: "12px" }}
        >
          <div
            className="relative shrink-0 rounded-full overflow-hidden"
            style={{ width: "40px", height: "40px" }}
          >
            <Image src={testimonial.authorPhoto} alt={testimonial.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-[3px] flex-1 min-w-0">
            <p className="text-[14px] leading-[1.5] text-[#0e0e16]">{testimonial.name}</p>
            <p className="text-[11px] leading-[1.5] text-[#606060]">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shared dot indicators ──────────────────────────────────────────────────────
function DotIndicators({ count, activeIndex }: { count: number; activeIndex: number }) {
  return (
    <div className="flex gap-[8px] items-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-[8px] rounded-[100px] transition-all duration-300"
          style={{
            width: "40px",
            background: i === activeIndex ? "#0e0e16" : "#e0e0eb",
            boxShadow: i !== activeIndex ? "inset 0px 1px 2px 0px rgba(0,0,0,0.08)" : undefined,
          }}
        />
      ))}
    </div>
  );
}

// ── Default export ─────────────────────────────────────────────────────────────
export default function TestimonialsSection({ testimonials: sanityTestimonials }: { testimonials?: SanityTestimonial[] }) {
  const testimonials = sanityTestimonials && sanityTestimonials.length > 0
    ? sanityTestimonials.map(toTestimonial)
    : DEFAULT_TESTIMONIALS;
  return (
    <>
      <DesktopTestimonialsSection testimonials={testimonials} />
      <MobileTestimonialsSection  testimonials={testimonials} />
    </>
  );
}
