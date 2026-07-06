"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface SectorInfo {
  slug: string;
  title: string;
  description: string;
  image: string;
  sectorName: string;
}

interface ExploreSectorsCarouselProps {
  sectors: SectorInfo[];
}

export default function ExploreSectorsCarousel({
  sectors,
}: ExploreSectorsCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // Use 1px tolerance for subpixel rounding issues
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    handleScroll(); // Initial check on mount

    container.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectors]);

  const prev = () => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : carouselRef.current.clientWidth / 5;
      carouselRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const next = () => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.firstElementChild as HTMLElement;
      const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : carouselRef.current.clientWidth / 5;
      carouselRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  const isLeftDisabled = !canScrollLeft;
  const isRightDisabled = !canScrollRight;

  return (
    <section className="w-full py-20 border-b border-[#e7e5e4] bg-[#F7F6F2]">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Header with Title & controls */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-serif text-[28px] font-bold text-[#1c1917] tracking-tight">
              Explore Other Sectors
            </h2>
            <p className="text-sm text-[#78716c] mt-1">
              Discover how we empower other sectors with AI intelligence
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={prev}
              disabled={isLeftDisabled}
              className="p-2.5 rounded-full border border-[#e7e5e4] bg-white text-[#1c1917] hover:bg-slate-50 hover:border-slate-400 disabled:opacity-30 disabled:hover:bg-white disabled:hover:border-[#e7e5e4] transition-colors duration-150 cursor-pointer select-none"
              aria-label="Previous sectors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="black"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={isRightDisabled}
              className="p-2.5 rounded-full border border-[#e7e5e4] bg-white text-[#1c1917] hover:bg-slate-50 hover:border-slate-400 disabled:opacity-30 disabled:hover:bg-white disabled:hover:border-[#e7e5e4] transition-colors duration-150 cursor-pointer select-none"
              aria-label="Next sectors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="black"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div className="overflow-hidden mx-[-8px]">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto scroll-smooth no-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            } as React.CSSProperties}
          >
            {sectors.map((sector) => (
              <div
                key={sector.slug}
                className="flex-[0_0_50%] md:flex-[0_0_20%] px-2 flex flex-col flex-shrink-0"
              >
                <Link
                  href={`/${sector.slug}`}
                  className="group flex flex-col h-full bg-white border border-[#e7e5e4] rounded-xl overflow-hidden hover:border-slate-400 hover:shadow-md transition-all duration-300"
                >
                  {/* Compact Rounded Image with 160px height */}
                  <div className="relative h-[160px] w-full overflow-hidden bg-[#1c1917] border-b border-[#e7e5e4] flex-shrink-0">
                    <Image
                      src={sector.image}
                      alt={`${sector.sectorName} image`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>
                  {/* Details with zero extra outer padding, cleanly contained */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-[#1c1917] text-base mb-1.5 group-hover:text-slate-700 transition-colors duration-150">
                        {sector.sectorName}
                      </h3>
                      <p className="text-[#78716c] text-xs leading-relaxed line-clamp-2">
                        {sector.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}