"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "ABOUT ME",            id: "about"        },
  { label: "WORK OF EXPERIENCES", id: "experience"   },
  { label: "SOLUTION",            id: "solution"     },
  { label: "PROJECTS",            id: "projects"     },
  { label: "TESTI",               id: "testimonials" },
];

function getActiveSection(): string {
  let current = navItems[0].id;
  for (const { id } of navItems) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= 80) current = id;
  }
  return current;
}

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  // Derive initial active state synchronously on mount rather than defaulting to "about"
  const [active, setActive] = useState("about");

  useEffect(() => {
    // Set correct initial active state immediately
    setActive(getActiveSection());

    const handleScroll = () => setActive(getActiveSection());
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (pathname !== "/") {
      // Navigate to homepage with hash — scroll will happen after load
      router.push(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // sticky wrapper — zero height so it doesn't push content
    <div className="sticky top-[20px] z-50 hidden lg:flex justify-center pointer-events-none">
      <div
        className="pointer-events-auto flex items-center py-[10px] px-[8px] rounded-[12px] bg-white"
        style={{
          boxShadow:
            "0px 4px 0px 0px #e3e3e3, 0px 1px 2px 0px rgba(10,13,18,0.05), inset 0px -2px 0px 0px rgba(10,13,18,0.05)",
        }}
      >
        {navItems.map(({ label, id }, i) => (
          <div key={id} className="flex items-center">

            {/* Separator */}
            {i > 0 && (
              <div className="w-[24px] h-[53px] flex items-center justify-center shrink-0">
                <div className="w-px h-[20px]" style={{ background: "#e0e0e0" }} />
              </div>
            )}

            {/* Nav item */}
            <button
              onClick={() => scrollTo(id)}
              className="h-[53px] flex items-center justify-center px-[12px] rounded-[12px] font-mono text-[16px] leading-[1.5] text-[#0e0e16] whitespace-nowrap cursor-pointer"
              style={{
                background: active === id ? "#f3f3f3" : "transparent",
                boxShadow: active === id
                  ? "0px 4px 0px 0px #e3e3e3, 0px 1px 2px 0px rgba(10,13,18,0.05), inset 0px -2px 0px 0px rgba(10,13,18,0.05)"
                  : "none",
                transition: "background 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
                opacity: 1,
              }}
              onMouseEnter={e => { if (active !== id) (e.currentTarget as HTMLButtonElement).style.opacity = "0.6"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            >
              {label}
            </button>

          </div>
        ))}
      </div>
    </div>
  );
}
