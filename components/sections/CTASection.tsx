import ScrollReveal from "@/components/ui/ScrollReveal";
import { PrimaryButton, LinkedInButton } from "@/components/ui/Buttons";
import type { SanityHero } from "@/lib/queries";

const DEFAULT_EMAIL    = "hello@example.com";
const DEFAULT_LINKEDIN = "https://linkedin.com";

export default function CTASection({ hero }: { hero?: SanityHero | null }) {
  const email    = hero?.contactEmail ?? DEFAULT_EMAIL;
  const linkedin = hero?.linkedinUrl  ?? DEFAULT_LINKEDIN;
  return (
    <section className="dot-pattern w-full flex flex-col items-center">

      {/* CTA */}
      <div className="w-full max-w-[1200px] px-[24px] lg:px-[120px] py-[48px] lg:py-[80px] flex flex-col gap-[48px] lg:gap-[80px] items-center">

        <ScrollReveal once threshold={0.2} className="flex flex-col gap-[32px] items-center text-center w-full max-w-[996px]">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-[8px] px-[16px] py-[8px] rounded-[100px] border bg-white"
            style={{
              borderColor: "#d7d7d7",
              boxShadow: "0px 6px 8.1px 0px rgba(0,0,0,0.08)",
            }}
          >
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16] tracking-wide">
              START WITH CLARITY
            </span>
            <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
          </div>

          {/* Heading */}
          <h2
            className="text-[32px] lg:text-[40px] font-normal leading-[1.2] text-[#0e0e16]"
          >
            Need direction first? Start here.
          </h2>

          {/* Subtext */}
          <p className="text-[18px] leading-[1.5] text-[#606060] max-w-[422px]">
            Get instant clarity on your digital growth potential. No complexity, no commitment.
          </p>

          {/* Buttons */}
          <div className="flex flex-col lg:flex-row gap-[16px] items-stretch lg:items-center w-full lg:w-auto lg:flex-wrap justify-center">
            <PrimaryButton  href={`mailto:${email}`} className="lg:w-auto justify-center" />
            <LinkedInButton href={linkedin}           className="lg:w-auto justify-center" />
          </div>

        </ScrollReveal>

        {/* Tagline */}
        <ScrollReveal once threshold={0.1} delay={100} className="flex items-center gap-[10px]">
          <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
          <span className="font-mono text-[12px] leading-[1.5] text-[#0e0e16] text-center tracking-wide">
            FREE, ZERO-PRESSURE SESSION TO HELP YOU GROW WITH CONFIDENCE
          </span>
          <span className="font-mono text-[14px] leading-[1.5] text-[#0e0e16]">•</span>
        </ScrollReveal>

      </div>

      {/* Footer */}
      <footer
        className="w-full border-t border-dashed"
        style={{ borderColor: "#d9d9d9" }}
      >
        <div className="max-w-[1440px] mx-auto px-[24px] lg:px-[120px] py-[24px] flex items-center justify-between gap-[16px] flex-wrap">
          <p className="font-mono text-[12px] leading-[1.5] text-[#9a9a9a]">
            © {new Date().getFullYear()} — All rights reserved.
          </p>
          <p className="font-mono text-[12px] leading-[1.5] text-[#9a9a9a]">
            Designed &amp; built with care.
          </p>
        </div>
      </footer>

    </section>
  );
}
