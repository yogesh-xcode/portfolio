import type { Metadata } from "next";
import { DM_Mono, Outfit, Playfair_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Yogesh · Software Engineer",
  description:
    "Portfolio of Yogesh, a full-stack software engineer focused on Laravel, Node.js, and ERP/workflow systems.",
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
      </body>
    </html>
  );
}
