"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { industries } from "@/lib/data/industries";

/**
 * Industries — auto-scrolling horizontal carousel.
 * Features:
 * - Auto-scrolls endlessly via requestAnimationFrame.
 * - Pauses on hover or touch interactions.
 * - Allows horizontal scrolling to override auto-scroll.
 * - Vertical scroll passes through natively.
 * - Only scrolls when visible on screen to save resources.
 */
export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const scrollPos = useRef(0);
  const animationRef = useRef<number | null>(null);
  const isDraggingOrScrolling = useRef(false);
  const initialized = useRef(false);

  // Triple the items for a seamless infinite loop
  // The first and last sets act as buffers so we can jump seamlessly
  const loopedIndustries = [...industries, ...industries, ...industries];

  // IntersectionObserver to detect when the section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px" } // Start slightly before it fully enters the viewport
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Initialize the starting position exactly once
  useEffect(() => {
    const track = trackRef.current;
    if (!track || initialized.current) return;

    const initializePosition = () => {
      if (track.scrollWidth > 0 && !initialized.current) {
        // Approximate middle set start point
        const singleSetWidth = track.scrollWidth / 3;
        track.scrollLeft = singleSetWidth;
        scrollPos.current = singleSetWidth;
        initialized.current = true;
      }
    };
    
    initializePosition();
    setTimeout(initializePosition, 100);
  }, []);

  // Main animation loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !isInView) return;

    const scrollSpeed = 0.5; // pixels per frame

    const loop = () => {
      if (!isPaused && !isDraggingOrScrolling.current) {
        scrollPos.current += scrollSpeed;
        
        const singleSetWidth = track.scrollWidth / 3;

        // If we scroll past the end of the second set, jump back to the start of the second set
        if (scrollPos.current >= singleSetWidth * 2) {
          scrollPos.current -= singleSetWidth;
        } 
        // If the user scrolls backwards past the first set, jump to the end of the second set
        else if (scrollPos.current <= 0) {
          scrollPos.current += singleSetWidth;
        }

        track.scrollLeft = scrollPos.current;
      } else {
        // If paused or scrolling, sync the internal position with the actual user-driven scrollLeft
        scrollPos.current = track.scrollLeft;
        
        const singleSetWidth = track.scrollWidth / 3;
        // Also handle seamless wrapping when user is scrolling manually
        if (track.scrollLeft >= singleSetWidth * 2) {
          track.scrollLeft -= singleSetWidth;
          scrollPos.current = track.scrollLeft;
        } else if (track.scrollLeft <= 0) {
          track.scrollLeft += singleSetWidth;
          scrollPos.current = track.scrollLeft;
        }
      }

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused, isInView]);

  return (
    <section ref={sectionRef} className="industries-section">
      <div className="industries-inner">
        {/* Header */}
        <div className="industries-header">
          <h2>Industries</h2>
          <p>Industry Expertise Delivering Your Sector&apos;s Critical KPIs</p>
        </div>

        {/* Viewport for horizontal track */}
        <div 
          className="industries-viewport"
          ref={trackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => {
            setIsPaused(true);
            isDraggingOrScrolling.current = true;
          }}
          onTouchEnd={() => {
            setIsPaused(false);
            isDraggingOrScrolling.current = false;
          }}
          onScroll={() => {
            // Keep the internal position synced and detect native scroll actions
            if (trackRef.current) {
              scrollPos.current = trackRef.current.scrollLeft;
            }
          }}
          onWheel={() => {
            isDraggingOrScrolling.current = true;
            // Debounce the wheel end
            if ((window as any).scrollTimeout) {
              clearTimeout((window as any).scrollTimeout);
            }
            (window as any).scrollTimeout = setTimeout(() => {
              isDraggingOrScrolling.current = false;
            }, 150);
          }}
        >
          <div className="industries-track">
            {loopedIndustries.map((industry, index) => (
              <Link
                key={`${industry.id}-${index}`}
                href={`/${industry.id}`}
                className="industry-card cursor-pointer decoration-none shrink-0"
              >
                {/* Image — 1:1 ratio, full-bleed */}
                <div className="industry-card-image">
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    sizes="(max-width: 768px) 72vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="industry-card-overlay" />
                </div>

                {/* Text */}
                <div className="industry-card-text">
                  <h3>{industry.name}</h3>
                  <p>{industry.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
