"use client";
import { useRef } from "react";
import { useCustomCursor } from "@/hooks/useCustomCursor";

interface CustomCursorProps {
  /** Pass current announcement visibility so the hook re-queries interactive
   *  elements whenever the DOM changes (bar mount / unmount). */
  showAnnouncement: boolean;
}

/**
 * CustomCursor — renders the dot + ring cursor elements and drives the
 * animation via useCustomCursor.
 */
export default function CustomCursor({ showAnnouncement }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useCustomCursor(dotRef, ringRef, showAnnouncement);

  return (
    <>
      <div id="cur-dot" ref={dotRef} />
      <div id="cur-ring" ref={ringRef} />
    </>
  );
}
