import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ value, className }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className={cn(
        "glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground/80 transition-all duration-300 hover:-translate-y-1 hover:text-foreground hover:border-white/25",
        className,
      )}
    >
      {copied ? <Check className="h-[18px] w-[18px] text-accent" /> : <Copy className="h-[18px] w-[18px]" />}
    </button>
  );
}
