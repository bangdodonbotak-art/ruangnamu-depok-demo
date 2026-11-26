"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => prefersReducedMotion());

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function isSaveData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData);
}

export function shouldPlayFilm(): boolean {
  return !prefersReducedMotion() && !isSaveData();
}

/**
 * Lenis is desktop / pointer-fine only. Returns null when reduced-motion
 * is on, the pointer is coarse, or the viewport is narrower than 1025px —
 * the site must work with Lenis disabled.
 */
export function createLenisInstance(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (prefersReducedMotion()) return null;
  if (window.matchMedia("(pointer: coarse)").matches) return null;
  if (window.innerWidth < 1025) return null;
  return new Lenis({ lerp: 0.1, smoothWheel: true });
}
