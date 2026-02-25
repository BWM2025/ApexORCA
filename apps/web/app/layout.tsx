import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ApexORCA.io — Apex Intelligence for Your AI Agents",
  description: "The superior FelixCraft.ai blueprint with real ORCA Governance DNA from real orca research. Real pods. Real reliability. Real agency.",
  keywords: ["ORCA Governance", "AI Agents", "OpenClaw", "FelixCraft", "AI CEO", "ORCA DNA"],
  authors: [{ name: "B.W. Moore" }],
  openGraph: {
    title: "ApexORCA.io — Apex Intelligence for Your AI Agents",
    description: "The superior FelixCraft.ai blueprint with real ORCA Governance DNA.",
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
