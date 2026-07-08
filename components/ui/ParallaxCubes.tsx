/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BASE_PATH } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxCubesProps {
  staticMode?: boolean;
}

const HOME_CUBES = [
  // Original layout designed for the centered homepage
  { top: "2%", left: "8%", size: "140px", type: 1, speed: "0.15", anim: "float1", dur: "10s", delay: "0s" },
  { top: "12%", right: "10%", size: "90px", type: 2, speed: "0.25", anim: "float2", dur: "8s", delay: "1s" },
  { top: "22%", left: "22%", size: "220px", type: 3, speed: "0.08", anim: "float1", dur: "14s", delay: "2s" },
  { top: "35%", right: "25%", size: "110px", type: 1, speed: "0.20", anim: "float2", dur: "9s", delay: "0.5s" },
  { top: "48%", left: "10%", size: "160px", type: 2, speed: "0.12", anim: "float1", dur: "11s", delay: "3s" },
  { top: "62%", right: "8%", size: "190px", type: 3, speed: "0.10", anim: "float2", dur: "12s", delay: "1.5s" },
  { top: "75%", left: "18%", size: "100px", type: 1, speed: "0.22", anim: "float1", dur: "8s", delay: "2.5s" },
  { top: "88%", right: "15%", size: "150px", type: 2, speed: "0.16", anim: "float2", dur: "10s", delay: "1s" },
];

const DOCS_CUBES = [
  // Cluster 1: Top Right (Between Hero text and TOC)
  { top: "12%", right: "28%", size: "180px", type: 1, speed: "0.05", anim: "float1", dur: "14s", delay: "0s" },
  { top: "18%", right: "22%", size: "90px", type: 3, speed: "0.08", anim: "float2", dur: "9s", delay: "1.5s" },

  // Individual 1: Middle Left (Tucked into left gutter)
  { top: "45%", left: "22%", size: "140px", type: 2, speed: "0.06", anim: "float2", dur: "12s", delay: "1s" },

  // Individual 2: Bottom Right (Tucked into right gutter)
  { top: "75%", right: "26%", size: "160px", type: 3, speed: "0.07", anim: "float1", dur: "13s", delay: "0.5s" },

  // Individual 3: Far Bottom Left (Tucked into left gutter)
  { top: "90%", left: "20%", size: "110px", type: 1, speed: "0.10", anim: "float2", dur: "11s", delay: "3s" },
];

const ParallaxCubes = ({ staticMode = false }: ParallaxCubesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (staticMode) return; // Disable GSAP scrolljacking on complex layouts like Docs

    let mm = gsap.matchMedia();
    
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let ctx = gsap.context(() => {
        const cubes = gsap.utils.toArray<HTMLElement>('.parallax-cube-wrapper');
        
        cubes.forEach((cube) => {
          const speed = parseFloat(cube.getAttribute('data-speed') || '0.1');
          
          gsap.to(cube, {
            y: () => {
              const h = containerRef.current?.offsetHeight || window.innerHeight;
              return -h * speed;
            },
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });
        });
      }, containerRef);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [staticMode]);

  const activeCubes = staticMode ? DOCS_CUBES : HOME_CUBES;

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {activeCubes.map((cube, i) => (
        <div
          key={i}
          className="parallax-cube-wrapper absolute"
          style={{
            top: cube.top,
            left: cube.left,
            right: cube.right,
          }}
          data-speed={cube.speed}
        >
          <div
            style={{
              animation: `${cube.anim} ${cube.dur} ease-in-out infinite ${cube.anim === "float2" ? "reverse" : "normal"} ${cube.delay}`
            }}
          >
            {staticMode ? (
              <>
                <img
                  src={`${BASE_PATH}/assets/images/login-deco-cube-${cube.type}-light.svg`}
                  alt="Cube Light"
                  className="block dark:hidden opacity-40 transition-all duration-300"
                  style={{ width: cube.size }}
                />
                <img
                  src={`${BASE_PATH}/assets/images/login-deco-cube-${cube.type}.svg`}
                  alt="Cube Dark"
                  className="hidden dark:block opacity-[0.06] transition-all duration-300"
                  style={{ width: cube.size }}
                />
              </>
            ) : (
              <img
                src={`${BASE_PATH}/assets/images/login-deco-cube-${cube.type}.svg`}
                alt="Cube"
                className="opacity-[0.06] transition-all duration-300"
                style={{ width: cube.size }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ParallaxCubes);
