"use client";

import Hero from "@/components/sections/Hero";
import VideoDemo from "@/components/sections/VideoDemo";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import DeploymentArchitecture from "@/components/sections/DeploymentArchitecture";
import Industries from "@/components/sections/Industries";
import Footer from "@/components/sections/Footer";
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
        <CapabilitiesSection />
        <DeploymentArchitecture />
        <Industries />
        <Footer />
      </div>
    </>
  );
}
