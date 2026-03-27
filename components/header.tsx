"use client";
import { useState } from "react";
import Link from "next/link";
import Search from "@/app/ui/search";
import { Button } from "@/components/ui/Button";
import { Search as SearchIcon, Menu, X } from "lucide-react";
import { useSearch } from "@/app/ui/interface/search-context";
import { Logo } from "@/components/logo";
import { siteConfig } from "@/config/site";
export default function Header() {
  const {
    sidebarOpen,
    setSidebarOpen,
    setSearchQuery,
    searchQuery,
    setSelectedTag,
  } = useSearch();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Ensure clicking the logo or Home link always takes user to a clean homepage
  const handleGoHome = () => {
    setSearchQuery("");
    setSelectedTag(null);
    setSidebarOpen(false);
    setIsMobileSearchOpen(false);
  };
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/80 border-b border-slate-200/80 supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden p-2 -ml-2 hover:bg-slate-100 rounded-md text-slate-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <Link
            href="/"
            onClick={handleGoHome}
            className="flex items-center gap-2 group"
          >
            <Logo />
          </Link>
        </div>
        {/* Center: Search Bar (Desktop) */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <Search
              placeholder="Search documentation..."
              onSearch={setSearchQuery}
              value={searchQuery}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-slate-400 text-xs border border-slate-200 rounded px-1.5 py-0.5">
                ⌘K
              </span>
            </div>
          </div>
        </div>
        {/* Right: Links & Mobile Search */}
        <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link
            href="/"
            onClick={handleGoHome}
            className="hidden sm:block hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link href="/docs" className="hidden sm:block text-blue-600">
            Docs
          </Link>
          <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
          {/* Mobile Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label="Toggle search"
          >
            <SearchIcon size={20} />
          </Button>
          <div className="flex items-center gap-2">
            {siteConfig.social.github && (
              <Link
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all"
                aria-label="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Link>
            )}
            {siteConfig.social.twitter && (
              <Link
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all"
                aria-label="X (Twitter)"
              >
                <svg
                  viewBox="0 0 24 24"
                  width={20}
                  height={20}
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Search Bar Dropdown */}
      {isMobileSearchOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <Search
              placeholder="Search..."
              onSearch={setSearchQuery}
              value={searchQuery}
            />
          </div>
        </div>
      )}
    </header>
  );
}
