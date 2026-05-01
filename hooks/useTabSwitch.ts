import { useState, useRef, useEffect, useCallback } from "react";
import { FADE_DURATION } from "@/lib/animations";

/**
 * Manages fade-out → swap → fade-in for tab-like UIs.
 * Returns the currently-displayed index and a boolean for the fading state.
 */
export function useTabSwitch(initial = 0) {
  const [active, setActive]     = useState(initial);
  const [display, setDisplay]   = useState(initial);
  const [fading, setFading]     = useState(false);
  const timerRef                = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const switchTo = useCallback((i: number) => {
    if (i === active) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setFading(true);
    setActive(i);
    timerRef.current = setTimeout(() => {
      setDisplay(i);
      setFading(false);
    }, FADE_DURATION);
  }, [active]);

  return { display, active, fading, switchTo } as const;
}
