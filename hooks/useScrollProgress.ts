"use client";
import { useEffect, RefObject } from "react";

export interface ScrollProgressRefs {
  bgVideoRef: RefObject<HTMLVideoElement | null>;
  overlayExtraRef: RefObject<HTMLDivElement | null>;
  heroContentRef: RefObject<HTMLDivElement | null>;
  scrollHintRef: RefObject<HTMLDivElement | null>;
  heroStageRef: RefObject<HTMLDivElement | null>;
}

/**
 * Drives the hero scroll animation: blurs the background video, fades in the
 * overlay, and reveals the hero text content as the user scrolls down.
 */
export function useScrollProgress({
  bgVideoRef,
  overlayExtraRef,
  heroContentRef,
  scrollHintRef,
  heroStageRef,
}: ScrollProgressRefs): void {
  useEffect(() => {
    const scrollZone = 400;
    let ticking = false;

    const ease = (value: number): number =>
      value < 0.5
        ? 2 * value * value
        : 1 - Math.pow(-2 * value + 2, 2) / 2;

    const update = (): void => {
      ticking = false;
      const progress = Math.min(window.scrollY / scrollZone, 1);
      const eased = ease(progress);
      const textProgress = eased * eased * eased;

      if (bgVideoRef.current) {
        bgVideoRef.current.style.filter = `blur(${eased * 5}px)`;
      }
      if (overlayExtraRef.current) {
        overlayExtraRef.current.style.opacity = String(eased * 0.8);
      }
      if (heroContentRef.current) {
        heroContentRef.current.style.opacity = String(textProgress);
        heroContentRef.current.style.transform = `translateY(${28 - textProgress * 28}px)`;
      }
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(Math.max(0, 1 - progress * 1.5));
      }
      if (heroStageRef.current) {
        heroStageRef.current.style.setProperty(
          "--hero-scroll-zone",
          `${scrollZone}px`
        );
      }
    };

    const handleScroll = (): void => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", update);
    };
  }, []); // intentionally empty — refs are stable across renders
}
