import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { marked } from "marked";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/sections/Footer";
import ExploreSectorsCarousel from "@/components/sections/ExploreSectorsCarousel";
import { PRODUCT_NAME, BASE_PATH } from '@/lib/constants';


// Set up Google Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const VALID_SLUGS = [
  "automotive",
  "banking",
  "healthcare",
  "insurance",
  "logistics",
  "manufacturing",
  "pharma",
  "retail",
];


const getSectorImage = (slug: string): string => {
  const extensions: Record<string, string> = {
    automotive: "avif",
    banking: "jpg",
    healthcare: "avif",
    insurance: "jpg",
    logistics: "jpg",
    manufacturing: "jpg",
    pharma: "jpg",
    retail: "jpg",
  };
  return `${BASE_PATH}/industries/${slug}.${extensions[slug] || "jpg"}`;
};

interface SolutionsItem {
  title: string;
  description: string;
}

interface SectorInfo {
  slug: string;
  title: string;
  description: string;
  image: string;
  sectorName: string;
}

interface ParsedSectorData {
  title: string;
  description: string;
  heroImage: string;
  sectorName: string;
  overview: string;
  whatWeDoItems: string[];
  keyOutcomesItems: string[];
  solutionsItems: SolutionsItem[];
  ctaTitle: string;
  ctaText: string;
}

function getSectorData(slug: string): ParsedSectorData {
  const filePath = path.join(
    process.cwd(),
    "lib",
    "data",
    "docs",
    "content",
    `${slug}.md`
  );
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Extract H1 header for sectorName
  const matchH1 = content.match(/^#\s+(.*)$/m);
  const sectorName = matchH1 ? matchH1[1].trim() : data.title || slug;

  // Split content by "## " headings
  const parts = content.split(/\n##\s+/);
  const sections: Record<string, string> = {};

  let ctaTitle = "";
  let ctaText = "";

  parts.forEach((part, index) => {
    if (index === 0) return; // skip introduction containing H1

    const lines = part.split("\n");
    const heading = lines[0].trim();
    const body = lines.slice(1).join("\n").trim();

    // Map CTA section title and content dynamically
    if (heading.toLowerCase().startsWith("ready to transform")) {
      ctaTitle = heading;
      ctaText = body;
    } else {
      sections[heading] = body;
    }
  });

  const overview = sections["Overview"] || "";

  const whatWeDoText = sections["What We Do"] || "";
  const whatWeDoItems = whatWeDoText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) => line.replace(/^-\s+/, ""));

  const keyOutcomesText = sections["Key Outcomes"] || "";
  const keyOutcomesItems = keyOutcomesText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) => line.replace(/^-\s+/, ""));

  const solutionsText = sections["Solutions We Offer"] || "";
  const solutionsItems: SolutionsItem[] = solutionsText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-"))
    .map((line) => {
      const cleaned = line.replace(/^-\s+/, "");
      // Regex parsing for **Title** - Description format
      const match = cleaned.match(/^\*\*(.*?)\*\*\s*-\s*(.*)$/);
      if (match) {
        return {
          title: match[1],
          description: match[2],
        };
      }
      const dashIndex = cleaned.indexOf(" - ");
      if (dashIndex !== -1) {
        return {
          title: cleaned.slice(0, dashIndex).replace(/\*\*/g, "").trim(),
          description: cleaned.slice(dashIndex + 3).trim(),
        };
      }
      return {
        title: cleaned.replace(/\*\*/g, ""),
        description: "",
      };
    });

  return {
    title: data.title || "",
    description: data.description || "",
    heroImage: data.heroImage || "",
    sectorName,
    overview,
    whatWeDoItems,
    keyOutcomesItems,
    solutionsItems,
    ctaTitle: ctaTitle || `Ready to transform your ${sectorName} operations?`,
    ctaText:
      ctaText ||
      `Talk to our experts to learn how we can help modernize your ${sectorName.toLowerCase()} operations with AI.`,
  };
}

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) {
    return { title: "Page Not Found" };
  }

  const data = getSectorData(slug);
  return {
    title: `${data.title} | ${PRODUCT_NAME} Solutions`,
    description: data.description,
  };
}

export default async function SectorPage({ params }: PageProps) {
  const { slug } = await params;

  if (!VALID_SLUGS.includes(slug)) {
    notFound();
  }

  const data = getSectorData(slug);

  // Load data for all 8 sectors to feed the "Explore Other Sectors" carousel
  const sectorsData: SectorInfo[] = VALID_SLUGS.map((s) => {
    const filePath = path.join(
      process.cwd(),
      "lib",
      "data",
      "docs",
      "content",
      `${s}.md`
    );
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter, content: rawBody } = matter(fileContent);

    const matchH1 = rawBody.match(/^#\s+(.*)$/m);
    const sectorName = matchH1 ? matchH1[1].trim() : frontmatter.title || s;

    return {
      slug: s,
      title: frontmatter.title || "",
      description: frontmatter.description || "",
      image: getSectorImage(s),
      sectorName,
    };
  });

  // Filter out the current sector to pass exactly 7 sectors to the carousel
  const otherSectors = sectorsData.filter((s) => s.slug !== slug);

  // Parse HTML structures inside server component
  const parsedOverviewHtml = await marked.parse(data.overview);

  return (
    <div
      className={`${playfair.variable} ${inter.variable} font-sans min-h-screen bg-[#F7F6F2] text-[#1c1917] flex flex-col selection:bg-slate-900/10`}
    >
      {/* Dark navigation wrapper to fit white header menu */}
      <div className="docs-nav-wrapper sticky top-0 h-[68px] z-50 bg-[#0A0A0A] border-b border-slate-900 transition-colors duration-200">
        <Nav />
      </div>

      <main className="flex-1 w-full flex flex-col">
        {/* Top Breadcrumb & Hero Viewport Container */}
        <section className="w-full max-w-[1100px] mx-auto px-6 pt-12 pb-16 md:py-20 flex flex-col justify-between min-h-[calc(100vh-200px)]">
          {/* Top Breadcrumb */}
          <div className="text-xs uppercase tracking-widest text-[#78716c] font-semibold mb-8 md:mb-12">
            Sectors We Serve / {data.sectorName}
          </div>

          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center flex-1">
            {/* Left Side Column */}
            <div className="md:col-span-7 flex flex-col items-start text-left">
              <h1 className="font-serif text-[42px] md:text-[56px] leading-[1.1] font-bold text-[#1c1917] tracking-tight mb-6">
                {data.title}
              </h1>
              <p className="text-[#44403c] text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
                {data.description}
              </p>
              <a
                href="#"
                className="inline-flex items-center text-sm font-semibold tracking-wide text-white bg-[#1c1917] hover:bg-[#332f2b] transition-colors duration-150 px-6 py-3 rounded-md"
              >
                Talk to our experts &rarr;
              </a>
            </div>

            {/* Right Side Column (Rounded card aspect 4:3, max 45% viewport width) */}
            <div className="md:col-span-5 flex justify-center md:justify-end w-full">
              <div className="w-full max-w-[450px] aspect-[4/3] rounded-2xl overflow-hidden bg-[#1c1917] relative border border-slate-800/10 shadow-sm">
                <Image
                  src={getSectorImage(slug)}
                  alt={`${data.sectorName} image`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Key Highlights Strip (Light background, inline Outcome Metrics) */}
        <section className="w-full bg-[#EFEFEA] border-y border-[#e7e5e4] py-8">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 divide-y md:divide-y-0 md:divide-x divide-[#d6d3d1]">
              {data.keyOutcomesItems.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 text-[#1c1917] text-[15px] font-medium leading-relaxed md:px-8 py-3 md:py-0 first:pl-0 last:pr-0"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="w-full py-20 border-b border-[#e7e5e4]">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="font-serif text-[28px] font-bold text-[#1c1917] mb-6">
              Overview
            </h2>
            <div
              className="max-w-[65ch] text-[#44403c] text-[16px] leading-[1.75] space-y-4"
              dangerouslySetInnerHTML={{ __html: parsedOverviewHtml }}
            />
          </div>
        </section>

        {/* What We Do Section */}
        <section className="w-full py-20 border-b border-[#e7e5e4]">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="font-serif text-[28px] font-bold text-[#1c1917] mb-8">
              What We Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              {data.whatWeDoItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-[#1c1917] mt-1.5 flex-shrink-0">
                    {/* Small arrow icon */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <div
                    className="text-[#44403c] text-[16px] leading-[1.75]"
                    dangerouslySetInnerHTML={{
                      __html: marked.parseInline(item),
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions We Offer Section */}
        <section className="w-full py-20 border-b border-[#e7e5e4]">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="font-serif text-[28px] font-bold text-[#1c1917] mb-8">
              Solutions We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.solutionsItems.map((sol, index) => (
                <div
                  key={index}
                  className="border border-[#e7e5e4] p-8 rounded-xl flex flex-col justify-between hover:border-slate-400 transition-colors duration-200"
                >
                  <div>
                    <h3 className="font-bold text-[#1c1917] text-lg mb-3">
                      {sol.title}
                    </h3>
                    <p className="text-[#78716c] text-sm leading-relaxed">
                      {sol.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Other Sectors Carousel */}
        <ExploreSectorsCarousel sectors={otherSectors} />

        {/* CTA Footer Bar */}
        <section className="w-full bg-[#0A0A0A] text-white py-16">
          <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-2xl text-left">
              <h2 className="font-serif text-[28px] md:text-[32px] font-bold mb-4 leading-tight text-white">
                Ready to transform your {data.sectorName} operations?
              </h2>
              <p className="text-[#a8a29e] text-[16px] leading-relaxed">
                {data.ctaText}
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="#"
                className="inline-flex items-center text-sm font-semibold tracking-wide text-[#1c1917] bg-white hover:bg-slate-100 transition-colors duration-150 px-6 py-3 rounded-md whitespace-nowrap"
              >
                Talk to our experts &rarr;
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
