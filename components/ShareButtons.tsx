"use client";

import { Button } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Check, Link, Mail } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// Brand icons removed from lucide-react - using inline SVGs
const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export function ShareButtons() {
  // Ensure the first client render matches the server output to avoid hydration issues
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Derive current URL and title only after mount
  const url = useMemo(
    () =>
      mounted && typeof window !== "undefined" ? window.location.href : "",
    [mounted],
  );
  const title = useMemo(
    () => (mounted && typeof document !== "undefined" ? document.title : ""),
    [mounted],
  );
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: "Share on Twitter",
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(url)}`,
      className: "hover:text-blue-400 hover:bg-blue-50",
    },
    {
      name: "Share on LinkedIn",
      icon: LinkedinIcon,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url,
      )}&title=${encodeURIComponent(title)}`,
      className: "hover:text-blue-700 hover:bg-blue-50",
    },
    {
      name: "Share via Email",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(
        title,
      )}&body=${encodeURIComponent(url)}`,
      className: "hover:text-slate-700 hover:bg-slate-100",
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border">
      <TooltipProvider>
        {mounted &&
          shareLinks.map((link) => (
            <Tooltip key={link.name}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`p-2 text-slate-400 rounded-full transition-all h-auto w-auto ${link.className}`}
                  onClick={() =>
                    window.open(link.href, "_blank", "noopener,noreferrer")
                  }
                >
                  <link.icon size={20} />
                  <span className="sr-only">{link.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}

        {mounted && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all h-auto w-auto"
                onClick={copyToClipboard}
              >
                {copied ? <Check size={20} /> : <Link size={20} />}
                <span className="sr-only">Copy link</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy link"}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TooltipProvider>
    </div>
  );
}
