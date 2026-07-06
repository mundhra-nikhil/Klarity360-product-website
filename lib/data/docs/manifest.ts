import { PRODUCT_NAME } from '@/lib/constants';

export type DocCategoryColor = "blue" | "purple" | "emerald";

export interface DocArticle {
  slug: string;
  title: string;
  sidebarTitle: string;
  description: string;
  wide?: boolean;
}

export interface DocCategory {
  id: string;
  title: string;
  sidebarTitle: string;
  color: DocCategoryColor;
  articles: DocArticle[];
}

export const docCategories: DocCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    sidebarTitle: "Getting Started",
    color: "blue",
    articles: [
      {
        slug: "enablement-guide",
        sidebarTitle: "Enablement Guide",
        title: `${PRODUCT_NAME} Enablement Guide`,
        description:
          "Pre-requisite guide outlining the Workload Setup required for Guest Tenants before enabling ${PRODUCT_NAME}.",
      },
      {
        slug: "trial-experience",
        sidebarTitle: "Trial Experience",
        title: "Trial Experience Document",
        description:
          "Comprehensive Trial Experience Guide demonstrating the initial setup and expected flows during the trial period.",
      },
      {
        slug: "workload-enablement",
        sidebarTitle: "Workload Enablement",
        title: "Workload Enablement",
        description:
          "Technical specifications and steps required for configuring workload enablement across environments.",
      },
      {
        slug: "user-guide",
        sidebarTitle: "User Guide",
        title: "Product Docs - User Guide",
        description:
          "A comprehensive user guide outlining the complete lifecycle from trial access to full product adoption.",
      },
      {
        slug: "karl-userguide-connectorsetupdoc",
        sidebarTitle: "User Guide & Connector Setup",
        title: `${PRODUCT_NAME} User Guide & Connector Setup`,
        description:
          "Detailed guide on the ${PRODUCT_NAME} User Guide and configuring connector setups for your workloads.",
      },
    ],
  },
  {
    id: "product-info",
    title: "Product Information",
    sidebarTitle: "Product Info",
    color: "purple",
    articles: [
      {
        slug: "whitepaper",
        sidebarTitle: "The Insight Agent",
        title: "The Insight Agent",
        description:
          "Deep dive whitepaper exploring the architecture, capabilities, and benefits of ${PRODUCT_NAME} as an Insight Agent.",
      },
      {
        slug: "vs-fabric",
        sidebarTitle: `${PRODUCT_NAME} vs Fabric`,
        title: `${PRODUCT_NAME} vs Fabric Data Agent`,
        description:
          "A detailed comparison between ${PRODUCT_NAME} and the Microsoft Fabric Data Agent, highlighting key differentiators.",
      },
      {
        slug: "purchasing-flow",
        sidebarTitle: "Purchasing Flow",
        title: "SaaS Purchasing Flow",
        description:
          "Documentation explaining the SaaS purchasing workflow, onboarding steps, and provisioning for ${PRODUCT_NAME}.",
      },
      {
        slug: "pricing",
        sidebarTitle: "Pricing",
        title: `${PRODUCT_NAME} Pricing`,
        description:
          "Details on Pricing and Credits for ${PRODUCT_NAME} usage, including tier breakdowns and billing models.",
      },
    ],
  },
  {
    id: "security-compliance",
    title: "Security & Compliance",
    sidebarTitle: "Security & Compliance",
    color: "emerald",
    articles: [
      {
        slug: "security-document",
        sidebarTitle: "Security Overview",
        title: `${PRODUCT_NAME} Security Document`,
        description:
          "Comprehensive Security Document outlining compliance, infrastructure security, and data protection policies.",
      },
      {
        slug: "fabric-plan",
        sidebarTitle: "Fabric Plan",
        title: "Fabric Plan Documentation",
        description:
          "Technical documentation covering the integration, deployment, and security of the Fabric Plan within ${PRODUCT_NAME}.",
      },
      {
        slug: "api-permissions",
        sidebarTitle: "API Permissions",
        title: "API Permissions",
        description:
          "Detailed security justification and data governance rules regarding API access and permission structures.",
        wide: true,
      },
    ],
  },
];

export const docSlugs = docCategories.flatMap((category) =>
  category.articles.map((article) => article.slug)
);

export function getDocArticle(slug: string): DocArticle | undefined {
  for (const category of docCategories) {
    const article = category.articles.find((entry) => entry.slug === slug);
    if (article) return article;
  }
  return undefined;
}

export const categoryColorStyles: Record<
  DocCategoryColor,
  {
    dot: string;
    hover: string;
    iconBg: string;
    iconBorder: string;
    iconText: string;
    cardFrom: string;
    cardTo: string;
    cardShadow: string;
    cardGlow: string;
    cardGlowHover: string;
    cardTitleHover: string;
    tocActive: string;
    tocShadow: string;
    cardBorderHover: string;
  }
> = {
  blue: {
    dot: "bg-cat-blue",
    hover: "hover:text-cat-blue",
    iconBg: "bg-cat-blue/10",
    iconBorder: "border-cat-blue/20",
    iconText: "text-cat-blue",
    cardFrom: "hover:from-cat-blue/10",
    cardTo: "hover:to-cat-blue/5",
    cardShadow: "hover:shadow-[0_8px_32px_-10px_var(--shadow-blue)]",
    cardGlow: "bg-cat-blue/5",
    cardGlowHover: "group-hover:bg-cat-blue/10",
    cardTitleHover: "group-hover:text-cat-blue",
    tocActive: "text-cat-blue",
    tocShadow: "bg-cat-blue shadow-[0_0_8px_var(--toc-shadow-blue)]",
    cardBorderHover: "hover:border-cat-blue",
  },
  purple: {
    dot: "bg-cat-purple",
    hover: "hover:text-cat-purple",
    iconBg: "bg-cat-purple/10",
    iconBorder: "border-cat-purple/20",
    iconText: "text-cat-purple",
    cardFrom: "hover:from-cat-purple/10",
    cardTo: "hover:to-cat-purple/5",
    cardShadow: "hover:shadow-[0_8px_32px_-10px_var(--shadow-purple)]",
    cardGlow: "bg-cat-purple/5",
    cardGlowHover: "group-hover:bg-cat-purple/10",
    cardTitleHover: "group-hover:text-cat-purple",
    tocActive: "text-cat-purple",
    tocShadow: "bg-cat-purple shadow-[0_0_8px_var(--toc-shadow-purple)]",
    cardBorderHover: "hover:border-cat-purple",
  },
  emerald: {
    dot: "bg-cat-emerald",
    hover: "hover:text-cat-emerald",
    iconBg: "bg-cat-emerald/10",
    iconBorder: "border-cat-emerald/20",
    iconText: "text-cat-emerald",
    cardFrom: "hover:from-cat-emerald/10",
    cardTo: "hover:to-cat-emerald/5",
    cardShadow: "hover:shadow-[0_8px_32px_-10px_var(--shadow-emerald)]",
    cardGlow: "bg-cat-emerald/5",
    cardGlowHover: "group-hover:bg-cat-emerald/10",
    cardTitleHover: "group-hover:text-cat-emerald",
    tocActive: "text-cat-emerald",
    tocShadow: "bg-cat-emerald shadow-[0_0_8px_var(--toc-shadow-emerald)]",
    cardBorderHover: "hover:border-cat-emerald",
  },
};
