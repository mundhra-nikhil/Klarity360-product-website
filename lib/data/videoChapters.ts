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
    title: "Connect to Data Source",
    description:
      "Connect an existing data source or bring a new connection to life inside of ${PRODUCT_NAME}'s context window within seconds.",
  },
  {
    timestamp: 10,
    title: "Knowledge Guide",
    description:
      "Visualize how tables and columns connect as lineages and schemas. ${PRODUCT_NAME} uses these graphs to plan and resolve queries and reduce ambiguity.",
  },
  {
    timestamp: 20,
    title: "Telemetry Insights",
    description: "Track system health and query patterns across your workspace.",
  },
  {
    timestamp: 28,
    title: "Ask ${PRODUCT_NAME} Directly",
    description:
      "Chat with ${PRODUCT_NAME} to build comprehensive reports and get answers to urgent questions in natural language. ${PRODUCT_NAME} brings together a unique and powerful system to build the right graphs, summaries and analysis for you.",
  },
];

