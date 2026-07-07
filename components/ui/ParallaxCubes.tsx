"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BASE_PATH } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxCubes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
            invalidateOnRefresh: true
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0">
      {/* Set A - Top of the container (Section 3) */}
      
      {/* Closer (Bigger & Faster) */}
      <div className="parallax-cube-wrapper absolute top-[5%] left-[5%]" data-speed="0.25">
        <div style={{ animation: 'float1 8s ease-in-out infinite' }}>
          <img src={`${BASE_PATH}/assets/images/login-deco-cube-1.svg`} alt="Cube" style={{ width: '240px', opacity: 0.06 }} />
        </div>
      </div>
      
      {/* Mid distance */}
      <div className="parallax-cube-wrapper absolute top-[15%] right-[8%]" data-speed="0.15">
        <div style={{ animation: 'float2 10s ease-in-out infinite reverse' }}>
          <img src={`${BASE_PATH}/assets/images/login-deco-cube-2.svg`} alt="Cube" style={{ width: '150px', opacity: 0.06 }} />
        </div>
      </div>

      {/* Further (Smaller & Slower) */}
      <div className="parallax-cube-wrapper absolute top-[25%] left-[20%]" data-speed="0.05">
        <div style={{ animation: 'float1 12s ease-in-out infinite 2s' }}>
          <img src={`${BASE_PATH}/assets/images/login-deco-cube-3.svg`} alt="Cube" style={{ width: '90px', opacity: 0.04 }} />
        </div>
      </div>

      {/* Set B - Middle of the container (Section 4) */}
      <div className="parallax-cube-wrapper absolute top-[45%] right-[15%]" data-speed="0.20">
        <div style={{ animation: 'float2 9s ease-in-out infinite 1s' }}>
          <img src={`${BASE_PATH}/assets/images/login-deco-cube-1.svg`} alt="Cube" style={{ width: '200px', opacity: 0.06 }} />
        </div>
      </div>
      
      <div className="parallax-cube-wrapper absolute top-[55%] left-[10%]" data-speed="0.10">
        <div style={{ animation: 'float1 11s ease-in-out infinite 3s' }}>
          <img src={`${BASE_PATH}/assets/images/login-deco-cube-2.svg`} alt="Cube" style={{ width: '120px', opacity: 0.05 }} />
        </div>
      </div>

      <div className="parallax-cube-wrapper absolute top-[70%] right-[25%]" data-speed="0.30">
        <div style={{ animation: 'float2 7s ease-in-out infinite' }}>
          <img src={`${BASE_PATH}/assets/images/login-deco-cube-3.svg`} alt="Cube" style={{ width: '280px', opacity: 0.08 }} />
        </div>
      </div>
      
      {/* Set C - Bottom of the container (Footer area) */}
      <div className="parallax-cube-wrapper absolute top-[85%] left-[15%]" data-speed="0.12">
        <div style={{ animation: 'float1 10s ease-in-out infinite 1s' }}>
          <img src={`${BASE_PATH}/assets/images/login-deco-cube-2.svg`} alt="Cube" style={{ width: '160px', opacity: 0.06 }} />
        </div>
      </div>
    </div>
  );
}
