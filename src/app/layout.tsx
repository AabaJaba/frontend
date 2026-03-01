import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CineDex — Discover Movies",
  description:
    "The clean, fast film discovery tool. Browse by genre, search any title, and get everything you need to decide what to watch — no account needed.",
  keywords: ["movies", "film", "cinema", "browse", "discover", "genre", "movie database"],
  openGraph: {
    title: "CineDex — Discover Movies",
    description: "Browse by genre, search any title, decide what to watch in under 30 seconds.",
    type: "website",
  },
};

import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
