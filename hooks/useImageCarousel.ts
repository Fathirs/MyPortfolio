import { useState, useEffect } from "react";

/**
 * Auto-cycles through image indices on an interval.
 * Resets to 0 when `count` changes (e.g. switching project).
 */
export function useImageCarousel(count: number, intervalMs = 1500) {
  const [active, setActive] = useState(0);

  useEffect(() => { setActive(0); }, [count]);

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => setActive(i => (i + 1) % count), intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs]);

  return active;
}
