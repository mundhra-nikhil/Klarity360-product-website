"use client";

import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState } from "react";
import FeatureArchitectureExplorer from "./feature-explorer/FeatureArchitectureExplorer";
import { featureDiagrams } from "@/lib/feature-diagrams";

/**
 * CapabilitiesSection — a unified, tab-driven interface for the 5 feature showcases.
 *
 * Replaces the scroll-driven multi-section layout with:
 * 1. A top-level tab switcher (always visible)
 * 2. A single content area with two columns (sub-steps list + diagram)
 * 3. Crossfade transitions between features using AnimatePresence
 */
export default function CapabilitiesSection() {
  const reduced = useReducedMotion();
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  const activeFeature = featureDiagrams[activeFeatureIndex];

  // Tab labels - shortened versions for the tab UI
  const tabLabels = [
    "Transformation (1→M, M→1)",
    "Key-to-Key Checks",
    "Auto-Validation",
    "JDBC Connectivity",
    "ETL Compatibility"
  ];

  return (
    <section className="caps-section fae">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-12 md:mb-16 max-w-3xl"
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}
        >
          <p className="caps-eyebrow">Capabilities</p>
          <h2 className="caps-heading">
            Built for how enterprise data actually moves
          </h2>
          <p className="caps-lede">
            Validation isn&apos;t an afterthought bolted on at the end. Klarity360
            meets your data wherever it lives and however it&apos;s shaped — through
            transformations, key matching, automated checks, and every major
            source your pipelines already touch.
          </p>
        </motion.div>

        {/* Tab switcher */}
        <motion.div
          className="caps-tabs-wrapper"
          initial={{ opacity: 0, y: reduced ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <div className="caps-tabs" role="tablist" aria-label="Feature capabilities">
            {tabLabels.map((label, index) => (
              <button
                key={index}
                type="button"
                className={`caps-tab${activeFeatureIndex === index ? " is-active" : ""}`}
                role="tab"
                aria-selected={activeFeatureIndex === index}
                aria-controls="caps-panel"
                onClick={() => setActiveFeatureIndex(index)}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content panel */}
        <motion.div
          id="caps-panel"
          className="caps-panel"
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut", delay: 0.15 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeFeatureIndex}
              className="caps-feature-instance"
              initial={{ opacity: 0, x: reduced ? 0 : 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reduced ? 0 : -8 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: "easeOut" }}
            >
              <FeatureArchitectureExplorer {...activeFeature} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
