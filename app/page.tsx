"use client";

import { useRef, useState } from "react";
import AnnouncementBar from "@/components/ui/AnnouncementBar";
import Hero from "@/components/sections/Hero";
import VideoDemo from "@/components/sections/VideoDemo";
import Industries from "@/components/sections/Industries";
import Footer from "@/components/sections/Footer";

/**
 * Home — page orchestrator.
 *
 * Manages only the top-level announcement-visibility state and passes it down
 * to the components that need it. All other state and logic lives inside the
 * respective section components.
 */
export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState<boolean>(true);
  const barRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {showAnnouncement && (
        <AnnouncementBar
          ref={barRef}
          onClose={() => setShowAnnouncement(false)}
        />
      )}

      <Hero showAnnouncement={showAnnouncement} barRef={barRef} />

      <div id="page-below">
        <VideoDemo />
        <Industries />
        <Footer />
      </div>
    </>
  );
}
