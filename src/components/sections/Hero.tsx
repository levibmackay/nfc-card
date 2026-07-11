import { useEffect, useState } from "react";
import { Download, IdCard, Mail } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { downloadVCard } from "@/lib/vcard";

const CROSSFADE_MS = 300;

function RotatingTagline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % siteConfig.taglines.length);
        setVisible(true);
      }, CROSSFADE_MS);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <p className="text-base text-muted sm:text-lg">{siteConfig.taglines.join(" · ")}</p>
    );
  }

  return (
    <p
      className={cn(
        "text-base text-muted transition-opacity ease-out sm:text-lg",
        visible ? "opacity-100" : "opacity-0",
      )}
      style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
    >
      {siteConfig.taglines[index]}
    </p>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen min-h-dvh w-full flex-col items-center justify-center px-6 py-24 text-center">
      <Avatar />

      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-gradient sm:text-6xl">
        {siteConfig.name}
      </h1>

      <div className="mt-3">
        <RotatingTagline />
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button href={siteConfig.resumeUrl} download variant="glass" icon={<Download className="h-4 w-4" />}>
          Download Resume
        </Button>
        <Button onClick={downloadVCard} variant="glass" icon={<IdCard className="h-4 w-4" />}>
          Save Contact
        </Button>
        <Button href={`mailto:${siteConfig.email}`} variant="primary" icon={<Mail className="h-4 w-4" />}>
          Email Me
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <SocialLinks />
        <CopyButton value={siteConfig.email} />
      </div>
    </section>
  );
}
