import { useState } from "react";
import { siteConfig } from "@/config/site";

export function Avatar() {
  const [errored, setErrored] = useState(false);

  return (
    <div className="relative h-32 w-32 shrink-0 sm:h-36 sm:w-36">
      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent to-accent-secondary opacity-70 blur-md" />
      {/* No backdrop-filter: with rounded-full + overflow-hidden it fails to clip on iOS Safari. */}
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-border bg-background/60">
        {!errored ? (
          <img
            src={siteConfig.headshotUrl}
            alt={siteConfig.name}
            className="h-full w-full object-cover"
            onError={() => setErrored(true)}
          />
        ) : (
          <span className="accent-gradient text-4xl font-semibold tracking-tight">
            {siteConfig.initials}
          </span>
        )}
      </div>
    </div>
  );
}
