"use client";

import { useEffect } from "react";
import { createLenisInstance } from "@/lib/motion";

/**
 * Lenis smooth scroll — desktop / pointer-fine only. createLenisInstance()
 * returns null on reduced-motion, coarse pointers, and narrow viewports,
 * in which case the site scrolls natively.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = createLenisInstance();
    if (!lenis) return;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
