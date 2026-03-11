import type { Metadata } from "next";
import { DM_Mono, Outfit, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const siteUrl = "https://yogeshbuilds.in";
const siteName = "Yogesh Builds";
const description =
  "Portfolio of Yogesh, a full-stack software engineer in Chennai focused on Laravel, Node.js, and ERP/workflow systems.";

export const metadata: Metadata = {
  title: "Yogesh · Software Engineer",
  description,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Yogesh",
    "Yogesh Builds",
    "Software Engineer",
    "Full Stack Developer",
    "Laravel Developer",
    "Node.js Developer",
    "Next.js Developer",
    "Chennai",
    "ERP Development",
    "Workflow Systems",
    "API Development",
  ],
  authors: [{ name: "Yogesh" }],
  creator: "Yogesh",
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Yogesh · Software Engineer",
    description,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/image.svg",
        width: 366,
        height: 386,
        alt: "Yogesh Builds logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yogesh · Software Engineer",
    description,
    images: ["/image.svg"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/image.svg",
    shortcut: "/image.svg",
    apple: "/image.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${outfit.variable} ${dmMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
