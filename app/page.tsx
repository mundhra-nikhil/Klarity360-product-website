"use client";

import Hero from "@/components/sections/Hero";
import VideoDemo from "@/components/sections/VideoDemo";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import DeploymentArchitecture from "@/components/sections/DeploymentArchitecture";
import Industries from "@/components/sections/Industries";
import dynamic from 'next/dynamic';
import Footer from "@/components/sections/Footer";

const ParallaxCubes = dynamic(() => import('@/components/ui/ParallaxCubes'), { ssr: false });
import "./styles/capabilities.css";

/**
 * Home — page orchestrator.
 *
 * All state and logic lives inside the respective section components.
 */
export default function Home() {
  return (
    <>
      <Hero />

      <div id="page-below">
        <VideoDemo />
        
        {/* Relative container for bottom sections to bound the parallax cubes */}
        <div className="relative w-full h-full bg-navy">
          <ParallaxCubes />
          <CapabilitiesSection />
          <DeploymentArchitecture />
          <Industries />
        </div>
        
        <Footer />
      </div>
    </>
  );
}
