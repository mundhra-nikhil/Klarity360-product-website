import { PRODUCT_NAME } from '@/lib/constants';

export interface Chapter {
  timestamp: number;
  title: string;
  description: string;
}

/** Chapter markers for the demo video */
export const chapters: Chapter[] = [
  {
    timestamp: 0,
    title: "Web User Interface",
    description:
      "Intuitive process configuration, comprehensive dashboards, tracking KPIs, and on-demand reporting access.",
  },
  {
    timestamp: 10,
    title: "Validation & Reconciliation",
    description:
      "Perform deterministic schema validation, row-level data comparison, and business-rule tolerance validation entirely within your environment.",
  },
  {
    timestamp: 20,
    title: "AI Integration Layer",
    description: "Sends metadata and natural-language rules to suggest mappings and generate SQL, without ever transmitting row-level business data.",
  },
  {
    timestamp: 28,
    title: "Data Sources & Connectors",
    description:
      "Secure, outbound-only connectivity to Oracle databases, Microsoft Fabric, and Excel/CSV files directly from your environment.",
  },
];
