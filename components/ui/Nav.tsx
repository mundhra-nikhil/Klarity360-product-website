"use client";

import DocsSearch from "@/components/docs/DocsSearch";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { BASE_PATH } from "@/lib/constants";


/**
 * Nav — top navigation bar.
 */
interface NavProps {
  showDocsSearch?: boolean;
}

export default function Nav({ showDocsSearch = false }: NavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside of the navbar
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && navRef.current && !navRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close mobile menu on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav ref={navRef}>
      <Link href="/" className="nav-logo" onClick={() => setIsOpen(false)}>
        <Image
          src={`${BASE_PATH}/klarity-logo.png`}
          alt="Klarity logo"
          width={140}
          height={40}
          priority
          className={`h-9 w-auto object-contain ${pathname === "/" ? "" : "dark:invert-0 invert"}`}
        />
        {showDocsSearch && (
          <span className="text-black dark:text-white font-medium text-[19px] leading-none -translate-y-[3px] hidden sm:inline-block" style={{ fontFamily: "var(--font-poppins), sans-serif", letterSpacing: "-0.01em" }}>Documentation</span>
        )}
      </Link>

      <ul className="nav-links">
        <li>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/docs" className={pathname?.startsWith("/docs") ? "active" : ""}>
            Resources
          </Link>
        </li>
      </ul>

      <div className="nav-right">
        {showDocsSearch && <DocsSearch />}
        {showDocsSearch && <ThemeToggle />}
        <Link 
          href="https://sit-klarity360.kanerika.com/login?returnUrl=%2Fdashboard"
          className={`nav-cta-desktop flex items-center justify-center px-4 py-2 text-sm font-medium ${pathname === "/" ? "text-white" : "text-black dark:text-white"} glass-bg hover:opacity-90 transition-all active:opacity-80 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(0,0,0,0.1)] dark:active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(0,0,0,0.2)] rounded-md`}
        >
          Login
        </Link>
        <Link 
          href="https://kanerika.com/contact-us/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-cta-desktop flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#8C48FF] to-[#FF5F3D] rounded-md hover:opacity-90 transition-opacity"
        >
          <span>Contact Us</span>
          <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
          </svg>
        </Link>
        <button
          className="hamburger-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={`hamburger-bar ${isOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${isOpen ? "open" : ""}`} />
          <span className={`hamburger-bar ${isOpen ? "open" : ""}`} />
        </button>
      </div>

      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          <li>
            <Link href="/" className={pathname === "/" ? "active" : ""} onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/docs" className={pathname?.startsWith("/docs") ? "active" : ""} onClick={() => setIsOpen(false)}>
              Resources
            </Link>
          </li>
        </ul>

        <div className="mobile-nav-cta flex flex-col gap-3">
          <Link 
            href="https://sit-klarity360.kanerika.com/login?returnUrl=%2Fdashboard"
            className={`flex items-center justify-center px-4 py-3 text-sm font-semibold ${pathname === "/" ? "text-white" : "text-black dark:text-white"} glass-bg hover:opacity-90 transition-all active:opacity-80 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(0,0,0,0.1)] dark:active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(0,0,0,0.2)] rounded-md w-full text-center`}
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link 
            href="https://kanerika.com/contact-us/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#8C48FF] to-[#FF5F3D] rounded-md hover:opacity-90 transition-opacity w-full text-center"
            onClick={() => setIsOpen(false)}
          >
            <span>Contact Us</span>
            <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

