"use client";

import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-500 text-sm">
            © {currentYear} Azamat Satullaev. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="#about"
              className="text-zinc-500 hover:text-[#ff7a1a] text-sm transition-colors"
            >
              About
            </Link>
            <Link
              href="#research"
              className="text-zinc-500 hover:text-[#ff7a1a] text-sm transition-colors"
            >
              Research
            </Link>
            <Link
              href="#contact"
              className="text-zinc-500 hover:text-[#ff7a1a] text-sm transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <p className="mt-6 text-center text-zinc-600 text-xs">
          Hospitality & Management Research · Blending strategy, analytics, and technology
        </p>
      </div>
    </footer>
  );
}
