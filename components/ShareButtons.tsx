"use client";

import { Button } from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Check, Link, Mail, Twitter, Linkedin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title,
      )}&url=${encodeURIComponent(url)}`,
      className: "hover:text-blue-400 hover:bg-blue-50",
    },
    {
      name: "Share on LinkedIn",
      icon: Linkedin,
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
