"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  TbTable,
  TbDatabase,
  TbKey,
  TbCircleCheck,
  TbFlagFilled,
  TbBolt,
  TbFileImport,
  TbStack2,
  TbChevronRight,
} from "react-icons/tb";
import { SiSnowflake, SiPostgresql } from "react-icons/si";
import Link from "next/link";
import type {
  FeatureArchitectureExplorerProps,
  DiagramNode,
  DiagramConnector,
  DiagramCluster,
  DiagramTooltip,
  IconTone,
} from "@/lib/feature-diagrams";
import { connectorId } from "@/lib/feature-diagrams";

/* =======================================================================
 * Design-space + palette constants
 * ===================================================================== */

const CANVAS_W = 760;
const CANVAS_H = 500;

/** Default tooltip offset (design px) — clears the tile so the pill reads. */
const DEFAULT_TIP_DX = 12;
const DEFAULT_TIP_DY = -60;

const LINE = "#2c3038";
const INK_DIM = "#8b909c";
const INK_FAINT = "#5b6270";

const TONE: Record<IconTone, { color: string; soft: string }> = {
  amber: { color: "#f2a63c", soft: "rgba(242,166,60,0.20)" },
  green: { color: "#3fbe83", soft: "rgba(63,190,131,0.20)" },
  red: { color: "#e2574c", soft: "rgba(226,87,76,0.20)" },
  muted: { color: "#5b6270", soft: "rgba(91,98,112,0.18)" },
};

const TILE_SIZE: Record<string, number> = {
  tile: 76,
  engine: 92,
  badge: 84,
  scan: 76,
};

/* =======================================================================
 * Icon registry — resolves the string `icon` keys used in the data file.
 *
 * TODO(LOGO): "fabric", "informatica", "alteryx" are clean monogram
 * placeholders because these brands are not in simple-icons. Drop the
 * official SVG into /public/icons/ and swap the registry entry for a
 * next/image <Image> when the assets are supplied.
 * ===================================================================== */

function Monogram({ text }: { text: string }) {
  return <span className="fae-monogram">{text}</span>;
}

const ICONS: Record<string, React.ReactNode> = {
  table: <TbTable />,
  database: <TbDatabase />,
  key: <TbKey />,
  check: <TbCircleCheck />,
  flag: <TbFlagFilled />,
  bolt: <TbBolt />,
  import: <TbFileImport />,
  engine: <TbStack2 />,
  // TODO(LOGO): Oracle's mark was removed from simple-icons (trademark
  // request). Replace with the official Oracle SVG when available.
  oracle: <Monogram text="Or" />,
  snowflake: <SiSnowflake />,
  postgres: <SiPostgresql />,
  // TODO(LOGO): replace with official Microsoft Fabric SVG.
  fabric: <Monogram text="F" />,
  // TODO(LOGO): replace with official Informatica SVG.
  informatica: <Monogram text="I" />,
  // TODO(LOGO): replace with official Alteryx SVG.
  alteryx: <Monogram text="A" />,
};

function iconFor(key: string): React.ReactNode {
  return ICONS[key] ?? <TbDatabase />;
}

/* =======================================================================
 * Hooks
 * ===================================================================== */

/** Uniformly scales the fixed-size stage to fit its container width. */
function useStageScale() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const parentEl = el.parentElement;
    if (!parentEl) return;

    const update = () => {
      const pw = parentEl.clientWidth;
      const h = window.innerHeight;
      const w = window.innerWidth;
      
      // Calculate scale based on parent width
      let newScale = Math.min(1.15, pw / CANVAS_W);
      
      // Factor in height constraint on desktop viewports (min-width: 960px)
      if (h < 850 && w >= 960) {
        // Leave 300px for padding, section header, tabs, and margins
        const maxScaleByHeight = Math.max(0.5, (h - 300) / CANVAS_H);
        newScale = Math.min(newScale, maxScaleByHeight);
      }
      
      setScale(newScale);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(parentEl);
    
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return { wrapRef, scale };
}

/* =======================================================================
 * Step list (left rail)
 * ===================================================================== */

function StepList({
  steps,
  activeStepId,
  hoveredStepId,
  onSelect,
  onHover,
  onLeave,
  ctaLabel,
  ctaHref,
}: {
  steps: FeatureArchitectureExplorerProps["steps"];
  activeStepId: string;
  hoveredStepId: string | null;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onLeave: () => void;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const ctaTarget = ctaHref ?? "https://kanerika.com/contact-us/";

  return (
    <div className="fae-steps" onMouseLeave={onLeave}>
      {steps.map((step) => {
        const isActive = (hoveredStepId ?? activeStepId) === step.id;
        return (
          <button
            key={step.id}
            type="button"
            className={`fae-step${isActive ? " is-active" : ""}`}
            aria-current={isActive ? "step" : undefined}
            onClick={() => onSelect(step.id)}
            onMouseEnter={() => onHover(step.id)}
            onFocus={() => onHover(step.id)}
            onBlur={onLeave}
          >
            <span className="fae-dot" aria-hidden="true" />
            <span className="fae-step-body">
              <span className="fae-step-title">
                <span>{step.title}</span>
                <TbChevronRight className="fae-chev" aria-hidden="true" />
              </span>
              {step.description && (
                <span className="fae-step-desc">{step.description}</span>
              )}
            </span>
          </button>
        );
      })}

      {ctaLabel && (
        <Link
          href={ctaTarget}
          target={ctaTarget.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="fae-cta"
        >
          {ctaLabel}
          <TbChevronRight aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

/* =======================================================================
 * SVG overlays — clusters, connectors, tooltip stems
 * ===================================================================== */

function svgDefs() {
  return (
    <defs>
      {(["amber", "green", "red"] as IconTone[]).map((t) => (
        <filter
          key={t}
          id={`fae-glow-${t}`}
          x="-60%"
          y="-60%"
          width="220%"
          height="220%"
        >
          <feGaussianBlur stdDeviation="3.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      ))}
      {/* Arrowhead marker for flow direction */}
      <marker
        id="fae-arrow-amber"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="#f2a63c" />
      </marker>
      <marker
        id="fae-arrow-green"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="#3fbe83" />
      </marker>
      <marker
        id="fae-arrow-red"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="#e2574c" />
      </marker>
    </defs>
  );
}

function ClusterLayer({ clusters }: { clusters: DiagramCluster[] }) {
  if (!clusters.length) return null;
  return (
    <svg
      className="fae-svg"
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {clusters.map((cl, i) => {
        const tone = TONE[cl.tone ?? "amber"];
        const isEllipse = cl.shape === "ellipse";
        return (
          <React.Fragment key={i}>
            {isEllipse ? (
              <motion.ellipse
                cx={cl.x + cl.w / 2}
                cy={cl.y + cl.h / 2}
                rx={cl.w / 2}
                ry={cl.h / 2}
                fill="transparent"
                stroke={tone.color}
                strokeWidth={1.25}
                strokeDasharray="4 5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <motion.rect
                x={cl.x}
                y={cl.y}
                width={cl.w}
                height={cl.h}
                rx={14}
                fill="transparent"
                stroke={tone.color}
                strokeWidth={1.25}
                strokeDasharray="4 5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            )}
            {cl.label && (
              <motion.text
                x={isEllipse ? cl.x + cl.w / 2 : cl.x}
                y={isEllipse ? cl.y + 18 : cl.y - 6}
                textAnchor={isEllipse ? "middle" : "start"}
                fill={tone.color}
                fontSize={11}
                fontFamily="var(--font-mono), monospace"
                letterSpacing={0.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                {cl.label}
              </motion.text>
            )}
          </React.Fragment>
        );
      })}
    </svg>
  );
}

function ConnectorLayer({
  connectors,
  nodeMap,
  activeConnectorIds,
}: {
  connectors: DiagramConnector[];
  nodeMap: Record<string, DiagramNode>;
  activeConnectorIds: Set<string>;
}) {
  return (
    <svg
      className="fae-svg"
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {svgDefs()}
      {connectors.map((c) => {
        const from = nodeMap[c.from];
        const to = nodeMap[c.to];
        if (!from || !to) return null;
        const id = c.id ?? connectorId(c.from, c.to);
        const isActive = activeConnectorIds.has(id);
        const toneKey = c.tone ?? "amber";
        const tone = TONE[toneKey];
        const isGhost = c.tone === "muted";
        const pathD = `M${from.x},${from.y} L${to.x},${to.y}`;

        return (
          <g key={id}>
            <motion.line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              initial={false}
              animate={{
                stroke: isActive ? "#D4AF6A" : isGhost ? "#3a3f49" : LINE,
                strokeWidth: isActive ? 2 : 1.5,
                opacity: isGhost ? 0.5 : isActive ? 1 : 0.65,
                strokeDasharray: isActive ? "8 12" : "5 6",
              }}
              transition={{ duration: 0.25 }}
              strokeLinecap="round"
              className={isActive ? "fae-flow-line" : ""}
              style={
                isActive
                  ? {
                      animation: "flowDash 1s linear infinite",
                    }
                  : undefined
              }
              filter={
                isActive && toneKey !== "muted"
                  ? `url(#fae-glow-${toneKey})`
                  : undefined
              }
            />
            {isActive && !isGhost && (
              <>
                <circle r="3.5" fill={tone.color}>
                  <animateMotion
                    dur="1.2s"
                    repeatCount="indefinite"
                    path={pathD}
                  />
                </circle>
                <path
                  d="M-3,-3 L3,0 L-3,3"
                  fill="none"
                  stroke={tone.color}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <animateMotion
                    dur="1.2s"
                    repeatCount="indefinite"
                    path={pathD}
                  />
                </path>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function TooltipStems({
  tooltips,
  nodeMap,
}: {
  tooltips: DiagramTooltip[];
  nodeMap: Record<string, DiagramNode>;
}) {
  return (
    <svg
      className="fae-svg"
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {tooltips.map((t, i) => {
        const n = nodeMap[t.nodeId];
        if (!n) return null;
        const tx = n.x + (t.dx ?? DEFAULT_TIP_DX);
        const ty = n.y + (t.dy ?? DEFAULT_TIP_DY);
        return (
          <motion.line
            key={i}
            x1={n.x}
            y1={n.y}
            x2={tx}
            y2={ty}
            stroke="#f2a63c"
            strokeWidth={1}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 0.8, pathLength: 1 }}
            transition={{ duration: 0.25 }}
          />
        );
      })}
    </svg>
  );
}

function TooltipPills({
  tooltips,
  nodeMap,
}: {
  tooltips: DiagramTooltip[];
  nodeMap: Record<string, DiagramNode>;
}) {
  return (
    <AnimatePresence>
      {tooltips.map((t, i) => {
        const n = nodeMap[t.nodeId];
        if (!n) return null;
        const tx = n.x + (t.dx ?? DEFAULT_TIP_DX);
        const ty = n.y + (t.dy ?? DEFAULT_TIP_DY);
        return (
          <motion.div
            key={`${t.nodeId}-${i}`}
            className="fae-tip"
            style={{ left: tx, top: ty }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {t.text}
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}

/* =======================================================================
 * Tile
 * ===================================================================== */

function Tile({
  node,
  isActive,
  reduced,
}: {
  node: DiagramNode;
  isActive: boolean;
  reduced: boolean | null;
}) {
  const variant = node.variant ?? "tile";
  const size = TILE_SIZE[variant] ?? 76;
  const tone = TONE[node.tone ?? "amber"];
  const isGhost = !!node.ghost;
  const isBadge = variant === "badge";

  const baseShadow =
    "inset 0 1px 0 rgba(255,255,255,0.04), 0 6px 16px rgba(0,0,0,0.45)";
  const glowShadow = `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px ${tone.color}, 0 0 22px ${tone.soft}, 0 0 46px ${tone.soft}`;

  // Badge (6×) tile pulses when active; others just lift slightly.
  const scaleAnim = isGhost
    ? 1
    : isBadge && isActive && !reduced
    ? [1.04, 1.12, 1.04]
    : isActive && !reduced
    ? 1.06
    : 1;

  const tileTransition =
    isBadge && isActive && !reduced
      ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" as const }
      : { duration: reduced ? 0 : 0.25 };

  return (
    <div
      className="fae-tile-pos"
      style={{ left: node.x, top: node.y, width: size, height: size }}
    >
      <motion.div
        className={`fae-tile${variant === "engine" ? " fae-tile--engine" : ""}${
          isBadge ? " fae-tile--badge" : ""
        }${isActive ? " is-active" : ""}`}
        initial={false}
        animate={{
          opacity: isGhost ? 0.3 : isActive ? 1 : 0.5,
          borderColor: isActive ? tone.color : LINE,
          color: isGhost ? INK_FAINT : isActive ? tone.color : INK_DIM,
          boxShadow: isActive ? glowShadow : baseShadow,
          scale: scaleAnim,
        }}
        transition={tileTransition}
      >
        {variant === "scan" ? (
          <span className="fae-scan-track">
            <motion.span
              className="fae-scan-fill"
              initial={false}
              animate={
                isActive && !reduced ? { width: ["0%", "100%"] } : { width: "45%" }
              }
              transition={
                isActive && !reduced
                  ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.25 }
              }
            />
          </span>
        ) : (
          <span className="fae-tile-icon" aria-hidden="true">
            {iconFor(node.icon)}
          </span>
        )}

        {node.badge && (
          <span className="fae-badge" aria-hidden="true">
            {iconFor(node.badge)}
          </span>
        )}

        <span className="fae-tile-label">{node.label}</span>
      </motion.div>
    </div>
  );
}

/* =======================================================================
 * Main component
 * ===================================================================== */

export default function FeatureArchitectureExplorer({
  title,
  subtitle,
  steps,
  nodes,
  connectors,
  ctaLabel,
  ctaHref,
  reverse = false,
}: FeatureArchitectureExplorerProps) {
  const reduced = useReducedMotion();
  const [activeStepId, setActiveStepId] = useState<string>(steps[0]?.id ?? "");
  const [hoveredStepId, setHoveredStepId] = useState<string | null>(null);
  const { wrapRef, scale } = useStageScale();

  const nodeMap = useMemo(() => {
    const m: Record<string, DiagramNode> = {};
    for (const n of nodes) m[n.id] = n;
    return m;
  }, [nodes]);

  const displayedId = hoveredStepId ?? activeStepId;
  const step = steps.find((s) => s.id === displayedId) ?? steps[0];

  const activeNodeIds = useMemo(
    () => new Set(step?.activeNodeIds ?? []),
    [step]
  );
  const activeConnectorIds = useMemo(
    () => new Set(step?.activeConnectorIds ?? []),
    [step]
  );

  return (
    <motion.div
      className={`fae-row${reverse ? " fae-row--reverse" : ""}`}
      initial={{ opacity: 0, y: reduced ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: reduced ? 0 : 0.5, ease: "easeOut" }}
    >
      <div className="fae-list-col">
        <h3 className="fae-title">{title}</h3>
        {subtitle && <p className="fae-subtitle">{subtitle}</p>}
        <StepList
          steps={steps}
          activeStepId={activeStepId}
          hoveredStepId={hoveredStepId}
          onSelect={setActiveStepId}
          onHover={setHoveredStepId}
          onLeave={() => setHoveredStepId(null)}
          ctaLabel={ctaLabel}
          ctaHref={ctaHref}
        />
      </div>

      <div className="fae-diagram-col">
        <div 
          className="fae-canvas" 
          ref={wrapRef}
          style={{ maxWidth: scale < 1.15 ? `${CANVAS_W * scale}px` : undefined }}
        >
          <div className="fae-stage" style={{ transform: `scale(${scale})` }}>
            <div className="fae-grid" />

            <ClusterLayer clusters={step?.clusters ?? []} />
            <ConnectorLayer
              connectors={connectors}
              nodeMap={nodeMap}
              activeConnectorIds={activeConnectorIds}
            />

            {nodes.map((node) => (
              <Tile
                key={node.id}
                node={node}
                isActive={activeNodeIds.has(node.id)}
                reduced={reduced}
              />
            ))}

            <TooltipStems
              tooltips={step?.tooltips ?? []}
              nodeMap={nodeMap}
            />
            <TooltipPills
              tooltips={step?.tooltips ?? []}
              nodeMap={nodeMap}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
