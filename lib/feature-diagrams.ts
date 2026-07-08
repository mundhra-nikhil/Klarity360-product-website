/**
 * Feature diagram configs for <FeatureArchitectureExplorer />.
 *
 * Each feature is described declaratively as a set of nodes, connectors and
 * steps. The component resolves `node.icon` (a string key) to a React icon via
 * the registry in FeatureArchitectureExplorer.tsx — this file stays JSX-free.
 *
 * Coordinate space: a fixed 760 × 500 "design canvas". Node `x`/`y` are tile
 * CENTERS in that space; the component scales the whole canvas to fit its
 * container, so these numbers are resolution-independent. Keep centers within
 * roughly [80, 680] × [70, 430] so 76px tiles + tooltip overshoot don't clip.
 */

export type IconTone = "amber" | "green" | "red" | "muted";

export type NodeVariant = "tile" | "scan" | "badge" | "engine";

export interface DiagramNode {
  id: string;
  /** Icon key resolved by the registry in FeatureArchitectureExplorer.tsx. */
  icon: string;
  label: string;
  /** Center X in the 760-wide design canvas. */
  x: number;
  /** Center Y in the 500-tall design canvas. */
  y: number;
  tone?: IconTone;
  variant?: NodeVariant;
  /** Optional small overlay badge icon key (e.g. a key on a table tile). */
  badge?: string;
  /** Always render dim regardless of active state (e.g. a "manual QA" ghost row). */
  ghost?: boolean;
}

export interface DiagramConnector {
  /** Defaults to `${from}__${to}`. */
  id?: string;
  from: string;
  to: string;
  label?: string;
  tone?: IconTone;
  /** Dashed by default; set false for solid. */
  dashed?: boolean;
}

export interface DiagramTooltip {
  nodeId: string;
  text: string;
  /** Pixel offset from the node center in design space. */
  dx?: number;
  dy?: number;
}

export interface DiagramCluster {
  /** Top-left X in design space. */
  x: number;
  /** Top-left Y in design space. */
  y: number;
  w: number;
  h: number;
  label?: string;
  shape?: "rect" | "ellipse";
  tone?: IconTone;
}

export interface ExplorerStep {
  id: string;
  title: string;
  description?: string;
  activeNodeIds: string[];
  activeConnectorIds: string[];
  tooltips?: DiagramTooltip[];
  clusters?: DiagramCluster[];
}

export interface FeatureArchitectureExplorerProps {
  title: string;
  subtitle?: string;
  steps: ExplorerStep[];
  nodes: DiagramNode[];
  connectors: DiagramConnector[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Diagram on the right (default) or left. */
  reverse?: boolean;
}

/** Build the default connector id used by activeConnectorIds references. */
export const connectorId = (from: string, to: string): string => `${from}__${to}`;

/** 1 — Transformation (1→M, M→1). */
const transformation: FeatureArchitectureExplorerProps = {
  title: "Transformation (1→M, M→1)",
  subtitle:
    "One source can fan out to many targets, and many sources can consolidate into one — both validated against your rules.",
  nodes: [
    { id: "engine", icon: "engine", label: "Klarity360", x: 380, y: 220, variant: "engine" },

    // 1 → M path (upper)
    { id: "src_1m", icon: "table", label: "Source table", x: 90, y: 120 },
    { id: "t1", icon: "table", label: "Target", x: 620, y: 50 },
    { id: "t2", icon: "table", label: "Target", x: 695, y: 120 },
    { id: "t3", icon: "table", label: "Target", x: 620, y: 190 },

    // M → 1 path (lower)
    { id: "s1", icon: "table", label: "Source", x: 90, y: 280 },
    { id: "s2", icon: "table", label: "Source", x: 170, y: 340 },
    { id: "s3", icon: "table", label: "Source", x: 90, y: 380 },
    { id: "tgt_m1", icon: "table", label: "Target table", x: 695, y: 340 },
  ],
  connectors: [
    { from: "src_1m", to: "engine" },
    { from: "engine", to: "t1" },
    { from: "engine", to: "t2" },
    { from: "engine", to: "t3" },
    { from: "s1", to: "engine" },
    { from: "s2", to: "engine" },
    { from: "s3", to: "engine" },
    { from: "engine", to: "tgt_m1" },
  ],
  steps: [
    {
      id: "source",
      title: "Source table",
      description: "A single source dataset enters the mapping engine.",
      activeNodeIds: ["src_1m"],
      activeConnectorIds: [connectorId("src_1m", "engine")],
    },
    {
      id: "engine",
      title: "Mapping engine",
      description: "Klarity360 applies your transformation rules.",
      activeNodeIds: ["engine"],
      activeConnectorIds: [
        connectorId("src_1m", "engine"),
        connectorId("s1", "engine"),
        connectorId("s2", "engine"),
        connectorId("s3", "engine"),
      ],
    },
    {
      id: "split",
      title: "Split rule (1→M)",
      description: "One source row fans out to many target rows.",
      activeNodeIds: ["src_1m", "engine", "t1", "t2", "t3"],
      activeConnectorIds: [
        connectorId("src_1m", "engine"),
        connectorId("engine", "t1"),
        connectorId("engine", "t2"),
        connectorId("engine", "t3"),
      ],
      clusters: [{ x: 570, y: 12, w: 160, h: 210, label: "1 → M" }],
      tooltips: [{ nodeId: "t2", text: "1 row → N rows" }],
    },
    {
      id: "merge",
      title: "Merge rule (M→1)",
      description: "Many source rows consolidate into one target row.",
      activeNodeIds: ["s1", "s2", "s3", "engine", "tgt_m1"],
      activeConnectorIds: [
        connectorId("s1", "engine"),
        connectorId("s2", "engine"),
        connectorId("s3", "engine"),
        connectorId("engine", "tgt_m1"),
      ],
      clusters: [{ x: 42, y: 242, w: 165, h: 188, label: "M → 1" }],
      tooltips: [{ nodeId: "s2", text: "N rows → 1" }],
    },
    {
      id: "targets",
      title: "Target tables",
      description: "Validated outputs land in their destination tables.",
      activeNodeIds: ["t1", "t2", "t3", "tgt_m1", "engine"],
      activeConnectorIds: [
        connectorId("engine", "t1"),
        connectorId("engine", "t2"),
        connectorId("engine", "t3"),
        connectorId("engine", "tgt_m1"),
      ],
      clusters: [
        { x: 570, y: 12, w: 160, h: 210, label: "1 → M" },
        { x: 42, y: 242, w: 165, h: 188, label: "M → 1" },
      ],
    },
  ],
  ctaLabel: "See transformation rules",
};

/** 2 — Key-to-Key checks. */
const keyToKey: FeatureArchitectureExplorerProps = {
  title: "Key-to-Key Checks",
  subtitle:
    "Pick the key column on each side and Klarity360 matches rows one-to-one — surfacing both hits and misses.",
  nodes: [
    { id: "src", icon: "table", label: "Source table", x: 165, y: 220, badge: "key" },
    { id: "tgt", icon: "table", label: "Target table", x: 595, y: 220, badge: "key" },
    { id: "engine", icon: "engine", label: "Klarity360", x: 380, y: 220, variant: "engine" },
    { id: "matched", icon: "check", label: "Matched", x: 300, y: 340, tone: "green" },
    { id: "flagged", icon: "flag", label: "Flagged", x: 460, y: 340, tone: "red" },
  ],
  connectors: [
    { from: "src", to: "engine" },
    { from: "tgt", to: "engine" },
    { from: "engine", to: "matched", tone: "green" },
    { from: "engine", to: "flagged", tone: "red" },
  ],
  steps: [
    {
      id: "src-key",
      title: "Source key column",
      description: "The unique identifier on the source side.",
      activeNodeIds: ["src"],
      activeConnectorIds: [connectorId("src", "engine")],
      tooltips: [{ nodeId: "src", text: "key column" }],
    },
    {
      id: "tgt-key",
      title: "Target key column",
      description: "The matching identifier on the target side.",
      activeNodeIds: ["tgt"],
      activeConnectorIds: [connectorId("tgt", "engine")],
      tooltips: [{ nodeId: "tgt", text: "key column" }],
    },
    {
      id: "engine",
      title: "Match engine",
      description: "Rows are paired key-for-key across systems.",
      activeNodeIds: ["engine"],
      activeConnectorIds: [connectorId("src", "engine"), connectorId("tgt", "engine")],
    },
    {
      id: "matched",
      title: "Matched rows",
      description: "Keys present on both sides — a clean match.",
      activeNodeIds: ["matched", "engine"],
      activeConnectorIds: [connectorId("engine", "matched")],
      tooltips: [{ nodeId: "matched", text: "key-for-key match" }],
    },
    {
      id: "flagged",
      title: "Unmatched rows flagged",
      description: "Orphaned or mismatched keys are flagged for review.",
      activeNodeIds: ["flagged", "engine"],
      activeConnectorIds: [connectorId("engine", "flagged")],
      tooltips: [{ nodeId: "flagged", text: "mismatch flagged" }],
    },
  ],
  ctaLabel: "Try it now",
};

/** 3 — Automated post-transformation validation (6× faster). */
const autoValidation: FeatureArchitectureExplorerProps = {
  title: "Automated Post-Transformation Validation",
  subtitle:
    "Validation kicks off the moment transformation finishes — turning days of manual QA into hours.",
  nodes: [
    // Ghost "before" row — always dim.
    { id: "bm1", icon: "table", label: "Manual", x: 120, y: 100, ghost: true },
    { id: "bm2", icon: "table", label: "Manual", x: 300, y: 100, ghost: true },
    { id: "bm3", icon: "table", label: "Manual", x: 480, y: 100, ghost: true },

    // Bright "after" row.
    { id: "am1", icon: "table", label: "Transform", x: 120, y: 240 },
    { id: "am2", icon: "table", label: "Scan", x: 300, y: 240, variant: "scan" },
    { id: "am3", icon: "table", label: "Report", x: 480, y: 240 },
    { id: "sixx", icon: "bolt", label: "6× faster", x: 670, y: 240, variant: "badge", tone: "amber" },
  ],
  connectors: [
    { from: "bm1", to: "bm2", tone: "muted" },
    { from: "bm2", to: "bm3", tone: "muted" },
    { from: "am1", to: "am2" },
    { from: "am2", to: "am3" },
    { from: "am3", to: "sixx" },
  ],
  steps: [
    {
      id: "complete",
      title: "Transformation complete",
      description: "The downstream pipeline signals it's done.",
      activeNodeIds: ["am1"],
      activeConnectorIds: [connectorId("am1", "am2")],
    },
    {
      id: "trigger",
      title: "Auto-validation triggers",
      description: "Klarity360 starts validation with no manual handoff.",
      activeNodeIds: ["am1", "am2"],
      activeConnectorIds: [connectorId("am1", "am2"), connectorId("am2", "am3")],
    },
    {
      id: "scan",
      title: "Row-level scan runs",
      description: "Every row is checked against the target in parallel.",
      activeNodeIds: ["am2"],
      activeConnectorIds: [connectorId("am2", "am3")],
      tooltips: [{ nodeId: "am2", text: "scanning rows…" }],
    },
    {
      id: "report",
      title: "Report generated",
      description: "Results are packaged into a shareable report.",
      activeNodeIds: ["am3"],
      activeConnectorIds: [connectorId("am3", "sixx")],
    },
    {
      id: "faster",
      title: "6× faster than manual",
      description: "What took days now takes hours.",
      activeNodeIds: ["am1", "am2", "am3", "sixx"],
      activeConnectorIds: [
        connectorId("am1", "am2"),
        connectorId("am2", "am3"),
        connectorId("am3", "sixx"),
      ],
      clusters: [
        { x: 82, y: 62, w: 436, h: 76, label: "Manual QA — days", tone: "muted" },
        { x: 78, y: 198, w: 615, h: 90, label: "Klarity360 — hours" },
      ],
      tooltips: [{ nodeId: "sixx", text: "~6× faster" }],
    },
  ],
  ctaLabel: "See it run",
};

/** 4 — Porting / JDBC-compatible datasets. */
const jdbc: FeatureArchitectureExplorerProps = {
  title: "Connects to Every JDBC-Compatible Dataset",
  subtitle:
    "Oracle, Snowflake, Fabric, Postgres — anything that speaks JDBC plugs straight into Klarity360.",
  nodes: [
    { id: "engine", icon: "engine", label: "Klarity360", x: 380, y: 220, variant: "engine" },
    { id: "oracle", icon: "oracle", label: "Oracle", x: 380, y: 65 },
    { id: "snowflake", icon: "snowflake", label: "Snowflake", x: 625, y: 220 },
    { id: "fabric", icon: "fabric", label: "Microsoft Fabric", x: 380, y: 375 },
    { id: "postgres", icon: "postgres", label: "PostgreSQL", x: 135, y: 220 },
  ],
  connectors: [
    { from: "oracle", to: "engine" },
    { from: "snowflake", to: "engine" },
    { from: "fabric", to: "engine" },
    { from: "postgres", to: "engine" },
  ],
  steps: [
    {
      id: "oracle",
      title: "Oracle",
      description: "Live Oracle sources via the JDBC driver.",
      activeNodeIds: ["oracle"],
      activeConnectorIds: [connectorId("oracle", "engine")],
    },
    {
      id: "snowflake",
      title: "Snowflake",
      description: "Cloud warehouse, same driver layer.",
      activeNodeIds: ["snowflake"],
      activeConnectorIds: [connectorId("snowflake", "engine")],
    },
    {
      id: "fabric",
      title: "Microsoft Fabric",
      description: "Microsoft's analytics platform.",
      activeNodeIds: ["fabric"],
      activeConnectorIds: [connectorId("fabric", "engine")],
    },
    {
      id: "postgres",
      title: "PostgreSQL",
      description: "Open-source databases included.",
      activeNodeIds: ["postgres"],
      activeConnectorIds: [connectorId("postgres", "engine")],
    },
    {
      id: "jdbc",
      title: "JDBC driver layer",
      description: "One common protocol — every source passes through it.",
      activeNodeIds: ["engine"],
      activeConnectorIds: [
        connectorId("oracle", "engine"),
        connectorId("snowflake", "engine"),
        connectorId("fabric", "engine"),
        connectorId("postgres", "engine"),
      ],
      clusters: [{ x: 232, y: 102, w: 296, h: 296, shape: "ellipse", label: "JDBC" }],
    },
    {
      id: "engine",
      title: "Klarity360 engine",
      description: "All spokes converge on the validation engine.",
      activeNodeIds: ["engine"],
      activeConnectorIds: [
        connectorId("oracle", "engine"),
        connectorId("snowflake", "engine"),
        connectorId("fabric", "engine"),
        connectorId("postgres", "engine"),
      ],
      clusters: [{ x: 232, y: 102, w: 296, h: 296, shape: "ellipse", label: "JDBC" }],
    },
  ],
  ctaLabel: "Try it now",
};

/** 5 — ETL file compatible (Informatica, Alteryx). */
const etl: FeatureArchitectureExplorerProps = {
  title: "ETL File Compatible",
  subtitle:
    "Bring outputs from Informatica and Alteryx straight in — no re-platforming required.",
  nodes: [
    { id: "informatica", icon: "informatica", label: "Informatica", x: 150, y: 130 },
    { id: "alteryx", icon: "alteryx", label: "Alteryx", x: 150, y: 310 },
    { id: "import", icon: "import", label: "Import layer", x: 380, y: 220 },
    { id: "engine", icon: "engine", label: "Klarity360", x: 630, y: 220, variant: "engine" },
  ],
  connectors: [
    { from: "informatica", to: "import" },
    { from: "alteryx", to: "import" },
    { from: "import", to: "engine" },
  ],
  steps: [
    {
      id: "informatica",
      title: "Informatica pipeline",
      description: "Consume Informatica pipeline outputs directly.",
      activeNodeIds: ["informatica"],
      activeConnectorIds: [connectorId("informatica", "import")],
    },
    {
      id: "alteryx",
      title: "Alteryx workflow",
      description: "Drop in Alteryx workflow results.",
      activeNodeIds: ["alteryx"],
      activeConnectorIds: [connectorId("alteryx", "import")],
    },
    {
      id: "import",
      title: "File / API import",
      description: "A shared import layer normalises every source.",
      activeNodeIds: ["import"],
      activeConnectorIds: [
        connectorId("informatica", "import"),
        connectorId("alteryx", "import"),
        connectorId("import", "engine"),
      ],
      tooltips: [{ nodeId: "import", text: "ETL file / API" }],
    },
    {
      id: "engine",
      title: "Klarity360 engine",
      description: "Validated against target — end to end.",
      activeNodeIds: ["engine", "import"],
      activeConnectorIds: [connectorId("import", "engine")],
    },
  ],
  ctaLabel: "Try it now",
};

export const featureDiagrams: FeatureArchitectureExplorerProps[] = [
  { ...transformation },
  { ...keyToKey, reverse: true },
  { ...autoValidation },
  { ...jdbc, reverse: true },
  { ...etl },
];
