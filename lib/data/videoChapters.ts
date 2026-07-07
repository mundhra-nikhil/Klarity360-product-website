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
    title: "Dashboard & Process Overview",
    description:
      "Land on the Klarity360 dashboard: live task tracking, status KPIs, approvals, and a notifications feed surfacing reconciliation results as processes complete.",
  },
  {
    timestamp: 4,
    title: "Connecting Data Sources",
    description:
      "Securely connect source and target databases — Oracle, Microsoft Fabric, and Excel/CSV files — using outbound-only connectivity that keeps your environment in control.",
  },
  {
    timestamp: 8,
    title: "Creating a New Process",
    description:
      "Configure a reconciliation process end to end — mappings, validation rules, and tolerances — and watch it initialize and run against your connected sources.",
  },
  {
    timestamp: 49,
    title: "Exporting the Reconciliation Report",
    description:
      "Once the run finishes with zero discrepancies, generate and download the full reconciliation report for review, audit, or sharing with stakeholders.",
  },
];
