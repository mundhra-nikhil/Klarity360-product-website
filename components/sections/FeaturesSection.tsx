"use client";

import { motion, useReducedMotion } from "motion/react";
import FeatureArchitectureExplorer from "./feature-explorer/FeatureArchitectureExplorer";
import { featureDiagrams } from "@/lib/feature-diagrams";

/**
 * FeaturesSection — stacks the five <FeatureArchitectureExplorer /> diagrams.
 *
 * Alternating left/right layout is baked into the configs (odd-indexed entries
 * set `reverse`). Each instance handles its own scroll entrance + first-step
 * auto-selection, so this component is mostly a heading + a vertical stack.
 */
export default function FeaturesSection() {
  const reduced = useReducedMotion();

  return (
    <section className="fae-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12 md:mb-16 max-w-3xl"
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}
        >
          <p className="fae-eyebrow">Capabilities</p>
          <h2 className="fae-heading">
            Built for how enterprise data actually moves
          </h2>
          <p className="fae-lede">
            Validation isn&apos;t an afterthought bolted on at the end. Klarity360
            meets your data wherever it lives and however it&apos;s shaped — through
            transformations, key matching, automated checks, and every major
            source your pipelines already touch.
          </p>
        </motion.div>

        <div className="fae-stack">
          {featureDiagrams.map((cfg) => (
            <div className="fae-instance" key={cfg.title}>
              <FeatureArchitectureExplorer {...cfg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
