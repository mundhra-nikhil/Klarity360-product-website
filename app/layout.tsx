import type { Metadata } from "next";
import { IBM_Plex_Sans, Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { PRODUCT_NAME } from '@/lib/constants';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter", /* map variable name so base.css doesn't break */
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} - Insight Agent`,
  description:
    `${PRODUCT_NAME} puts the full power of your data in every leader's hands, instantly.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" as="video" href="/full-bg-video.mp4" type="video/mp4" fetchPriority="high" />
      </head>
      <body suppressHydrationWarning className={`${ibmPlexSans.variable} ${spaceGrotesk.variable} ${poppins.variable} elementor-kit-6 elementor-115036`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
