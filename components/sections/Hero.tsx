"use client";
import { useRef, useEffect, RefObject } from "react";
import Nav from "@/components/ui/Nav";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import Link from "next/link";
import { BASE_PATH, PRODUCT_NAME } from '@/lib/constants';

interface HeroProps {
  /** Whether the announcement bar is visible; used to compute the sticky offset. */
  showAnnouncement: boolean;
  /** Ref to the AnnouncementBar wrapper so its height can be measured. */
  barRef: RefObject<HTMLDivElement | null>;

}

/**
 * Hero — full-bleed sticky video hero with scroll-driven animations.
 */
export default function Hero({ showAnnouncement, barRef }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const overlayExtraRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);

  // Keep hero height in sync with announcement bar
  useEffect(() => {
    const adjustHero = (): void => {
      if (!heroRef.current) return;
      const barHeight = showAnnouncement
        ? barRef.current?.offsetHeight ?? 0
        : 0;
      heroRef.current.style.setProperty(
        "--announcement-height",
        `${barHeight}px`
      );
    };

    adjustHero();
    window.addEventListener("resize", adjustHero);
    return () => window.removeEventListener("resize", adjustHero);
  }, [showAnnouncement, barRef]);

  // Scroll-driven blur / reveal animation
  useScrollProgress({
    bgVideoRef,
    overlayExtraRef,
    heroContentRef,
    scrollHintRef,
    heroStageRef,
  });

  return (
    <div className="hero-stage" ref={heroStageRef}>
      <div className="hero-sticky" ref={heroRef}>
        {/* @ts-expect-error fetchPriority is not yet supported in React video types */}
        <video id="bgvid" ref={bgVideoRef} autoPlay muted loop playsInline fetchPriority="high">
          <source src={`${BASE_PATH}/full-bg-video.mp4`} type="video/mp4" />
        </video>

        <div id="overlay" />
        <div id="overlay-extra" ref={overlayExtraRef} />

        <Nav />

        <div id="hero-content" ref={heroContentRef}>
          <h1 className="hero-h1">
            Data Validation<br />& Reconciliation
          </h1>
          <p className="hero-sub">
            {PRODUCT_NAME} compares datasets across systems to help QA and business users validate migrated or transformed data. Engineered with a Secure-by-Design and Secure-by-Default philosophy.
          </p>
          <Link href="https://sit-klarity360.kanerika.com/login" target="_blank" rel="noopener noreferrer" className="hero-cta">
            Try Now
          </Link>
        </div>

        <div id="scroll-hint" ref={scrollHintRef}>
          <div className="scroll-chevron">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M3 6l5 5 5-5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span>Scroll</span>
        </div>
      </div>
    </div>
  );
}
