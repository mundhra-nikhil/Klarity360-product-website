"use client";
import { useEffect, RefObject } from "react";

/**
 * Drives the custom cursor animation: smoothly follows the mouse and grows
 * on interactive elements.
 *
 * @param dotRef   - The small cursor dot element
 * @param ringRef  - The larger cursor ring element
 * @param dep      - Re-run the effect when this value changes (e.g. when the
 *                   DOM changes after toggling the announcement bar).
 */
export function useCustomCursor(
  dotRef: RefObject<HTMLDivElement | null>,
  ringRef: RefObject<HTMLDivElement | null>,
  dep: unknown
): void {
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let frameId: number;

    const handleMove = (event: MouseEvent): void => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const cursorLoop = (): void => {
      dotX += (mouseX - dotX) * 0.18;
      dotY += (mouseY - dotY) * 0.18;
      ringX += (mouseX - ringX) * 0.07;
      ringY += (mouseY - ringY) * 0.07;
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      frameId = requestAnimationFrame(cursorLoop);
    };

    const interactiveElements = document.querySelectorAll<HTMLElement>(
      "a,button,.aclose,.chapter-item,.video-progress"
    );
    const grow = (): void => ring.classList.add("big");
    const shrink = (): void => ring.classList.remove("big");

    document.addEventListener("mousemove", handleMove);
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    frameId = requestAnimationFrame(cursorLoop);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
      cancelAnimationFrame(frameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}
