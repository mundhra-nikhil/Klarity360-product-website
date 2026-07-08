"use client";

import Nav from "@/components/ui/Nav";
import Footer from "@/components/sections/Footer";
import DocsCardGrid from "@/components/docs/DocsCardGrid";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsTableOfContents from "@/components/docs/DocsTableOfContents";
import { docCategories } from "@/lib/data/docs/manifest";
import { useEffect, useState } from "react";
import { PRODUCT_NAME } from '@/lib/constants';
import dynamic from 'next/dynamic';

const ParallaxCubes = dynamic(() => import('@/components/ui/ParallaxCubes'), { ssr: false });

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-90px 0px -60% 0px" }
    );

    docCategories.forEach((category) => {
      const el = document.getElementById(category.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="docs-theme flex flex-col min-h-screen bg-docs-bg-page text-docs-text-primary selection:bg-blue-500/30 font-sans transition-colors duration-200">
      <div className="docs-nav-wrapper sticky top-0 h-[68px] z-50 bg-docs-header-bg backdrop-blur-xl border-b border-docs-header-border transition-colors duration-200">
        <Nav showDocsSearch={true} />
      </div>

      <div className="flex flex-1 w-full relative">
        <ParallaxCubes staticMode={true} />
        <DocsSidebar />

        <main className="flex-1 min-w-0 px-6 py-12 md:px-12 lg:px-16 xl:px-24">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-20 mt-8 overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-docs-glow-bg blur-[100px] rounded-full pointer-events-none"></div>
              <h1 className="text-5xl md:text-6xl font-light text-slate-900 dark:text-white mb-6 tracking-tight transition-colors duration-200">
                <span>{PRODUCT_NAME}</span>{" "}
                Documentation
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl transition-colors duration-200">
                Learn how to install, set up, configure, and use {PRODUCT_NAME} products
                with this collection of in-depth user guides, whitepapers, and
                security documentation.
              </p>
            </div>

            {docCategories.map((category) => (
              <DocsCardGrid key={category.id} category={category} />
            ))}
          </div>
        </main>

        <DocsTableOfContents activeSection={activeSection} />
      </div>

      <Footer />
    </div>
  );
}
