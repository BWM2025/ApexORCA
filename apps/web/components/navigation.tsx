"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/logo";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/how-apexorca-works", label: "How ApexORCA Works" },
  { href: "/playbook", label: "Playbook" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/dashboard", label: "Live Dashboard" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass =
    "text-[#A1AAB8] hover:text-white transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3 py-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]";

  return (
    <nav className="border-b border-zinc-800 bg-[#050A0F] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <Logo />
        {/* Desktop links */}
        <div className="hidden sm:flex gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              prefetch={true}
              className={linkClass}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="sm:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-[#A1AAB8] hover:text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-zinc-800 bg-[#050A0F] px-4 py-3">
          <div className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                prefetch={true}
                className={`${linkClass} justify-start w-full text-left py-3 ${
                  pathname === href ? "text-white font-medium" : ""
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
