// ── Shared animation & transition constants ──────────────────────────────────
// Single source of truth — import everywhere, never duplicate cubic-bezier strings.

/** Spring overshoot curve — used on transforms (translateY, scale) */
export const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

/** Smooth ease-out — used on shadow, opacity, color */
export const EASE = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

/** Reveal ease — used on ScrollReveal-style enter animations */
export const REVEAL_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Standard button transition */
export const BTN_TRANSITION = `transform 0.25s ${SPRING}, box-shadow 0.2s ${EASE}`;

/** Card hover transition */
export const CARD_TRANSITION = `transform 0.4s ${SPRING}, box-shadow 0.3s ease, border-color 0.2s ease`;

/** Fade-switch transition (tab switching, content swap) */
export const FADE_DURATION = 150; // ms

// ── Button shadow presets ────────────────────────────────────────────────────

const INSET = "inset 0px -2px 0px 0px rgba(10,13,18,0.05)";

export const PRIMARY_SHADOWS = {
  idle:   `0px 4px 0px 0px #54b4e0, 0px 1px 2px 0px rgba(10,13,18,0.05), ${INSET}`,
  hover:  `0px 6px 0px 0px #3fa3d5, 0px 4px 16px 0px rgba(84,180,224,0.35), ${INSET}`,
  active: `0px 2px 0px 0px #3fa3d5, 0px 1px 4px 0px rgba(84,180,224,0.2), ${INSET}`,
} as const;

export const SECONDARY_SHADOWS = {
  idle:   `0px 4px 0px 0px #e3e3e3, 0px 1px 2px 0px rgba(10,13,18,0.05), ${INSET}`,
  hover:  `0px 6px 0px 0px #d0d0d0, 0px 4px 16px 0px rgba(0,0,0,0.08), ${INSET}`,
  active: `0px 2px 0px 0px #d0d0d0, 0px 1px 4px 0px rgba(0,0,0,0.05), ${INSET}`,
} as const;

export const BTN_Y = { idle: "0px", hover: "-3px", active: "1px" } as const;

export type ButtonState = "idle" | "hover" | "active";
