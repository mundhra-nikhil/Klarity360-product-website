import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { PRODUCT_NAME } from '@/lib/constants';


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} elementor-kit-6 elementor-115036`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
