import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WebGLContextMonitor from "./components/ui/WebGLContextMonitor";
import WebGLStatusAlert from "./components/ui/WebGLStatusAlert";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Future of Blockchain - Research Initiative",
  description: "Evidence-based research examining the future of blockchain architecture, network evolution, and enterprise adoption patterns.",
  keywords: "future of blockchain, blockchain research, architecture analysis, network evolution, enterprise adoption, bitcoin, ethereum, consensus mechanisms",
  authors: [{ name: "Future of Blockchain Research Team" }],
  openGraph: {
    title: "Future of Blockchain",
    description: "Research initiative exploring the future of blockchain architecture and network evolution",
    type: "website",
    url: "https://futureofblockchain.website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 text-gray-900`}
      >
        <WebGLContextMonitor />
        <WebGLStatusAlert />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
