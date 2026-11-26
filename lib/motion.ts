"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion(): boolean {
  const [reduceMotion, setReduceMotion] = useState(prefersReducedMotion());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reduceMotion;
}

export function createLenisInstance(): Lenis | null {
  if (prefersReducedMotion()) {
    return null;
  }

  return new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });
}
