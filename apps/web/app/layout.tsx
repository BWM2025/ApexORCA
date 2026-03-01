import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-playfair" });

const baseUrl = process.env.NEXT_PUBLIC_URL || "https://apexorca.io";

export const viewport = { width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "ApexORCA.io — Apex Intelligence for Your AI Agents",
  description: "Real ORCA Governance DNA from real orca research. Real pods. Real reliability. Real agency.",
  keywords: ["ORCA Governance", "AI Agents", "OpenClaw", "AI CEO", "ORCA DNA"],
  authors: [{ name: "B.W. Moore" }],
  openGraph: {
    title: "ApexORCA.io — Apex Intelligence for Your AI Agents",
    description: "Real ORCA Governance DNA. Real pods. Real agency.",
    url: baseUrl,
    siteName: "ApexORCA.io",
    images: [{ url: "/og-image.png" }],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${playfair.variable} min-h-screen bg-[#050A0F] font-sans`}>
        {/* Site-wide orca/lobster video background */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            aria-hidden
          >
            <source src="/hero-orca-lobster.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(#00E5FF_0.8px,transparent_1px)] [background-size:40px_40px] opacity-10" />
        </div>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative z-10 min-h-screen">
            <Navigation />
            <div className="pb-6">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
