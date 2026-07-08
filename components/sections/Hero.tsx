"use client";
import { useRef } from "react";
import Nav from "@/components/ui/Nav";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import Link from "next/link";
import { BASE_PATH, PRODUCT_NAME } from '@/lib/constants';

/**
 * Hero — full-bleed sticky video hero with scroll-driven animations.
 */
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const overlayExtraRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);

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
          <Link href="https://kanerika.com/contact-us/" target="_blank" rel="noopener noreferrer" className="hero-cta">
            Request a Demo
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
